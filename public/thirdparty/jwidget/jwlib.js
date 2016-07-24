/*!
    jWidget Lib 2.0

    http://enepomnyaschih.github.io/jwidget/#!/guide/home

    Copyright (C) 2015 Egor Nepomnyaschih

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
/// <reference path="core/Core.ts" />
/// <reference path="core/Class.ts" />
/// <reference path="core/Destroyable.ts" />
/// <reference path="core/Event.ts" />
/// <reference path="core/EventAttachment.ts" />
/// <reference path="collection/AbstractCollection.ts" />
/// <reference path="collection/IndexedCollection.ts" />
/// <reference path="collection/AbstractArray.ts" />
/// <reference path="collection/AbstractMap.ts" />
/// <reference path="collection/AbstractSet.ts" />
/// <reference path="collection/Array.ts" />
/// <reference path="collection/Map.ts" />
/// <reference path="collection/ObservableArray.ts" />
/// <reference path="collection/ObservableMap.ts" />
/// <reference path="collection/ObservableSet.ts" />
/// <reference path="collection/Set.ts" />
/// <reference path="property/Copier.ts" />
/// <reference path="property/Functor.ts" />
/// <reference path="property/Mapper.ts" />
/// <reference path="property/Property.ts" />
/// <reference path="property/Switcher.ts" />
/// <reference path="property/Updater.ts" />
/// <reference path="utils/Registry.ts" />
/// <reference path="utils/String.ts" />
/// <reference path="utils/Timeout.ts" />
;
/// <reference path="../jwlib.ref.ts" />
/**
 * @hidden
 */
var _JW;
(function (_JW) {
    _JW.A = Array;
    _JW.S = String;
})(_JW || (_JW = {}));
/**
 * Main jWidget library namespace.
 */
var JW;
(function (JW) {
    /**
     * Checks whether value is undefined.
     *
     * @deprecated Use Underscore's _.isUndefined instead.
     */
    function isUndefined(value) {
        return value === undefined;
    }
    JW.isUndefined = isUndefined;
    /**
     * Checks whether value is defined.
     *
     * @deprecated Use Underscore's _.negate(_.isUndefined) instead.
     */
    function isDefined(value) {
        return value !== undefined;
    }
    JW.isDefined = isDefined;
    /**
     * Checks whether value is null.
     *
     * @deprecated Use Underscore's _.isNull instead.
     */
    function isNull(value) {
        return value === null;
    }
    JW.isNull = isNull;
    /**
     * Checks whether value is not null.
     *
     * @deprecated Use Underscore's _.negate(_.isNull) instead.
     */
    function isNotNull(value) {
        return value !== null;
    }
    JW.isNotNull = isNotNull;
    /**
     * Checks whether value is not undefined or null.
     * Prefer using `value != null` expression instead.
     * The function may come in handy if you need a callback.
     */
    function isSet(value) {
        return value != null;
    }
    JW.isSet = isSet;
    /**
     * Checks whether value is undefined or null.
     * Prefer using `value == null` expression instead.
     * The function may come in handy if you need a callback.
     */
    function isNotSet(value) {
        return value == null;
    }
    JW.isNotSet = isNotSet;
    /**
     * Checks whether value casts to false value.
     *
     * @deprecated Use Underscore's _.negate(Boolean) instead.
     */
    function isBlank(value) {
        return !value;
    }
    JW.isBlank = isBlank;
    /**
     * Checks whether value casts to true value.
     *
     * @deprecated Use Boolean function instead.
     */
    function isNotBlank(value) {
        return Boolean(value);
    }
    JW.isNotBlank = isNotBlank;
    /**
     * Checks whether value is an integer.
     */
    function isInt(value) {
        return (typeof value === "number") && Math.round(value) === value;
    }
    JW.isInt = isInt;
    /**
     * Checks whether value is a number.
     *
     * @deprecated Use Underscore's _.isNumber instead.
     */
    function isNumber(value) {
        return typeof value === "number";
    }
    JW.isNumber = isNumber;
    /**
     * Checks whether value is a string.
     *
     * @deprecated Use Underscore's _.isString instead.
     */
    function isString(value) {
        return typeof value === "string";
    }
    JW.isString = isString;
    /**
     * Checks whether value is a boolean.
     *
     * @deprecated Use Underscore's _.isBoolean instead.
     */
    function isBoolean(value) {
        return typeof value === "boolean";
    }
    JW.isBoolean = isBoolean;
    /**
     * Checks whether value is a function.
     *
     * @deprecated Use Underscore's _.isFunction instead.
     */
    function isFunction(value) {
        return typeof value === "function";
    }
    JW.isFunction = isFunction;
    /**
     * Checks whether value is a native JavaScript array.
     *
     * @deprecated Use Underscore's _.isArray instead.
     */
    function isArray(value) {
        return Object.prototype.toString.apply(value) === '[object Array]';
    }
    JW.isArray = isArray;
    /**
     * Checks whether value is a native JavaScript Object or class instance.
     */
    function isObject(value) {
        return Object.prototype.toString.apply(value) === '[object Object]';
    }
    JW.isObject = isObject;
    /**
     * Checks whether value is a regular expression.
     *
     * @deprecated Use Underscore's _.isRegExp instead.
     */
    function isRegExp(value) {
        return Object.prototype.toString.apply(value) === '[object RegExp]';
    }
    JW.isRegExp = isRegExp;
    /**
     * Checks whether value is a date.
     *
     * @deprecated Use Underscore's _.isDate instead.
     */
    function isDate(value) {
        return Object.prototype.toString.apply(value) === '[object Date]';
    }
    JW.isDate = isDate;
    /**
     * Defines default value. Returns **value** unless it is undefined, else returns **defaultValue**.
     */
    function def(value, defaultValue) {
        return (value !== undefined) ? value : defaultValue;
    }
    JW.def = def;
    /**
     * Defines default value. Returns **value** unless it is undefined or null, else returns **defaultValue**.
     */
    function defn(value, defaultValue) {
        return (value != null) ? value : defaultValue;
    }
    JW.defn = defn;
    /**
     * Iterates through objects passed after first argument and copies all their fields into
     * **target** object. Returns **target**. Fields of source objects which are undefined will be ignored.
     * Empty source objects (undefined, null) will be ignored.
     *
     * Function modifies **target** object!
     *
     * Example 1:
     *
     *     var x: JW.Dictionary<number> = {   var y: JW.Dictionary<number> = {  // Result = {
     *         a: 10,                                                           //     a: 10,
     *         b: 20,                             b: 30,                        //     b: 30,
     *         c: null,                           c: 40,                        //     c: 40,
     *         d: undefined,                      d: 50,                        //     d: 50,
     *         e: null                                                          //     e: null,
     *                                            f: 60,                        //     f: 60
     *                                            g: undefined                  //
     *     };                                 };                                // };
     *
     *     JW.apply<number>(x, y);
     *
     * Example 2 (form data preparing):
     *
     *     class Form extends JW.Class {
     *         data: JW.Dictionary<any>;
     *
     *         composeData(extraData: JW.Dictionary<any>): JW.Dictionary<any> {
     *             return JW.apply<any>({}, this.getDefaultData(), this.data, extraData);
     *         }
     *
     *         // virtual
     *         getDefaultData(): JW.Dictionary<any> {
     *             return null;
     *         }
     *     }
     */
    function apply(target) {
        var sources = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            sources[_i - 1] = arguments[_i];
        }
        for (var i = 0; i < sources.length; ++i) {
            var source = sources[i];
            if (!source) {
                continue;
            }
            for (var key in source) {
                if (source[key] !== undefined) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    }
    JW.apply = apply;
    /**
     * The same as JW.apply, but ignores fields which are defined in **target**.
     *
     * **Example**
     *
     *     var x: JW.Dictionary<number> = {   var y: JW.Dictionary<number> = {  // Result = {
     *         a: 10,                                                           //     a: 10,
     *         b: 20,                             b: 30,                        //     b: 20,
     *         c: null,                           c: 40,                        //     c: null,
     *         d: undefined,                      d: 50,                        //     d: 50,
     *         e: null                                                          //     e: null,
     *                                            f: 60,                        //     f: 60
     *                                            g: undefined                  //
     *     };                                 };                                // };
     *
     *     JW.apply<number>(x, y);
     */
    function applyIf(target) {
        var sources = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            sources[_i - 1] = arguments[_i];
        }
        for (var i = 0; i < sources.length; ++i) {
            var source = sources[i];
            if (!source) {
                continue;
            }
            for (var key in source) {
                if ((source[key] !== undefined) && (target[key] === undefined)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    }
    JW.applyIf = applyIf;
    /**
     * The same as JW.apply, but ignores fields which are defined and not null in **target**.
     *
     * **Example**
     *
     *     var x: JW.Dictionary<number> = {   var y: JW.Dictionary<number> = {  // Result = {
     *         a: 10,                                                           //     a: 10,
     *         b: 20,                             b: 30,                        //     b: 20,
     *         c: null,                           c: 40,                        //     c: 40,
     *         d: undefined,                      d: 50,                        //     d: 50,
     *         e: null                                                          //     e: null,
     *                                            f: 60,                        //     f: 60
     *                                            g: undefined                  //
     *     };                                 };                                // };
     *
     *     JW.apply<number>(x, y);
     */
    function applyIfn(target) {
        var sources = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            sources[_i - 1] = arguments[_i];
        }
        for (var i = 0; i < sources.length; ++i) {
            var source = sources[i];
            if (!source) {
                continue;
            }
            for (var key in source) {
                if ((source[key] !== undefined) && (target[key] == null)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    }
    JW.applyIfn = applyIfn;
    /**
     * Clears object from undefined values. Returns new object, containing all **source** fields except undefined ones.
     *
     * Doesn't modify **source** object.
     *
     * If you want to remove null values as well, try JW.cleann function.
     *
     * Example:
     *
     *     var x = {          // Result: y = {
     *         a : 10,        //     a: 10,
     *         b : 20,        //     b: 20,
     *         c : null,      //     c: null
     *         d : undefined  //
     *     };                 // };
     *
     *     var y = JW.clean<any>(x);
     */
    function clean(source) {
        var result = {};
        for (var i in source) {
            if (source[i] !== undefined) {
                result[i] = source[i];
            }
        }
        return result;
    }
    JW.clean = clean;
    /**
     * The same as JW.clean, but clears off null fields as well.
     */
    function cleann(source) {
        var result = {};
        for (var i in source) {
            if (source[i] != null) {
                result[i] = source[i];
            }
        }
        return result;
    }
    JW.cleann = cleann;
    /**
     * Converts object to array. Object must have **length** property and keys from 0 to (**length** - 1).
     *
     * Example of such object is function **arguments** list. You can use this method to apply arbitrary
     * array methods to **arguments** list.
     *
     * Example:
     *
     *     function applyOperations(value) {
     *         var operations = JW.toArray(arguments, 1);
     *         JW.Array.each(operations, function(operation) {
     *             operation(value);
     *         });
     *     }
     *
     * @deprecated Use Underscore's _.toArray instead.
     */
    function toArray(a, index, count) {
        if (index === undefined) {
            index = 0;
        }
        if (count === undefined) {
            count = a.length - index;
        }
        var r = [];
        for (var i = 0; i < count; ++i) {
            r.push(a[index + i]);
        }
        return r;
    }
    JW.toArray = toArray;
    /**
     * Empty function.
     *
     * @deprecated Use Underscore's _.noop instead.
     */
    function emptyFn() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
    }
    JW.emptyFn = emptyFn;
    /**
     * Universal native types comparer for array sorting.
     *
     * - Returns 1, if x > y
     * - Returns -1, if x < y
     * - Returns 0, if x == y
     *
     * You can compare next types: boolean, number, string, Array.
     *
     * *Example*
     *
     * Sort by color descending first, and by status ascending last. Both parameters are optional.
     *
     *     rows.sort(function(x, y) {
     *         return JW.cmp(x.color == null, y.color == null) ||
     *               -JW.cmp(x.color, y.color) ||
     *                JW.cmp(x.status == null, y.status == null) ||
     *                JW.cmp(x.status, y.status);
     *     });
     */
    function cmp(x, y, caseInsensitive) {
        if (typeof x === "boolean" && typeof y === "boolean") {
            return x ? (y ? 0 : 1) : (y ? -1 : 0);
        }
        if (isArray(x) && isArray(y)) {
            return JW.Array.cmp(x, y, caseInsensitive);
        }
        if (caseInsensitive) {
            if (typeof x === "string") {
                x = x.toLowerCase();
            }
            if (typeof y === "string") {
                y = y.toLowerCase();
            }
        }
        if (x > y)
            return 1;
        if (x < y)
            return -1;
        return 0;
    }
    JW.cmp = cmp;
    /**
     * Equivalent for `JW.cmp(x, y, false)`. Compares two values ignoring letters case in strings.
     */
    function cmpCaseSensitive(x, y) {
        return cmp(x, y, false);
    }
    JW.cmpCaseSensitive = cmpCaseSensitive;
    /**
     * Equivalent for `JW.cmp(x, y, true)`. Compares two values ignoring letters case in strings.
     */
    function cmpCaseInsensitive(x, y) {
        return cmp(x, y, true);
    }
    JW.cmpCaseInsensitive = cmpCaseInsensitive;
    /**
     * Returns object item by expression. Expression is several words, passed in array of string joined by periods.
     * If **field** is null, undefined or blank string, function will return **obj**.
     *
     * Example 1:
     *
     *     var obj = {
     *         abc: [
     *             {
     *                 qwe: "xyz"
     *             }
     *         ]
     *     };
     *
     *     return JW.get(obj, "abc.0.qwe"); // "xyz"
     *
     *     // Equivalent code
     *     return JW.get(obj, [ "abc", 0, "qwe" ]); // "xyz"
     *
     * Function represents logic of JW.byField and JW.byValue callbacks.
     *
     * Example 2:
     *
     *     var arr = [
     *         {
     *             id   : 1,
     *             name : "First item"
     *         }, {
     *             id   : 2,
     *             name : "Second item"
     *         }
     *     ];
     *
     *     return JW.Array.search(arr, JW.byValue("id", 2)).name; // "Second item"
     *
     * In this example, function JW.get is called inside JW.byValue function implicitly with argument **field** === "id".
     */
    function get(obj, field, def) {
        if (!field) {
            return JW.def(obj, def);
        }
        if (typeof field === "string") {
            field = field.split(".");
        }
        field = JW.Array.filter(field, function (token) {
            return (token != null) && (token !== "");
        });
        for (var i = 0, l = field.length; i < l; ++i) {
            if (!obj) {
                return def;
            }
            obj = obj[field[i]];
        }
        return JW.def(obj, def);
    }
    JW.get = get;
    /**
     * Assigns object item by expression. Expression is several words, passed in array of string joined by periods.
     *
     * Example:
     *
     *     var obj = {
     *         abc: [
     *             {
     *                 qwe: "xyz"
     *             }
     *         ]
     *     };
     *
     *     JW.set(obj, "def", "abc.0.qwe"); // replace "xyz" with "def"
     *
     *     // equivalent code
     *     JW.set(obj, "def", [ "abc", 0, "qwe" ]); // replace "xyz" with "def"
     */
    function set(obj, value, field) {
        if (!field) {
            return;
        }
        if (typeof field === "string") {
            field = field.split(".");
        }
        field = JW.Array.filter(field, function (token) {
            return (token != null) && (token !== "");
        });
        for (var i = 0, l = field.length - 1; i < l; ++i) {
            var token = field[i];
            obj[token] = obj[token] || {};
            obj = obj[token];
        }
        obj[JW.Array.getLast(field)] = value;
    }
    JW.set = set;
    /**
     * Returns object unique ID. Returns iid of object. Returns undefined if obj is null or undefined.
     */
    function iid(obj) {
        if (obj) {
            return obj._iid;
        }
    }
    JW.iid = iid;
    /**
     * Returns object unique ID. Returns iid of object if it is an instance of JW.Class,
     * else returns the object itself.
     *
     * This function is used as default result for JW.AbstractArray#getKey and JW.AbstractMap#getKey, and also for
     * getKey parameter of static methods JW.Array#static-method-detectSplice,
     * JW.Array#static-method-performSplice, JW.Array#static-method-detectReorder,
     * JW.Array#static-method-performReorder, JW.Map#static-method-detectReindex,
     * JW.Map#static-method-performReindex.
     */
    function iidForcibly(obj) {
        return (obj && typeof obj === "object") ? obj._iid : obj;
    }
    JW.iidForcibly = iidForcibly;
    /**
     * Calls object method **destroy** if one is not null or undefined.
     * Can be used in mappers configuration:
     *
     *     var mapper = collection.createMapper<View>({
     *         createItem  : (data: Data) => { return new View(data); },
     *         destroyItem : JW.destroy
     *     });
     */
    function destroy(obj) {
        if (obj) {
            obj.destroy();
        }
    }
    JW.destroy = destroy;
    /**
     * Calls object method **destroy** if available. Can be used in mappers configuration:
     *
     *     var mapper = collection.createMapper<View>({
     *         createItem  : (data: Data) => { return new View(data); },
     *         destroyItem : JW.destroyForcibly
     *     });
     */
    function destroyForcibly(obj) {
        if (obj && typeof obj.destroy === "function") {
            obj.destroy();
        }
    }
    JW.destroyForcibly = destroyForcibly;
    /**
     * Returns the remainder of **value** / **mod**. Unlike % operation, works correctly even for decimal **value** and **mod**.
     * Returns result in semi-interval [0, **mod**).
     */
    function mod(value, mod) {
        return value - mod * Math.floor(value / mod);
    }
    JW.mod = mod;
    /**
     * Returns the remainder of **value** / **mod**. Unlike % operation, works correctly even for decimal **value** and **mod**.
     * Returns result in semi-interval [-**mod** / 2, **mod** / 2).
     */
    function smod(value, mod) {
        return value - mod * Math.round(value / mod);
    }
    JW.smod = smod;
    /**
     * Returns **value** number sign: 0, 1 or -1.
     */
    function sgn(value) {
        return !value ? 0 : value > 0 ? 1 : -1;
    }
    JW.sgn = sgn;
    /**
     * Returns **value** number non-zero sign: 1 or -1. Returns 1 for 0.
     */
    function sgnnz(value) {
        return value >= 0 ? 1 : -1;
    }
    JW.sgnnz = sgnnz;
    /**
     * Specifies function call scope.
     *
     * @deprecated Use TypeScript lambda or Underscore's _.bind instead.
     */
    function inScope(func, scope) {
        return function () {
            return func.apply(scope, arguments);
        };
    }
    JW.inScope = inScope;
    /**
     * Returns callback function for collection algorithms. Function returns value of specified field
     * of collection item. Item field is retrieved using JW.get function.
     *
     * **Example (get titles of all collection items):**
     *
     *     var titles = collection.map<string>(JW.byField<string>("title"));
     */
    function byField(field) {
        return function (item) {
            return get(item, field);
        };
    }
    JW.byField = byField;
    /**
     * Returns callback function for collection algorithms. Function checks whether specified field of collection item
     * is equal (===) to specified value. Item field is retrieved using JW.get function.
     *
     * **Example (find item by ID):**
     *
     *     var item = collection.search(JW.byValue("id", id));
     */
    function byValue(field, value) {
        return function (item) {
            return get(item, field) === value;
        };
    }
    JW.byValue = byValue;
    /**
     * Returns callback function for collection algorithms. Function calls specified method of collection item
     * with specified arguments and returns the result of this call.
     *
     * **Example (filter tasks that relate to specified on):**
     *
     *     var tasks = collection.filter(JW.byMethod<boolean>("relatesTo", [task]));
     */
    function byMethod(method, args) {
        args = args || [];
        return function (value) {
            return value[method].apply(value, args);
        };
    }
    JW.byMethod = byMethod;
    /**
     * Shorthand for JW.Binding.UPDATE.
     */
    JW.UPDATE = 1;
    /**
     * Shorthand for JW.Binding.WATCH.
     */
    JW.WATCH = 2;
    /**
     * Shorthand for JW.Binding.TWOWAY.
     */
    JW.TWOWAY = 3;
    /**
     * jWidget binding mode. All properties have shorthands in JW namespace.
     */
    (function (Binding) {
        /**
         * Bind invoker to argument.
         *
         *     // Bind element value to property
         *     this.own(el.jwval(property, JW.UPDATE));
         *
         * Always used as default binding. Hence, the next code is equivalent:
         *
         *     this.own(el.jwval(property));
         *
         * Shorthand: JW.UPDATE.
         */
        Binding[Binding["UPDATE"] = 1] = "UPDATE";
        /**
         * Bind argument to invoker.
         *
         *     // Bind property to element value
         *     this.own(el.jwval(property, JW.WATCH));
         *
         * Always supplied with a no-argument method, which creates the property automatically.
         *
         *     // Watch element value
         *     var property = this.own(el.jwval());
         *
         * Shorthand: JW.WATCH.
         */
        Binding[Binding["WATCH"] = 2] = "WATCH";
        /**
         * Bind invoker and argument to each other.
         * UPDATE-binding is applied first.
         *
         *     // Assign element value to property and setup two-way binding
         *     this.own(el.jwval(property, JW.TWOWAY));
         *
         * Shorthand: JW.TWOWAY.
         */
        Binding[Binding["TWOWAY"] = 3] = "TWOWAY";
    })(JW.Binding || (JW.Binding = {}));
    var Binding = JW.Binding;
})(JW || (JW = {}));
;
/// <reference path="../jwlib.ref.ts" />
var JW;
(function (JW) {
    /**
     * The base class of all jWidget classes.
     * Introduces object aggregation support.
     * If you call `a.own(b)`, then **b** is destroyed automatically on **a** destruction.
     *
     *     class Book extends JW.Class {
     *         cover: Cover = this.own(new Cover());
     *
     *         destroyObject() {
     *             console.log("Destroying book");
     *             super.destroyObject();
     *         }
     *     }
     *
     *     class Cover implements JW.Destroyable {
     *         destroy() {
     *             console.log("Destroying cover");
     *         }
     *     }
     *
     *     var book = new Book();
     *     book.destroy();
     *
     * Output:
     *
     *     Destroying cover
     *     Destroying book
     *
     * Aggregated objects are destroyed in reversive order.
     */
    var Class = (function () {
        function Class() {
            this._ownagePool = [];
            this._iid = ++Class._lastIid;
        }
        /**
         * Aggregate the specified object in a current one. It means that the specified object will be destroyed automatically
         * on this object destruction. The aggregated objects are destroyed in a reversive order.
         *
         * @param obj An aggregated object.
         * @returns An aggregated object (**obj**).
         */
        Class.prototype.own = function (obj) {
            this._ownagePool.push(obj);
            return obj;
        };
        /**
         * Class destructor invocation method. Destroys all aggregated objects and calls #destroyObject method.
         * You must call this method explicitly from outside, because JavaScript doesn't support automatic class destructor
         * calling.
         *
         *     var object = new MyClass();
         *
         *     // ...
         *
         *     // Once object is not needed anymore, destroy it
         *     object.destroy();
         *
         * Alternatively (and optimally), you should use **own** method to aggregate this object inside another one.
         *
         * You can override **destroy** method in a subclass to do some preliminary work before aggregated objects destruction.
         * For example, JW.UI.Component overrides this method to remove child components before their destruction,
         * before child components are usually aggregated inside the component. However, in the majority of cases,
         * you should override **destroyObject** method instead to customize destruction logic.
         */
        Class.prototype.destroy = function () {
            // TODO: assert(this._ownagePool != null);
            var pool = this._ownagePool;
            this._ownagePool = null;
            for (var i = pool.length - 1; i >= 0; --i) {
                pool[i].destroy();
            }
            this.destroyObject();
        };
        /**
         * Class destructor implementation. Called inside **destroy** method *after aggregated objects destruction*.
         * The logic of class instance destruction should be implemented here. If you override this method,
         * remember to call superclass destructor at the end of the method:
         *
         *     destroyObject: function() {
         *         // Release resources
         *         ...
         *         // Call superclass destructor
         *         super.destroyObject();
         *     }
         */
        Class.prototype.destroyObject = function () { };
        Class._lastIid = 0;
        return Class;
    })();
    JW.Class = Class;
})(JW || (JW = {}));
;
/// <reference path="../jwlib.ref.ts" />
;
/// <reference path="../jwlib.ref.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JW;
(function (JW) {
    /**
     * Used to notify some objects (clients) about certain events (for example, field value change).
     *
     * **Notice:** Remember to destroy the events and event listeners to prevent side effects.
     *
     * Full example of class that triggers the events:
     *
     *     class Dispatcher extends JW.Class {
     *         private items: any[] = [];
     *
     *         addEvent = this.own(new JW.Event<dispatcher.EventParams>());
     *         removeEvent = this.own(new JW.Event<dispatcher.EventParams>());
     *
     *         addItem(item: any, index: number) {
     *             this.items.splice(index, 0, item);
     *             this.addEvent.trigger({sender: this, item: item, index: index});
     *         }
     *
     *         removeItem(index) {
     *             var item = this.items.splice(index, 1)[0];
     *             this.removeEvent.trigger({sender: this, item: item, index: index});
     *         }
     *     }
     *
     *     module dispatcher {
     *         export interface EventParams {
     *             sender: Dispatcher;
     *             item: any;
     *             index: number;
     *         }
     *     }
     *
     * Full example of event listener:
     *
     *     class Listener extends JW.Class {
     *         constructor(dispatcher: Dispatcher) {
     *             super();
     *             this.own(dispatcher.addEvent.bind(this._onAdd, this));
     *             this.own(dispatcher.removeEvent.bind(this._onRemove, this));
     *         }
     *
     *         _onAdd(params: dispatcher.EventParams) {
     *             console.log(params.item, " item is added at ", params.index);
     *         }
     *
     *         _onRemove(params: dispatcher.EventParams) {
     *             console.log(params.item, " item is removed at ", params.index);
     *         }
     *     }
     */
    var Event = (function (_super) {
        __extends(Event, _super);
        function Event() {
            _super.apply(this, arguments);
            this._attachments = null;
        }
        Event.prototype.destroyObject = function () {
            this.purge();
            _super.prototype.destroyObject.call(this);
        };
        /**
         * Starts listening to event.
         *
         * Whenever the event is triggered with **trigger** method, specified handler function
         * is called in specified scope.
         *
         * You can stop listening the event by destroying the returned JW.EventAttachment instance.
         *
         * @param callback Event handler function.
         * @param scope **callback** call scope.
         * @returns Event attachment object.
         */
        Event.prototype.bind = function (handler, scope) {
            if (this._attachments === null) {
                this._attachments = {};
            }
            var attachment = new JW.EventAttachment(this, handler, scope);
            this._attachments[attachment._iid] = attachment;
            return attachment;
        };
        /**
         * Stops listening the event with specific handler.
         *
         * Equivalent to `attachment.destroy()`.
         *
         * @param attachment Event attachment.
         */
        Event.prototype.unbind = function (attachment) {
            if (this._attachments !== null) {
                delete this._attachments[attachment._iid];
            }
        };
        /**
         * Unbinds all event handlers. Called automatically in event destructor.
         */
        Event.prototype.purge = function () {
            this._attachments = null;
        };
        /**
         * Triggers event, i.e. calls all bound handlers.
         *
         *     this.myEvent.trigger({sender: this});
         *
         * This way, we've called all handlers of `myEvent` with argument `{sender: this}`.
         *
         * @param params Event params.
         */
        Event.prototype.trigger = function (params) {
            if (this._attachments === null) {
                return;
            }
            for (var iid in this._attachments) {
                var attachment = this._attachments[iid];
                attachment.handler.call(attachment.scope || attachment, params);
            }
        };
        /**
         * Checks if the event has attachments.
         */
        Event.prototype.hasAttachments = function () {
            return (this._attachments === null) || !JW.Map.isEmpty(this._attachments);
        };
        return Event;
    })(JW.Class);
    JW.Event = Event;
})(JW || (JW = {}));
;
/// <reference path="../jwlib.ref.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JW;
(function (JW) {
    /**
     * Result of JW.Event **bind** method call. Destroy it to unbind the event handler.
     */
    var EventAttachment = (function (_super) {
        __extends(EventAttachment, _super);
        function EventAttachment(_event, handler, scope) {
            _super.call(this);
            this._event = _event;
            this.handler = handler;
            this.scope = scope;
        }
        EventAttachment.prototype.destroyObject = function () {
            this._event.unbind(this);
            _super.prototype.destroyObject.call(this);
        };
        return EventAttachment;
    })(JW.Class);
    JW.EventAttachment = EventAttachment;
})(JW || (JW = {}));
;
/// <reference path="../jwlib.ref.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JW;
(function (JW) {
    /**
     * Abstract collection.
     *
     * There are 3 collection types:
     *
     * * [[JW.AbstractArray]],
     * extends [[JW.IndexedCollection]]
     * * [[JW.AbstractMap]],
     * extends [[JW.IndexedCollection]]
     * * [[JW.AbstractSet]]
     *
     * You can convert collections to each other using methods.
     *
     * Each collection has 2 implementations:
     *
     * * Simple collections:
     * [[JW.Array]],
     * [[JW.Map]],
     * [[JW.Set]]
     * * Observable collection:
     * [[JW.ObservableArray]],
     * [[JW.ObservableMap]],
     * [[JW.ObservableSet]]
     *
     * The difference is that observable collection triggers events about its modifications.
     * It lets you to synchronize view with data on fly in accordance to Model-View architecture.
     *
     * Internally, simple collections are very similar to native JavaScript collections.
     * But their API is identical to observable collections' (excepting lack of events).
     * So you can use simple collections as a bridge between native JavaScript collections and
     * jWidget observable collections.
     *
     * The next synchronizers exist to connect observable collections to each other:
     *
     * <table>
     *   <tbody>
     *     <tr>
     *       <td>Synchronizer</td>
     *       <td>Class</td>
     *       <td>Creation methods</td>
     *     </tr>
     *     <tr>
     *       <td>Item mapper</td>
     *       <td>[[JW.AbstractCollection.Mapper]]</td>
     *       <td>[[$$mapValues]], [[$$mapObjects]], [[createMapper]]</td>
     *     </tr>
     *     <tr>
     *       <td>Filterer</td>
     *       <td>[[JW.AbstractCollection.Filterer]]</td>
     *       <td>[[$$filter]], [[createFilterer]]</td>
     *     </tr>
     *     <tr>
     *       <td>Matching item counter</td>
     *       <td>[[JW.AbstractCollection.Counter]]</td>
     *       <td>[[$$count]], [[createCounter]]</td>
     *     </tr>
     *     <tr>
     *       <td>Converter to set</td>
     *       <td>[[JW.AbstractCollection.Lister]]</td>
     *       <td>[[$$toSet]], [[createLister]]</td>
     *     </tr>
     *     <tr>
     *       <td>Converter to map (indexer)</td>
     *       <td>[[JW.AbstractCollection.Indexer]]</td>
     *       <td>[[$$index]], [[createIndexer]]</td>
     *     </tr>
     *     <tr>
     *       <td>Converter to array (orderer)</td>
     *       <td>[[JW.AbstractCollection.Orderer]]</td>
     *       <td>[[$$toArray]], [[createOrderer]]</td>
     *     </tr>
     *     <tr>
     *       <td>Converter to array (sorter by comparer)</td>
     *       <td>[[JW.AbstractCollection.SorterComparing]]</td>
     *       <td>[[$$toSortedComparing]], [[createSorterComparing]]</td>
     *     </tr>
     *     <tr>
     *       <td>Observer</td>
     *       <td>[[JW.AbstractCollection.Observer]]</td>
     *       <td>[[createObserver]]</td>
     *     </tr>
     *     <tr>
     *       <td>View synchronizers</td>
     *       <td>[[JW.abstractarray.Inserter]], [[JW.abstractmap.Inserter]], [[JW.UI.Inserter]]</td>
     *       <td>createInserter</td>
     *     </tr>
     *     <tr>
     *       <td>Arrays merger</td>
     *       <td>[[JW.abstractarray.Merger]]</td>
     *       <td>[[$$merge]], [[createMerger]]</td>
     *     </tr>
     *     <tr>
     *       <td>Array reverser</td>
     *       <td>[[JW.abstractarray.Reverser]]</td>
     *       <td>[[$$toReversed]], [[createReverser]]</td>
     *     </tr>
     *   </tbody>
     * </table>
     *
     * Please keep the next rules in mind whenever you work with jWidget collections.
     *
     * 1) null and undefined items are prohibited in jWidget collections.
     * Use "Null Object" pattern if it is neccessary.
     *
     * 2) The majority of collection modification methods have 2 implementations: **tryMethod** and **method**.
     * These methods perform the same collection modification but return different result.
     * **tryMethod** is introduced for internal use mainly,
     * and *it always returns undefined if collection has not been modified*.
     * For example, [[tryClear]] returns undefined if collection is empty,
     * else it returns old collection contents.
     * **method** returns result in more friendly format.
     * For example, [[clear]] always returns old collection contents.
     * So, if you want to clear collection and destroy all items, [[clear]] method fits better:
     *
     *     JW.Array.each(array.clear(), JW.destroy); // correct
     *     JW.Array.each(array.tryClear(), JW.destroy); // incorrect: 'undefined' exception if array is empty
     *
     * 3) Majority of collection returning methods have 3 implementations: **method**, **$method** and **$$method**.
     * These methods perform the same modification but return the result in different format.
     *
     * * **method** returns native JavaScript collection: Array or Object.
     * * **$method** returns jWidget collection: [[JW.Array]],
     * [[JW.Map]] or [[JW.Set]].
     * * **$$method** returns jWidget collection and starts continuous synchronization with original
     * collection if one is observable. To stop synchronization, destroy the target collection.
     *
     * Please use a method that's more convenient in your specific situation.
     * For example, **$method** is convenient for chaining algorithm method calls.
     * So, previous example can become more readable with [[$clear]] method:
     *
     *     array.$clear().each(JW.destroy);
     *
     * But in the next example [[clear]] is still suitable:
     *
     *     set.addAll(array.clear());
     *
     * Whereas **$$method** is a shorthand for synchronizer creation:
     *
     *     this.set = this.own(array.$$toSet());
     *
     * Which is pretty much the same as:
     *
     *     this.set = this.own(array.createLister()).target;
     *
     * 4) It is better if all items in collection are unique. Some methods like
     * [[performReorder]] require each item to have an unique key.
     * If two items of collection are equal, then their keys are equal as well, so this method won't work correctly.
     *
     * # Collection methods
     *
     * Content retrieving:
     *
     * * [[getLength]] - Returns count of items in collection.
     * For observable collections, **length** property may come
     * in handy if you want to track collection length dynamically.
     * * [[isEmpty]] - Checks collection for emptiness.
     * * [[getFirst]] - Returns first item in collection.
     * * [[containsItem]] - Does collection contain the item?
     *
     * Iteration algorithms:
     *
     * * [[every]] - Checks all items by criteria.
     * Returns true if all items match the criteria.
     * * [[some]] - Checks each item by criteria.
     * Returns true if some item matches the criteria.
     * * [[each]] - Iterates items through.
     * * [[search]] - Finds item by criteria.
     * Returns first item matching the criteria.
     * * [[filter]], [[$filter]], [[$$filter]] - Filters collection by criteria.
     * Builds new collection of the same type, consisting of items matching the criteria.
     * * [[count]], [[$count]], [[$$count]] - Counts the items matching criteria.
     * * [[map]], [[$map]], [[$$mapValues]], [[$$mapObjects]] - Maps collection items.
     * Builds new collection of the same type, consisting of results of mapping function call for each collection item.
     * * [[toSorted]], [[$toSorted]],
     * [[toSortedComparing]], [[$toSortedComparing]],
     * [[$$toSortedComparing]] -
     * Builds array consisting of collection items sorted by indexer or comparer.
     * * [[index]], [[$index]], [[$$index]] - Indexes collection.
     * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
     * * [[toArray]], [[$toArray]], [[$$toArray]] -
     * Builds new array consisting of collection items.
     * * [[toSet]], [[$toSet]], [[$$toSet]] -
     * Builds new set consisting of collection items.
     * * [[asArray]], [[$asArray]] - Represents collection as array.
     * * [[asSet]], [[$asSet]] - Represents collection as set.
     *
     * Collection modification:
     *
     * * [[removeItem]] - Removes first occurency of an item in collection.
     * * [[removeItems]] - Removes all occurencies of items in collection.
     * * [[clear]], [[$clear]], [[tryClear]] - Clears collection.
     *
     * Synchronizers creation:
     *
     * * [[createMapper]] - Creates item mapper.
     * Extended version of [[$$mapValues]] and [[$$mapObjects]] methods.
     * * [[createFilterer]] - Creates filterer.
     * Extended version of [[$$filter]] method.
     * * [[createCounter]] - Creates matching item counter.
     * Extended version of [[$$count]] method.
     * * [[createLister]] - Creates converter to set.
     * Extended version of [[$$toSet]] method.
     * * [[createIndexer]] - Creates converter to map (indexer).
     * Extended version of [[$$index]] method.
     * * [[createOrderer]] - Creates converter to array (orderer).
     * Extended version of [[$$toArray]] method.
     * * [[createSorterComparing]] - Creates converter to array (sorter by comparer).
     * Extended version of [[$$toSortedComparing]] method.
     * * [[createObserver]] - Creates observer.
     *
     * Similar collection creation (for algorithms and synchronizers implementation):
     *
     * * [[createEmpty]] - Creates empty collection of the same type.
     * * [[createEmptyArray]] - Creates empty array of the same observability type.
     * * [[createEmptyMap]] - Creates empty map of the same observability type.
     * * [[createEmptySet]] - Creates empty set of the same observability type.
     *
     * All the same algorithms are also available for native JavaScript collections:
     *
     * * Array, see [[JW.Array]] static methods.
     * * Object as map, see [[JW.Map]] static methods.
     * * Object as set, see [[JW.Set]] static methods.
     *
     * @param T Collection item type.
     */
    var AbstractCollection = (function (_super) {
        __extends(AbstractCollection, _super);
        function AbstractCollection() {
            _super.apply(this, arguments);
            this._ownsItems = false;
        }
        AbstractCollection.prototype.destroyObject = function () {
            this.tryClear();
            _super.prototype.destroyObject.call(this);
        };
        /**
         * Makes this collection an owner of its items, which means that its items are alive as long as they are present in
         * this collection. The item is destroyed when it leaves the
         * collection, and all items are destroyed on the collection destruction.
         * @returns this
         */
        AbstractCollection.prototype.ownItems = function () {
            this._ownsItems = true;
            return this;
        };
        /**
         * Matches each item against criteria.
         *
         * Returns true if callback returns !== false for some collection item.
         *
         * Algorithms iterates items sequentially, and stops after first item matching the criteria.
         *
         * @param callback Criteria callback.
         * @param scope **callback** call scope. Defaults to collection itself.
         */
        AbstractCollection.prototype.some = function (callback, scope) {
            return !this.every(function (item) {
                return callback.call(this, item) === false;
            }, scope);
        };
        /**
         * Iterates collection items. Calls specified function for all items.
         *
         * @param callback Callback function.
         * @param scope **callback** call scope. Defaults to collection itself.
         */
        AbstractCollection.prototype.each = function (callback, scope) {
            this.every(function (item) {
                callback.call(this, item);
                return true;
            }, scope);
        };
        /**
         * Finds item matching criteria.
         *
         * Returns first item for which callback returns !== false.
         *
         * Algorithms iterates items sequentially, and stops after first item matching the criteria.
         *
         * @param callback Criteria callback.
         * @param scope **callback** call scope. Defaults to collection itself.
         * @returns Found item or undefined.
         */
        AbstractCollection.prototype.search = function (callback, scope) {
            var result;
            this.every(function (item) {
                if (callback.call(this, item) !== false) {
                    result = item;
                    return false;
                }
                return true;
            }, scope);
            return result;
        };
        /**
         * Converts collection to sorted array.
         *
         * Builds array consisting of collection items sorted by result of callback call for each item.
         *
         * @param callback Indexer function. Must return a comparable value, compatible with
         * [[JW.cmp]]. Returns item itself by default.
         * @param scope **callback** call scope. Defaults to collection itself.
         * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
         * @returns Sorted array.
         */
        AbstractCollection.prototype.$toSorted = function (callback, scope, order) {
            return new JW.Array(this.toSorted(callback, scope, order), true);
        };
        /**
         * Converts collection to sorted array.
         *
         * Builds array consisting of collection items sorted by comparer.
         *
         * @param compare Comparer function. Should return positive value if t1 > t2;
         * negative value if t1 < t2; 0 if t1 == t2.
         * Defaults to [[JW.cmp]]
         * @param scope **comparer** call scope. Defaults to collection itself.
         * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
         * @returns Sorted array.
         */
        AbstractCollection.prototype.$toSortedComparing = function (compare, scope, order) {
            return new JW.Array(this.toSortedComparing(compare, scope, order), true);
        };
        /**
         * Converts collection to sorted array.
         *
         * Builds array consisting of collection items sorted by comparer.
         * If this collection is observable, starts continuous synchronization,
         * i.e. creates [[JW.AbstractCollection.SorterComparing]] implicitly.
         *
         * @param compare Comparer function. Should return positive value if t1 > t2;
         * negative value if t1 < t2; 0 if t1 == t2.
         * Defaults to [[JW.cmp]]
         * @param scope **comparer** call scope. Defaults to collection itself.
         * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
         * @returns Sorted array.
         */
        AbstractCollection.prototype.$$toSortedComparing = function (compare, scope, order) {
            return this.$toSortedComparing(compare, scope, order);
        };
        /**
         * Indexes collection.
         *
         * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
         *
         * @param callback Indexer function.
         * @param scope **callback** call scope. Defaults to collection itself.
         * @returns Collection index.
         */
        AbstractCollection.prototype.index = function (callback, scope) {
            var result = {};
            this.every(function (item) {
                var key = callback.call(this, item);
                if (key != null) {
                    result[key] = item;
                }
                return true;
            }, scope);
            return result;
        };
        /**
         * Indexes collection.
         *
         * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
         *
         * @param callback Indexer function.
         * @param scope **callback** call scope. Defaults to collection itself.
         * @returns Collection index.
         */
        AbstractCollection.prototype.$index = function (callback, scope) {
            return new JW.Map(this.index(callback, scope), true);
        };
        /**
         * Indexes collection.
         *
         * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
         * If this collection is observable, starts continuous synchronization,
         * i.e. creates [[JW.AbstractCollection.Indexer]] implicitly.
         *
         * @param callback Indexer function.
         * @param scope **callback** call scope. Defaults to collection itself.
         * @returns Collection index.
         */
        AbstractCollection.prototype.$$index = function (callback, scope) {
            return this.$index(callback, scope);
        };
        /**
         * Converts collection to array.
         *
         * Builds new array consisting of collection items.
         */
        AbstractCollection.prototype.toArray = function () {
            var result = new _JW.A(this.getLength());
            var index = 0;
            this.every(function (item) {
                result[index++] = item;
                return true;
            });
            return result;
        };
        /**
         * Converts collection to array.
         *
         * Builds new array consisting of collection items.
         */
        AbstractCollection.prototype.$toArray = function () {
            return new JW.Array(this.toArray(), true);
        };
        /**
         * Converts collection to array.
         *
         * Builds new array consisting of collection items.
         * If this collection is observable, starts continuous synchronization,
         * i.e. creates [[JW.AbstractCollection.Orderer]] implicitly.
         */
        AbstractCollection.prototype.$$toArray = function () {
            return this.$toArray();
        };
        /**
         * Converts collection to set.
         *
         * Builds new set consisting of collection items.
         * Requires T to extend JW.Class.
         */
        AbstractCollection.prototype.toSet = function () {
            var result = {};
            this.every(function (item) {
                JW.Set.add(result, item);
                return true;
            });
            return result;
        };
        /**
         * Converts collection to set.
         *
         * Builds new set consisting of collection items.
         * Requires T to extend JW.Class.
         */
        AbstractCollection.prototype.$toSet = function () {
            return new JW.Set(this.toSet(), true);
        };
        /**
         * Converts collection to set.
         *
         * Builds new set consisting of collection items.
         * If this collection is observable, starts continuous synchronization,
         * i.e. creates [[JW.AbstractCollection.Lister]] implicitly.
         * Requires T to extend JW.Class.
         */
        AbstractCollection.prototype.$$toSet = function () {
            return this.$toSet();
        };
        /**
         * Represents collection as array.
         *
         * If this collection is array, returns it immediately.
         * Else, executes [[toArray]] method.
         * This method works usually faster than [[toArray]],
         * but please make sure that the returned array
         * won't be modified externally, because it can cause strange unexpected bugs.
         */
        AbstractCollection.prototype.asArray = function () {
            return this.toArray();
        };
        /**
         * Represents collection as array.
         *
         * If this collection is array, returns it immediately.
         * Else, executes [[toArray]] method.
         * This method works usually faster than [[toArray]],
         * but please make sure that the returned array
         * won't be modified externally, because it can cause strange unexpected bugs.
         */
        AbstractCollection.prototype.$asArray = function () {
            return new JW.Array(this.asArray(), true);
        };
        /**
         * Represents collection as set.
         *
         * If this collection is set, returns it immediately.
         * Else, executes [[toSet]] method.
         * This method works usually faster than [[toSet]],
         * but please make sure that the returned set
         * won't be modified externally, because it can cause strange unexpected bugs.
         * Requires T to extend JW.Class.
         */
        AbstractCollection.prototype.asSet = function () {
            return this.toSet();
        };
        /**
         * Represents collection as set.
         *
         * If this collection is set, returns it immediately.
         * Else, executes [[toSet]] method.
         * This method works usually faster than [[toSet]],
         * but please make sure that the returned set
         * won't be modified externally, because it can cause strange unexpected bugs.
         * Requires T to extend JW.Class.
         */
        AbstractCollection.prototype.$asSet = function () {
            return new JW.Set(this.asSet(), true);
        };
        /**
         * Counts the items matching criteria.
         *
         * Returns the number of items for which callback returns !== false.
         *
         * @param callback Criteria callback.
         * @param scope **callback** call scope. Defaults to collection itself.
         * @returns Number of items.
         */
        AbstractCollection.prototype.$count = function (callback, scope) {
            return new JW.Property(this.count(callback, scope));
        };
        /**
         * Counts the items matching criteria.
         *
         * Returns the number of items for which callback returns !== false.
         * If this collection is observable, starts continuous synchronization,
         * i.e. creates [[JW.AbstractCollection.Counter]] implicitly.
         *
         * @param callback Criteria callback.
         * @param scope **callback** call scope. Defaults to collection itself.
         * @returns Number of items.
         */
        AbstractCollection.prototype.$$count = function (callback, scope) {
            return this.$count(callback, scope);
        };
        return AbstractCollection;
    })(JW.Class);
    JW.AbstractCollection = AbstractCollection;
    var AbstractCollection;
    (function (AbstractCollection) {
        /**
         * Counter for collection items which match the specified filter.
         * Builds new JW.Property&lt;number&gt;, containing the number of items for which callback
         * function returns !== false.
         * If original collection is observable, starts continuous synchronization.
         *
         *     var source = new JW.ObservableArray<number>([1, 2, 3]);
         *     var counter = source.createCounter({
         *         filterItem: function(x) { return x % 2 === 1; }
         *     });
         *     var target = counter.target;
         *     assert.strictEqual(target.get(), 2); // two odd numbers: 1, 3
         *
         *     source.addAll([4, 7, 1, 6]);
         *     assert.strictEqual(target.get(), 4); // four odd numbers: 1, 3, 7, 1
         *
         *     counter.destroy();
         *
         * Use [[JW.AbstractCollection.createCounter|createCounter]] method to create the synchronizer.
         * The method selects a synchronizer implementation which fits better (simple or observable).
         *
         * You can pass target property in config option:
         *
         *     var source = new JW.ObservableSet();
         *     var target = new JW.Property<number>(0);
         *     var counter = source.createCounter({
         *         target: target,
         *         filterItem: this._filterItem,
         *         scope: this
         *     });
         *
         * In simple cases, [[JW.AbstractCollection.$$count|$$count]] shorthand can be used instead.
         * It returns the target property right away:
         *
         *     var source = new JW.ObservableArray<number>([1, 2, 3]);
         *     var target = source.$$count(function(x) { return x % 2 === 1; });
         *     assert.strictEqual(target.get(), 2); // two odd numbers: 1, 3
         *
         *     source.addAll([4, 7, 1, 6]);
         *     assert.strictEqual(target.get(), 4); // four odd numbers: 1, 3, 7, 1
         *
         *     target.destroy();
         *
         * You may use [[JW.AbstractCollection.Filterer|Filterer]] instead
         * of counter, but counter works much faster because it doesn't create a filtered collection.
         *
         *     var source = new JW.ObservableArray();
         *
         *     // via filterer
         *     var filterer = source.createFilterer({
         *         filterItem: this._filterItem,
         *         scope: this
         *     });
         *     var count = filterer.target.length; // JW.Property<number>
         *
         *     // via counter, works faster
         *     var counter = source.createCounter({
         *         filterItem: this._filterItem,
         *         scope: this
         *     });
         *     var count = counter.target; // JW.Property<number>
         *
         * Counter works correctly for observable collections only.
         *
         * @param T Collection item type.
         */
        var Counter = (function (_super) {
            __extends(Counter, _super);
            /**
             * Creates synchronizer.
             * [[JW.AbstractCollection.createCounter|createCounter]] method is preferred instead.
             *
             * @param source Source collection.
             * @param config Configuration.
             */
            function Counter(source, config) {
                _super.call(this);
                this.source = source;
                this._filterItem = config.filterItem;
                this._scope = config.scope || this;
                this._targetCreated = config.target == null;
                this.target = this._targetCreated ? new JW.Property(0) : config.target;
                this.target.set(source.count(this._filterItem, this._scope));
            }
            /**
             * @inheritdoc
             */
            Counter.prototype.destroyObject = function () {
                this.target.set(0);
                if (this._targetCreated) {
                    this.target.destroy();
                }
                this.source = null;
                this._filterItem = null;
                this.target = null;
                this._scope = null;
                _super.prototype.destroyObject.call(this);
            };
            /**
             * Changes counter configuration and recounts matching items.
             * @param config Options to modify.
             */
            Counter.prototype.reconfigure = function (config) {
                this._filterItem = config.filterItem || this._filterItem;
                this._scope = config.scope || this._scope;
                this.recount();
            };
            /**
             * Recounts matching items. Call this method when collection item properties change the way that
             * they must be refiltered.
             */
            Counter.prototype.recount = function () {
                this.target.set(this.source.count(this._filterItem, this._scope));
            };
            return Counter;
        })(JW.Class);
        AbstractCollection.Counter = Counter;
        /**
         * Collection filterer.
         * Builds new collection of the same type, consisting of items for which callback
         * function returns !== false.
         * If original collection is observable, starts continuous synchronization.
         * Keeps item order in array.
         *
         *     var source = new JW.ObservableArray<number>([1, 2, 3]);
         *     var filterer = source.createFilterer({
         *         filterItem: function(x) { return x % 2 === 1; }
         *     });
         *     var target = filterer.target;
         *     assert.ok(target.equal([1, 3]));
         *
         *     source.addAll([4, 7, 1, 6]);
         *     assert.ok(target.equal([1, 3, 7, 1]));
         *
         *     source.move(2, 6); // move "3" item to the end
         *     assert.ok(target.equal([1, 7, 1, 3]));
         *
         *     filterer.destroy();
         *
         * Use [[JW.AbstractCollection.createFilterer|createFilterer]] method to create the synchronizer.
         * The method selects a synchronizer implementation which fits better (simple or observable).
         *
         * You can pass target collection in config option:
         *
         *     var source = new JW.ObservableSet();
         *     var target = new JW.Set();
         *     var filterer = source.createFilterer({
         *         target: target,
         *         filterItem: this._filterItem,
         *         scope: this
         *     });
         *
         * In simple cases, [[JW.AbstractCollection.$$filter|$$filter]] shorthand can be used instead.
         * It returns the target collection right away:
         *
         *     var source = new JW.ObservableArray<number>([1, 2, 3]);
         *     var target = source.$$filter(function(x) { return x % 2 === 1; });
         *     assert.ok(target.equal([1, 3]));
         *
         *     source.addAll([4, 7, 1, 6]);
         *     assert.ok(target.equal([1, 3, 7, 1]));
         *
         *     source.move(2, 6); // move "3" item to the end
         *     assert.ok(target.equal([1, 7, 1, 3]));
         *
         *     target.destroy();
         *
         * Synchronizer rules:
         *
         * - Target collection is stored in [[target]] property.
         * - Filtered items are added to [[target]] immediately on synchronizer initialization.
         * - All items are removed from [[target]] on synchronizer destruction.
         * - You can pass target collection in
         * [[Filterer.Config.target|target]] config option.
         * In this case, you are responsible for its destruction (though items will be removed
         * automatically on synchronizer destruction anyway).
         * - If [[Filterer.Config.target|target]]
         * is not passed, it will be created automatically. Synchronizer will select
         * appropriate [[target]] implementation (simple or observable). In this
         * case, [[target]] will be destroyed automatically on synchronizer destruction.
         *
         * **Additional rules for different collection types**
         *
         * [[JW.AbstractArray]]:
         *
         * - Target collection must be empty before initialization.
         * - A target collection can be synchronized with one source collection only.
         *
         * [[JW.AbstractMap]]:
         *
         * - A target collection can be synchronized with multiple source collections, if keys of all items are different.
         * - You can add items to target collection manually, if their keys differ from source collection keys.
         *
         * [[JW.AbstractSet]]:
         *
         * - A target collection can be synchronized with multiple source collections, if all items are different.
         * - You can add items to target collection manually, if they differ from source collection items.
         *
         * @param T Collection item type.
         */
        var Filterer = (function (_super) {
            __extends(Filterer, _super);
            /**
             * Creates synchronizer.
             * [[JW.AbstractCollection.createFilterer|createFilterer]] method is preferred instead.
             *
             * @param source Source collection.
             * @param config Configuration.
             */
            function Filterer(source, config) {
                _super.call(this);
                this.source = source;
                this._filterItem = config.filterItem;
                this._scope = config.scope || this;
                this._targetCreated = config.target == null;
                this.target = this._targetCreated ? this.source.createEmpty() : config.target;
            }
            /**
             * @inheritdoc
             */
            Filterer.prototype.destroyObject = function () {
                if (this._targetCreated) {
                    this.target.destroy();
                }
                this.source = null;
                this._filterItem = null;
                this.target = null;
                this._scope = null;
                _super.prototype.destroyObject.call(this);
            };
            return Filterer;
        })(JW.Class);
        AbstractCollection.Filterer = Filterer;
        /**
         * Collection indexer.
         * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
         * If original collection is observable, starts continuous synchronization.
         * Can be used for fast item search by key (for example, by ID).
         *
         *     interface Item {
         *         id: number;
         *         label: string;
         *     }
         *
         *     var array = new JW.ObservableArray<Item>([{id: 9, label: "The item"}]);
         *     var indexer = array.createIndexer({
         *         getKey: function(item) { return String(item.id); },
         *         scope: this
         *     });
         *     var map = indexer.target;
         *
         *     // Get an item with ID = 9
         *     assert.strictEqual(map.get(9).label, "The item");
         *     assert.strictEqual(map.get(5), undefined);
         *
         *     // Target map is automatically synchronized with original observable array
         *     array.add({id: 5, label: "New item"});
         *     assert.strictEqual(map.get(5).label, "New item");
         *
         *     indexer.destroy();
         *
         * **Notice:** All items of source collection must have different (unique) string keys.
         *
         * Use [[JW.AbstractCollection.createFilterer|createFilterer]] method to create the synchronizer.
         * The method selects a synchronizer implementation which fits better (simple or observable).
         *
         * You can pass target map in config option:
         *
         *     var map = new JW.Map();
         *     var indexer = collection.createIndexer({
         *         target: map,
         *         getKey: function(item) { return String(item.id); },
         *         scope: this
         *     });
         *
         * In simple cases, [[JW.AbstractCollection.$$index|$$index]] shorthand can be used instead.
         * It returns the target map right away:
         *
         *     var array = new JW.ObservableArray<Item>([{id: 9, label: "The item"}]);
         *     var map = array.$$index(function(item) { return String(item.id); });
         *
         *     // Get an item with ID = 9
         *     assert.strictEqual(map.get(9).label, "The item");
         *     assert.strictEqual(map.get(5), undefined);
         *
         *     // Target map is automatically synchronized with original observable array
         *     array.add({id: 5, label: "New item"});
         *     assert.strictEqual(map.get(5).label, "New item");
         *
         *     map.destroy();
         *
         * Synchronizer rules:
         *
         * - Target map is stored in [[target]] property.
         * - All items of source collection are added to [[target]] immediately
         * on synchronizer initialization.
         * - All items are removed from [[target]] on synchronizer destruction.
         * - You can pass target map in
         * [[Indexer.Config.target|target]] config option.
         * In this case, you are responsible for its destruction (though items will be removed
         * automatically on synchronizer destruction anyway).
         * - If [[Indexer.Config.target|target]]
         * is not passed, it will be created automatically. Synchronizer will select
         * appropriate [[target]] implementation (simple or observable). In this
         * case, [[target]] will be destroyed automatically on synchronizer destruction.
         * - You can index multiple collections into one map, if keys of all items are different.
         *
         * @param T Collection item type.
         */
        var Indexer = (function (_super) {
            __extends(Indexer, _super);
            /**
             * Creates synchronizer.
             * [[JW.AbstractCollection.createIndexer|createIndexer]] method is preferred instead.
             *
             * @param source Source collection.
             * @param config Configuration.
             */
            function Indexer(source, config) {
                _super.call(this);
                this.source = source;
                this._getKey = config.getKey;
                this._scope = config.scope || this;
                this._targetCreated = config.target == null;
                this.target = this._targetCreated ? source.createEmptyMap() : config.target;
                this.target.trySetAll(this._index(source.asArray()));
            }
            /**
             * @inheritdoc
             */
            Indexer.prototype.destroyObject = function () {
                this.target.tryRemoveAll(this._keys(this.source.asArray()));
                if (this._targetCreated) {
                    this.target.destroy();
                }
                this.source = null;
                this._getKey = null;
                this.target = null;
                this._scope = null;
                _super.prototype.destroyObject.call(this);
            };
            /**
             * @hidden
             */
            Indexer.prototype._index = function (items) {
                var index = {};
                for (var i = 0, l = items.length; i < l; ++i) {
                    var item = items[i];
                    index[this._getKey.call(this._scope, item)] = item;
                }
                return index;
            };
            /**
             * @hidden
             */
            Indexer.prototype._keys = function (items) {
                var keys = [];
                for (var i = 0, l = items.length; i < l; ++i) {
                    keys.push(this._getKey.call(this._scope, items[i]));
                }
                return keys;
            };
            return Indexer;
        })(JW.Class);
        AbstractCollection.Indexer = Indexer;
        /**
         * Converter to set.
         * If original collection is observable, starts continuous synchronization.
         * Can be used for fast item existance detection.
         *
         *     // Create two dummy collection items
         *     var x = new JW.Class();
         *     var y = new JW.Class();
         *
         *     // Initialize collection and synchronizer
         *     var array = new JW.ObservableArray<JW.Class>([x]);
         *     var lister = array.createLister();
         *     var set = lister.target;
         *
         *     assert.ok(set.contains(x));
         *     assert.ok(!set.contains(y));
         *
         *     // Target set is automatically synchronized with original observable array
         *     array.add(y);
         *     assert.ok(set.contains(y));
         *
         *     lister.destroy();
         *
         * **Notice:** All items of source collection must be different (i.e. have unique _iid).
         *
         * Use [[JW.AbstractCollection.createLister|createLister]] method to create the synchronizer.
         * The method selects a synchronizer implementation which fits better (simple or observable).
         *
         * You can pass target collection in config option:
         *
         *     var set = new JW.Set<JW.Class>();
         *     var lister = collection.createLister({
         *         target: set
         *     });
         *
         * In simple cases, [[JW.AbstractCollection.$$toSet|$$toSet]] shorthand can be used instead.
         * It returns the target set right away:
         *
         *     // Create two dummy collection items
         *     var x = new JW.Class();
         *     var y = new JW.Class();
         *
         *     // Initialize collections
         *     var array = new JW.ObservableArray<JW.Class>([x]);
         *     var set = array.$$toSet();
         *
         *     assert.ok(set.contains(x));
         *     assert.ok(!set.contains(y));
         *
         *     // Target set is automatically synchronized with original observable array
         *     array.add(y);
         *     assert.ok(set.contains(y));
         *
         *     set.destroy();
         *
         * Synchronizer rules:
         *
         * - Target set is stored in [[target]] property.
         * - All items of source collection are added to [[target]] immediately on synchronizer initialization.
         * - All items are removed from [[target]] on synchronizer destruction.
         * - You can pass target set in
         * [[Lister.Config.target|target]] config option.
         * In this case, you are responsible for its destruction (though items will be removed
         * automatically on synchronizer destruction anyway).
         * - If [[Lister.Config.target|target]]
         * is not passed, it will be created automatically. Synchronizer will select
         * appropriate [[target]] implementation (simple or observable). In this
         * case, [[target]] will be destroyed automatically on synchronizer destruction.
         * - You can convert multiple collections into one set, if all items are different.
         *
         * @param T Collection item type.
         */
        var Lister = (function (_super) {
            __extends(Lister, _super);
            /**
             * Creates synchronizer.
             * [[JW.AbstractCollection.createLister|createLister]] method is preferred instead.
             *
             * @param source Source collection.
             * @param config Configuration.
             */
            function Lister(source, config) {
                if (config === void 0) { config = {}; }
                _super.call(this);
                this.source = source;
                this._targetCreated = config.target == null;
                this.target = this._targetCreated ? source.createEmptySet() : config.target;
                this.target.tryAddAll(source.asArray());
            }
            /**
             * @inheritdoc
             */
            Lister.prototype.destroyObject = function () {
                this.target.tryRemoveAll(this.source.asArray());
                if (this._targetCreated) {
                    this.target.destroy();
                }
                this.source = null;
                this.target = null;
                _super.prototype.destroyObject.call(this);
            };
            return Lister;
        })(JW.Class);
        AbstractCollection.Lister = Lister;
        /**
         * Collection item converter.
         * Builds new collection of the same type, consisting of results of callback function
         * call for each collection item.
         * If original collection is observable, starts continuous synchronization.
         *
         *     var source = new JW.ObservableArray<number>([1, 2]);
         *     var mapper = source.createMapper<number>({
         *         createItem: function(x) { return 2 * x }
         *     });
         *     var target = source.target;
         *
         *     assert.strictEqual(target.get(0), 2);
         *     assert.strictEqual(target.get(1), 4);
         *
         *     // Target collection is automatically synchronized with original observable collection
         *     source.add(3);
         *     assert.strictEqual(target.get(2), 6);
         *
         *     mapper.destroy();
         *
         * Can be used for data convertion into view.
         *
         *     var mapper = dataCollection.createMapper<View>({
         *         createItem: (data) => { return new View(this, data); },
         *         destroyItem: JW.destroy,
         *         scope: this
         *     });
         *     var viewCollection = mapper.target;
         *
         * Use [[JW.AbstractCollection.createMapper|createMapper]] method to create the synchronizer.
         * The method selects a synchronizer implementation which fits better (simple or observable).
         *
         * You can pass target collection in config option:
         *
         *     var viewCollection = new JW.Array<View>();
         *     var mapper = dataCollection.createMapper<View>({
         *         target: viewCollection,
         *         createItem: (data) => { return new View(this, data); },
         *         destroyItem: JW.destroy,
         *         scope: this
         *     });
         *
         * In simple cases, [[JW.AbstractCollection.$$mapValues|$$mapValues]]
         * and [[JW.AbstractCollection.$$mapObjects|$$mapObjects]] shorthands can be used instead.
         * They return the target collection right away:
         *
         *     var viewCollection = dataCollection.$$mapObjects<View>((data) => {
         *         return new View(this, data);
         *     }, this);
         *
         *     // Once not needed anymore, destroy
         *     viewCollection.destroy();
         *
         * Synchronizer rules:
         *
         * - Target collection is stored in [[target]] property.
         * - All items of source collection are converted and added to [[target]]
         * immediately on synchronizer initialization.
         * - All items are removed from [[target]] and destroyed on synchronizer destruction.
         * - You can pass target map in
         * [[Mapper.Config.target|target]] config option.
         * In this case, you are responsible for its destruction (though items will be removed and destroyed
         * automatically on synchronizer destruction anyway).
         * - If [[Mapper.Config.target|target]]
         * is not passed, it will be created automatically. Synchronizer will select
         * appropriate [[target]] implementation (simple or observable). In this
         * case, [[target]] will be destroyed automatically on synchronizer destruction.
         * - The items are not recreated in target collection on source items reordering/reindexing,
         * but they are reordered/reindexed according to source collection modification.
         *
         * **Additional rules for different collection types**
         *
         * [[JW.AbstractArray]]:
         *
         * - Target collection must be empty before initialization.
         * - You can't modify target collection manually and/or create other synchronizers with the same target collection.
         *
         * [[JW.AbstractMap]]:
         *
         * - A target collection can be synchronized with multiple source collections, if keys of all items are different.
         * - You can add items to target collection manually, if their keys differ from other collection keys.
         *
         * [[JW.AbstractSet]]:
         *
         * - A target collection can be synchronized with multiple source collections, if all items are different.
         * - You can add items to target collection manually, if they differ from other collection items.
         *
         * @param T Source collection item type.
         * @param U Target collection item type.
         */
        var Mapper = (function (_super) {
            __extends(Mapper, _super);
            /**
             * Creates synchronizer.
             * [[JW.AbstractCollection.createMapper|createMapper]] method is preferred instead.
             *
             * @param source Source collection.
             * @param config Configuration.
             */
            function Mapper(source, config) {
                _super.call(this);
                this.source = source;
                this._createItem = config.createItem;
                this._destroyItem = config.destroyItem;
                this._scope = config.scope || this;
                this._targetCreated = config.target == null;
                this.target = this._targetCreated ? this.source.createEmpty() : config.target;
            }
            /**
             * @inheritdoc
             */
            Mapper.prototype.destroyObject = function () {
                if (this._targetCreated) {
                    this.target.destroy();
                }
                this.source = null;
                this._createItem = null;
                this._destroyItem = null;
                this.target = null;
                this._scope = null;
                _super.prototype.destroyObject.call(this);
            };
            return Mapper;
        })(JW.Class);
        AbstractCollection.Mapper = Mapper;
        /**
         * Collection observer. Listens all collection events and reduces them to 2 granular functions:
         * item is added and item is removed. In optimization purposes, you can define a third function: collection is cleared
         * (in case if there is more effective clearing algorithm than iterative items deletion).
         * Also, you can define a function which is called on each collection modification.
         * For example, this synchronizer can be used to notify the items if they are added to collection.
         *
         *     var observer = collection.createObserver({
         *         addItem: function(item) { item.setInCollection(true); },
         *         removeItem: function(item) { item.setInCollection(false); },
         *         scope: this
         *     });
         *
         * Use [[JW.AbstractCollection.createObserver|createObserver]] method to create the synchronizer.
         * The method selects a synchronizer implementation which fits better (simple or observable).
         *
         * Just another observer use case: if you have an abstract collection on input (and you don't know whether it is
         * simple or observable), and you want to listen collection change event if it is observable,
         * then you can do it meeting OOD principles:
         *
         *     var observer = collection.createObserver({
         *         change: function() { console.log("Collection is changed"); }
         *     });
         *
         * Synchronizer rules:
         *
         * - Function [[Observer.Config.addItem|addItem]]
         * is called for all items of source collection on synchronizer initialization.
         * - Function [[Observer.Config.clearItems|clearItems]]
         * is called for collection, or function
         * [[Observer.Config.removeItem|removeItem]] is called for
         * all items of source collection on synchronizer destruction.
         * - Functions [[Observer.Config.addItem|addItem]],
         * [[Observer.Config.removeItem|removeItem]] and
         * [[Observer.Config.clearItems|clearItems]] are
         * not called on source collection reordering/reindexing.
         *
         * @param T Collection item type.
         */
        var Observer = (function (_super) {
            __extends(Observer, _super);
            /**
             * Creates synchronizer.
             * [[JW.AbstractCollection.createObserver|createObserver]] method is preferred instead.
             *
             * @param source Source collection.
             * @param config Configuration.
             */
            function Observer(source, config) {
                _super.call(this);
                this.source = source;
                config = config || {};
                this._addItem = config.addItem;
                this._removeItem = config.removeItem;
                this._clearItems = config.clearItems;
                this._change = config.change;
                this._scope = config.scope || this;
                this._addItems(source.asArray());
            }
            /**
             * @inheritdoc
             */
            Observer.prototype.destroyObject = function () {
                this._doClearItems(this.source.asArray());
                this.source = null;
                this._addItem = null;
                this._removeItem = null;
                this._clearItems = null;
                this._change = null;
                this._scope = null;
                _super.prototype.destroyObject.call(this);
            };
            /**
             * @hidden
             */
            Observer.prototype._addItems = function (items) {
                if (!this._addItem) {
                    return;
                }
                for (var i = 0, l = items.length; i < l; ++i) {
                    this._addItem.call(this._scope, items[i]);
                }
            };
            /**
             * @hidden
             */
            Observer.prototype._removeItems = function (items) {
                if (!this._removeItem) {
                    return;
                }
                for (var i = items.length - 1; i >= 0; --i) {
                    this._removeItem.call(this._scope, items[i]);
                }
            };
            /**
             * @hidden
             */
            Observer.prototype._doClearItems = function (items) {
                if (items.length === 0) {
                    return;
                }
                if (this._clearItems) {
                    this._clearItems.call(this._scope, items);
                }
                else {
                    this._removeItems(items);
                }
            };
            /**
             * @hidden
             */
            Observer.prototype._onChange = function () {
                this._change.call(this._scope);
            };
            return Observer;
        })(JW.Class);
        AbstractCollection.Observer = Observer;
        /**
         * Converter to array (orderer). Converts source collection to array.
         * Adds new items to the end of array.
         * If original collection is observable, starts continuous synchronization.
         *
         *     var map = new JW.ObservableMap<string>({a: "A", b: "B"});
         *     var orderer = map.createOrderer();
         *     var array = orderer.target;
         *
         *     assert.strictEqual(array.get(0), "A");
         *     assert.strictEqual(array.get(1), "B");
         *
         *     // Target array is automatically synchronized with original observable collection
         *     map.set("C", "c");
         *     assert.strictEqual(array.get(2), "C");
         *
         *     orderer.destroy();
         *
         * **Notice:** All items of source collection must be different.
         *
         * Use [[JW.AbstractCollection.createOrderer|createOrderer]] method to create the synchronizer.
         * The method selects a synchronizer implementation which fits better (simple or observable).
         *
         * You can pass target array in config option:
         *
         *     var array = new JW.Array();
         *     var orderer = collection.createOrderer({
         *         target: array
         *     });
         *
         * In simple cases, [[JW.AbstractCollection.$$toArray|$$toArray]] shorthand can be used instead.
         * It returns the target array right away:
         *
         *     var map = new JW.ObservableMap<string>({a: "A", b: "B"});
         *     var array = map.$$toArray();
         *
         *     assert.strictEqual(array.get(0), "A");
         *     assert.strictEqual(array.get(1), "B");
         *
         *     // Target array is automatically synchronized with original observable collection
         *     map.set("C", "c");
         *     assert.strictEqual(array.get(2), "C");
         *
         *     array.destroy();
         *
         * Synchronizer rules:
         *
         * - Target array is stored in [[target]] property.
         * - All items of source collection are added to [[target]]
         * immediately on synchronizer initialization.
         * - All items are removed from [[target]] on synchronizer destruction.
         * - You can pass target array in [[Orderer.Config.target|target]] config option.
         * In this case, you are responsible for its destruction (though items will be removed
         * automatically on synchronizer destruction anyway).
         * - If [[Orderer.Config.target|target]] is not passed, it will be created automatically. Synchronizer will select
         * appropriate [[target]] implementation (simple or observable). In this
         * case, [[target]] will be destroyed automatically on synchronizer destruction.
         * - You can convert multiple collections into one array, if all items are different.
         *
         * @param T Collection item type.
         */
        var Orderer = (function (_super) {
            __extends(Orderer, _super);
            /**
             * Creates synchronizer.
             * [[JW.AbstractCollection.createOrderer|createOrderer]] method is preferred instead.
             *
             * @param source Source collection.
             * @param config Configuration.
             */
            function Orderer(source, config) {
                if (config === void 0) { config = {}; }
                _super.call(this);
                this.source = source;
                this._targetCreated = config.target == null;
                this.target = this._targetCreated ? source.createEmptyArray() : config.target;
                this.target.tryAddAll(source.asArray());
            }
            /**
             * @inheritdoc
             */
            Orderer.prototype.destroyObject = function () {
                this.target.removeItems(this.source.asArray());
                if (this._targetCreated) {
                    this.target.destroy();
                }
                this.source = null;
                this.target = null;
                _super.prototype.destroyObject.call(this);
            };
            /**
             * @hidden
             */
            Orderer.prototype._splice = function (removedItemsSet, addedItemsSet) {
                var filteredItems = this.target.filter(function (item) {
                    return !JW.Set.contains(removedItemsSet, item) || JW.Set.contains(addedItemsSet, item);
                });
                var addedItems = JW.Set.$toArray(addedItemsSet).filter(function (item) {
                    return !JW.Set.contains(removedItemsSet, item);
                });
                this.target.trySplice(this.target.detectFilter(filteredItems) || [], [new JW.AbstractArray.IndexItems(filteredItems.length, addedItems)]);
            };
            return Orderer;
        })(JW.Class);
        AbstractCollection.Orderer = Orderer;
        /**
         * Converter to array (sorter by comparer).
         * Converts source collection to array. Adds new items into such locations that target array is always kept in sorted
         * state. If original collection is observable, starts continuous synchronization.
         * Sorting is performed by comparing function defined by user.
         *
         *     interface Item {
         *         id: number;
         *         title: string;
         *     }
         *
         *     var source = new JW.ObservableArray<Item>([
         *         {title: "apple", id: 3},
         *         {title: "Carrot", id: 1},
         *         {title: "Apple", id: 2}
         *     ]);
         *
         *     // Sort by title case-insensitively, and then by id
         *     var sorter = source.createSorterComparing({
         *         compare: function(x, y) {
         *             return JW.cmp(x.title, y.title, true) || JW.cmp(x.id, y.id);
         *         },
         *         scope: this
         *     });
         *     var target = sorter.target;
         *
         *     assert.strictEqual(target.get(0).id, 2); // Apple
         *     assert.strictEqual(target.get(1).id, 3); // apple
         *     assert.strictEqual(target.get(2).id, 1); // Carrot
         *
         *     // Target array is automatically synchronized with original observable collection
         *     source.add({title: "Banana", id: 4});
         *     assert.strictEqual(target.get(0).id, 2); // Apple
         *     assert.strictEqual(target.get(1).id, 3); // apple
         *     assert.strictEqual(target.get(2).id, 4); // Banana
         *     assert.strictEqual(target.get(3).id, 1); // Carrot
         *
         *     sorter.destroy();
         *
         * Use [[JW.AbstractCollection.createSorterComparing|createSorterComparing]] method to create the synchronizer.
         * The method selects a synchronizer implementation which fits better (simple or observable).
         *
         * You can pass target array in config option:
         *
         *     var array = new JW.Array();
         *     var sorter = collection.createSorterComparing({
         *         target: array,
         *         compare: function(x, y) {
         *             return JW.cmp(x.title, y.title, true) || JW.cmp(x.id, y.id);
         *         },
         *         scope: this
         *     });
         *
         * In simple cases, [[JW.AbstractCollection.$$toSortedComparing|$$toSortedComparing]] shorthand can be used instead.
         * It returns the target array right away:
         *
         *     var source = new JW.ObservableArray<Item>([
         *         {title: "apple", id: 3},
         *         {title: "Carrot", id: 1},
         *         {title: "Apple", id: 2}
         *     ]);
         *
         *     // Sort by title case-insensitively, and then by id
         *     var target = source.$$toSortedComparing(function(x, y) {
         *         return JW.cmp(x.title, y.title, true) || JW.cmp(x.id, y.id);
         *     });
         *
         *     assert(target.get(0).id === 2); // Apple
         *     assert(target.get(1).id === 3); // apple
         *     assert(target.get(2).id === 1); // Carrot
         *
         *     // Target array is automatically synchronized with original observable collection
         *     source.add({title: "Banana", id: 4});
         *     assert(target.get(0).id === 2); // Apple
         *     assert(target.get(1).id === 3); // apple
         *     assert(target.get(2).id === 4); // Banana
         *     assert(target.get(3).id === 1); // Carrot
         *
         *     target.destroy();
         *
         * Synchronizer rules:
         *
         * - Target array is stored in [[target]] property.
         * - All items of source collection are added to [[target]]
         * immediately on synchronizer initialization.
         * - All items are removed from [[target]] on synchronizer destruction.
         * - You can pass target array in
         * [[SorterComparing.Config.target|target]] config option.
         * In this case, you are responsible for its destruction (though items will be removed
         * automatically on synchronizer destruction anyway).
         * - If [[SorterComparing.Config.target|target]]
         * is not passed, it will be created automatically. Synchronizer will select
         * appropriate [[target]] implementation (simple or observable). In this
         * case, [[target]] will be destroyed automatically on synchronizer destruction.
         * - You can sort multiple collections into one array.
         *
         * @param T Collection item type.
         */
        var SorterComparing = (function (_super) {
            __extends(SorterComparing, _super);
            /**
             * Creates synchronizer.
             * [[JW.AbstractCollection.createSorterComparing|createSorterComparing]] method is preferred instead.
             *
             * @param source Source collection.
             * @param config Configuration.
             */
            function SorterComparing(source, config) {
                _super.call(this);
                this.source = source;
                this._compare = config.compare || JW.cmp;
                this._order = config.order || 1;
                this._scope = config.scope || this;
                this._targetCreated = config.target == null;
                this.target = this._targetCreated ? source.createEmptyArray() : config.target;
                this._splice([], source.asArray());
            }
            /**
             * @inheritdoc
             */
            SorterComparing.prototype.destroyObject = function () {
                this._splice(this.source.asArray(), []);
                if (this._targetCreated) {
                    this.target.destroy();
                }
                this.source = null;
                this.target = null;
                this._compare = null;
                this._scope = null;
                _super.prototype.destroyObject.call(this);
            };
            /**
             * Resorts target array forcibly. Call this method on sorting factors modification.
             */
            SorterComparing.prototype.resort = function () {
                this.target.sortComparing(this._compare, this._scope, this._order);
            };
            /**
             * @hidden
             */
            SorterComparing.prototype._splice = function (removedItems, addedItems) {
                var removedItemsSorted = JW.Array.toSortedComparing(removedItems, this._compare, this._scope, this._order);
                var addedItemsSorted = JW.Array.toSortedComparing(addedItems, this._compare, this._scope, this._order);
                removedItems = new _JW.A(removedItems.length);
                addedItems = new _JW.A(addedItems.length);
                var iRemoved = 0;
                var iAdded = 0;
                var jRemoved = 0;
                var jAdded = 0;
                // ignore out the items which are removed and added at the same time
                while ((iRemoved < removedItemsSorted.length) || (iAdded < addedItemsSorted.length)) {
                    var removedItem = removedItemsSorted[iRemoved];
                    var addedItem = addedItemsSorted[iAdded];
                    var c = JW.cmp(removedItem === undefined, addedItem === undefined) ||
                        (this._order * this._compare.call(this._scope, removedItem, addedItem));
                    if (c < 0) {
                        removedItems[jRemoved++] = removedItem;
                        ++iRemoved;
                    }
                    else if (c > 0) {
                        addedItems[jAdded++] = addedItem;
                        ++iAdded;
                    }
                    else {
                        ++iRemoved;
                        ++iAdded;
                    }
                }
                removedItems.splice(jRemoved, removedItems.length - jRemoved);
                addedItems.splice(jAdded, addedItems.length - jAdded);
                var iAdds = 0;
                var addShift = 0;
                var removeParamsList = [];
                var addParamsList = [];
                var removeParams = null;
                for (var iTarget = 0, lTarget = this.target.getLength(); iTarget < lTarget; ++iTarget) {
                    var value = this.target.get(iTarget);
                    if (removedItems[JW.Array.binarySearch(removedItems, value, this._compare, this._scope, this._order) - 1] === value) {
                        if (!removeParams) {
                            removeParams = new JW.AbstractArray.IndexCount(iTarget, 0);
                            removeParamsList.push(removeParams);
                        }
                        ++removeParams.count;
                        --addShift;
                    }
                    else {
                        removeParams = null;
                        var addParams = new JW.AbstractArray.IndexItems(iTarget + addShift, []);
                        while ((iAdds < addedItems.length) && (this._order * this._compare.call(this._scope, addedItems[iAdds], value) < 0)) {
                            addParams.items.push(addedItems[iAdds++]);
                            ++addShift;
                        }
                        if (addParams.items.length !== 0) {
                            addParamsList.push(addParams);
                        }
                    }
                }
                if (iAdds < addedItems.length) {
                    addParamsList.push(new JW.AbstractArray.IndexItems(iTarget + addShift, addedItems.slice(iAdds)));
                }
                this.target.trySplice(removeParamsList, addParamsList);
            };
            return SorterComparing;
        })(JW.Class);
        AbstractCollection.SorterComparing = SorterComparing;
    })(AbstractCollection = JW.AbstractCollection || (JW.AbstractCollection = {}));
})(JW || (JW = {}));
;
/// <reference path="../jwlib.ref.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JW;
(function (JW) {
    /**
     * Abstract collection of items of type T with keys of type K.
     *
     * There are 2 indexed collection types:
     *
     * * [[JW.AbstractArray]] (key is number)
     * * [[JW.AbstractMap]] (key is string)
     *
     * Please keep the next rule in mind whenever you work with jWidget indexed collections:
     * in arguments, item always goes first and key goes last.
     *
     * # Indexed collection methods
     *
     * **Difference compared to [[JW.AbstractCollection]] is in bold.**
     *
     * Content retrieving:
     *
     * * [[getLength]] - Returns count of items in collection.
     * For observable collections, **length** property may come
     * in handy if you want to track collection length dynamically.
     * * [[isEmpty]] - Checks collection for emptiness.
     * * **[[get]] - Returns collection item by key.**
     * * [[getFirst]] - Returns first item in collection
     * * **[[getFirstKey]] - Returns key of first item in collection.**
     * * **[[getKeys]], [[$getKeys]] - Returns array of all item keys.**
     * * [[containsItem]] - Does collection contain the item?
     * * **[[containsKey]] - Does collection contain the key?**
     * * **[[keyOf]] - Returns item key. If item is not found, returns undefined.**
     *
     * Iteration algorithms (**callback functions are overridden and take extra arguments - item keys**):
     *
     * * [[every]] - Checks all items by criteria.
     * Returns true if all items match the criteria.
     * * [[some]] - Checks each item by criteria.
     * Returns true if some item matches the criteria.
     * * [[each]] - Iterates items through.
     * * [[search]] - Finds item by criteria.
     * Returns first item matching the criteria.
     * * **[[find]] - Finds item by criteria.
     * Returns key of first item matching the criteria.**
     * * [[filter]], [[$filter]],
     * [[$$filter]] - Filters collection by criteria.
     * Builds new collection of the same type, consisting of items matching the criteria.
     * * [[count]], [[$count]],
     * [[$$count]] - Counts the items matching criteria.
     * * [[map]], [[$map]],
     * [[$$mapValues]], [[$$mapObjects]] - Maps collection items.
     * Builds new collection of the same type, consisting of results of mapping function call for each collection item.
     * * [[toSorted]], [[$toSorted]],
     * [[toSortedComparing]], [[$toSortedComparing]],
     * [[$$toSortedComparing]] -
     * Builds array consisting of collection items sorted by indexer or comparer.
     * * **[[getSortingKeys]], [[$getSortingKeys]],
     * [[getSortingKeysComparing]],
     * [[$getSortingKeysComparing]] -
     * Returns indexes of collection items sorted by indexer or comparer.**
     * * [[index]], [[$index]],
     * [[$$index]] - Indexes collection.
     * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
     * * [[toArray]], [[$toArray]],
     * [[$$toArray]] - Builds new array consisting of collection items.
     * * **[[toMap]], [[$toMap]] - Builds new map consisting of collection items.**
     * * [[toSet]], [[$toSet]],
     * [[$$toSet]] - Builds new set consisting of collection items.
     * * [[asArray]], [[$asArray]] - Represents collection as array.
     * * **[[asMap]], [[$asMap]] - Represents collection as map.**
     * * [[asSet]], [[$asSet]] - Represents collection as set.
     *
     * Collection modification:
     *
     * * **[[set]], [[trySet]] - Replaces an item by key.**
     * * **[[remove]], [[tryRemove]] - Removes an item by key.**
     * * [[removeItem]] - Removes first occurency of an item in collection.
     * * [[removeItems]] - Removes all occurencies of items in collection.
     * * [[clear]], [[$clear]], [[tryClear]] - Clears collection.
     *
     * Synchronizers creation:
     *
     * * [[createMapper]] - Creates item mapper.
     * Extended version of [[$$mapValues]] and [[$$mapObjects]] methods.
     * * [[createFilterer]] - Creates filterer.
     * Extended version of [[$$filter]] method.
     * * [[createCounter]] - Creates matching item counter.
     * Extended version of [[$$count]] method.
     * * [[createLister]] - Creates converter to set.
     * Extended version of [[$$toSet]] method.
     * * [[createIndexer]] - Creates converter to map (indexer).
     * Extended version of [[$$index]] method.
     * * [[createOrderer]] - Creates converter to array (orderer).
     * Extended version of [[$$toArray]] method.
     * * [[createSorterComparing]] - Creates converter to array (sorter by comparer).
     * Extended version of [[$$toSortedComparing]] method.
     * * [[createObserver]] - Creates observer.
     *
     * Similar collection creation (for algorithms and synchronizers implementation):
     *
     * * [[createEmpty]] - Creates empty collection of the same type.
     * * [[createEmptyArray]] - Creates empty array of the same observability type.
     * * [[createEmptyMap]] - Creates empty map of the same observability type.
     * * [[createEmptySet]] - Creates empty set of the same observability type.
     *
     * All the same algorithms are also available for native JavaScript collections:
     *
     * * Array, see [[JW.Array]] static methods.
     * * Object as map, see [[JW.Map]] static methods.
     *
     * @param K Collection item key type.
     * @param T Collection item type.
     */
    var IndexedCollection = (function (_super) {
        __extends(IndexedCollection, _super);
        function IndexedCollection() {
            _super.apply(this, arguments);
        }
        /**
         * @inheritdoc
         */
        IndexedCollection.prototype.ownItems = function () {
            _super.prototype.ownItems.call(this);
            return this;
        };
        /**
         * Returns array of keys of all collection items.
         */
        IndexedCollection.prototype.$getKeys = function () {
            return new JW.Array(this.getKeys(), true);
        };
        /**
         * Checks existance of item with specified key in collection.
         */
        IndexedCollection.prototype.containsKey = function (key) {
            return this.get(key) !== undefined;
        };
        /**
         * @inheritdoc
         */
        IndexedCollection.prototype.containsItem = function (item) {
            return !this.every(function (v) {
                return item !== v;
            });
        };
        /**
         * Returns key of item in collection. If such item doesn't exist, returns undefined.
         */
        IndexedCollection.prototype.keyOf = function (item) {
            return this.find(function (v) {
                return item === v;
            });
        };
        /**
         * Replaces item with specified key. If collection doesn't contain such key:
         *
         * * Array will be broken.
         * * Map will add a new item.
         *
         * @returns The replaced item.
         */
        IndexedCollection.prototype.set = function (item, key) {
            var result = this.trySet(item, key);
            return (result !== undefined) ? result.value : this.get(key);
        };
        /**
         * Removes item with specified key. If collection doesn't contain such key:
         *
         * * Array will be broken.
         * * Map will add a new item.
         *
         * @returns The removed item.
         */
        IndexedCollection.prototype.remove = function (key) {
            return this.tryRemove(key);
        };
        /**
         * @inheritdoc
         */
        IndexedCollection.prototype.removeItem = function (item) {
            var key = this.keyOf(item);
            if (key !== undefined) {
                this.tryRemove(key);
            }
            return key;
        };
        /**
         * @inheritdoc
         */
        IndexedCollection.prototype.some = function (callback, scope) {
            return !this.every(function (item, key) {
                return callback.call(this, item, key) === false;
            }, scope);
        };
        /**
         * @inheritdoc
         */
        IndexedCollection.prototype.each = function (callback, scope) {
            this.every(function (item, key) {
                callback.call(this, item, key);
                return true;
            }, scope);
        };
        /**
         * Finds item matching criteria.
         *
         * Returns key of first item for which callback returns !== false.
         *
         * Algorithms iterates items sequentially, and stops after first item matching the criteria.
         *
         * @param callback Criteria callback.
         * @param scope **callback** call scope. Defaults to collection itself.
         * @returns Found item key or undefined.
         */
        IndexedCollection.prototype.find = function (callback, scope) {
            var result;
            this.every(function (item, key) {
                if (callback.call(this, item, key) !== false) {
                    result = key;
                    return false;
                }
                return true;
            }, scope);
            return result;
        };
        /**
         * @inheritdoc
         */
        IndexedCollection.prototype.search = function (callback, scope) {
            if (scope === void 0) { scope = null; }
            var result;
            this.every(function (item, key) {
                if (callback.call(this, item, key) !== false) {
                    result = item;
                    return false;
                }
                return true;
            }, scope);
            return result;
        };
        /**
         * @inheritdoc
         */
        IndexedCollection.prototype.$toSorted = function (callback, scope, order) {
            return new JW.Array(this.toSorted(callback, scope, order), true);
        };
        /**
         * @inheritdoc
         */
        IndexedCollection.prototype.$toSortedComparing = function (compare, scope, order) {
            return new JW.Array(this.toSortedComparing(compare, scope, order), true);
        };
        /**
         * Returns keys of sorted items.
         *
         * Builds array of item keys, sorted by result of callback call for each item.
         *
         * @param callback Indexer function. Must return a comparable value, compatible with
         * [[JW.cmp]]. Returns item itself by default.
         * @param scope **callback** call scope. Defaults to collection itself.
         * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
         * @returns Sorted item keys array.
         */
        IndexedCollection.prototype.$getSortingKeys = function (callback, scope, order) {
            return new JW.Array(this.getSortingKeys(callback, scope, order), true);
        };
        /**
         * Returns keys of sorted items.
         *
         * Builds array of item keys, sorted by comparer.
         *
         * @param compare Comparer function. Should return positive value if t1 > t2;
         * negative value if t1 < t2; 0 if t1 == t2.
         * Defaults to [[JW.cmp]]
         * @param scope **comparer** call scope. Defaults to collection itself.
         * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
         * @returns Sorted item keys array.
         */
        IndexedCollection.prototype.$getSortingKeysComparing = function (compare, scope, order) {
            return new JW.Array(this.getSortingKeysComparing(compare, scope, order), true);
        };
        /**
         * @inheritdoc
         */
        IndexedCollection.prototype.index = function (callback, scope) {
            var result = {};
            this.every(function (item, key) {
                var k = callback.call(this, item, key);
                if (k != null) {
                    result[k] = item;
                }
                return true;
            }, scope);
            return result;
        };
        /**
         * @inheritdoc
         */
        IndexedCollection.prototype.$index = function (callback, scope) {
            return new JW.Map(this.index(callback, scope), true);
        };
        /**
         * Converts collection to map.
         *
         * Builds new map consisting of collection items.
         */
        IndexedCollection.prototype.toMap = function () {
            var result = {};
            this.every(function (v, k) {
                result[_JW.S(k)] = v;
                return true;
            });
            return result;
        };
        /**
         * Converts collection to map.
         *
         * Builds new map consisting of collection items.
         */
        IndexedCollection.prototype.$toMap = function () {
            return new JW.Map(this.toMap(), true);
        };
        /**
         * Represents collection as map.
         *
         * If this collection is map, returns it immediately. Else, executes [[toMap]] method.
         * This method works usually faster than [[toMap]], but please make sure that the returned map
         * won't be modified externally, because it can cause strange unexpected bugs.
         */
        IndexedCollection.prototype.asMap = function () {
            return this.toMap();
        };
        /**
         * Represents collection as map.
         *
         * If this collection is map, returns it immediately. Else, executes [[toMap]] method.
         * This method works usually faster than [[toMap]], but please make sure that the returned map
         * won't be modified externally, because it can cause strange unexpected bugs.
         */
        IndexedCollection.prototype.$asMap = function () {
            return new JW.Map(this.asMap(), true);
        };
        /**
         * @inheritdoc
         */
        IndexedCollection.prototype.$count = function (callback, scope) {
            return new JW.Property(this.count(callback, scope));
        };
        /**
         * @inheritdoc
         */
        IndexedCollection.prototype.$$count = function (callback, scope) {
            return this.$count(callback, scope);
        };
        return IndexedCollection;
    })(JW.AbstractCollection);
    JW.IndexedCollection = IndexedCollection;
})(JW || (JW = {}));
;
/// <reference path="../jwlib.ref.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JW;
(function (JW) {
    /**
     * Array is ordered collection. Each item of array has an index. Index of first item is 0,
     * index of each next one is higher by 1.
     *
     * # Array methods
     *
     * **Difference compared to [[JW.IndexedCollection]] is in bold.**
     *
     * Content retrieving:
     *
     * * [[getLength]] - Returns count of items in collection.
     * For observable collections, **length** property may come
     * in handy if you want to track collection length dynamically.
     * * [[isEmpty]] - Checks collection for emptiness.
     * * [[get]] - Returns collection item by index.
     * * [[getFirst]] - Returns first item in collection.
     * * **[[getLast]] - Returns last item in collection.**
     * * [[getFirstKey]] - Returns index of first item in collection.
     * * **[[getLastKey]] - Returns index of last item in collection.**
     * * [[getKeys]], [[$getKeys]] - Returns array of all item indexes.
     * * [[containsItem]] - Does collection contain the item?
     * * [[containsKey]] - Does collection contain the index?
     * * [[keyOf]] - Returns item index. If item is not found, returns undefined.
     * * **[[indexOf]] - Returns item index. If item is not found, return -1.**
     * * **[[getItems]] - Returns internal representation of array.**
     * * **[[binarySearch]] - Finds the index by binary search.**
     *
     * Iteration algorithms:
     *
     * * [[every]] - Checks all items by criteria.
     * Returns true if all items match the criteria.
     * * [[some]] - Checks each item by criteria.
     * Returns true if some item matches the criteria.
     * * [[each]] - Iterates items.
     * * [[search]] - Finds item by criteria.
     * Returns first item matching the criteria.
     * * [[find]] - Finds item by criteria.
     * Returns index of first item matching the criteria.
     * * [[filter]], [[$filter]],
     * [[$$filter]] - Filters collection by criteria.
     * Builds new collection of the same type, consisting of items matching the criteria.
     * * [[count]], [[$count]],
     * [[$$count]] - Counts the items matching criteria.
     * * [[map]], [[$map]],
     * [[$$mapValues]], [[$$mapObjects]] - Maps collection items.
     * Builds new collection of the same type, consisting of results of mapping function call for each collection item.
     * * [[toSorted]], [[$toSorted]],
     * [[toSortedComparing]], [[$toSortedComparing]],
     * [[$$toSortedComparing]] -
     * Builds array consisting of collection items sorted by indexer or comparer.
     * * [[getSortingKeys]], [[$getSortingKeys]],
     * [[getSortingKeysComparing]],
     * [[$getSortingKeysComparing]] -
     * Returns indexes of collection items sorted by indexer or comparer.
     * * [[index]], [[$index]],
     * [[$$index]] - Indexes collection.
     * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
     * * [[toArray]], [[$toArray]],
     * [[$$toArray]] - Builds new array consisting of collection items.
     * * [[toMap]], [[$toMap]] - Builds new map consisting of collection items.
     * * [[toSet]], [[$toSet]],
     * [[$$toSet]] - Builds new set consisting of collection items.
     * * [[asArray]], [[$asArray]] - Represents collection as array.
     * * [[asMap]], [[$asMap]] - Represents collection as map.
     * * [[asSet]], [[$asSet]] - Represents collection as set.
     * * **[[backEvery]] - Checks all items by criteria in backward order.**
     * * **[[merge]], [[$merge]],
     * [[$$merge]] - *suitable if array consists of JW.AbstractArray instances only.*
     * Builds array consisting of items of subarrays in the same order.**
     * * **[[toReversed]], [[$toReversed]],
     * [[$$toReversed]] -
     * Builds array consisting of collection items in reverse order.**
     *
     * Collection modification:
     *
     * * **[[add]], [[tryAdd]] - Inserts an item.**
     * * **[[addAll]], [[tryAddAll]] - Inserts item range.**
     * * [[set]], [[trySet]] - Replaces an item by index.
     * * [[remove]], [[tryRemove]] - Removes an item by index.
     * * **[[removeAll]], [[$removeAll]],
     * [[tryRemoveAll]] - Removes item range.**
     * * [[removeItem]] - Removes first occurency of an item in collection.
     * * [[removeItems]] - Removes all occurencies of items in collection.
     * * **[[pop]] - Removes last item.**
     * * **[[move]], [[tryMove]] - Moves item.**
     * * [[clear]], [[$clear]],
     * [[tryClear]] - Clears collection.
     * * **[[splice]], [[trySplice]] - Removes/inserts item ranges.**
     * * **[[reorder]], [[tryReorder]] - Reorders items.**
     * * **[[sort]], [[sortComparing]] - Sorts array.**
     * * **[[reverse]] - Reverses item order in array.**
     * * **[[performSplice]] - Adjusts contents using [[splice]]. method.**
     * * **[[performFilter]] - Filters contents using [[splice]]. method.**
     * * **[[performReorder]] - Adjusts contents using [[reorder]]. method.**
     *
     * Synchronizers creation:
     *
     * * [[createMapper]] - Creates item mapper.
     * Extended version of [[$$mapValues]] and [[$$mapObjects]] methods.
     * * [[createFilterer]] - Creates filterer.
     * Extended version of [[$$filter]] method.
     * * [[createCounter]] - Creates matching item counter.
     * Extended version of [[$$count]] method.
     * * [[createLister]] - Creates converter to set.
     * Extended version of [[$$toSet]] method.
     * * [[createIndexer]] - Creates converter to map (indexer).
     * Extended version of [[$$index]] method.
     * * [[createOrderer]] - Creates converter to array (orderer).
     * Extended version of [[$$toArray]] method.
     * * [[createSorterComparing]] - Creates converter to array (sorter by comparer).
     * Extended version of [[$$toSortedComparing]] method.
     * * [[createObserver]] - Creates observer.
     * * **[[createInserter]] - Creates view synchronizer with array.**
     * * **[[createMerger]] - Creates arrays merger.
     * Extended version of [[$$merge]] method.**
     * * **[[createReverser]] - Creates array reverser.
     * Extended version of [[$$toReversed]] method.**
     *
     * Similar collection creation (for algorithms and synchronizers implementation):
     *
     * * [[createEmpty]] - Creates empty collection of the same type.
     * * [[createEmptyArray]] - Creates empty array of the same observability level.
     * * [[createEmptyMap]] - Creates empty map of the same observability level.
     * * [[createEmptySet]] - Creates empty set of the same observability level.
     *
     * Other methods:
     *
     * * **[[detectSplice]] - Detects [[splice]] method arguments to adjust contents.**
     * * **[[detectFilter]] - Detects removeParamsList argument of [[splice]] method to filter contents.**
     * * **[[detectReorder]] - Detects [[reorder]] method arguments to adjust contents.**
     * * **[[detectSort]] - Detects [[reorder]] method arguments to sort by indexer.**
     * * **[[detectSortComparing]] - Detects [[reorder]] method arguments to sort by comparer.**
     * * **[[collapse]] - Collapses multi-dimensional array.**
     * * **[[equal]] - Checks for equality to another array.**
     *
     * All the same algorithms are also available for native JavaScript Array,
     * see [[JW.Array]] static methods.
     *
     * @param T Array item type.
     */
    var AbstractArray = (function (_super) {
        __extends(AbstractArray, _super);
        /**
         * @param items Initial array contents.
         * @param adapter Set to true to wrap the **items** rather than copying them into
         * a new array.
         */
        function AbstractArray(items, adapter) {
            _super.call(this);
            this.items = adapter ? items : items ? items.concat() : [];
        }
        /**
         * @inheritdoc
         */
        AbstractArray.prototype.ownItems = function () {
            _super.prototype.ownItems.call(this);
            return this;
        };
        /**
         * @inheritdoc
         */
        AbstractArray.prototype.getLength = function () {
            return this.items.length;
        };
        /**
         * @inheritdoc
         */
        AbstractArray.prototype.isEmpty = function () {
            return this.items.length === 0;
        };
        /**
         * @inheritdoc
         */
        AbstractArray.prototype.getFirst = function () {
            return this.items[0];
        };
        /**
         * Returns the last collection item. If collection is empty, returns undefined.
         */
        AbstractArray.prototype.getLast = function () {
            return this.items[this.items.length - 1];
        };
        /**
         * @inheritdoc
         */
        AbstractArray.prototype.getFirstKey = function () {
            return (this.items.length !== 0) ? 0 : undefined;
        };
        /**
         * Returns index of last collection item. If collection is empty, returns undefined.
         */
        AbstractArray.prototype.getLastKey = function () {
            var l = this.items.length;
            return (l !== 0) ? (l - 1) : undefined;
        };
        /**
         * @inheritdoc
         */
        AbstractArray.prototype.get = function (index) {
            return this.items[index];
        };
        /**
         * Returns item array - internal collection representation.
         *
         * **Caution: doesn't make a copy - please don't modify.**
         */
        AbstractArray.prototype.getItems = function () {
            return this.items;
        };
        /**
         * Returns array of indexes of all collection items, i.e. array `[0, 1, ... , length - 1]`.
         */
        AbstractArray.prototype.getKeys = function () {
            var items = this.items;
            var result = new _JW.A(items.length);
            for (var i = 0, l = items.length; i < l; ++i) {
                result[i] = i;
            }
            return result;
        };
        /**
         * @inheritdoc
         */
        AbstractArray.prototype.containsItem = function (item) {
            return JW.Array.containsItem(this.items, item);
        };
        /**
         * @inheritdoc
         */
        AbstractArray.prototype.every = function (callback, scope) {
            return JW.Array.every(this.items, callback, scope || this);
        };
        /**
         * @inheritdoc
         */
        AbstractArray.prototype.toSorted = function (callback, scope, order) {
            return JW.Array.toSorted(this.items, callback, scope || this, order);
        };
        /**
         * @inheritdoc
         */
        AbstractArray.prototype.toSortedComparing = function (compare, scope, order) {
            return JW.Array.toSortedComparing(this.items, compare, scope || this, order);
        };
        /**
         * @inheritdoc
         */
        AbstractArray.prototype.getSortingKeys = function (callback, scope, order) {
            return JW.Array.getSortingKeys(this.items, callback, scope || this, order);
        };
        /**
         * @inheritdoc
         */
        AbstractArray.prototype.getSortingKeysComparing = function (compare, scope, order) {
            return JW.Array.getSortingKeysComparing(this.items, compare, scope || this, order);
        };
        /**
         * @inheritdoc
         */
        AbstractArray.prototype.filter = function (callback, scope) {
            return JW.Array.filter(this.items, callback, scope || this);
        };
        /**
         * @inheritdoc
         */
        AbstractArray.prototype.$filter = function (callback, scope) {
            return new JW.Array(this.filter(callback, scope || this), true);
        };
        /**
         * @inheritdoc
         */
        AbstractArray.prototype.$$filter = function (callback, scope) {
            return this.$filter(callback, scope || this);
        };
        /**
         * @inheritdoc
         */
        AbstractArray.prototype.count = function (callback, scope) {
            return JW.Array.count(this.items, callback, scope || this);
        };
        /**
         * @inheritdoc
         */
        AbstractArray.prototype.map = function (callback, scope) {
            return JW.Array.map(this.items, callback, scope || this);
        };
        /**
         * @inheritdoc
         */
        AbstractArray.prototype.$map = function (callback, scope) {
            return new JW.Array(this.map(callback, scope || this), true);
        };
        /**
         * @inheritdoc
         */
        AbstractArray.prototype.$$mapValues = function (callback, scope) {
            return this.$map(callback, scope || this);
        };
        /**
         * @inheritdoc
         */
        AbstractArray.prototype.$$mapObjects = function (callback, scope) {
            return this.$map(callback, scope || this).ownItems();
        };
        /**
         * @inheritdoc
         */
        AbstractArray.prototype.toArray = function () {
            return this.items.concat();
        };
        /**
         * @inheritdoc
         */
        AbstractArray.prototype.asArray = function () {
            return this.items;
        };
        /**
         * @inheritdoc
         */
        AbstractArray.prototype.$asArray = function () {
            return this;
        };
        /**
         * Inserts an item to array.
         *
         * @param item Item to insert.
         * @param index Index of an item before which to insert new one.
         * By default, appends the item to the end of collection.
         */
        AbstractArray.prototype.add = function (item, index) {
            this.tryAdd(item, index);
        };
        /**
         * Inserts an item to array.
         *
         * @param item Item to insert.
         * @param index Index of an item before which to insert new one.
         * By default, appends the item to the end of collection.
         * @returns Always returns true.
         */
        AbstractArray.prototype.tryAdd = function (item, index) {
            return this.tryAddAll([item], index);
        };
        /**
         * Inserts item range to array.
         *
         * @param items Items to insert.
         * @param index Index of an item before which to insert new ones.
         * By default, appends the items to the end of collection.
         */
        AbstractArray.prototype.addAll = function (items, index) {
            this.tryAddAll(items, index);
        };
        /**
         * Inserts item range to array.
         *
         * @param items Items to insert.
         * @param index Index of an item before which to insert new ones.
         * By default, appends the items to the end of collection.
         * @returns Always returns true.
         */
        AbstractArray.prototype.tryAddAll = function (items, index) {
            if (index === undefined) {
                index = this.items.length;
            }
            if (this.trySplice([], [new AbstractArray.IndexItems(index, items)])) {
                return true;
            }
        };
        /**
         * Replaces item at specified position.
         * If array doesn't contain such index, it will demolish the application.
         *
         * @returns Proxy of the replaced item. If collection is not modified, returns undefined.
         */
        AbstractArray.prototype.trySet = function (item, index) {
            var oldProxy = JW.Array.trySet(this.items, item, index);
            if ((oldProxy !== undefined) && this._ownsItems) {
                oldProxy.value.destroy();
            }
            return oldProxy;
        };
        /**
         * Removes item at specified position.
         * If array doesn't contain such index, it will demolish the application.
         *
         * @returns The removed item. If collection is not modified, returns undefined.
         */
        AbstractArray.prototype.tryRemove = function (index) {
            var result = this.tryRemoveAll(index, 1);
            if (result !== undefined) {
                return result[0];
            }
        };
        /**
         * Removes item range from array.
         *
         * @param index Index of first item to remove.
         * @param count Count of items to remove.
         * @returns The removed items.
         */
        AbstractArray.prototype.removeAll = function (index, count) {
            var result = this.tryRemoveAll(index, count);
            return result || [];
        };
        /**
         * Removes item range from array.
         *
         * @param index Index of first item to remove.
         * @param count Count of items to remove.
         * @returns The removed items.
         */
        AbstractArray.prototype.$removeAll = function (index, count) {
            return new JW.Array(this.removeAll(index, count), true);
        };
        /**
         * Removes item range from array.
         *
         * @param index Index of first item to remove.
         * @param count Count of items to remove.
         * @returns The removed items. If collection is not modified, returns undefined.
         */
        AbstractArray.prototype.tryRemoveAll = function (index, count) {
            var result = this.trySplice([new AbstractArray.IndexCount(index, count)], []);
            if (result !== undefined) {
                return result.removedItemsList[0].items;
            }
        };
        /**
         * @inheritdoc
         */
        AbstractArray.prototype.removeItems = function (items) {
            var itemSet = new JW.Set(items);
            var newItems = this.filter(function (item) { return !itemSet.contains(item); });
            this.performFilter(newItems);
        };
        /**
         * Moves an item inside array.
         *
         * @param fromIndex Item index to move.
         * @param toIndex Index to move to.
         * @returns The moved item.
         */
        AbstractArray.prototype.move = function (fromIndex, toIndex) {
            this.tryMove(fromIndex, toIndex);
            return this.get(toIndex);
        };
        /**
         * Moves an item inside array.
         *
         * @param fromIndex Item index to move.
         * @param toIndex Index to move to.
         * @returns The moved item. If collection is not modified, returns undefined.
         */
        AbstractArray.prototype.tryMove = function (fromIndex, toIndex) {
            return JW.Array.tryMove(this.items, fromIndex, toIndex);
        };
        /**
         * @inheritdoc
         */
        AbstractArray.prototype.clear = function () {
            var result = this.tryClear();
            return (result !== undefined) ? result : [];
        };
        /**
         * @inheritdoc
         */
        AbstractArray.prototype.$clear = function () {
            return new JW.Array(this.clear(), true);
        };
        /**
         * @inheritdoc
         */
        AbstractArray.prototype.tryClear = function () {
            var items = JW.Array.tryClear(this.items);
            if ((items !== undefined) && this._ownsItems) {
                JW.Array.backEvery(items, JW.destroyForcibly);
            }
            return items;
        };
        /**
         * Removes and inserts item ranges. Universal optimized granular operation of removal/insertion.
         *
         * @param removeParamsList Array of segments to remove sorted by index asc. Segments are removed in backward order.
         * @param addParamsList Array of segments to insert sorted by index asc. Segments are inserted in forward order.
         * @returns Splice result. Never returns null or undefined.
         */
        AbstractArray.prototype.splice = function (removeParamsList, addParamsList) {
            var result = this.trySplice(removeParamsList, addParamsList);
            return (result !== undefined) ? result : new AbstractArray.SpliceResult(this.items.concat(), [], []);
        };
        /**
         * Removes and inserts item ranges. Universal optimized granular operation of removal/insertion.
         *
         * @param removeParamsList Array of segments to remove sorted by index asc. Segments are removed in backward order.
         * @param addParamsList Array of segments to insert sorted by index asc. Segments are inserted in forward order.
         * @returns Splice result. If collection is not modified, returns undefined.
         */
        AbstractArray.prototype.trySplice = function (removeParamsList, addParamsList) {
            var spliceResult = JW.Array.trySplice(this.items, removeParamsList, addParamsList);
            if ((spliceResult !== undefined) && this._ownsItems) {
                JW.Array.backEvery(spliceResult.getRemovedItems(), JW.destroyForcibly);
            }
            return spliceResult;
        };
        /**
         * Reorders array items.
         *
         * @param indexArray Index array. Item with index `i` will be moved to index `indexArray[i]`.
         * Must contain all indexes from 0 to (length - 1).
         */
        AbstractArray.prototype.reorder = function (indexArray) {
            this.tryReorder(indexArray);
        };
        /**
         * Reorders array items.
         *
         * @param indexArray Index array. Item with index `i` will be moved to index `indexArray[i]`.
         * Must contain all indexes from 0 to (length - 1).
         * @returns Old array contents. If collection is not modified, returns undefined.
         */
        AbstractArray.prototype.tryReorder = function (indexArray) {
            return JW.Array.tryReorder(this.items, indexArray);
        };
        /**
         * Detects [[splice]] method arguments to adjust array contents to **newItems**.
         * Determines which item ranges should be removed and which ones should be inserted.
         * All items must have unique **getKey** function result.
         * If items don't have unique key, probably [[detectFilter]] method may help,
         * because it doesn't require item uniquiness.
         *
         * @param newItems New array contents.
         * @param getKey Function which returns unique key of an item in this collection.
         * Defaults to [[getKey]].
         * If collection consists of instances of JW.Class, then you are in a good shape.
         * @param scope **getKey** call scope. Defaults to collection itself.
         * @returns [[splice]] method arguments. If no method call required, returns undefined.
         */
        AbstractArray.prototype.detectSplice = function (newItems, getKey, scope) {
            return JW.Array.detectSplice(this.items, newItems, getKey || this.getKey, scope || this);
        };
        /**
         * Detects **removeParamsList** arguments of [[splice]] to adjust array contents to **newItems**.
         * Determines which item ranges should be removed.
         * Doesn't assume items insertion - try [[detectSplice]] if that's the case.
         * In advantage to [[detectSplice]], doesn't require item uniquiness.
         *
         * @param newItems New array contents.
         * @returns **removeParamsList** argument of [[splice]] method.
         * If no method call required, returns undefined.
         */
        AbstractArray.prototype.detectFilter = function (newItems) {
            return JW.Array.detectFilter(this.items, newItems);
        };
        /**
         * Detects [[reorder]] method arguments to adjust array contents to **newItems**.
         * Determines where to move all items.
         * If **newItems** contents differ from collection contents,
         * you should pray to Gods that application still works well.
         *
         * @param newItems New array contents.
         * @param getKey Function which returns unique key of an item in this collection.
         * Defaults to [[getKey]].
         * If collection consists of instances of JW.Class, then it's all right.
         * @param scope **getKey** call scope. Defaults to collection itself.
         * @returns **indexArray** argument of [[reorder]] method.
         * If no method call required, returns undefined.
         */
        AbstractArray.prototype.detectReorder = function (newItems, getKey, scope) {
            return JW.Array.detectReorder(this.items, newItems, getKey || this.getKey, scope || this);
        };
        /**
         * Detects [[reorder]] method arguments to sort array contents by result of
         * **callback** call for each item.
         *
         * @param callback Indexer function. Must return a comparable value, compatible with
         * [[JW.cmp]]. Returns item itself by default.
         * @param scope **callback** call scope. Defaults to collection itself.
         * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
         * @returns **indexArray** argument of [[reorder]] method.
         * If no method call required, returns undefined.
         */
        AbstractArray.prototype.detectSort = function (callback, scope, order) {
            return JW.Array.detectSort(this.items, callback, scope || this, order);
        };
        /**
         * Detects [[reorder]] method arguments to sort array contents by comparer.
         *
         * @param compare Comparer function. Should return positive value if t1 > t2;
         * negative value if t1 < t2; 0 if t1 == t2.
         * Defaults to [[JW.cmp]]
         * @param scope **comparer** call scope. Defaults to collection itself.
         * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
         * @returns **indexArray** argument of [[reorder]] method.
         * If no method call required, returns undefined.
         */
        AbstractArray.prototype.detectSortComparing = function (compare, scope, order) {
            return JW.Array.detectSortComparing(this.items, compare, scope || this, order);
        };
        /**
         * Adjusts array contents to **newItems** using [[detectSplice]] and
         * [[splice]] methods.
         * All items must have unique **getKey** function result.
         * If items don't have unique key, probably [[detectFilter]] method may help,
         * because it doesn't require item uniquiness.
         *
         * @param newItems New array contents.
         * @param getKey Function which returns unique key of an item in this collection.
         * Defaults to [[getKey]].
         * If collection consists of instances of JW.Class, then you are in a good shape.
         * @param scope **getKey** call scope. Defaults to collection itself.
         */
        AbstractArray.prototype.performSplice = function (newItems, getKey, scope) {
            var params = this.detectSplice(newItems, getKey || this.getKey, scope || this);
            if (params !== undefined) {
                this.trySplice(params.removeParamsList, params.addParamsList);
            }
        };
        /**
         * Adjusts array contents to **newItems** using [[detectFilter]] and
         * [[splice]] methods.
         * Only removes items.
         * Doesn't assume items insertion - try [[detectSplice]] if that's the case.
         * In advantage to [[detectSplice]], doesn't require item uniquiness.
         *
         * @param newItems New array contents.
         */
        AbstractArray.prototype.performFilter = function (newItems) {
            var params = this.detectFilter(newItems);
            if (params !== undefined) {
                this.trySplice(params, []);
            }
        };
        /**
         * Adjusts array contents to **newItems** using [[detectReorder]] and
         * [[reorder]] methods.
         *
         * @param newItems New array contents.
         * @param getKey Function which returns unique key of an item in this collection.
         * Defaults to [[getKey]].
         * If collection consists of instances of JW.Class, then it's all right.
         * @param scope **getKey** call scope. Defaults to collection itself.
         */
        AbstractArray.prototype.performReorder = function (newItems, getKey, scope) {
            var indexArray = this.detectReorder(newItems, getKey || this.getKey, scope || this);
            if (indexArray !== undefined) {
                this.tryReorder(indexArray);
            }
        };
        /**
         * Sorts array by result of **callback** function call for each item.
         *
         * @param callback Indexer function. Must return a comparable value, compatible with
         * [[JW.cmp]]. Returns item itself by default.
         * @param scope **callback** call scope. Defaults to collection itself.
         * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
         */
        AbstractArray.prototype.sort = function (callback, scope, order) {
            var indexArray = this.detectSort(callback, scope, order);
            if (indexArray !== undefined) {
                this.tryReorder(indexArray);
            }
        };
        /**
         * Sorts array by comparer.
         *
         * @param compare Comparer function. Should return positive value if t1 > t2;
         * negative value if t1 < t2; 0 if t1 == t2.
         * Defaults to [[JW.cmp]]
         * @param scope **comparer** call scope. Defaults to collection itself.
         * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
         */
        AbstractArray.prototype.sortComparing = function (compare, scope, order) {
            var indexArray = this.detectSortComparing(compare, scope, order);
            if (indexArray !== undefined) {
                this.tryReorder(indexArray);
            }
        };
        /**
         * *Suitable if array consists of JW.AbstractArray instances only.*
         * Builds array consisting of subarray items in the same order.
         * Current array is not modified.
         *
         * @returns Merged array.
         */
        AbstractArray.prototype.merge = function () {
            return JW.Array.merge(this.map(function (item) {
                return item.getItems();
            }, this));
        };
        /**
         * *Suitable if array consists of JW.AbstractArray instances only.*
         * Builds array consisting of subarray items in the same order.
         * Current array is not modified.
         *
         * @returns Merged array.
         */
        AbstractArray.prototype.$merge = function () {
            var result = this._createMergerTarget();
            result.own(this.createMerger({
                target: result
            }));
            return result;
        };
        /**
         * *Suitable if array consists of JW.AbstractArray instances only.*
         * Builds array consisting of subarray items in the same order.
         * Current array is not modified.
         * Starts continuous synchronization,
         * i.e. creates [[JW.abstractarray.Merger]] implicitly.
         *
         * @returns Merged array.
         */
        AbstractArray.prototype.$$merge = function () {
            return this.$merge();
        };
        /**
         * Reverses item order in array. Modifies the array itself.
         */
        AbstractArray.prototype.reverse = function () {
            this.items.reverse();
        };
        /**
         * Builds a new array containing items of this array in reversed order.
         * Current array is not modified.
         *
         * @returns Reversed array.
         */
        AbstractArray.prototype.toReversed = function () {
            return JW.Array.toReversed(this.items);
        };
        /**
         * Builds a new array containing items of this array in reversed order.
         * Current array is not modified.
         *
         * @returns Reversed array.
         */
        AbstractArray.prototype.$toReversed = function () {
            return new JW.Array(this.toReversed(), true);
        };
        /**
         * Builds a new array containing items of this array in reversed order.
         * Current array is not modified.
         * If this collection is observable, starts continuous synchronization,
         * i.e. creates [[JW.abstractarray.Reverser]] implicitly.
         *
         * @returns Reversed array.
         */
        AbstractArray.prototype.$$toReversed = function () {
            return this.$toReversed();
        };
        /**
         * Checks for equality (===) to another array, item by item.
         *
         * @param arr Another array.
         * @returns Arrays are equal.
         */
        AbstractArray.prototype.equal = function (arr) {
            return JW.Array.equal(this.items, arr);
        };
        /**
         * Collapses multi-dimentional array.
         *
         * @param depth Dimentions to collapse.
         * @returns Collapsed array.
         */
        AbstractArray.prototype.collapse = function (depth) {
            return JW.Array.collapse(this.items, depth);
        };
        /**
         * Returns item index in this collection.
         *
         * @returns Item index. If item doesn't exist, returns -1.
         */
        AbstractArray.prototype.indexOf = function (item) {
            return JW.Array.indexOf(this.items, item);
        };
        /**
         * Checks all items against criteria in backward order.
         *
         * Returns true if criteria returns !== false for all collection items.
         *
         * Algorithms iterates items sequentially, and stops after first item not matching the criteria.
         *
         * @param callback Criteria callback.
         * @param scope **callback** call scope. Defaults to collection itself.
         */
        AbstractArray.prototype.backEvery = function (callback, scope) {
            return JW.Array.backEvery(this.items, callback, scope);
        };
        /**
         * Removes last array item. Does nothing if array is empty.
         *
         * @returns The removed item or undefined.
         */
        AbstractArray.prototype.pop = function () {
            if (this.items.length !== 0) {
                return this.tryRemove(this.items.length - 1);
            }
        };
        /**
         * Determines index of first item which is more (or less if **order** < 0) than specified value by **compare** function,
         * using binary search. Array must be sorted by **compare** function.
         * Can be used for item insertion easily.
         * If you want to use this method for item removal, you must look at previous item and compare it to **value** first.
         *
         * @param compare Comparer function. Should return positive value if t1 > t2;
         * negative value if t1 < t2; 0 if t1 == t2.
         * Defaults to [[JW.cmp]]
         * @param scope **comparer** call scope. Defaults to collection itself.
         * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
         * @returns Item index.
         */
        AbstractArray.prototype.binarySearch = function (value, compare, scope, order) {
            return JW.Array.binarySearch(this.items, value, compare, scope, order);
        };
        /**
         * @inheritdoc
         */
        AbstractArray.prototype.createMapper = function (config) {
            return new AbstractArray.Mapper(this, config);
        };
        /**
         * @inheritdoc
         */
        AbstractArray.prototype.createFilterer = function (config) {
            return new AbstractArray.Filterer(this, config);
        };
        /**
         * @inheritdoc
         */
        AbstractArray.prototype.createCounter = function (config) {
            return new AbstractArray.Counter(this, config);
        };
        /**
         * @inheritdoc
         */
        AbstractArray.prototype.createObserver = function (config) {
            return new AbstractArray.Observer(this, config);
        };
        /**
         * @inheritdoc
         */
        AbstractArray.prototype.createOrderer = function (config) {
            return new AbstractArray.Orderer(this, config);
        };
        /**
         * @inheritdoc
         */
        AbstractArray.prototype.createSorterComparing = function (config) {
            return new AbstractArray.SorterComparing(this, config);
        };
        /**
         * @inheritdoc
         */
        AbstractArray.prototype.createIndexer = function (config) {
            return new AbstractArray.Indexer(this, config);
        };
        /**
         * @inheritdoc
         */
        AbstractArray.prototype.createLister = function (config) {
            return new AbstractArray.Lister(this, config);
        };
        /**
         * Creates view synchronizer with array.
         * Selects appropriate synchronizer implementation automatically.
         */
        AbstractArray.prototype.createInserter = function (config) {
            return new AbstractArray.Inserter(this, config);
        };
        /**
         * Creates arrays merger.
         * Selects appropriate synchronizer implementation automatically.
         */
        AbstractArray.prototype.createMerger = function (config) {
            return new AbstractArray.Merger(this, config);
        };
        // type definition in argument breaks compiler for some reason
        /**
         * @hidden
         */
        AbstractArray.prototype.createMergerBunch = function (merger) {
            return new JW.Class();
        };
        /**
         * Creates array reverser.
         * Selects appropriate synchronizer implementation automatically.
         */
        AbstractArray.prototype.createReverser = function (config) {
            return new AbstractArray.Reverser(this, config);
        };
        /**
         * @hidden
         */
        AbstractArray.prototype._createMergerTarget = function () {
            return this.some(function (bunch) { return bunch instanceof JW.ObservableArray; }) ?
                new JW.ObservableArray() : new JW.Array();
        };
        return AbstractArray;
    })(JW.IndexedCollection);
    JW.AbstractArray = AbstractArray;
    var AbstractArray;
    (function (AbstractArray) {
        /**
         * "Index-count" pair. Used in [[JW.AbstractArray.splice|splice]] method arguments
         * to specify item segments to remove.
         */
        var IndexCount = (function () {
            function IndexCount(index, count) {
                this.index = index;
                this.count = count;
            }
            /**
             * Clones pair.
             */
            IndexCount.prototype.clone = function () {
                return new IndexCount(this.index, this.count);
            };
            return IndexCount;
        })();
        AbstractArray.IndexCount = IndexCount;
        /**
         * "Index-items" pair. Used in [[JW.AbstractArray.splice|splice]] method arguments
         * to specify item segments to insert, and in [[JW.AbstractArray.SpliceResult|SpliceResult]]
         * class to specify removed and added item segments.
         *
         * @param T Item type.
         */
        var IndexItems = (function () {
            function IndexItems(index, items) {
                this.index = index;
                this.items = items;
            }
            /**
             * Converts to "index-count" pair.
             */
            IndexItems.prototype.toIndexCount = function () {
                return new IndexCount(this.index, this.items.length);
            };
            /**
             * Clones pair.
             */
            IndexItems.prototype.clone = function () {
                return new IndexItems(this.index, this.items.concat());
            };
            return IndexItems;
        })();
        AbstractArray.IndexItems = IndexItems;
        /**
         * [[JW.AbstractArray.splice|splice]] method result.
         *
         * @param T Item type.
         */
        var SpliceResult = (function () {
            /**
             * @param oldItems Old array contents.
             * @param removedItemsList Removed item segments.
             * @param addedItemsList Added item segments.
             */
            function SpliceResult(oldItems, removedItemsList, addedItemsList) {
                this.oldItems = oldItems;
                this.removedItemsList = removedItemsList;
                this.addedItemsList = addedItemsList;
            }
            /**
             * Returns plain array of removed items.
             */
            SpliceResult.prototype.getRemovedItems = function () {
                if (!this.removedItems) {
                    this.removedItems = JW.Array.merge(JW.Array.map(this.removedItemsList, function (indexItems) {
                        return indexItems.items;
                    }));
                }
                return this.removedItems;
            };
            /**
             * Returns plain array of added items.
             */
            SpliceResult.prototype.getAddedItems = function () {
                if (!this.addedItems) {
                    this.addedItems = JW.Array.merge(JW.Array.map(this.addedItemsList, function (indexItems) {
                        return indexItems.items;
                    }));
                }
                return this.addedItems;
            };
            /**
             * Converts removed item segments to "index-count" pairs.
             */
            SpliceResult.prototype.getRemoveParamsList = function () {
                if (!this.removeParamsList) {
                    this.removeParamsList = JW.Array.map(this.removedItemsList, JW.byMethod("toIndexCount"));
                }
                return this.removeParamsList;
            };
            /**
             * Checks if [[JW.AbstractArray.splice|splice]] method call didn't change the array.
             * @returns Array hasn't been changed.
             */
            SpliceResult.prototype.isEmpty = function () {
                return (this.removedItemsList.length === 0) && (this.addedItemsList.length === 0);
            };
            return SpliceResult;
        })();
        AbstractArray.SpliceResult = SpliceResult;
        /**
         * [[JW.AbstractCollection.Counter|Counter]] implementation for [[JW.Array]].
         */
        var Counter = (function (_super) {
            __extends(Counter, _super);
            /**
             * @inheritdoc
             */
            function Counter(source, config) {
                _super.call(this, source, config);
            }
            return Counter;
        })(JW.AbstractCollection.Counter);
        AbstractArray.Counter = Counter;
        /**
         * [[JW.AbstractCollection.Filterer|Filterer]] implementation for [[JW.Array]].
         */
        var Filterer = (function (_super) {
            __extends(Filterer, _super);
            /**
             * @inheritdoc
             */
            function Filterer(source, config) {
                _super.call(this, source, config);
                /**
                 * @hidden
                 */
                this._filtered = [];
                this._splice([], [new AbstractArray.IndexItems(0, this.source.getItems())]);
            }
            /**
             * @inheritdoc
             */
            Filterer.prototype.destroyObject = function () {
                this.target.tryClear();
                _super.prototype.destroyObject.call(this);
            };
            /**
             * @hidden
             */
            Filterer.prototype._countFiltered = function (index, count) {
                var result = 0;
                for (var i = 0; i < count; ++i) {
                    result += this._filtered[index + i];
                }
                return result;
            };
            /**
             * @hidden
             */
            Filterer.prototype._splice = function (removedItemsList, addedItemsList) {
                var _this = this;
                var sourceIndex = 0;
                var targetIndex = 0;
                var removeParamsList = JW.Array.map(removedItemsList, function (indexItems) {
                    targetIndex += _this._countFiltered(sourceIndex, indexItems.index - sourceIndex);
                    var count = _this._countFiltered(indexItems.index, indexItems.items.length);
                    var params = new AbstractArray.IndexCount(targetIndex, count);
                    sourceIndex = indexItems.index + indexItems.items.length;
                    targetIndex += count;
                    return params;
                });
                JW.Array.trySplice(this._filtered, JW.Array.map(removedItemsList, JW.byMethod("toIndexCount")), []);
                var sourceIndex = 0;
                var targetIndex = 0;
                var addParamsList = JW.Array.map(addedItemsList, function (indexItems) {
                    targetIndex += _this._countFiltered(sourceIndex, indexItems.index - sourceIndex);
                    var items = [];
                    var filtered = JW.Array.map(indexItems.items, function (item) {
                        if (_this._filterItem.call(_this._scope, item) === false) {
                            return 0;
                        }
                        items.push(item);
                        return 1;
                    });
                    var params = new AbstractArray.IndexItems(targetIndex, items);
                    JW.Array.tryAddAll(_this._filtered, filtered, indexItems.index);
                    sourceIndex = indexItems.index + filtered.length;
                    targetIndex += items.length;
                    return params;
                });
                this.target.trySplice(removeParamsList, addParamsList);
            };
            /**
             * Changes filterer configuration and refilters target collection.
             * @param config Options to modify.
             */
            Filterer.prototype.reconfigure = function (config) {
                this._filterItem = JW.def(config.filterItem, this._filterItem);
                this._scope = JW.def(config.scope, this._scope);
                this.refilter();
            };
            /**
             * Refilters target collection item at specified position in source collection.
             * Call this method when collection item properties change the way that it must be refiltered.
             * @param index Index of source collection item to refilter.
             */
            Filterer.prototype.refilterAt = function (sourceIndex) {
                var item = this.source.get(sourceIndex);
                var good = this._filterItem.call(this._scope, item) !== false;
                var targetIndex = this._countFiltered(0, sourceIndex);
                if (this._filtered[sourceIndex] === 0) {
                    if (good) {
                        this._filtered[sourceIndex] = 1;
                        this.target.add(item, targetIndex);
                    }
                }
                else {
                    if (!good) {
                        this._filtered[sourceIndex] = 0;
                        this.target.remove(targetIndex);
                    }
                }
            };
            /**
             * Refilters target collection item. Call this method when collection item properties change the way that
             * it must be refiltered.
             * @param item Item to refilter.
             */
            Filterer.prototype.refilterItem = function (item) {
                var index = this.source.indexOf(item);
                if (index !== -1) {
                    this.refilterAt(index);
                }
            };
            /**
             * Refilters target collection. Call this method when collection item properties change the way that
             * they must be refiltered.
             */
            Filterer.prototype.refilter = function () {
                var _this = this;
                var newFiltered = this.source.map(function (item) {
                    return (_this._filterItem.call(_this._scope, item) !== false) ? 1 : 0;
                });
                var removeParams = null;
                var removeParamsList = [];
                function flushRemove() {
                    if (removeParams !== null) {
                        removeParamsList.push(removeParams);
                        removeParams = null;
                    }
                }
                var targetIndex = 0;
                this.source.every(function (item, index) {
                    if (_this._filtered[index] === 0) {
                        return true;
                    }
                    if (newFiltered[index] === 0) {
                        if (removeParams === null) {
                            removeParams = new AbstractArray.IndexCount(targetIndex, 0);
                        }
                        ++removeParams.count;
                        _this._filtered[index] = 0;
                    }
                    else {
                        flushRemove();
                    }
                    ++targetIndex;
                    return true;
                });
                flushRemove();
                var addParams = null;
                var addParamsList = [];
                function flushAdd() {
                    if (addParams !== null) {
                        addParamsList.push(addParams);
                        addParams = null;
                    }
                }
                var targetIndex = 0;
                this.source.every(function (item, index) {
                    if (_this._filtered[index] === 1) {
                        flushAdd();
                        ++targetIndex;
                        return true;
                    }
                    if (newFiltered[index] === 1) {
                        if (addParams === null) {
                            addParams = new AbstractArray.IndexItems(targetIndex, []);
                        }
                        addParams.items.push(item);
                        _this._filtered[index] = 1;
                        ++targetIndex;
                    }
                    else {
                        flushAdd();
                    }
                    return true;
                });
                flushAdd();
                this._filtered = newFiltered;
                this.target.trySplice(removeParamsList, addParamsList);
            };
            return Filterer;
        })(JW.AbstractCollection.Filterer);
        AbstractArray.Filterer = Filterer;
        /**
         * [[JW.AbstractCollection.Indexer|Indexer]] implementation for [[JW.Array]].
         */
        var Indexer = (function (_super) {
            __extends(Indexer, _super);
            /**
             * @inheritdoc
             */
            function Indexer(source, config) {
                _super.call(this, source, config);
            }
            return Indexer;
        })(JW.AbstractCollection.Indexer);
        AbstractArray.Indexer = Indexer;
        /**
         * View synchronizer with array. Listens all array events and reduces them to 2 granular functions:
         * item is added into specific position and item is removed from specific position. In optimization purposes,
         * you can define a third function: array is cleared
         * (in case if there is more effective clearing algorithm than iterative items deletion).
         * Unlike [[JW.AbstractCollection.Observer|Observer]], tracks items order.
         *
         * Use [[JW.AbstractArray.createinserter|createinserter]] method to create the synchronizer.
         * The method selects a synchronizer implementation which fits better (simple or observable).
         *
         *     var inserter = array.createInserter({
         *         addItem: function(item, index) { this.store.insert(item, index); },
         *         removeItem: function(item, index) { this.store.remove(index); },
         *         scope: this
         *     });
         *
         * Synchronizer rules:
         *
         * - Function [[Inserter.Config.addItem|addItem]]
         * is called for all items of source array on synchronizer initialization.
         * - Function [[Inserter.Config.clearItems|clearItems]]
         * is called for array, or function
         * [[Inserter.Config.removeItem|removeItem]] is called for
         * all items of source array on synchronizer destruction.
         * - On source array reordering, items order is synchorinized by callback functions calls.
         *
         * @param T Array item type.
         */
        var Inserter = (function (_super) {
            __extends(Inserter, _super);
            /**
             * Creates synchronizer.
             * [[JW.AbstractArray.createInserter|createInserter]] method is preferred instead.
             *
             * @param source Source array.
             * @param config Configuration.
             */
            function Inserter(source, config) {
                if (config === void 0) { config = {}; }
                _super.call(this);
                this.source = source;
                this._addItem = config.addItem;
                this._removeItem = config.removeItem;
                this._clearItems = config.clearItems;
                this._scope = config.scope || this;
                this._addItems(this.source.getItems(), 0);
            }
            /**
             * @inheritdoc
             */
            Inserter.prototype.destroyObject = function () {
                this._doClearItems(this.source.getItems());
                this.source = null;
                this._addItem = null;
                this._removeItem = null;
                this._clearItems = null;
                this._scope = null;
                _super.prototype.destroyObject.call(this);
            };
            /**
             * @hidden
             */
            Inserter.prototype._addItems = function (items, index) {
                if (!this._addItem) {
                    return;
                }
                for (var i = 0; i < items.length; ++i) {
                    this._addItem.call(this._scope, items[i], i + index);
                }
            };
            /**
             * @hidden
             */
            Inserter.prototype._removeItems = function (items, index) {
                if (!this._removeItem) {
                    return;
                }
                for (var i = items.length - 1; i >= 0; --i) {
                    this._removeItem.call(this._scope, items[i], i + index);
                }
            };
            /**
             * @hidden
             */
            Inserter.prototype._doClearItems = function (items) {
                if (items.length === 0) {
                    return;
                }
                if (this._clearItems) {
                    this._clearItems.call(this._scope, items);
                }
                else {
                    this._removeItems(items, 0);
                }
            };
            return Inserter;
        })(JW.Class);
        AbstractArray.Inserter = Inserter;
        /**
         * [[JW.AbstractCollection.Lister|Lister]] implementation for [[JW.Array]].
         */
        var Lister = (function (_super) {
            __extends(Lister, _super);
            /**
             * @inheritdoc
             */
            function Lister(source, config) {
                _super.call(this, source, config);
            }
            return Lister;
        })(JW.AbstractCollection.Lister);
        AbstractArray.Lister = Lister;
        /**
         * [[JW.AbstractCollection.Mapper|Mapper]] implementation for [[JW.Array]].
         */
        var Mapper = (function (_super) {
            __extends(Mapper, _super);
            /**
             * @inheritdoc
             */
            function Mapper(source, config) {
                _super.call(this, source, config);
                this.target.tryAddAll(this._createItems(this.source.getItems()));
            }
            /**
             * @inheritdoc
             */
            Mapper.prototype.destroyObject = function () {
                this._destroyItems(this.target.clear(), this.source.getItems());
                _super.prototype.destroyObject.call(this);
            };
            /**
             * @hidden
             */
            Mapper.prototype._createItems = function (datas) {
                var items = [];
                for (var i = 0, l = datas.length; i < l; ++i) {
                    items.push(this._createItem.call(this._scope, datas[i]));
                }
                return items;
            };
            /**
             * @hidden
             */
            Mapper.prototype._destroyItems = function (items, datas) {
                if (this._destroyItem === undefined) {
                    return;
                }
                for (var i = items.length - 1; i >= 0; --i) {
                    this._destroyItem.call(this._scope, items[i], datas[i]);
                }
            };
            return Mapper;
        })(JW.AbstractCollection.Mapper);
        AbstractArray.Mapper = Mapper;
        /**
         * Arrays merger. Builds array consisting of all source collections items in the same order.
         * If any of the original collections is observable, starts continuous synchronization.
         *
         *     var source = new JW.ObservableArray([
         *         new JW.Array([1, 2, 3]),
         *         new JW.ObservableArray(),
         *         new JW.Array([4])
         *     ]);
         *     var merger = source.createMerger();
         *     var target = merger.target;
         *     assert(target.equal([1, 2, 3, 4]));
         *
         *     source.add(new JW.Array([5, 6]));
         *     assert(target.equal([1, 2, 3, 4, 5, 6]));
         *
         *     source.get(1).addAll([7, 8, 9]);
         *     assert(target.equal([1, 2, 3, 7, 8, 9, 4, 5, 6]));
         *
         *     merger.destroy();
         *
         * Use [[JW.AbstractArray.createMerger|createMerger]] method to create the synchronizer.
         * The method will select which synchronizer implementation fits better (simple or observable).
         *
         * You can pass target array in config option:
         *
         *     var source = new JW.Array();
         *     var target = new JW.Array();
         *     var merger = source.createMerger({
         *         target: target
         *     });
         *
         * In simple cases, [[JW.AbstractArray.$$merge|$$merge]] shorthand can be used instead. It returns the target array right away:
         *
         *     var source = new JW.ObservableArray([
         *         new JW.Array([1, 2, 3]),
         *         new JW.ObservableArray(),
         *         new JW.Array([4])
         *     ]);
         *     var target = source.$$merge();
         *     assert(target.equal([1, 2, 3, 4]));
         *
         *     source.add(new JW.Array([5, 6]));
         *     assert(target.equal([1, 2, 3, 4, 5, 6]));
         *
         *     source.get(1).addAll([7, 8, 9]);
         *     assert(target.equal([1, 2, 3, 7, 8, 9, 4, 5, 6]));
         *
         *     target.destroy();
         *
         * Synchronizer rules:
         *
         * - Target array is stored in [[target]] property.
         * - Target array must be empty before initialization.
         * - You can't modify target array manually and/or create other synchronizers with the same target array.
         * - All items of source arrays are added to [[target]]
         * immediately on synchronizer initialization.
         * - All items are removed from [[target]] on synchronizer destruction.
         * - You can pass target array in [[Merger.Config.target|target]] config option.
         * In this case, you are responsible for its destruction (though items will be removed
         * automatically on synchronizer destruction anyway).
         * - If [[Merger.Config.target|target]]
         * is not passed, it will be created automatically. Synchronizer will select
         * appropriate [[target]] implementation (simple or observable). In this
         * case, [[target]] will be destroyed automatically on synchronizer destruction.
         *
         * @param T Array item type.
         */
        var Merger = (function (_super) {
            __extends(Merger, _super);
            /**
             * Creates synchronizer.
             * [[JW.AbstractArray.createMerger|createMerger]] method is preferred instead.
             *
             * @param source Source array.
             * @param config Configuration.
             */
            function Merger(source, config) {
                var _this = this;
                if (config === void 0) { config = {}; }
                _super.call(this);
                this.source = source;
                this._targetCreated = config.target == null;
                this.target = this._targetCreated ? source._createMergerTarget() : config.target;
                this._bunches = source.$$mapObjects(function (bunch) {
                    return bunch.createMergerBunch(_this);
                });
                this.target.tryAddAll(this._getAllItems());
            }
            /**
             * @inheritdoc
             */
            Merger.prototype.destroyObject = function () {
                this.target.tryClear();
                this._bunches.destroy();
                if (this._targetCreated) {
                    this.target.destroy();
                }
                this.source = null;
                this.target = null;
                this._bunches = null;
                _super.prototype.destroyObject.call(this);
            };
            /**
             * @hidden
             */
            Merger.prototype._getAllItems = function () {
                return this._merge(this.source.getItems());
            };
            /**
             * @hidden
             */
            Merger.prototype._merge = function (bunches) {
                var items = new _JW.A(this._count(bunches));
                var iItems = 0;
                for (var i = 0, l = bunches.length; i < l; ++i) {
                    var bunch = bunches[i].getItems();
                    for (var j = 0, m = bunch.length; j < m; ++j) {
                        items[iItems++] = bunch[j];
                    }
                }
                return items;
            };
            /**
             * @hidden
             */
            Merger.prototype._count = function (bunches, index, length) {
                if (index === undefined) {
                    index = 0;
                }
                if (length === undefined) {
                    length = bunches.length - index;
                }
                var count = 0;
                for (var i = 0; i < length; ++i) {
                    count += bunches[index + i].getLength();
                }
                return count;
            };
            return Merger;
        })(JW.Class);
        AbstractArray.Merger = Merger;
        /**
         * [[JW.AbstractCollection.Observer|Observer]] implementation for [[JW.Array]].
         */
        var Observer = (function (_super) {
            __extends(Observer, _super);
            /**
             * @inheritdoc
             */
            function Observer(source, config) {
                _super.call(this, source, config);
            }
            return Observer;
        })(JW.AbstractCollection.Observer);
        AbstractArray.Observer = Observer;
        /**
         * [[JW.AbstractCollection.Orderer|Orderer]] implementation for [[JW.Array]].
         */
        var Orderer = (function (_super) {
            __extends(Orderer, _super);
            /**
             * @inheritdoc
             */
            function Orderer(source, config) {
                _super.call(this, source, config);
            }
            return Orderer;
        })(JW.AbstractCollection.Orderer);
        AbstractArray.Orderer = Orderer;
        /**
         * Array reverser. Builds array containing all items of source array in reversed order.
         * If original collection is observable, starts continuous synchronization.
         *
         *     var source = new JW.ObservableArray([1, 2, 3]);
         *     var reverser = source.createReverser();
         *     var target = reverser.target;
         *     assert(target.equal([3, 2, 1]));
         *
         *     source.add(4);
         *     assert(target.equal([4, 3, 2, 1]));
         *
         *     source.remove(2);
         *     assert(target.equal([4, 2, 1]));
         *
         *     reverser.destroy();
         *
         * Use [[JW.AbstractArray.createReverser|createReverser]] method to create the synchronizer.
         * The method will select which synchronizer implementation fits better (simple or observable).
         *
         * You can pass target array in config option:
         *
         *     var source = new JW.Array();
         *     var target = new JW.Array();
         *     var reverser = source.createReverser({
         *         target: target
         *     });
         *
         * In simple cases, [[JW.AbstractArray.$$toReversed|$$toReversed]] shorthand can be used instead. It returns the target array right away:
         *
         *     var source = new JW.ObservableArray([1, 2, 3]);
         *     var target = source.$$toReversed();
         *     assert(target.equal([3, 2, 1]));
         *
         *     source.add(4);
         *     assert(target.equal([4, 3, 2, 1]));
         *
         *     source.remove(2);
         *     assert(target.equal([4, 2, 1]));
         *
         *     target.destroy();
         *
         * Synchronizer rules:
         *
         * - Target array is stored in [[target]] property.
         * - Target array must be empty before initialization.
         * - You can't modify target array manually and/or create other synchronizers with the same target array.
         * - All items of source array are added to [[target]]
         * immediately on synchronizer initialization.
         * - All items are removed from [[target]] on synchronizer destruction.
         * - You can pass target array in [[Reverser.Config.target|target]] config option.
         * In this case, you are responsible for its destruction (though items will be removed
         * automatically on synchronizer destruction anyway).
         * - If [[Reverser.Config.target|target]]
         * is not passed, it will be created automatically. Synchronizer will select
         * appropriate [[target]] implementation (simple or observable). In this
         * case, [[target]] will be destroyed automatically on synchronizer destruction.
         *
         * @param T Array item type.
         */
        var Reverser = (function (_super) {
            __extends(Reverser, _super);
            /**
             * Creates synchronizer.
             * [[JW.AbstractArray.createReverser|createReverser]] method is preferred instead.
             *
             * @param source Source array.
             * @param config Configuration.
             */
            function Reverser(source, config) {
                if (config === void 0) { config = {}; }
                _super.call(this);
                this.source = source;
                this._targetCreated = config.target == null;
                this.target = this._targetCreated ? source.createEmpty() : config.target;
                this.target.tryAddAll(this._reverse(source.getItems()));
            }
            /**
             * @inheritdoc
             */
            Reverser.prototype.destroyObject = function () {
                this.target.tryClear();
                if (this._targetCreated) {
                    this.target.destroy();
                }
                this.source = null;
                this.target = null;
                _super.prototype.destroyObject.call(this);
            };
            /**
             * @hidden
             */
            Reverser.prototype._reverse = function (items) {
                items = items.concat();
                items.reverse();
                return items;
            };
            return Reverser;
        })(JW.Class);
        AbstractArray.Reverser = Reverser;
        /**
         * [[JW.AbstractCollection.SorterComparing|SorterComparing]] implementation for [[JW.Array]].
         */
        var SorterComparing = (function (_super) {
            __extends(SorterComparing, _super);
            /**
             * @inheritdoc
             */
            function SorterComparing(source, config) {
                _super.call(this, source, config);
            }
            return SorterComparing;
        })(JW.AbstractCollection.SorterComparing);
        AbstractArray.SorterComparing = SorterComparing;
    })(AbstractArray = JW.AbstractArray || (JW.AbstractArray = {}));
})(JW || (JW = {}));
;
/// <reference path="../jwlib.ref.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JW;
(function (JW) {
    /**
     * Map is unordered collection. Each item has its own string key.
     *
     * # Map methods
     *
     * **Difference compared to [[JW.IndexedCollection]] is in bold.**
     *
     * Content retrieving:
     *
     * * [[getLength]] - Returns count of items in collection.
     * For observable collections, **length** property may come
     * in handy if you want to track collection length dynamically.
     * * [[isEmpty]] - Checks collection for emptiness.
     * * [[get]] - Returns collection item by key.
     * * [[getFirst]] - Returns first item in collection.
     * * [[getFirstKey]] - Returns key of first item in collection.
     * * [[getKeys]], #$getKeys - Returns array of all item keys.
     * * [[containsItem]] - Does collection contain the item?
     * * [[containsKey]] - Does collection contain the key?
     * * [[keyOf]] - Returns item key. If item is not found, returns undefined.
     * * **[[getJson]] - Returns internal representation of map.**
     *
     * Iteration algorithms:
     *
     * * [[every]] - Checks all items by criteria.
     * Returns true if all items match the criteria.
     * * [[some]] - Checks each item by criteria.
     * Returns true if some items matches the criteria.
     * * [[each]] - Iterates items.
     * * [[search]] - Finds item by criteria.
     * Returns first item matching the criteria.
     * * [[find]] - Finds item by criteria.
     * Returns index of first item matching the criteria.
     * * [[filter]], [[$filter]],
     * [[$$filter]] - Filters collection by criteria.
     * Builds new collection of the same type, consisting of items matching the criteria.
     * * [[count]], [[$count]],
     * [[$$count]] - Counts the items matching criteria.
     * * [[map]], [[$map]],
     * [[$$mapValues]], [[$$mapObjects]] - Maps collection items.
     * Builds new collection of the same type, consisting of results of mapping function call for each collection item.
     * * [[toSorted]], [[$toSorted]],
     * [[toSortedComparing]], [[$toSortedComparing]],
     * [[$$toSortedComparing]] -
     * Builds array consisting of collection items sorted by indexer or comparer.
     * * [[getSortingKeys]], [[$getSortingKeys]],
     * [[getSortingKeysComparing]],
     * [[$getSortingKeysComparing]] -
     * Returns indexes of collection items sorted by indexer or comparer.
     * * [[index]], [[$index]],
     * [[$$index]] - Indexes collection.
     * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
     * * [[toArray]], [[$toArray]],
     * [[$$toArray]] - Builds new array consisting of collection items.
     * * [[toMap]], [[$toMap]] - Builds new map consisting of collection items.
     * * [[toSet]], [[$toSet]],
     * [[$$toSet]] - Builds new set consisting of collection items.
     * * [[asArray]], [[$asArray]] - Represents collection as array.
     * * [[asMap]], [[$asMap]] - Represents collection as map.
     * * [[asSet]], [[$asSet]] - Represents collection as set.
     *
     * Collection modification:
     *
     * * [[set]], [[trySet]] - Adds or replaces an item by key.
     * * **[[setAll]], [[setAllVerbose]],
     * [[trySetAll]] - Adds or replaces a bunch of items.**
     * * [[remove]], [[tryRemove]] - Removes an item by key.
     * * **[[removeAll]], [[removeAllVerbose]],
     * [[$removeAllVerbose]], [[tryRemoveAll]] - Removes a bunch of items.**
     * * [[removeItem]] - Removes first occurency of an item in collection.
     * * [[removeItems]] - Removes all occurencies of items in collection.
     * * **[[setKey]], [[trySetKey]] - Changes item key.**
     * * [[clear]], [[$clear]],
     * [[tryClear]] - Clears collection.
     * * **[[splice]], [[trySplice]] - Removes and adds bunches of items.**
     * * **[[reindex]], [[tryReindex]] - Changes item keys.**
     * * **[[performSplice]] - Adjusts contents using [[splice]] method.**
     * * **[[performReindex]] - Adjusts contents using [[reindex]] method.**
     *
     * Synchronizers creation:
     *
     * * [[createMapper]] - Creates item mapper.
     * Extended version of [[$$mapValues]] and [[$$mapObjects]] methods.
     * * [[createFilterer]] - Creates filterer.
     * Extended version of [[$$filter]] method.
     * * [[createCounter]] - Creates matching item counter.
     * Extended version of [[$$count]] method.
     * * [[createLister]] - Creates converter to set.
     * Extended version of [[$$toSet]] method.
     * * [[createIndexer]] - Creates converter to map (indexer).
     * Extended version of [[$$index]] method.
     * * [[createOrderer]] - Creates converter to array (orderer).
     * Extended version of [[$$toArray]] method.
     * * [[createSorterComparing]] - Creates converter to array (sorter by comparer).
     * Extended version of [[$$toSortedComparing]] method.
     * * [[createObserver]] - Creates observer.
     * * **[[createInserter]] - Creates view synchronizer with map.**
     *
     * Similar collection creation (for algorithms and synchronizers implementation):
     *
     * * [[createEmpty]] - Creates empty collection of the same type.
     * * [[createEmptyArray]] - Creates empty array of the same observability level.
     * * [[createEmptyMap]] - Creates empty map of the same observability level.
     * * [[createEmptySet]] - Creates empty set of the same observability level.
     *
     * Other methods:
     *
     * * **[[detectSplice]] - Detects [[splice]] method arguments to adjust contents.**
     * * **[[detectReindex]] - Detects [[reindex]] method arguments to adjust contents.**
     * * **[[equal]] - Checks for equality to another map.**
     *
     * All the same algorithms are also available for native JavaScript Object as map,
     * see [[JW.Map]] static methods.
     *
     * @param T Map item type.
     */
    var AbstractMap = (function (_super) {
        __extends(AbstractMap, _super);
        /**
         * @param json Initial map contents.
         * @param adapter Set to true to wrap the **items** rather than copying them into
         * a new map.
         */
        function AbstractMap(json, adapter) {
            _super.call(this);
            this._adapter = Boolean(adapter);
            this.json = adapter ? json : json ? JW.apply({}, json) : {};
            this._length = JW.Map.getLength(this.json);
        }
        /**
         * @inheritdoc
         */
        AbstractMap.prototype.ownItems = function () {
            _super.prototype.ownItems.call(this);
            return this;
        };
        /**
         * @inheritdoc
         */
        AbstractMap.prototype.getLength = function () {
            return this._length;
        };
        /**
         * @inheritdoc
         */
        AbstractMap.prototype.isEmpty = function () {
            return this._length === 0;
        };
        /**
         * @inheritdoc
         */
        AbstractMap.prototype.getFirst = function () {
            return JW.Map.getFirst(this.json);
        };
        /**
         * @inheritdoc
         */
        AbstractMap.prototype.getFirstKey = function () {
            return JW.Map.getFirstKey(this.json);
        };
        /**
         * @inheritdoc
         */
        AbstractMap.prototype.get = function (key) {
            return this.json[key];
        };
        /**
         * Returns item map - internal collection representation.
         *
         * **Caution: doesn't make a copy - please don't modify.**
         */
        AbstractMap.prototype.getJson = function () {
            return this.json;
        };
        /**
         * @inheritdoc
         */
        AbstractMap.prototype.getKeys = function () {
            return JW.Map.getKeys(this.json);
        };
        /**
         * @inheritdoc
         */
        AbstractMap.prototype.containsItem = function (item) {
            return JW.Map.containsItem(this.json, item);
        };
        /**
         * @inheritdoc
         */
        AbstractMap.prototype.every = function (callback, scope) {
            return JW.Map.every(this.json, callback, scope || this);
        };
        /**
         * @inheritdoc
         */
        AbstractMap.prototype.toSorted = function (callback, scope, order) {
            return JW.Map.toSorted(this.json, callback, scope || this, order);
        };
        /**
         * @inheritdoc
         */
        AbstractMap.prototype.toSortedComparing = function (compare, scope, order) {
            return JW.Map.toSortedComparing(this.json, compare, scope || this, order);
        };
        /**
         * @inheritdoc
         */
        AbstractMap.prototype.getSortingKeys = function (callback, scope, order) {
            return JW.Map.getSortingKeys(this.json, callback, scope || this, order);
        };
        /**
         * @inheritdoc
         */
        AbstractMap.prototype.getSortingKeysComparing = function (compare, scope, order) {
            return JW.Map.getSortingKeysComparing(this.json, compare, scope || this, order);
        };
        /**
         * @inheritdoc
         */
        AbstractMap.prototype.filter = function (callback, scope) {
            return JW.Map.filter(this.json, callback, scope || this);
        };
        /**
         * @inheritdoc
         */
        AbstractMap.prototype.$filter = function (callback, scope) {
            return new JW.Map(this.filter(callback, scope || this), true);
        };
        /**
         * @inheritdoc
         */
        AbstractMap.prototype.$$filter = function (callback, scope) {
            return this.$filter(callback, scope || this);
        };
        /**
         * @inheritdoc
         */
        AbstractMap.prototype.count = function (callback, scope) {
            return JW.Map.count(this.json, callback, scope || this);
        };
        /**
         * @inheritdoc
         */
        AbstractMap.prototype.map = function (callback, scope) {
            return JW.Map.map(this.json, callback, scope || this);
        };
        /**
         * @inheritdoc
         */
        AbstractMap.prototype.$map = function (callback, scope) {
            return new JW.Map(this.map(callback, scope || this), true);
        };
        /**
         * @inheritdoc
         */
        AbstractMap.prototype.$$mapValues = function (callback, scope) {
            return this.$map(callback, scope || this);
        };
        /**
         * @inheritdoc
         */
        AbstractMap.prototype.$$mapObjects = function (callback, scope) {
            return this.$map(callback, scope || this);
        };
        /**
         * @inheritdoc
         */
        AbstractMap.prototype.toMap = function () {
            return JW.apply({}, this.json);
        };
        /**
         * @inheritdoc
         */
        AbstractMap.prototype.asMap = function () {
            return this.json;
        };
        /**
         * @inheritdoc
         */
        AbstractMap.prototype.$asMap = function () {
            return this;
        };
        /**
         * Replaces item with specified key. If map doesn't contain such key, new item is added.
         * @returns Proxy of the replaced item. If collection is not modified, returns undefined.
         */
        AbstractMap.prototype.trySet = function (item, key) {
            var result = this._trySet(item, key);
            if (result === undefined) {
                return undefined;
            }
            var oldItem = result.value;
            if (oldItem !== undefined && this._ownsItems) {
                oldItem.destroy();
            }
            return result;
        };
        AbstractMap.prototype._trySet = function (item, key) {
            var result = JW.Map.trySet(this.json, item, key);
            if (result === undefined) {
                return;
            }
            if (result.value === undefined) {
                ++this._length;
            }
            return result;
        };
        /**
         * Adds or replaces a bunch of items.
         */
        AbstractMap.prototype.setAll = function (items) {
            for (var key in items) {
                this.trySet(items[key], key);
            }
        };
        /**
         * Low-performance alternative to [[setAll]] with verbose result set.
         * @returns Result of internal [[splice]] method call.
         */
        AbstractMap.prototype.setAllVerbose = function (items) {
            var spliceResult = this.trySetAll(items);
            return (spliceResult !== undefined) ? spliceResult : { removedItems: {}, addedItems: {} };
        };
        /**
         * Adds or replaces a bunch of items.
         * @returns Result of internal [[splice]] method call.
         * If collection is not modified, returns undefined.
         */
        AbstractMap.prototype.trySetAll = function (items) {
            return this.trySplice([], items);
        };
        /**
         * Changes item key in map. If collection doesn't contain oldKey or contains newKey, it causes an error.
         * @returns The moved item.
         */
        AbstractMap.prototype.setKey = function (oldKey, newKey) {
            this.trySetKey(oldKey, newKey);
            return this.json[newKey];
        };
        /**
         * Changes item key in map. If collection doesn't contain oldKey or contains newKey, it causes an error.
         * @returns The moved item.
         * If collection is not modified, returns undefined.
         */
        AbstractMap.prototype.trySetKey = function (oldKey, newKey) {
            return JW.Map.trySetKey(this.json, oldKey, newKey);
        };
        /**
         * Removes item with specified key if it exists in map.
         * @returns Old collection item.
         * If collection is not modified, returns undefined.
         */
        AbstractMap.prototype.tryRemove = function (key) {
            var item = this._tryRemove(key);
            if (item !== undefined && this._ownsItems) {
                item.destroy();
            }
            return item;
        };
        AbstractMap.prototype._tryRemove = function (key) {
            var item = JW.Map.tryRemove(this.json, key);
            if (item === undefined) {
                return;
            }
            --this._length;
            return item;
        };
        /**
         * Removes a bunch of items from map.
         */
        AbstractMap.prototype.removeAll = function (keys) {
            for (var i = 0, l = keys.length; i < l; ++i) {
                this.tryRemove(keys[i]);
            }
        };
        /**
         * Low-performance alternative to [[removeAll]] with verbose result set.
         * @returns The removed items.
         */
        AbstractMap.prototype.removeAllVerbose = function (keys) {
            var items = this.tryRemoveAll(keys);
            return (items !== undefined) ? items : {};
        };
        /**
         * Low-performance alternative to [[removeAll]] with verbose result set.
         * @returns The removed items.
         */
        AbstractMap.prototype.$removeAllVerbose = function (keys) {
            return new JW.Map(this.removeAllVerbose(keys), true);
        };
        /**
         * Removes a bunch of items from map.
         * @returns The removed items.
         * If collection is not modified, returns undefined.
         */
        AbstractMap.prototype.tryRemoveAll = function (keys) {
            var spliceResult = this.trySplice(keys, {});
            if (spliceResult !== undefined) {
                return spliceResult.removedItems;
            }
        };
        /**
         * @inheritdoc
         */
        AbstractMap.prototype.removeItems = function (items) {
            var itemSet = new JW.Set(items);
            var newItems = this.filter(function (item) {
                return !itemSet.contains(item);
            });
            this.performSplice(newItems);
        };
        /**
         * @inheritdoc
         */
        AbstractMap.prototype.clear = function () {
            var result = this.tryClear();
            return (result !== undefined) ? result : {};
        };
        /**
         * @inheritdoc
         */
        AbstractMap.prototype.$clear = function () {
            return new JW.Map(this.clear(), true);
        };
        /**
         * @inheritdoc
         */
        AbstractMap.prototype.tryClear = function () {
            var items = this._tryClear();
            if (items !== undefined && this._ownsItems) {
                JW.Array.backEvery(JW.Map.toArray(items), JW.destroyForcibly);
            }
            return items;
        };
        AbstractMap.prototype._tryClear = function () {
            if (this._length === 0) {
                return;
            }
            var items;
            this._length = 0;
            if (this._adapter) {
                items = JW.Map.tryClear(this.json);
            }
            else {
                items = this.json;
                this.json = {};
            }
            return items;
        };
        /**
         * Removes and adds bunches of items in map. Universal optimized granular operation of removal/insertion.
         * @param removedKeys Keys of items to remove.
         * @param updatedItems Items to add/replace.
         * @returns Splice result. Never returns null or undefined.
         */
        AbstractMap.prototype.splice = function (removedKeys, updatedItems) {
            var spliceResult = this.trySplice(removedKeys, updatedItems);
            return (spliceResult !== undefined) ? spliceResult : { removedItems: {}, addedItems: {} };
        };
        /**
         * Removes and adds bunches of items in map. Universal optimized granular operation of removal/insertion.
         * @param removedKeys Keys of items to remove.
         * @param updatedItems Items to add/replace.
         * @returns Splice result.
         * If collection is not modified, returns undefined.
         */
        AbstractMap.prototype.trySplice = function (removedKeys, updatedItems) {
            var spliceResult = this._trySplice(removedKeys, updatedItems);
            if ((spliceResult !== undefined) && this._ownsItems) {
                JW.Array.backEvery(JW.Map.toArray(spliceResult.removedItems), JW.destroyForcibly);
            }
            return spliceResult;
        };
        AbstractMap.prototype._trySplice = function (removedKeys, updatedItems) {
            var spliceResult = JW.Map.trySplice(this.json, removedKeys, updatedItems);
            if (spliceResult !== undefined) {
                this._length += JW.Map.getLength(spliceResult.addedItems) - JW.Map.getLength(spliceResult.removedItems);
                return spliceResult;
            }
        };
        /**
         * Changes item keys in map.
         * @param keyMap Key map. Item with key x will gain key keyMap[x].
         * It is neccessary to pass only changed keys, but unchanged keys or unexisting keys are acceptable as well.
         * @returns Map of changed keys. Never returns null or undefined.
         */
        AbstractMap.prototype.reindex = function (keyMap) {
            var result = this.tryReindex(keyMap);
            return (result !== undefined) ? result : {};
        };
        /**
         * Changes item keys in map.
         * @param keyMap Key map. Item with key x will gain key keyMap[x].
         * It is neccessary to pass only changed keys, but unchanged keys or unexisting keys are acceptable as well.
         * @returns Map of changed keys.
         * If collection is not modified, returns undefined.
         */
        AbstractMap.prototype.tryReindex = function (keyMap) {
            return JW.Map.tryReindex(this.json, keyMap);
        };
        /**
         * Detects [[splice]] method arguments to adjust map contents to **newItems**.
         * Determines which item bunches should be removed and which ones should be inserted/replaced, and their keys.
         * @param newItems New map contents.
         * @returns [[splice]] method arguments. If no method call required, returns undefined.
         */
        AbstractMap.prototype.detectSplice = function (newItems) {
            return JW.Map.detectSplice(this.json, newItems);
        };
        /**
         * Detects [[reindex]] method arguments to adjust map contents to **newItems**.
         * Determines which keys should be assigned to all items.
         * If **newItems** contents differ from current map contents, the map will be broken.
         * @param newItems New map contents.
         * @param getKey Function which returns unique key of an item in this collection.
         * Defaults to [[getKey]].
         * If collection consists of instances of JW.Class, then you are in a good shape.
         * @param scope **getKey** call scope. Defaults to collection itself.
         * @returns **keyMap** argument of [[reindex]] method.
         * If no method call required, returns undefined.
         */
        AbstractMap.prototype.detectReindex = function (newItems, getKey, scope) {
            return JW.Map.detectReindex(this.json, newItems, getKey || this.getKey, scope || this);
        };
        /**
         * Adjusts map contents to **newItems** using [[detectSplice]] and
         * [[splice]] methods.
         * @param newItems New map contents.
         */
        AbstractMap.prototype.performSplice = function (newItems) {
            var params = this.detectSplice(newItems);
            if (params !== undefined) {
                this.trySplice(params.removedKeys, params.updatedItems);
            }
        };
        /**
         * Adjusts map contents to **newItems** using [[detectReindex]] and
         * [[reindex]] methods.
         * @param newItems New map contents.
         * @param getKey Function which returns unique key of an item in this collection.
         * Defaults to [[getKey]].
         * If collection consists of instances of JW.Class, then you are in a good shape.
         * @param scope **getKey** call scope. Defaults to collection itself.
         */
        AbstractMap.prototype.performReindex = function (newItems, getKey, scope) {
            var keyMap = this.detectReindex(newItems, getKey, scope);
            if (keyMap !== undefined) {
                this.tryReindex(keyMap);
            }
        };
        /**
         * @hidden
         */
        AbstractMap.prototype.getInverted = function () {
            return JW.Map.getInverted(this.json);
        };
        /**
         * Checks for equality (===) to another map, item by item.
         */
        AbstractMap.prototype.equal = function (map) {
            return JW.Map.equal(this.json, map);
        };
        /**
         * @inheritdoc
         */
        AbstractMap.prototype.createMapper = function (config) {
            return new AbstractMap.Mapper(this, config);
        };
        /**
         * @inheritdoc
         */
        AbstractMap.prototype.createFilterer = function (config) {
            return new AbstractMap.Filterer(this, config);
        };
        /**
         * @inheritdoc
         */
        AbstractMap.prototype.createCounter = function (config) {
            return new AbstractMap.Counter(this, config);
        };
        /**
         * @inheritdoc
         */
        AbstractMap.prototype.createObserver = function (config) {
            return new AbstractMap.Observer(this, config);
        };
        /**
         * @inheritdoc
         */
        AbstractMap.prototype.createOrderer = function (config) {
            return new AbstractMap.Orderer(this, config);
        };
        /**
         * @inheritdoc
         */
        AbstractMap.prototype.createSorterComparing = function (config) {
            return new AbstractMap.SorterComparing(this, config);
        };
        /**
         * @inheritdoc
         */
        AbstractMap.prototype.createIndexer = function (config) {
            return new AbstractMap.Indexer(this, config);
        };
        /**
         * @inheritdoc
         */
        AbstractMap.prototype.createLister = function (config) {
            return new AbstractMap.Lister(this, config);
        };
        /**
         * Creates view synchronizer with map.
         * Selects appropriate synchronizer implementation automatically.
         */
        AbstractMap.prototype.createInserter = function (config) {
            return new AbstractMap.Inserter(this, config);
        };
        return AbstractMap;
    })(JW.IndexedCollection);
    JW.AbstractMap = AbstractMap;
    var AbstractMap;
    (function (AbstractMap) {
        /**
         * [[JW.AbstractCollection.Counter|Counter]] implementation for [[JW.Map]].
         */
        var Counter = (function (_super) {
            __extends(Counter, _super);
            /**
             * @inheritdoc
             */
            function Counter(source, config) {
                _super.call(this, source, config);
            }
            return Counter;
        })(JW.AbstractCollection.Counter);
        AbstractMap.Counter = Counter;
        /**
         * [[JW.AbstractCollection.Filterer|Filterer]] implementation for [[JW.Map]].
         */
        var Filterer = (function (_super) {
            __extends(Filterer, _super);
            /**
             * @inheritdoc
             */
            function Filterer(source, config) {
                _super.call(this, source, config);
                this.target.trySetAll(source.filter(this._filterItem, this._scope));
            }
            /**
             * @inheritdoc
             */
            Filterer.prototype.destroyObject = function () {
                this.target.tryRemoveAll(this.source.getKeys());
                _super.prototype.destroyObject.call(this);
            };
            return Filterer;
        })(JW.AbstractCollection.Filterer);
        AbstractMap.Filterer = Filterer;
        /**
         * [[JW.AbstractCollection.Indexer|Indexer]] implementation for [[JW.Map]].
         */
        var Indexer = (function (_super) {
            __extends(Indexer, _super);
            /**
             * @inheritdoc
             */
            function Indexer(source, config) {
                _super.call(this, source, config);
            }
            return Indexer;
        })(JW.AbstractCollection.Indexer);
        AbstractMap.Indexer = Indexer;
        /**
         * View synchronizer with map. Listens all map events and reduces them to 2 granular functions:
         * item is added with specific key and item is removed with specific key. In optimization purposes,
         * you can define a third function: map is cleared
         * (in case if there is more effective clearing algorithm than iterative items deletion).
         * Unlike JW.AbstractCollection.Observer, tracks items keys.
         * Can be used mainly for DOM-element synchronization with map of child elements.
         *
         * Use [[JW.AbstractMap.createInserter|createInserter]] method to create the synchronizer.
         *
         *     var inserter = map.createInserter({
         *         addItem: function(el, key) { this.el.find("[elkey=" + key + "]").append(el); },
         *         removeItem: function(el, key) { el.detach(); },
         *         scope: this
         *     });
         *
         * The method will select which synchronizer implementation fits better (simple or observable).
         *
         * Synchronizer rules:
         *
         * - Function [[Inserter.Config.addItem|addItem]]
         * is called for all items of source map on synchronizer initialization.
         * - Function [[Inserter.Config.clearItems|clearItems]]
         * is called for map, or function
         * [[Inserter.Config.removeItem|removeItem]] is called for
         * all items of source map on synchronizer destruction.
         * - On source map reindexing, items keys are synchorinized by callback functions calls.
         *
         * @param T Map item type.
         */
        var Inserter = (function (_super) {
            __extends(Inserter, _super);
            /**
             * Creates synchronizer.
             * [[JW.AbstractMap.createInserter|createInserter]] method is preferred instead.
             *
             * @param source Source map.
             * @param config Configuration.
             */
            function Inserter(source, config) {
                if (config === void 0) { config = {}; }
                _super.call(this);
                this.source = source;
                this._addItem = config.addItem;
                this._removeItem = config.removeItem;
                this._scope = config.scope || this;
                this._clearItems = config.clearItems;
                this._addItems(this.source.getJson());
            }
            /**
             * @inheritdoc
             */
            Inserter.prototype.destroyObject = function () {
                this._doClearItems(this.source.getJson());
                this.source = null;
                this._addItem = null;
                this._removeItem = null;
                this._clearItems = null;
                this._scope = null;
                _super.prototype.destroyObject.call(this);
            };
            /**
             * @hidden
             */
            Inserter.prototype._addItems = function (items) {
                if (!this._addItem) {
                    return;
                }
                for (var key in items) {
                    this._addItem.call(this._scope, items[key], key);
                }
            };
            /**
             * @hidden
             */
            Inserter.prototype._removeItems = function (items) {
                if (!this._removeItem) {
                    return;
                }
                for (var key in items) {
                    this._removeItem.call(this._scope, key, items[key]);
                }
            };
            /**
             * @hidden
             */
            Inserter.prototype._doClearItems = function (items) {
                if (JW.Map.isEmpty(items)) {
                    return;
                }
                if (this._clearItems) {
                    this._clearItems.call(this._scope || this, items);
                }
                else {
                    this._removeItems(items);
                }
            };
            return Inserter;
        })(JW.Class);
        AbstractMap.Inserter = Inserter;
        /**
         * [[JW.AbstractCollection.Lister|Lister]] implementation for [[JW.Map]].
         */
        var Lister = (function (_super) {
            __extends(Lister, _super);
            /**
             * @inheritdoc
             */
            function Lister(source, config) {
                _super.call(this, source, config);
            }
            return Lister;
        })(JW.AbstractCollection.Lister);
        AbstractMap.Lister = Lister;
        /**
         * [[JW.AbstractCollection.Mapper|Mapper]] implementation for [[JW.Map]].
         */
        var Mapper = (function (_super) {
            __extends(Mapper, _super);
            /**
             * @inheritdoc
             */
            function Mapper(source, config) {
                _super.call(this, source, config);
                this.target.trySetAll(this._createItems(source.getJson()));
            }
            /**
             * @inheritdoc
             */
            Mapper.prototype.destroyObject = function () {
                this._destroyItems(this.target.removeAllVerbose(this.source.getKeys()), this.source.getJson());
                _super.prototype.destroyObject.call(this);
            };
            /**
             * @hidden
             */
            Mapper.prototype._createItems = function (datas) {
                var items = {};
                for (var key in datas) {
                    items[key] = this._createItem.call(this._scope, datas[key]);
                }
                return items;
            };
            /**
             * @hidden
             */
            Mapper.prototype._destroyItems = function (items, datas) {
                if (this._destroyItem === undefined) {
                    return;
                }
                for (var key in items) {
                    this._destroyItem.call(this._scope, items[key], datas[key]);
                }
            };
            return Mapper;
        })(JW.AbstractCollection.Mapper);
        AbstractMap.Mapper = Mapper;
        /**
         * [[JW.AbstractCollection.Observer|Observer]] implementation for [[JW.Map]].
         */
        var Observer = (function (_super) {
            __extends(Observer, _super);
            /**
             * @inheritdoc
             */
            function Observer(source, config) {
                _super.call(this, source, config);
            }
            return Observer;
        })(JW.AbstractCollection.Observer);
        AbstractMap.Observer = Observer;
        /**
         * [[JW.AbstractCollection.Orderer|Orderer]] implementation for [[JW.Map]].
         */
        var Orderer = (function (_super) {
            __extends(Orderer, _super);
            /**
             * @inheritdoc
             */
            function Orderer(source, config) {
                _super.call(this, source, config);
            }
            return Orderer;
        })(JW.AbstractCollection.Orderer);
        AbstractMap.Orderer = Orderer;
        /**
         * [[JW.AbstractCollection.SorterComparing|SorterComparing]] implementation for [[JW.Map]].
         */
        var SorterComparing = (function (_super) {
            __extends(SorterComparing, _super);
            /**
             * @inheritdoc
             */
            function SorterComparing(source, config) {
                _super.call(this, source, config);
            }
            return SorterComparing;
        })(JW.AbstractCollection.SorterComparing);
        AbstractMap.SorterComparing = SorterComparing;
    })(AbstractMap = JW.AbstractMap || (JW.AbstractMap = {}));
})(JW || (JW = {}));
;
/// <reference path="../jwlib.ref.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JW;
(function (JW) {
    /**
     * Set is unordered collection optimized for items adding, removal and search. Unlike
     * array and map, set can contain only [[JW.Class]] instances. Internal set representation is
     * map from [[iid]] to items themselves.
     *
     * # Set methods
     *
     * **Difference compared to [[JW.AbstractCollection]] is in bold.**
     *
     * Content retrieving:
     *
     * * [[getLength]] - Returns count of items in collection.
     * For observable collections, **length** property may come
     * in handy if you want to track collection length dynamically.
     * * [[isEmpty]] - Checks collection for emptiness.
     * * [[getFirst]] - Returns first item in collection.
     * * [[containsItem]] - Does collection contain the item?
     * - **[[getJson]] - Returns internal representation of set.**
     *
     * Iteration algorithms:
     *
     * * [[every]] - Checks all items by criteria.
     * Returns true if all items match the criteria.
     * * [[some]] - Checks each item by criteria.
     * Returns true if some item matches the criteria.
     * * [[each]] - Iterates items through.
     * * [[search]] - Finds item by criteria.
     * Returns first item matching the criteria.
     * * [[filter]], [[$filter]], [[$$filter]] - Filters collection by criteria.
     * Builds new collection of the same type, consisting of items matching the criteria.
     * * [[count]], [[$count]], [[$$count]] - Counts the items matching criteria.
     * * [[map]], [[$map]], [[$$mapValues]], [[$$mapObjects]] - Maps collection items.
     * Builds new collection of the same type, consisting of results of mapping function call for each collection item.
     * * [[toSorted]], [[$toSorted]],
     * [[toSortedComparing]], [[$toSortedComparing]],
     * [[$$toSortedComparing]] -
     * Builds array consisting of collection items sorted by indexer or comparer.
     * * [[index]], [[$index]], [[$$index]] - Indexes collection.
     * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
     * * [[toArray]], [[$toArray]], [[$$toArray]] -
     * Builds new array consisting of collection items.
     * * [[toSet]], [[$toSet]], [[$$toSet]] -
     * Builds new set consisting of collection items.
     * * [[asArray]], [[$asArray]] - Represents collection as array.
     * * [[asSet]], [[$asSet]] - Represents collection as set.
     *
     * Collection modification:
     *
     * - **[[add]], [[tryAdd]] - Adds item to set.**
     * - **[[addAll]], [[$addAll]],
     * [[tryAddAll]] - Adds multiple items to set.**
     * - **[[remove]], [[tryRemove]] - Removes item from set.**
     * - **[[removeAll]], [[$removeAll]],
     * [[tryRemoveAll]] - Removes multiple items from set.**
     * * [[removeItem]] - Removes first occurency of an item in collection.
     * * [[removeItems]] - Removes all occurencies of items in collection.
     * * [[clear]], [[$clear]], [[tryClear]] - Clears collection.
     * - **[[splice]], [[trySplice]] - Removes and adds multiple items.**
     * - **[[performSplice]] - Adjusts contents using [[splice]] method.**
     *
     * Synchronizers creation:
     *
     * * [[createMapper]] - Creates item mapper.
     * Extended version of [[$$mapValues]] and [[$$mapObjects]] methods.
     * * [[createFilterer]] - Creates filterer.
     * Extended version of [[$$filter]] method.
     * * [[createCounter]] - Creates matching item counter.
     * Extended version of [[$$count]] method.
     * * [[createLister]] - Creates converter to set.
     * Extended version of [[$$toSet]] method.
     * * [[createIndexer]] - Creates converter to map (indexer).
     * Extended version of [[$$index]] method.
     * * [[createOrderer]] - Creates converter to array (orderer).
     * Extended version of [[$$toArray]] method.
     * * [[createSorterComparing]] - Creates converter to array (sorter by comparer).
     * Extended version of [[$$toSortedComparing]] method.
     * * [[createObserver]] - Creates observer.
     *
     * Similar collection creation (for algorithms and synchronizers implementation):
     *
     * * [[createEmpty]] - Creates empty collection of the same type.
     * * [[createEmptyArray]] - Creates empty array of the same observability type.
     * * [[createEmptyMap]] - Creates empty map of the same observability type.
     * * [[createEmptySet]] - Creates empty set of the same observability type.
     *
     * Other methods:
     *
     * - **[[detectSplice]] - Detects [[splice]] method arguments to adjust contents.**
     * - **[[equal]] - Checks for equality to array.**
     *
     * All the same algorithms are also available for native JavaScript Object as set,
     * see [[JW.Set]] static methods.
     *
     * @param T Collection item type.
     */
    var AbstractSet = (function (_super) {
        __extends(AbstractSet, _super);
        function AbstractSet(items, adapter) {
            _super.call(this);
            this._adapter = Boolean(adapter);
            this.json = this._adapter ? items : items ? JW.Array.index(items, JW.byField("_iid")) : {};
            this._length = JW.Set.getLength(this.json);
        }
        /**
         * @inheritdoc
         */
        AbstractSet.prototype.ownItems = function () {
            _super.prototype.ownItems.call(this);
            return this;
        };
        /**
         * Returns item map - internal collection representation.
         *
         * **Caution: doesn't make a copy - please don't modify.**
         */
        AbstractSet.prototype.getJson = function () {
            return this.json;
        };
        /**
         * @inheritdoc
         */
        AbstractSet.prototype.getLength = function () {
            return this._length;
        };
        /**
         * @inheritdoc
         */
        AbstractSet.prototype.isEmpty = function () {
            return this._length === 0;
        };
        /**
         * @inheritdoc
         */
        AbstractSet.prototype.getFirst = function () {
            return JW.Set.getFirst(this.json);
        };
        /**
         * @inheritdoc
         */
        AbstractSet.prototype.containsItem = function (item) {
            return this.json.hasOwnProperty(_JW.S(item._iid));
        };
        /**
         * Shorthand to [[containsItem]].
         */
        AbstractSet.prototype.contains = function (item) {
            return this.json.hasOwnProperty(_JW.S(item._iid));
        };
        /**
         * @inheritdoc
         */
        AbstractSet.prototype.every = function (callback, scope) {
            return JW.Set.every(this.json, callback, scope);
        };
        /**
         * @inheritdoc
         */
        AbstractSet.prototype.toSorted = function (callback, scope, order) {
            return JW.Set.toSorted(this.json, callback, scope || this, order);
        };
        /**
         * @inheritdoc
         */
        AbstractSet.prototype.toSortedComparing = function (compare, scope, order) {
            return JW.Set.toSortedComparing(this.json, compare, scope || this, order);
        };
        /**
         * @inheritdoc
         */
        AbstractSet.prototype.filter = function (callback, scope) {
            return JW.Set.filter(this.json, callback, scope);
        };
        /**
         * @inheritdoc
         */
        AbstractSet.prototype.$filter = function (callback, scope) {
            return JW.Set.$filter(this.json, callback, scope);
        };
        /**
         * @inheritdoc
         */
        AbstractSet.prototype.$$filter = function (callback, scope) {
            return this.$filter(callback, scope);
        };
        /**
         * @inheritdoc
         */
        AbstractSet.prototype.count = function (callback, scope) {
            return JW.Set.count(this.json, callback, scope);
        };
        /**
         * @inheritdoc
         */
        AbstractSet.prototype.map = function (callback, scope) {
            return JW.Set.map(this.json, callback, scope);
        };
        /**
         * @inheritdoc
         */
        AbstractSet.prototype.$map = function (callback, scope) {
            return JW.Set.$map(this.json, callback, scope);
        };
        /**
         * @inheritdoc
         */
        AbstractSet.prototype.$$mapValues = function (callback, scope) {
            return this.$map(callback, scope);
        };
        /**
         * @inheritdoc
         */
        AbstractSet.prototype.$$mapObjects = function (callback, scope) {
            return this.$map(callback, scope);
        };
        /**
         * @inheritdoc
         */
        AbstractSet.prototype.toSet = function () {
            return JW.apply({}, this.json);
        };
        /**
         * @inheritdoc
         */
        AbstractSet.prototype.$toSet = function () {
            return new JW.Set(this.toSet(), true);
        };
        /**
         * @inheritdoc
         */
        AbstractSet.prototype.asSet = function () {
            return this.json;
        };
        /**
         * @inheritdoc
         */
        AbstractSet.prototype.$asSet = function () {
            return this;
        };
        /**
         * Adds an item to set if one is absent.
         * @returns Item is added successfully. False if item is already present.
         */
        AbstractSet.prototype.add = function (item) {
            return this.tryAdd(item) !== undefined;
        };
        /**
         * Adds an item to set if one is absent.
         * @returns Item is added successfully. If collection is not modified, returns undefined.
         * In other words, this method may return true or undefined.
         */
        AbstractSet.prototype.tryAdd = function (item) {
            if (this.trySplice([], [item]) !== undefined) {
                return true;
            }
        };
        /**
         * Adds multiple items to set, ones that are absent.
         * @returns The added items.
         */
        AbstractSet.prototype.addAll = function (items) {
            var result = this.tryAddAll(items);
            return (result !== undefined) ? result : [];
        };
        /**
         * Adds multiple items to set, ones that are absent.
         * @returns The added items.
         */
        AbstractSet.prototype.$addAll = function (items) {
            return new JW.Array(this.addAll(items), true);
        };
        /**
         * Adds multiple items to set, ones that are absent.
         * @returns The added items.
         * If collection is not modified, returns undefined.
         */
        AbstractSet.prototype.tryAddAll = function (items) {
            var spliceResult = this.trySplice([], items);
            if (spliceResult !== undefined) {
                return spliceResult.addedItems;
            }
        };
        /**
         * Removes an item from set if one is present.
         * @returns Item is removed successfully. Returns false if item is already absent.
         */
        AbstractSet.prototype.remove = function (item) {
            return this.tryRemove(item) !== undefined;
        };
        /**
         * Removes an item from set if one is present.
         * @returns Item is removed successfully. If collection is not modified, returns undefined.
         * In other words, this method may return true or undefined.
         */
        AbstractSet.prototype.tryRemove = function (item) {
            if (this.trySplice([item], []) !== undefined) {
                return true;
            }
        };
        /**
         * @inheritdoc
         */
        AbstractSet.prototype.removeItem = function (item) {
            this.tryRemove(item);
        };
        /**
         * Removes multiple items from set, ones that are present.
         * @returns The removed items.
         */
        AbstractSet.prototype.removeAll = function (items) {
            var result = this.tryRemoveAll(items);
            return (result !== undefined) ? result : [];
        };
        /**
         * Removes multiple items from set, ones that are present.
         * @returns The removed items.
         */
        AbstractSet.prototype.$removeAll = function (items) {
            return new JW.Array(this.removeAll(items), true);
        };
        /**
         * Removes multiple items from set, ones that are present.
         * @returns The removed items.
         * If collection is not modified, returns undefined.
         */
        AbstractSet.prototype.tryRemoveAll = function (items) {
            var spliceResult = this.trySplice(items, []);
            if (spliceResult !== undefined) {
                return spliceResult.removedItems;
            }
        };
        /**
         * @inheritdoc
         */
        AbstractSet.prototype.removeItems = function (items) {
            this.tryRemoveAll(items);
        };
        /**
         * @inheritdoc
         */
        AbstractSet.prototype.clear = function () {
            var items = this.tryClear();
            return (items !== undefined) ? items : [];
        };
        /**
         * @inheritdoc
         */
        AbstractSet.prototype.$clear = function () {
            return new JW.Array(this.clear(), true);
        };
        /**
         * @inheritdoc
         */
        AbstractSet.prototype.tryClear = function () {
            var items = this._tryClear();
            if (items !== undefined && this._ownsItems) {
                JW.Array.backEvery(items, JW.destroyForcibly);
            }
            return items;
        };
        AbstractSet.prototype._tryClear = function () {
            if (this._length === 0) {
                return;
            }
            var items;
            this._length = 0;
            if (this._adapter) {
                items = JW.Set.tryClear(this.json);
            }
            else {
                items = this.toArray();
                this.json = {};
            }
            return items;
        };
        /**
         * Removes and adds multiple items in set. Universal optimized granular operation of removal/insertion.
         * @param removedItems Items to remove.
         * @param addedItems Items to add.
         * @returns Splice result. Never returns null or undefined.
         */
        AbstractSet.prototype.splice = function (removedItems, addedItems) {
            var spliceResult = this.trySplice(removedItems, addedItems);
            return (spliceResult !== undefined) ? spliceResult : { addedItems: [], removedItems: [] };
        };
        /**
         * Removes and adds multiple items in set. Universal optimized granular operation of removal/insertion.
         * @param removedItems Items to remove.
         * @param addedItems Items to add.
         * @returns Splice result.
         * If collection is not modified, returns undefined.
         */
        AbstractSet.prototype.trySplice = function (removedItems, addedItems) {
            var spliceResult = this._trySplice(removedItems, addedItems);
            if ((spliceResult !== undefined) && this._ownsItems) {
                JW.Array.backEvery(spliceResult.removedItems, JW.destroyForcibly);
            }
            return spliceResult;
        };
        AbstractSet.prototype._trySplice = function (removedItems, addedItems) {
            var spliceResult = JW.Set.trySplice(this.json, removedItems, addedItems);
            if (spliceResult !== undefined) {
                this._length += spliceResult.addedItems.length - spliceResult.removedItems.length;
                return spliceResult;
            }
        };
        /**
         * Detects [[splice]] method arguments to adjust set contents to **newItems**.
         * Determines which items should be removed and which ones should be added.
         * @param newItems New set contents.
         * @returns [[splice]] method arguments. If no method call required, returns undefined.
         */
        AbstractSet.prototype.detectSplice = function (newItems) {
            return JW.Set.detectSplice(this.json, newItems);
        };
        /**
         * Adjusts set contents to **newItems** using [[detectSplice]] and
         * [[splice]] methods.
         * @param newItems New set contents.
         */
        AbstractSet.prototype.performSplice = function (newItems) {
            var spliceParams = this.detectSplice(newItems);
            if (spliceParams !== undefined) {
                this.trySplice(spliceParams.removedItems, spliceParams.addedItems);
            }
        };
        /**
         * Checks for equality (===) to array, item by item.
         */
        AbstractSet.prototype.equal = function (array) {
            return JW.Set.equal(this.json, array);
        };
        /**
         * @inheritdoc
         */
        AbstractSet.prototype.createMapper = function (config) {
            return new AbstractSet.Mapper(this, config);
        };
        /**
         * @inheritdoc
         */
        AbstractSet.prototype.createFilterer = function (config) {
            return new AbstractSet.Filterer(this, config);
        };
        /**
         * @inheritdoc
         */
        AbstractSet.prototype.createCounter = function (config) {
            return new AbstractSet.Counter(this, config);
        };
        /**
         * @inheritdoc
         */
        AbstractSet.prototype.createObserver = function (config) {
            return new AbstractSet.Observer(this, config);
        };
        /**
         * @inheritdoc
         */
        AbstractSet.prototype.createOrderer = function (config) {
            return new AbstractSet.Orderer(this, config);
        };
        /**
         * @inheritdoc
         */
        AbstractSet.prototype.createSorterComparing = function (config) {
            return new AbstractSet.SorterComparing(this, config);
        };
        /**
         * @inheritdoc
         */
        AbstractSet.prototype.createIndexer = function (config) {
            return new AbstractSet.Indexer(this, config);
        };
        /**
         * @inheritdoc
         */
        AbstractSet.prototype.createLister = function (config) {
            return new AbstractSet.Lister(this, config);
        };
        return AbstractSet;
    })(JW.AbstractCollection);
    JW.AbstractSet = AbstractSet;
    var AbstractSet;
    (function (AbstractSet) {
        /**
         * [[JW.AbstractCollection.Counter|Counter]] implementation for [[JW.Set]].
         */
        var Counter = (function (_super) {
            __extends(Counter, _super);
            /**
             * @inheritdoc
             */
            function Counter(source, config) {
                _super.call(this, source, config);
            }
            return Counter;
        })(JW.AbstractCollection.Counter);
        AbstractSet.Counter = Counter;
        /**
         * [[JW.AbstractCollection.Filterer|Filterer]] implementation for [[JW.Set]].
         */
        var Filterer = (function (_super) {
            __extends(Filterer, _super);
            /**
             * @inheritdoc
             */
            function Filterer(source, config) {
                _super.call(this, source, config);
                this.target.tryAddAll(source.$toArray().filter(this._filterItem, this._scope));
            }
            /**
             * @inheritdoc
             */
            Filterer.prototype.destroyObject = function () {
                this.target.tryRemoveAll(this.source.toArray());
                _super.prototype.destroyObject.call(this);
            };
            return Filterer;
        })(JW.AbstractCollection.Filterer);
        AbstractSet.Filterer = Filterer;
        /**
         * [[JW.AbstractCollection.Indexer|Indexer]] implementation for [[JW.Set]].
         */
        var Indexer = (function (_super) {
            __extends(Indexer, _super);
            /**
             * @inheritdoc
             */
            function Indexer(source, config) {
                _super.call(this, source, config);
            }
            return Indexer;
        })(JW.AbstractCollection.Indexer);
        AbstractSet.Indexer = Indexer;
        /**
         * [[JW.AbstractCollection.Lister|Lister]] implementation for [[JW.Set]].
         */
        var Lister = (function (_super) {
            __extends(Lister, _super);
            /**
             * @inheritdoc
             */
            function Lister(source, config) {
                _super.call(this, source, config);
            }
            return Lister;
        })(JW.AbstractCollection.Lister);
        AbstractSet.Lister = Lister;
        /**
         * [[JW.AbstractCollection.Mapper|Mapper]] implementation for [[JW.Set]].
         */
        var Mapper = (function (_super) {
            __extends(Mapper, _super);
            /**
             * @inheritdoc
             */
            function Mapper(source, config) {
                _super.call(this, source, config);
                /**
                 * @hidden
                 */
                this._items = {};
                this.target.tryAddAll(this._createItems(source.toArray()));
            }
            /**
             * @inheritdoc
             */
            Mapper.prototype.destroyObject = function () {
                var datas = this.source.toArray();
                this.target.tryRemoveAll(this._getItems(datas));
                this._destroyItems(datas);
                _super.prototype.destroyObject.call(this);
            };
            /**
             * @hidden
             */
            Mapper.prototype._getItems = function (datas) {
                var _this = this;
                return JW.Array.map(datas, function (data) {
                    return _this._items[data._iid];
                }, this);
            };
            /**
             * @hidden
             */
            Mapper.prototype._createItems = function (datas) {
                var items = [];
                for (var i = 0, l = datas.length; i < l; ++i) {
                    var data = datas[i];
                    var item = this._createItem.call(this._scope || this, data);
                    items.push(item);
                    this._items[data._iid] = item;
                }
                return items;
            };
            /**
             * @hidden
             */
            Mapper.prototype._destroyItems = function (datas) {
                if (this._destroyItem === undefined) {
                    return;
                }
                for (var i = datas.length - 1; i >= 0; --i) {
                    var data = datas[i];
                    var iid = data._iid;
                    var item = this._items[iid];
                    delete this._items[iid];
                    this._destroyItem.call(this._scope || this, item, data);
                }
            };
            return Mapper;
        })(JW.AbstractCollection.Mapper);
        AbstractSet.Mapper = Mapper;
        /**
         * [[JW.AbstractCollection.Observer|Observer]] implementation for [[JW.Set]].
         */
        var Observer = (function (_super) {
            __extends(Observer, _super);
            /**
             * @inheritdoc
             */
            function Observer(source, config) {
                _super.call(this, source, config);
            }
            return Observer;
        })(JW.AbstractCollection.Observer);
        AbstractSet.Observer = Observer;
        /**
         * [[JW.AbstractCollection.Orderer|Orderer]] implementation for [[JW.Set]].
         */
        var Orderer = (function (_super) {
            __extends(Orderer, _super);
            /**
             * @inheritdoc
             */
            function Orderer(source, config) {
                _super.call(this, source, config);
            }
            return Orderer;
        })(JW.AbstractCollection.Orderer);
        AbstractSet.Orderer = Orderer;
        /**
         * [[JW.AbstractCollection.SorterComparing|SorterComparing]] implementation for [[JW.Set]].
         */
        var SorterComparing = (function (_super) {
            __extends(SorterComparing, _super);
            /**
             * @inheritdoc
             */
            function SorterComparing(source, config) {
                _super.call(this, source, config);
            }
            return SorterComparing;
        })(JW.AbstractCollection.SorterComparing);
        AbstractSet.SorterComparing = SorterComparing;
    })(AbstractSet = JW.AbstractSet || (JW.AbstractSet = {}));
})(JW || (JW = {}));
;
/// <reference path="../jwlib.ref.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JW;
(function (JW) {
    /**
     * Simple implementation of [[JW.AbstractArray]].
     *
     * @param T Collection item type.
     */
    var Array = (function (_super) {
        __extends(Array, _super);
        /**
         * @inheritdoc
         */
        function Array(items, adapter) {
            _super.call(this, items, adapter);
        }
        /**
         * @inheritdoc
         */
        Array.prototype.ownItems = function () {
            _super.prototype.ownItems.call(this);
            return this;
        };
        /**
         * @inheritdoc
         */
        Array.prototype.createEmpty = function () {
            return new Array();
        };
        /**
         * @inheritdoc
         */
        Array.prototype.createEmptyArray = function () {
            return new Array();
        };
        /**
         * @inheritdoc
         */
        Array.prototype.createEmptyMap = function () {
            return new JW.Map();
        };
        /**
         * @inheritdoc
         */
        Array.prototype.createEmptySet = function () {
            return new JW.Set();
        };
        /**
         * Returns first item in collection. If collection is empty, returns undefined.
         */
        Array.getFirst = function (arr) {
            return arr[0];
        };
        /**
         * Returns index of first collection item. If collection is empty, returns undefined.
         */
        Array.getFirstKey = function (arr) {
            if (arr.length !== 0) {
                return 0;
            }
        };
        /**
         * Returns the last collection item. If collection is empty, returns undefined.
         */
        Array.getLast = function (arr) {
            return arr[arr.length - 1];
        };
        /**
         * Returns index of last collection item. If collection is empty, returns undefined.
         */
        Array.getLastKey = function (arr) {
            var l = arr.length;
            if (l !== 0) {
                return l - 1;
            }
        };
        /**
         * Returns count of items in collection.
         */
        Array.getLength = function (arr) {
            return arr.length;
        };
        /**
         * Checks collection for emptiness.
         */
        Array.isEmpty = function (arr) {
            return arr.length === 0;
        };
        /**
         * Returns item by index. If item with such index doesn't exist, returns undefined.
         */
        Array.get = function (arr, index) {
            return arr[index];
        };
        /**
         * Returns array of indexes of all collection items, i.e. array `[0, 1, ... , length - 1]`.
         */
        Array.getKeys = function (arr) {
            var result = new _JW.A(arr.length);
            for (var i = 0, l = arr.length; i < l; ++i) {
                result[i] = i;
            }
            return result;
        };
        /**
         * Returns array of indexes of all collection items, i.e. array `[0, 1, ... , length - 1]`.
         */
        Array.$getKeys = function (arr) {
            return new Array(Array.getKeys(arr), true);
        };
        /**
         * Checks existance of item with specified index in collection.
         */
        Array.containsKey = function (arr, index) {
            return arr[index] !== undefined;
        };
        /**
         * Checks item for existance in collection.
         */
        Array.containsItem = function (arr, item) {
            return !Array.every(arr, function (v) {
                return item !== v;
            });
        };
        /**
         * Returns index of item in collection. If such item doesn't exist, returns undefined.
         */
        Array.keyOf = function (arr, item) {
            return Array.find(arr, function (v) {
                return item === v;
            });
        };
        /**
         * Matches all items against criteria.
         *
         * Returns true if callback returns !== false for all collection items.
         *
         * Algorithms iterates items sequentially, and stops after first item not matching the criteria.
         *
         * @param callback Criteria callback.
         * @param scope **callback** call scope. Defaults to collection itself.
         */
        Array.every = function (arr, callback, scope) {
            for (var i = 0, l = arr.length; i < l; ++i) {
                if (callback.call(scope || arr, arr[i], i) === false) {
                    return false;
                }
            }
            return true;
        };
        /**
         * Matches each item against criteria.
         *
         * Returns true if callback returns !== false for some collection item.
         *
         * Algorithms iterates items sequentially, and stops after first item matching the criteria.
         *
         * @param callback Criteria callback.
         * @param scope **callback** call scope. Defaults to collection itself.
         */
        Array.some = function (arr, callback, scope) {
            return !Array.every(arr, function (item, index) {
                return callback.call(this, item, index) === false;
            }, scope);
        };
        /**
         * Iterates collection items. Calls specified function for all items.
         *
         * @param callback Callback function.
         * @param scope **callback** call scope. Defaults to collection itself.
         */
        Array.each = function (arr, callback, scope) {
            Array.every(arr, function (item, index) {
                callback.call(this, item, index);
                return true;
            }, scope);
        };
        /**
         * Finds item matching criteria.
         *
         * Returns key of first item for which callback returns !== false.
         *
         * Algorithms iterates items sequentially, and stops after first item matching the criteria.
         *
         * @param callback Criteria callback.
         * @param scope **callback** call scope. Defaults to collection itself.
         * @returns Found item key or undefined.
         */
        Array.find = function (arr, callback, scope) {
            var result;
            Array.every(arr, function (item, index) {
                if (callback.call(this, item, index) !== false) {
                    result = index;
                    return false;
                }
                return true;
            }, scope);
            return result;
        };
        /**
         * Finds item matching criteria.
         *
         * Returns first item for which callback returns !== false.
         *
         * Algorithms iterates items sequentially, and stops after first item matching the criteria.
         *
         * @param callback Criteria callback.
         * @param scope **callback** call scope. Defaults to collection itself.
         * @returns Found item or undefined.
         */
        Array.search = function (arr, callback, scope) {
            var result;
            Array.every(arr, function (item, index) {
                if (callback.call(this, item, index) !== false) {
                    result = item;
                    return false;
                }
                return true;
            }, scope);
            return result;
        };
        /**
         * Filters collection by criteria.
         *
         * Builds new collection of the same type, consisting of items for which callback returns !== false.
         *
         * @param callback Criteria callback.
         * @param scope **callback** call scope. Defaults to collection itself.
         * @returns Filtered collection.
         */
        Array.filter = function (arr, callback, scope) {
            var result = [];
            Array.every(arr, function (item, index) {
                if (callback.call(this, item, index) !== false) {
                    result.push(item);
                }
                return true;
            }, scope);
            return result;
        };
        /**
         * Filters collection by criteria.
         *
         * Builds new collection of the same type, consisting of items for which callback returns !== false.
         *
         * @param callback Criteria callback.
         * @param scope **callback** call scope. Defaults to collection itself.
         * @returns Filtered collection.
         */
        Array.$filter = function (arr, callback, scope) {
            return new Array(Array.filter(arr, callback, scope), true);
        };
        /**
         * Counts the items matching criteria.
         *
         * Returns the number of items for which callback returns !== false.
         *
         * @param callback Criteria callback.
         * @param scope **callback** call scope. Defaults to collection itself.
         * @returns Number of items.
         */
        Array.count = function (arr, callback, scope) {
            var result = 0;
            Array.every(arr, function (item, index) {
                if (callback.call(this, item, index) !== false) {
                    ++result;
                }
                return true;
            }, scope);
            return result;
        };
        /**
         * Counts the items matching criteria.
         *
         * Returns the number of items for which callback returns !== false.
         *
         * @param callback Criteria callback.
         * @param scope **callback** call scope. Defaults to collection itself.
         * @returns Number of items.
         */
        Array.$count = function (arr, callback, scope) {
            return new JW.Property(Array.count(arr, callback, scope));
        };
        /**
         * Maps collection items.
         *
         * Builds new collection of the same type, containing results of callback call for each collection item.
         *
         * @param callback Mapping function.
         * @param scope **callback** call scope. Defaults to collection itself.
         * @returns Mapped collection.
         */
        Array.map = function (arr, callback, scope) {
            var result = new _JW.A(arr.length);
            Array.every(arr, function (item, index) {
                result[index] = callback.call(this, item, index);
                return true;
            }, scope);
            return result;
        };
        /**
         * Maps collection items.
         *
         * Builds new collection of the same type, containing results of callback call for each collection item.
         *
         * @param callback Mapping function.
         * @param scope **callback** call scope. Defaults to collection itself.
         * @returns Mapped collection.
         */
        Array.$map = function (arr, callback, scope) {
            return new Array(Array.map(arr, callback, scope), true);
        };
        /**
         * Returns keys of sorted items.
         *
         * Builds array of item keys, sorted by result of callback call for each item.
         *
         * @param callback Indexer function. Must return a comparable value, compatible with
         * [[JW.cmp]]. Returns item itself by default.
         * @param scope **callback** call scope. Defaults to collection itself.
         * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
         * @returns Sorted item keys array.
         */
        Array.getSortingKeys = function (arr, callback, scope, order) {
            callback = callback || function (x) { return x; };
            order = order || 1;
            var pairs = [];
            Array.every(arr, function (item, key) {
                pairs.push([key, callback.call(this, item, key)]);
                return true;
            }, scope);
            pairs.sort(function (x, y) {
                return order * JW.cmp(x[1], y[1]);
            });
            return Array.map(pairs, function (pair) {
                return pair[0];
            });
        };
        /**
         * Returns keys of sorted items.
         *
         * Builds array of item keys, sorted by result of callback call for each item.
         *
         * @param callback Indexer function. Must return a comparable value, compatible with
         * [[JW.cmp]]. Returns item itself by default.
         * @param scope **callback** call scope. Defaults to collection itself.
         * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
         * @returns Sorted item keys array.
         */
        Array.$getSortingKeys = function (arr, callback, scope, order) {
            return new Array(Array.getSortingKeys(arr, callback, scope, order), true);
        };
        /**
         * Returns keys of sorted items.
         *
         * Builds array of item keys, sorted by comparer.
         *
         * @param compare Comparer function. Should return positive value if t1 > t2;
         * negative value if t1 < t2; 0 if t1 == t2.
         * Defaults to [[JW.cmp]]
         * @param scope **comparer** call scope. Defaults to collection itself.
         * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
         * @returns Sorted item keys array.
         */
        Array.getSortingKeysComparing = function (arr, compare, scope, order) {
            compare = compare || JW.cmpCaseSensitive;
            order = order || 1;
            var pairs = [];
            Array.every(arr, function (item, key) {
                pairs.push([key, item]);
                return true;
            }, scope);
            pairs.sort(function (x, y) {
                return order * compare.call(scope, x[1], y[1], x[0], y[0]);
            });
            return Array.map(pairs, function (pair) {
                return pair[0];
            });
        };
        /**
         * Returns keys of sorted items.
         *
         * Builds array of item keys, sorted by comparer.
         *
         * @param compare Comparer function. Should return positive value if t1 > t2;
         * negative value if t1 < t2; 0 if t1 == t2.
         * Defaults to [[JW.cmp]]
         * @param scope **comparer** call scope. Defaults to collection itself.
         * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
         * @returns Sorted item keys array.
         */
        Array.$getSortingKeysComparing = function (arr, compare, scope, order) {
            return new Array(Array.getSortingKeysComparing(arr, compare, scope, order), true);
        };
        /**
         * Converts collection to sorted array.
         *
         * Builds array consisting of collection items sorted by result of callback call for each item.
         *
         * @param callback Indexer function. Must return a comparable value, compatible with
         * [[JW.cmp]]. Returns item itself by default.
         * @param scope **callback** call scope. Defaults to collection itself.
         * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
         * @returns Sorted array.
         */
        Array.toSorted = function (arr, callback, scope, order) {
            return Array.map(Array.getSortingKeys(arr, callback, scope, order), function (index) {
                return arr[index];
            });
        };
        /**
         * Converts collection to sorted array.
         *
         * Builds array consisting of collection items sorted by result of callback call for each item.
         *
         * @param callback Indexer function. Must return a comparable value, compatible with
         * [[JW.cmp]]. Returns item itself by default.
         * @param scope **callback** call scope. Defaults to collection itself.
         * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
         * @returns Sorted array.
         */
        Array.$toSorted = function (arr, callback, scope, order) {
            return new Array(Array.toSorted(arr, callback, scope, order), true);
        };
        /**
         * Converts collection to sorted array.
         *
         * Builds array consisting of collection items sorted by comparer.
         *
         * @param compare Comparer function. Should return positive value if t1 > t2;
         * negative value if t1 < t2; 0 if t1 == t2.
         * Defaults to [[JW.cmp]]
         * @param scope **comparer** call scope. Defaults to collection itself.
         * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
         * @returns Sorted array.
         */
        Array.toSortedComparing = function (arr, compare, scope, order) {
            return Array.map(Array.getSortingKeysComparing(arr, compare, scope, order), function (index) {
                return arr[index];
            });
        };
        /**
         * Converts collection to sorted array.
         *
         * Builds array consisting of collection items sorted by comparer.
         *
         * @param compare Comparer function. Should return positive value if t1 > t2;
         * negative value if t1 < t2; 0 if t1 == t2.
         * Defaults to [[JW.cmp]]
         * @param scope **comparer** call scope. Defaults to collection itself.
         * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
         * @returns Sorted array.
         */
        Array.$toSortedComparing = function (arr, compare, scope, order) {
            return new Array(Array.toSortedComparing(arr, compare, scope, order), true);
        };
        /**
         * Indexes collection.
         *
         * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
         *
         * @param callback Indexer function.
         * @param scope **callback** call scope. Defaults to collection itself.
         * @returns Collection index.
         */
        Array.index = function (arr, callback, scope) {
            var result = {};
            Array.every(arr, function (item, index) {
                var key = callback.call(this, item, index);
                if (key != null) {
                    result[key] = item;
                }
                return true;
            }, scope);
            return result;
        };
        /**
         * Indexes collection.
         *
         * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
         *
         * @param callback Indexer function.
         * @param scope **callback** call scope. Defaults to collection itself.
         * @returns Collection index.
         */
        Array.$index = function (arr, callback, scope) {
            return new JW.Map(Array.index(arr, callback, scope), true);
        };
        /**
         * Converts collection to array.
         *
         * Builds new array consisting of collection items.
         */
        Array.toArray = function (arr) {
            return arr.concat();
        };
        /**
         * Converts collection to array.
         *
         * Builds new array consisting of collection items.
         */
        Array.$toArray = function (arr) {
            return new Array(arr);
        };
        /**
         * Converts collection to map.
         *
         * Builds new map consisting of collection items.
         */
        Array.toMap = function (arr) {
            var result = {};
            Array.every(arr, function (v, k) {
                result[k] = v;
                return true;
            });
            return result;
        };
        /**
         * Converts collection to map.
         *
         * Builds new map consisting of collection items.
         */
        Array.$toMap = function (arr) {
            return new JW.Map(Array.toMap(arr), true);
        };
        /**
         * Converts collection to set.
         *
         * Builds new set consisting of collection items.
         * Requires T to extend JW.Class.
         */
        Array.toSet = function (arr) {
            return Array.index(arr, JW.iidForcibly);
        };
        /**
         * Converts collection to set.
         *
         * Builds new set consisting of collection items.
         * Requires T to extend JW.Class.
         */
        Array.$toSet = function (arr) {
            return new JW.Set(arr);
        };
        /**
         * Represents collection as array.
         *
         * If this collection is array, returns it immediately.
         * Else, executes [[toArray]] method.
         * This method works usually faster than [[toArray]],
         * but please make sure that the returned array
         * won't be modified externally, because it can cause strange unexpected bugs.
         */
        Array.asArray = function (arr) {
            return arr;
        };
        /**
         * Represents collection as array.
         *
         * If this collection is array, returns it immediately.
         * Else, executes [[toArray]] method.
         * This method works usually faster than [[toArray]],
         * but please make sure that the returned array
         * won't be modified externally, because it can cause strange unexpected bugs.
         */
        Array.$asArray = function (arr) {
            return new Array(arr, true);
        };
        /**
         * Represents collection as map.
         *
         * If this collection is map, returns it immediately. Else, executes [[toMap]] method.
         * This method works usually faster than [[toMap]], but please make sure that the returned map
         * won't be modified externally, because it can cause strange unexpected bugs.
         */
        Array.asMap = function (arr) {
            return Array.toMap(arr);
        };
        /**
         * Represents collection as map.
         *
         * If this collection is map, returns it immediately. Else, executes [[toMap]] method.
         * This method works usually faster than [[toMap]], but please make sure that the returned map
         * won't be modified externally, because it can cause strange unexpected bugs.
         */
        Array.$asMap = function (arr) {
            return Array.$toMap(arr);
        };
        /**
         * Represents collection as set.
         *
         * If this collection is set, returns it immediately.
         * Else, executes [[toSet]] method.
         * This method works usually faster than [[toSet]],
         * but please make sure that the returned set
         * won't be modified externally, because it can cause strange unexpected bugs.
         * Requires T to extend JW.Class.
         */
        Array.asSet = function (arr) {
            return Array.toSet(arr);
        };
        /**
         * Represents collection as set.
         *
         * If this collection is set, returns it immediately.
         * Else, executes [[toSet]] method.
         * This method works usually faster than [[toSet]],
         * but please make sure that the returned set
         * won't be modified externally, because it can cause strange unexpected bugs.
         * Requires T to extend JW.Class.
         */
        Array.$asSet = function (arr) {
            return Array.$toSet(arr);
        };
        /**
         * Inserts an item to array.
         *
         * @param item Item to insert.
         * @param index Index of an item before which to insert new one.
         * By default, appends the item to the end of collection.
         */
        Array.add = function (arr, item, index) {
            Array.tryAdd(arr, item, index);
        };
        /**
         * Inserts an item to array.
         *
         * @param item Item to insert.
         * @param index Index of an item before which to insert new one.
         * By default, appends the item to the end of collection.
         * @returns Always returns true.
         */
        Array.tryAdd = function (arr, item, index) {
            arr.splice(JW.def(index, arr.length), 0, item);
            return true;
        };
        /**
         * Inserts item range to array.
         *
         * @param items Items to insert.
         * @param index Index of an item before which to insert new ones.
         * By default, appends the items to the end of collection.
         */
        Array.addAll = function (arr, items, index) {
            Array.tryAddAll(arr, items, index);
        };
        /**
         * Inserts item range to array.
         *
         * @param items Items to insert.
         * @param index Index of an item before which to insert new ones.
         * By default, appends the items to the end of collection.
         * @returns Always returns true.
         */
        Array.tryAddAll = function (arr, items, index) {
            if (items.length === 0) {
                return;
            }
            if (index === undefined) {
                var l = arr.length;
                arr.length += items.length;
                for (var i = 0; i < items.length; ++i) {
                    arr[i + l] = items[i];
                }
            }
            else {
                var tail = arr.splice(index, arr.length - index);
                Array.tryAddAll(arr, items);
                Array.tryAddAll(arr, tail);
            }
            return true;
        };
        /**
         * Replaces item at specified position.
         * If array doesn't contain such index, it will demolish the application.
         *
         * @returns The replaced item.
         */
        Array.set = function (arr, item, index) {
            var result = Array.trySet(arr, item, index);
            return (result !== undefined) ? result.value : arr[index];
        };
        /**
         * Replaces item at specified position.
         * If array doesn't contain such index, it will demolish the application.
         *
         * @returns Proxy of the replaced item. If collection is not modified, returns undefined.
         */
        Array.trySet = function (arr, item, index) {
            var oldItem = arr[index];
            if (item !== oldItem) {
                arr[index] = item;
                return { value: oldItem };
            }
        };
        /**
         * Removes item at specified position.
         * If array doesn't contain such index, it will demolish the application.
         *
         * @returns The removed item.
         */
        Array.remove = function (arr, index) {
            return Array.tryRemove(arr, index);
        };
        /**
         * Removes item at specified position.
         * If array doesn't contain such index, it will demolish the application.
         *
         * @returns The removed item. If collection is not modified, returns undefined.
         */
        Array.tryRemove = function (arr, index) {
            return arr.splice(index, 1)[0];
        };
        /**
         * Removes item range from array.
         *
         * @param index Index of first item to remove.
         * @param count Count of items to remove.
         * @returns The removed items.
         */
        Array.removeAll = function (arr, index, count) {
            var result = Array.tryRemoveAll(arr, index, count);
            return result || [];
        };
        /**
         * Removes item range from array.
         *
         * @param index Index of first item to remove.
         * @param count Count of items to remove.
         * @returns The removed items.
         */
        Array.$removeAll = function (arr, index, count) {
            return new Array(Array.removeAll(arr, index, count), true);
        };
        /**
         * Removes item range from array.
         *
         * @param index Index of first item to remove.
         * @param count Count of items to remove.
         * @returns The removed items. If collection is not modified, returns undefined.
         */
        Array.tryRemoveAll = function (arr, index, count) {
            if (count !== 0) {
                return arr.splice(index, count);
            }
        };
        /**
         * Removes first occurrence of an item in collection.
         */
        Array.removeItem = function (arr, item) {
            var key = Array.keyOf(arr, item);
            if (key !== undefined) {
                Array.tryRemove(arr, key);
            }
            return key;
        };
        /**
         * Removes all occurrences of items in collection.
         * **Known issue:** *Works only if T extends JW.Class!*
         */
        Array.removeItems = function (arr, items) {
            var itemSet = new JW.Set(items);
            var newItems = Array.filter(arr, function (item) {
                return !itemSet.contains(item);
            });
            Array.performSplice(arr, newItems);
        };
        /**
         * Moves an item inside array.
         *
         * @param fromIndex Item index to move.
         * @param toIndex Index to move to.
         * @returns The moved item.
         */
        Array.move = function (arr, fromIndex, toIndex) {
            Array.tryMove(arr, fromIndex, toIndex);
            return arr[toIndex];
        };
        /**
         * Moves an item inside array.
         *
         * @param fromIndex Item index to move.
         * @param toIndex Index to move to.
         * @returns The moved item. If collection is not modified, returns undefined.
         */
        Array.tryMove = function (arr, fromIndex, toIndex) {
            if (fromIndex === toIndex) {
                return;
            }
            var item = arr[fromIndex];
            arr.splice(fromIndex, 1);
            arr.splice(toIndex, 0, item);
            return item;
        };
        /**
         * Clears collection.
         * @returns Old collection contents. Never returns null or undefined.
         */
        Array.clear = function (arr) {
            var result = Array.tryClear(arr);
            return (result !== undefined) ? result : [];
        };
        /**
         * Clears collection.
         * @returns Old collection contents. Never returns null or undefined.
         */
        Array.$clear = function (arr) {
            return new Array(Array.clear(arr), true);
        };
        /**
         * Clears collection.
         * @returns Old collection contents. If not modified - undefined.
         */
        Array.tryClear = function (arr) {
            if (arr.length !== 0) {
                return arr.splice(0, arr.length);
            }
        };
        /**
         * Removes and inserts item ranges. Universal optimized granular operation of removal/insertion.
         *
         * @param removeParamsList Array of segments to remove sorted by index asc. Segments are removed in backward order.
         * @param addParamsList Array of segments to insert sorted by index asc. Segments are inserted in forward order.
         * @returns Splice result. Never returns null or undefined.
         */
        Array.splice = function (arr, removeParamsList, addParamsList) {
            var result = Array.trySplice(arr, removeParamsList, addParamsList);
            return (result !== undefined) ? result : new JW.AbstractArray.SpliceResult(arr.concat(), [], []);
        };
        /**
         * Removes and inserts item ranges. Universal optimized granular operation of removal/insertion.
         *
         * @param removeParamsList Array of segments to remove sorted by index asc. Segments are removed in backward order.
         * @param addParamsList Array of segments to insert sorted by index asc. Segments are inserted in forward order.
         * @returns Splice result. If collection is not modified, returns undefined.
         */
        Array.trySplice = function (arr, removeParamsList, addParamsList) {
            var optimizedRemoveParamsList = [];
            var rlast = null;
            var rparams;
            for (var i = 0, l = removeParamsList.length; i < l; ++i) {
                rparams = removeParamsList[i];
                if (rlast && (rparams.index === rlast.index + rlast.count)) {
                    rlast.count += rparams.count;
                }
                else {
                    rlast = rparams.clone();
                    optimizedRemoveParamsList.push(rlast);
                }
            }
            var optimizedAddParamsList = [];
            var alast = null;
            var aparams;
            for (var i = 0, l = addParamsList.length; i < l; ++i) {
                aparams = addParamsList[i];
                if (alast && (aparams.index === alast.index + alast.items.length)) {
                    Array.tryAddAll(alast.items, aparams.items);
                }
                else {
                    alast = aparams.clone();
                    optimizedAddParamsList.push(alast);
                }
            }
            var oldItems = arr.concat();
            var removedItemsList = [];
            for (var i = optimizedRemoveParamsList.length - 1; i >= 0; --i) {
                rparams = optimizedRemoveParamsList[i];
                var index = rparams.index;
                var items = Array.tryRemoveAll(arr, index, rparams.count);
                if (items === undefined) {
                    continue;
                }
                removedItemsList.push(new JW.AbstractArray.IndexItems(index, items));
            }
            var addedItemsList = [];
            for (var i = 0, l = optimizedAddParamsList.length; i < l; ++i) {
                aparams = optimizedAddParamsList[i];
                if (Array.tryAddAll(arr, aparams.items, aparams.index) === undefined) {
                    continue;
                }
                addedItemsList.push(aparams);
            }
            if ((removedItemsList.length !== 0) || (addedItemsList.length !== 0)) {
                removedItemsList.reverse();
                return new JW.AbstractArray.SpliceResult(oldItems, removedItemsList, addedItemsList);
            }
        };
        /**
         * Reorders array items.
         *
         * @param indexArray Index array. Item with index `i` will be moved to index `indexArray[i]`.
         * Must contain all indexes from 0 to (length - 1).
         */
        Array.reorder = function (arr, indexArray) {
            Array.tryReorder(arr, indexArray);
        };
        /**
         * Reorders array items.
         *
         * @param indexArray Index array. Item with index `i` will be moved to index `indexArray[i]`.
         * Must contain all indexes from 0 to (length - 1).
         * @returns Old array contents. If collection is not modified, returns undefined.
         */
        Array.tryReorder = function (arr, indexArray) {
            var length = arr.length;
            if (Array.isIdentity(indexArray)) {
                return;
            }
            var oldItems = arr.concat();
            for (var i = 0; i < length; ++i) {
                arr[indexArray[i]] = oldItems[i];
            }
            return oldItems;
        };
        /**
         * Detects [[splice]] method arguments to adjust array contents to **newItems**.
         * Determines which item ranges should be removed and which ones should be inserted.
         * All items must have unique **getKey** function result.
         * If items don't have unique key, probably [[detectFilter]] method may help,
         * because it doesn't require item uniquiness.
         *
         * @param newItems New array contents.
         * @param getKey Function which returns unique key of an item in this collection.
         * Defaults to [[getKey]].
         * If collection consists of instances of JW.Class, then you are in a good shape.
         * @param scope **getKey** call scope. Defaults to collection itself.
         * @returns [[splice]] method arguments. If no method call required, returns undefined.
         */
        Array.detectSplice = function (oldItems, newItems, getKey, scope) {
            getKey = getKey || JW.iidForcibly;
            scope = scope || oldItems;
            var removeParamsList = [];
            var addParamsList = [];
            var oldIndexMap = {};
            for (var i = 0, l = oldItems.length; i < l; ++i) {
                oldIndexMap[getKey.call(scope, oldItems[i])] = i;
            }
            var nextOldIndex = 0;
            var offset = 0;
            var newItemBuffer = [];
            function buffer(item) {
                newItemBuffer.push(item);
            }
            function flush() {
                if (newItemBuffer.length === 0) {
                    return;
                }
                addParamsList.push(new JW.AbstractArray.IndexItems(offset + nextOldIndex, newItemBuffer));
                offset += newItemBuffer.length;
                newItemBuffer = [];
            }
            function testRemove(oldIndex) {
                if (oldIndex > nextOldIndex) {
                    var count = oldIndex - nextOldIndex;
                    removeParamsList.push(new JW.AbstractArray.IndexCount(nextOldIndex, count));
                    offset -= count;
                }
            }
            for (var newIndex = 0, l = newItems.length; newIndex < l; ++newIndex) {
                var item = newItems[newIndex];
                var key = getKey.call(scope, item);
                var oldIndex = oldIndexMap[key];
                if ((oldIndex === undefined) || (oldIndex < nextOldIndex)) {
                    buffer(item);
                }
                else {
                    flush();
                    testRemove(oldIndex);
                    nextOldIndex = oldIndex + 1;
                }
            }
            flush();
            testRemove(oldItems.length);
            if ((removeParamsList.length !== 0) || (addParamsList.length !== 0)) {
                return { removeParamsList: removeParamsList, addParamsList: addParamsList };
            }
        };
        /**
         * Detects **removeParamsList** arguments of [[splice]] to adjust array contents to **newItems**.
         * Determines which item ranges should be removed.
         * Doesn't assume items insertion - try [[detectSplice]] if that's the case.
         * In advantage to [[detectSplice]], doesn't require item uniquiness.
         *
         * @param newItems New array contents.
         * @returns **removeParamsList** argument of [[splice]] method.
         * If no method call required, returns undefined.
         */
        Array.detectFilter = function (oldItems, newItems) {
            var removeParamsList = [];
            var oldIndex = 0;
            var oldLength = oldItems.length;
            var newLength = newItems.length;
            for (var newIndex = 0; newIndex <= newLength; ++newIndex) {
                var newItem = newItems[newIndex];
                var count = 0;
                while ((oldIndex + count < oldLength) && (oldItems[oldIndex + count] !== newItem)) {
                    ++count;
                }
                if (count !== 0) {
                    removeParamsList.push(new JW.AbstractArray.IndexCount(oldIndex, count));
                }
                oldIndex += count + 1;
            }
            if (removeParamsList.length !== 0) {
                return removeParamsList;
            }
        };
        /**
         * Detects [[reorder]] method arguments to adjust array contents to **newItems**.
         * Determines where to move all items.
         * If **newItems** contents differ from collection contents,
         * you should pray to Gods that application still works well.
         *
         * @param newItems New array contents.
         * @param getKey Function which returns unique key of an item in this collection.
         * Defaults to [[getKey]].
         * If collection consists of instances of JW.Class, then it's all right.
         * @param scope **getKey** call scope. Defaults to collection itself.
         * @returns **indexArray** argument of [[reorder]] method.
         * If no method call required, returns undefined.
         */
        Array.detectReorder = function (oldItems, newItems, getKey, scope) {
            getKey = getKey || JW.iidForcibly;
            scope = scope || oldItems;
            var indexArray = [];
            var newIndexMap = {};
            for (var i = 0, l = newItems.length; i < l; ++i) {
                newIndexMap[getKey.call(scope, newItems[i])] = i;
            }
            for (var i = 0, l = oldItems.length; i < l; ++i) {
                indexArray.push(newIndexMap[getKey.call(scope, oldItems[i])]);
            }
            if (!Array.isIdentity(indexArray)) {
                return indexArray;
            }
        };
        /**
         * Detects [[reorder]] method arguments to sort array contents by result of
         * **callback** call for each item.
         *
         * @param callback Indexer function. Must return a comparable value, compatible with
         * [[JW.cmp]]. Returns item itself by default.
         * @param scope **callback** call scope. Defaults to collection itself.
         * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
         * @returns **indexArray** argument of [[reorder]] method.
         * If no method call required, returns undefined.
         */
        Array.detectSort = function (arr, callback, scope, order) {
            var keys = Array.getSortingKeys(arr, callback, scope, order);
            if (!Array.isIdentity(keys)) {
                return Array.invert(keys);
            }
        };
        /**
         * Detects [[reorder]] method arguments to sort array contents by comparer.
         *
         * @param compare Comparer function. Should return positive value if t1 > t2;
         * negative value if t1 < t2; 0 if t1 == t2.
         * Defaults to [[JW.cmp]]
         * @param scope **comparer** call scope. Defaults to collection itself.
         * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
         * @returns **indexArray** argument of [[reorder]] method.
         * If no method call required, returns undefined.
         */
        Array.detectSortComparing = function (arr, compare, scope, order) {
            var keys = Array.getSortingKeysComparing(arr, compare, scope, order);
            if (!Array.isIdentity(keys)) {
                return Array.invert(keys);
            }
        };
        /**
         * Adjusts array contents to **newItems** using [[detectSplice]] and
         * [[splice]] methods.
         * All items must have unique **getKey** function result.
         * If items don't have unique key, probably [[detectFilter]] method may help,
         * because it doesn't require item uniquiness.
         *
         * @param newItems New array contents.
         * @param getKey Function which returns unique key of an item in this collection.
         * Defaults to [[getKey]].
         * If collection consists of instances of JW.Class, then you are in a good shape.
         * @param scope **getKey** call scope. Defaults to collection itself.
         */
        Array.performSplice = function (arr, newItems, getKey, scope) {
            var params = Array.detectSplice(arr, newItems, getKey, scope);
            if (params !== undefined) {
                Array.trySplice(arr, params.removeParamsList, params.addParamsList);
            }
        };
        /**
         * Adjusts array contents to **newItems** using [[detectFilter]] and
         * [[splice]] methods.
         * Only removes items.
         * Doesn't assume items insertion - try [[detectSplice]] if that's the case.
         * In advantage to [[detectSplice]], doesn't require item uniquiness.
         *
         * @param newItems New array contents.
         */
        Array.performFilter = function (arr, newItems) {
            var params = Array.detectFilter(arr, newItems);
            if (params !== undefined) {
                Array.trySplice(arr, params, []);
            }
        };
        /**
         * Adjusts array contents to **newItems** using [[detectReorder]] and
         * [[reorder]] methods.
         *
         * @param newItems New array contents.
         * @param getKey Function which returns unique key of an item in this collection.
         * Defaults to [[getKey]].
         * If collection consists of instances of JW.Class, then it's all right.
         * @param scope **getKey** call scope. Defaults to collection itself.
         */
        Array.performReorder = function (arr, newItems, getKey, scope) {
            var indexArray = Array.detectReorder(arr, newItems, getKey, scope);
            if (indexArray !== undefined) {
                Array.tryReorder(arr, indexArray);
            }
        };
        /**
         * Sorts array by result of **callback** function call for each item.
         *
         * @param callback Indexer function. Must return a comparable value, compatible with
         * [[JW.cmp]]. Returns item itself by default.
         * @param scope **callback** call scope. Defaults to collection itself.
         * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
         */
        Array.sort = function (arr, callback, scope, order) {
            var indexArray = Array.detectSort(arr, callback, scope, order);
            if (indexArray !== undefined) {
                Array.tryReorder(arr, indexArray);
            }
        };
        /**
         * Sorts array by comparer.
         *
         * @param compare Comparer function. Should return positive value if t1 > t2;
         * negative value if t1 < t2; 0 if t1 == t2.
         * Defaults to [[JW.cmp]]
         * @param scope **comparer** call scope. Defaults to collection itself.
         * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
         */
        Array.sortComparing = function (arr, compare, scope, order) {
            var indexArray = Array.detectSortComparing(arr, compare, scope, order);
            if (indexArray !== undefined) {
                Array.tryReorder(arr, indexArray);
            }
        };
        /**
         * Checks for equality (===) to another array, item by item.
         *
         * @param arr Another array.
         * @returns Arrays are equal.
         */
        Array.equal = function (x, y) {
            if (x === y) {
                return true;
            }
            if (x.length !== y.length) {
                return false;
            }
            for (var i = 0, l = x.length; i < l; ++i) {
                if (x[i] !== y[i]) {
                    return false;
                }
            }
            return true;
        };
        /**
         * Collapses multi-dimentional array.
         *
         * @param depth Dimentions to collapse.
         * @returns Collapsed array.
         */
        Array.collapse = function (arr, depth) {
            var result = [];
            for (var i = 0, l = arr.length; i < l; ++i) {
                if (!JW.isArray(arr[i])) {
                    result.push(arr[i]);
                    continue;
                }
                if (depth == null) {
                    Array.tryAddAll(result, Array.collapse(arr[i]));
                    continue;
                }
                if (depth) {
                    Array.tryAddAll(result, Array.collapse(arr[i], depth - 1));
                    continue;
                }
                result.push(arr[i]);
            }
            return result;
        };
        /**
         * Returns item index in this collection.
         *
         * @returns Item index. If item doesn't exist, returns -1.
         */
        Array.indexOf = function (arr, item) {
            if (_JW.A.prototype.indexOf !== undefined) {
                return arr.indexOf(item);
            }
            var key = Array.keyOf(arr, item);
            return (key !== undefined) ? key : -1;
        };
        /**
         * Checks all items against criteria in backward order.
         *
         * Returns true if criteria returns !== false for all collection items.
         *
         * Algorithms iterates items sequentially, and stops after first item not matching the criteria.
         *
         * @param callback Criteria callback.
         * @param scope **callback** call scope. Defaults to collection itself.
         */
        Array.backEvery = function (arr, callback, scope) {
            for (var i = arr.length - 1; i >= 0; --i) {
                if (callback.call(scope || arr, arr[i], i) === false) {
                    return false;
                }
            }
            return true;
        };
        /**
         * @hidden Use [[JW.cmp]] instead.
         */
        Array.cmp = function (x, y, caseInsensitive) {
            var n = Math.min(x.length, y.length);
            for (var i = 0; i < n; ++i) {
                var result = JW.cmp(x[i], y[i], caseInsensitive);
                if (result) {
                    return result;
                }
            }
            return JW.cmp(x.length, y.length);
        };
        /**
         * Creates a new array of length n containing all numbers from 0 to (n - 1) in random order.
         */
        Array.shuffle = function (n) {
            var result = new _JW.A(n);
            for (var i = 0; i < n; ++i) {
                result[i] = i;
            }
            for (var i = 0; i < n; ++i) {
                var j = i + Math.floor(Math.random() * (n - i));
                var t = result[i];
                result[i] = result[j];
                result[j] = t;
            }
            return result;
        };
        /**
         * Checks if every item in array is equal to its index: array[i] === i.
         */
        Array.isIdentity = function (array) {
            for (var i = 0, l = array.length; i < l; ++i) {
                if (array[i] !== i) {
                    return false;
                }
            }
            return true;
        };
        /**
         * Builds a new array by the rule: result[array[i]] === i.
         */
        Array.invert = function (array) {
            var l = array.length;
            var result = new _JW.A(l);
            for (var i = 0; i < l; ++i) {
                result[array[i]] = i;
            }
            return result;
        };
        /**
         * Builds array consisting of subarray items in the same order.
         * Current array is not modified.
         *
         * @returns Merged array.
         */
        Array.merge = function (arrays) {
            var result = [];
            for (var i = 0, l = arrays.length; i < l; ++i) {
                result.push.apply(result, arrays[i]);
            }
            return result;
        };
        /**
         * Builds array consisting of subarray items in the same order.
         * Current array is not modified.
         *
         * @returns Merged array.
         */
        Array.$merge = function (arrays) {
            return new Array(Array.merge(arrays), true);
        };
        /**
         * Computes sum of array item lengthes.
         */
        Array.countMerged = function (arrays) {
            var result = 0;
            for (var i = 0, l = arrays.length; i < l; ++i) {
                result += arrays[i].length;
            }
            return result;
        };
        /**
         * Reverses item order in array. Modifies the array itself.
         */
        Array.reverse = function (arr) {
            arr.reverse();
        };
        /**
         * Builds a new array containing items of this array in reversed order.
         * Current array is not modified.
         *
         * @returns Reversed array.
         */
        Array.toReversed = function (arr) {
            var result = arr.concat();
            result.reverse();
            return result;
        };
        /**
         * Builds a new array containing items of this array in reversed order.
         * Current array is not modified.
         *
         * @returns Reversed array.
         */
        Array.$toReversed = function (arr) {
            return new Array(Array.toReversed(arr), true);
        };
        /**
         * Removes last array item. Does nothing if array is empty.
         *
         * @returns The removed item or undefined.
         */
        Array.pop = function (arr) {
            return arr.pop();
        };
        /**
         * Determines index of first item which is more (or less if **order** < 0) than specified value by **compare** function,
         * using binary search. Array must be sorted by **compare** function.
         * Can be used for item insertion easily.
         * If you want to use this method for item removal, you must look at previous item and compare it to **value** first.
         *
         * @param compare Comparer function. Should return positive value if t1 > t2;
         * negative value if t1 < t2; 0 if t1 == t2.
         * Defaults to [[JW.cmp]]
         * @param scope **comparer** call scope. Defaults to collection itself.
         * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
         * @returns Item index.
         */
        Array.binarySearch = function (arr, value, compare, scope, order) {
            compare = compare || function (x, y) { return (x < y) ? -1 : (x > y) ? 1 : 0; };
            scope = scope || arr;
            order = order || 1;
            var length = arr.length;
            var len2 = length >> 1;
            var step = 1;
            while (step <= len2) {
                step <<= 1;
            }
            var index = 0;
            while (step) {
                if ((index + step <= length) && (order * compare.call(scope, value, arr[index + step - 1]) >= 0)) {
                    index += step;
                }
                step >>= 1;
            }
            return index;
        };
        return Array;
    })(JW.AbstractArray);
    JW.Array = Array;
})(JW || (JW = {}));
;
/// <reference path="../jwlib.ref.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JW;
(function (JW) {
    /**
     * Simple implementation of [[JW.AbstractMap]].
     *
     * @param T Collection item type.
     */
    var Map = (function (_super) {
        __extends(Map, _super);
        /**
         * @inheritdoc
         */
        function Map(items, adapter) {
            _super.call(this, items, adapter);
        }
        /**
         * @inheritdoc
         */
        Map.prototype.ownItems = function () {
            _super.prototype.ownItems.call(this);
            return this;
        };
        /**
         * @inheritdoc
         */
        Map.prototype.createEmpty = function () {
            return new Map();
        };
        /**
         * @inheritdoc
         */
        Map.prototype.createEmptyArray = function () {
            return new JW.Array();
        };
        /**
         * @inheritdoc
         */
        Map.prototype.createEmptyMap = function () {
            return new Map();
        };
        /**
         * @inheritdoc
         */
        Map.prototype.createEmptySet = function () {
            return new JW.Set();
        };
        /**
         * Returns first item in collection. If collection is empty, returns undefined.
         */
        Map.getFirst = function (map) {
            return map[Map.getFirstKey(map)];
        };
        /**
         * Returns key of first collection item. If collection is empty, returns undefined.
         */
        Map.getFirstKey = function (map) {
            for (var key in map) {
                return key;
            }
        };
        /**
         * Returns count of items in collection.
         */
        Map.getLength = function (map) {
            var length = 0;
            for (var key in map) {
                ++length;
            }
            return length;
        };
        /**
         * Checks collection for emptiness.
         */
        Map.isEmpty = function (map) {
            for (var key in map) {
                return false;
            }
            return true;
        };
        /**
         * Returns item by key. If item with such key doesn't exist, returns undefined.
         */
        Map.get = function (map, key) {
            return map[key];
        };
        /**
         * Returns array of keys of all collection items.
         */
        Map.getKeys = function (map) {
            var keys = new _JW.A();
            for (var key in map) {
                keys.push(key);
            }
            return keys;
        };
        /**
         * Returns array of keys of all collection items.
         */
        Map.$getKeys = function (map) {
            return new JW.Array(Map.getKeys(map), true);
        };
        /**
         * Checks existance of item with specified key in collection.
         */
        Map.containsKey = function (map, key) {
            return map[key] !== undefined;
        };
        /**
         * Checks item for existance in collection.
         */
        Map.containsItem = function (map, item) {
            return !Map.every(map, function (v) {
                return item !== v;
            });
        };
        /**
         * Returns key of item in collection. If such item doesn't exist, returns undefined.
         */
        Map.keyOf = function (map, item) {
            return Map.find(map, function (v) {
                return item === v;
            });
        };
        /**
         * Matches all items against criteria.
         *
         * Returns true if callback returns !== false for all collection items.
         *
         * Algorithms iterates items sequentially, and stops after first item not matching the criteria.
         *
         * @param callback Criteria callback.
         * @param scope **callback** call scope. Defaults to collection itself.
         */
        Map.every = function (map, callback, scope) {
            scope = scope || map;
            for (var key in map) {
                if (callback.call(scope, map[key], key) === false) {
                    return false;
                }
            }
            return true;
        };
        /**
         * Matches each item against criteria.
         *
         * Returns true if callback returns !== false for some collection item.
         *
         * Algorithms iterates items sequentially, and stops after first item matching the criteria.
         *
         * @param callback Criteria callback.
         * @param scope **callback** call scope. Defaults to collection itself.
         */
        Map.some = function (map, callback, scope) {
            return !Map.every(map, function (item, key) {
                return callback.call(this, item, key) === false;
            }, scope);
        };
        /**
         * Iterates collection items. Calls specified function for all items.
         *
         * @param callback Callback function.
         * @param scope **callback** call scope. Defaults to collection itself.
         */
        Map.each = function (map, callback, scope) {
            Map.every(map, function (item, key) {
                callback.call(this, item, key);
                return true;
            }, scope);
        };
        /**
         * Finds item matching criteria.
         *
         * Returns key of first item for which callback returns !== false.
         *
         * Algorithms iterates items sequentially, and stops after first item matching the criteria.
         *
         * @param callback Criteria callback.
         * @param scope **callback** call scope. Defaults to collection itself.
         * @returns Found item key or undefined.
         */
        Map.find = function (map, callback, scope) {
            var result;
            Map.every(map, function (item, key) {
                if (callback.call(this, item, key) !== false) {
                    result = key;
                    return false;
                }
                return true;
            }, scope);
            return result;
        };
        /**
         * Finds item matching criteria.
         *
         * Returns first item for which callback returns !== false.
         *
         * Algorithms iterates items sequentially, and stops after first item matching the criteria.
         *
         * @param callback Criteria callback.
         * @param scope **callback** call scope. Defaults to collection itself.
         * @returns Found item or undefined.
         */
        Map.search = function (map, callback, scope) {
            var result;
            Map.every(map, function (item, key) {
                if (callback.call(this, item, key) !== false) {
                    result = item;
                    return false;
                }
                return true;
            }, scope);
            return result;
        };
        /**
         * Filters collection by criteria.
         *
         * Builds new collection of the same type, consisting of items for which callback returns !== false.
         *
         * @param callback Criteria callback.
         * @param scope **callback** call scope. Defaults to collection itself.
         * @returns Filtered collection.
         */
        Map.filter = function (map, callback, scope) {
            var result = {};
            Map.every(map, function (item, key) {
                if (callback.call(this, item, key) !== false) {
                    result[key] = item;
                }
                return true;
            }, scope);
            return result;
        };
        /**
         * Filters collection by criteria.
         *
         * Builds new collection of the same type, consisting of items for which callback returns !== false.
         *
         * @param callback Criteria callback.
         * @param scope **callback** call scope. Defaults to collection itself.
         * @returns Filtered collection.
         */
        Map.$filter = function (map, callback, scope) {
            return new Map(Map.filter(map, callback, scope), true);
        };
        /**
         * Counts the items matching criteria.
         *
         * Returns the number of items for which callback returns !== false.
         *
         * @param callback Criteria callback.
         * @param scope **callback** call scope. Defaults to collection itself.
         * @returns Number of items.
         */
        Map.count = function (map, callback, scope) {
            var result = 0;
            Map.every(map, function (item, key) {
                if (callback.call(this, item, key) !== false) {
                    ++result;
                }
                return true;
            }, scope);
            return result;
        };
        /**
         * Counts the items matching criteria.
         *
         * Returns the number of items for which callback returns !== false.
         *
         * @param callback Criteria callback.
         * @param scope **callback** call scope. Defaults to collection itself.
         * @returns Number of items.
         */
        Map.$count = function (map, callback, scope) {
            return new JW.Property(Map.count(map, callback, scope));
        };
        /**
         * Maps collection items.
         *
         * Builds new collection of the same type, containing results of callback call for each collection item.
         *
         * @param callback Mapping function.
         * @param scope **callback** call scope. Defaults to collection itself.
         * @returns Mapped collection.
         */
        Map.map = function (map, callback, scope) {
            var result = {};
            Map.every(map, function (item, key) {
                result[key] = callback.call(this, item, key);
                return true;
            }, scope);
            return result;
        };
        /**
         * Maps collection items.
         *
         * Builds new collection of the same type, containing results of callback call for each collection item.
         *
         * @param callback Mapping function.
         * @param scope **callback** call scope. Defaults to collection itself.
         * @returns Mapped collection.
         */
        Map.$map = function (map, callback, scope) {
            return new Map(Map.map(map, callback, scope), true);
        };
        /**
         * Returns keys of sorted items.
         *
         * Builds array of item keys, sorted by result of callback call for each item.
         *
         * @param callback Indexer function. Must return a comparable value, compatible with
         * [[JW.cmp]]. Returns item itself by default.
         * @param scope **callback** call scope. Defaults to collection itself.
         * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
         * @returns Sorted item keys array.
         */
        Map.getSortingKeys = function (map, callback, scope, order) {
            callback = callback || function (x) { return x; };
            order = order || 1;
            var pairs = [];
            Map.every(map, function (item, key) {
                pairs.push([key, callback.call(this, item, key)]);
                return true;
            }, scope);
            pairs.sort(function (x, y) {
                return order * JW.cmp(x[1], y[1]);
            });
            return JW.Array.map(pairs, function (pair) {
                return pair[0];
            });
        };
        /**
         * Returns keys of sorted items.
         *
         * Builds array of item keys, sorted by result of callback call for each item.
         *
         * @param callback Indexer function. Must return a comparable value, compatible with
         * [[JW.cmp]]. Returns item itself by default.
         * @param scope **callback** call scope. Defaults to collection itself.
         * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
         * @returns Sorted item keys array.
         */
        Map.$getSortingKeys = function (map, callback, scope, order) {
            return new JW.Array(Map.getSortingKeys(map, callback, scope, order), true);
        };
        /**
         * Returns keys of sorted items.
         *
         * Builds array of item keys, sorted by comparer.
         *
         * @param compare Comparer function. Should return positive value if t1 > t2;
         * negative value if t1 < t2; 0 if t1 == t2.
         * Defaults to [[JW.cmp]]
         * @param scope **comparer** call scope. Defaults to collection itself.
         * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
         * @returns Sorted item keys array.
         */
        Map.getSortingKeysComparing = function (map, compare, scope, order) {
            compare = compare || JW.cmpCaseSensitive;
            order = order || 1;
            var pairs = [];
            Map.every(map, function (item, key) {
                pairs.push([key, item]);
                return true;
            }, scope);
            pairs.sort(function (x, y) {
                return order * compare.call(scope, x[1], y[1], x[0], y[0]);
            });
            return JW.Array.map(pairs, function (pair) {
                return pair[0];
            });
        };
        /**
         * Returns keys of sorted items.
         *
         * Builds array of item keys, sorted by comparer.
         *
         * @param compare Comparer function. Should return positive value if t1 > t2;
         * negative value if t1 < t2; 0 if t1 == t2.
         * Defaults to [[JW.cmp]]
         * @param scope **comparer** call scope. Defaults to collection itself.
         * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
         * @returns Sorted item keys array.
         */
        Map.$getSortingKeysComparing = function (map, compare, scope, order) {
            return new JW.Array(Map.getSortingKeysComparing(map, compare, scope, order), true);
        };
        /**
         * Converts collection to sorted array.
         *
         * Builds array consisting of collection items sorted by result of callback call for each item.
         *
         * @param callback Indexer function. Must return a comparable value, compatible with
         * [[JW.cmp]]. Returns item itself by default.
         * @param scope **callback** call scope. Defaults to collection itself.
         * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
         * @returns Sorted array.
         */
        Map.toSorted = function (map, callback, scope, order) {
            return JW.Array.map(Map.getSortingKeys(map, callback, scope, order), function (key) {
                return map[key];
            });
        };
        /**
         * Converts collection to sorted array.
         *
         * Builds array consisting of collection items sorted by result of callback call for each item.
         *
         * @param callback Indexer function. Must return a comparable value, compatible with
         * [[JW.cmp]]. Returns item itself by default.
         * @param scope **callback** call scope. Defaults to collection itself.
         * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
         * @returns Sorted array.
         */
        Map.$toSorted = function (map, callback, scope, order) {
            return new JW.Array(Map.toSorted(map, callback, scope, order), true);
        };
        /**
         * Converts collection to sorted array.
         *
         * Builds array consisting of collection items sorted by comparer.
         *
         * @param compare Comparer function. Should return positive value if t1 > t2;
         * negative value if t1 < t2; 0 if t1 == t2.
         * Defaults to [[JW.cmp]]
         * @param scope **comparer** call scope. Defaults to collection itself.
         * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
         * @returns Sorted array.
         */
        Map.toSortedComparing = function (map, compare, scope, order) {
            return JW.Array.map(Map.getSortingKeysComparing(map, compare, scope, order), function (key) {
                return map[key];
            });
        };
        /**
         * Converts collection to sorted array.
         *
         * Builds array consisting of collection items sorted by comparer.
         *
         * @param compare Comparer function. Should return positive value if t1 > t2;
         * negative value if t1 < t2; 0 if t1 == t2.
         * Defaults to [[JW.cmp]]
         * @param scope **comparer** call scope. Defaults to collection itself.
         * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
         * @returns Sorted array.
         */
        Map.$toSortedComparing = function (map, compare, scope, order) {
            return new JW.Array(Map.toSortedComparing(map, compare, scope, order), true);
        };
        /**
         * Indexes collection.
         *
         * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
         *
         * @param callback Indexer function.
         * @param scope **callback** call scope. Defaults to collection itself.
         * @returns Collection index.
         */
        Map.index = function (map, callback, scope) {
            var result = {};
            Map.every(map, function (item, oldKey) {
                var key = callback.call(this, item, oldKey);
                if (key != null) {
                    result[key] = item;
                }
                return true;
            }, scope);
            return result;
        };
        /**
         * Indexes collection.
         *
         * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
         *
         * @param callback Indexer function.
         * @param scope **callback** call scope. Defaults to collection itself.
         * @returns Collection index.
         */
        Map.$index = function (map, callback, scope) {
            return new Map(Map.index(map, callback, scope), true);
        };
        /**
         * Converts collection to array.
         *
         * Builds new array consisting of collection items.
         */
        Map.toArray = function (map) {
            var result = [];
            Map.every(map, function (item) {
                result.push(item);
                return true;
            });
            return result;
        };
        /**
         * Converts collection to array.
         *
         * Builds new array consisting of collection items.
         */
        Map.$toArray = function (map) {
            return new JW.Array(Map.toArray(map));
        };
        /**
         * Converts collection to map.
         *
         * Builds new map consisting of collection items.
         */
        Map.toMap = function (map) {
            return JW.apply({}, map);
        };
        /**
         * Converts collection to map.
         *
         * Builds new map consisting of collection items.
         */
        Map.$toMap = function (map) {
            return new Map(Map.toMap(map), true);
        };
        /**
         * Converts collection to set.
         *
         * Builds new set consisting of collection items.
         * Requires T to extend JW.Class.
         */
        Map.toSet = function (map) {
            return Map.index(map, JW.iidForcibly);
        };
        /**
         * Converts collection to set.
         *
         * Builds new set consisting of collection items.
         * Requires T to extend JW.Class.
         */
        Map.$toSet = function (map) {
            return new JW.Set(Map.toSet(map), true);
        };
        /**
         * Represents collection as array.
         *
         * If this collection is array, returns it immediately.
         * Else, executes [[toArray]] method.
         * This method works usually faster than [[toArray]],
         * but please make sure that the returned array
         * won't be modified externally, because it can cause strange unexpected bugs.
         */
        Map.asArray = function (map) {
            return Map.toArray(map);
        };
        /**
         * Represents collection as array.
         *
         * If this collection is array, returns it immediately.
         * Else, executes [[toArray]] method.
         * This method works usually faster than [[toArray]],
         * but please make sure that the returned array
         * won't be modified externally, because it can cause strange unexpected bugs.
         */
        Map.$asArray = function (map) {
            return Map.$toArray(map);
        };
        /**
         * Represents collection as map.
         *
         * If this collection is map, returns it immediately. Else, executes [[toMap]] method.
         * This method works usually faster than [[toMap]], but please make sure that the returned map
         * won't be modified externally, because it can cause strange unexpected bugs.
         */
        Map.asMap = function (map) {
            return map;
        };
        /**
         * Represents collection as map.
         *
         * If this collection is map, returns it immediately. Else, executes [[toMap]] method.
         * This method works usually faster than [[toMap]], but please make sure that the returned map
         * won't be modified externally, because it can cause strange unexpected bugs.
         */
        Map.$asMap = function (map) {
            return new Map(map, true);
        };
        /**
         * Represents collection as set.
         *
         * If this collection is set, returns it immediately.
         * Else, executes [[toSet]] method.
         * This method works usually faster than [[toSet]],
         * but please make sure that the returned set
         * won't be modified externally, because it can cause strange unexpected bugs.
         * Requires T to extend JW.Class.
         */
        Map.asSet = function (map) {
            return Map.toSet(map);
        };
        /**
         * Represents collection as set.
         *
         * If this collection is set, returns it immediately.
         * Else, executes [[toSet]] method.
         * This method works usually faster than [[toSet]],
         * but please make sure that the returned set
         * won't be modified externally, because it can cause strange unexpected bugs.
         * Requires T to extend JW.Class.
         */
        Map.$asSet = function (map) {
            return Map.$toSet(map);
        };
        /**
         * Replaces item with specified key. If map doesn't contain such key, new item is added.
         * @returns The replaced item.
         */
        Map.set = function (map, item, key) {
            var result = Map.trySet(map, item, key);
            return (result !== undefined) ? result.value : map[key];
        };
        /**
         * Replaces item with specified key. If map doesn't contain such key, new item is added.
         * @returns Proxy of the replaced item. If collection is not modified, returns undefined.
         */
        Map.trySet = function (map, item, key) {
            var oldItem = map[key];
            if (oldItem === item) {
                return;
            }
            map[key] = item;
            return { value: oldItem };
        };
        /**
         * Adds or replaces a bunch of items.
         */
        Map.setAll = function (map, items) {
            for (var key in items) {
                map[key] = items[key];
            }
        };
        /**
         * Low-performance alternative to [[setAll]] with verbose result set.
         * @returns Result of internal [[splice]] method call.
         */
        Map.setAllVerbose = function (map, items) {
            var spliceResult = Map.trySetAll(map, items);
            return (spliceResult !== undefined) ? spliceResult : { removedItems: {}, addedItems: {} };
        };
        /**
         * Adds or replaces a bunch of items.
         * @returns Result of internal [[splice]] method call.
         * If collection is not modified, returns undefined.
         */
        Map.trySetAll = function (map, items) {
            var removedItems = {};
            var addedItems = {};
            for (var key in items) {
                var item = items[key];
                var oldItem = Map.trySet(map, item, key);
                if (oldItem === undefined) {
                    continue;
                }
                var removedItem = oldItem.value;
                if (removedItem !== undefined) {
                    removedItems[key] = removedItem;
                }
                addedItems[key] = item;
            }
            if (!Map.isEmpty(removedItems) || !Map.isEmpty(addedItems)) {
                return { removedItems: removedItems, addedItems: addedItems };
            }
        };
        /**
         * Changes item key in map. If collection doesn't contain oldKey or contains newKey, it causes an error.
         * @returns The moved item.
         */
        Map.setKey = function (map, oldKey, newKey) {
            var item = Map.trySetKey(map, oldKey, newKey);
            return (item !== undefined) ? item : map[newKey];
        };
        /**
         * Changes item key in map. If collection doesn't contain oldKey or contains newKey, it causes an error.
         * @returns The moved item.
         * If collection is not modified, returns undefined.
         */
        Map.trySetKey = function (map, oldKey, newKey) {
            if (oldKey === newKey) {
                return;
            }
            var item = map[oldKey];
            delete map[oldKey];
            map[newKey] = item;
            return item;
        };
        /**
         * Removes an item from the map.
         * @returns Old item key in the map.
         */
        Map.removeItem = function (map, item) {
            var key = Map.keyOf(map, item);
            if (key !== undefined) {
                Map.tryRemove(map, key);
            }
            return key;
        };
        /**
         * Removes item with specified key if it exists in map.
         * @returns Old collection item.
         */
        Map.remove = function (map, key) {
            return Map.tryRemove(map, key);
        };
        /**
         * Removes item with specified key if it exists in map.
         * @returns Old collection item.
         * If collection is not modified, returns undefined.
         */
        Map.tryRemove = function (map, key) {
            var item = map[key];
            if (item !== undefined) {
                delete map[key];
            }
            return item;
        };
        /**
         * Removes a bunch of items from map.
         */
        Map.removeAll = function (map, keys) {
            for (var i = 0, l = keys.length; i < l; ++i) {
                var key = keys[i];
                delete map[key];
            }
        };
        /**
         * Low-performance alternative to [[removeAll]] with verbose result set.
         * @returns The removed items.
         */
        Map.removeAllVerbose = function (map, keys) {
            var items = Map.tryRemoveAll(map, keys);
            return (items !== undefined) ? items : {};
        };
        /**
         * Low-performance alternative to [[removeAll]] with verbose result set.
         * @returns The removed items.
         */
        Map.$removeAllVerbose = function (map, keys) {
            return new Map(Map.removeAllVerbose(map, keys));
        };
        /**
         * Removes a bunch of items from map.
         * @returns The removed items.
         * If collection is not modified, returns undefined.
         */
        Map.tryRemoveAll = function (map, keys) {
            var items = {};
            for (var i = 0, l = keys.length; i < l; ++i) {
                var key = keys[i];
                var item = Map.tryRemove(map, key);
                if (item !== undefined) {
                    items[key] = item;
                }
            }
            if (!Map.isEmpty(items)) {
                return items;
            }
        };
        /**
         * Removes all occurrences of items in collection.
         * **Known issue:** *Works only if T extends JW.Class!*
         */
        Map.removeItems = function (map, items) {
            var itemSet = new JW.Set(items);
            var newItems = Map.filter(map, function (item) {
                return !itemSet.contains(item);
            });
            Map.performSplice(map, newItems);
        };
        /**
         * Clears collection.
         * @returns Old collection contents. Never returns null or undefined.
         */
        Map.clear = function (map) {
            var result = Map.tryClear(map);
            return (result !== undefined) ? result : {};
        };
        /**
         * Clears collection.
         * @returns Old collection contents. Never returns null or undefined.
         */
        Map.$clear = function (map) {
            return new Map(Map.clear(map), true);
        };
        /**
         * Clears collection.
         * @returns Old collection contents. If not modified - undefined.
         */
        Map.tryClear = function (map) {
            if (Map.isEmpty(map)) {
                return;
            }
            var items = JW.apply({}, map);
            for (var key in items) {
                delete map[key];
            }
            return items;
        };
        /**
         * Removes and adds bunches of items in map. Universal optimized granular operation of removal/insertion.
         * @param removedKeys Keys of items to remove.
         * @param updatedItems Items to add/replace.
         * @returns Splice result. Never returns null or undefined.
         */
        Map.splice = function (map, removedKeys, updatedItems) {
            var spliceResult = Map.trySplice(map, removedKeys, updatedItems);
            return (spliceResult !== undefined) ? spliceResult : { removedItems: {}, addedItems: {} };
        };
        /**
         * Removes and adds bunches of items in map. Universal optimized granular operation of removal/insertion.
         * @param removedKeys Keys of items to remove.
         * @param updatedItems Items to add/replace.
         * @returns Splice result.
         * If collection is not modified, returns undefined.
         */
        Map.trySplice = function (map, removedKeys, updatedItems) {
            removedKeys = JW.Array.filter(removedKeys, function (key) {
                return !updatedItems.hasOwnProperty(key);
            });
            var removedItems = Map.tryRemoveAll(map, removedKeys);
            var spliceResult = Map.trySetAll(map, updatedItems);
            if (spliceResult !== undefined) {
                JW.apply(spliceResult.removedItems, removedItems);
                return spliceResult;
            }
            if (removedItems !== undefined) {
                return { removedItems: removedItems, addedItems: {} };
            }
        };
        /**
         * Changes item keys in map.
         * @param keyMap Key map. Item with key x will gain key keyMap[x].
         * It is neccessary to pass only changed keys, but unchanged keys or unexisting keys are acceptable as well.
         * @returns Map of changed keys. Never returns null or undefined.
         */
        Map.reindex = function (map, keyMap) {
            var result = Map.tryReindex(map, keyMap);
            return (result !== undefined) ? result : {};
        };
        /**
         * Changes item keys in map.
         * @param keyMap Key map. Item with key x will gain key keyMap[x].
         * It is neccessary to pass only changed keys, but unchanged keys or unexisting keys are acceptable as well.
         * @returns Map of changed keys.
         * If collection is not modified, returns undefined.
         */
        Map.tryReindex = function (map, keyMap) {
            var sanitizedKeyMap = {};
            for (var oldKey in keyMap) {
                var newKey = keyMap[oldKey];
                if ((newKey === undefined) || (newKey === oldKey) || (map[oldKey] === undefined)) {
                    continue;
                }
                sanitizedKeyMap[oldKey] = newKey;
            }
            var backKeyMap = Map.getInverted(sanitizedKeyMap);
            var removedKeys = [];
            var updatedItems = {};
            for (var oldKey in sanitizedKeyMap) {
                var newKey = sanitizedKeyMap[oldKey];
                // JW.assertUndefined(updatedItems[newKey]);
                sanitizedKeyMap[oldKey] = newKey;
                updatedItems[newKey] = map[oldKey];
                if (backKeyMap[oldKey] === undefined) {
                    removedKeys.push(oldKey);
                }
            }
            if (Map.isEmpty(sanitizedKeyMap)) {
                return;
            }
            for (var i = 0, l = removedKeys.length; i < l; ++i) {
                delete map[removedKeys[i]];
            }
            JW.apply(map, updatedItems);
            return sanitizedKeyMap;
        };
        /**
         * Detects [[splice]] method arguments to adjust map contents to **newItems**.
         * Determines which item bunches should be removed and which ones should be inserted/replaced, and their keys.
         * @param newItems New map contents.
         * @returns [[splice]] method arguments. If no method call required, returns undefined.
         */
        Map.detectSplice = function (oldItems, newItems) {
            var removedKeys = [];
            var updatedItems = {};
            for (var key in oldItems) {
                if (!newItems.hasOwnProperty(key)) {
                    removedKeys.push(key);
                }
            }
            for (var key in newItems) {
                var item = newItems[key];
                if (item !== oldItems[key]) {
                    updatedItems[key] = item;
                }
            }
            if ((removedKeys.length !== 0) || !Map.isEmpty(updatedItems)) {
                return { removedKeys: removedKeys, updatedItems: updatedItems };
            }
        };
        /**
         * Detects [[reindex]] method arguments to adjust map contents to **newItems**.
         * Determines which keys should be assigned to all items.
         * If **newItems** contents differ from current map contents, the map will be broken.
         * @param newItems New map contents.
         * @param getKey Function which returns unique key of an item in this collection.
         * Defaults to [[getKey]].
         * If collection consists of instances of JW.Class, then you are in a good shape.
         * @param scope **getKey** call scope. Defaults to collection itself.
         * @returns **keyMap** argument of [[reindex]] method.
         * If no method call required, returns undefined.
         */
        Map.detectReindex = function (oldItems, newItems, getKey, scope) {
            getKey = getKey || JW.iidForcibly;
            scope = scope || oldItems;
            var newItemKeys = {};
            for (var key in newItems) {
                newItemKeys[getKey.call(scope, newItems[key])] = key;
            }
            var keyMap = {};
            for (var oldKey in oldItems) {
                var newKey = newItemKeys[getKey.call(scope, oldItems[oldKey])];
                if (oldKey !== newKey) {
                    keyMap[oldKey] = newKey;
                }
            }
            if (!Map.isEmpty(keyMap)) {
                return keyMap;
            }
        };
        /**
         * Adjusts map contents to **newItems** using [[detectSplice]] and
         * [[splice]] methods.
         * @param newItems New map contents.
         */
        Map.performSplice = function (map, newItems) {
            var params = Map.detectSplice(map, newItems);
            if (params !== undefined) {
                Map.trySplice(map, params.removedKeys, params.updatedItems);
            }
        };
        /**
         * Adjusts map contents to **newItems** using [[detectReindex]] and
         * [[reindex]] methods.
         * @param newItems New map contents.
         * @param getKey Function which returns unique key of an item in this collection.
         * Defaults to [[getKey]].
         * If collection consists of instances of JW.Class, then you are in a good shape.
         * @param scope **getKey** call scope. Defaults to collection itself.
         */
        Map.performReindex = function (map, newItems, getKey, scope) {
            var keyMap = Map.detectReindex(map, newItems, getKey, scope);
            if (keyMap !== undefined) {
                Map.tryReindex(map, keyMap);
            }
        };
        /**
         * Checks for equality (===) to another map, item by item.
         */
        Map.equal = function (x, y) {
            if (x === y) {
                return true;
            }
            var length = Map.getLength(y);
            for (var key in x) {
                if ((--length < 0) || (x[key] !== y[key])) {
                    return false;
                }
            }
            return length === 0;
        };
        /**
         * Creates a new map containing a single item.
         */
        Map.single = function (key, item) {
            var result = {};
            result[key] = item;
            return result;
        };
        /**
         * Given all removed and added items during map splice, returns keys which
         * were effectively removed, not replaced by other items.
         */
        Map.getRemovedKeys = function (removedItems, addedItems) {
            var removedKeys = [];
            for (var key in removedItems) {
                if (!addedItems.hasOwnProperty(key)) {
                    removedKeys.push(key);
                }
            }
            return removedKeys;
        };
        /**
         * Creates a new map by rule: result[map[key]] === key.
         */
        Map.getInverted = function (map) {
            // JW.assertMap(map, JW.assertString);
            var result = {};
            for (var key in map) {
                // JW.assertUndefined(result[map[key]]);
                result[map[key]] = key;
            }
            return result;
        };
        return Map;
    })(JW.AbstractMap);
    JW.Map = Map;
})(JW || (JW = {}));
;
/// <reference path="../jwlib.ref.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JW;
(function (JW) {
    /**
     * Observable implementation of [[JW.AbstractArray]].
     *
     * @param T Collection item type.
     */
    var ObservableArray = (function (_super) {
        __extends(ObservableArray, _super);
        /**
         * @inheritdoc
         */
        function ObservableArray(items, adapter) {
            _super.call(this, items, adapter);
            /**
             * Items are removed from array and items are added to array. Triggered in result
             * of calling:
             *
             * * [[add]]
             * * [[tryAdd]]
             * * [[addAll]]
             * * [[tryAddAll]]
             * * [[remove]]
             * * [[tryRemove]]
             * * [[removeItem]]
             * * [[pop]]
             * * [[removeAll]]
             * * [[tryRemoveAll]]
             * * [[removeItems]]
             * * [[splice]]
             * * [[trySplice]]
             * * [[performSplice]]
             */
            this.spliceEvent = new JW.Event();
            /**
             * Item is replaced in array. Triggered in result of calling:
             *
             * * [[set]]
             * * [[trySet]]
             */
            this.replaceEvent = new JW.Event();
            /**
             * Item is moved in array. Triggered in result of calling:
             *
             * * [[move]]
             * * [[tryMove]]
             */
            this.moveEvent = new JW.Event();
            /**
             * Array is cleared. Triggered in result of calling:
             * * [[clear]]
             * * [[$clear]]
             * * [[tryClear]]
             */
            this.clearEvent = new JW.Event();
            /**
             * Items are reordered in array. Triggered in result of calling:
             *
             * * [[reorder]]
             * * [[tryReorder]]
             * * [[performReorder]]
             * * [[sort]]
             * * [[sortComparing]]
             */
            this.reorderEvent = new JW.Event();
            /**
             * Array is changed. Triggered right after one of events:
             *
             * * [[spliceEvent]]
             * * [[replaceEvent]]
             * * [[moveEvent]]
             * * [[clearEvent]]
             * * [[reorderEvent]]
             */
            this.changeEvent = new JW.Event();
            this.length = new JW.Property(this.getLength());
        }
        /**
         * @inheritdoc
         */
        ObservableArray.prototype.ownItems = function () {
            _super.prototype.ownItems.call(this);
            return this;
        };
        /**
         * @inheritdoc
         */
        ObservableArray.prototype.destroyObject = function () {
            this.changeEvent.destroy();
            this.reorderEvent.destroy();
            this.clearEvent.destroy();
            this.moveEvent.destroy();
            this.replaceEvent.destroy();
            this.spliceEvent.destroy();
            this.length.destroy();
            _super.prototype.destroyObject.call(this);
        };
        /**
         * @inheritdoc
         */
        ObservableArray.prototype.trySet = function (item, index) {
            var oldItem = JW.Array.trySet(this.items, item, index);
            if (oldItem === undefined) {
                return;
            }
            this.replaceEvent.trigger({ sender: this, index: index, oldItem: oldItem.value, newItem: item });
            this.changeEvent.trigger({ sender: this });
            if (this._ownsItems) {
                oldItem.value.destroy();
            }
            return oldItem;
        };
        /**
         * @inheritdoc
         */
        ObservableArray.prototype.tryMove = function (fromIndex, toIndex) {
            var item = _super.prototype.tryMove.call(this, fromIndex, toIndex);
            if (item === undefined) {
                return;
            }
            this.moveEvent.trigger({ sender: this, fromIndex: fromIndex, toIndex: toIndex, item: item });
            this.changeEvent.trigger({ sender: this });
            return item;
        };
        /**
         * @inheritdoc
         */
        ObservableArray.prototype.tryClear = function () {
            var oldItems = JW.Array.tryClear(this.items);
            if (oldItems === undefined) {
                return;
            }
            this.length.set(0);
            this.clearEvent.trigger({ sender: this, items: oldItems });
            this.changeEvent.trigger({ sender: this });
            if (this._ownsItems) {
                JW.Array.backEvery(oldItems, JW.destroyForcibly);
            }
            return oldItems;
        };
        /**
         * @inheritdoc
         */
        ObservableArray.prototype.trySplice = function (removeParamsList, addParamsList) {
            var result = JW.Array.trySplice(this.items, removeParamsList, addParamsList);
            if (result === undefined) {
                return;
            }
            this.length.set(this.getLength());
            this.spliceEvent.trigger({ sender: this, spliceResult: result });
            this.changeEvent.trigger({ sender: this });
            if (this._ownsItems) {
                JW.Array.backEvery(result.getRemovedItems(), JW.destroyForcibly);
            }
            return result;
        };
        /**
         * @inheritdoc
         */
        ObservableArray.prototype.tryReorder = function (indexArray) {
            var items = _super.prototype.tryReorder.call(this, indexArray);
            if (items === undefined) {
                return;
            }
            this.reorderEvent.trigger({ sender: this, indexArray: indexArray, items: items });
            this.changeEvent.trigger({ sender: this });
            return items;
        };
        /**
         * @inheritdoc
         */
        ObservableArray.prototype.reverse = function () {
            var length = this.getLength();
            var indices = new _JW.A(length);
            for (var i = 0; i < length; ++i) {
                indices[i] = length - i - 1;
            }
            this.reorder(indices);
        };
        /**
         * @inheritdoc
         */
        ObservableArray.prototype.$$toSortedComparing = function (compare, scope, order) {
            var result = new ObservableArray();
            result.own(this.createSorterComparing({
                target: result,
                compare: compare,
                scope: scope || this,
                order: order
            }));
            return result;
        };
        /**
         * @inheritdoc
         */
        ObservableArray.prototype.$$index = function (callback, scope) {
            var result = new JW.ObservableMap();
            result.own(this.createIndexer({
                target: result,
                getKey: callback,
                scope: scope || this
            }));
            return result;
        };
        /**
         * @inheritdoc
         */
        ObservableArray.prototype.$$toArray = function () {
            var result = new ObservableArray();
            result.own(this.createOrderer({
                target: result
            }));
            return result;
        };
        /**
         * @inheritdoc
         */
        ObservableArray.prototype.$$toSet = function () {
            var result = new JW.ObservableSet();
            result.own(this.createLister({
                target: result
            }));
            return result;
        };
        /**
         * @inheritdoc
         */
        ObservableArray.prototype.$$filter = function (callback, scope) {
            var result = new ObservableArray();
            result.own(this.createFilterer({
                target: result,
                filterItem: callback,
                scope: scope || this
            }));
            return result;
        };
        /**
         * @inheritdoc
         */
        ObservableArray.prototype.$$count = function (callback, scope) {
            var result = new JW.Property(0);
            result.own(this.createCounter({
                target: result,
                filterItem: callback,
                scope: scope || this
            }));
            return result;
        };
        /**
         * @inheritdoc
         */
        ObservableArray.prototype.$$mapValues = function (callback, scope) {
            var result = new ObservableArray();
            result.own(this.createMapper({
                target: result,
                createItem: callback,
                scope: scope || this
            }));
            return result;
        };
        /**
         * @inheritdoc
         */
        ObservableArray.prototype.$$mapObjects = function (callback, scope) {
            var result = new ObservableArray();
            result.own(this.createMapper({
                target: result,
                createItem: callback,
                destroyItem: JW.destroy,
                scope: scope || this
            }));
            return result;
        };
        /**
         * @inheritdoc
         */
        ObservableArray.prototype.$$toReversed = function () {
            var result = new ObservableArray();
            result.own(this.createReverser({
                target: result
            }));
            return result;
        };
        /**
         * @inheritdoc
         */
        ObservableArray.prototype.createEmpty = function () {
            return new ObservableArray();
        };
        /**
         * @inheritdoc
         */
        ObservableArray.prototype.createEmptyArray = function () {
            return new ObservableArray();
        };
        /**
         * @inheritdoc
         */
        ObservableArray.prototype.createEmptyMap = function () {
            return new JW.ObservableMap();
        };
        /**
         * @inheritdoc
         */
        ObservableArray.prototype.createEmptySet = function () {
            return new JW.ObservableSet();
        };
        /**
         * @inheritdoc
         */
        ObservableArray.prototype.createMapper = function (config) {
            return new ObservableArray.Mapper(this, config);
        };
        /**
         * @inheritdoc
         */
        ObservableArray.prototype.createFilterer = function (config) {
            return new ObservableArray.Filterer(this, config);
        };
        /**
         * @inheritdoc
         */
        ObservableArray.prototype.createCounter = function (config) {
            return new ObservableArray.Counter(this, config);
        };
        /**
         * @inheritdoc
         */
        ObservableArray.prototype.createObserver = function (config) {
            return new ObservableArray.Observer(this, config);
        };
        /**
         * @inheritdoc
         */
        ObservableArray.prototype.createOrderer = function (config) {
            return new ObservableArray.Orderer(this, config);
        };
        /**
         * @inheritdoc
         */
        ObservableArray.prototype.createSorterComparing = function (config) {
            return new ObservableArray.SorterComparing(this, config);
        };
        /**
         * @inheritdoc
         */
        ObservableArray.prototype.createIndexer = function (config) {
            return new ObservableArray.Indexer(this, config);
        };
        /**
         * @inheritdoc
         */
        ObservableArray.prototype.createLister = function (config) {
            return new ObservableArray.Lister(this, config);
        };
        /**
         * @inheritdoc
         */
        ObservableArray.prototype.createInserter = function (config) {
            return new ObservableArray.Inserter(this, config);
        };
        /**
         * @inheritdoc
         */
        ObservableArray.prototype.createMerger = function (config) {
            return new ObservableArray.Merger(this, config);
        };
        // type definition in argument breaks compiler for some reason
        /**
         * @inheritdoc
         */
        ObservableArray.prototype.createMergerBunch = function (merger) {
            return new ObservableArray.Merger.Bunch(merger, this);
        };
        /**
         * @inheritdoc
         */
        ObservableArray.prototype.createReverser = function (config) {
            return new ObservableArray.Reverser(this, config);
        };
        /**
         * @hidden
         */
        ObservableArray.prototype._createMergerTarget = function () {
            return new ObservableArray();
        };
        return ObservableArray;
    })(JW.AbstractArray);
    JW.ObservableArray = ObservableArray;
    var ObservableArray;
    (function (ObservableArray) {
        /**
         * [[JW.AbstractCollection.Counter|Counter]] implementation for [[JW.ObservableArray]].
         */
        var Counter = (function (_super) {
            __extends(Counter, _super);
            /**
             * @inheritdoc
             */
            function Counter(source, config) {
                _super.call(this, source, config);
                this.own(source.spliceEvent.bind(this._onSplice, this));
                this.own(source.replaceEvent.bind(this._onReplace, this));
                this.own(source.clearEvent.bind(this._onClear, this));
            }
            Counter.prototype._onSplice = function (params) {
                var _this = this;
                var spliceResult = params.spliceResult;
                var value = this.target.get();
                JW.Array.every(spliceResult.removedItemsList, function (indexItems) {
                    value -= JW.Array.count(indexItems.items, _this._filterItem, _this._scope);
                    return true;
                });
                JW.Array.every(spliceResult.addedItemsList, function (indexItems) {
                    value += JW.Array.count(indexItems.items, _this._filterItem, _this._scope);
                    return true;
                });
                this.target.set(value);
            };
            Counter.prototype._onReplace = function (params) {
                var oldFiltered = this._filterItem.call(this._scope, params.oldItem) !== false;
                var newFiltered = this._filterItem.call(this._scope, params.newItem) !== false;
                if (oldFiltered && !newFiltered) {
                    this.target.set(this.target.get() - 1);
                }
                else if (!oldFiltered && newFiltered) {
                    this.target.set(this.target.get() + 1);
                }
            };
            Counter.prototype._onClear = function (params) {
                this.target.set(0);
            };
            return Counter;
        })(JW.AbstractArray.Counter);
        ObservableArray.Counter = Counter;
        /**
         * [[JW.AbstractCollection.Filterer|Filterer]] implementation for [[JW.ObservableArray]].
         */
        var Filterer = (function (_super) {
            __extends(Filterer, _super);
            /**
             * @inheritdoc
             */
            function Filterer(source, config) {
                _super.call(this, source, config);
                this.own(source.spliceEvent.bind(this._onSplice, this));
                this.own(source.replaceEvent.bind(this._onReplace, this));
                this.own(source.moveEvent.bind(this._onMove, this));
                this.own(source.clearEvent.bind(this._onClear, this));
                this.own(source.reorderEvent.bind(this._onReorder, this));
            }
            Filterer.prototype._onSplice = function (params) {
                var spliceResult = params.spliceResult;
                this._splice(spliceResult.removedItemsList, spliceResult.addedItemsList);
            };
            Filterer.prototype._onReplace = function (params) {
                var oldFiltered = this._filtered[params.index] !== 0;
                var newFiltered = this._filterItem.call(this._scope, params.newItem) !== false;
                if (!oldFiltered && !newFiltered) {
                    return;
                }
                var index = this._countFiltered(0, params.index);
                this._filtered[params.index] = newFiltered ? 1 : 0;
                if (!newFiltered) {
                    this.target.tryRemove(index);
                }
                else if (!oldFiltered) {
                    this.target.tryAdd(params.newItem, index);
                }
                else {
                    this.target.trySet(params.newItem, index);
                }
            };
            Filterer.prototype._onMove = function (params) {
                if (this._filtered[params.fromIndex] !== 0) {
                    var fromIndex, toIndex;
                    if (params.fromIndex < params.toIndex) {
                        fromIndex = this._countFiltered(0, params.fromIndex);
                        toIndex = fromIndex + this._countFiltered(params.fromIndex + 1, params.toIndex - params.fromIndex);
                    }
                    else {
                        toIndex = this._countFiltered(0, params.toIndex);
                        fromIndex = toIndex + this._countFiltered(params.toIndex, params.fromIndex - params.toIndex);
                    }
                    this.target.tryMove(fromIndex, toIndex);
                }
                JW.Array.tryMove(this._filtered, params.fromIndex, params.toIndex);
            };
            Filterer.prototype._onClear = function (params) {
                this.target.tryClear();
            };
            Filterer.prototype._onReorder = function (params) {
                var targetIndex = 0;
                var targetIndexWhichMovesToI = {};
                for (var sourceIndex = 0, l = this._filtered.length; sourceIndex < l; ++sourceIndex) {
                    if (this._filtered[sourceIndex] !== 0) {
                        targetIndexWhichMovesToI[params.indexArray[sourceIndex]] = targetIndex++;
                    }
                }
                JW.Array.tryReorder(this._filtered, params.indexArray);
                var targetIndex = 0;
                var indexes = new _JW.A(this.target.getLength());
                for (var sourceIndex = 0, l = this._filtered.length; sourceIndex < l; ++sourceIndex) {
                    if (this._filtered[sourceIndex] !== 0) {
                        indexes[targetIndexWhichMovesToI[sourceIndex]] = targetIndex++;
                    }
                }
                this.target.tryReorder(indexes);
            };
            return Filterer;
        })(JW.AbstractArray.Filterer);
        ObservableArray.Filterer = Filterer;
        /**
         * [[JW.AbstractCollection.Indexer|Indexer]] implementation for [[JW.ObservableArray]].
         */
        var Indexer = (function (_super) {
            __extends(Indexer, _super);
            /**
             * @inheritdoc
             */
            function Indexer(source, config) {
                _super.call(this, source, config);
                this.own(source.spliceEvent.bind(this._onSplice, this));
                this.own(source.replaceEvent.bind(this._onReplace, this));
                this.own(source.clearEvent.bind(this._onClear, this));
            }
            Indexer.prototype._onSplice = function (params) {
                var spliceResult = params.spliceResult;
                this.target.trySplice(this._keys(spliceResult.getRemovedItems()), this._index(spliceResult.getAddedItems()));
            };
            Indexer.prototype._onReplace = function (params) {
                this.target.trySplice(this._keys([params.oldItem]), this._index([params.newItem]));
            };
            Indexer.prototype._onClear = function (params) {
                this.target.tryRemoveAll(this._keys(params.items));
            };
            return Indexer;
        })(JW.AbstractArray.Indexer);
        ObservableArray.Indexer = Indexer;
        /**
         * [[JW.AbstractArray.Inserter|Inserter]] implementation for [[JW.ObservableArray]].
         */
        var Inserter = (function (_super) {
            __extends(Inserter, _super);
            /**
             * @inheritdoc
             */
            function Inserter(source, config) {
                _super.call(this, source, config);
                this.own(source.spliceEvent.bind(this._onSplice, this));
                this.own(source.replaceEvent.bind(this._onReplace, this));
                this.own(source.moveEvent.bind(this._onMove, this));
                this.own(source.clearEvent.bind(this._onClear, this));
                this.own(source.reorderEvent.bind(this._onReorder, this));
            }
            Inserter.prototype._onSplice = function (params) {
                var spliceResult = params.spliceResult;
                var oldItems = spliceResult.oldItems;
                var removedItems = spliceResult.getRemovedItems();
                // if there is an effective clearing function, just reset the controller
                if (this._clearItems && (3 * removedItems.length > 2 * oldItems.length)) {
                    this._clearItems.call(this._scope, oldItems);
                    this._addItems(this.source.getItems(), 0);
                    return;
                }
                // else, splice the elements
                var removedItemsList = spliceResult.removedItemsList;
                var addedItemsList = spliceResult.addedItemsList;
                for (var i = removedItemsList.length - 1; i >= 0; --i) {
                    var removeRarams = removedItemsList[i];
                    this._removeItems(removeRarams.items, removeRarams.index);
                }
                for (var i = 0, l = addedItemsList.length; i < l; ++i) {
                    var addParams = addedItemsList[i];
                    this._addItems(addParams.items, addParams.index);
                }
            };
            Inserter.prototype._onReplace = function (params) {
                if (this._removeItem) {
                    this._removeItem.call(this._scope, params.oldItem, params.index);
                }
                if (this._addItem) {
                    this._addItem.call(this._scope, params.newItem, params.index);
                }
            };
            Inserter.prototype._onMove = function (params) {
                if (this._removeItem) {
                    this._removeItem.call(this._scope, params.item, params.fromIndex);
                }
                if (this._addItem) {
                    this._addItem.call(this._scope, params.item, params.toIndex);
                }
            };
            Inserter.prototype._onClear = function (params) {
                this._doClearItems(params.items);
            };
            Inserter.prototype._onReorder = function (params) {
                this._doClearItems(params.items);
                this._addItems(this.source.getItems(), 0);
            };
            return Inserter;
        })(JW.AbstractArray.Inserter);
        ObservableArray.Inserter = Inserter;
        /**
         * [[JW.AbstractCollection.Lister|Lister]] implementation for [[JW.ObservableArray]].
         */
        var Lister = (function (_super) {
            __extends(Lister, _super);
            /**
             * @inheritdoc
             */
            function Lister(source, config) {
                _super.call(this, source, config);
                this.own(source.spliceEvent.bind(this._onSplice, this));
                this.own(source.replaceEvent.bind(this._onReplace, this));
                this.own(source.clearEvent.bind(this._onClear, this));
            }
            Lister.prototype._onSplice = function (params) {
                var spliceResult = params.spliceResult;
                this.target.trySplice(spliceResult.getRemovedItems(), spliceResult.getAddedItems());
            };
            Lister.prototype._onReplace = function (params) {
                this.target.trySplice([params.oldItem], [params.newItem]);
            };
            Lister.prototype._onClear = function (params) {
                this.target.tryRemoveAll(params.items);
            };
            return Lister;
        })(JW.AbstractArray.Lister);
        ObservableArray.Lister = Lister;
        /**
         * [[JW.AbstractCollection.Mapper|Mapper]] implementation for [[JW.ObservableArray]].
         */
        var Mapper = (function (_super) {
            __extends(Mapper, _super);
            /**
             * @inheritdoc
             */
            function Mapper(source, config) {
                _super.call(this, source, config);
                this.own(source.spliceEvent.bind(this._onSplice, this));
                this.own(source.replaceEvent.bind(this._onReplace, this));
                this.own(source.moveEvent.bind(this._onMove, this));
                this.own(source.clearEvent.bind(this._onClear, this));
                this.own(source.reorderEvent.bind(this._onReorder, this));
            }
            Mapper.prototype._onSplice = function (params) {
                var sourceResult = params.spliceResult;
                var sourceAddedItemsList = sourceResult.addedItemsList;
                var targetAddParamsList = [];
                for (var i = 0, l = sourceAddedItemsList.length; i < l; ++i) {
                    var addParams = sourceAddedItemsList[i];
                    targetAddParamsList.push(new JW.AbstractArray.IndexItems(addParams.index, this._createItems(addParams.items)));
                }
                var targetResult = this.target.trySplice(sourceResult.getRemoveParamsList(), targetAddParamsList);
                var sourceRemovedItemsList = sourceResult.removedItemsList;
                var targetRemovedItemsList = targetResult.removedItemsList;
                for (var i = targetRemovedItemsList.length - 1; i >= 0; --i) {
                    this._destroyItems(targetRemovedItemsList[i].items, sourceRemovedItemsList[i].items);
                }
            };
            Mapper.prototype._onReplace = function (params) {
                var newItem = this._createItem.call(this._scope, params.newItem);
                var oldItem = this.target.trySet(newItem, params.index).value;
                this._destroyItem.call(this._scope, oldItem, params.oldItem);
            };
            Mapper.prototype._onMove = function (params) {
                this.target.tryMove(params.fromIndex, params.toIndex);
            };
            Mapper.prototype._onClear = function (params) {
                this._destroyItems(this.target.tryClear(), params.items);
            };
            Mapper.prototype._onReorder = function (params) {
                this.target.tryReorder(params.indexArray);
            };
            return Mapper;
        })(JW.AbstractArray.Mapper);
        ObservableArray.Mapper = Mapper;
        /**
         * [[JW.AbstractArray.Merger|Merger]] implementation for [[JW.ObservableArray]].
         */
        var Merger = (function (_super) {
            __extends(Merger, _super);
            /**
             * @inheritdoc
             */
            function Merger(source, config) {
                _super.call(this, source, config);
                this.own(source.spliceEvent.bind(this._onSplice, this));
                this.own(source.replaceEvent.bind(this._onReplace, this));
                this.own(source.moveEvent.bind(this._onMove, this));
                this.own(source.clearEvent.bind(this._onClear, this));
                this.own(source.reorderEvent.bind(this._onReorder, this));
            }
            Merger.prototype._getIndexes = function (bunches) {
                var currentIndex = 0;
                var indexes = JW.Array.map(bunches, function (bunch) {
                    var index = currentIndex;
                    currentIndex += bunch.getLength();
                    return index;
                }, this);
                indexes.push(currentIndex);
                return indexes;
            };
            Merger.prototype._onSplice = function (params) {
                var _this = this;
                var spliceResult = params.spliceResult;
                var indexes = this._getIndexes(spliceResult.oldItems);
                var removeParamsList = JW.Array.map(spliceResult.removedItemsList, function (indexItems) {
                    return new JW.AbstractArray.IndexCount(indexes[indexItems.index], _this._count(indexItems.items));
                }, this);
                JW.Array.backEvery(spliceResult.removedItemsList, function (indexItems) {
                    indexes.splice(indexItems.index, indexItems.items.length);
                    var count = _this._count(indexItems.items);
                    for (var i = indexItems.index; i < indexes.length; ++i) {
                        indexes[i] -= count;
                    }
                    return true;
                }, this);
                var addParamsList = JW.Array.map(spliceResult.addedItemsList, function (indexItems) {
                    return new JW.AbstractArray.IndexItems(indexes[indexItems.index], _this._merge(indexItems.items));
                }, this);
                this.target.trySplice(removeParamsList, addParamsList);
            };
            Merger.prototype._onReplace = function (params) {
                var index = this._count(this.source.getItems(), 0, params.index);
                this.target.trySplice([new JW.AbstractArray.IndexCount(index, params.oldItem.getLength())], [new JW.AbstractArray.IndexItems(index, params.newItem.getItems())]);
            };
            Merger.prototype._onMove = function (params) {
                var count = params.item.getLength();
                var indexes = new _JW.A(this.target.getLength());
                var currentIndex = 0;
                function shiftBunch(bunchLength, shift) {
                    for (var j = 0; j < bunchLength; ++j) {
                        indexes[currentIndex] = currentIndex + shift;
                        ++currentIndex;
                    }
                }
                for (var i = 0, l = Math.min(params.fromIndex, params.toIndex); i < l; ++i) {
                    shiftBunch(this.source.get(i).getLength(), 0);
                }
                if (params.fromIndex <= params.toIndex) {
                    // [1], [2], [3], [4], [5]		[2] move to 3
                    // [1], [3], [4], [2], [5]
                    shiftBunch(count, this._count(this.source.getItems(), params.fromIndex, params.toIndex - params.fromIndex));
                    for (var i = params.fromIndex; i < params.toIndex; ++i) {
                        shiftBunch(this.source.get(i).getLength(), -count);
                    }
                }
                else {
                    // [1], [2], [3], [4], [5]		[4] move to 1
                    // [1], [4], [2], [3], [5]
                    for (var i = params.toIndex + 1; i <= params.fromIndex; ++i) {
                        shiftBunch(this.source.get(i).getLength(), count);
                    }
                    shiftBunch(count, -this._count(this.source.getItems(), params.toIndex + 1, params.fromIndex - params.toIndex));
                }
                for (var i = Math.max(params.fromIndex, params.toIndex) + 1, l = this.source.getLength(); i < l; ++i) {
                    shiftBunch(this.source.get(i).getLength(), 0);
                }
                this.target.tryReorder(indexes);
            };
            Merger.prototype._onClear = function (params) {
                this.target.tryClear();
            };
            Merger.prototype._onReorder = function (params) {
                var oldIndexes = this._getIndexes(params.items);
                var newIndexes = this._getIndexes(this.source.getItems());
                var indexes = new _JW.A(this.target.getLength());
                for (var i = 0, l = params.items.length; i < l; ++i) {
                    var bunch = params.items[i];
                    var oldIndex = oldIndexes[i];
                    var newIndex = newIndexes[params.indexArray[i]];
                    for (var j = 0, m = bunch.getLength(); j < m; ++j) {
                        indexes[oldIndex + j] = newIndex + j;
                    }
                }
                this.target.tryReorder(indexes);
            };
            return Merger;
        })(JW.AbstractArray.Merger);
        ObservableArray.Merger = Merger;
        /**
         * @hidden
         */
        var Merger;
        (function (Merger) {
            var Bunch = (function (_super) {
                __extends(Bunch, _super);
                function Bunch(merger, bunch) {
                    _super.call(this);
                    this.source = merger.source;
                    this.target = merger.target;
                    this.bunch = bunch;
                    this.own(bunch.spliceEvent.bind(this._onSplice, this));
                    this.own(bunch.replaceEvent.bind(this._onReplace, this));
                    this.own(bunch.moveEvent.bind(this._onMove, this));
                    this.own(bunch.clearEvent.bind(this._onClear, this));
                    this.own(bunch.reorderEvent.bind(this._onReorder, this));
                }
                Bunch.prototype._getIndex = function () {
                    var bunches = this.source.getItems();
                    var index = 0;
                    for (var i = 0, l = bunches.length; i < l; ++i) {
                        var bunch = bunches[i];
                        if (bunch === this.bunch) {
                            return index;
                        }
                        index += bunch.getLength();
                    }
                    console.warn("JW.ObservableArray.Merger object is corrupted");
                    return 0;
                };
                Bunch.prototype._onSplice = function (params) {
                    var spliceResult = params.spliceResult;
                    var index = this._getIndex();
                    var removeParamsList = JW.Array.map(spliceResult.removedItemsList, function (indexItems) {
                        return new JW.AbstractArray.IndexCount(indexItems.index + index, indexItems.items.length);
                    });
                    var addParamsList = JW.Array.map(spliceResult.addedItemsList, function (indexItems) {
                        return new JW.AbstractArray.IndexItems(indexItems.index + index, indexItems.items.concat());
                    });
                    this.target.trySplice(removeParamsList, addParamsList);
                };
                Bunch.prototype._onReplace = function (params) {
                    this.target.trySet(params.newItem, this._getIndex() + params.index);
                };
                Bunch.prototype._onMove = function (params) {
                    var index = this._getIndex();
                    this.target.tryMove(index + params.fromIndex, index + params.toIndex);
                };
                Bunch.prototype._onClear = function (params) {
                    this.target.tryRemoveAll(this._getIndex(), params.items.length);
                };
                Bunch.prototype._onReorder = function (params) {
                    var index = this._getIndex();
                    var bunchIndexArray = params.indexArray;
                    var bunchLength = bunchIndexArray.length;
                    var targetLength = this.target.getLength();
                    var targetIndexArray = new _JW.A(targetLength);
                    for (var i = 0; i < index; ++i) {
                        targetIndexArray[i] = i;
                    }
                    for (var i = 0; i < bunchLength; ++i) {
                        targetIndexArray[index + i] = index + bunchIndexArray[i];
                    }
                    for (var i = index + bunchLength; i < targetLength; ++i) {
                        targetIndexArray[i] = i;
                    }
                    this.target.tryReorder(targetIndexArray);
                };
                return Bunch;
            })(JW.Class);
            Merger.Bunch = Bunch;
        })(Merger = ObservableArray.Merger || (ObservableArray.Merger = {}));
        /**
         * [[JW.AbstractCollection.Observer|Observer]] implementation for [[JW.ObservableArray]].
         */
        var Observer = (function (_super) {
            __extends(Observer, _super);
            /**
             * @inheritdoc
             */
            function Observer(source, config) {
                _super.call(this, source, config);
                this.own(source.spliceEvent.bind(this._onSplice, this));
                this.own(source.replaceEvent.bind(this._onReplace, this));
                this.own(source.clearEvent.bind(this._onClear, this));
                if (this._change) {
                    this.own(source.changeEvent.bind(this._onChange, this));
                }
            }
            Observer.prototype._onSplice = function (params) {
                var spliceResult = params.spliceResult;
                var oldItems = spliceResult.oldItems;
                var removedItems = spliceResult.getRemovedItems();
                if (this._clearItems && (3 * removedItems.length > 2 * oldItems.length)) {
                    // if there is an effective clearing function, just reset the controller
                    this._clearItems.call(this._scope, oldItems);
                    this._addItems(this.source.getItems());
                }
                else {
                    // else, splice the elements
                    this._removeItems(removedItems);
                    this._addItems(spliceResult.getAddedItems());
                }
            };
            Observer.prototype._onReplace = function (params) {
                if (this._removeItem) {
                    this._removeItem.call(this._scope, params.oldItem);
                }
                if (this._addItem) {
                    this._addItem.call(this._scope, params.newItem);
                }
            };
            Observer.prototype._onClear = function (params) {
                this._doClearItems(params.items);
            };
            return Observer;
        })(JW.AbstractArray.Observer);
        ObservableArray.Observer = Observer;
        /**
         * [[JW.AbstractCollection.Orderer|Orderer]] implementation for [[JW.ObservableArray]].
         */
        var Orderer = (function (_super) {
            __extends(Orderer, _super);
            /**
             * @inheritdoc
             */
            function Orderer(source, config) {
                _super.call(this, source, config);
                this.own(source.spliceEvent.bind(this._onSplice, this));
                this.own(source.replaceEvent.bind(this._onReplace, this));
                this.own(source.clearEvent.bind(this._onClear, this));
            }
            Orderer.prototype._onSplice = function (params) {
                var spliceResult = params.spliceResult;
                this._splice(JW.Array.toSet(spliceResult.getRemovedItems()), JW.Array.toSet(spliceResult.getAddedItems()));
            };
            Orderer.prototype._onReplace = function (params) {
                var index = this.target.keyOf(params.oldItem);
                this.target.trySplice([new JW.AbstractArray.IndexCount(index, 1)], [new JW.AbstractArray.IndexItems(this.target.getLength() - 1, [params.newItem])]);
            };
            Orderer.prototype._onClear = function (params) {
                this.target.removeItems(params.items);
            };
            return Orderer;
        })(JW.AbstractArray.Orderer);
        ObservableArray.Orderer = Orderer;
        /**
         * [[JW.AbstractArray.Reverser|Reverser]] implementation for [[JW.ObservableArray]].
         */
        var Reverser = (function (_super) {
            __extends(Reverser, _super);
            /**
             * @inheritdoc
             */
            function Reverser(source, config) {
                _super.call(this, source, config);
                this.own(source.spliceEvent.bind(this._onSplice, this));
                this.own(source.replaceEvent.bind(this._onReplace, this));
                this.own(source.moveEvent.bind(this._onMove, this));
                this.own(source.clearEvent.bind(this._onClear, this));
                this.own(source.reorderEvent.bind(this._onReorder, this));
            }
            Reverser.prototype._onSplice = function (params) {
                var _this = this;
                var spliceResult = params.spliceResult;
                var oldLength = this.target.getLength();
                var newLength = oldLength;
                var removeParamsList = JW.Array.map(spliceResult.removedItemsList, function (indexItems) {
                    var length = indexItems.items.length;
                    var index = oldLength - indexItems.index - length;
                    newLength -= length;
                    return new JW.AbstractArray.IndexCount(index, length);
                });
                removeParamsList.reverse();
                var addedItemsList = spliceResult.addedItemsList.concat();
                addedItemsList.reverse();
                JW.Array.each(addedItemsList, function (indexItems) {
                    newLength += indexItems.items.length;
                });
                var addParamsList = JW.Array.map(addedItemsList, function (indexItems) {
                    var items = indexItems.items;
                    var length = items.length;
                    var index = newLength - indexItems.index - length;
                    return new JW.AbstractArray.IndexItems(index, _this._reverse(items));
                });
                this.target.trySplice(removeParamsList, addParamsList);
            };
            Reverser.prototype._onReplace = function (params) {
                this.target.trySet(params.newItem, this.target.getLength() - params.index - 1);
            };
            Reverser.prototype._onMove = function (params) {
                this.target.tryMove(this.target.getLength() - params.fromIndex - 1, this.target.getLength() - params.toIndex - 1);
            };
            Reverser.prototype._onClear = function (params) {
                this.target.tryClear();
            };
            Reverser.prototype._onReorder = function (params) {
                var indexArray = params.indexArray;
                var length = indexArray.length;
                var indexes = new _JW.A(indexArray.length);
                for (var i = 0; i < length; ++i) {
                    indexes[length - i - 1] = length - indexArray[i] - 1;
                }
                this.target.tryReorder(indexes);
            };
            return Reverser;
        })(JW.AbstractArray.Reverser);
        ObservableArray.Reverser = Reverser;
        /**
         * [[JW.AbstractCollection.SorterComparing|SorterComparing]] implementation for [[JW.ObservableArray]].
         */
        var SorterComparing = (function (_super) {
            __extends(SorterComparing, _super);
            /**
             * @inheritdoc
             */
            function SorterComparing(source, config) {
                _super.call(this, source, config);
                this.own(source.spliceEvent.bind(this._onSplice, this));
                this.own(source.replaceEvent.bind(this._onReplace, this));
                this.own(source.clearEvent.bind(this._onClear, this));
            }
            SorterComparing.prototype._onSplice = function (params) {
                var spliceResult = params.spliceResult;
                this._splice(spliceResult.getRemovedItems(), spliceResult.getAddedItems());
            };
            SorterComparing.prototype._onReplace = function (params) {
                this._splice([params.oldItem], [params.newItem]);
            };
            SorterComparing.prototype._onClear = function (params) {
                this._splice(params.items, []);
            };
            return SorterComparing;
        })(JW.AbstractArray.SorterComparing);
        ObservableArray.SorterComparing = SorterComparing;
    })(ObservableArray = JW.ObservableArray || (JW.ObservableArray = {}));
})(JW || (JW = {}));
;
/// <reference path="../jwlib.ref.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JW;
(function (JW) {
    /**
     * Observable implementation of [[JW.AbstractMap]].
     *
     * @param T Collection item type.
     */
    var ObservableMap = (function (_super) {
        __extends(ObservableMap, _super);
        /**
         * @inheritdoc
         */
        function ObservableMap(items, adapter) {
            _super.call(this, items, adapter);
            /**
             * Items are removed from map, items are added to map and items are updated in map.
             * Triggered in result of calling:
             *
             * * [[set]]
             * * [[trySet]]
             * * [[setAll]]
             * * [[trySetAll]]
             * * [[remove]]
             * * [[tryRemove]]
             * * [[removeItem]]
             * * [[removeAll]]
             * * [[tryRemoveAll]]
             * * [[removeItems]]
             * * [[splice]]
             * * [[trySplice]]
             * * [[performSplice]]
             */
            this.spliceEvent = new JW.Event();
            /**
             * Keys of items are changed in map. Triggered in result of calling:
             *
             * * [[setKey]]
             * * [[trySetKey]]
             * * [[reindex]]
             * * [[tryReindex]]
             * * [[performReindex]]
             */
            this.reindexEvent = new JW.Event();
            /**
             * Map is cleared. Triggered in result of calling:
             *
             * * [[clear]]
             * * [[$clear]]
             * * [[tryClear]]
             */
            this.clearEvent = new JW.Event();
            /**
             * Map is changed. Triggered right after one of events:
             *
             * * [[spliceEvent]]
             * * [[reindexEvent]]
             * * [[clearEvent]]
             */
            this.changeEvent = new JW.Event();
            this.length = new JW.Property(this.getLength());
        }
        /**
         * @inheritdoc
         */
        ObservableMap.prototype.ownItems = function () {
            _super.prototype.ownItems.call(this);
            return this;
        };
        /**
         * @inheritdoc
         */
        ObservableMap.prototype.destroyObject = function () {
            this.changeEvent.destroy();
            this.clearEvent.destroy();
            this.reindexEvent.destroy();
            this.spliceEvent.destroy();
            this.length.destroy();
            _super.prototype.destroyObject.call(this);
        };
        /**
         * @inheritdoc
         */
        ObservableMap.prototype.trySet = function (item, key) {
            var result = this._trySet(item, key);
            if (result === undefined) {
                return;
            }
            var removedItems = {};
            var removedItem = result.value;
            if (removedItem !== undefined) {
                removedItems[key] = removedItem;
            }
            var addedItems = {};
            addedItems[key] = item;
            var spliceResult = { removedItems: removedItems, addedItems: addedItems };
            this.length.set(this.getLength());
            this.spliceEvent.trigger({ sender: this, spliceResult: spliceResult });
            this.changeEvent.trigger({ sender: this });
            if (removedItem !== undefined && this._ownsItems) {
                removedItem.destroy();
            }
            return result;
        };
        /**
         * @inheritdoc
         */
        ObservableMap.prototype.setAll = function (items) {
            this.trySetAll(items);
        };
        /**
         * @inheritdoc
         */
        ObservableMap.prototype.trySetKey = function (oldKey, newKey) {
            var item = _super.prototype.trySetKey.call(this, oldKey, newKey);
            if (item === undefined) {
                return;
            }
            this.reindexEvent.trigger({ sender: this, keyMap: JW.Map.single(oldKey, newKey) });
            this.changeEvent.trigger({ sender: this });
            return item;
        };
        /**
         * @inheritdoc
         */
        ObservableMap.prototype.tryRemove = function (key) {
            var item = this._tryRemove(key);
            if (item === undefined) {
                return;
            }
            var spliceResult = { addedItems: {}, removedItems: JW.Map.single(key, item) };
            this.length.set(this.getLength());
            this.spliceEvent.trigger({ sender: this, spliceResult: spliceResult });
            this.changeEvent.trigger({ sender: this });
            if (this._ownsItems) {
                item.destroy();
            }
            return item;
        };
        /**
         * @inheritdoc
         */
        ObservableMap.prototype.removeAll = function (keys) {
            this.tryRemoveAll(keys);
        };
        /**
         * @inheritdoc
         */
        ObservableMap.prototype.trySplice = function (removedKeys, updatedItems) {
            var spliceResult = this._trySplice(removedKeys, updatedItems);
            if (spliceResult === undefined) {
                return;
            }
            this.length.set(this.getLength());
            this.spliceEvent.trigger({ sender: this, spliceResult: spliceResult });
            this.changeEvent.trigger({ sender: this });
            if (this._ownsItems) {
                JW.Array.backEvery(JW.Map.toArray(spliceResult.removedItems), JW.destroyForcibly);
            }
            return spliceResult;
        };
        /**
         * @inheritdoc
         */
        ObservableMap.prototype.tryClear = function () {
            var items = this._tryClear();
            if (items === undefined) {
                return;
            }
            this.length.set(0);
            this.clearEvent.trigger({ sender: this, items: items });
            this.changeEvent.trigger({ sender: this });
            if (this._ownsItems) {
                JW.Array.backEvery(JW.Map.toArray(items), JW.destroyForcibly);
            }
            return items;
        };
        /**
         * @inheritdoc
         */
        ObservableMap.prototype.tryReindex = function (keyMap) {
            var result = _super.prototype.tryReindex.call(this, keyMap);
            if (result === undefined) {
                return;
            }
            this.reindexEvent.trigger({ sender: this, keyMap: result });
            this.changeEvent.trigger({ sender: this });
            return result;
        };
        /**
         * @inheritdoc
         */
        ObservableMap.prototype.$$toSortedComparing = function (compare, scope, order) {
            var result = new JW.ObservableArray();
            result.own(this.createSorterComparing({
                target: result,
                compare: compare,
                scope: scope || this,
                order: order
            }));
            return result;
        };
        /**
         * @inheritdoc
         */
        ObservableMap.prototype.$$index = function (callback, scope) {
            var result = new ObservableMap();
            result.own(this.createIndexer({
                target: result,
                getKey: callback,
                scope: scope || this
            }));
            return result;
        };
        /**
         * @inheritdoc
         */
        ObservableMap.prototype.$$toArray = function () {
            var result = new JW.ObservableArray();
            result.own(this.createOrderer({
                target: result
            }));
            return result;
        };
        /**
         * @inheritdoc
         */
        ObservableMap.prototype.$$toSet = function () {
            var result = new JW.ObservableSet();
            result.own(this.createLister({
                target: result
            }));
            return result;
        };
        /**
         * @inheritdoc
         */
        ObservableMap.prototype.$$filter = function (callback, scope) {
            var result = new ObservableMap();
            result.own(this.createFilterer({
                target: result,
                filterItem: callback,
                scope: scope || this
            }));
            return result;
        };
        /**
         * @inheritdoc
         */
        ObservableMap.prototype.$$count = function (callback, scope) {
            var result = new JW.Property(0);
            result.own(this.createCounter({
                target: result,
                filterItem: callback,
                scope: scope || this
            }));
            return result;
        };
        /**
         * @inheritdoc
         */
        ObservableMap.prototype.$$mapValues = function (callback, scope) {
            var result = new ObservableMap();
            result.own(this.createMapper({
                target: result,
                createItem: callback,
                scope: scope || this
            }));
            return result;
        };
        /**
         * @inheritdoc
         */
        ObservableMap.prototype.$$mapObjects = function (callback, scope) {
            var result = new ObservableMap();
            result.own(this.createMapper({
                target: result,
                createItem: callback,
                destroyItem: JW.destroy,
                scope: scope || this
            }));
            return result;
        };
        /**
         * @inheritdoc
         */
        ObservableMap.prototype.createEmpty = function () {
            return new ObservableMap();
        };
        /**
         * @inheritdoc
         */
        ObservableMap.prototype.createEmptyArray = function () {
            return new JW.ObservableArray();
        };
        /**
         * @inheritdoc
         */
        ObservableMap.prototype.createEmptyMap = function () {
            return new ObservableMap();
        };
        /**
         * @inheritdoc
         */
        ObservableMap.prototype.createEmptySet = function () {
            return new JW.ObservableSet();
        };
        /**
         * @inheritdoc
         */
        ObservableMap.prototype.createMapper = function (config) {
            return new ObservableMap.Mapper(this, config);
        };
        /**
         * @inheritdoc
         */
        ObservableMap.prototype.createFilterer = function (config) {
            return new ObservableMap.Filterer(this, config);
        };
        /**
         * @inheritdoc
         */
        ObservableMap.prototype.createCounter = function (config) {
            return new ObservableMap.Counter(this, config);
        };
        /**
         * @inheritdoc
         */
        ObservableMap.prototype.createObserver = function (config) {
            return new ObservableMap.Observer(this, config);
        };
        /**
         * @inheritdoc
         */
        ObservableMap.prototype.createOrderer = function (config) {
            return new ObservableMap.Orderer(this, config);
        };
        /**
         * @inheritdoc
         */
        ObservableMap.prototype.createSorterComparing = function (config) {
            return new ObservableMap.SorterComparing(this, config);
        };
        /**
         * @inheritdoc
         */
        ObservableMap.prototype.createIndexer = function (config) {
            return new ObservableMap.Indexer(this, config);
        };
        /**
         * @inheritdoc
         */
        ObservableMap.prototype.createLister = function (config) {
            return new ObservableMap.Lister(this, config);
        };
        /**
         * @inheritdoc
         */
        ObservableMap.prototype.createInserter = function (config) {
            return new ObservableMap.Inserter(this, config);
        };
        return ObservableMap;
    })(JW.AbstractMap);
    JW.ObservableMap = ObservableMap;
    var ObservableMap;
    (function (ObservableMap) {
        /**
         * [[JW.AbstractCollection.Counter|Counter]] implementation for [[JW.ObservableMap]].
         */
        var Counter = (function (_super) {
            __extends(Counter, _super);
            /**
             * @inheritdoc
             */
            function Counter(source, config) {
                _super.call(this, source, config);
                this.own(source.spliceEvent.bind(this._onSplice, this));
                this.own(source.clearEvent.bind(this._onClear, this));
            }
            Counter.prototype._onSplice = function (params) {
                var spliceResult = params.spliceResult;
                this.target.set(this.target.get() -
                    JW.Map.count(spliceResult.removedItems, this._filterItem, this._scope) +
                    JW.Map.count(spliceResult.addedItems, this._filterItem, this._scope));
            };
            Counter.prototype._onClear = function (params) {
                this.target.set(0);
            };
            return Counter;
        })(JW.AbstractMap.Counter);
        ObservableMap.Counter = Counter;
        /**
         * [[JW.AbstractCollection.Filterer|Filterer]] implementation for [[JW.ObservableMap]].
         */
        var Filterer = (function (_super) {
            __extends(Filterer, _super);
            /**
             * @inheritdoc
             */
            function Filterer(source, config) {
                _super.call(this, source, config);
                this.own(source.spliceEvent.bind(this._onSplice, this));
                this.own(source.reindexEvent.bind(this._onReindex, this));
                this.own(source.clearEvent.bind(this._onClear, this));
            }
            Filterer.prototype._onSplice = function (params) {
                var spliceResult = params.spliceResult;
                this.target.trySplice(JW.Map.getKeys(spliceResult.removedItems), JW.Map.filter(spliceResult.addedItems, this._filterItem, this._scope));
            };
            Filterer.prototype._onReindex = function (params) {
                this.target.tryReindex(params.keyMap);
            };
            Filterer.prototype._onClear = function (params) {
                this.target.tryRemoveAll(JW.Map.getKeys(params.items));
            };
            return Filterer;
        })(JW.AbstractMap.Filterer);
        ObservableMap.Filterer = Filterer;
        /**
         * [[JW.AbstractCollection.Indexer|Indexer]] implementation for [[JW.ObservableMap]].
         */
        var Indexer = (function (_super) {
            __extends(Indexer, _super);
            /**
             * @inheritdoc
             */
            function Indexer(source, config) {
                _super.call(this, source, config);
                this.own(source.spliceEvent.bind(this._onSplice, this));
                this.own(source.clearEvent.bind(this._onClear, this));
            }
            Indexer.prototype._onSplice = function (params) {
                var spliceResult = params.spliceResult;
                this.target.trySplice(this._keys(JW.Map.toArray(spliceResult.removedItems)), this._index(JW.Map.toArray(spliceResult.addedItems)));
            };
            Indexer.prototype._onClear = function (params) {
                this.target.tryRemoveAll(this._keys(JW.Map.toArray(params.items)));
            };
            return Indexer;
        })(JW.AbstractMap.Indexer);
        ObservableMap.Indexer = Indexer;
        /**
         * [[JW.AbstractMap.Inserter|Inserter]] implementation for [[JW.ObservableMap]].
         */
        var Inserter = (function (_super) {
            __extends(Inserter, _super);
            /**
             * @inheritdoc
             */
            function Inserter(source, config) {
                _super.call(this, source, config);
                this.own(source.spliceEvent.bind(this._onSplice, this));
                this.own(source.reindexEvent.bind(this._onReindex, this));
                this.own(source.clearEvent.bind(this._onClear, this));
            }
            Inserter.prototype._onSplice = function (params) {
                var spliceResult = params.spliceResult;
                this._removeItems(spliceResult.removedItems);
                this._addItems(spliceResult.addedItems);
            };
            Inserter.prototype._onReindex = function (params) {
                var keyMap = params.keyMap;
                for (var oldKey in keyMap) {
                    var newKey = keyMap[oldKey];
                    var item = this.source.get(newKey);
                    if (this._removeItem) {
                        this._removeItem.call(this._scope, oldKey, item);
                    }
                    if (this._addItem) {
                        this._addItem.call(this._scope, item, newKey);
                    }
                }
            };
            Inserter.prototype._onClear = function (params) {
                this._doClearItems(params.items);
            };
            return Inserter;
        })(JW.AbstractMap.Inserter);
        ObservableMap.Inserter = Inserter;
        /**
         * [[JW.AbstractCollection.Lister|Lister]] implementation for [[JW.ObservableMap]].
         */
        var Lister = (function (_super) {
            __extends(Lister, _super);
            /**
             * @inheritdoc
             */
            function Lister(source, config) {
                _super.call(this, source, config);
                this.own(source.spliceEvent.bind(this._onSplice, this));
                this.own(source.clearEvent.bind(this._onClear, this));
            }
            Lister.prototype._onSplice = function (params) {
                var spliceResult = params.spliceResult;
                this.target.trySplice(JW.Map.toArray(spliceResult.removedItems), JW.Map.toArray(spliceResult.addedItems));
            };
            Lister.prototype._onClear = function (params) {
                this.target.tryRemoveAll(JW.Map.toArray(params.items));
            };
            return Lister;
        })(JW.AbstractMap.Lister);
        ObservableMap.Lister = Lister;
        /**
         * [[JW.AbstractCollection.Mapper|Mapper]] implementation for [[JW.ObservableMap]].
         */
        var Mapper = (function (_super) {
            __extends(Mapper, _super);
            /**
             * @inheritdoc
             */
            function Mapper(source, config) {
                _super.call(this, source, config);
                this.own(source.spliceEvent.bind(this._onSplice, this));
                this.own(source.reindexEvent.bind(this._onReindex, this));
                this.own(source.clearEvent.bind(this._onClear, this));
            }
            Mapper.prototype._onSplice = function (params) {
                var sourceResult = params.spliceResult;
                var removedDatas = sourceResult.removedItems;
                var addedDatas = sourceResult.addedItems;
                var targetResult = this.target.trySplice(JW.Map.getRemovedKeys(removedDatas, addedDatas), this._createItems(addedDatas));
                if (targetResult !== undefined) {
                    this._destroyItems(targetResult.removedItems, removedDatas);
                }
            };
            Mapper.prototype._onReindex = function (params) {
                this.target.tryReindex(params.keyMap);
            };
            Mapper.prototype._onClear = function (params) {
                var datas = params.items;
                this._destroyItems(this.target.tryRemoveAll(JW.Map.getKeys(datas)), datas);
            };
            return Mapper;
        })(JW.AbstractMap.Mapper);
        ObservableMap.Mapper = Mapper;
        /**
         * [[JW.AbstractCollection.Observer|Observer]] implementation for [[JW.ObservableMap]].
         */
        var Observer = (function (_super) {
            __extends(Observer, _super);
            /**
             * @inheritdoc
             */
            function Observer(source, config) {
                _super.call(this, source, config);
                this.own(source.spliceEvent.bind(this._onSplice, this));
                this.own(source.clearEvent.bind(this._onClear, this));
                if (this._change) {
                    this.own(source.changeEvent.bind(this._onChange, this));
                }
            }
            Observer.prototype._onSplice = function (params) {
                var spliceResult = params.spliceResult;
                this._removeItems(JW.Map.toArray(spliceResult.removedItems));
                this._addItems(JW.Map.toArray(spliceResult.addedItems));
            };
            Observer.prototype._onClear = function (params) {
                this._doClearItems(JW.Map.toArray(params.items));
            };
            return Observer;
        })(JW.AbstractMap.Observer);
        ObservableMap.Observer = Observer;
        /**
         * [[JW.AbstractCollection.Orderer|Orderer]] implementation for [[JW.ObservableMap]].
         */
        var Orderer = (function (_super) {
            __extends(Orderer, _super);
            /**
             * @inheritdoc
             */
            function Orderer(source, config) {
                _super.call(this, source, config);
                this.own(source.spliceEvent.bind(this._onSplice, this));
                this.own(source.clearEvent.bind(this._onClear, this));
            }
            Orderer.prototype._onSplice = function (params) {
                var spliceResult = params.spliceResult;
                this._splice(JW.Map.toSet(spliceResult.removedItems), JW.Map.toSet(spliceResult.addedItems));
            };
            Orderer.prototype._onClear = function (params) {
                this.target.removeItems(JW.Map.toArray(params.items));
            };
            return Orderer;
        })(JW.AbstractMap.Orderer);
        ObservableMap.Orderer = Orderer;
        /**
         * [[JW.AbstractCollection.SorterComparing|SorterComparing]] implementation for [[JW.ObservableMap]].
         */
        var SorterComparing = (function (_super) {
            __extends(SorterComparing, _super);
            /**
             * @inheritdoc
             */
            function SorterComparing(source, config) {
                _super.call(this, source, config);
                this.own(source.spliceEvent.bind(this._onSplice, this));
                this.own(source.clearEvent.bind(this._onClear, this));
            }
            SorterComparing.prototype._onSplice = function (params) {
                var spliceResult = params.spliceResult;
                this._splice(JW.Map.toArray(spliceResult.removedItems), JW.Map.toArray(spliceResult.addedItems));
            };
            SorterComparing.prototype._onClear = function (params) {
                this._splice(JW.Map.toArray(params.items), []);
            };
            return SorterComparing;
        })(JW.AbstractMap.SorterComparing);
        ObservableMap.SorterComparing = SorterComparing;
    })(ObservableMap = JW.ObservableMap || (JW.ObservableMap = {}));
})(JW || (JW = {}));
;
/// <reference path="../jwlib.ref.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JW;
(function (JW) {
    /**
     * Observable implementation of [[JW.AbstractSet]].
     *
     * @param T Collection item type.
     */
    var ObservableSet = (function (_super) {
        __extends(ObservableSet, _super);
        function ObservableSet(items, adapter) {
            _super.call(this, items, adapter);
            /**
             * Items are removed from set, items are added to set.
             * Triggered in result of calling:
             *
             * * [[add]]
             * * [[tryAdd]]
             * * [[addAll]]
             * * [[$addAll]]
             * * [[tryAddAll]]
             * * [[remove]]
             * * [[tryRemove]]
             * * [[removeItem]]
             * * [[removeAll]]
             * * [[$removeAll]]
             * * [[tryRemoveAll]]
             * * [[removeItems]]
             * * [[splice]]
             * * [[trySplice]]
             * * [[performSplice]]
             */
            this.spliceEvent = new JW.Event();
            /**
             * Set is cleared. Triggered in result of calling:
             *
             * * [[clear]]
             * * [[$clear]]
             * * [[tryClear]]
             */
            this.clearEvent = new JW.Event();
            /**
             * Set is changed. Triggered right after one of events:
             *
             * * [[spliceEvent]]
             * * [[clearEvent]]
             */
            this.changeEvent = new JW.Event();
            this.length = new JW.Property(this.getLength());
        }
        /**
         * @inheritdoc
         */
        ObservableSet.prototype.ownItems = function () {
            _super.prototype.ownItems.call(this);
            return this;
        };
        /**
         * @inheritdoc
         */
        ObservableSet.prototype.destroyObject = function () {
            this.changeEvent.destroy();
            this.clearEvent.destroy();
            this.spliceEvent.destroy();
            this.length.destroy();
            _super.prototype.destroyObject.call(this);
        };
        /**
         * @inheritdoc
         */
        ObservableSet.prototype.tryClear = function () {
            var items = this._tryClear();
            if (items === undefined) {
                return;
            }
            this.length.set(0);
            this.clearEvent.trigger({ sender: this, items: items });
            this.changeEvent.trigger({ sender: this });
            if (this._ownsItems) {
                JW.Array.backEvery(items, JW.destroyForcibly);
            }
            return items;
        };
        /**
         * @inheritdoc
         */
        ObservableSet.prototype.trySplice = function (removedItems, addedItems) {
            var spliceResult = this._trySplice(removedItems, addedItems);
            if (spliceResult === undefined) {
                return;
            }
            this.length.set(this.getLength());
            this.spliceEvent.trigger({ sender: this, spliceResult: spliceResult });
            this.changeEvent.trigger({ sender: this });
            if (this._ownsItems) {
                JW.Array.backEvery(spliceResult.removedItems, JW.destroyForcibly);
            }
            return spliceResult;
        };
        /**
         * @inheritdoc
         */
        ObservableSet.prototype.$$toSortedComparing = function (compare, scope, order) {
            var result = new JW.ObservableArray();
            result.own(this.createSorterComparing({
                target: result,
                compare: compare,
                scope: scope || this,
                order: order
            }));
            return result;
        };
        /**
         * @inheritdoc
         */
        ObservableSet.prototype.$$index = function (callback, scope) {
            var result = new JW.ObservableMap();
            result.own(this.createIndexer({
                target: result,
                getKey: callback,
                scope: scope || this
            }));
            return result;
        };
        /**
         * @inheritdoc
         */
        ObservableSet.prototype.$$toArray = function () {
            var result = new JW.ObservableArray();
            result.own(this.createOrderer({
                target: result
            }));
            return result;
        };
        /**
         * @inheritdoc
         */
        ObservableSet.prototype.$$toSet = function () {
            var result = new ObservableSet();
            result.own(this.createLister({
                target: result
            }));
            return result;
        };
        /**
         * @inheritdoc
         */
        ObservableSet.prototype.$$filter = function (callback, scope) {
            var result = new ObservableSet();
            result.own(this.createFilterer({
                target: result,
                filterItem: callback,
                scope: scope || this
            }));
            return result;
        };
        /**
         * @inheritdoc
         */
        ObservableSet.prototype.$$count = function (callback, scope) {
            var result = new JW.Property(0);
            result.own(this.createCounter({
                target: result,
                filterItem: callback,
                scope: scope || this
            }));
            return result;
        };
        /**
         * @inheritdoc
         */
        ObservableSet.prototype.$$mapValues = function (callback, scope) {
            var result = new ObservableSet();
            result.own(this.createMapper({
                target: result,
                createItem: callback,
                scope: scope || this
            }));
            return result;
        };
        /**
         * @inheritdoc
         */
        ObservableSet.prototype.$$mapObjects = function (callback, scope) {
            var result = new ObservableSet();
            result.own(this.createMapper({
                target: result,
                createItem: callback,
                destroyItem: JW.destroy,
                scope: scope || this
            }));
            return result;
        };
        /**
         * @inheritdoc
         */
        ObservableSet.prototype.createEmpty = function () {
            return new ObservableSet();
        };
        /**
         * @inheritdoc
         */
        ObservableSet.prototype.createEmptyArray = function () {
            return new JW.ObservableArray();
        };
        /**
         * @inheritdoc
         */
        ObservableSet.prototype.createEmptyMap = function () {
            return new JW.ObservableMap();
        };
        /**
         * @inheritdoc
         */
        ObservableSet.prototype.createEmptySet = function () {
            return new ObservableSet();
        };
        /**
         * @inheritdoc
         */
        ObservableSet.prototype.createMapper = function (config) {
            return new ObservableSet.Mapper(this, config);
        };
        /**
         * @inheritdoc
         */
        ObservableSet.prototype.createFilterer = function (config) {
            return new ObservableSet.Filterer(this, config);
        };
        /**
         * @inheritdoc
         */
        ObservableSet.prototype.createCounter = function (config) {
            return new ObservableSet.Counter(this, config);
        };
        /**
         * @inheritdoc
         */
        ObservableSet.prototype.createObserver = function (config) {
            return new ObservableSet.Observer(this, config);
        };
        /**
         * @inheritdoc
         */
        ObservableSet.prototype.createOrderer = function (config) {
            return new ObservableSet.Orderer(this, config);
        };
        /**
         * @inheritdoc
         */
        ObservableSet.prototype.createSorterComparing = function (config) {
            return new ObservableSet.SorterComparing(this, config);
        };
        /**
         * @inheritdoc
         */
        ObservableSet.prototype.createIndexer = function (config) {
            return new ObservableSet.Indexer(this, config);
        };
        /**
         * @inheritdoc
         */
        ObservableSet.prototype.createLister = function (config) {
            return new ObservableSet.Lister(this, config);
        };
        return ObservableSet;
    })(JW.AbstractSet);
    JW.ObservableSet = ObservableSet;
    var ObservableSet;
    (function (ObservableSet) {
        /**
         * [[JW.AbstractCollection.Counter|Counter]] implementation for [[JW.ObservableSet]].
         */
        var Counter = (function (_super) {
            __extends(Counter, _super);
            /**
             * @inheritdoc
             */
            function Counter(source, config) {
                _super.call(this, source, config);
                this.own(source.spliceEvent.bind(this._onSplice, this));
                this.own(source.clearEvent.bind(this._onClear, this));
            }
            Counter.prototype._onSplice = function (params) {
                var spliceResult = params.spliceResult;
                this.target.set(this.target.get() -
                    JW.Array.count(spliceResult.removedItems, this._filterItem, this._scope) +
                    JW.Array.count(spliceResult.addedItems, this._filterItem, this._scope));
            };
            Counter.prototype._onClear = function (params) {
                this.target.set(0);
            };
            return Counter;
        })(JW.AbstractSet.Counter);
        ObservableSet.Counter = Counter;
        /**
         * [[JW.AbstractCollection.Filterer|Filterer]] implementation for [[JW.ObservableSet]].
         */
        var Filterer = (function (_super) {
            __extends(Filterer, _super);
            /**
             * @inheritdoc
             */
            function Filterer(source, config) {
                _super.call(this, source, config);
                this.own(source.spliceEvent.bind(this._onSplice, this));
                this.own(source.clearEvent.bind(this._onClear, this));
            }
            Filterer.prototype._onSplice = function (params) {
                var spliceResult = params.spliceResult;
                this.target.trySplice(spliceResult.removedItems, JW.Array.filter(spliceResult.addedItems, this._filterItem, this._scope));
            };
            Filterer.prototype._onClear = function (params) {
                this.target.tryRemoveAll(params.items);
            };
            return Filterer;
        })(JW.AbstractSet.Filterer);
        ObservableSet.Filterer = Filterer;
        /**
         * [[JW.AbstractCollection.Indexer|Indexer]] implementation for [[JW.ObservableSet]].
         */
        var Indexer = (function (_super) {
            __extends(Indexer, _super);
            /**
             * @inheritdoc
             */
            function Indexer(source, config) {
                _super.call(this, source, config);
                this.own(source.spliceEvent.bind(this._onSplice, this));
                this.own(source.clearEvent.bind(this._onClear, this));
            }
            Indexer.prototype._onSplice = function (params) {
                var spliceResult = params.spliceResult;
                this.target.trySplice(this._keys(spliceResult.removedItems), this._index(spliceResult.addedItems));
            };
            Indexer.prototype._onClear = function (params) {
                this.target.tryRemoveAll(this._keys(params.items));
            };
            return Indexer;
        })(JW.AbstractSet.Indexer);
        ObservableSet.Indexer = Indexer;
        /**
         * [[JW.AbstractCollection.Lister|Lister]] implementation for [[JW.ObservableSet]].
         */
        var Lister = (function (_super) {
            __extends(Lister, _super);
            /**
             * @inheritdoc
             */
            function Lister(source, config) {
                _super.call(this, source, config);
                this.own(source.spliceEvent.bind(this._onSplice, this));
                this.own(source.clearEvent.bind(this._onClear, this));
            }
            Lister.prototype._onSplice = function (params) {
                var spliceResult = params.spliceResult;
                this.target.trySplice(spliceResult.removedItems, spliceResult.addedItems);
            };
            Lister.prototype._onClear = function (params) {
                this.target.tryRemoveAll(params.items);
            };
            return Lister;
        })(JW.AbstractSet.Lister);
        ObservableSet.Lister = Lister;
        /**
         * [[JW.AbstractCollection.Mapper|Mapper]] implementation for [[JW.ObservableSet]].
         */
        var Mapper = (function (_super) {
            __extends(Mapper, _super);
            /**
             * @inheritdoc
             */
            function Mapper(source, config) {
                _super.call(this, source, config);
                this.own(source.spliceEvent.bind(this._onSplice, this));
                this.own(source.clearEvent.bind(this._onClear, this));
            }
            Mapper.prototype._onSplice = function (params) {
                var spliceResult = params.spliceResult;
                var removedDatas = spliceResult.removedItems;
                var addedDatas = spliceResult.addedItems;
                this.target.trySplice(this._getItems(removedDatas), this._createItems(addedDatas));
                this._destroyItems(removedDatas);
            };
            Mapper.prototype._onClear = function (params) {
                var datas = params.items;
                this.target.tryRemoveAll(this._getItems(datas));
                this._destroyItems(datas);
            };
            return Mapper;
        })(JW.AbstractSet.Mapper);
        ObservableSet.Mapper = Mapper;
        /**
         * [[JW.AbstractCollection.Observer|Observer]] implementation for [[JW.ObservableSet]].
         */
        var Observer = (function (_super) {
            __extends(Observer, _super);
            /**
             * @inheritdoc
             */
            function Observer(source, config) {
                _super.call(this, source, config);
                this.own(source.spliceEvent.bind(this._onSplice, this));
                this.own(source.clearEvent.bind(this._onClear, this));
                if (this._change) {
                    this.own(source.changeEvent.bind(this._onChange, this));
                }
            }
            Observer.prototype._onSplice = function (params) {
                var spliceResult = params.spliceResult;
                this._removeItems(spliceResult.removedItems);
                this._addItems(spliceResult.addedItems);
            };
            Observer.prototype._onClear = function (params) {
                this._doClearItems(params.items);
            };
            return Observer;
        })(JW.AbstractSet.Observer);
        ObservableSet.Observer = Observer;
        /**
         * [[JW.AbstractCollection.Orderer|Orderer]] implementation for [[JW.ObservableSet]].
         */
        var Orderer = (function (_super) {
            __extends(Orderer, _super);
            /**
             * @inheritdoc
             */
            function Orderer(source, config) {
                _super.call(this, source, config);
                this.own(source.spliceEvent.bind(this._onSplice, this));
                this.own(source.clearEvent.bind(this._onClear, this));
            }
            Orderer.prototype._onSplice = function (params) {
                var spliceResult = params.spliceResult;
                this._splice(JW.Array.toSet(spliceResult.removedItems), JW.Array.toSet(spliceResult.addedItems));
            };
            Orderer.prototype._onClear = function (params) {
                this.target.removeItems(params.items);
            };
            return Orderer;
        })(JW.AbstractSet.Orderer);
        ObservableSet.Orderer = Orderer;
        /**
         * [[JW.AbstractCollection.SorterComparing|SorterComparing]] implementation for [[JW.ObservableSet]].
         */
        var SorterComparing = (function (_super) {
            __extends(SorterComparing, _super);
            /**
             * @inheritdoc
             */
            function SorterComparing(source, config) {
                _super.call(this, source, config);
                this.own(source.spliceEvent.bind(this._onSplice, this));
                this.own(source.clearEvent.bind(this._onClear, this));
            }
            SorterComparing.prototype._onSplice = function (params) {
                var spliceResult = params.spliceResult;
                this._splice(spliceResult.removedItems, spliceResult.addedItems);
            };
            SorterComparing.prototype._onClear = function (params) {
                this._splice(params.items, []);
            };
            return SorterComparing;
        })(JW.AbstractSet.SorterComparing);
        ObservableSet.SorterComparing = SorterComparing;
    })(ObservableSet = JW.ObservableSet || (JW.ObservableSet = {}));
})(JW || (JW = {}));
;
/// <reference path="../jwlib.ref.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JW;
(function (JW) {
    /**
     * Simple implementation of [[JW.AbstractSet]].
     *
     * @param T Collection item type.
     */
    var Set = (function (_super) {
        __extends(Set, _super);
        function Set(items, adapter) {
            _super.call(this, items, adapter);
        }
        /**
         * @inheritdoc
         */
        Set.prototype.ownItems = function () {
            _super.prototype.ownItems.call(this);
            return this;
        };
        /**
         * @inheritdoc
         */
        Set.prototype.createEmpty = function () {
            return new Set();
        };
        /**
         * @inheritdoc
         */
        Set.prototype.createEmptyArray = function () {
            return new JW.Array();
        };
        /**
         * @inheritdoc
         */
        Set.prototype.createEmptyMap = function () {
            return new JW.Map();
        };
        /**
         * @inheritdoc
         */
        Set.prototype.createEmptySet = function () {
            return new Set();
        };
        /**
         * Returns count of items in collection.
         */
        Set.getLength = function (set) {
            var length = 0;
            for (var key in set) {
                ++length;
            }
            return length;
        };
        /**
         * Checks collection for emptiness.
         */
        Set.isEmpty = function (set) {
            for (var key in set) {
                return false;
            }
            return true;
        };
        /**
         * Returns first item in collection. If collection is empty, returns undefined.
         */
        Set.getFirst = function (set) {
            for (var key in set) {
                return set[key];
            }
        };
        /**
         * Checks item for existance in collection.
         */
        Set.contains = function (set, item) {
            return set.hasOwnProperty(_JW.S(item._iid));
        };
        /**
         * Checks item for existance in collection.
         */
        Set.containsItem = function (set, item) {
            return set.hasOwnProperty(_JW.S(item._iid));
        };
        /**
         * Matches all items against criteria.
         *
         * Returns true if callback returns !== false for all collection items.
         *
         * Algorithms iterates items sequentially, and stops after first item not matching the criteria.
         *
         * @param callback Criteria callback.
         * @param scope **callback** call scope. Defaults to collection itself.
         */
        Set.every = function (set, callback, scope) {
            scope = scope || set;
            for (var iid in set) {
                if (callback.call(scope, set[iid]) === false) {
                    return false;
                }
            }
            return true;
        };
        /**
         * Matches each item against criteria.
         *
         * Returns true if callback returns !== false for some collection item.
         *
         * Algorithms iterates items sequentially, and stops after first item matching the criteria.
         *
         * @param callback Criteria callback.
         * @param scope **callback** call scope. Defaults to collection itself.
         */
        Set.some = function (set, callback, scope) {
            return !Set.every(set, function (item) {
                return callback.call(this, item) === false;
            }, scope);
        };
        /**
         * Iterates collection items. Calls specified function for all items.
         *
         * @param callback Callback function.
         * @param scope **callback** call scope. Defaults to collection itself.
         */
        Set.each = function (set, callback, scope) {
            Set.every(set, function (item) {
                callback.call(this, item);
                return true;
            }, scope);
        };
        /**
         * Finds item matching criteria.
         *
         * Returns first item for which callback returns !== false.
         *
         * Algorithms iterates items sequentially, and stops after first item matching the criteria.
         *
         * @param callback Criteria callback.
         * @param scope **callback** call scope. Defaults to collection itself.
         * @returns Found item or undefined.
         */
        Set.search = function (set, callback, scope) {
            var result;
            Set.every(set, function (item) {
                if (callback.call(this, item) !== false) {
                    result = item;
                    return false;
                }
                return true;
            }, scope);
            return result;
        };
        /**
         * Converts collection to sorted array.
         *
         * Builds array consisting of collection items sorted by result of callback call for each item.
         *
         * @param callback Indexer function. Must return a comparable value, compatible with
         * [[JW.cmp]]. Returns item itself by default.
         * @param scope **callback** call scope. Defaults to collection itself.
         * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
         * @returns Sorted array.
         */
        Set.toSorted = function (set, callback, scope, order) {
            callback = callback || function (x) { return x; };
            order = order || 1;
            var pairs = [];
            Set.every(set, function (item) {
                pairs.push([item, callback.call(this, item)]);
                return true;
            }, scope);
            pairs.sort(function (x, y) {
                return order * JW.cmp(x[1], y[1]);
            });
            return JW.Array.map(pairs, function (pair) {
                return pair[0];
            });
        };
        /**
         * Converts collection to sorted array.
         *
         * Builds array consisting of collection items sorted by result of callback call for each item.
         *
         * @param callback Indexer function. Must return a comparable value, compatible with
         * [[JW.cmp]]. Returns item itself by default.
         * @param scope **callback** call scope. Defaults to collection itself.
         * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
         * @returns Sorted array.
         */
        Set.$toSorted = function (set, callback, scope, order) {
            return new JW.Array(Set.toSorted(set, callback, scope, order), true);
        };
        /**
         * Converts collection to sorted array.
         *
         * Builds array consisting of collection items sorted by comparer.
         *
         * @param compare Comparer function. Should return positive value if t1 > t2;
         * negative value if t1 < t2; 0 if t1 == t2.
         * Defaults to [[JW.cmp]]
         * @param scope **comparer** call scope. Defaults to collection itself.
         * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
         * @returns Sorted array.
         */
        Set.toSortedComparing = function (set, compare, scope, order) {
            compare = compare || JW.cmp;
            scope = scope || set;
            order = order || 1;
            var items = Set.toArray(set);
            items.sort(function (x, y) {
                return order * compare.call(scope, x, y);
            });
            return items;
        };
        /**
         * Converts collection to sorted array.
         *
         * Builds array consisting of collection items sorted by comparer.
         *
         * @param compare Comparer function. Should return positive value if t1 > t2;
         * negative value if t1 < t2; 0 if t1 == t2.
         * Defaults to [[JW.cmp]]
         * @param scope **comparer** call scope. Defaults to collection itself.
         * @param order Sorting order. Positive number for ascending sorting, negative for descending sorting.
         * @returns Sorted array.
         */
        Set.$toSortedComparing = function (set, compare, scope, order) {
            return new JW.Array(Set.toSortedComparing(set, compare, scope, order), true);
        };
        /**
         * Indexes collection.
         *
         * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
         *
         * @param callback Indexer function.
         * @param scope **callback** call scope. Defaults to collection itself.
         * @returns Collection index.
         */
        Set.index = function (set, callback, scope) {
            var result = {};
            Set.every(set, function (item) {
                var key = callback.call(this, item);
                if (key != null) {
                    result[key] = item;
                }
                return true;
            }, scope);
            return result;
        };
        /**
         * Indexes collection.
         *
         * Builds new map by rule: key is the result of indexer function call, value is the corresponding item.
         *
         * @param callback Indexer function.
         * @param scope **callback** call scope. Defaults to collection itself.
         * @returns Collection index.
         */
        Set.$index = function (set, callback, scope) {
            return new JW.Map(Set.index(set, callback, scope), true);
        };
        /**
         * Filters collection by criteria.
         *
         * Builds new collection of the same type, consisting of items for which callback returns !== false.
         *
         * @param callback Criteria callback.
         * @param scope **callback** call scope. Defaults to collection itself.
         * @returns Filtered collection.
         */
        Set.filter = function (set, callback, scope) {
            var result = {};
            Set.every(set, function (item) {
                if (callback.call(this, item) !== false) {
                    result[item._iid] = item;
                }
                return true;
            }, scope);
            return result;
        };
        /**
         * Filters collection by criteria.
         *
         * Builds new collection of the same type, consisting of items for which callback returns !== false.
         *
         * @param callback Criteria callback.
         * @param scope **callback** call scope. Defaults to collection itself.
         * @returns Filtered collection.
         */
        Set.$filter = function (set, callback, scope) {
            return new Set(Set.filter(set, callback, scope), true);
        };
        /**
         * Counts the items matching criteria.
         *
         * Returns the number of items for which callback returns !== false.
         *
         * @param callback Criteria callback.
         * @param scope **callback** call scope. Defaults to collection itself.
         * @returns Number of items.
         */
        Set.count = function (set, callback, scope) {
            var result = 0;
            Set.every(set, function (item) {
                if (callback.call(this, item) !== false) {
                    ++result;
                }
                return true;
            }, scope);
            return result;
        };
        /**
         * Counts the items matching criteria.
         *
         * Returns the number of items for which callback returns !== false.
         *
         * @param callback Criteria callback.
         * @param scope **callback** call scope. Defaults to collection itself.
         * @returns Number of items.
         */
        Set.$count = function (set, callback, scope) {
            return new JW.Property(Set.count(set, callback, scope));
        };
        /**
         * Maps collection items.
         *
         * Builds new collection of the same type, containing results of callback call for each collection item.
         *
         * @param callback Mapping function.
         * @param scope **callback** call scope. Defaults to collection itself.
         * @returns Mapped collection.
         */
        Set.map = function (set, callback, scope) {
            var result = {};
            Set.every(set, function (item) {
                Set.tryAdd(result, callback.call(this, item));
                return true;
            }, scope);
            return result;
        };
        /**
         * Maps collection items.
         *
         * Builds new collection of the same type, containing results of callback call for each collection item.
         *
         * @param callback Mapping function.
         * @param scope **callback** call scope. Defaults to collection itself.
         * @returns Mapped collection.
         */
        Set.$map = function (set, callback, scope) {
            return new Set(Set.map(set, callback, scope), true);
        };
        /**
         * Converts collection to array.
         *
         * Builds new array consisting of collection items.
         */
        Set.toArray = function (set) {
            var result = new _JW.A(Set.getLength(set));
            var index = 0;
            Set.every(set, function (item) {
                result[index++] = item;
                return true;
            });
            return result;
        };
        /**
         * Converts collection to array.
         *
         * Builds new array consisting of collection items.
         */
        Set.$toArray = function (set) {
            return new JW.Array(Set.toArray(set), true);
        };
        /**
         * Converts collection to set.
         *
         * Builds new set consisting of collection items.
         * Requires T to extend JW.Class.
         */
        Set.toSet = function (set) {
            var result = {};
            Set.every(set, function (item) {
                Set.add(result, item);
                return true;
            });
            return result;
        };
        /**
         * Converts collection to set.
         *
         * Builds new set consisting of collection items.
         * Requires T to extend JW.Class.
         */
        Set.$toSet = function (set) {
            return new Set(Set.toSet(set), true);
        };
        /**
         * Represents collection as array.
         *
         * If this collection is array, returns it immediately.
         * Else, executes [[toArray]] method.
         * This method works usually faster than [[toArray]],
         * but please make sure that the returned array
         * won't be modified externally, because it can cause strange unexpected bugs.
         */
        Set.asArray = function (set) {
            return Set.toArray(set);
        };
        /**
         * Represents collection as array.
         *
         * If this collection is array, returns it immediately.
         * Else, executes [[toArray]] method.
         * This method works usually faster than [[toArray]],
         * but please make sure that the returned array
         * won't be modified externally, because it can cause strange unexpected bugs.
         */
        Set.$asArray = function (set) {
            return Set.$toArray(set);
        };
        /**
         * Represents collection as set.
         *
         * If this collection is set, returns it immediately.
         * Else, executes [[toSet]] method.
         * This method works usually faster than [[toSet]],
         * but please make sure that the returned set
         * won't be modified externally, because it can cause strange unexpected bugs.
         * Requires T to extend JW.Class.
         */
        Set.asSet = function (set) {
            return set;
        };
        /**
         * Represents collection as set.
         *
         * If this collection is set, returns it immediately.
         * Else, executes [[toSet]] method.
         * This method works usually faster than [[toSet]],
         * but please make sure that the returned set
         * won't be modified externally, because it can cause strange unexpected bugs.
         * Requires T to extend JW.Class.
         */
        Set.$asSet = function (set) {
            return new Set(set, true);
        };
        /**
         * Adds an item to set if one is absent.
         * @returns Item is added successfully. False if item is already present.
         */
        Set.add = function (set, item) {
            return Set.tryAdd(set, item) !== undefined;
        };
        /**
         * Adds an item to set if one is absent.
         * @returns Item is added successfully. If collection is not modified, returns undefined.
         * In other words, this method may return true or undefined.
         */
        Set.tryAdd = function (set, item) {
            var iid = _JW.S(item._iid);
            if (set.hasOwnProperty(iid)) {
                return;
            }
            set[iid] = item;
            return true;
        };
        /**
         * Adds multiple items to set, ones that are absent.
         * @returns The added items.
         */
        Set.addAll = function (set, items) {
            var result = Set.tryAddAll(set, items);
            return (result !== undefined) ? result : [];
        };
        /**
         * Adds multiple items to set, ones that are absent.
         * @returns The added items.
         */
        Set.$addAll = function (set, items) {
            return new JW.Array(Set.addAll(set, items), true);
        };
        /**
         * Adds multiple items to set, ones that are absent.
         * @returns The added items.
         * If collection is not modified, returns undefined.
         */
        Set.tryAddAll = function (set, items) {
            var addedItems = [];
            for (var i = 0, l = items.length; i < l; ++i) {
                var item = items[i];
                if (Set.tryAdd(set, item)) {
                    addedItems.push(item);
                }
            }
            if (addedItems.length !== 0) {
                return addedItems;
            }
        };
        /**
         * Removes an item from set if one is present.
         * @returns Item is removed successfully. Returns false if item is already absent.
         */
        Set.remove = function (set, item) {
            return Set.tryRemove(set, item) !== undefined;
        };
        /**
         * Removes an item from set if one is present.
         * @returns Item is removed successfully. If collection is not modified, returns undefined.
         * In other words, this method may return true or undefined.
         */
        Set.tryRemove = function (set, item) {
            var iid = _JW.S(item._iid);
            if (!set.hasOwnProperty(iid)) {
                return;
            }
            delete set[iid];
            return true;
        };
        /**
         * Removes first occurrence of an item in collection.
         */
        Set.removeItem = function (set, item) {
            Set.tryRemove(set, item);
        };
        /**
         * Removes multiple items from set, ones that are present.
         * @returns The removed items.
         */
        Set.removeAll = function (set, items) {
            var result = Set.tryRemoveAll(set, items);
            return (result !== undefined) ? result : [];
        };
        /**
         * Removes multiple items from set, ones that are present.
         * @returns The removed items.
         */
        Set.$removeAll = function (set, items) {
            return new JW.Array(Set.removeAll(set, items), true);
        };
        /**
         * Removes multiple items from set, ones that are present.
         * @returns The removed items.
         * If collection is not modified, returns undefined.
         */
        Set.tryRemoveAll = function (set, items) {
            var removedItems = [];
            for (var i = 0, l = items.length; i < l; ++i) {
                var item = items[i];
                if (Set.tryRemove(set, item)) {
                    removedItems.push(item);
                }
            }
            if (removedItems.length !== 0) {
                return removedItems;
            }
        };
        /**
         * Removes all occurrences of items in collection.
         */
        Set.removeItems = function (set, items) {
            Set.tryRemoveAll(set, items);
        };
        /**
         * Clears collection.
         * @returns Old collection contents. Never returns null or undefined.
         */
        Set.clear = function (set) {
            var result = Set.tryClear(set);
            return (result !== undefined) ? result : [];
        };
        /**
         * Clears collection.
         * @returns Old collection contents. Never returns null or undefined.
         */
        Set.$clear = function (set) {
            return new JW.Array(Set.clear(set), true);
        };
        /**
         * Clears collection.
         * @returns Old collection contents. If not modified - undefined.
         */
        Set.tryClear = function (set) {
            var items = Set.toArray(set);
            if (!items.length) {
                return;
            }
            Set.tryRemoveAll(set, items);
            return items;
        };
        /**
         * Removes and adds multiple items in set. Universal optimized granular operation of removal/insertion.
         * @param removedItems Items to remove.
         * @param addedItems Items to add.
         * @returns Splice result. Never returns null or undefined.
         */
        Set.splice = function (set, removedItems, addedItems) {
            var spliceResult = Set.trySplice(set, removedItems, addedItems);
            return (spliceResult !== undefined) ? spliceResult : { addedItems: [], removedItems: [] };
        };
        /**
         * Removes and adds multiple items in set. Universal optimized granular operation of removal/insertion.
         * @param removedItems Items to remove.
         * @param addedItems Items to add.
         * @returns Splice result.
         * If collection is not modified, returns undefined.
         */
        Set.trySplice = function (set, removedItems, addedItems) {
            var addedItemSet = new Set(addedItems);
            removedItems = JW.Array.filter(removedItems, function (item) { return !addedItemSet.contains(item); });
            removedItems = Set.tryRemoveAll(set, removedItems);
            addedItems = Set.tryAddAll(set, addedItems);
            if ((removedItems !== undefined) || (addedItems !== undefined)) {
                return { removedItems: removedItems || [], addedItems: addedItems || [] };
            }
        };
        /**
         * Detects [[splice]] method arguments to adjust set contents to **newItems**.
         * Determines which items should be removed and which ones should be added.
         * @param newItems New set contents.
         * @returns [[splice]] method arguments. If no method call required, returns undefined.
         */
        Set.detectSplice = function (oldItems, newItemArray) {
            var removedItems = [];
            var addedItems = [];
            var newItems = JW.Array.index(newItemArray, JW.byField("_iid"));
            for (var key in oldItems) {
                if (!newItems.hasOwnProperty(key)) {
                    removedItems.push(oldItems[key]);
                }
            }
            for (var key in newItems) {
                if (!oldItems.hasOwnProperty(key)) {
                    addedItems.push(newItems[key]);
                }
            }
            if ((removedItems.length !== 0) || (addedItems.length !== 0)) {
                return { removedItems: removedItems, addedItems: addedItems };
            }
        };
        /**
         * Adjusts set contents to **newItems** using [[detectSplice]] and
         * [[splice]] methods.
         * @param newItems New set contents.
         */
        Set.performSplice = function (set, newItems) {
            var spliceParams = Set.detectSplice(set, newItems);
            if (spliceParams !== undefined) {
                Set.trySplice(set, spliceParams.removedItems, spliceParams.addedItems);
            }
        };
        /**
         * Checks for equality (===) to array, item by item.
         */
        Set.equal = function (x, y) {
            if (Set.getLength(x) !== y.length) {
                return false;
            }
            for (var i = 0, l = y.length; i < l; ++i) {
                if (!x.hasOwnProperty(_JW.S(y[i]._iid))) {
                    return false;
                }
            }
            return true;
        };
        /**
         * Creates a new set containing a single item.
         */
        Set.single = function (item) {
            var result = {};
            result[item._iid] = item;
            return result;
        };
        return Set;
    })(JW.AbstractSet);
    JW.Set = Set;
})(JW || (JW = {}));
;
/// <reference path="../jwlib.ref.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JW;
(function (JW) {
    /**
     * Watches source [[JW.Property]] modification and copies
     * its value to target property.
     *
     *     var source = new JW.Property<number>(1);
     *     var target = new JW.Property<number>();
     *     var copier = new JW.Copier<number>(source, {target: target});
     *     assert.strictEqual(1, target.get());
     *     source.set(2);
     *     assert.strictEqual(2, target.get());
     *
     * If target is omitted in constructor, it is created automatically. Notice
     * that copier owns it in this case.
     *
     *     var source = new JW.Property<number>(1);
     *     var target = new JW.Copier<number>(this.source).target;
     *     assert.strictEqual(1, target.get());
     *
     * [[JW.Property]] has a shorthand method [[JW.Property.bindTo|bindTo]] for the same purpose:
     *
     *     var source = new JW.Property<number>(1);
     *     var target = new JW.Property<number>();
     *     target.bindTo(source);
     *     assert.strictEqual(1, target.get());
     *
     * @param T Property value type.
     */
    var Copier = (function (_super) {
        __extends(Copier, _super);
        /**
         * @param source Source property.
         * @param config Configuration.
         */
        function Copier(source, config) {
            _super.call(this);
            this.source = source;
            config = config || {};
            this._targetCreated = config.target == null;
            this.target = this._targetCreated ? new JW.Property() : config.target;
            this._update();
            this.own(source.changeEvent.bind(this._update, this));
        }
        Copier.prototype.destroyObject = function () {
            if (this._targetCreated) {
                this.target.destroy();
            }
            this.source = null;
            this.target = null;
            _super.prototype.destroyObject.call(this);
        };
        Copier.prototype._update = function () {
            this.target.set(this.source.get());
        };
        return Copier;
    })(JW.Class);
    JW.Copier = Copier;
})(JW || (JW = {}));
;
/// <reference path="../jwlib.ref.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JW;
(function (JW) {
    /**
     * Watches source [[JW.Property|properties]] modification and updates
     * a target property based on their values.
     *
     *     var value = new JW.Property<number>(1000);
     *     var unit = new JW.Property<string>("MW");
     *     var target = new JW.Property<string>();
     *     var functor = new JW.Functor<string>([value, unit], (value: number, unit: string) => {
     *         return value + " " + unit;
     *     }, this, {target: target});
     *     assert.strictEqual("1000 MW", target.get());
     *     value.set(1500);
     *     assert.strictEqual("1500 MW", target.get());
     *     unit.set("МВт"); // change localization to Russian
     *     assert.strictEqual("1500 МВт", target.get());
     *
     * If **target** is omitted in constructor, it is created automatically. Notice
     * that functor owns it in this case.
     *
     *     var value = new JW.Property<number>(1000);
     *     var unit = new JW.Property<string>("MW");
     *     var functor = new JW.Functor<string>([value, unit], (value: number, unit: string) => {
     *         return value + " " + unit;
     *     }, this);
     *     var target = functor.target;
     *     assert.strictEqual("1000 MW", target.get());
     *
     * Functor doesn't let you destroy a previously assigned value. Functor doesn't reset the value of target property
     * on destruction. Use [[JW.Mapper]] if you need these features.
     *
     * @param T Target property value type.
     */
    var Functor = (function (_super) {
        __extends(Functor, _super);
        /**
         * @param sources Source properties.
         * @param callback Calculates target property value based on source property values.
         * @param scope **callback** call scope. Defaults to functor itself.
         * @param config Configuration.
         */
        function Functor(sources, callback, scope, config) {
            _super.call(this);
            this.sources = sources;
            this.callback = callback;
            this.scope = scope;
            config = config || {};
            this.scope = scope || this;
            this._targetCreated = config.target == null;
            this.target = this._targetCreated ? new JW.Property() : config.target;
            this.update();
            JW.Array.each(sources, this.watch, this);
        }
        Functor.prototype.destroyObject = function () {
            if (this._targetCreated) {
                this.target.destroy();
            }
            this.sources = null;
            this.target = null;
            this.callback = null;
            this.scope = null;
            _super.prototype.destroyObject.call(this);
        };
        /**
         * Watches specified event and issues target value recalculation on
         * the event triggering.
         * @param event Event.
         * @returns this
         */
        Functor.prototype.bind = function (event) {
            this.own(event.bind(this.update, this));
            return this;
        };
        /**
         * Watches specified property and issues target value recalculation on
         * the property change.
         * @param property Property.
         * @returns this
         */
        Functor.prototype.watch = function (property) {
            return this.bind(property.changeEvent);
        };
        /**
         * Updates target property focibly.
         */
        Functor.prototype.update = function () {
            var values = JW.Array.map(this.sources, JW.byMethod("get"));
            this.target.set(this.callback.apply(this.scope, values));
        };
        return Functor;
    })(JW.Class);
    JW.Functor = Functor;
})(JW || (JW = {}));
;
/// <reference path="../jwlib.ref.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JW;
(function (JW) {
    /**
     * Watches source [[JW.Property|properties]] modification and recreates
     * a target property using specified functions. Unlike [[JW.Functor]],
     * lets you destroy a previously created value. Also, mapper resets the target
     * property value to null on destruction.
     *
     *     var count = new JW.Property<number>(1);
     *     var units = new JW.Property<string>("apples");
     *     var target = new JW.Property<string>();
     *
     *     // Next command prints "Init 1 apples" to console
     *     var mapper = new JW.Mapper<string>([count, units], {
     *         target: target,
     *         createValue: (value: number, units: string) => {
     *             var result = value + " " + units;
     *             console.log("Init " + result);
     *             return result;
     *         },
     *         destroyValue: (result: string, value: number, units: string) {
     *             console.log("Done " + result);
     *         },
     *         scope: this
     *     });
     *     assert.strictEqual("1 apples", target.get());
     *
     *     // Next command prints "Done 1 apples" and "Init 2 apples"
     *     count.set(2);
     *     assert.strictEqual("2 apples", target.get());
     *
     *     // Next command prints "Done 2 apples"
     *     mapper.destroy();
     *     assert.strictEqual(null, target.get());
     *
     * If **target** is omitted in constructor, it is created automatically. Notice
     * that mapper owns it in this case.
     *
     *     var source = new JW.Property<number>(1);
     *     var mapper = new JW.Mapper<string>([source], {
     *         createValue: (value: number): string {
     *             return value + " apples";
     *         },
     *         scope: this
     *     });
     *     var target = mapper.target;
     *     assert.strictEqual("1 apples", target.get());
     *     mapper.destroy();
     *
     * In simple cases, [[JW.Property.$$mapValue|$$mapValue]] and
     * [[JW.Property.$$mapObject|$$mapObject]] shorthand methods
     * can be used instead. They return the target property right away:
     *
     *     var source = new JW.Property<number>(1);
     *     var target = source.$$mapValue((value) => { return value + " apples"; });
     *     assert.strictEqual("1 apples", target.get());
     *     target.destroy();
     *
     * On source property change, next flow will take a place:
     *
     * 1. New value is created
     * 1. Target property is set to new value
     * 1. Old value is destroyed
     *
     * In contrast, [[JW.Switcher]]'s flow is opposite:
     *
     * 1. [[JW.Switcher.Config.done|done]] method is called
     * 1. [[JW.Switcher.Config.init|init]] method is called
     *
     * Common use case for mapper is replaceable child component creation by data:
     *
     *     class MyComponent extends JW.UI.Component {
     *         constructor(private document: JW.Property<MyDocument>) {
     *             super();
     *         }
     *
     *         renderDocument(): any {
     *             return this.own(this.document.$$mapObject((document) => {
     *                 return new MyDocumentView(document);
     *             }));
     *         }
     *     }
     *
     *     JW.UI.template(MyComponent, {
     *         main:
     *             '<div jwclass="my-component">' +
     *                 '<div jwid="document"></div>' +
     *             '</div>'
     *     });
     *
     * Also, mapper allows you to chain property calculations. Assume that you have several folders and
     * several files in each folder. One folder is selected, and each folder has a selected file inside. You
     * want to create a file view by a currently selected folder and a currently selected file there. Do this:
     *
     *     class Folder extends JW.Class {
     *         selectedFile = this.own(new JW.Property<File>());
     *     }
     *
     *     class App extends JW.Class {
     *         selectedFolder = this.own(new JW.Property<Folder>());
     *         fileView = this.own(new JW.Property<FileView>());
     *
     *         constructor() {
     *             super();
     *             this.own(this.selectedFolder.$$mapObject((folder) => {
     *                 return new JW.Mapper<FileView>([folder.selectedFile], {
     *                     target: this.fileView,
     *                     createValue: (file: File) => {
     *                         return new FileView(folder, file);
     *                     },
     *                     destroyValue: JW.destroy,
     *                     scope: this
     *                 });
     *             }, this));
     *         }
     *     }
     *
     * By default, mapper doesn't call the callbacks if at least one of the source values is null. You can change it
     * via [[JW.Mapper.Config.acceptNull|acceptNull]] option.
     *
     * @param T Target property value type.
     */
    var Mapper = (function (_super) {
        __extends(Mapper, _super);
        /**
         * @param sources Source properties.
         * @param config Configuration.
         */
        function Mapper(sources, config) {
            _super.call(this);
            this.sources = sources;
            this._createValue = config.createValue;
            this._destroyValue = config.destroyValue;
            this._scope = config.scope || this;
            this._targetCreated = config.target == null;
            this.target = this._targetCreated ? new JW.Property() : config.target;
            this._acceptNull = config.acceptNull || false;
            this._sourceValues = null;
            this._targetValue = null;
            this.update();
            JW.Array.each(sources, this.watch, this);
        }
        Mapper.prototype.destroyObject = function () {
            var oldValue = this.target.get();
            if (oldValue === this._targetValue) {
                this.target.set(null);
            }
            this._done();
            if (this._targetCreated) {
                this.target.destroy();
            }
            this.sources = null;
            this._createValue = null;
            this._destroyValue = null;
            this._scope = null;
            this.target = null;
            this._sourceValues = null;
            this._targetValue = null;
            _super.prototype.destroyObject.call(this);
        };
        /**
         * Watches specified event and issues target value recalculation on
         * the event triggering.
         * @param event Event.
         * @returns this
         */
        Mapper.prototype.bind = function (event) {
            this.own(event.bind(this.update, this));
            return this;
        };
        /**
         * Watches specified property and issues target value recalculation on
         * the property change.
         * @param property Property.
         * @returns this
         */
        Mapper.prototype.watch = function (property) {
            return this.bind(property.changeEvent);
        };
        /**
         * Updates target property focibly.
         */
        Mapper.prototype.update = function () {
            var values = JW.Array.map(this.sources, JW.byMethod("get"));
            var newValue;
            if (this._acceptNull || JW.Array.every(values, JW.isSet)) {
                newValue = this._createValue.apply(this._scope, values);
            }
            else {
                newValue = null;
                values = null;
            }
            this.target.set(newValue);
            this._done();
            this._targetValue = newValue;
            this._sourceValues = values;
        };
        Mapper.prototype._done = function () {
            if (this._destroyValue && this._sourceValues) {
                this._destroyValue.apply(this._scope, [this._targetValue].concat(this._sourceValues));
            }
        };
        return Mapper;
    })(JW.Class);
    JW.Mapper = Mapper;
})(JW || (JW = {}));
;
/// <reference path="../jwlib.ref.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JW;
(function (JW) {
    /**
     * The observable property. A convenient way to keep an object in sync
     * with another object. Has the next helpers:
     *
     * - [[JW.Copier]] - keeps one property equal to another property
     * - [[JW.Updater]] - watches several properties in order to update something by
     * a callback
     * - [[JW.Functor]] - watches several properties in order to reassign target
     * property value to a callback result
     * - [[JW.Mapper]] - watches several properties in order to recreate and destroy
     * target property value by callbacks
     * - [[JW.Switcher]] - watches a property to initialize and release its value
     *
     * Also, see [[JQuery|jQuery extension methods]].
     *
     * For example, you can use the next algorithm to change localization on fly
     * in your Web application:
     *
     *     var locale: any = {
     *         en: {
     *             hi: "Hi",
     *             bye: "Bye"
     *         },
     *         ru: {
     *             hi: "Привет",
     *             bye: "Пока"
     *         }
     *     };
     *     var language = new JW.Property<string>("en");
     *     var hi = language.$$mapValue<string>((language) => { return locale[language].hi; });
     *     var bye = language.$$mapValue<string>((language) => { return locale[language].bye; });
     *     $("#hi").jwtext(hi);
     *     $("#bye").jwtext(bye);
     *     // Now you can change localization easily
     *     language.set("ru");
     *
     * @param V Property value type.
     */
    var Property = (function (_super) {
        __extends(Property, _super);
        /**
         * @param _value Initial value.
         */
        function Property(_value) {
            if (_value === void 0) { _value = null; }
            _super.call(this);
            this._value = _value;
            this._ownsValue = false;
            this._copier = null;
            /**
             * Property value is changed. Triggered in result of [[set]] method call if the value has been changed.
             */
            this.changeEvent = this.own(new JW.Event());
        }
        Property.prototype.destroyObject = function () {
            this.bindTo();
            if (this._ownsValue && (this._value != null)) {
                this._value.destroy();
            }
            _super.prototype.destroyObject.call(this);
        };
        /**
         * Returns property value.
         */
        Property.prototype.get = function () {
            return this._value;
        };
        /**
         * Changes property value and triggers [[changeEvent]] if the value has been changed.
         */
        Property.prototype.set = function (value) {
            if (value === undefined) {
                value = null;
            }
            var oldValue = this._value;
            if (oldValue === value) {
                return;
            }
            this._value = value;
            this.changeEvent.trigger({ sender: this, value: value, oldValue: oldValue });
            if (this._ownsValue && (oldValue != null)) {
                oldValue.destroy();
            }
        };
        /**
         * Makes this property an owner of its value. It means that the value is
         * destroyed automatically on reassignment or destruction of the
         * property.
         * @returns this
         */
        Property.prototype.ownValue = function () {
            this._ownsValue = true;
            return this;
        };
        /**
         * Binds this property to another property using a [[JW.Copier]].
         * Unbinds a previously bound property.
         *
         * @param source Source property to bind to. Omit to simply unbind.
         */
        Property.prototype.bindTo = function (source) {
            if (this._copier != null) {
                this._copier.destroy();
                this._copier = null;
            }
            if (source != null) {
                this._copier = new JW.Copier(source, { target: this });
            }
        };
        /**
         * Maps property value.
         *
         * If property value is null or undefined, returns null.
         * Otherwise, returns the result of mapping function call with property value as argument.
         *
         * @param callback Mapping function.
         * @param scope **callback** call scope. Defaults to property itself.
         * @returns Result value.
         */
        Property.prototype.map = function (callback, scope) {
            return (this._value == null) ? null : callback.call(scope || this, this._value);
        };
        /**
         * Returns a property containing the result of [[map]] method call with the same arguments.
         *
         * @param callback Mapping function.
         * @param scope **callback** call scope. Defaults to property itself.
         * @returns Result property.
         */
        Property.prototype.$map = function (callback, scope) {
            return new Property(this.map(callback, scope));
        };
        /**
         * Works the same way as [[$map]] but also starts synchronization.
         * To stop synchronization, destroy the result property.
         * In comparison to [[$$mapObject]] method, doesn't destroy previously assigned values.
         *
         * @param callback Mapping function.
         * @param scope **callback** call scope. Defaults to property itself.
         * @returns Result property.
         */
        Property.prototype.$$mapValue = function (callback, scope) {
            var result = new Property();
            result.own(new JW.Mapper([this], {
                target: result,
                createValue: callback,
                scope: scope || this
            }));
            return result;
        };
        /**
         * Works the same way as [[$map]] but also starts synchronization.
         * To stop synchronization, destroy the result property.
         * In comparison to [[$$mapValue]] method, destroys previously assigned values.
         *
         * @param callback Mapping function.
         * @param scope **callback** call scope. Defaults to property itself.
         * @returns Result property.
         */
        Property.prototype.$$mapObject = function (callback, scope) {
            var result = new Property();
            result.own(new JW.Mapper([this], {
                target: result,
                createValue: callback,
                destroyValue: JW.destroy,
                scope: scope || this
            }));
            return result;
        };
        return Property;
    })(JW.Class);
    JW.Property = Property;
})(JW || (JW = {}));
;
/// <reference path="../jwlib.ref.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JW;
(function (JW) {
    /**
     * Watches source [[JW.Property|properties]] modification and calls
     * the specified functions.
     *
     * [[JW.Switcher.Config.init|init]] function is called on switcher
     * initialization and on property change. The new values of the properties are passed as arguments.
     *
     * [[JW.Switcher.Config.done|done]] function is called on property
     * change and on switcher destruction. The old values of the properties are passed as arguments.
     *
     *     var property = new JW.Property<number>(1);
     *     var switcher = new JW.Switcher([property], {
     *         init: (value: number) => {
     *             console.log("Init " + value);
     *         },
     *         done: (value: number) => {
     *             console.log("Done " + value);
     *         },
     *         scope: this
     *     });                 // output: Init 1
     *     property.set(2);    // output: Done 1, Init 2
     *     property.set(null); // output: Done 2
     *     property.set(3);    // output: Init 3
     *     switcher.destroy(); // output: Done 3
     *
     * By default, switcher doesn't call the callbacks if at least one of the source values is null. You can change it
     * via [[JW.Switcher.Config.acceptNull|acceptNull]] option.
     *
     * Realistic use case for switcher is represented in the next example:
     *
     *     this.selectedFile = this.own(new JW.Property<File>());
     *     this.own(new JW.Switcher([this.selectedFile], {
     *         init: function(file) {
     *             file.selected.set(true);
     *         },
     *         done: function(file) {
     *             file.selected.set(false);
     *         },
     *         scope: this
     *     }));
     */
    var Switcher = (function (_super) {
        __extends(Switcher, _super);
        /**
         * @param sources Source properties.
         * @param config Configuration.
         */
        function Switcher(sources, config) {
            _super.call(this);
            this.sources = sources;
            config = config || {};
            this._init = config.init;
            this._done = config.done;
            this._scope = config.scope || this;
            this._acceptNull = config.acceptNull || false;
            this._sourceValues = null;
            this._doInit();
            JW.Array.each(sources, this.watch, this);
        }
        Switcher.prototype.destroyObject = function () {
            this._doDone();
            this.sources = null;
            this._init = null;
            this._done = null;
            this._scope = null;
            this._sourceValues = null;
            _super.prototype.destroyObject.call(this);
        };
        /**
         * Watches specified event and issues switcher update on the event triggering.
         * @param event Event.
         * @returns this
         */
        Switcher.prototype.bind = function (event) {
            this.own(event.bind(this.update, this));
            return this;
        };
        /**
         * Watches specified property and issues switcher update on the property change.
         * @param property Property.
         * @returns this
         */
        Switcher.prototype.watch = function (property) {
            return this.bind(property.changeEvent);
        };
        /**
         * Updates switcher forcibly.
         */
        Switcher.prototype.update = function () {
            this._doDone();
            this._doInit();
        };
        Switcher.prototype._doInit = function () {
            var values = JW.Array.map(this.sources, JW.byMethod("get"));
            this._sourceValues = (this._acceptNull || JW.Array.every(values, JW.isSet)) ? values : null;
            if (this._sourceValues && this._init) {
                this._init.apply(this._scope, this._sourceValues);
            }
        };
        Switcher.prototype._doDone = function () {
            if (this._sourceValues && this._done) {
                this._done.apply(this._scope, this._sourceValues);
            }
            this._sourceValues = null;
        };
        return Switcher;
    })(JW.Class);
    JW.Switcher = Switcher;
})(JW || (JW = {}));
;
/// <reference path="../jwlib.ref.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JW;
(function (JW) {
    /**
     * Watches source [[JW.Property|properties]] modification and calls
     * the specified function passing property values as arguments. Also, the
     * function is called on updater initialization.
     *
     *     var frequency = new JW.Property<number>(106.2);
     *     var wave = new JW.Property<string>("FM");
     *     var updater = new JW.Updater([frequency, wave], (frequency: number, wave: string) => {
     *         console.log("Running radio on wave " + frequency + " " + wave);
     *     }, this);           // output: Running radio on wave 106.2 FM
     *     frequency.set(105); // output: Running radio on wave 105 FM
     *     wave.set("USW");    // output: Running radio on wave 105 USW
     */
    var Updater = (function (_super) {
        __extends(Updater, _super);
        /**
         * @param sources Source properties.
         * @param callback Callback function.
         * @param scope **callback** call scope. Defaults to updater itself.
         */
        function Updater(sources, callback, scope) {
            _super.call(this);
            this.sources = sources;
            this.callback = callback;
            this.scope = scope;
            this.scope = scope || this;
            this.update();
            JW.Array.each(sources, this.watch, this);
        }
        /**
         * Watches specified event and issues function call on the event triggering.
         * @param event Event.
         * @returns this
         */
        Updater.prototype.bind = function (event) {
            this.own(event.bind(this.update, this));
            return this;
        };
        /**
         * Watches specified property and issues function call on the property change.
         * @param property Property.
         * @returns this
         */
        Updater.prototype.watch = function (property) {
            return this.bind(property.changeEvent);
        };
        /**
         * Calls function focibly.
         */
        Updater.prototype.update = function () {
            var values = JW.Array.map(this.sources, JW.byMethod("get"));
            this.callback.apply(this.scope, values);
        };
        return Updater;
    })(JW.Class);
    JW.Updater = Updater;
})(JW || (JW = {}));
;
/// <reference path="../jwlib.ref.ts" />
var JW;
(function (JW) {
    /**
     * Registry of objects indexed by id.
     *
     * Unlike enum, registry operates real objects, not integers.
     *
     * Unlike dictionary, forces objects to have an id field and provides immediate array representation.
     *
     * * [[items]] field contains item dictionary.
     * * [[itemArray]] field contains item array in registering order.
     *
     * The next example demonstrates the registry of time units: days and months.
     *
     *     interface TimeUnit {
     *         id: string;
     *         add(date: Date, count: number);
     *     }
     *
     *     var timeUnits = new JW.Registry<TimeUnit>();
     *
     *     timeUnits.registerItem({
     *         id: "day",
     *         add: function(date: Date, count: number) {
     *             date.setDate(date.getDate() + count);
     *         }
     *     });
     *
     *     timeUnits.registerItem({
     *         id: "month",
     *         add: function(date: Date, count: number) {
     *             date.setMonth(date.getMonth() + count);
     *         }
     *     });
     *
     * Now we can operate abstract time units in code:
     *
     *     function addDate(date: Date, count: number, unit: string) {
     *         timeUnits.items[unit].add(date, count);
     *     }
     *
     *     var date = new Date(2000, 0, 1); // January 1st
     *     addDate(date, 40, "day");
     *     assert.strictEqual(date.getFullYear(), 2000);
     *     assert.strictEqual(date.getMonth(), 1); // February
     *     assert.strictEqual(date.getDate(), 10); // 10th
     *
     * @param T Registry item type.
     */
    var Registry = (function () {
        /**
         * @param idField id field name.
         */
        function Registry(idField) {
            if (idField === void 0) { idField = "id"; }
            this.idField = idField;
            /**
             * Mapping from item id to an item.
             */
            this.items = {};
            /**
             * Array of all items in registering order.
             */
            this.itemArray = [];
        }
        /**
         * Registers a new item. Item must have an id field specified in registry constructor.
         */
        Registry.prototype.registerItem = function (item) {
            this.items[item[this.idField]] = item;
            this.itemArray.push(item);
        };
        /**
         * Returns id of an item.
         */
        Registry.prototype.getId = function (item) {
            return item[this.idField];
        };
        return Registry;
    })();
    JW.Registry = Registry;
})(JW || (JW = {}));
;
/// <reference path="../jwlib.ref.ts" />
var JW;
(function (JW) {
    /**
     * String manipulation utilities.
     */
    var String;
    (function (String) {
        /**
         * Escapes special HTML symbols.
         * Converts symbols &amp;, &gt;, &lt;, &quot; to `&amp;` `&gt;` `&lt;` `&quot;` correspondingly.
         *
         * @deprecated Use Underscore's _.escape instead.
         */
        function htmlEncode(str) {
            return _JW.S(str).
                replace(/&/g, "&amp;").
                replace(/>/g, "&gt;").
                replace(/</g, "&lt;").
                replace(/"/g, "&quot;");
        }
        String.htmlEncode = htmlEncode;
        /**
         * Unescapes special HTML symbols.
         * Converts sequences `&amp;` `&gt;` `&lt;` `&quot;` to &amp;, &gt;, &lt;, &quot; correspondingly.
         *
         * @deprecated Use Underscore's _.unescape instead.
         */
        function htmlDecode(str) {
            return _JW.S(str).
                replace(/&quot;/g, '"').
                replace(/&lt;/g, "<").
                replace(/&gt;/g, ">").
                replace(/&amp;/g, "&");
        }
        String.htmlDecode = htmlDecode;
        /**
         * Removes script tags from HTML.
         *
         * @deprecated Doesn't line up with other jWidget functions.
         */
        function removeScripts(target) {
            target = _JW.S(target);
            var result = [];
            var index = 0;
            while (true) {
                var from = target.indexOf("<script", index);
                if (from === -1) {
                    break;
                }
                result.push(target.substr(index, from - index));
                index = target.indexOf("</script>", from) + 9;
                if (index === -1) {
                    return result.join("");
                }
            }
            result.push(target.substr(index));
            return result.join("");
        }
        String.removeScripts = removeScripts;
        /**
         * Shortens the string to specified length. If string is short enough, it stays the same.
         * Otherwise it is cutted and **ellipsis** substring is appended so that the result string length
         * equals to **length**.
         *
         * @param str Input string.
         * @param length Maximum length of resulting string.
         * @param ellipsis String tail for shortening. Defaults to `...`
         * @returns Result string.
         */
        function ellipsis(str, length, ellipsis) {
            str = _JW.S(str);
            if (str.length <= length) {
                return str;
            }
            ellipsis = JW.defn(ellipsis, "...");
            return str.substr(0, length - ellipsis.length) + ellipsis;
        }
        String.ellipsis = ellipsis;
        /**
         * Prepends string with specified symbol at the beginning to adjust to specified length.
         * If string is long enough, it stays the same.
         *
         *     JW.strings.prepend("123", 5, "0")  // "00123"
         *
         * @param str Input string.
         * @param length Minimum length of resulting string.
         * @param ch Symbol to prepend.
         * @returns Result string.
         */
        function prepend(str, length, ch) {
            str = _JW.S(str);
            var buf = [];
            length -= str.length;
            for (var i = 0; i < length; ++i) {
                buf.push(ch);
            }
            buf.push(str);
            return buf.join("");
        }
        String.prepend = prepend;
        /**
         * Capitalizes first symbol.
         *
         *     JW.strings.capitalize("vasya")  // "Vasya"
         */
        function capitalize(str) {
            return _JW.S(str).charAt(0).toUpperCase() + str.substr(1);
        }
        String.capitalize = capitalize;
        /**
         * Converts hyphen-style to camelStyle.
         *
         *     JW.strings.camel("i-love-js")  // "iLoveJs"
         */
        function camel(str) {
            return _JW.S(str).replace(/-([a-z])/ig, _fcamel);
        }
        String.camel = camel;
        /**
         * Converts camelStyle to hyphen-style.
         *
         *     JW.strings.hyphen("iLoveJs")  // "i-love-js"
         */
        function hyphen(str) {
            return _JW.S(str).replace(/([A-Z])/g, _fhyphen);
        }
        String.hyphen = hyphen;
        /**
         * Removes whitespace symbols at begin and end of string.
         *
         *     JW.strings.trim("\t\tI love JS!    ")  // "I love JS!"
         *
         * @deprecated Use JavaScript native **trim** method instead.
         */
        function trim(target) {
            return _JW.S(target).replace(/^\s*/, "").replace(/\s*$/, "");
        }
        String.trim = trim;
        function parseClass(str) {
            if (JW.isArray(str)) {
                var result = [];
                for (var i = 0; i < str.length; ++i) {
                    result.push.apply(result, parseClass(str[i]));
                }
                return result;
            }
            if (typeof str === "string") {
                str = trim(str);
                if (str === "") {
                    return [];
                }
                return str.split(/\s+/);
            }
            return [];
        }
        String.parseClass = parseClass;
        function _fcamel(a, b) {
            return b.toUpperCase();
        }
        function _fhyphen(a, b) {
            return "-" + b.toLowerCase();
        }
    })(String = JW.String || (JW.String = {}));
})(JW || (JW = {}));
;
/// <reference path="../jwlib.ref.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JW;
(function (JW) {
    var BaseTimeout = (function (_super) {
        __extends(BaseTimeout, _super);
        /**
         * @param callback Timeout callback function.
         * @param scope Call scope of callback.
         * @param delay Timeout delay.
         */
        function BaseTimeout(callback, scope, delay) {
            _super.call(this);
            if ((scope != null) && (typeof scope === "object")) {
                callback = JW.inScope(callback, scope);
            }
            else if (typeof scope === "number") {
                delay = scope;
            }
            var init = this._init;
            this._timeout = init(callback, delay);
        }
        BaseTimeout.prototype.destroyObject = function () {
            var done = this._done;
            done(this._timeout);
            _super.prototype.destroyObject.call(this);
        };
        return BaseTimeout;
    })(JW.Class);
    JW.BaseTimeout = BaseTimeout;
    /**
     * jWidget wrapper over setTimeout function.
     * JW.Timeout destruction causes clearTimeout invocation.
     * Convenient to use in combination with "own" method:
     *
     *     this.own(new JW.Timeout(this._update, this, 1000));
     */
    var Timeout = (function (_super) {
        __extends(Timeout, _super);
        function Timeout() {
            _super.apply(this, arguments);
        }
        return Timeout;
    })(BaseTimeout);
    JW.Timeout = Timeout;
    Timeout.prototype._init = setTimeout;
    Timeout.prototype._done = clearTimeout;
    /**
     * jWidget wrapper over setInterval function.
     * JW.Interval destruction causes clearInterval invocation.
     * Convenient to use in combination with "own" method:
     *
     *     this.own(new JW.Interval(this._update, this, 1000));
     */
    var Interval = (function (_super) {
        __extends(Interval, _super);
        function Interval() {
            _super.apply(this, arguments);
        }
        return Interval;
    })(BaseTimeout);
    JW.Interval = Interval;
    Interval.prototype._init = setInterval;
    Interval.prototype._done = clearInterval;
})(JW || (JW = {}));
;
// TypeScript has fancy syntax for class inheritance.
// In JavaScript, this snippet of code introduces 'this._super' syntax for 'JW.extend' inheritance.
JW.ClassUtil = {
	_iid: 0,

	_fnTest: /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/,

	extend: function(subc, supc, body) {
		body = body || {};

		var F = function() {};
		F.prototype = supc.prototype;
		subc.prototype = new F();
		subc.prototype.constructor = subc;
		subc.superclass = supc.prototype;
		subc._super = supc;
		for (var i in body) {
			subc.prototype[i] = JW.ClassUtil.extendMethod(body[i], supc.prototype[i]);
		}
		subc.extend = function(body) {
			var f = function() {
				subc.apply(this, arguments);
			};
			JW.extend(f, subc, body);
			return f;
		};
		return subc;
	},

	extendMethod: function(sub, sup) {
		if ((typeof sup !== "function") ||
			(typeof sub !== "function") ||
			sub.superclass ||
			!JW.ClassUtil._fnTest.test(sub)) {
			return sub;
		}
		return function() {
			var tmp = this._super;
			this._super = sup;
			var result = sub.apply(this, arguments);
			this._super = tmp;
			return result;
		}
	}
};

JW.extend = JW.ClassUtil.extend;

JW.Class.extend = function(body) {
	var f = function() {
		JW.Class.apply(this, arguments);
	};
	JW.extend(f, JW.Class, body);
	return f;
};
;