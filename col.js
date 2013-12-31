function ColJs() {
    this.LabtoRGB = function(l, a, b) {
        return XYZtoRGB(LabtoXYZ(l, a, b).X, LabtoXYZ(l, a, b).Y, LabtoXYZ(l, a, b).Z);
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
    	Clinear = [0,0,0];

        Clinear[0] = x * 3.2410 - y * 1.5374 - z * 0.4986; // red
        Clinear[1] = -x * 0.9692 + y * 1.8760 - z * 0.0416; // green
        Clinear[2] = x * 0.0556 - y * 0.2040 + z * 1.0570; // blue

        for (var i = 0; i < 3; i++)
        {
            Clinear[i] = Math.floor(((Clinear[i] <= 0.0031308) ? 12.92 * Clinear[i] : (
                1 + 0.055) * Math.Pow(Clinear[i], (1.0 / 2.4)) - 0.055)*255);
        }
        return {
        	r: Clinear[0],
        	g: Clinear[1],
        	b: Clinear[2]
        }
    };
    var that = this;
}
