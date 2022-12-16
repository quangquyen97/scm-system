module.exports = ({ addUtilities }) => {
  addUtilities({
    '.transition-bg': {
      'transition-property': 'background',
    },
    '.transition-outline': {
      'transition-property': 'outline',
    },
    '.transition-flex': {
      'transition-property': 'flex',
    },
  });
};
