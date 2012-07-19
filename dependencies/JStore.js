/*  
    JStore
     ~ Work with local and session Storage as a JS Object.
     ~ Port of PokkiGalaxy PokkiStorage for outside of Pokki use.

    @authors
        John Chavarria <m@psi.sh>
    @version 1.0
    @license LGPL v3.0 (http://www.gnu.org/licenses/lgpl.html) 

    @copyright (c) 2012, Authors.
*/


if (window.Storage) {
(function() {


/**
* get: Gets one or several items from Storage.
*
* @param Array/String key The key of the element.
   An array can be passed to get several keys.
   The keys can be stringified object structures (i.e. "foo.bar.key").
* @return * The returned storage value.
*/
Storage.prototype.get = function get(key)
{

    // If several keys are passed.
    if (typeof key == 'object') {
        var obj = new Object();
        for (var k = 0; k < key.length; k++) {
            obj[key[k]] = this.get(key[k]);
        }
        return obj;
    // If a single key is passed.
    } else {
        var key = this.decompose(key);
        // If the key is a stringified object structure.
        if (key.object) {
            return this.parse(key.item)[key.key];
        // If the key is a normal string.
        } else {
            return this.parse(key);
        }        
    }
        
};


/**
* set: Sets one or several items to Storage.
*
* @param object/string key The key of the element.
   An object can be passed to set several keys.
   The keys can be stringified object structures (i.e. "foo.bar.key").
   Object must be formated as following: {foo: 'bar'}
* @param [*] value The value to set.
*/
Storage.prototype.set = function set(key, value)
{

    // If several keys are passed.
    if (typeof key == 'object') {
        for (var k in key) {
            this.set(k, key[k]);
        }
    // If a single key is passed.
    } else {
        var key = this.decompose(key);

        // If the key is a stringified object structure.
        if (key.object) {
            var obj = {};
            var previous = "";
            for (var i = 1; i < key.keys.length; i++) {
                previous += key.keys[i];
                if (i < key.keys.length - 1) {
                    obj[previous] = {};
                } else {
                    obj[previous] = value;
                }
            }

            var item = this.get(key.item);
            for (var k in obj) {
                item[k] = obj[k];
            }
            this.setItem(key.item, JStoreTools.stringify(item));
        // If the key is a normal string.
        } else {
            this.setItem(key, JStoreTools.stringify(value));
        }                      
    }

};


/**
* remove: Removes one or several items from Storage.
*
* @param array/string key The key of the element.
   An array can be passed to remove several keys.
   The keys can be stringified object structures (i.e. "foo.bar.key").
*/
Storage.prototype.remove = function remove(key)
{

    // If several keys are passed.
    if (typeof key == 'object') {
        for (var k = 0; k < key.length; k++) {
            this.remove(key[k]);
        }        
    // If a single key is passed.
    } else {
        var key = this.decompose(key);

        // If the key is a stringified object structure.
        if (key.object) {
            var item = this.get(key.item);
            delete item[key.key];
            this.set(key.item, item);
        // If the key is a normal string.
        } else {
            this.removeItem(key);
        }                      
    }    

};


/**
* isset: Checks if a Storage variable is set.
*
* @param array/string key The key of the element.
   The key can be a stringified object structure (i.e. "foo.bar.key").
* @return Boolean If the variable is set.

*/
Storage.prototype.isset = function isset(key)
{

    return (this.get(key) ? true : false);

};


/**
* decompose: Decomposes a key string to check if it is a stringified object
   structure.
*
* @param String key The string key.
* @return Object/String Returns the original key or an object containing the
   decomposed key.
*/
Storage.prototype.decompose = function decompose(key)
{

    var keys   = key.split('.');
    var object = (keys.length > 1 ? true : false);

    if (object) {
        return {
            object : true,
            item   : keys[0],
            key    : key.substr(keys[0].length + 1, key.length),
            keys   : keys
        }
    } else {
        return key;
    }

};


/**
* parse: Returns a variable from Storage and JSON parses it.
*
* @param array/string key The key of the element.
*/
Storage.prototype.parse = function parse(key)
{

    var value = this.getItem(key);
    return (value && JStoreTools.isJSON(value) ? JSON.parse(value) : value);

};


/**
* c: Storage.clear() wrapper.
*
*/
Storage.prototype.c = function c()
{

    this.clear();

};


/**
* JStoreTools: JStore Utilities.
*
*/
this.JStoreTools =
{


    /**
    * stringify: Returns the value stringified.
    *
    * @param * value The value.
    */
    stringify: function stringify(value)
    {

        return (typeof value != 'string' ? JSON.stringify(value) : value);

    },

    /**
    * isJSON: Tests if a string is a valid stringified JSON (no try/catch)
    *
    * @param String str A string to be tested.
    * @return Boolean.
    */
    isJSON: function isJSON(str)
    {

        return (/^[\],:{}\s]*$/.test(str.replace(/\\["\\\/bfnrtu]/g, '@').
         replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
         replace(/(?:^|:|,)(?:\s*\[)+/g, '')));

    }

};


// Wrappers for localStorage and sessionStorage, comment if not needed;
this.ls = localStorage;
this.ss = sessionStorage;

})();
}

