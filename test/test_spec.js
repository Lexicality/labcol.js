var labcol = require('../col'),
  chai = require('chai');

var expect = chai.expect;

describe("col", function() {
  describe("basic", function() {
    it("should not mutate red", function() {
      var lab = labcol.RGBtoLab(255, 0, 0);
      var rgb = labcol.LabtoRGB(lab.l, lab.a, lab.b);
      expect(rgb).to.deep.equal({
        r: 255,
        g: 0,
        b: 0
      });
    });
    it("should not mutate green", function() {
      var lab = labcol.RGBtoLab(0, 255, 0);
      var rgb = labcol.LabtoRGB(lab.l, lab.a, lab.b);
      expect(rgb).to.deep.equal({
        r: 0,
        g: 255,
        b: 0
      });
    });
    it("should not mutate green", function() {
      var lab = labcol.RGBtoLab(0, 0, 255);
      var rgb = labcol.LabtoRGB(lab.l, lab.a, lab.b);
      expect(rgb).to.deep.equal({
        r: 0,
        g: 0,
        b: 255
      });
    });
  });
  describe("comprehensive", function() {
    var step = 15;
    it("Should not mutate colours", function() {
      var r, g, b, lab, rgb;
      for (r = 0; r < 255; r += step) {
        for (g = 0; g < 255; g += step) {
          for (b = 0; b < 255; b += step) {
            lab = labcol.RGBtoLab(r, g, b);
            rgb = labcol.LabtoRGB(lab.l, lab.a, lab.b);

            expect(rgb).to.deep.equal({
              r: r,
              g: g,
              b: b
            });
          }
        }
      }
    });
  });
});
