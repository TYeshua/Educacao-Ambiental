import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Caminho do site no GitHub Pages: https://tyeshua.github.io/Educacao-Ambiental/
  base: '/Educacao-Ambiental/',
});
