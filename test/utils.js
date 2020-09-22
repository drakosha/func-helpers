const assert = require('assert');
const { getter, compose, identity } = require('..');

describe('Utils', function () {
  describe('getter', function () {
    it('should return function like identity', function () {
      assert.equal(getter()('test'), 'test');
    });

    it('should return getter function for path', function () {
      assert.equal(getter('key1.key2')({ key1: { key2: 'test' } }), 'test');
    });

    it('should return undefined if no key found', function () {
      assert.equal(getter('key1.key2')({ key5: { key3: 'test' } }), undefined);
    });

    it('should cache functions', function () {
      assert.equal(getter('test'), getter('test'));
    })
  });

  describe('compose', function () {
    it('should chain functions', function () {
      assert.equal(
        compose(val => val - 5, val => val * 2)(20),
        30
      )
    });

    it('should return loopback function if no arguments passed', function () {
      assert.equal(compose()(55), 55);
    });
  });

  describe('identity', function () {
    it('should return function that return passed value', function () {
      assert.equal(identity(55)(87), 55);
    });

    it('should return loopback function if no arguments passed', function () {
      assert.equal(identity()(87), 87);
    });
  });
});
