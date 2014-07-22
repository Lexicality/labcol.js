var labcol = require('../col');

describe("col", function() {
  describe("basic", function() {
    it("should not mutate red", function() {
      var lab = labcol.RGBtoLab(255, 0, 0);
      var rgb = labcol.LabtoRGB(lab.l, lab.a, lab.b);
      expect(rgb.r).toEqual(255);
      expect(rgb.g).toEqual(0);
      expect(rgb.b).toEqual(0);
    });
    it("should not mutate green", function() {
      var lab = labcol.RGBtoLab(0, 255, 0);
      var rgb = labcol.LabtoRGB(lab.l, lab.a, lab.b);
      expect(rgb.r).toEqual(0);
      expect(rgb.g).toEqual(255);
      expect(rgb.b).toEqual(0);
    });
    it("should not mutate green", function() {
      var lab = labcol.RGBtoLab(0, 0, 255);
      var rgb = labcol.LabtoRGB(lab.l, lab.a, lab.b);
      expect(rgb.r).toEqual(0);
      expect(rgb.g).toEqual(0);
      expect(rgb.b).toEqual(255);
    });
  });
  describe("comprehensive", function() {
    var step = 15;
    it("Should not mutate red", function() {
      var r, g, b, lab, rgb;
      for (r = 0; r < 255; r += step) {
        for (g = 0; g < 255; g += step) {
          for (b = 0; b < 255; b += step) {
            lab = labcol.RGBtoLab(r, g, b);
            rgb = labcol.LabtoRGB(lab.l, lab.a, lab.b);

            expect(Math.ceil(rgb.r)).toEqual(r);
          }
        }
      }
    });
    it("Should not mutate green", function() {
      var r, g, b, lab, rgb;
      for (r = 0; r < 255; r += step) {
        for (g = 0; g < 255; g += step) {
          for (b = 0; b < 255; b += step) {
            lab = labcol.RGBtoLab(r, g, b);
            rgb = labcol.LabtoRGB(lab.l, lab.a, lab.b);

            expect(Math.ceil(rgb.g)).toEqual(g);
          }
        }
      }
    });
    it("Should not mutate blue", function() {
      var r, g, b, lab, rgb;
      for (r = 0; r < 255; r += step) {
        for (g = 0; g < 255; g += step) {
          for (b = 0; b < 255; b += step) {
            lab = labcol.RGBtoLab(r, g, b);
            rgb = labcol.LabtoRGB(lab.l, lab.a, lab.b);

            expect(Math.ceil(rgb.b)).toEqual(b);
          }
        }
      }
    });
  });
});
