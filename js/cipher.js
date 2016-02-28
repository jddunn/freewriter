/*
 * This is the entire source code for the article “Subtitution ciphering in JavaScript”
 * http://timseverien.com/articles/153-substitution-ciphering-in-javascript/
 */

(function() {
    "use strict";

    /**
     * Cipher namespace, to store all the cyphers
     *
     * @namespace
     */

    var Cipher = {};

    /**
     * Maps ABCDEF to QWERTY
     *
     * @param {string} text
     * @param {boolean} decode
     *
     * @return {string}
     */

    Cipher.toQWERTY = function(text, decode) {
        // ABCDEF to QWERTY map
        var map = {
            a: 'q', b: 'w', c: 'e',
            d: 'r', e: 't', f: 'y',
            g: 'u', h: 'i', i: 'o',
            j: 'p', k: 'a', l: 's',
            m: 'd', n: 'f', o: 'g',
            p: 'h', q: 'j', r: 'k',
            s: 'l', t: 'z', u: 'x',
            v: 'c', w: 'v', x: 'b',
            y: 'n', z: 'm'
        };

        // Flip the map
        if(decode) {
            map = (function() {
                var tmp = {};
                var k;

                // Populate the tmp variable
                for(k in map) {
                    if(!map.hasOwnProperty(k)) continue;
                    tmp[map[k]] = k;
                }

                return tmp;
            })();
        }

        return text.split('').filter(function(v) {
            // Filter out characters that are not in our list
            return map.hasOwnProperty(v.toLowerCase());
        }).map(function(v) {
            // Replace old character by new one
            // And make it uppercase to make it look even fancier
            return map[v.toLowerCase()].toUpperCase();
        }).join('');
    };


    /**
     * Rotate a unicode string
     *
     * @param {string} text
     * @param {int} rotation
     *
     * @return {string}
     */

    Cipher.rotate = function(text, rotation) {
        // Surrogate pair limit
        var bound = 0x10000;

        // Force the rotation an integer and within bounds
        rotation = parseInt(rotation) % bound;

        // Might as well return the text if there's no change
        if(rotation === 0) return text;

        // Create string from character codes
        return String.fromCharCode.apply(null,
            // Turn string to character codes
            text.split('').map(function(v) {
                // Return current character code + rotation
                return (v.charCodeAt() + rotation + bound) % bound;
            })
        );
    };

    /**
     * Rotate a unicode string using a key
     *
     * @param {string} text
     * @param {string} key
     * @param {boolean} reverse
     *
     * @return {string}
     */

    Cipher.keyRotate = function(text, key, reverse) {
        // Surrogate pair limit
        var bound = 0x10000;

        // Create string from character codes
        return String.fromCharCode.apply(null,
            // Turn string to character codes
            text.split('').map(function(v, i) {
                // Get rotation from key
                var rotation = key[i % key.length].charCodeAt();

                // Are we decrypting?
                if(reverse) rotation = -rotation;

                // Return current character code + rotation
                return (v.charCodeAt() + rotation + bound) % bound;
            })
        );
    };

    window.Cipher = Cipher;
})();