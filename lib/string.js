const capitalize =
  str => [str.slice(0, 1).toUpperCase(), str.slice(1)].join('');

const dasherize = str =>
  str.replace(/([a-z])([A-Z])/g, (match, prev, next) =>
    [prev, next.toLowerCase()].join('-'));

const singularize = str =>
  str.replace(/(i?e)?s$/, match => (match === 'ies') ? 'y' : '');

module.exports = {
  capitalize,
  dasherize,
  lpad,
  singularize
};

function lpad(str, len, padding = ' ') {
  // Force type conversion from e.g. numbers
  str = str.toString();

  const strLen = str.length;
  if (len <= strLen) return str;

  const lenDiff = len - strLen;
  const [runs, rem] = divmod(lenDiff, padding.length);

  padding = padding.repeat(runs) + padding.slice(0, rem);

  return `${padding}${str}`;
}

// FIXME: perhaps this helper also deserves to be exported
function divmod(number, divisor) {
  const quotient = Math.trunc(number / divisor);
  const remainder = number % divisor;

  return [quotient, remainder];
}
