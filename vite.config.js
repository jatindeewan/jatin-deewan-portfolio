import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // GitHub Pages project-site deployment: update this to your repo name if it changes.
  base: '/jatin-deewan-portfolio/'
});
