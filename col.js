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

    var l2xdelta = 6.0 / 29.0;

    function LabtoXYZ_(a) {
        if (a > l2xdelta) {
            return a * a * a;
        } else {
            return (a - 16.0 / 116.0) * 3 * (l2xdelta * l2xdelta);
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
        var fy = (l + 16) / 116.0;
        var fx = fy + (a / 500.0);
        var fz = fy - (b / 200.0);
        return {
            x: 0.9505 * LabtoXYZ_(fx),
            y: 1.0000 * LabtoXYZ_(fy),
            z: 1.0890 * LabtoXYZ_(fz),
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

        var r = +x * 3.2410 - y * 1.5374 - z * 0.4986, // red
            g = -x * 0.9692 + y * 1.8760 - z * 0.0416, // green
            b = +x * 0.0556 - y * 0.2040 + z * 1.0570; // blue

        return {
            r: Math.floor(sRGBtoRGB(r) * 255),
            g: Math.floor(sRGBtoRGB(g) * 255),
            b: Math.floor(sRGBtoRGB(b) * 255),
        };
    }
    labcol.prototype.XYZtoRGB = labcol.XYZtoRGB = XYZtoRGB;

    // RGB -> LAB

    function _RGBtosRGB(linear) {
        if (linear > 0.04045) {
            return Math.pow((linear + 0.055) / (1 + 0.055), 2.4);
        } else {
            return linear / 12.92;
        }
    }

    /**
     * @private
     * @param {number} t ??
     * @return {number} ???
     */
    function fxyz(t) {
        if (t > 0.008856) {
            return Math.pow(t, 1.0 / 3.0);
        } else {
            return 7.787 * t + 16.0 / 116.0;
        }
    }

    /**
     * Converts a colour from RGB to the Lab colourspace
     * @param {number} r
     * @param {number} g
     * @param {number} b
     * @return {labcol.LAB}
     */
    labcol.RGBtoLab = function(r, g, b) {
        var x, y, z;

        // convert to a sRGB form
        r = +_RGBtosRGB(+r / 255.0);
        g = +_RGBtosRGB(+g / 255.0);
        b = +_RGBtosRGB(+b / 255.0);

        x = r * 0.4124 + g * 0.3576 + b * 0.1805;
        y = r * 0.2126 + g * 0.7152 + b * 0.0722;
        z = r * 0.0193 + g * 0.1192 + b * 0.9505;

        x = +fxyz(x / 0.9505);
        y = +fxyz(y);
        z = +fxyz(z / 1.0890);

        return {
            l: 116.0 * y - 16,
            a: 500.0 * (x - y),
            b: 200.0 * (y - z),
        };
    };
    labcol.prototype.RGBtoLab = labcol.RGBtoLab;

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
