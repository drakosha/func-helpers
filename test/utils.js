const assert = require('assert');
const { getter, compose, identity, env, groupBy, indexBy } = require('..');

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

  describe('groupBy', function () {
    it('should return hash with groupped objects', function () {
      assert.deepEqual(groupBy('id', [{ id: '6', data: '55' }, { id: '9' }]), {
        '6': [{ id: '6', data: '55' }],
        '9': [{ id: '9' }]
      });
    });
  });

  describe('indexBy', function () {
    it('should return indexed hash', function () {
      assert.deepEqual(indexBy('id', [{ id: '6', data: '55' }, { id: '9' }]), {
        '6': { id: '6', data: '55' },
        '9': { id: '9' }
      });
    });
  });

  describe('env', function () {
    it('should return default value if not defined in enviroment', function () {
      assert.equal(env('key123', 'default'), 'default');
    });

    it('should return value of enviroment variable if defined', function () {
      process.env['test_var_123'] = 'defined';
      assert.equal(env('test_var_123', 'default'), 'defined');
    });

    it('should throw exception if variable not defined and default is not set', function () {
      assert.throws(() => env('test_var_12345'), Error);
    });
  });
});
