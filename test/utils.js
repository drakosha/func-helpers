const assert = require('assert');
const { getter, identity } = require('..');

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
  describe('identity', function () {
    it('should return function that return passed value', function () {
      assert.equal(identity(55)(87), 55);
    });

    it('should return loopback function if no arguments passed', function () {
      assert.equal(identity()(87), 87);
    });
  });
});
