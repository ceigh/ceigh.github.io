import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
import { createLocalFontProcessor } from '@unocss/preset-web-fonts/local'
import {
  defineConfig,
  presetIcons,
  presetWebFonts,
  presetWind4,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  presets: [
    presetWind4({}),

    presetWebFonts({
      fonts: {
        sans: 'Inter:200',
        pixel: 'Pixelify Sans:400',
      },
      processors: createLocalFontProcessor(),
    }),

    presetIcons({
      collections: {
        app: FileSystemIconLoader('./assets/icons'),
      },
      customizations: {
        iconCustomizer(_collection, _icon, props): void {
          props.width = '1em'
          props.height = '1em'
        },
      },
      warn: true,
    }),
  ],

  transformers: [
    transformerVariantGroup({
      separators: [':'],
    }),
  ],

  /* eslint-disable ts/no-unsafe-member-access */
  extendTheme: (theme): void => {
    theme.colors.primary = theme.colors.orange['600'] as string
  },
  /* eslint-enable ts/no-unsafe-member-access */

  rules: [
    ['shadow-surface', {
      'box-shadow': 'inset -1px -1px 0.5px rgba(3, 7, 18, 0.23), inset 1px 1px 0.5px #f9fafb',
    }],

    ['bg-noise', {
      'background-image': `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='512' height='512'><filter id='noiseFilter'><feTurbulence type='turbulence' baseFrequency='0.8' numOctaves='4' result='turbulence'/><feComponentTransfer><feFuncR type='discrete' tableValues='0 1'/><feFuncG type='discrete' tableValues='0 1'/><feFuncB type='discrete' tableValues='0 1'/></feComponentTransfer></filter><rect width='100%25' height='100%25' filter='url(%23noiseFilter)'/></svg>")`,
      'filter': 'grayscale()',
      'opacity': '12%',
      'mix-blend-mode': 'multiply',
    }],

    ['bg-screen-border', {
      'background-image': 'conic-gradient(from 180deg at 50% 50%, #e2e8f0 0deg, #cbd5e1 35.42deg, #cbd5e1 88.87deg, #cbd5e1 132.39deg, #cbd5e1 180.73deg, #e2e8f0 214.26deg, #f1f5f9 224.01deg, #f8fafc 325.49deg, #f1f5f9 329.52deg, #e2e8f0 360deg)',
    }],

    ['shadow-screen', {
      'box-shadow': 'inset 0.5px 0.5px 0.5px rgba(23, 37, 84, 0.59), inset -0.5px -0.5px 0.5px rgba(239, 245, 255, 0.8)',
    }],

    ['bg-screen-grid', {
      'background-image': 'linear-gradient(to right, oklch(88.2% 0.059 254.128) 1px, transparent 1px), linear-gradient(to bottom, oklch(88.2% 0.059 254.128) 1px, transparent 1px)',
      'background-size': '8px 8px',
    }],
  ],

  shortcuts: {
    surface: 'shadow-surface border-0.5 border-gray-900/30 border-solid from-gray-200 to-gray-300 bg-linear-to-b',
  },

  preflights: [
    {
      /* eslint-disable ts/no-unsafe-member-access */
      getCSS: ({ theme }): string => /* css */ `
        ::selection {
          background-color: ${theme.colors.primary};
          color: ${theme.colors.gray['100']};
        }

        :focus-visible {
          outline: 2px solid ${theme.colors.primary};
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
          color: ${theme.colors.gray['800']};
          overflow-wrap: break-word;
        }
      `,
      layer: 'base',
      /* eslint-enable ts/no-unsafe-member-access */
    },
  ],
})
