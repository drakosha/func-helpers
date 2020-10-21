const { mapKeys, isArray, G, identity } = require('./utils');

const operations = {
  'is': op((a, b) => !!a === b),
  'eq': op(eql),
  'ne': op((a, b) => !(eql(a, b))),
  'gt': op((a, b) => a > b),
  'lt': op((a, b) => a < b),
  'gte': op((a, b) => a >= b),
  'lte': op((a, b) => a <= b)
}

function op(fn) {
  return (getter, value) =>
    context =>
      fn(getter(context), typeof value === 'function' ? value(context) : value);
}

function cond(key, value) {
  const parts = key.split('.');

  const operation = parts[parts.length - 1] in operations
    ? operations[parts.pop()](G(parts.join('.')), value)
    : operations['eq'](G(key), value)

  return operation;
}

function eql(a, b) {
  if (isArray(b)) return b.includes(a);

  if (typeof b === 'number') {
    let newA = Number(a);

    if (!isNaN(newA)) a = newA;
  }

  return a === b;
}

function when(criteria) {
  if (typeof criteria === 'function') return criteria;
  else if (Array.isArray(criteria)) {
    const conditions = criteria.map(when);

    return context => !!conditions.find(condition => condition(context));
  }
  else if (!criteria || typeof criteria !== 'object')
    return identity(!!criteria);

  const conditions = mapKeys(criteria, cond);

  return context => {
    return !conditions.find(condition => !condition(context));
  }
}

module.exports = when;
