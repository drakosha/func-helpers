module.exports = {
  mapKeys,
  getter,
  ensureFn,
  forEachKey,
  G: getter
};

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
  path = path ? path.split('.') : [];

  return ctx => {
    let result = ctx;

    for (const key of path) {
      if (!result) break;
      result = result[key];
    }

    return result;
  };
}
