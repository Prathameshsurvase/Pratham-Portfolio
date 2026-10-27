import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Base repository name on GitHub Pages
const base = process.env.NODE_ENV === 'production' ? '/Pratham-Portfolio/' : '/'

function assetPathPlugin() {
  return {
    name: 'asset-path-rewriter',
    transform(code, id) {
      if (process.env.NODE_ENV === 'production' && (id.endsWith('.jsx') || id.endsWith('.js') || id.endsWith('.css'))) {
        return {
          code: code
            .replace(/(['"(])\/Images\//g, `$1${base}Images/`)
            .replace(/(['"(])\/logos\//g, `$1${base}logos/`)
            .replace(/(['"(])\/Font\//g, `$1${base}Font/`)
            .replace(/(['"(])\/favicon/g, `$1${base}favicon`)
            .replace(/(['"(])\/icons\.svg/g, `$1${base}icons.svg`)
            .replace(/(['"(])\/Pratham_Survase_Resume_Updated\.pdf/g, `$1${base}Pratham_Survase_Resume_Updated.pdf`),
          map: null,
        }
      }
    },
    transformIndexHtml(html) {
      if (process.env.NODE_ENV === 'production') {
        return html
          .replace(/(href|src)=["']\/Images\//g, `$1="${base}Images/`)
          .replace(/(href|src)=["']\/logos\//g, `$1="${base}logos/`)
          .replace(/(href|src)=["']\/Font\//g, `$1="${base}Font/`)
          .replace(/(href|src)=["']\/favicon/g, `$1="${base}favicon`)
      }
    }
  }
}

export default defineConfig({
  plugins: [
    assetPathPlugin(),
    react(),
    tailwindcss(),
  ],
  base,
  server: {
    cors: true,
  },
})
