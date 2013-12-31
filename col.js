function ColJs() {
    this.LabtoRGB = function(l, a, b) {
        return this.XYZtoRGB(this.LabtoXYZ(l, a, b).X, this.LabtoXYZ(l, a, b).Y, this.LabtoXYZ(l, a, b).Z);
    };

    this.LabtoXYZ = function(l, a, b) {
        var delta = 6.0 / 29.0;

        var fy = (l + 16) / 116.0;
        var fx = fy + (a / 500.0);
        var fz = fy - (b / 200.0);
        return {
            x: (fx > delta) ? 0.9505 * (fx * fx * fx) : (fx - 16.0 / 116.0) * 3 * (delta * delta) * 0.9505,
            y: (fy > delta) ? 1 * (fy * fy * fy) : (fy - 16.0 / 116.0) * 3 * (delta * delta) * 1,
            z: (fz > delta) ? 1.0890 * (fz * fz * fz) : (fz - 16.0 / 116.0) * 3 * (delta * delta) * 1.0890
        };
    };

    this.XYZtoRGB = function(x, y, z) {
        Clinear = [0, 0, 0];

        Clinear[0] = x * 3.2410 - y * 1.5374 - z * 0.4986; // red
        Clinear[1] = -x * 0.9692 + y * 1.8760 - z * 0.0416; // green
        Clinear[2] = x * 0.0556 - y * 0.2040 + z * 1.0570; // blue

        for (var i = 0; i < 3; i++) {
            Clinear[i] = Math.floor(((Clinear[i] <= 0.0031308) ? 12.92 * Clinear[i] : (
                1 + 0.055) * Math.pow(Clinear[i], (1.0 / 2.4)) - 0.055) * 255);
        }
        return {
            r: Clinear[0],
            g: Clinear[1],
            b: Clinear[2]
        }
    };

    this.RGBtoLab = function(r, g, b) {
        return this.XYZtoLab(this.RGBtoXYZ(r, g, b));
    }

    this.RGBtoXYZ = function(red, green, blue) {
        var rLinear = red / 255.0;
        var gLinear = green / 255.0;
        var bLinear = blue / 255.0;

        // convert to a sRGB form
        r = (rLinear > 0.04045) ? Math.pow((rLinear + 0.055) / (1 + 0.055), 2.2) : (rLinear / 12.92);
        g = (gLinear > 0.04045) ? Math.pow((gLinear + 0.055) / (1 + 0.055), 2.2) : (gLinear / 12.92);
        b = (bLinear > 0.04045) ? Math.pow((bLinear + 0.055) / (1 + 0.055), 2.2) : (bLinear / 12.92);

        return {
            x: (r * 0.4124 + g * 0.3576 + b * 0.1805),
            y: (r * 0.2126 + g * 0.7152 + b * 0.0722),
            z: (r * 0.0193 + g * 0.1192 + b * 0.9505)
        }
    }

    this.Fxyz = function(t) {
        return ((t > 0.008856) ? Math.pow(t, (1.0 / 3.0)) : (7.787 * t + 16.0 / 116.0));
    }

    this.XYZtoLab = function(input) {
        x = input.x;
        y = input.y;
        z = input.z;

        lab = {
            l: 0,
            a: 0,
            b: 0
        };
        lab.l = 116.0 * this.Fxyz(y / 1.0) - 16;
        lab.a = 500.0 * (this.Fxyz(x / 0.9505) - this.Fxyz(y / 1.0));
        lab.b = 200.0 * (this.Fxyz(y / 1.0) - this.Fxyz(z / 1.0890));

        return lab;
    }

    var that = this;
}
