const { getList, searchList } = require('../controllers/list');
const expect = require('chai').expect;
const testRes1 = require("./serachSet1.json");
const testRes2 = require("./serachSet2.json");
describe('Testing the search Functionality', function() {
    it('1. serach without quote', function(done) {
    expect(searchList({body : {searchVal : 'the king'},isTest : true})).to.deep.equal(testRes1);
    done();
    });

    it('2. serach with quote', function(done) {
    expect(searchList({body : {searchVal : '"the king"'},isTest : true})).to.deep.equal(testRes2);
    done();
    });

    it('3. Should return all values', function(done) {
    expect(searchList({body : {searchVal : ''},isTest : true})).to.be.an('array');
    done();
    });

    it('3. Wild character validation', function(done) {
    expect(searchList({body : {searchVal : '@#$'},isTest : true})).to.be.an('array').that.is.empty;
    done();
    });

});