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
    }
    var that = this;
}
