import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/EMWare.Ai/', // 👈 your repo name
  plugins: [react()],
});
