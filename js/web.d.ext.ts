/// <reference path="references.ts"/>

interface String {
    splice: any;
    format: any;
}

interface Number {
    clamp(min:number, max:number): number;
}

/**
 * Removes a portion of the string starting at a index and replaces with another string
 * @param startIndex - starting index
 * @param removeStrSize - number of chars to remove
 * @param replaceStr - string replacement
 * @returns {string}
 */
String.prototype.splice = function( startIndex:number, removeStrSize:number, replaceStr:string ) {
    return (this.slice(0,startIndex) + replaceStr + this.slice(startIndex + Math.abs(removeStrSize)));
};

/**
 * Returns a number whose value is limited to the given range.
 *
 * Example: limit the output of this computation to between 0 and 255
 * (x * 255).clamp(0, 255)
 *
 * @param {Number} min The lower boundary of the output range
 * @param {Number} max The upper boundary of the output range
 * @returns A number in the range [min, max]
 * @type Number
 */
Number.prototype.clamp = function(min, max):number {
    return Math.min(Math.max(this, min), max);
};

String.prototype.format = function (...argument:any[]):string {
    var args = argument;
    return this.replace(/{(\d+)}/g, function(match, number) {
        return typeof args[number] != 'undefined'
            ? args[number]
            : match
            ;
    });
};