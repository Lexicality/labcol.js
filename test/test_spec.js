var fs = require('fs');
eval(fs.readFileSync('../col.js')+'');

var x = new labcol();

describe("col", function () {
  it("Should actually be a thing", function () {
    expect(!x).toBe(false);
  });

});
