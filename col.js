(function(root) {
    'use strict';

    /** @constructor */
    function labcol() {}

    var l2xdelta = 6.0 / 29.0;

    /**
     * @private
     * @param {number} a
     * @return {number}
     */
    function _LabtoXYZ(a) {
        if (a > l2xdelta) {
            return a * a * a;
        } else {
            return (a - 16.0 / 116.0) * 3 * (l2xdelta * l2xdelta);
        }
    }

    /**
     * @private
     * @param {number} i
     * @return {number}
     */
    function _sRGBtoRGB(i) {
        if (i <= 0.0031308) {
            return 12.92 * i;
        } else {
            return (1 + 0.055) * Math.pow(i, (1.0 / 2.4)) - 0.055;
        }
    }
    labcol._sRGBtoRGB = _sRGBtoRGB;

    /**
     * Converts a colour from the Lab colourspace to RGB
     * @param {number} l
     * @param {number} a
     * @param {number} b
     * @return {labcol.RGB}
     */
    labcol.LabtoRGB = function(l, a, b) {
        var x, y, z, r, g; // b is already defined!

        y = (+l + 16) / 116.0;
        x = y + (+a / 500.0);
        z = y - (+b / 200.0);

        x = 0.9505 * +_LabtoXYZ(x);
        y = 1.0000 * +_LabtoXYZ(y);
        z = 1.0890 * +_LabtoXYZ(z);


        r = x * +3.2404542 + y * -1.5371385 + z * -0.4985314;
        g = x * -0.9692660 + y * +1.8760108 + z * +0.0415560;
        b = x * +0.0556434 + y * -0.2040259 + z * +1.0572252;

        return {
            r: Math.abs(Math.round(_sRGBtoRGB(r) * 255)),
            g: Math.abs(Math.round(_sRGBtoRGB(g) * 255)),
            b: Math.abs(Math.round(_sRGBtoRGB(b) * 255))
        };
    };
    labcol.prototype.LabtoRGB = labcol.LabtoRGB;


    // RGB -> LAB

    /**
     * @private
     * @param {number} linear
     * @return {number}
     */
    function _RGBtosRGB(linear) {
        if (linear > 0.04045) {
            return Math.pow((linear + 0.055) / (1 + 0.055), 2.4);
        } else {
            return linear / 12.92;
        }
    }
    labcol._RGBtosRGB = _RGBtosRGB;

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

        x = r * 0.4124564 + g * 0.3575761 + b * 0.1804375;
        y = r * 0.2126729 + g * 0.7151522 + b * 0.0721750;
        z = r * 0.0193339 + g * 0.1191920 + b * 0.9503041;

        x = +fxyz(x / 0.9505);
        y = +fxyz(y);
        z = +fxyz(z / 1.0890);

        return {
            l: 116.0 * y - 16,
            a: 500.0 * (x - y),
            b: 200.0 * (y - z)
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
