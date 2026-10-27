import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Leaf,
  Recycle,
  BarChart3,
  BookOpen,
  Trophy,
  Volume2,
  VolumeX,
  Home,
  Sparkles,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Users,
  Utensils,
  Award,
  RotateCcw
} from 'lucide-react';
import {
  GameScreen,
  WasteCategory,
  Team
} from './types';
import {
  SORTING_ITEMS,
  LIGHTNING_QUIZ_GAME1,
  KITCHEN_SURVEY_MISSIONS,
  COMIC_PANELS
} from './data/questions';
import { sound } from './utils/sound';

const INITIAL_TEAMS: Team[] = [
  { id: 't1', name: 'Equipe Macaxeira', emoji: '🥕', score: 0, badges: [] },
  { id: 't2', name: 'Guardiões da Horta', emoji: '🌱', score: 0, badges: [] },
  { id: 't3', name: 'Detetives UFPA', emoji: '🔍', score: 0, badges: [] }
];

export default function App() {
  const [screen, setScreen] = useState<GameScreen>('home');
  const [teams, setTeams] = useState<Team[]>(INITIAL_TEAMS);
  const [activeTeamIdx, setActiveTeamIdx] = useState<number>(0);
  const [muted, setMuted] = useState<boolean>(false);

  // Estados do Minijogo 1
  const [g1Index, setG1Index] = useState(0);
  const [g1Feedback, setG1Feedback] = useState<{ correct: boolean; text: string } | null>(null);
  const [g1QuizIndex, setG1QuizIndex] = useState<number | null>(null);
  const [g1QuizAnswered, setG1QuizAnswered] = useState<number | null>(null);
  const [g1Completed, setG1Completed] = useState(false);

  // Estados do Minijogo 2
  const [g2MissionIdx, setG2MissionIdx] = useState(0);
  const [g2Step, setG2Step] = useState<'chart-choice' | 'data-question'>('chart-choice');
  const [g2SelectedOption, setG2SelectedOption] = useState<number | null>(null);
  const [g2Completed, setG2Completed] = useState(false);

  // Estados do Minijogo 3
  const [g3PanelIdx, setG3PanelIdx] = useState(0);
  const [g3SelectedOption, setG3SelectedOption] = useState<number | null>(null);
  const [g3CompletedPanels, setG3CompletedPanels] = useState<{ title: string; emoji: string; speech: string }[]>([]);
  const [g3Slogan, setG3Slogan] = useState('Menos Desperdício, Mais Cuidado! Nossa Horta Agradece!');
  const [g3Completed, setG3Completed] = useState(false);

  const activeTeam = teams[activeTeamIdx];

  const addPoints = (pts: number, badge?: string) => {
    setTeams((prev) =>
      prev.map((t, idx) => {
        if (idx !== activeTeamIdx) return t;
        const updatedBadges = badge && !t.badges.includes(badge) ? [...t.badges, badge] : t.badges;
        return { ...t, score: t.score + pts, badges: updatedBadges };
      })
    );
  };

  const toggleSound = () => {
    sound.muted = !muted;
    setMuted(!muted);
  };

  const triggerCelebration = () => {
    sound.playVictory();
    confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
  };

  const currentSortingItem = SORTING_ITEMS[g1Index];
  const handleSortChoice = (chosenCategory: WasteCategory) => {
    if (g1Feedback) return;
    const isCorrect = chosenCategory === currentSortingItem.category;
    if (isCorrect) {
      sound.playSuccess();
      addPoints(currentSortingItem.points);
      setG1Feedback({ correct: true, text: currentSortingItem.explanation });
    } else {
      sound.playError();
      setG1Feedback({
        correct: false,
        text: `Quase! O destino ideal é "${
          currentSortingItem.category === 'compostagem'
            ? 'Composteira da Horta'
            : currentSortingItem.category === 'aproveitamento'
            ? 'Aproveitamento Integral na Cozinha'
            : 'Coleta Seletiva (Recicláveis)'
        }". ${currentSortingItem.explanation}`
      });
    }
  };

  const nextSortingStep = () => {
    setG1Feedback(null);
    if ((g1Index + 1) % 3 === 0 && g1QuizIndex === null) {
      const qIdx = Math.floor(g1Index / 3);
      if (qIdx < LIGHTNING_QUIZ_GAME1.length) {
        setG1QuizIndex(qIdx);
        setG1QuizAnswered(null);
        return;
      }
    }
    if (g1Index + 1 < SORTING_ITEMS.length) {
      setG1Index(g1Index + 1);
    } else {
      setG1Completed(true);
      addPoints(200, '🏅 Mestre da Separação');
      triggerCelebration();
    }
  };

  const handleG1QuizAnswer = (optIdx: number) => {
    if (g1QuizAnswered !== null || g1QuizIndex === null) return;
    setG1QuizAnswered(optIdx);
    const quiz = LIGHTNING_QUIZ_GAME1[g1QuizIndex];
    if (optIdx === quiz.correctIndex) {
      sound.playSuccess();
      addPoints(150);
    } else {
      sound.playError();
    }
  };

  const closeG1Quiz = () => {
    setG1QuizIndex(null);
    setG1QuizAnswered(null);
    if (g1Index + 1 < SORTING_ITEMS.length) {
      setG1Index(g1Index + 1);
    } else {
      setG1Completed(true);
      addPoints(200, '🏅 Mestre da Separação');
      triggerCelebration();
    }
  };

  const currentMission = KITCHEN_SURVEY_MISSIONS[g2MissionIdx];
  const handleG2Answer = (optIdx: number) => {
    if (g2SelectedOption !== null) return;
    setG2SelectedOption(optIdx);
    const correctIdx =
      g2Step === 'chart-choice'
        ? currentMission.chartTypeQuestion.correctIndex
        : currentMission.interpretationQuestion.correctIndex;

    if (optIdx === correctIdx) {
      sound.playSuccess();
      addPoints(150);
    } else {
      sound.playError();
    }
  };

  const nextG2Step = () => {
    setG2SelectedOption(null);
    if (g2Step === 'chart-choice') {
      setG2Step('data-question');
    } else {
      if (g2MissionIdx + 1 < KITCHEN_SURVEY_MISSIONS.length) {
        setG2MissionIdx(g2MissionIdx + 1);
        setG2Step('chart-choice');
      } else {
        setG2Completed(true);
        addPoints(250, '📊 Cientista de Dados da Cozinha');
        triggerCelebration();
      }
    }
  };

  const currentPanel = COMIC_PANELS[g3PanelIdx];
  const handleG3Answer = (optIdx: number) => {
    if (g3SelectedOption !== null) return;
    setG3SelectedOption(optIdx);
    const chosen = currentPanel.options[optIdx];
    if (chosen.isCorrect) {
      sound.playSuccess();
      addPoints(150);
    } else {
      sound.playError();
    }
  };

  const nextG3Panel = () => {
    const correctOpt = currentPanel.options.find((o) => o.isCorrect)!;
    setG3CompletedPanels((prev) => [
      ...prev,
      {
        title: currentPanel.panelTitle,
        emoji: currentPanel.sceneEmoji,
        speech: correctOpt.text
      }
    ]);
    setG3SelectedOption(null);
    if (g3PanelIdx + 1 < COMIC_PANELS.length) {
      setG3PanelIdx(g3PanelIdx + 1);
    } else {
      setG3Completed(true);
      addPoints(300, '🎨 Autor da Grande Exposição HQ');
      triggerCelebration();
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between relative overflow-x-hidden pb-12">
      <header className="torn-banner sticky top-0 z-30 px-4 py-3">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src={`${import.meta.env.BASE_URL}assets/slides/ufpa-crest.png`}
              alt="UFPA"
              className="w-10 h-12 object-contain bg-[#FFFAF0] rounded-lg p-1 shadow"
            />
            <button
              onClick={() => setScreen('home')}
              className="flex items-center gap-2 bg-[#F1DBB8] text-[#3A2920] px-3 py-1.5 rounded-xl font-bold shadow hover:scale-105 transition"
            >
              <Home className="w-5 h-5 text-[#3D531B]" />
              <span className="font-display">Início</span>
            </button>
            <div>
              <span className="text-xs uppercase tracking-wider text-[#CCA151] font-bold block">
                Projeto de Extensão • UFPA • 6º Ano
              </span>
              <h1 className="font-hand text-lg md:text-xl text-[#FFFAF0] leading-tight">
                Da Cozinha à Consciência — Gestão de Resíduos Sólidos
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center bg-[#283810] px-3 py-1.5 rounded-xl border border-[#5E804D] gap-2">
              <Users className="w-4 h-4 text-[#ED9527]" />
              <span className="text-xs text-[#F1DBB8]">Equipe:</span>
              <select
                value={activeTeamIdx}
                onChange={(e) => setActiveTeamIdx(Number(e.target.value))}
                className="bg-[#F1DBB8] text-[#1A100A] font-bold text-xs px-2 py-1 rounded-lg cursor-pointer"
              >
                {teams.map((t, idx) => (
                  <option key={t.id} value={idx}>
                    {t.emoji} {t.name} ({t.score} pts)
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-[#ED9527] text-[#1A100A] px-3 py-1.5 rounded-xl font-display font-bold text-sm flex items-center gap-1.5 shadow">
              <Trophy className="w-4 h-4" />
              <span>{activeTeam.score} pts</span>
            </div>

            <button
              onClick={toggleSound}
              className="p-2 rounded-xl bg-[#283810] text-[#F1DBB8] hover:bg-[#4E6E3E] transition"
              title="Alternar Som"
            >
              {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl w-full mx-auto px-4 mt-6 flex-1">
        {screen === 'home' && (
          <div className="space-y-8">
            <section className="torn-paper p-6 md:p-10 relative overflow-hidden">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-4 max-w-2xl">
                  <div className="inline-flex items-center gap-2 bg-[#3D531B] text-[#FFFAF0] px-4 py-1.5 rounded-full text-sm font-bold">
                    <Sparkles className="w-4 h-4 text-[#ED9527]" />
                    <span>Protagonismo Jovem • Vocês são Agentes de Transformação!</span>
                  </div>
                  <h2 className="font-hand text-3xl md:text-5xl text-[#3A2920] leading-tight">
                    Da Cozinha à Consciência
                  </h2>
                  <p className="text-base md:text-lg text-[#3A2920]/95 font-medium leading-relaxed">
                    Bem-vindos à plataforma interativa da nossa escola! Grande parte do que chamamos de
                    &ldquo;lixo&rdquo; são <strong>resíduos sólidos</strong> com valor que podem ser{' '}
                    <span className="underline decoration-[#3D531B] font-bold">
                      reutilizados, reciclados ou compostados
                    </span>
                    . Escolha um dos 3 minijogos abaixo para investigar a cozinha da escola!
                  </p>
                </div>

                <div className="bg-[#3D531B] text-[#FFFAF0] p-5 rounded-3xl border-4 border-[#CCA151] text-center shadow-xl max-w-xs w-full">
                  <div className="flex justify-center items-center gap-2 mb-2">
                    <img src={`${import.meta.env.BASE_URL}assets/slides/illust-carrot.png`} alt="" className="h-12 object-contain" />
                    <img src={`${import.meta.env.BASE_URL}assets/slides/illust-banana.png`} alt="" className="h-12 object-contain" />
                    <img src={`${import.meta.env.BASE_URL}assets/slides/illust-leaves.png`} alt="" className="h-12 object-contain" />
                  </div>
                  <p className="font-hand text-lg text-[#F1DBB8]">Nossa Meta Real</p>
                  <p className="text-xs text-[#FFFAF0]/90 mt-1">
                    Ir além do papel: reduzir o desperdício diário da merenda, criar gráficos no Excel e
                    espalhar consciência com nossas HQs!
                  </p>
                </div>
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {teams.map((team, idx) => (
                <div
                  key={team.id}
                  onClick={() => setActiveTeamIdx(idx)}
                  className={`torn-paper p-4 cursor-pointer transition transform hover:-translate-y-1 ${
                    activeTeamIdx === idx ? 'ring-4 ring-[#ED9527]' : 'opacity-90'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-3xl">{team.emoji}</span>
                      <div>
                        <h3 className="font-display font-bold text-lg text-[#1A100A]">{team.name}</h3>
                        <span className="text-xs font-bold text-[#3D531B]">
                          {activeTeamIdx === idx ? '● Equipe Ativa' : 'Clique para selecionar'}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-display text-2xl font-bold text-[#AC300F]">
                        {team.score}
                      </span>
                      <span className="block text-xs text-[#3A2920]">pontos</span>
                    </div>
                  </div>
                  {team.badges.length > 0 && (
                    <div className="mt-3 pt-2 border-t border-[#3A2920]/20 flex flex-wrap gap-1">
                      {team.badges.map((b) => (
                        <span
                          key={b}
                          className="text-xs bg-[#3D531B] text-[#FFFAF0] px-2 py-0.5 rounded-full font-medium"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="torn-paper p-6 flex flex-col justify-between hover:scale-[1.02] transition">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-[#3D531B] text-[#F1DBB8] text-xs font-bold px-3 py-1 rounded-full">
                      MINIJOGO 01 • SLIDES 3, 4, 9 e 10
                    </span>
                    <Recycle className="w-7 h-7 text-[#3D531B]" />
                  </div>
                  <h3 className="font-hand text-2xl text-[#1A100A] mb-2">
                    1. Mestres da Bancada: Lixo ou Resíduo?
                  </h3>
                  <p className="text-sm text-[#3A2920]/90 mb-4">
                    Durante o preparo da merenda, muitos resíduos são gerados! Separe cascas, talos,
                    sementes e embalagens entre a <strong>Composteira</strong>, o{' '}
                    <strong>Aproveitamento Integral</strong> e a <strong>Coleta Seletiva</strong>.
                  </p>
                </div>
                <button
                  onClick={() => setScreen('game1')}
                  className="w-full bg-[#3D531B] hover:bg-[#283810] text-[#FFFAF0] font-display font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition"
                >
                  <span>Jogar Missão da Cozinha</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              <div className="torn-paper p-6 flex flex-col justify-between hover:scale-[1.02] transition">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-[#ED9527] text-[#1A100A] text-xs font-bold px-3 py-1 rounded-full">
                      MINIJOGO 02 • 1ª e 2ª ETAPAS (SLIDES 11–15)
                    </span>
                    <BarChart3 className="w-7 h-7 text-[#AC300F]" />
                  </div>
                  <h3 className="font-hand text-2xl text-[#1A100A] mb-2">
                    2. Detetives dos Dados & Excel
                  </h3>
                  <p className="text-sm text-[#3A2920]/90 mb-4">
                    Explore as 5 perguntas reais do questionário da cozinha! Escolha os gráficos certos
                    no <strong>Excel</strong> (Colunas, Pizza e Ranking) e calcule o volume de resíduos
                    da semana!
                  </p>
                </div>
                <button
                  onClick={() => setScreen('game2')}
                  className="w-full bg-[#AC300F] hover:bg-[#87240A] text-[#FFFAF0] font-display font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition"
                >
                  <span>Investigar Questionário & Gráficos</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              <div className="torn-paper p-6 flex flex-col justify-between hover:scale-[1.02] transition">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-[#093552] text-[#F1DBB8] text-xs font-bold px-3 py-1 rounded-full">
                      MINIJOGO 03 • 3ª ETAPA (SLIDES 8–10)
                    </span>
                    <BookOpen className="w-7 h-7 text-[#093552]" />
                  </div>
                  <h3 className="font-hand text-2xl text-[#1A100A] mb-2">
                    3. Estúdio HQ: Grande Exposição
                  </h3>
                  <p className="text-sm text-[#3A2920]/90 mb-4">
                    Construa a <strong>História em Quadrinhos (HQ)</strong> da turma! Complete os
                    balões de fala dos personagens e gere o cartaz oficial para o pátio e refeitório!
                  </p>
                </div>
                <button
                  onClick={() => setScreen('game3')}
                  className="w-full bg-[#093552] hover:bg-[#002642] text-[#FFFAF0] font-display font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition"
                >
                  <span>Criar HQ de Conscientização</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </section>
          </div>
        )}

        {screen === 'game1' && (
          <div className="torn-paper p-6 md:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-[#3A2920]/20 pb-4">
              <div>
                <span className="text-xs font-bold uppercase text-[#3D531B]">
                  Minijogo 1 • Para onde tudo isso vai? (Slides 3, 4, 9 e 10)
                </span>
                <h2 className="font-hand text-2xl md:text-3xl text-[#1A100A]">
                  Mestres da Bancada: Separe, Reduza, Reaproveite!
                </h2>
              </div>
              <span className="bg-[#3D531B] text-[#FFFAF0] px-4 py-1.5 rounded-full font-display font-bold text-sm">
                Item {g1Index + 1} de {SORTING_ITEMS.length}
              </span>
            </div>

            {g1Completed ? (
              <div className="text-center py-8 space-y-4">
                <div className="text-6xl">🎉🌱🍲♻️</div>
                <h3 className="font-hand text-3xl text-[#3D531B]">
                  Parabéns, {activeTeam.name}! Bancada 100% Consciente!
                </h3>
                <p className="max-w-xl mx-auto text-[#3A2920]">
                  Vocês provaram que resíduo sólido não é lixo sem valor! Separando corretamente entre
                  Compostagem, Aproveitamento Integral e Reciclagem, a nossa escola reduz o desperdício
                  e fortalece a horta escolar!
                </p>
                <div className="flex justify-center gap-4 pt-4">
                  <button
                    onClick={() => {
                      setG1Index(0);
                      setG1Completed(false);
                      setG1Feedback(null);
                    }}
                    className="bg-[#ED9527] text-[#1A100A] font-bold px-5 py-2.5 rounded-xl flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" /> Jogar Novamente
                  </button>
                  <button
                    onClick={() => setScreen('game2')}
                    className="bg-[#3D531B] text-[#FFFAF0] font-bold px-5 py-2.5 rounded-xl flex items-center gap-2"
                  >
                    Ir para o Minijogo 2 (Excel) <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : g1QuizIndex !== null ? (
              <div className="bg-[#FFFAF0] border-4 border-[#3D531B] rounded-2xl p-6 space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="bg-[#ED9527] text-[#1A100A] font-bold text-xs px-3 py-1 rounded-full">
                    ⚡ DESAFIO RELÂMPAGO 6º ANO • {LIGHTNING_QUIZ_GAME1[g1QuizIndex].slideRef}
                  </span>
                  <span className="text-xs font-bold text-[#3D531B]">+150 pontos</span>
                </div>
                <h3 className="font-display text-xl font-bold text-[#1A100A]">
                  {LIGHTNING_QUIZ_GAME1[g1QuizIndex].question}
                </h3>
                <div className="space-y-2.5">
                  {LIGHTNING_QUIZ_GAME1[g1QuizIndex].options.map((opt, idx) => {
                    const isSelected = g1QuizAnswered === idx;
                    const isCorrect = idx === LIGHTNING_QUIZ_GAME1[g1QuizIndex].correctIndex;
                    let btnStyle = 'bg-[#F1DBB8]/60 hover:bg-[#F1DBB8] border-[#D5BC93] text-[#1A100A]';
                    if (g1QuizAnswered !== null) {
                      if (isCorrect) btnStyle = 'bg-[#3D531B] text-[#FFFAF0] border-[#3D531B]';
                      else if (isSelected) btnStyle = 'bg-[#AC300F] text-[#FFFAF0] border-[#AC300F]';
                    }
                    return (
                      <button
                        key={idx}
                        onClick={() => handleG1QuizAnswer(idx)}
                        className={`w-full text-left p-3.5 rounded-xl border-2 font-medium transition ${btnStyle}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {g1QuizAnswered !== null && (
                  <div className="bg-[#F1DBB8] p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm font-medium text-[#1A100A]">
                      💡 {LIGHTNING_QUIZ_GAME1[g1QuizIndex].explanation}
                    </p>
                    <button
                      onClick={closeG1Quiz}
                      className="bg-[#3D531B] text-[#FFFAF0] px-5 py-2.5 rounded-xl font-bold shrink-0"
                    >
                      Continuar Separação →
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-[#FFFAF0] border-2 border-[#D5BC93] rounded-2xl p-6 text-center max-w-xl mx-auto shadow-md">
                  {currentSortingItem.illust ? (
                    <img
                      src={currentSortingItem.illust}
                      alt={currentSortingItem.name}
                      className="h-24 mx-auto mb-3 object-contain"
                    />
                  ) : (
                    <div className="text-6xl mb-3">{currentSortingItem.emoji}</div>
                  )}
                  <span className="text-xs font-bold uppercase tracking-wider text-[#AC300F] bg-[#F1DBB8] px-3 py-1 rounded-full">
                    {currentSortingItem.origin}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-[#1A100A] mt-3">
                    {currentSortingItem.name}
                  </h3>
                  <p className="text-sm text-[#3A2920] mt-1">
                    Para qual estação consciente devemos encaminhar este item?
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => handleSortChoice('aproveitamento')}
                    className="p-5 rounded-2xl bg-[#ED9527]/20 hover:bg-[#ED9527]/35 border-2 border-[#ED9527] text-left transition group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-3xl">🍲</span>
                      <Utensils className="w-6 h-6 text-[#AC300F] group-hover:scale-110 transition" />
                    </div>
                    <h4 className="font-hand text-xl text-[#1A100A]">
                      Aproveitamento Integral
                    </h4>
                    <p className="text-xs text-[#3A2920] mt-1">
                      Cascas, talos e sementes higienizados que viram novas receitas nutritivas na
                      cozinha!
                    </p>
                  </button>

                  <button
                    onClick={() => handleSortChoice('compostagem')}
                    className="p-5 rounded-2xl bg-[#67960E]/20 hover:bg-[#67960E]/35 border-2 border-[#3D531B] text-left transition group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-3xl">🌱</span>
                      <Leaf className="w-6 h-6 text-[#3D531B] group-hover:scale-110 transition" />
                    </div>
                    <h4 className="font-hand text-xl text-[#1A100A]">
                      Composteira da Horta
                    </h4>
                    <p className="text-xs text-[#3A2920] mt-1">
                      Restos de alimentos, cascas de frutas, borra de café e folhas que viram adubo!
                    </p>
                  </button>

                  <button
                    onClick={() => handleSortChoice('reciclavel')}
                    className="p-5 rounded-2xl bg-[#093552]/15 hover:bg-[#093552]/25 border-2 border-[#093552] text-left transition group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-3xl">♻️</span>
                      <Recycle className="w-6 h-6 text-[#093552] group-hover:scale-110 transition" />
                    </div>
                    <h4 className="font-hand text-xl text-[#1A100A]">
                      Coleta Seletiva (Recicláveis)
                    </h4>
                    <p className="text-xs text-[#3A2920] mt-1">
                      Plásticos, metais, papéis, vidros e embalagens limpas que voltam ao ciclo
                      produtivo!
                    </p>
                  </button>
                </div>

                {g1Feedback && (
                  <div
                    className={`p-4 rounded-2xl border-2 flex flex-col sm:flex-row items-center justify-between gap-4 ${
                      g1Feedback.correct
                        ? 'bg-[#3D531B] text-[#FFFAF0] border-[#283810]'
                        : 'bg-[#AC300F] text-[#FFFAF0] border-[#87240A]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {g1Feedback.correct ? (
                        <CheckCircle2 className="w-7 h-7 shrink-0 text-[#F1DBB8]" />
                      ) : (
                        <XCircle className="w-7 h-7 shrink-0 text-[#F1DBB8]" />
                      )}
                      <p className="text-sm font-medium">{g1Feedback.text}</p>
                    </div>
                    <button
                      onClick={nextSortingStep}
                      className="bg-[#F1DBB8] text-[#1A100A] font-display font-bold px-5 py-2 rounded-xl shrink-0 hover:scale-105 transition"
                    >
                      Próximo Item →
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {screen === 'game2' && (
          <div className="torn-paper p-6 md:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-[#3A2920]/20 pb-4">
              <div>
                <span className="text-xs font-bold uppercase text-[#AC300F]">
                  Minijogo 2 • Explorando o Questionário & Excel (Slides 6, 7 e 11 a 15)
                </span>
                <h2 className="font-hand text-2xl md:text-3xl text-[#1A100A]">
                  Detetives dos Dados da Cozinha
                </h2>
              </div>
              <span className="bg-[#AC300F] text-[#FFFAF0] px-4 py-1.5 rounded-full font-display font-bold text-sm">
                Missão {g2MissionIdx + 1} de {KITCHEN_SURVEY_MISSIONS.length} (Slide{' '}
                {currentMission.slideNumber})
              </span>
            </div>

            {g2Completed ? (
              <div className="text-center py-8 space-y-4">
                <div className="text-6xl">📊🏆📋</div>
                <h3 className="font-hand text-3xl text-[#3D531B]">
                  Relatório Digital Concluído com Sucesso!
                </h3>
                <p className="max-w-xl mx-auto text-[#3A2920]">
                  Vocês dominaram a 1ª e a 2ª Etapa da missão da UFPA: entrevistaram a equipe da
                  cozinha e transformaram todas as respostas em gráficos visuais de barras, colunas e
                  pizza no Excel!
                </p>
                <div className="flex justify-center gap-4 pt-4">
                  <button
                    onClick={() => {
                      setG2MissionIdx(0);
                      setG2Step('chart-choice');
                      setG2Completed(false);
                    }}
                    className="bg-[#ED9527] text-[#1A100A] font-bold px-5 py-2.5 rounded-xl flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" /> Revisar Planilhas
                  </button>
                  <button
                    onClick={() => setScreen('game3')}
                    className="bg-[#093552] text-[#FFFAF0] font-bold px-5 py-2.5 rounded-xl flex items-center gap-2"
                  >
                    Ir para a 3ª Etapa (Criar HQ) <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-[#FFFAF0] border-2 border-[#D5BC93] rounded-2xl p-5 space-y-4">
                  <div className="bg-[#3D531B] text-[#FFFAF0] p-3.5 rounded-xl">
                    <span className="text-xs uppercase font-bold text-[#F1DBB8]">
                      {currentMission.stepTitle} • Slide {currentMission.slideNumber}
                    </span>
                    <p className="font-medium text-sm mt-1 italic">
                      {currentMission.surveyQuestion}
                    </p>
                  </div>

                  <div className="bg-[#F1DBB8]/60 p-3.5 rounded-xl border border-[#D5BC93]">
                    <p className="text-xs font-bold uppercase text-[#AC300F] mb-1">
                      👩‍🍳 Relato da Cozinha da Escola:
                    </p>
                    <p className="text-sm text-[#1A100A] font-medium">
                      {currentMission.kitchenReport}
                    </p>
                  </div>

                  <div className="bg-white border-2 border-[#3D531B]/30 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between border-b pb-2">
                      <span className="text-xs font-bold text-[#205020] flex items-center gap-1.5">
                        📊 Planilha Digital (Excel) — Visualização de Dados
                      </span>
                      <span className="text-[11px] bg-[#E8F5E9] text-[#205020] px-2 py-0.5 rounded font-bold">
                        6º Ano
                      </span>
                    </div>
                    <div className="space-y-2.5">
                      {currentMission.chartData.map((d, i) => (
                        <div key={i} className="space-y-1">
                          <div className="flex justify-between text-xs font-bold text-[#1A100A]">
                            <span>{d.label}</span>
                            <span>
                              {d.value} {d.unit}
                            </span>
                          </div>
                          <div className="w-full bg-[#F1DBB8]/50 h-5 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{
                                width: `${Math.min(100, d.unit === '%' ? d.value : d.value * 5)}%`,
                                backgroundColor: d.color
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-[#FFFAF0] border-2 border-[#D5BC93] rounded-2xl p-5 flex flex-col justify-between space-y-4">
                  <div className="space-y-4">
                    <span className="inline-block bg-[#ED9527] text-[#1A100A] text-xs font-bold px-3 py-1 rounded-full">
                      {g2Step === 'chart-choice'
                        ? 'ETAPA A: ESCOLHENDO O GRÁFICO NO EXCEL'
                        : 'ETAPA B: INTERPRETANDO OS DADOS DA COZINHA'}
                    </span>

                    <h3 className="font-display text-xl font-bold text-[#1A100A]">
                      {g2Step === 'chart-choice'
                        ? currentMission.chartTypeQuestion.prompt
                        : currentMission.interpretationQuestion.prompt}
                    </h3>

                    <div className="space-y-2.5">
                      {(g2Step === 'chart-choice'
                        ? currentMission.chartTypeQuestion.options
                        : currentMission.interpretationQuestion.options
                      ).map((opt, idx) => {
                        const correctIdx =
                          g2Step === 'chart-choice'
                            ? currentMission.chartTypeQuestion.correctIndex
                            : currentMission.interpretationQuestion.correctIndex;
                        let style =
                          'bg-[#F1DBB8]/50 hover:bg-[#F1DBB8] border-[#D5BC93] text-[#1A100A]';
                        if (g2SelectedOption !== null) {
                          if (idx === correctIdx)
                            style = 'bg-[#3D531B] text-[#FFFAF0] border-[#3D531B]';
                          else if (idx === g2SelectedOption)
                            style = 'bg-[#AC300F] text-[#FFFAF0] border-[#AC300F]';
                        }
                        return (
                          <button
                            key={idx}
                            onClick={() => handleG2Answer(idx)}
                            className={`w-full text-left p-3.5 rounded-xl border-2 font-medium transition ${style}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {g2SelectedOption !== null && (
                    <div className="bg-[#F1DBB8] p-4 rounded-xl space-y-3">
                      <p className="text-sm font-medium text-[#1A100A]">
                        📌{' '}
                        {g2Step === 'chart-choice'
                          ? currentMission.excelOutput
                          : currentMission.interpretationQuestion.explanation}
                      </p>
                      <button
                        onClick={nextG2Step}
                        className="w-full bg-[#3D531B] text-[#FFFAF0] font-display font-bold py-2.5 rounded-xl"
                      >
                        {g2Step === 'chart-choice'
                          ? 'Avançar para o Cálculo dos Dados →'
                          : 'Próxima Pergunta do Questionário →'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {screen === 'game3' && (
          <div className="torn-paper p-6 md:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-[#3A2920]/20 pb-4">
              <div>
                <span className="text-xs font-bold uppercase text-[#093552]">
                  Minijogo 3 • 3ª Etapa: História em Quadrinhos & Exposição (Slides 8, 9 e 10)
                </span>
                <h2 className="font-hand text-2xl md:text-3xl text-[#1A100A]">
                  Estúdio HQ: Compartilhando o Conhecimento
                </h2>
              </div>
              <span className="bg-[#093552] text-[#FFFAF0] px-4 py-1.5 rounded-full font-display font-bold text-sm">
                Quadrinho {g3PanelIdx + 1} de {COMIC_PANELS.length}
              </span>
            </div>

            {g3Completed ? (
              <div className="space-y-6">
                <div className="bg-[#FFFAF0] border-4 border-[#1A100A] rounded-2xl p-6 space-y-6 shadow-2xl">
                  <div className="text-center border-b-2 border-dashed border-[#3A2920] pb-4">
                    <span className="bg-[#3D531B] text-[#FFFAF0] text-xs font-bold px-3 py-1 rounded-full">
                      GRANDE EXPOSIÇÃO ESCOLAR • PROJETO UFPA
                    </span>
                    <h3 className="font-hand text-3xl text-[#1A100A] mt-2">
                      HQ Oficial da {activeTeam.name}
                    </h3>
                    <p className="font-display font-bold text-[#AC300F] mt-1">
                      Lema do Cartaz: &ldquo;{g3Slogan}&rdquo;
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {g3CompletedPanels.map((p, idx) => (
                      <div
                        key={idx}
                        className="bg-[#F1DBB8] border-2 border-[#1A100A] rounded-xl p-4 flex flex-col justify-between shadow"
                      >
                        <div className="flex items-center justify-between border-b border-[#3A2920]/20 pb-2 mb-2">
                          <span className="font-hand text-xs font-bold text-[#3D531B]">
                            {p.title}
                          </span>
                          <span className="text-2xl">{p.emoji}</span>
                        </div>
                        <div className="bg-white border-2 border-[#1A100A] rounded-xl p-3 text-xs font-medium text-[#1A100A] relative">
                          {p.speech}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-[#F1DBB8]/70 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="w-full">
                      <label className="block text-xs font-bold uppercase text-[#3A2920] mb-1">
                        Personalize o Slogan do Cartaz da Turma para o Refeitório:
                      </label>
                      <input
                        type="text"
                        value={g3Slogan}
                        onChange={(e) => setG3Slogan(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border-2 border-[#3D531B] bg-white text-sm font-bold"
                      />
                    </div>
                    <button
                      onClick={() => window.print()}
                      className="bg-[#3D531B] text-[#FFFAF0] font-bold px-5 py-2.5 rounded-xl shrink-0 flex items-center gap-2"
                    >
                      <Award className="w-4 h-4" /> Imprimir / Salvar HQ
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-5 bg-[#FFFAF0] border-4 border-[#1A100A] rounded-2xl p-5 flex flex-col justify-between shadow-lg">
                  <div>
                    <div className="flex items-center justify-between bg-[#1A100A] text-[#F1DBB8] px-3 py-1.5 rounded-lg text-xs font-bold mb-4">
                      <span>{currentPanel.panelTitle}</span>
                      <span>{currentPanel.stageTag}</span>
                    </div>
                    <div className="text-center py-6 bg-[#F1DBB8]/50 rounded-xl border-2 border-dashed border-[#3A2920]">
                      {currentPanel.illust ? (
                        <img
                          src={currentPanel.illust}
                          alt=""
                          className="h-20 mx-auto mb-2 object-contain"
                        />
                      ) : (
                        <div className="text-6xl mb-2">{currentPanel.sceneEmoji}</div>
                      )}
                      <h4 className="font-hand text-xl text-[#1A100A]">
                        {currentPanel.characterName}
                      </h4>
                      <span className="text-xs font-bold text-[#3D531B]">
                        {currentPanel.characterRole}
                      </span>
                    </div>
                    <p className="text-sm text-[#3A2920] mt-4 font-medium">
                      <strong>Cena:</strong> {currentPanel.situation}
                    </p>
                  </div>
                  <div className="mt-4 bg-white border-2 border-[#1A100A] rounded-xl p-3 text-center text-xs font-bold text-[#AC300F]">
                    💬 {currentPanel.speechPrompt}
                  </div>
                </div>

                <div className="lg:col-span-7 bg-[#FFFAF0] border-2 border-[#D5BC93] rounded-2xl p-5 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <h3 className="font-display text-lg font-bold text-[#1A100A]">
                      Qual balão de fala completa este quadrinho com consciência ambiental?
                    </h3>
                    {currentPanel.options.map((opt, idx) => {
                      let style =
                        'bg-[#F1DBB8]/50 hover:bg-[#F1DBB8] border-[#D5BC93] text-[#1A100A]';
                      if (g3SelectedOption !== null) {
                        if (opt.isCorrect)
                          style = 'bg-[#3D531B] text-[#FFFAF0] border-[#3D531B]';
                        else if (idx === g3SelectedOption)
                          style = 'bg-[#AC300F] text-[#FFFAF0] border-[#AC300F]';
                      }
                      return (
                        <button
                          key={idx}
                          onClick={() => handleG3Answer(idx)}
                          className={`w-full text-left p-4 rounded-xl border-2 font-medium text-sm transition ${style}`}
                        >
                          {opt.text}
                        </button>
                      );
                    })}
                  </div>

                  {g3SelectedOption !== null && (
                    <div className="bg-[#F1DBB8] p-4 rounded-xl space-y-3">
                      <p className="text-sm font-medium text-[#1A100A]">
                        🎨 {currentPanel.options[g3SelectedOption].feedback}
                      </p>
                      <button
                        onClick={nextG3Panel}
                        className="w-full bg-[#093552] text-[#FFFAF0] font-display font-bold py-2.5 rounded-xl"
                      >
                        {g3PanelIdx + 1 < COMIC_PANELS.length
                          ? 'Desenhar Próximo Quadrinho →'
                          : 'Finalizar e Exibir Pôster da HQ! →'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="max-w-6xl w-full mx-auto px-4 mt-8">
        <div className="torn-banner rounded-2xl px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#F1DBB8]">
          <span>
            <strong>UFPA</strong> • Projeto de Extensão &ldquo;Da Cozinha à Consciência: Gestão de
            Resíduos Sólidos&rdquo;
          </span>
          <span>Cuidar hoje, transformar o amanhã • Ensino Fundamental (6º Ano)</span>
        </div>
        <div className="flex justify-center mt-3 mb-4">
          <a
            href="https://tyeshua.github.io/DOF-Portifolio/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#F1DBB8]/60 bg-[#F1DBB8]/10 px-4 py-2 text-xs text-[#F1DBB8] font-semibold transition hover:bg-[#F1DBB8] hover:text-[#3D531B] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F1DBB8]"
          >
            Desenvolvido por Thiago Yeshua
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </footer>
    </div>
  );
}
