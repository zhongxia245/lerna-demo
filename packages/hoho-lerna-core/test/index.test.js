var core = require('../index')
var expect = require('chai').expect

describe('hoho-lerna-core test', function() {
  //defer对象测试
  describe('add.js test', function() {
    // success
    it('3 + 4 = 7', function() {
      expect(core.add(3, 4)).to.be.equal(7)
    })

    // error
    it('3 + 3 != 7', function() {
      expect(core.add(3, 3)).not.to.equal(7)
    })
  })

  //defer对象测试
  describe('sub.js test', function() {
    // success
    it('4 - 3 = 1', function() {
      expect(core.sub(4, 3)).to.be.equal(1)
    })

    // error
    it('4 - 2 != 1', function() {
      expect(core.sub(4, 2)).not.be.equal(1)
    })
  })
})
