var fs = require('fs');
eval(fs.readFileSync('../col.js') + '');

var x = new labcol();

describe("col", function() {
  it("Should actually be a thing", function() {
    expect(!x).toBe(false);
  });

  for (var r = 0; r < 255; r = r + 5) {
    for (var g = 0; g < 255; g = g + 5) {
      it("Should actually be a thing", function() {
        var x = new labcol();
        var a = x.RGBtoLab(r, g, 0);
        var b = x.LabtoRGB(a.l, a.a, a.b);

        expect(r == Math.ceil(b.r)).toBe(true);
      });
      // it("Should actually be a thing", function () {
      //   var x = new labcol();
      //   var a = x.RGBtoLab(r,g,0);
      //   var b = x.LabtoRGB(a.l,a.a,a.b);

      //   expect(g == Math.floor(b.g)).toBe(true);

      // });
    }
  }
});
