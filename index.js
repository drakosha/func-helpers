'use strict';

module.exports = {
  mapKeys,
  getter,
  ensureFn,
  forEachKey,
  G: getter
};

const getterChache = {};

function mapKeys(obj, callback) {
  const result = [];

  for (const key in obj) result.push(callback(key, obj[key]));

  return result;
}

function ensureFn(obj, functionFactory = getter) {
  if (typeof obj === 'function') return obj;

  return functionFactory(obj);
}

function forEachKey(obj, callback) {
  for (const key in obj) callback(key, obj[key]);
}

function getter(path) {
  const cached = getterChache[path];
  if (cached) return cached;

  path = path ? path.split('.') : [];

  return getterChache[path] = ctx => {
    let result = ctx;

    for (const key of path) {
      if (!result) break;
      result = result[key];
    }

    return result;
  };
}
