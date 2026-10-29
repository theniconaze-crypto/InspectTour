module.exports = {
  content: ['./src/index.html'],
  safelist: [
    { pattern: /^(bg|text)-(slate|green|amber|red)-(100|700)$/ }
  ],
  theme: { extend: {} },
  plugins: []
};
