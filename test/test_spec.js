var labcol = require('../col');

var step = 15;

describe("col", function() {
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
