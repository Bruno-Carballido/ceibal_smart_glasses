import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    test: {
        environment: 'jsdom',
        alias: {
            // Configura alias para los paths definidos en tu proyecto
            '^app/(.*)$': resolve(__dirname, './src/$1'),
        },
    },
})