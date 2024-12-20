import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react(), viteTsPaths()],
  base: command === 'build' ? '/map-task/' : undefined,
}))
