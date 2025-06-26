/* eslint-disable ts/no-unsafe-member-access */

import type { CSSObject } from 'unocss'
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
    presetWind4(),

    presetWebFonts({
      fonts: {
        sans: 'Inter:200',
        mono: 'Pixelify Sans:400',
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

  extendTheme: (theme): void => {
    theme.colors.primary = theme.colors.orange['600'] as string

    theme.animation.keyframes['wheel-spin'] = /* css */ `
      {
        from { 
          transform: rotateX(360deg); 
        }
        to { 
          transform: rotateX(0deg); 
        }
      }
    `

    theme.animation.keyframes['wheel-light'] = /* css */ `
      {
        0%, 100% { 
          background-color: ${theme.colors.gray['400']};
        }
        50% { 
          background-color: ${theme.colors.gray['900']};
        }
        75% { 
          background-color: ${theme.colors.gray['50']};
        }
      }
    `
  },

  rules: [
    [/^shadow-surface-border/, (_, { theme: { colors } }): CSSObject => ({
      'box-shadow': `
        inset -1px -1px 0.5px oklch(from ${colors.gray['950']} l c h / 20%),
        inset 1px 1px 0.5px ${colors.gray['50']}
      `,
    })],

    ['bg-noise', {
      'background-image': `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='512' height='512'><filter id='noiseFilter'><feTurbulence type='turbulence' baseFrequency='0.8' numOctaves='4' result='turbulence'/><feComponentTransfer><feFuncR type='discrete' tableValues='0 1'/><feFuncG type='discrete' tableValues='0 1'/><feFuncB type='discrete' tableValues='0 1'/></feComponentTransfer></filter><rect width='100%25' height='100%25' filter='url(%23noiseFilter)'/></svg>")`,
      'filter': 'grayscale()',
      'mix-blend-mode': 'multiply',
    }],

    [/^bg-screen-border$/, (_, { theme: { colors } }): CSSObject => ({
      'background-image': `
        conic-gradient(
          from 180deg at 50% 50%,
          ${colors.slate['200']} 0deg,
          ${colors.slate['300']} 35deg,
          ${colors.slate['300']} 89deg,
          ${colors.slate['300']} 132deg,
          ${colors.slate['300']} 180deg,
          ${colors.slate['200']} 214deg,
          ${colors.slate['100']} 224deg,
          ${colors.slate['50']} 325deg,
          ${colors.slate['100']} 330deg,
          ${colors.slate['200']} 360deg
        )
      `,
    })],

    [/^shadow-screen-border$/, (_, { theme: { colors } }): CSSObject => ({
      'box-shadow': `
        inset 0.5px 0.5px 0.5px oklch(from ${colors.blue['950']} l c h / 59%),
        inset -0.5px -0.5px 0.5px oklch(from ${colors.blue['50']} l c h / 80%)
      `,
    })],

    [/^bg-screen-grid$/, (_, { theme: { colors } }): CSSObject => ({
      'background-image': `
        linear-gradient(
          to right,
          ${colors.blue['200']} 1px, transparent 1px
        ),
        linear-gradient(
          to bottom,
          ${colors.blue['200']} 1px,
          transparent 1px
        )`,
      'background-size': '0.5rem 0.5rem',
    })],

    [/^shadow-screen-glow$/, (_, { theme: { colors } }): CSSObject => ({
      'box-shadow': `
        0 0 2rem 0.5rem oklch(from ${colors.blue['200']} l c h / 50%)
      `,
    })],

    [/^writing-(.+)$/, ([, value]): CSSObject => ({
      'writing-mode': value,
    })],

    [/^bg-btn-gradient-r$/, (_, { theme: { colors } }): CSSObject => ({
      background: `
        radial-gradient(
          117% 109% at 100% 50%,
          oklch(from ${colors.gray['50']} l c h / 24%) 0%,
          transparent 100%
        )
      `,
    })],

    [/^bg-btn-gradient-l$/, (_, { theme: { colors } }): CSSObject => ({
      background: `
        linear-gradient(
          180deg,
          ${colors.gray['200']} 0%,
          ${colors.gray['400']} 10%,
          ${colors.gray['400']} 18%,
          ${colors.gray['300']} 26%,
          ${colors.gray['300']} 36%,
          ${colors.gray['500']} 50%,
          ${colors.gray['500']} 81%,
          ${colors.gray['300']} 89%,
          ${colors.gray['200']} 100%
        )
      `,
    })],

    [/^shadow-btn-l$/, (_, { theme: { colors } }): CSSObject => ({
      'box-shadow': `
        inset -0.5px 0 0.5px oklch(from ${colors.gray['50']} l c h / 50%),
        inset 0.5px 0 0.5px oklch(from ${colors.gray['900']} l c h / 45%)
      `,
    })],

    [/^shadow-btn-base$/, (_, { theme: { colors } }): CSSObject => ({
      'box-shadow': `
        -1px -1px 1px oklch(from ${colors.gray['50']} l c h / 80%),
        -0.25rem -0.25rem 0.5rem oklch(from ${colors.gray['50']} l c h / 25%),
        -0.5rem -0.5rem 1rem oklch(from ${colors.gray['50']} l c h / 40%),
        0.5px 0.5px 1px oklch(from ${colors.gray['500']} l c h / 50%),
        1px 1px 2px oklch(from ${colors.gray['500']} l c h / 25%),
        2px 2px 0.25rem oklch(from ${colors.gray['500']} l c h / 40%)
      `,
    })],

    [/^bg-btn-border$/, (_, { theme: { colors } }): CSSObject => ({
      'background-image': `
        conic-gradient(
          from 16deg at 50% 50%,
          ${colors.gray['200']} -29deg,
          ${colors.gray['300']} 32deg,
          ${colors.gray['400']} 129deg,
          ${colors.gray['300']} 211deg,
          ${colors.gray['100']} 237deg,
          ${colors.gray['50']} 300deg,
          ${colors.gray['200']} 331deg,
          ${colors.gray['300']} 392deg
        )
      `,
    })],

    [/^shadow-btn-indicator-glow$/, (_, { theme: { colors } }): CSSObject => ({
      'box-shadow': `0 0 0.5rem 2px ${colors.white}`,
    })],

    [/^shadow-wheel$/, (_, { theme: { colors } }): CSSObject => ({
      'box-shadow': `
        inset 0 1px 1px 0 oklch(from ${colors.gray['50']} l c h / 50%),
        inset -1px -1px 0.5px 0 oklch(from ${colors.gray['900']} l c h / 45%),
        inset 1rem 0 1rem 0 oklch(from ${colors.gray['900']} l c h / 40%)
      `,
    })],

    [/^shadow-wheel-face$/, (_, { theme: { colors } }): CSSObject => ({
      'box-shadow': `
        0 0.5px 0.5px 0 ${colors.gray['400']},
        inset 0 1px 1px 0 ${colors.gray['300']},
        inset 0 -2px 1px 0 ${colors.gray['500']}
      `,
    })],

    [/^shadow-theme-switcher/, (_, { theme: { colors } }): CSSObject => ({
      'box-shadow': `
        inset 1px 1px 1px 0 oklch(from ${colors.gray['900']} l c h / 40%),
        inset -0.5px -0.5px 0.5px 0 oklch(from ${colors.gray['50']} l c h / 60%)
      `,
    })],
  ],

  shortcuts: {
    surface: 'shadow-surface-border border-0.5 border-gray-900/30 border-solid from-gray-200 to-gray-300 bg-linear-to-b',
  },

  preflights: [
    {
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

        button:not(:disabled) {
          cursor: pointer;
        }
      `,
      layer: 'base',
    },
  ],
})
