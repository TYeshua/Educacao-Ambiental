export type GameScreen = 'home' | 'game1' | 'game2' | 'game3';

export type WasteCategory = 'compostagem' | 'aproveitamento' | 'reciclavel';

export interface SortingItem {
  id: string;
  name: string;
  emoji: string;
  illust?: string;
  origin: string;
  category: WasteCategory;
  explanation: string;
  points: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  context: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  slideRef: string;
}

export interface KitchenSurveyMission {
  id: number;
  stepTitle: string;
  slideNumber: number;
  surveyQuestion: string;
  excelOutput: string;
  kitchenReport: string;
  recommendedChart: 'bar-daily' | 'column-week' | 'ranking-dishes' | 'pie-composition' | 'destination-cards';
  chartData: {
    label: string;
    value: number;
    color: string;
    unit: string;
  }[];
  chartTypeQuestion: {
    prompt: string;
    options: string[];
    correctIndex: number;
  };
  interpretationQuestion: {
    prompt: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface ComicPanelChallenge {
  id: number;
  panelTitle: string;
  stageTag: string;
  sceneEmoji: string;
  illust?: string;
  characterName: string;
  characterRole: string;
  situation: string;
  speechPrompt: string;
  options: {
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
}

export interface Team {
  id: string;
  name: string;
  emoji: string;
  score: number;
  badges: string[];
}
