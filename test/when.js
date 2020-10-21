const assert = require('assert');
const when = require('../lib/when');

describe('When', function () {
  before(function () {
    this.context = {
      key1: 'bla1',
      key2: 'bla2',
      key10: 55,
      key3: {
        key4: 'blah',
        key5: {
          key6: 'test'
        }
      }
    };
  });

  it('should check simple strings', function () {
    assert.equal(when({ key1: 'bla1' })(this.context), true);
    assert.equal(when({ key1: 'bla' })(this.context), false);
    assert.equal(when({ 'key3.key4': 'blah' })(this.context), true);
  });

  it('should check against array, true if includes in array', function () {
    assert.equal(when({ key1: ['bla', 'blah'] })(this.context), false);
    assert.equal(when({ key1: ['bla1', 'blah'] })(this.context), true);
  });

  it('should accept "ne" modifier for not equal', function () {
    assert.equal(when({ 'key1.ne': 'bla1' })(this.context), false);
    assert.equal(when({ 'key1.ne': 'bla' })(this.context), true);
    assert.equal(when({ 'key1.ne': ['bla', 'bla7'] })(this.context), true);
  });

  it('should accept "gt" modifier for gather than', function () {
    assert.equal(when({ 'key10.gt': 40 })(this.context), true);
    assert.equal(when({ 'key10.gt': 55 })(this.context), false);
    assert.equal(when({ 'key10.gt': 60 })(this.context), false);
  });

  it('should accept "lt" modifier for lesser than', function () {
    assert.equal(when({ 'key10.lt': 40 })(this.context), false);
    assert.equal(when({ 'key10.lt': 55 })(this.context), false);
    assert.equal(when({ 'key10.lt': 60 })(this.context), true);
  });

  it('should accept "gte" modifier for gather than or equal', function () {
    assert.equal(when({ 'key10.gte': 40 })(this.context), true);
    assert.equal(when({ 'key10.gte': 55 })(this.context), true);
    assert.equal(when({ 'key10.gte': 60 })(this.context), false);
  });

  it('should accept "lte" modifier for lesser than or equal', function () {
    assert.equal(when({ 'key10.lte': 40 })(this.context), false);
    assert.equal(when({ 'key10.lte': 55 })(this.context), true);
    assert.equal(when({ 'key10.lte': 60 })(this.context), true);
  });

  it('should accept "is" modifier', function () {
    assert.equal(when({ 'key10.is': true })(this.context), true);
    assert.equal(when({ 'key11.is': true })(this.context), false);
  });

  it('should use AND operator for multiple hash keys', function () {
    assert.equal(when({ key1: 'bla1', key2: 'fff' })(this.context), false);
    assert.equal(when({ key1: 'bla1', key2: 'bla2' })(this.context), true);
  });

  it('should use OR operator for array input', function() {
    assert.equal(when([{ key1: 'bla1'}, { key2: 'fff' }])(this.context), true);
    assert.equal(when([{ key1: 'bla'}, { key2: 'bla2' }])(this.context), true);
    assert.equal(when([{ key1: 'bla'}, { key2: 'fff' }])(this.context), false);
  });

  it('should check numeric equality when right side is a number', function() {
    assert(when({ str: 1 })({ str: '1' }));
  });

  it('should interpret constants as booleans', function() {
    assert.equal(when([true, false])(), true);
    assert.equal(when([true, { key1: 'bla' }])(this.context), true);
    assert.equal(when([false, { key1: 'bla' }])(this.context), false);
  });
});
