(function(root) {
    'use strict';

    /** @constructor */
    function labcol() {}

    /** @typedef {{r: number, g: number, b: number}} */
    labcol.RGB;
    /** @typedef {{l: number, a: number, b: number}} */
    labcol.LAB;
    /** @typedef {{x: number, y: number, z: number}} */
    labcol.XYZ;

    /**
     * Converts a colour from the Lab colourspace to RGB
     * @param {number} l
     * @param {number} a
     * @param {number} b
     * @return {labcol.RGB}
     */
    function LabtoRGB(l, a, b) {
        return XYZtoRGB(LabtoXYZ(l, a, b));
    }
    labcol.prototype.LabtoRGB = labcol.LabtoRGB = LabtoRGB;

    function LabtoXYZ_(a, delta) {
        if (a > delta) {
            return a * a * a;
        } else {
            return (a - 16.0 / 116.0) * 3 * (delta * delta);
        }
    }

    /**
     * Converts a colour from the Lab colourspace to CIE XYZ coordinates
     * @param {number} l
     * @param {number} a
     * @param {number} b
     * @return {labcol.XYZ}
     */
    function LabtoXYZ(l, a, b) {
        var delta = 6.0 / 29.0;

        var fy = (l + 16) / 116.0;
        var fx = fy + (a / 500.0);
        var fz = fy - (b / 200.0);
        return {
            x: 0.9505 * LabtoXYZ_(fx, delta),
            y: 1.0000 * LabtoXYZ_(fy, delta),
            z: 1.0890 * LabtoXYZ_(fz, delta),
        };
    }
    labcol.prototype.LabtoXYZ = labcol.LabtoXYZ = LabtoXYZ;

    function sRGBtoRGB(i) {
        if (i <= 0.0031308) {
            return 12.92 * i;
        } else {
            return (1 + 0.055) * Math.pow(i, (1.0 / 2.4)) - 0.055;
        }
    }


    /**
     * Converts a colour from CIE XYZ coordinates to RGB
     * @param {labcol.XYZ} input
     * @return {labcol.RGB}
     */
    function XYZtoRGB(input) {
        var x = +input.x;
        var y = +input.y;
        var z = +input.z;
        Clinear = [0, 0, 0];

        Clinear[0] = +x * 3.2410 - y * 1.5374 - z * 0.4986; // red
        Clinear[1] = -x * 0.9692 + y * 1.8760 - z * 0.0416; // green
        Clinear[2] = +x * 0.0556 - y * 0.2040 + z * 1.0570; // blue

        for (var i = 0; i < 3; i++) {
            Clinear[i] = Math.floor(sRGBtoRGB(Clinear[i]) * 255);
        }
        return {
            r: Clinear[0],
            g: Clinear[1],
            b: Clinear[2],
        };
    }
    labcol.prototype.XYZtoRGB = labcol.XYZtoRGB = XYZtoRGB;


    /**
     * Converts a colour from RGB to the Lab colourspace
     * @param {number} r
     * @param {number} g
     * @param {number} b
     * @return {labcol.LAB}
     */
    function RGBtoLab(r, g, b) {
        return XYZtoLab(RGBtoXYZ(r, g, b));
    }
    labcol.prototype.RGBtoLab = labcol.RGBtoLab = RGBtoLab;

    function RGBtosRGB(linear) {
        if (linear > 0.04045) {
            return Math.pow((linear + 0.055) / (1 + 0.055), 2.4);
        } else {
            return linear / 12.92;
        }
    }

    /**
     * Converts a colour from RGB to CIE XYZ coordinates
     * @param {number} red
     * @param {number} green
     * @param {number} blue
     * @return {labcol.XYZ}
     */
    function RGBtoXYZ(red, green, blue) {

        // convert to a sRGB form
        var r = RGBtosRGB(+red / 255.0),
            g = RGBtosRGB(+green / 255.0),
            b = RGBtosRGB(+blue / 255.0);

        return {
            x: r * 0.4124 + g * 0.3576 + b * 0.1805,
            y: r * 0.2126 + g * 0.7152 + b * 0.0722,
            z: r * 0.0193 + g * 0.1192 + b * 0.9505,
        };
    }
    labcol.prototype.RGBtoXYZ = labcol.RGBtoXYZ = RGBtoXYZ;

    /**
     * TODO: ???
     * @private
     * @param {number} t ??
     * @return {number} ???
     */
    function Fxyz(t) {
        if (t > 0.008856) {
            return Math.pow(t, 1.0 / 3.0);
        } else {
            return 7.787 * t + 16.0 / 116.0;
        }
    }


    /**
     * Converts a colour from CIE XYZ coordinates to the Lab colourspace
     * @param {labcol.XYZ} input
     * @return {labcol.LAB}
     */
    function XYZtoLab(input) {
        x = input.x;
        y = input.y;
        z = input.z;

        lab = {
            l: 0,
            a: 0,
            b: 0
        };
        lab.l = 116.0 * Fxyz(y / 1.0) - 16;
        lab.a = 500.0 * (Fxyz(x / 0.9505) - Fxyz(y / 1.0));
        lab.b = 200.0 * (Fxyz(y / 1.0) - Fxyz(z / 1.0890));

        return lab;
    }
    labcol.prototype.XYZtoLab = labcol.XYZtoLab = XYZtoLab;

    // Lib Output
    if (typeof module !== 'undefined') {
        module['exports'] = labcol;
    } else if (typeof define === 'function' && define['amd']) {
        define(function() {
            return labcol;
        });
    } else {
        root['labcol'] = labcol;
    }
})(this);
