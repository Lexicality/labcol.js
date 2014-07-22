var labcol = require('../col'),
  chai = require('chai');

var expect = chai.expect;

function colourCompare(r, g, b) {
  lab = labcol.RGBtoLab(r, g, b);
  rgb = labcol.LabtoRGB(lab.l, lab.a, lab.b);

  expect(rgb).to.deep.equal({
    r: r,
    g: g,
    b: b
  });
}

describe("col", function() {
  describe("basic", function() {
    it("should not mutate red", function() {
      colourCompare(255, 0, 0);
    });
    it("should not mutate green", function() {
      colourCompare(0, 255, 0);
    });
    it("should not mutate green", function() {
      colourCompare(0, 0, 255);
    });
  });
  describe("comprehensive", function() {
    var step = 15;
    it("Should not mutate colours", function() {
      var r, g, b, lab, rgb;
      for (r = 0; r < 255; r += step) {
        for (g = 0; g < 255; g += step) {
          for (b = 0; b < 255; b += step) {
            colourCompare(r, g, b);
          }
        }
      }
    });
  });
});
