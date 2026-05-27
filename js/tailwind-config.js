tailwind.config = {
  theme: {
    extend: {
      colors: {
        zinc950:   '#0c0c0e',   /* fundo principal */
        surface:   '#161618',   /* cards, sheets */
        secondary: '#1f2024',   /* botões secundários, chips */
        lime:      '#bef264',   /* CTA, live, destaque */
        limeHover: '#d9f99d',
        fg:        '#f3f3f3',   /* texto principal */
        muted:     '#9ca39e',   /* labels, metadata */
      },
      fontFamily: {
        display: ['"Archivo Black"', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
    }
  }
}