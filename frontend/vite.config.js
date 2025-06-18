import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // This line is the crucial fix
  plugins: [react()],
});