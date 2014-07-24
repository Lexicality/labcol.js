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

describe("srgb", function() {
  it("should not mutate values", function() {
    for (var i = 0; i <= 255; i++) {
      var srgb = labcol._RGBtosRGB(i / 255);
      var rgb = labcol._sRGBtoRGB(srgb);
      expect(rgb * 255).to.be.closeTo(i, 0.01);
    }
  });
  it.skip("should match known conversions", function() {
    function srgb2rgb(srgb) {
      return {
        r: labcol._sRGBtoRGB(srgb.r),
        g: labcol._sRGBtoRGB(srgb.g),
        b: labcol._sRGBtoRGB(srgb.b),
      };
    }

    function rgb2srgb(rgb) {
      return {
        r: labcol._RGBtosRGB(rgb.r),
        g: labcol._RGBtosRGB(rgb.g),
        b: labcol._RGBtosRGB(rgb.b),
      };
    }
    // TODO: Find out some known conversions
  });
});

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
