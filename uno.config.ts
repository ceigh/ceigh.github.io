import { createLocalFontProcessor } from '@unocss/preset-web-fonts/local'
import { defineConfig, presetWebFonts, presetWind4 } from 'unocss'

export default defineConfig({
  presets: [
    presetWind4({}),

    presetWebFonts({
      fonts: {
        sans: 'Inter:300',
      },
      processors: createLocalFontProcessor(),
    }),
  ],

  theme: {
    colors: {
      gray: Object.fromEntries(
        Array.from({ length: 9 }).fill('').map((_, i): [number, string] =>
          [100 * (i + 1), `oklch(${1 - 0.1 * (i + 1)} 0.003 324)`]),
      ),

      primary: 'oklch(0.677 0.214 36)',
    },
  },

  preflights: [
    {
      /* eslint-disable ts/no-unsafe-member-access */
      getCSS: ({ theme }): string => /* css */ `
        ::selection {
          background-color: oklch(from ${theme.colors.primary} l c h / 30%);
        }

        html {
          @media (prefers-reduced-motion: no-preference) {
            scroll-behavior: smooth;
          }
        }

        body {
          font-size: 1rem;
          font-weight: 300;
          background-color: ${theme.colors.gray['100']};
          overflow-wrap: break-word;
        }
      `,
      /* eslint-enable ts/no-unsafe-member-access */
    },
  ],
})
