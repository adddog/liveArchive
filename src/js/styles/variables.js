export const FS = {
  small: '11px',
  base: '13px',
  large: '16px',
};

export const COLORS = {
  blue: '#2d8ceb',
  'gray-dark': '#333333',
  'gray-lighter': '#e6e7e9',
  'gray-lightest': '#f9f9fa',
  'brand-inverse': '#333',
  'brand-primary': '#2d8ceb',
  'brand-danger': '#dd2d36',
};

export const MARGINS = {
  medium: '1em',
  large: '2em',
};

export const TIMINGS = {
  slower: '0.3s',
};

export const LightenColor = function(col, amt) {
  var usePound = false;
  if (col[0] == '#') {
    col = col.slice(1);
    usePound = true;
  }
  var num = parseInt(col, 16);
  var r = (num >> 16) + amt;
  if (r > 255) {
    r = 255;
  } else if (r < 0) {
    r = 0;
  }
  var b = ((num >> 8) & 0x00ff) + amt;
  if (b > 255) {
    b = 255;
  } else if (b < 0) {
    b = 0;
  }
  var g = (num & 0x0000ff) + amt;
  if (g > 255) {
    g = 255;
  } else if (g < 0) {
    g = 0;
  }
  return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
};
