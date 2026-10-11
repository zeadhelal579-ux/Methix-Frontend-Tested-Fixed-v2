// ============================================================
// File: vite.config.ts
// Purpose: Main Vite configuration for the METHIX frontend app
// Logic:
//   - Registers the React plugin for JSX/TSX support
//   - Registers the Tailwind CSS v4 plugin (CSS-first config)
//   - Sets up the "@" path alias pointing to "src", required by
//     shadcn/ui and used across the whole project for clean imports
// ============================================================
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            "@": path.resolve(import.meta.dirname, "./src"),
        },
    },
});