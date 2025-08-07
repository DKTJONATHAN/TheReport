// tailwind.config.mjs
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        red: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#374151',
            lineHeight: '1.7',
            'p': { marginTop: '1.25em', marginBottom: '1.25em' },
            'h1, h2, h3, h4, h5, h6': { color: '#111827', fontWeight: '700' },
            'h1': { fontSize: '2.25rem', fontWeight: '800', marginBottom: '1.5rem' },
            'h2': { fontSize: '1.875rem', marginTop: '2em', marginBottom: '1em' },
            'h3': { fontSize: '1.5rem', marginTop: '1.6em', marginBottom: '0.6em' },
            'h4': { fontSize: '1.25rem', marginTop: '1.5em', marginBottom: '0.75em' },
            'h5': { fontSize: '1.125rem', marginTop: '1.25em', marginBottom: '0.5em' },
            'h6': { fontSize: '1rem', marginTop: '1.25em', marginBottom: '0.5em' },
            'a': { color: '#dc2626', fontWeight: '500', textDecoration: 'none', '&:hover': { color: '#b91c1c' } },
            'blockquote': { borderLeftColor: '#fecaca', borderLeftWidth: '4px', fontStyle: 'italic', color: '#6b7280', padding: '0.5em 1em', backgroundColor: '#fef2f2' },
            'code': { backgroundColor: '#f3f4f6', padding: '0.25em 0.5em', borderRadius: '0.25rem', fontSize: '0.875em', color: '#dc2626' },
            'pre': { backgroundColor: '#1f2937', color: '#ffffff', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto' },
            'ul, ol': { paddingLeft: '1.5em', marginBottom: '1.25em' },
            'li': { marginBottom: '0.5em' },
            'img': { borderRadius: '0.5rem', margin: '1.5rem 0', width: '100%' },
            'table': { borderCollapse: 'collapse', border: '1px solid #d1d5db', margin: '1.5rem 0' },
            'th': { backgroundColor: '#f9fafb', border: '1px solid #d1d5db', padding: '0.5rem' },
            'td': { border: '1px solid #d1d5db', padding: '0.5rem' },
            'hr': { borderColor: '#d1d5db', margin: '1.5rem 0' },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};