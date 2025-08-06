import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],
  darkMode: "class",
  plugins: [require("@tailwindcss/typography")],
  theme: {
    extend: {
      colors: {
        gray: colors.zinc,
        red: colors.red,
        blue: colors.blue,
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            a: {
              textUnderlineOffset: "2px",
              "&:hover": {
                "@media (hover: hover)": {
                  textDecorationColor: theme("colors.blue.600"),
                  textDecorationThickness: "2px",
                },
              },
            },
            blockquote: {
              borderLeftWidth: "0",
            },
            code: {
              border: "1px dotted #666",
              borderRadius: "2px",
            },
            kbd: {
              "&:where([data-theme='dark'], [data-theme='dark'] *)": {
                background: theme("colors.gray.800"),
              },
            },
            hr: {
              borderTopStyle: "dashed",
            },
            strong: {
              fontWeight: "700",
            },
            sup: {
              marginInlineStart: "0.125rem",
              a: {
                "&:after": {
                  content: "']'",
                },
                "&:before": {
                  content: "'['",
                },
                "&:hover": {
                  "@media (hover: hover)": {
                    color: theme("colors.blue.600"),
                  },
                },
              },
            },
            "tbody tr": {
              borderBottomWidth: "none",
            },
            tfoot: {
              borderTop: "1px dashed #666",
            },
            thead: {
              borderBottomWidth: "none",
            },
            "thead th": {
              borderBottom: "1px dashed #666",
              fontWeight: "700",
            },
            'th[align="center"], td[align="center"]': {
              textAlign: "center",
            },
            'th[align="right"], td[align="right"]': {
              textAlign: "right",
            },
            'th[align="left"], td[align="left"]': {
              textAlign: "left",
            },
          },
        },
        sm: {
          css: {
            code: {
              fontSize: "0.875rem",
              fontWeight: "400",
            },
          },
        },
      }),
    },
  },
} satisfies Config;