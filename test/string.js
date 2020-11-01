const assert = require('assert');
const { capitalize, dasherize, lpad,singularize } = require('..');

describe('String', function() {
  describe('capitalize', function() {
    it('converts first character of string to upper case', function() {
      assert.strictEqual(capitalize('KGB'), 'KGB');
      assert.strictEqual(capitalize('omg'), 'Omg');
    });
  });

  describe('dasherize', function() {
    it('converts camelCase to camel-case', function() {
      assert.strictEqual(dasherize('camelCase'), 'camel-case');
    });

    it('does not change acronyms', function() {
      assert.strictEqual(dasherize('HTML'), 'HTML');
      assert.strictEqual(dasherize('forKGB'), 'for-kGB');
    });
  });

  describe('lpad', function() {
    it('should prepend the value with the pattern to obtain the length given',
      function() {
        const src = '4';
        const padLen = 4;
        const padded = lpad(src, padLen, '0');

        assert.strictEqual(padded.length, padLen);
        assert.strictEqual(padded, '0004');
      }
    );

    it('should truncate the pattern when the padding length is not a multiple',
      function() {
        assert.strictEqual(lpad('abc', 8, 'test'), 'testtabc');
      }
    );

    it('should not truncate the value if it exceeds the length given',
      function() {
        assert.strictEqual(lpad('abcd', 3), 'abcd');
      }
    );

    it ('should convert the value to string', function() {
      assert.strictEqual(lpad(0, 3), '  0');
    });
  });

  describe('singularize', function() {
    it('should handle trivial case (-s)', function() {
      assert.strictEqual(singularize('cats'), 'cat');
    });

    it('should handle -es', function() {
      // Not talking on busses vs buses here
      // https://www.merriam-webster.com/words-at-play/plural-of-bus
      assert.strictEqual(singularize('kisses'), 'kiss');
    });

    it('should handle -ies for -y', function() {
      assert.strictEqual(singularize('companies'), 'company');
    })
  });
});
