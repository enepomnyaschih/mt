/*!
	jWidget Lib 0.7
	
	http://enepomnyaschih.github.io/jwidget/#!/guide/home
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

if (typeof JW !== "undefined") {
	throw new Error("Can't initialize jWidget Lib: JW namespace already defined");
}

(typeof window === "undefined" ? global : window).JW = {};

/**
 * @class JW
 *
 * Основное пространство имен библиотеки jWidget.
 */

/**
 * @property {Object}
 *
 * Корневое пространство имен. Введено для обеспечения совместимости между JavaScript и NodeJS. Равно window в
 * браузерной среде и global в среде NodeJS.
 *
 * @static
 */
JW.global = (typeof window === "undefined" ? global : window);

/**
 * По очереди перебирает объекты, переданные после первого аргумента, и копирует все их элементы (поля/методы) в объект
 * target, после чего возвращает объект target. Элементы объектов-источников, значения которых равны undefined, будут
 * проигнорированы. Пустые объекты-источники (undefined, null) будут проигнорированы.
 *
 * Функция меняет объект target!
 * 
 * Пример 1:
 * 
 *     var x = {         var y = {         // Результат = {
 *         a: 10,                          //     a: 10,
 *         b: 20,            b: 30,        //     b: 30,
 *         c: null,          c: 40,        //     c: 40,
 *         d: undefined,     d: 50,        //     d: 50,
 *         e: null                         //     e: null,
 *                           f: 60,        //     f: 60
 *                           g: undefined  // 
 *     };                };                // };
 *     
 *     JW.applyIf(x, y);
 * 
 * Пример 2 (построение данных формы):
 * 
 *     My.Form = JW.Class.extend({
 *         // Object data;
 *         
 *         composeData: function(extraData) {
 *             return JW.apply({}, this.getDefaultData(), this.data, extraData);
 *         },
 *         
 *         // virtual
 *         getDefaultData: function() {
 *             return null;
 *         }
 *     });
 *
 * @static
 *
 * @param {Object} target
 * Целевой объект.
 *
 * @param {Object} [sources]
 * Объекты-источники.
 *
 * @returns {Object}
 * Возвращает target.
 */
JW.apply = function(target /*, sources */) {
	for (var i = 1; i < arguments.length; ++i) {
		var source = arguments[i];
		if (!source) {
			continue;
		}
		for (var key in source) {
			if (typeof source[key] !== "undefined") {
				target[key] = source[key];
			}
		}
	}
	return target;
};

JW.apply(JW, {
	/**
	 * Проверяет, является ли переменная undefined.
	 * @static
	 * @param {Mixed} x Переменная.
	 * @returns {boolean} Переменная является undefined.
	 */
	isUndefined: function(v) {
		return v === undefined;
	},
	
	/**
	 * Проверяет, что переменная не undefined.
	 * @static
	 * @param {Mixed} x Переменная.
	 * @returns {boolean} Переменная не является undefined.
	 */
	isDefined: function(v) {
		return v !== undefined;
	},
	
	/**
	 * Проверяет, является ли переменная null.
	 * @static
	 * @param {Mixed} x Переменная.
	 * @returns {boolean} Переменная является null.
	 */
	isNull: function(v) {
		return v === null;
	},
	
	/**
	 * Проверяет, что переменная не null.
	 * @static
	 * @param {Mixed} x Переменная.
	 * @returns {boolean} Переменная не является null.
	 */
	isNotNull: function(v) {
		return v !== null;
	},
	
	/**
	 * Проверяет, что переменная не undefined и не null.
	 * @static
	 * @param {Mixed} x Переменная.
	 * @returns {boolean} Переменная не undefined и не null.
	 */
	isSet: function(v) {
		return (v !== undefined) && (v !== null);
	},
	
	/**
	 * Проверяет, что переменная undefined или null.
	 * @static
	 * @param {Mixed} x Переменная.
	 * @returns {boolean} Переменная undefined или null.
	 */
	isNotSet: function(v) {
		return (v === undefined) || (v === null);
	},
	
	/**
	 * Проверяет, что переменная пуста (`null`, `undefined`, `false`, 0 или пустая строка).
	 * @static
	 * @param {Mixed} x Переменная.
	 * @returns {boolean} Переменная пуста.
	 */
	isBlank: function(v) {
		return !v;
	},
	
	/**
	 * Проверяет, что переменная не пуста (`null`, `undefined`, `false`, 0 или пустая строка).
	 * @static
	 * @param {Mixed} x Переменная.
	 * @returns {boolean} Переменная не пуста.
	 */
	isNotBlank: function(v) {
		return Boolean(v);
	},
	
	/**
	 * Проверяет, что переменная является целым числом.
	 * @static
	 * @param {Mixed} x Переменная.
	 * @returns {boolean} Переменная является целым числом.
	 */
	isInt: function(v) {
		return (typeof v === "number") && Math.round(v) === v;
	},
	
	/**
	 * Проверяет, что переменная является числом.
	 * @static
	 * @param {Mixed} x Переменная.
	 * @returns {boolean} Переменная является числом.
	 */
	isNumber: function(v) {
		return typeof v === "number";
	},
	
	/**
	 * Проверяет, что переменная является строкой.
	 * @static
	 * @param {Mixed} x Переменная.
	 * @returns {boolean} Переменная является строкой.
	 */
	isString: function(v) {
		return typeof v === "string";
	},
	
	/**
	 * Проверяет, что переменная булевая.
	 * @static
	 * @param {Mixed} x Переменная.
	 * @returns {boolean} Переменная булевая.
	 */
	isBoolean: function(v) {
		return typeof v === "boolean";
	},
	
	/**
	 * Проверяет, что переменная является функцией.
	 * @static
	 * @param {Mixed} x Переменная.
	 * @returns {boolean} Переменная является функцией.
	 */
	isFunction: function(v) {
		return typeof v === "function";
	},
	
	/**
	 * Проверяет, что переменная является нативным массивом (Array).
	 * @static
	 * @param {Mixed} x Переменная.
	 * @returns {boolean} Переменная является нативным массивом.
	 */
	isArray: function(v) {
		return Object.prototype.toString.apply(v) === '[object Array]';
	},
	
	/**
	 * Проверяет, что переменная является объектом (Object или экземпляр пользовательского класса).
	 * @static
	 * @param {Mixed} x Переменная.
	 * @returns {boolean} Переменная является объектом.
	 */
	isObject: function(v) {
		return Object.prototype.toString.apply(v) === '[object Object]';
	},
	
	/**
	 * Проверяет, что переменная является регулярным выражением.
	 * @static
	 * @param {Mixed} x Переменная.
	 * @returns {boolean} Переменная является регулярным выражением.
	 */
	isRegExp: function(v) {
		return Object.prototype.toString.apply(v) === '[object RegExp]';
	},
	
	/**
	 * Проверяет, что переменная является датой.
	 * @static
	 * @param {Mixed} x Переменная.
	 * @returns {boolean} Переменная является датой.
	 */
	isDate: function(v) {
		return Object.prototype.toString.apply(v) === '[object Date]';
	},
	
	/**
	 * Задает значение по умолчанию. Возвращает value, если оно не undefined, в противном случае возвращает default.
	 * @static
	 * @param {Mixed} value Значение.
	 * @param {Mixed} default Значение по умолчанию.
	 * @returns {Mixed} Результат.
	 */
	def: function(v, d) {
		return JW.isDefined(v) ? v : d;
	},
	
	/**
	 * Задает значение по умолчанию. Возвращает value, если оно не undefined и не null, в противном случае возвращает
	 * default.
	 * @static
	 * @param {Mixed} value Значение.
	 * @param {Mixed} default Значение по умолчанию.
	 * @returns {Mixed} Результат.
	 */
	defn: function(v, d) {
		return JW.isSet(v) ? v : d;
	},
	
	/**
	 * То же самое, что и JW.apply, только игнорирует поля, которые уже определены в target (не undefined).
	 *
	 * Пример
	 * 
	 *     var x = {         var y = {         // Результат = {
	 *         a: 10,                          //     a: 10,
	 *         b: 20,            b: 30,        //     b: 20,
	 *         c: null,          c: 40,        //     c: null,
	 *         d: undefined      d: 50,        //     d: 50,
	 *                           e: 60,        //     e: 60
	 *                           f: undefined  // 
	 *     };                };                // };
	 *     
	 *     JW.applyIf(x, y);
	 *
	 * @static
	 *
	 * @param {Object} target
	 * Целевой объект.
	 *
	 * @param {Object} [sources]
	 * Объекты-источники.
	 *
	 * @returns {Object}
	 * Возвращает target.
	 */
	applyIf: function(target /*, sources */) {
		for (var i = 1; i < arguments.length; ++i) {
			var source = arguments[i];
			if (!source) {
				continue;
			}
			for (var key in source) {
				if (JW.isDefined(source[key]) && !JW.isDefined(target[key])) {
					target[key] = source[key];
				}
			}
		}
		return target;
	},
	
	/**
	 * То же самое, что и JW.apply, только игнорирует поля, которые уже присвоены в target (не undefined или null).
	 *
	 * **Пример**
	 * 
	 *     var x = {         var y = {         // Результат = {
	 *         a: 10,                          //     a: 10,
	 *         b: 20,            b: 30,        //     b: 20,
	 *         c: null,          c: 40,        //     c: 40,
	 *         d: undefined      d: 50,        //     d: 50,
	 *                           e: 60,        //     e: 60
	 *                           f: undefined  // 
	 *     };                };                // };
	 *     
	 *     JW.applyIf(x, y);
	 *
	 * @static
	 *
	 * @param {Object} target
	 * Целевой объект.
	 *
	 * @param {Object} [sources]
	 * Объекты-источники.
	 *
	 * @returns {Object}
	 * Возвращает target.
	 */
	applyIfn: function(target /*, sources */) {
		for (var i = 1; i < arguments.length; ++i) {
			var source = arguments[i];
			if (!source) {
				continue;
			}
			for (var key in source) {
				if (JW.isDefined(source[key]) && !JW.isSet(target[key])) {
					target[key] = source[key];
				}
			}
		}
		return target;
	},
	
	/**
	 * Очищает словарь от значений undefined. Возвращает новый словарь, в котором есть все поля словаря target, кроме
	 * тех, что равны undefined.
	 * 
	 * Функция не меняет объект target.
	 * 
	 * Если вы хотите удалить еще и все значения равные null, воспользуйтесь функцией JW.cleann.
	 * 
	 * Пример:
	 * 
	 *     var x = {          // Результат: y = {
	 *         a : 10,        //     a: 10,
	 *         b : 20,        //     b: 20,
	 *         c : null,      //     c: null
	 *         d : undefined  //
	 *     };                 // };
	 *     
	 *     var y = JW.clean(x);
	 *
	 * @static
	 *
	 * @param {Object} target
	 * Словарь.
	 *
	 * @returns {Object}
	 * Очищенный словарь.
	 */
	clean: function(source) {
		var result = {};
		for (var i in source) {
			if (JW.isDefined(source[i])) {
				result[i] = source[i];
			}
		}
		return result;
	},
	
	/**
	 * Очищает словарь от значений null и undefined. Возвращает новый словарь, в котором есть все поля словаря target,
	 * кроме тех, что равны null или undefined.
	 * 
	 * Функция не меняет объект target.
	 * 
	 * Если вы хотите удалить только undefined, воспользуйтесь функцией JW.clean.
	 * 
	 * Пример:
	 * 
	 *     var x = {          // Результат: y = {
	 *         a : 10,        //     a: 10,
	 *         b : 20,        //     b: 20
	 *         c : null,      //
	 *         d : undefined  //
	 *     };                 // };
	 *     
	 *     var y = JW.clean(x);
	 *
	 * @static
	 *
	 * @param {Object} target
	 * Словарь.
	 *
	 * @returns {Object}
	 * Очищенный словарь.
	 */
	cleann: function(source) {
		var result = {};
		for (var i in source) {
			if (JW.isSet(source[i])) {
				result[i] = source[i];
			}
		}
		return result;
	},
	
	/**
	 * @method toArray
	 *
	 * Преобразует объект в массив. Объект должен иметь свойство length и элементы, пронумерованные от 0 до
	 * (length - 1).
	 * 
	 * Примером такого объекта является список аргументов функции. Это позволяет применять произвольные методы массива
	 * к списку аргументов.
	 * 
	 * Пример
	 * 
	 *     function applyOperations(
	 *         value
	 *         // operations
	 *         ) {
	 *         var operations = JW.toArray(arguments, 1);
	 *         // ...
	 *     }
	 *
	 * @static
	 *
	 * @param {Mixed} a
	 * Исходный объект.
	 *
	 * @param {number} [index]
	 * Номер аргумента, начиная с которого выполнить преобразование. По умолчанию, преобразует все аргументы.
	 *
	 * @param {number} [count]
	 * Количество аргументов для преобразования. По умолчанию, преобразует все аргументы, начиная с index.
	 *
	 * @returns {Array}
	 * Массив.
	 */
	/**
	 * Эквивалент метода JW.toArray.
	 * @static
	 * @param {Mixed} a Исходный объект.
	 * @param {number} [index]
	 * Номер аргумента, начиная с которого выполнить преобразование. По умолчанию, преобразует все аргументы.
	 * @param {number} [count]
	 * Количество аргументов для преобразования. По умолчанию, преобразует все аргументы, начиная с index.
	 * @returns {Array} Массив.
	 */
	args: function(a, index, count) {
		index = index || 0;
		count = count || (a.length - index);
		var r = [];
		for (var i = 0; i < count; ++i) {
			r.push(a[index + i]);
		}
		return r;
	},
	
	/**
	 * Пустая функция.
	 * @static
	 * @returns {void}
	 */
	emptyFn: function() {},
	
	/**
	 * Универсальная функция сравнения значений для сортировки массива.
	 * 
	 * - Возвращает 1, если x > y
	 * - Возвращает -1, если x < y
	 * - Возвращает 0, если x == y
	 * 
	 * Функция умеет сравнивать: boolean, number, string, Array.
	 *
	 * @static
	 * @param {Mixed} x Первое значение.
	 * @param {Mixed} y Второе значение.
	 * @param {boolean} caseInsensitive Не учитывать регистр.
	 * @returns {number} Результат сравнения.
	 */
	cmp: function(x, y, caseInsensitive) {
		if (typeof x === "boolean" && typeof y === "boolean") {
			return x ? (y ? 0 : 1) : (y ? -1 : 0);
		}
		if (JW.isArray(x) && JW.isArray(y)) {
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
		if (x > y) return 1;
		if (x < y) return -1;
		return 0;
	},
	
	/**
	 * Эквивалент JW.cmp(x, y, true). Сравнивает значения без учета регистра.
	 * @static
	 * @param {Mixed} x Первое значение.
	 * @param {Mixed} y Второе значение.
	 * @returns {number} Результат сравнения.
	 */
	cmpCaseInsensitive: function(x, y) {
		return JW.cmp(x, y, true);
	},
	
	/**
	 * Возвращает элемент объекта по выражению. Выражение представляет собой несколько слов, записанных в массиве или в
	 * строке через точку. Если field равен null, undefined или пустой строке, то функция вернет obj.
	 * 
	 * Пример 1
	 * 
	 *     var obj = {
	 *         abc : [
	 *             {
	 *                 qwe : "xyz"
	 *             }
	 *         ]
	 *     };
	 *     
	 *     return JW.get(obj, "abc.0.qwe"); // "xyz"
	 *     
	 *     // эквивалентный вариант
	 *     return JW.get(obj, [ "abc", 0, "qwe" ]); // "xyz"
	 * 
	 * Функция используется коллбеками JW.byField и JW.byValue.
	 * 
	 * Пример 2
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
	 * В данном примере функция JW.get неявно вызывается внутри метода JW.byValue с аргументом field === "id".
	 *
	 * @static
	 * @param {Object} obj Объект.
	 * @param {string/Array} field Название элемента объекта. Набор слов массивом или строкой через точку.
	 * @param {Mixed} def Значение, которое вернется, если элемент не найден. По умолчанию undefined.
	 * @returns {Mixed} Элемент объекта.
	 */
	get: function(obj, field, def) {
		if (!field) {
			return JW.def(obj, def);
		}
		if (typeof field === "string") {
			field = field.split(".");
		}
		field = JW.Array.filter(field, function(token) {
			return JW.isSet(token) && (token !== "");
		});
		for (var i = 0, l = field.length; i < l; ++i) {
			if (!obj) {
				return def;
			}
			obj = obj[field[i]];
		}
		return JW.def(obj, def);
	},
	
	/**
	 * Присваивает элемент объекта по выражению. Выражение представляет собой несколько слов, записанных в массиве или
	 * в строке через точку.
	 * 
	 * Пример:
	 * 
	 *     var obj = {
	 *         abc : [
	 *             {
	 *                 qwe : "xyz"
	 *             }
	 *         ]
	 *     };
	 *     
	 *     return JW.set(obj, "def", "abc.0.qwe"); // заменит значение "xyz" на "def"
	 *     
	 *     // эквивалентный вариант
	 *     return JW.set(obj, "def", [ "abc", 0, "qwe" ]); // заменит значение "xyz" на "def"
	 *
	 * @static
	 * @param {Object} obj Объект.
	 * @param {Mixed} value Значение.
	 * @param {string/Array} field Название элемента объекта. Набор слов массивом или строкой через точку.
	 * @returns {void}
	 */
	set: function(obj, value, field) {
		if (!field) {
			return;
		}
		if (typeof field === "string") {
			field = field.split(".");
		}
		field = JW.Array.filter(field, function(token) {
			return JW.isSet(token) && (token !== "");
		});
		for (var i = 0, l = field.length - 1; i < l; ++i) {
			token = field[i];
			obj[token] = obj[token] || {};
			obj = obj[token];
		}
		obj[JW.Array.getLast(field)] = value;
	},
	
	/**
	 * Возвращает уникальный идентификатор объекта. Вернет {@link JW.Class#_iid iid} объекта, если он является
	 * экземпляром JW.Class, в противном случае вернет сам объект.
	 *
	 * Эта функция является значением о умолчанию для полей JW.AbstractArray#getKey и JW.AbstractMap#getKey, а также
	 * для параметра getKey статических методов JW.Array#static-method-detectSplice,
	 * JW.Array#static-method-performSplice, JW.Array#static-method-detectReorder,
	 * JW.Array#static-method-performReorder, JW.Map#static-method-detectReindex,
	 * JW.Map#static-method-performReindex.
	 *
	 * @static
	 * @param {Object} obj Объект.
	 * @returns {Mixed} Уникальный идентификатор объекта.
	 */
	iid: function(obj) {
		return (typeof obj === "object") ? obj._iid : obj;
	},
	
	
	/**
	 * Уничтожает объект, вызвав его метод {@link JW.Class#destroy destroy}. Удобно использовать в конфигурации конвертеров:
	 * 
	 *     var mapper = collection.createMapper({
	 *         createItem  : function(data) { return new View(data); },
	 *         destroyItem : JW.destroy, // вместо function(view) { view.destroy(); }
	 *         scope       : this
	 *     });
	 *
	 * @static
	 * @param {Object} obj Объект.
	 * @returns {void}
	 */
	destroy: function(obj) {
		obj.destroy();
	},
	
	/**
	 * Берет значение value по модулю mod. Функция работает корректно для любого вещественного value и положительного
	 * вещественного mod. Возвращает значение в полуинтервале [0, mod).
	 * @static
	 * @param {number} value Значение.
	 * @param {number} mod Модуль.
	 * @returns {number} value по модулю mod.
	 */
	mod: function(value, mod) {
		return value - mod * Math.floor(value / mod);
	},
	
	/**
	 * Берет значение value по модулю mod. Функция работает корректно для любого вещественного value и положительного
	 * вещественного mod. Возвращает значение в полуинтервале [-mod/2, mod/2).
	 * @static
	 * @param {number} value Значение.
	 * @param {number} mod Модуль.
	 * @returns {number} value по модулю mod.
	 */
	smod: function(value, mod) {
		return value - mod * Math.round(value / mod);
	},
	
	/**
	 * Возвращает знак числа `value`: 0, 1 или -1.
	 * @static
	 * @param {number} value Значение.
	 * @returns {number} Знак.
	 */
	sgn: function(value) {
		return !value ? 0 : value > 0 ? 1 : -1;
	},
	
	/**
	 * Возвращает ненулевой знак числа `value`: 1 или -1. Для нуля вернет 1.
	 * @static
	 * @param {number} value Значение.
	 * @returns {number} Знак.
	 */
	sgnnz: function(value) {
		return value >= 0 ? 1 : -1;
	},
	
	/**
	 * Закрепляет контекст вызова функции.
	 * 
	 * **Пример**
	 * 
	 *     setTimeout(JW.inScope(this.onTimeout, this), 1000);
	 * 
	 * **Эквивалентная реализация**
	 * 
	 *     var self = this;
	 *     setTimeout(function() {
	 *         self.onTimeout();
	 *     }, 1000);
	 * 
	 * Контекст методов класса удобно закреплять в конструкторе до вызова конструктора базового класса:
	 * 
	 *     var MyClass = function(el, message) {
	 *         this._onClick = JW.inScope(this._onClick, this);
	 *         MyClass._super.call(this);
	 *         this.el = el;
	 *         this.message = message;
	 *         this.el.bind("click", this._onClick);
	 *     };
	 *     
	 *     JW.extend(MyClass, JW.Class, {
	 *         // Element el;
	 *         // String message;
	 *         
	 *         // override
	 *         destroy: function() {
	 *             this.el.unbind("click", this._onClick);
	 *         },
	 *         
	 *         _onClick: function() {
	 *             alert(this.message);
	 *         }
	 *     });
	 *
	 * @static
	 * @param {Function} fn Функция.
	 * @param {Object} scope Контекст вызова функции.
	 * @returns {Function} Функция с закрепленным контекстом.
	 */
	inScope: function(func, scope) {
		return function() {
			return func.apply(scope, arguments);
		};
	},
	
	/**
	 * Возвращает коллбек-функцию для алгоритмов коллекций. Функция возвращает значение указанного поля
	 * элемента коллекции. Поле элемента извлекается с помощью функции JW.get.
	 *
	 * Пример (получить имена всех элементов коллекции):
	 *
	 *     var titles = collection.$map(JW.byField("title"));
	 *
	 * @static
	 * @param {string} field Имя поля элемента коллекции.
	 * @returns {Function} Коллбек-функция.
	 */
	byField: function(field) {
		return function(item) {
			return JW.get(item, field);
		};
	},
	
	/**
	 * Возвращает коллбек-функцию для алгоритмов коллекций. Функция проверяет, равно ли (===) указанное поле элемента
	 * коллекции указанному значению. Поле элемента извлекается с помощью функции JW.get.
	 *
	 * Пример (найти элемент по id):
	 *
	 *     var item = collection.$search(JW.byValue("id", id));
	 *
	 * @static
	 * @param {string} field Имя поля элемента коллекции.
	 * @param {Mixed} value Значение поля.
	 * @returns {Function} Коллбек-функция.
	 */
	byValue: function(field, value) {
		return function(item) {
			return JW.get(item, field) === value;
		};
	},
	
	/**
	 * Возвращает коллбек-функцию для алгоритмов коллекций. Функция вызывает указанный метод элемента коллекции
	 * с указанными аргументами и возвращает результат запуска этого метода.
	 *
	 * Пример (отфильтровать задачи, относящиеся к указанной задаче):
	 *
	 *     var tasks = collection.$filter(JW.byMethod("relatesTo", [task]));
	 *
	 * @static
	 * @param {string} method Имя метода элемента коллекции.
	 * @param {Array} [args] Аргументы метода.
	 * @returns {Function} Коллбек-функция.
	 */
	byMethod: function(method, args) {
		args = args || [];
		return function(item) {
			return item[method].apply(item, args);
		};
	}
});

JW.toArray = JW.args;

/*
	JW simple inheritance.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

JW.ClassUtil = {
	_iid: 0,
	
	_fnTest: /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/,
	
	/**
	 * Наследует один класс от другого. Тело класса передается в аргументе body - все поля и методы body станут полями
	 * и методами подкласса. Содержимое body в несколько преобразованном виде переходит в прототип подкласса.
	 * 
	 * Перед использованием этой функции необходимо объявить конструктор подкласса.
	 * 
	 * Для примера наследования класса смотрите JW.Class.
	 *
	 * @static
	 * @member JW
	 * @param {Function} subclass Подкласс.
	 * @param {Function} superclass Базовый класс.
	 * @param {Object} body Тело класса.
	 * @returns {Function} Возвращает subclass.
	 */
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

/**
 * @class
 * 
 * Самый базовый класс всех классов. От JW.Class и всех его потомков можно наследовать новые классы.
 * 
 * Пример наследования класса:
 * 
 *     // Конструктор
 *     var Shape = function(name) {
 *         // Вызываем конструктор базового класса
 *         Shape._super.call(this);
 *         // Объявляем поля
 *         this.name = name;
 *     };
 *     
 *     // Наследуем Shape от JW.Class
 *     JW.extend(Shape, JW.Class, {
 *         // Для удобства рекомендуется дать спецификацию класса в комментарии
 *         // String name;
 *         // abstract Number getArea();
 *     });
 *     
 *     // --------
 *     
 *     var Rectangle = function(name, width, height) {
 *         Rectangle._super.call(this, name);
 *         this.width = width;
 *         this.height = height;
 *         // Для оптимизации рекомендуется объявлять даже те поля,
 *         // которые не имеют значения по умолчанию
 *         this.el = null;
 *     };
 *     
 *     JW.extend(Rectangle, Shape, {
 *         // Number width;
 *         // Number height;
 *         // Element el;
 *         
 *         // Деструктор
 *         destroy: function() {
 *             // Освобождаем ресурсы
 *             if (this.el) {
 *                 this.el.remove();
 *             }
 *             // Вызываем деструктор базового класса
 *             this._super();
 *         },
 *         
 *         // override
 *         getArea: function() {
 *             return this.width * this.height;
 *         },
 *         
 *         getElement: function() {
 *             if (!this.el) {
 *                 this.el = jQuery('&lt;div /&gt;');
 *                 this.el.width(width);
 *                 this.el.height(height);
 *             }
 *             return this.el;
 *         }
 *     });
 */
JW.Class = function() {
	this._iid = ++JW.ClassUtil._iid;
	this._super = null;
};

/**
 * @property {Function} constructor
 *
 * Конструктор как класс. Если в вашем распоряжении есть некоторый объект, то вы с легкостью можете узнать его класс
 * воспользовавшись полем #constructor.
 */
/**
 * @property {number} _iid
 *
 * Instance ID.
 *
 * Автоинкрементный уникальный идентификатор объекта. Каждый экземпляр JW.Class получает такой идентификатор.
 * Используется в множестве JW.AbstractSet в качестве ключа словаря для быстрого поиска.
 */
/**
 * @method destroy
 *
 * Деструктор класса. Сюда рекомендуется помещать всю логику уничтожения экземпляра класса. Этот метод нужно явно
 * вызывать снаружи, поскольку JavaScript не поддерживает автоматические деструкторы классов. Этот метод можно
 * перегружать, не забывая вызывать деструктор базового класса:
 * 
 *     destroy: function() {
 *         // Освобождаем ресурсы
 *         ...
 *         // Вызываем деструктор базового класса
 *         this._super();
 *     }
 *
 * @returns {void}
 */
/**
 * @method _super
 *
 * Этот метод доступен только внутри методов класса, переданных в функцию JW.extend при создании данного класса. Метод
 * {@link #method-_super} - это простой способ вызова того же метода базового класса:
 * 
 *     ...
 *     // Метод класса
 *     myMethod: function(a, b, c) {
 *         return this._super(a, b) + c;
 *     }
 *     ...
 * 
 * Эквивалентный вариант:
 *
 *     ...
 *     // Метод класса
 *     myMethod: function(a, b, c) {
 *         return MyClass.superclass.myMethod.call(this, a, b) + c;
 *     }
 *     ...
 *
 * @returns {Mixed}
 */
/**
 * @property {Function} _super
 *
 * Базовый класс. Благодаря этому полю, можно вызывать конструктор базового класса:
 * 
 *     var MyClass = function() {
 *         MyClass._super.call(this);
 *     };
 *     
 *     JW.extend(MyClass, JW.Class);
 * 
 * Это статическое поле есть у JW.Class и всех классов, унаследованных от него.
 *
 * @static
 */
/**
 * @property {Object} prototype
 *
 * Прототип класса.
 *
 * @static
 */
/**
 * @property {Object} superclass
 *
 * Прототип базового класса. Благодаря этому полю, можно подниматься вверх по иерархии классов:
 * 
 *     this.constructor.superclass.constructor.superclass....
 * 
 * Это статическое поле есть у JW.Class и всех классов, унаследованных от него.
 *
 * @static
 */
/**
 * @method extend
 *
 * Создает новый класс и наследует его от текущего класса. Тело класса передается в аргументе body - все поля и методы
 * body станут полями и методами нового класса. Содержимое body в несколько преобразованном виде переходит в прототип
 * нового класса.
 * 
 * Конструктор остается таким же, как и у базового класса.
 * 
 * В случае, если конструктор нужно изменить, следует воспользоваться методом JW.extend.
 * 
 * Пример наследования класса:
 * 
 *     var MyClass = JW.Class.extend({
 *         // Метод
 *         myMethod: function(x) {
 *             return this._super(x + 10);
 *         }
 *     });
 * 
 * Этот статический метод есть у JW.Class и всех классов, унаследованных от него.
 *
 * @static
 *
 * @param {Object} body
 * Тело класса. По умолчанию - пустой объект (создает новый класс и наследует от текущего класса, без добавления полей
 * и методов).
 *
 * @returns {Function}
 * Новый унаследованный класс
 */

JW.extend(JW.Class, Object, {
	destroy: function() {}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<P extends JW.EventParams>`
 *
 * Класс события. Используется для того, чтобы оповещать какие-то объекты (клиенты) о каких-то событиях (например, об
 * изменении значения какой-то переменной).
 * 
 * **Замечание:** Уничтожение событий объекта и отписка от сторонних событий, как правило, осуществляется в деструкторе.
 * 
 * Полный пример класса, выбрасывающего события:
 * 
 *     var Dispatcher = function() {
 *         Dispatcher._super.call(this);
 *         this.items = [];
 *         this.addEvent = new JW.Event();
 *         this.removeEvent = new JW.Event();
 *     };
 *     
 *     JW.extend(Dispatcher, // <T>
 *               JW.Class, {
 *         // Array<T> items;
 *         // JW.Event<Dispatcher.EventParams<T>> addEvent;
 *         // JW.Event<Dispatcher.EventParams<T>> removeEvent;
 *         
 *         // override
 *         destroy: function() {
 *             this.removeEvent.destroy();
 *             this.addEvent.destroy();
 *             this._super();
 *         },
 *         
 *         addItem: function(item, index) {
 *             this.items.splice(index, 0, item);
 *             this.addEvent.trigger(new Dispatcher.EventParams(this, item, index));
 *         },
 *         
 *         removeItem: function(index) {
 *             var item = this.items.splice(index, 1)[0];
 *             this.removeEvent.trigger(new Dispatcher.EventParams(this, item, index));
 *         }
 *     });
 *     
 *     Dispatcher.EventParams = function(sender, item, index) {
 *         Dispatcher.EventParams._super.call(this, sender);
 *         this.item = item;
 *         this.index = index;
 *     };
 *     
 *     JW.extend(Dispatcher.EventParams, // <T>
 *               JW.EventParams, {
 *         // Dispatcher sender;
 *         // T item;
 *         // Integer index;
 *     });
 * 
 * Пример использования этих событий:
 * 
 *     var Client = function(dispatcher) {
 *         Client._super.call(this);
 *         this.dispatcher = dispatcher;
 *         this._addAttachment = this.dispatcher.addEvent.bind(this._onAdd, this);
 *         this._removeAttachment = this.dispatcher.removeEvent.bind(this._onRemove, this);
 *     };
 *     
 *     JW.extend(Client, JW.Class, {
 *         // Dispatcher dispatcher;
 *         // JW.EventAttachment _addAttachment;
 *         // JW.EventAttachment _removeAttachment;
 *         
 *         // override
 *         destroy: function() {
 *             this._removeAttachment.destroy();
 *             this._addAttachment.destroy();
 *             this._super();
 *         },
 *         
 *         _onAdd: function(params) {
 *             console.log(params.item, " item is added at ", params.index);
 *         },
 *         
 *         _onRemove: function(params) {
 *             console.log(params.item, " item is removed at ", params.index);
 *         }
 *     });
 *
 * @extends JW.Class
 * @constructor
 */
JW.Event = function() {
	JW.Event._super.call(this);
	this.attachments = {};
};

JW.extend(JW.Event, JW.Class, {
	/*
	Map<JW.EventAttachment> attachments;
	*/
	
	destroy: function() {
		this.purge();
	},
	
	/**
	 * Подписаться на событие.
	 * 
	 * Всякий раз, когда методом #trigger будет выброшено событие, будет вызван обработчик callback в контексте scope.
	 * 
	 * Обработчик можно отписать путем уничтожения возвращенного экземпляра JW.EventAttachment.
	 *
	 * @param {Function} callback
	 *
	 * `callback(params: P): void`
	 *
	 * Функция-обработчик события.
	 *
	 * @param {Object} scope Контекст вызова callback.
	 *
	 * @returns {JW.EventAttachment} `<P>` Подписка на событие.
	 */
	bind: function(callback, scope) {
		var attachment = new JW.EventAttachment(this, callback, scope);
		this.attachments[attachment._iid] = attachment;
		return attachment;
	},
	
	/**
	 * Отписывает обработчик, подписанный методом #bind.
	 * 
	 * Эквивалентен вызову `attachment.destroy()`.
	 *
	 * @param {JW.EventAttachment} attachment `<P>` Подписка на событие.
	 * @returns {void}
	 */
	unbind: function(attachment) {
		delete this.attachments[attachment._iid];
	},
	
	/**
	 * Отписывает все обработчики событий. Автоматически вызывается в деструкторе события.
	 * @returns {void}
	 */
	purge: function() {
		this.attachments = {};
	},
	
	/**
	 * Выбрасывает событие, оповещает клиенты.
	 * 
	 *     this.myEvent.trigger(new JW.EventParams(this));
	 * 
	 * Тем самым мы вызвали все обработчики, подписанные методом #bind на событие myEvent, с параметрами
	 * `new JW.EventParams(this)`.
	 *
	 * @param {P} params Параметры события.
	 * @returns {void}
	 */
	trigger: function(params) {
		// haven't splitted to simpler methods for debugging purposes
		for (var iid in this.attachments) {
			var attachment = this.attachments[iid];
			attachment.callback.call(attachment.scope || attachment, params);
		}
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 * Подписка на событие. Когда клиент подписывается на какое-то событие, ему следует сохранить объект-подписку, чтобы
 * впоследствии он мог отписаться от этого события путем уничтожения подписки.
 * @extends JW.Class
 * @constructor
 */
JW.EventAttachment = function(event, callback, scope) {
	JW.EventAttachment._super.call(this);
	this.event = event;
	this.callback = callback;
	this.scope = scope;
};

JW.extend(JW.EventAttachment, JW.Class, {
	/*
	JW.Event<? extends JW.EventParams> event;
	Function callback;
	Object scope;
	*/
	
	destroy: function() {
		this.event.unbind(this);
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 * Параметры события.
 * @extends JW.Class
 *
 * @constructor
 * @param {Object} sender Отправитель события.
 */
JW.EventParams = function(sender) {
	JW.EventParams._super.call(this);
	this.sender = sender;
};

JW.extend(JW.EventParams, JW.Class, {
	/**
	 * @property {Object} sender Отправитель события.
	 */
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 * `<T>` Параметры события с элементом. Обычно используется в событии изменения значения какого-либо элемента коллекции.
 * @extends JW.EventParams
 *
 * @constructor
 * @param {Object} sender Отправитель события.
 * @param {T} item Элемент.
 */
JW.ItemEventParams = function(sender, item) {
	JW.ItemEventParams._super.call(this, sender);
	this.item = item;
};

JW.extend(JW.ItemEventParams, JW.EventParams, {
	/**
	 * @property {T} item Элемент.
	 */
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 * `<V>` Параметры события со значением. Обычно используются в событии изменения значения какой-либо переменной или
 * поля.
 * @extends JW.EventParams
 *
 * @constructor
 * @param {Object} sender Отправитель события.
 * @param {V} value Значение.
 */
JW.ValueEventParams = function(sender, value) {
	JW.ValueEventParams._super.call(this, sender);
	this.value = value;
};

JW.extend(JW.ValueEventParams, JW.EventParams, {
	/**
	 * @property {V} value Значение.
	 */
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 * `<T, V> extends JW.ValueEventParams<V>` Параметры события с элементом и значением. Обычно используется в событии изменения значения какого-либо
 * поля какого-либо элемента коллекции.
 * @extends JW.ValueEventParams
 *
 * @constructor
 * @param {Object} sender Отправитель события.
 * @param {T} item Элемент.
 * @param {V} value Значение.
 */
JW.ItemValueEventParams = function(sender, item, value) {
	JW.ItemValueEventParams._super.call(this, sender, value);
	this.item = item;
};

JW.extend(JW.ItemValueEventParams, JW.ValueEventParams, {
	/**
	 * @property {T} item Элемент.
	 */
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T>` Абстрактная коллекция элементов типа T.
 *
 * Существует 3 типа коллекций:
 *
 * - JW.AbstractArray (массив), наследуется от JW.IndexedCollection
 * - JW.AbstractMap (словарь), наследуется от JW.IndexedCollection
 * - JW.AbstractSet (множество)
 *
 * Коллекции можно преобразовывать друг в друга с помощью алгоритмов.
 *
 * Каждая коллекция предоставляется в двух вариантах:
 *
 * - Простая коллекция: JW.Array, JW.Map, JW.Set
 * - Оповещающая коллекция: JW.ObservableArray, JW.ObservableMap, JW.ObservableSet
 *
 * Отличие оповещающей коллекции от простой состоит в том, что она выбрасывает события о своем изменении. Это позволяет
 * синхронизировать данные с представлением налету в соответствии с архитектурой Model-View. Для связи оповещающих
 * коллекций между собой существуют синхронизаторы:
 *
 * - Конвертер элементов: JW.AbstractCollection.Mapper
 * - Конвертер в множество: JW.AbstractCollection.Lister
 * - Конвертер в словарь (индексатор): JW.AbstractCollection.Indexer
 * - Конвертер в массив (упорядочитель): JW.AbstractCollection.Orderer
 * - Конвертер в массив (сортировщик по компаратору): JW.AbstractCollection.SorterComparing
 * - Наблюдатель: JW.AbstractCollection.Observer
 * - Синхронизаторы представления: JW.AbstractArray.Inserter, JW.AbstractMap.Inserter
 * - Объединитель массивов: JW.AbstractArray.Merger
 *
 * Простые коллекции введены прежде всего для совместимости. Они имеют общий интерфейс с оповещающими коллекциями,
 * но работают немного быстрее.
 *
 * При работе с коллекциями jWidget следует помнить несколько важных правил.
 *
 * 1) В коллекции jWidget запрещено добавлять null и undefined. При необходимости воспользуйтесь паттерном Null Object.
 *
 * 2) Большинство методов для изменения коллекции предоставлены в двух вариантах: tryMethod и method. Эти методы
 * выполняют одно и то же действие, но возвращают разный результат. Первый вариант, в основном, введен для внутреннего
 * использования и <em>всегда возвращает undefined, если коллекция не была изменена</em>. Например, #tryClear вернет
 * undefined, если вы пытаетесь очистить пустую коллекцию, в противном случае он вернет бывшее содержимое коллекции.
 * Второй вариант возвращает результат в более дружественном формате. Например, #clear всегда возвращает бывшее
 * содержимое коллекции. Так, если вы хотите очистить массив и уничтожить все элементы, следует воспользоваться
 * методом #clear:
 *
 *     JW.Array.each(array.clear(), JW.destroy);
 *
 * Так вы можете быть уверены в том, что функция JW.Array.each всегда получит на вход корректный массив, тогда как
 * метод #tryClear мог дать на выходе undefined.
 *
 * 3) Все методы, возвращающие коллекцию, предоставлены в двух вариантах: method и $method. Эти методы выполняют одно и
 * то же действие, но возвращают результат в разном формате. Первый метод вернет нативную коллекцию JavaScript: Array
 * или Object. Второй метод вернет обертку jWidget: JW.Array, JW.Map или JW.Set. Используйте тот метод, который
 * удобнее в данной конкретной ситуации. Например, $method удобен для цепочечных вызовов алгоритмов. Так, предыдущий
 * пример можно переписать следующим образом:
 *
 *     array.$clear().each(JW.destroy);
 *
 * А в следующем примере гораздо удобнее воспользоваться реализацией method:
 *
 *     set.addAll(array.clear());
 *
 * 4) Желательно, чтобы все элементы коллекции были различны. Некоторые методы, такие как
 * JW.AbstractArray#performReorder, требуют, чтобы у каждого элемента коллекции был свой уникальный ключ. Если 2
 * элемента коллекции совпадают, то совпадают и их ключи, поэтому такой метод работать не будет.
 *
 * # Методы коллекции
 *
 * Получение содержимого:
 *
 * - {@link #getLength} - Возвращает количество элементов в коллекции.
 * - {@link #isEmpty} - Проверяет коллекцию на пустоту.
 * - {@link #getFirst} - Возвращает первый элемент коллекции.
 * - {@link #containsItem} - Содержит ли коллекция элемент.
 *
 * Алгоритмы перебора:
 *
 * - {@link #every} - Проверяет все элементы по критерию.
 * Возвращает true тогда и только тогда, когда все элементы удовлетворяют критерию.
 * - {@link #some} - Проверяет каждый элемент по критерию.
 * Возвращает true тогда и только тогда, когда хотя бы один элемент удовлетворяет критерию.
 * - {@link #each} - Перебирает элементы.
 * - {@link #search} - Ищет элемент по критерию.
 * Возвращает первый элемент, удовлетворяющий критерию.
 * - {@link #filter}, #$filter - Фильтрует коллекцию по критерию.
 * Строит новую коллекцию того же типа, включающую только элементы, удовлетворяющие критерию.
 * - {@link #map}, #$map - Отображает элементы коллекции.
 * Строит новую коллекцию того же типа, состояющую из результатов запуска отображающей функции на каждом элементе
 * коллекции.
 * - {@link #toSorted}, #$toSorted, #toSortedComparing, #$toSortedComparing -
 * Строит массив из элементов коллекции, отсортированный по индексу
 * или компаратору.
 * - {@link #index}, #$index - Индексирует коллекцию.
 * Строит словарь, в ключах которого находятся индексы элементов, а в значениях - соответствующие элементы.
 * - {@link #toArray}, #$toArray - Строит новый массив из элементов коллекции.
 * - {@link #toSet}, #$toSet - Строит новое множество из элементов коллекции.
 * - {@link #asArray}, #$asArray - Представляет коллекцию в виде массива.
 * - {@link #asSet}, #$asSet - Представляет коллекцию в виде множества.
 *
 * Изменение коллекции:
 *
 * - {@link #removeItem} - Удаляет первое вхождение элемента из коллекции.
 * - {@link #removeItems} - Удаляет все вхождения элементов из коллекции.
 * - {@link #clear}, #$clear, #tryClear - Очищает коллекцию.
 *
 * Создание синхронизаторов:
 *
 * - {@link #createMapper} - Создает конвертер элементов.
 * - {@link #createFilterer} - Создает фильтровщик.
 * - {@link #createLister} - Создает конвертер в множество.
 * - {@link #createIndexer} - Создает индексатор.
 * - {@link #createOrderer} - Создает конвертер в массив (упорядочитель).
 * - {@link #createSorterComparing} - Создает конвертер в массив (сортировщик по компаратору).
 * - {@link #createObserver} - Создает наблюдатель.
 *
 * Создание родственных коллекций (для разработки алгоритмов и синхронизаторов):
 *
 * - {@link #createEmpty} - Создает пустую коллекцию того же типа.
 * - {@link #createEmptyArray} - Создает пустой массив того же типа.
 * - {@link #createEmptyMap} - Создает пустой словарь того же типа.
 * - {@link #createEmptySet} - Создает пустое множество того же типа.
 *
 * Все те же самые методы доступны и для нативных коллекций JavaScript:
 *
 * - Array, смотрите статические методы JW.Array
 * - Object как словарь, смотрите статические методы JW.Map
 * - Object как множество, смотрите статические методы JW.Set
 *
 * @extends JW.Class
 * @abstract
 */
JW.AbstractCollection = function() {
	JW.AbstractCollection._super.call(this);
};

JW.AbstractCollection._create$Array = function(algorithm) {
	return function() {
		return new JW.Array(this[algorithm].apply(this, arguments), true);
	};
};

JW.AbstractCollection._create$Map = function(algorithm) {
	return function() {
		return new JW.Map(this[algorithm].apply(this, arguments), true);
	};
};

JW.AbstractCollection._create$Set = function(algorithm) {
	return function() {
		return new JW.Set(this[algorithm].apply(this, arguments), true);
	};
};

JW.extend(JW.AbstractCollection, JW.Class, {
	/**
	 * @method getLength
	 * Возвращает количество элементов в коллекции.
	 * @returns {number} Количество элементов в коллекции.
	 */
	/**
	 * @method isEmpty
	 * Проверяет коллекцию на пустоту.
	 * @returns {boolean} Коллекция не содержит ни одного элемента.
	 */
	/**
	 * Возвращает первый элемент коллекции. Если коллекция пуста, вернет undefined.
	 * @returns {T} Элемент.
	 */
	getFirst: function() {
		return this._callStatic("getFirst");
	},
	
	/**
	 * @method containsItem
	 * Проверяет наличие элемента в коллекции.
	 * @param {T} item Элемент.
	 * @returns {boolean} Коллекция содержит указанный элемент.
	 */
	/**
	 * @method removeItem
	 * Удаляет первое вхождение указанного элемента из коллекции.
	 * @param {T} item Элемент.
	 * @returns {void}
	 */
	/**
	 * @method removeItems
	 * Удаляет все вхождения указанных элементов из коллекции.
	 * Доступно только для `<T extends JW.Class>`.
	 * @param {Array} items `<T>` Элементы.
	 * @returns {void}
	 */
	/**
	 * @method tryClear
	 * Очищает коллекцию.
	 * @returns {Array/Object} Бывшее содержимое коллекции. Если нет изменений - undefined.
	 */
	/**
	 * @method clear
	 * Очищает коллекцию.
	 * @returns {Array/Object} Бывшее содержимое коллекции.
	 */
	/**
	 * @method $clear
	 * Очищает коллекцию.
	 * @returns {JW.AbstractCollection} `<T>` Бывшее содержимое коллекции.
	 */
	
	destroy: function() {
		this.tryClear();
		this._super();
	},
	
	/**
	 * @method every
	 *
	 * Проверяет все элементы по критерию.
	 * 
	 * Возвращает true тогда и только тогда, когда функция f возвращает !== false на всех элементах коллекции.
	 * 
	 * Алгоритм последовательно перебирает все элементы, и останавливается после первого элемента, не удовлетворяющего
	 * критерию.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T): boolean`
	 *
	 * Критерий проверки элементов.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {boolean} Результат проверки.
	 */
	
	/**
	 * Проверяет каждый элемент по критерию.
	 * 
	 * Возвращает true тогда и только тогда, когда функция f возвращает !== false хотя бы на одном элементе коллекции.
	 * 
	 * Алгоритм последовательно перебирает все элементы, и останавливается после первого элемента, удовлетворяющего
	 * критерию.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T): boolean`
	 *
	 * Критерий проверки элементов.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {boolean} Результат проверки.
	 */
	some: function(callback, scope) {
		return !this.every(function(item) {
			return callback.call(this, item) === false;
		}, scope);
	},
	
	/**
	 * Перебирает элементы коллекции. Запускает указанную функцию на всех элементах.
	 * @param {Function} f
	 *
	 * `f(item: T): void`
	 *
	 * Функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {void}
	 */
	each: function(callback, scope) {
		this.every(function(item) {
			callback.call(this, item);
			return true;
		}, scope);
	},
	
	/**
	 * Ищет элемент по критерию.
	 * 
	 * Возвращает первый элемент, функция f на котором возвращает !== false.
	 * 
	 * Алгоритм последовательно перебирает все элементы, и останавливается после первого элемента, удовлетворяющего
	 * критерию.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T): boolean`
	 *
	 * Критерий проверки элементов.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {T} Найденный элемент или undefined.
	 */
	search: function(callback, scope) {
		var result;
		this.every(function(item) {
			if (callback.call(this, item) !== false) {
				result = item;
				return false;
			}
			return true;
		}, scope);
		return result;
	},
	
	/**
	 * Преобразует коллекцию в отсортированный массив.
	 *
	 * Строит массив из элементов коллекции, отсортированный по результату запуска функции f на каждом элементе.
	 *
	 * @param {Function} [f]
	 *
	 * `f(item: T): number/string`
	 *
	 * Функция-сортировщик для элемента. По умолчанию возвращает item.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {Array} `<T>` Отсортированный массив.
	 */
	toSorted: function(callback, scope, order) {
		return this._callStatic("toSorted", [callback, scope || this, order]);
	},
	
	/**
	 * Преобразует коллекцию в отсортированный массив.
	 *
	 * Строит массив из элементов коллекции, отсортированный по результату запуска функции f на каждом элементе.
	 *
	 * @param {Function} [f]
	 *
	 * `f(item: T): number/string`
	 *
	 * Функция-сортировщик для элемента. По умолчанию возвращает item.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {JW.Array} `<T>` Отсортированный массив.
	 */
	$toSorted: JW.AbstractCollection._create$Array("toSorted"),
	
	/**
	 * Преобразует коллекцию в отсортированный массив.
	 *
	 * Строит массив из элементов коллекции, отсортированный по компаратору.
	 *
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T): Number`
	 *
	 * Функция-компаратор. Возвращает положительное значение, если t1 > t2; отрицательное значение, если t1 < t2;
	 * 0, если t1 == t2. По умолчанию возвращает JW.cmp(t1, t2).
	 *
	 * @param {Object} [scope] Контекст вызова compare. По умолчанию compare вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {Array} `<T>` Отсортированный массив.
	 */
	toSortedComparing: function(compare, scope, order) {
		return this._callStatic("toSortedComparing", [compare, scope || this, order]);
	},
	
	/**
	 * Преобразует коллекцию в отсортированный массив.
	 *
	 * Строит массив из элементов коллекции, отсортированный по компаратору.
	 *
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T): Number`
	 *
	 * Функция-компаратор. Возвращает положительное значение, если t1 > t2; отрицательное значение, если t1 < t2;
	 * 0, если t1 == t2. По умолчанию возвращает JW.cmp(t1, t2).
	 *
	 * @param {Object} [scope] Контекст вызова compare. По умолчанию compare вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {JW.Array} `<T>` Отсортированный массив.
	 */
	$toSortedComparing: JW.AbstractCollection._create$Array("toSortedComparing"),
	
	/**
	 * Индексирует коллекцию.
	 *
	 * Строит словарь, в ключах которого находятся результаты запуска функции f на всех элементах,
	 * а в значениях - соответствующие элементы.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T): string`
	 *
	 * Функция-индексатор для элемента.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {Object} Индекс коллекции.
	 */
	index: function(callback, scope) {
		var result = {};
		this.every(function(item) {
			var key = callback.call(this, item);
			if (JW.isSet(key)) {
				result[key] = item;
			}
			return true;
		}, scope);
		return result;
	},
	
	/**
	 * Индексирует коллекцию.
	 *
	 * Строит словарь, в ключах которого находятся результаты запуска функции f на всех элементах,
	 * а в значениях - соответствующие элементы.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T): string`
	 *
	 * Функция-индексатор для элемента.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {JW.Map} `<T>` Индекс коллекции.
	 */
	$index: JW.AbstractCollection._create$Map("index"),
	
	/**
	 * Преобразует коллекцию в массив.
	 *
	 * Строит новый массив, включающий все элементы коллекции.
	 *
	 * @returns {Array} `<T>` Массив элементов.
	 */
	toArray: function() {
		var result = new Array(this.getLength());
		var index = 0;
		this.every(function(item) {
			result[index++] = item;
		});
		return result;
	},
	
	/**
	 * Преобразует коллекцию в массив.
	 *
	 * Строит новый массив, включающий все элементы коллекции.
	 *
	 * @returns {JW.Array} `<T>` Массив элементов.
	 */
	$toArray: JW.AbstractCollection._create$Array("toArray"),
	
	/**
	 * Преобразует коллекцию в множество.
	 *
	 * Строит новое множество, включающее все элементы коллекции.
	 *
	 * @returns {Object} Множество элементов.
	 */
	toSet: function() {
		var result = {};
		this.every(function(item) {
			JW.Set.add(result, item);
		});
		return result;
	},
	
	/**
	 * Преобразует коллекцию в множество.
	 *
	 * Строит новое множество, включающее все элементы коллекции.
	 *
	 * @returns {JW.Set} `<T>` Множество элементов.
	 */
	$toSet: JW.AbstractCollection._create$Set("toSet"),
	
	/**
	 * Представляет коллекцию в виде массива.
	 *
	 * Если данная коллекция - массив, сразу возвращает его. В противном случае запускает метод #toArray.
	 * Данная функция работает как правило быстрее #toArray, но сначала убедитесь, что возвращенный массив
	 * никто не меняет, иначе могут возникнуть странные непредвиденные баги.
	 *
	 * @returns {Array} `<T>` Массив элементов.
	 */
	asArray: function() {
		return this.toArray();
	},
	
	/**
	 * Представляет коллекцию в виде массива.
	 *
	 * Если данная коллекция - массив, сразу возвращает его. В противном случае запускает метод #toArray.
	 * Данная функция работает как правило быстрее #toArray, но сначала убедитесь, что возвращенный массив
	 * никто не меняет, иначе могут возникнуть странные непредвиденные баги.
	 *
	 * @returns {JW.Array} `<T>` Массив элементов.
	 */
	$asArray: JW.AbstractCollection._create$Array("asArray"),
	
	/**
	 * Представляет коллекцию в виде множества.
	 *
	 * Если данная коллекция - множество, сразу возвращает его. В противном случае запускает метод #toSet.
	 * Данная функция работает как правило быстрее #toSet, но сначала убедитесь, что возвращенное множество
	 * никто не меняет, иначе могут возникнуть странные непредвиденные баги.
	 *
	 * @returns {Object} Множество элементов.
	 */
	asSet: function() {
		return this.toSet();
	},
	
	/**
	 * Представляет коллекцию в виде множества.
	 *
	 * Если данная коллекция - множество, сразу возвращает его. В противном случае запускает метод #toSet.
	 * Данная функция работает как правило быстрее #toSet, но сначала убедитесь, что возвращенное множество
	 * никто не меняет, иначе могут возникнуть странные непредвиденные баги.
	 *
	 * @returns {JW.Set} `<T>` Множество элементов.
	 */
	$asSet: JW.AbstractCollection._create$Set("asSet")
	
	/**
	 * @method filter
	 *
	 * Фильтрует коллекцию по критерию.
	 *
	 * Строит новую коллекцию того же типа, включающую только те элементы, функция f на которых вернула !== false.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T): boolean`
	 *
	 * Фильтрующая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {Array/Object} Отфильтрованная коллекция.
	 */
	/**
	 * @method $filter
	 *
	 * Фильтрует коллекцию по критерию.
	 *
	 * Строит новую коллекцию того же типа, включающую только те элементы, функция f на которых вернула !== false.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T): boolean`
	 *
	 * Фильтрующая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {JW.AbstractCollection} `<T>` Отфильтрованная коллекция.
	 */
	
	/**
	 * @method map
	 *
	 * `<U>` Отображает элементы коллекции.
	 * 
	 * Строит новую коллекцию того же типа, состояющую из результатов запуска функции f на каждом элементе коллекции.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T): U`
	 *
	 * Отображающая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {Array/Object} Отображенная коллекция.
	 */
	/**
	 * @method $map
	 *
	 * `<U>` Отображает элементы коллекции.
	 * 
	 * Строит новую коллекцию того же типа, состояющую из результатов запуска функции f на каждом элементе коллекции.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T): U`
	 *
	 * Отображающая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {JW.AbstractCollection} `<U>` Отображенная коллекция.
	 */
	
	/**
	 * @method createEmpty
	 * `<U>` Конструирует пустую коллекцию того же типа.
	 * @returns {JW.AbstractCollection} `<U>` Коллекция.
	 */
	/**
	 * @method createEmptyArray
	 * `<U>` Конструирует пустой массив того же типа (простой или оповещающий).
	 * @returns {JW.AbstractArray} `<U>` Массив.
	 */
	/**
	 * @method createEmptyMap
	 * `<U>` Конструирует пустой словарь того же типа (простой или оповещающий).
	 * @returns {JW.AbstractMap} `<U>` Словарь.
	 */
	/**
	 * @method createEmptySet
	 * `<U>` Конструирует пустое множество того же типа (простое или оповещающее).
	 * @returns {JW.AbstractSet} `<U>` Множество.
	 */
	/**
	 * @method createMapper
	 * `<U>` Конструирует конвертер элементов коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractCollection.Mapper}
	 * `<T, U, JW.AbstractCollection<T>, JW.AbstractCollection<U>>` Синхронизатор.
	 */
	/**
	 * @method createFilterer
	 * Конструирует фильтровщик коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractCollection.Filterer}
	 * `<T, JW.AbstractCollection<T>>` Синхронизатор.
	 */
	/**
	 * @method createObserver
	 * Конструирует наблюдатель коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractCollection.Observer}
	 * `<T, JW.AbstractCollection<T>>` Синхронизатор.
	 */
	/**
	 * @method createOrderer
	 * Конструирует конвертер коллекции в массив (упорядочитель).
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractCollection.Orderer}
	 * `<T, JW.AbstractCollection<T>>` Синхронизатор.
	 */
	/**
	 * @method createSorterComparing
	 * Конструирует конвертер коллекции в массив (сортировщик по компаратору).
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractCollection.SorterComparing}
	 * `<T, JW.AbstractCollection<T>>` Синхронизатор.
	 */
	/**
	 * @method createIndexer
	 * Конструирует индексатор коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractCollection.Indexer}
	 * `<T, JW.AbstractCollection<T>>` Синхронизатор.
	 */
	/**
	 * @method createLister
	 * Конструирует конвертер коллекции в множество.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractCollection.Lister}
	 * `<T, JW.AbstractCollection<T>>` Синхронизатор.
	 */
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T, C extends JW.AbstractCollection<T>>`
 *
 * Фильтровщик коллекции. Создает новую коллекцию того же типа, включающую только те
 * элементы исходной коллекции, для которых указанная функция возвращает значение !== false.
 * Для массива синхронизатор сохранит порядок элементов.
 *
 *     var source = new JW.ObservableArray([1, 2, 3]);
 *     var filterer = source.{@link JW.AbstractCollection#createFilterer createFilterer}({
 *         {@link #cfg-filterItem filterItem}: function(x) { return x % 2 === 1; }
 *     });
 *     assert(filterer.{@link #property-target target}.{@link JW.AbstractArray#equal equal}([1, 3]));
 *     
 *     source.{@link JW.AbstractArray#addAll addAll}([4, 7, 1, 6]);
 *     assert(filterer.{@link #property-target target}.{@link JW.AbstractArray#equal equal}([1, 3, 7, 1]));
 *
 *     source.{@link JW.AbstractArray#move move}(2, 6); // move "3" item to the end
 *     assert(filterer.{@link #property-target target}.{@link JW.AbstractArray#equal equal}([1, 7, 1, 3]));
 *
 * Создавайте синхронизатор с помощью метода JW.AbstractCollection#createFilterer.
 * Метод сам определит, какая реализация синхронизатора лучше подойдет (простая или observable).
 *
 * Целевую коллекцию можно передать в качестве конфигурационной опции:
 *
 *     var source = new JW.Set();
 *     var target = new JW.Set();
 *     var filterer = source.{@link JW.AbstractCollection#createFilterer createFilterer}({
 *         {@link #cfg-target target}: target,
 *         {@link #cfg-filterItem filterItem}: this._filterItem,
 *         {@link #cfg-scope scope}: this
 *     });
 *
 * Правила работы синхронизатора:
 *
 * - Целевая коллекция находится в поле {@link #property-target}.
 * - При конструировании синхронизатора отфильтрованные элементы исходной коллекции сразу добавляются в
 * {@link #property-target}.
 * - При уничтожении синхронизатора все элементы удаляются из {@link #property-target}.
 * - Целевую коллекцию можно передать в качестве конфигурационной опции {@link #cfg-target}.
 * В этом случае, вся забота о ее уничтожении ложится на вас (хотя элементы будут из нее удалены автоматически
 * при уничтожении синхронизатора).
 * - Если {@link #cfg-target} не передан, то он будет создан автоматически. Синхронизатор подберет наиболее подходящую
 * реализацию {@link #property-target} (простая или observable). В этом
 * случае, {@link #property-target} будет уничтожен автоматически при уничтожении синхронизатора.
 *
 * **Дополнительные правила для различных типов коллекций**
 *
 * JW.AbstractArray:
 *
 * - При конструировании синхронизатора целевая коллекция должна быть пуста.
 * - Целевую коллекцию можно синхронизировать только с одной исходной коллекцией.
 *
 * JW.AbstractMap:
 *
 * - Целевую коллекцию можно синхронизировать с несколькими исходными коллекциями, если ключи всех элементов различны.
 * - В целевую коллекцию можно добавлять элементы вручную, если их ключи не пересекаются с ключами других элементов.
 *
 * JW.AbstractSet:
 *
 * - Целевую коллекцию можно синхронизировать с несколькими исходными коллекциями, если все элементы различны.
 * - В целевую коллекцию можно добавлять элементы вручную, если они не пересекаются с другими элементами.
 *
 * @extends JW.Class
 *
 * @constructor
 * Конструирует синхронизатор. Предпочтительнее использовать метод JW.AbstractCollection#createFilterer.
 * @param {JW.AbstractCollection} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.AbstractCollection.Filterer = function(source, config) {
	JW.AbstractCollection.Filterer._super.call(this);
	config = config || {};
	this.source = source;
	this.filterItem = config.filterItem;
	this._targetCreated = !config.target;
	this.target = this._targetCreated ? this.source.createEmpty() : config.target;
	this.scope = config.scope || this;
};

JW.extend(JW.AbstractCollection.Filterer, JW.Class, {
	/**
	 * @cfg {C} target Целевая коллекция.
	 */
	/**
	 * @cfg {Function} filterItem (required)
	 *
	 * `filterItem(item: T): boolean`
	 *
	 * Фильтрующая функция. Элемент появится в целевой коллекции, если результат запуска фильтрующей функции на этом
	 * элементе !== false.
	 */
	/**
	 * @cfg {Object} scope Контекст вызова filterItem.
	 */
	/**
	 * @property {C} source Исходная коллекция.
	 */
	/**
	 * @property {C} target Целевая коллекция.
	 */
	// boolean _targetCreated;
	
	// override
	destroy: function() {
		if (this._targetCreated) {
			this.target.destroy();
		}
		this._super();
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T extends JW.Class, C extends JW.AbstractCollection<T>>`
 *
 * Конвертер в множество. Преобразует исходную коллекцию в множество.
 * 
 * **Замечание:** Элементы исходной коллекции не должны повторяться.
 *
 * Создавайте конвертер с помощью метода JW.AbstractCollection#createLister:
 *
 *     var lister = collection.createLister();
 *     var set = lister.target;
 *
 * Метод сам определит, какая реализация конвертера лучше подойдет (простая или observable).
 *
 * Множество можно передать в качестве конфигурационной опции:
 *
 *     var set = new JW.Set();
 *     var lister = collection.createLister({
 *         target: set
 *     });
 *
 * Правила работы конвертера:
 *
 * - Целевое множество находится в поле {@link #property-target}.
 * - При конструировании конвертера все элементы исходной коллекции сразу добавляются в {@link #property-target}.
 * - При уничтожении конвертера все элементы исходной коллекции удаляются из {@link #property-target}.
 * - Множество можно передать в качестве конфигурационной опции {@link #cfg-target}.
 * В этом случае, вся забота о его уничтожении ложится на вас.
 * - Если {@link #cfg-target} не передан, то он будет создан автоматически. Конвертер подберет наиболее подходящую
 * реализацию {@link #property-target} (простая или observable). В этом
 * случае, {@link #property-target} будет уничтожен автоматически при уничтожении конвертера.
 * - Можно конвертировать несколько коллекций в одно и то же множество, если все элементы различны.
 *
 * @extends JW.Class
 *
 * @constructor
 * Конструирует конвертер. Предпочтительнее использовать метод JW.AbstractCollection#createLister.
 * @param {JW.AbstractCollection} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.AbstractCollection.Lister = function(source, config) {
	JW.AbstractCollection.Lister._super.call(this);
	config = config || {};
	this.source = source;
	this._targetCreated = !config.target;
	this.target = this._targetCreated ? source.createEmptySet() : config.target;
	this.target.tryAddAll(source.asArray());
};

JW.extend(JW.AbstractCollection.Lister, JW.Class, {
	/**
	 * @property {C} source Исходная коллекция.
	 */
	/**
	 * @cfg {JW.AbstractSet} target `<T>` Целевое множество.
	 */
	/**
	 * @property {JW.AbstractSet} target `<T>` Целевое множество.
	 */
	// boolean _targetCreated;
	
	// override
	destroy: function() {
		this.target.tryRemoveAll(this.source.asArray());
		if (this._targetCreated) {
			this.target.destroy();
		}
		this._super();
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T, C extends JW.AbstractCollection<T>>`
 *
 * Индексатор коллекции. Преобразует исходную коллекцию в словарь, присваивая каждому элементу определенный ключ,
 * используя функцию, указанную пользователем. Используется для быстрого поиска элементов по ключу (например, по ID).
 * 
 * **Замечание:** Все элементы должны иметь разные ключи.
 *
 * Создавайте синхронизатор с помощью метода JW.AbstractCollection#createIndexer:
 *
 *     var indexer = collection.createIndexer({
 *         getKey: function(item) { return item.id; },
 *         scope: this
 *     });
 *     var map = indexer.target;
 *
 * Метод сам определит, какая реализация синхронизатора лучше подойдет (простая или observable).
 *
 * Словарь можно передать в качестве конфигурационной опции:
 *
 *     var map = new JW.Map();
 *     var indexer = collection.createIndexer({
 *         target: map,
 *         getKey: function(item) { return item.id; },
 *         scope: this
 *     });
 *
 * Правила работы синхронизатора:
 *
 * - Целевой словарь находится в поле {@link #property-target}.
 * - При конструировании синхронизатора все элементы исходной коллекции сразу добавляются в {@link #property-target}.
 * - При уничтожении синхронизатора все элементы исходной коллекции удаляются из {@link #property-target}.
 * - Словарь можно передать в качестве конфигурационной опции {@link #cfg-target}.
 * В этом случае, вся забота о его уничтожении ложится на вас.
 * - Если {@link #cfg-target} не передан, то он будет создан автоматически. Синхронизатор подберет наиболее подходящую
 * реализацию {@link #property-target} (простая или observable). В этом
 * случае, {@link #property-target} будет уничтожен автоматически при уничтожении синхронизатора.
 * - Можно индексировать несколько коллекций в один и тот же словарь, если ключи всех элементов различны.
 *
 * @extends JW.Class
 *
 * @constructor
 * Конструирует синхронизатор. Предпочтительнее использовать метод JW.AbstractCollection#createIndexer.
 * @param {JW.AbstractCollection} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.AbstractCollection.Indexer = function(source, config) {
	JW.AbstractCollection.Indexer._super.call(this);
	config = config || {};
	this.source = source;
	this.getKey = config.getKey;
	this._targetCreated = !config.target;
	this.target = this._targetCreated ? source.createEmptyMap() : config.target;
	this.scope = config.scope || this;
	this.target.trySetAll(this._index(source.asArray()));
};

JW.extend(JW.AbstractCollection.Indexer, JW.Class, {
	/**
	 * @cfg {JW.AbstractMap} target `<T>` Целевой словарь.
	 */
	/**
	 * @cfg {Function} getKey (required)
	 *
	 * `getKey(item: T): string`
	 *
	 * Индексирующая функция. Определяет ключ элемента в целевом словаре.
	 */
	/**
	 * @cfg {Object} scope Контекст вызова getKey.
	 */
	/**
	 * @property {C} source Исходная коллекция.
	 */
	/**
	 * @property {JW.AbstractMap} target `<T>` Целевой словарь.
	 */
	// boolean _targetCreated;
	
	// override
	destroy: function() {
		this.target.tryRemoveAll(this._keys(this.source.asArray()));
		if (this._targetCreated) {
			this.target.destroy();
		}
		this._super();
	},
	
	_index: function(items) {
		var index = {};
		for (var i = 0, l = items.length; i < l; ++i) {
			var item = items[i];
			index[this.getKey.call(this.scope, item)] = item;
		}
		return index;
	},
	
	_keys: function(items) {
		var keys = [];
		for (var i = 0, l = items.length; i < l; ++i) {
			keys.push(this.getKey.call(this.scope, items[i]));
		}
		return keys;
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T, U, TC extends JW.AbstractCollection<T>, UC extends JW.AbstractCollection<U>>`
 *
 * Конвертер элементов коллекции. Создает новую коллекцию того же типа, состоящую из элементов,
 * равных результату запуска функции, указанной пользователем, на каждом элементе.
 * Используется, прежде всего, для превращения данных в представление.
 *
 * Создавайте синхронизатор с помощью метода JW.AbstractCollection#createMapper:
 *
 *     var mapper = dataCollection.createMapper({
 *         createItem: function(data) { return new View(this, data); },
 *         destroyItem: JW.destroy,
 *         scope: this
 *     });
 *     var viewCollection = mapper.target;
 *
 * Метод сам определит, какая реализация синхронизатора лучше подойдет (простая или observable).
 *
 * Целевую коллекцию можно передать в качестве конфигурационной опции:
 *
 *     var viewCollection = new JW.Array();
 *     var mapper = dataCollection.createMapper({
 *         target: viewCollection,
 *         createItem: function(data) { return new View(this, data); },
 *         destroyItem: JW.destroy,
 *         scope: this
 *     });
 *
 * Правила работы синхронизатора:
 *
 * - Целевая коллекция находится в поле {@link #property-target}.
 * - При конструировании синхронизатора все элементы исходной коллекции сразу конвертируются и добавляются в
 * {@link #property-target}.
 * - При уничтожении синхронизатора все элементы удаляются из {@link #property-target} и уничтожаются.
 * - Целевую коллекцию можно передать в качестве конфигурационной опции {@link #cfg-target}.
 * В этом случае, вся забота о ее уничтожении ложится на вас (хотя элементы будут из нее удалены автоматически
 * при уничтожении синхронизатора).
 * - Если {@link #cfg-target} не передан, то он будет создан автоматически. Синхронизатор подберет наиболее подходящую
 * реализацию {@link #property-target} (простая или observable). В этом
 * случае, {@link #property-target} будет уничтожен автоматически при уничтожении синхронизатора.
 * - При перемещении/переупорядочении элементов исходной коллекции элементы целевой коллекции не пересоздаются,
 * но перемещаются в полном соответствии с исходной коллекцией.
 *
 * **Дополнительные правила для различных типов коллекций**
 *
 * JW.AbstractArray:
 *
 * - При конструировании синхронизатора целевая коллекция должна быть пуста.
 * - Целевую коллекцию можно синхронизировать только с одной исходной коллекцией.
 *
 * JW.AbstractMap:
 *
 * - Целевую коллекцию можно синхронизировать с несколькими исходными коллекциями, если ключи всех элементов различны.
 * - В целевую коллекцию можно добавлять элементы вручную, если их ключи не пересекаются с ключами других элементов.
 *
 * JW.AbstractSet:
 *
 * - Целевую коллекцию можно синхронизировать с несколькими исходными коллекциями, если все элементы различны.
 * - В целевую коллекцию можно добавлять элементы вручную, если они не пересекаются с другими элементами.
 *
 * @extends JW.Class
 *
 * @constructor
 * Конструирует синхронизатор. Предпочтительнее использовать метод JW.AbstractCollection#createMapper.
 * @param {JW.AbstractCollection} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.AbstractCollection.Mapper = function(source, config) {
	JW.AbstractCollection.Mapper._super.call(this);
	config = config || {};
	this.source = source;
	this.createItem = config.createItem;
	this.destroyItem = config.destroyItem;
	this._targetCreated = !config.target;
	this.target = this._targetCreated ? this.source.createEmpty() : config.target;
	this.scope = config.scope || this;
};

JW.extend(JW.AbstractCollection.Mapper, JW.Class, {
	/**
	 * @cfg {UC} target Целевая коллекция.
	 */
	/**
	 * @cfg {Function} createItem (required)
	 *
	 * `createItem(data: T): U`
	 *
	 * Отображающая функция. Создает элемент целевой коллекции по элементу исходной коллекции.
	 */
	/**
	 * @cfg {Function} destroyItem
	 *
	 * `destroyItem(item:U, data: T): void`
	 *
	 * Деструктор элемента. Уничтожает элемент целевой коллекции.
	 */
	/**
	 * @cfg {Object} scope Контекст вызова createItem и destroyItem.
	 */
	/**
	 * @property {TC} source Исходная коллекция.
	 */
	/**
	 * @property {UC} target Целевая коллекция.
	 */
	// boolean _targetCreated;
	
	// override
	destroy: function() {
		if (this._targetCreated) {
			this.target.destroy();
		}
		this._super();
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T, C extends JW.AbstractCollection<T>>`
 *
 * Наблюдатель коллекции. Прослушивает все события коллекции и сводит их к 2 элементарным функциям:
 * элемент добавлен и элемент удален. В целях оптимизации, можно определить третью функцию: коллекция очищена
 * (в случае, если есть более эффективный алгоритм очистки, чем удаление всех элементов простым перебором).
 * Также, можно определить функцию, которая вызывается при любом изменении коллекции.
 * Синхронизатор можно использовать, например, для оповещения элементов о том, что их добавили в коллекцию.
 *
 * Создавайте синхронизатор с помощью метода JW.AbstractCollection#createObserver:
 *
 *     var observer = collection.createObserver({
 *         addItem: function(item) { item.setInCollection(true); },
 *         removeItem: function(item) { item.setInCollection(false); },
 *         scope: this
 *     });
 *
 * Метод сам определит, какая реализация синхронизатора лучше подойдет (простая или observable).
 *
 * Другой вариант использования синхронизатора: если у вас на входе есть абстрактная коллекция (не известно,
 * простая или оповещающая), но вы хотите прослушивать событие изменения коллекции в случае, если она все же
 * оповещающая, то вы можете это сделать без нарушения принципов ООП:
 *
 *     var observer = collection.createObserver({
 *         change: function() { console.log("Коллекция изменилась"); }
 *     });
 *
 * Правила работы синхронизатора:
 *
 * - При конструировании синхронизатора для всех элементов исходной коллекции вызывается функция
 * {@link #cfg-addItem}.
 * - При уничтожении синхронизатора вызывается функция {@link #cfg-clearItems}, либо для всех элементов
 * вызывается функция {@link #cfg-removeItem}.
 * - При перемещении/переупорядочении элементов исходной коллекции функции {@link #cfg-addItem},
 * {@link #cfg-removeItem} и {@link #cfg-clearItems} не вызываются.
 *
 * @extends JW.Class
 *
 * @constructor
 * Конструирует синхронизатор. Предпочтительнее использовать метод JW.AbstractCollection#createObserver.
 * @param {JW.AbstractCollection} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.AbstractCollection.Observer = function(source, config) {
	JW.AbstractCollection.Observer._super.call(this);
	config = config || {};
	this.source = source;
	this.addItem = config.addItem;
	this.removeItem = config.removeItem;
	this.clearItems = config.clearItems;
	this.change = config.change;
	this.scope = config.scope || this;
	this._addItems(source.asArray());
};

JW.extend(JW.AbstractCollection.Observer, JW.Class, {
	/**
	 * @cfg {Function} addItem
	 *
	 * `addItem(item: T): void`
	 *
	 * Элемент добавлен в коллекцию.
	 */
	/**
	 * @cfg {Function} removeItem
	 *
	 * `removeItem(item: T): void`
	 *
	 * Элемент удален из коллекции.
	 */
	/**
	 * @cfg {Function} clearItems
	 *
	 * `clearItems(items: Array<T>): void`
	 *
	 * Коллекция очищена. По умолчанию, вызывает removeItem для всех элементов коллекции.
	 */
	/**
	 * @cfg {Function} change
	 *
	 * `change(): void`
	 *
	 * Коллекция произвольно изменилась.
	 */
	/**
	 * @cfg {Object} scope Контекст вызова addItem, removeItem, clearItems, change.
	 */
	/**
	 * @property {C} source Исходная коллекция.
	 */
	
	// override
	destroy: function() {
		this._clearItems(this.source.asArray());
		this._super();
	},
	
	_addItems: function(items) {
		if (!this.addItem) {
			return;
		}
		for (var i = 0, l = items.length; i < l; ++i) {
			this.addItem.call(this.scope, items[i]);
		}
	},
	
	_removeItems: function(items) {
		if (!this.removeItem) {
			return;
		}
		for (var i = items.length - 1; i >= 0; --i) {
			this.removeItem.call(this.scope, items[i]);
		}
	},
	
	_clearItems: function(items) {
		if (items.length === 0) {
			return;
		}
		if (this.clearItems) {
			this.clearItems.call(this.scope, items);
		} else {
			this._removeItems(items);
		}
	},
	
	_onChange: function() {
		this.change.call(this.scope);
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T extends JW.Class, C extends JW.AbstractCollection<T>>`
 *
 * Конвертер в массив (упорядочитель). Преобразует исходную коллекцию в массив. Новые элементы добавляются в конец
 * массива.
 * 
 * **Замечание:** Элементы исходной коллекции не должны повторяться.
 * 
 * Создавайте конвертер с помощью метода JW.AbstractCollection#createOrderer:
 *
 *     var orderer = collection.createOrderer();
 *     var array = orderer.target;
 *
 * Метод сам определит, какая реализация конвертера лучше подойдет (простая или observable).
 *
 * Массив можно передать в качестве конфигурационной опции:
 *
 *     var array = new JW.Array();
 *     var orderer = collection.createOrderer({
 *         target: array
 *     });
 *
 * Правила работы конвертера:
 *
 * - Целевой массив находится в поле {@link #property-target}.
 * - При конструировании конвертера все элементы исходной коллекции сразу добавляются в {@link #property-target}.
 * - При уничтожении конвертера все элементы исходной коллекции удаляются из {@link #property-target}.
 * - Массив можно передать в качестве конфигурационной опции {@link #cfg-target}.
 * В этом случае, вся забота о его уничтожении ложится на вас.
 * - Если {@link #cfg-target} не передан, то он будет создан автоматически. Конвертер подберет наиболее подходящую
 * реализацию {@link #property-target} (простая или observable). В этом
 * случае, {@link #property-target} будет уничтожен автоматически при уничтожении конвертера.
 * - Можно конвертировать несколько коллекций в один и тот же массив, если все элементы различны.
 *
 * @extends JW.Class
 *
 * @constructor
 * Конструирует конвертер. Предпочтительнее использовать метод JW.AbstractCollection#createOrderer.
 * @param {JW.AbstractCollection} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.AbstractCollection.Orderer = function(source, config) {
	JW.AbstractCollection.Orderer._super.call(this);
	config = config || {};
	this.source = source;
	this._targetCreated = !config.target;
	this.target = this._targetCreated ? source.createEmptyArray() : config.target;
	this.target.tryAddAll(source.asArray());
};

JW.extend(JW.AbstractCollection.Orderer, JW.Class, {
	/**
	 * @property {C} source Исходная коллекция.
	 */
	/**
	 * @cfg {JW.AbstractArray} target `<T>` Целевой массив.
	 */
	/**
	 * @property {JW.AbstractArray} target `<T>` Целевой массив.
	 */
	// boolean _targetCreated;
	
	// override
	destroy: function() {
		this.target.removeItems(this.source.asArray());
		if (this._targetCreated) {
			this.target.destroy();
		}
		this._super();
	},
	
	_splice: function(removedItemsSet, addedItemsSet) {
		var filteredItems = this.target.filter(function(item) {
			return !JW.Set.contains(removedItemsSet, item) || JW.Set.contains(addedItemsSet, item);
		}, this);
		var addedItems = JW.Set.$toArray(addedItemsSet).filter(function(item) {
			return !JW.Set.contains(removedItemsSet, item);
		}, this);
		this.target.trySplice(
			this.target.detectFilter(filteredItems) || [],
			[new JW.AbstractArray.IndexItems(filteredItems.length, addedItems)]
		);
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T, C extends JW.AbstractCollection<T>>`
 *
 * Конвертер в массив (сортировщик по компаратору). Преобразует исходную коллекцию в массив. Новые элементы
 * добавляются в такое место массива, что массив всегда остается в отсортированном состоянии.
 * Сортировка осуществляется по функции-компаратору, указанной пользователем.
 * 
 * **Замечание:** Элементы исходной коллекции не должны повторяться.
 * 
 * Создавайте конвертер с помощью метода JW.AbstractCollection#createSorterComparing:
 *
 *     var sorter = collection.createSorterComparing({
 *         compare: function(x, y) {
 *             return JW.cmp(x.title, y.title, true) || JW.cmp(x.id, y.id);
 *         },
 *         scope: this
 *     });
 *     var array = sorter.target;
 *
 * Метод сам определит, какая реализация конвертера лучше подойдет (простая или observable).
 *
 * Массив можно передать в качестве конфигурационной опции:
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
 * Правила работы конвертера:
 *
 * - Целевой массив находится в поле {@link #property-target}.
 * - При конструировании конвертера все элементы исходной коллекции сразу добавляются в {@link #property-target}.
 * - При уничтожении конвертера все элементы исходной коллекции удаляются из {@link #property-target}.
 * - Массив можно передать в качестве конфигурационной опции {@link #cfg-target}.
 * В этом случае, вся забота о его уничтожении ложится на вас.
 * - Если {@link #cfg-target} не передан, то он будет создан автоматически. Конвертер подберет наиболее подходящую
 * реализацию {@link #property-target} (простая или observable). В этом
 * случае, {@link #property-target} будет уничтожен автоматически при уничтожении конвертера.
 * - Можно конвертировать несколько коллекций в один и тот же массив, если все элементы различны.
 *
 * @extends JW.Class
 *
 * @constructor
 * Конструирует конвертер. Предпочтительнее использовать метод JW.AbstractCollection#createSorterComparing.
 * @param {JW.AbstractCollection} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.AbstractCollection.SorterComparing = function(source, config) {
	JW.AbstractCollection.SorterComparing._super.call(this);
	config = config || {};
	this.source = source;
	this.compare = config.compare || JW.cmp;
	this.scope = config.scope || this;
	var scope = this.scope;
	var compare = this.compare;
	this._targetCreated = !config.target;
	this.target = this._targetCreated ? source.createEmptyArray() : config.target;
	this._splice([], source.asArray());
};

JW.extend(JW.AbstractCollection.SorterComparing, JW.Class, {
	/**
	 * @cfg {JW.AbstractArray} target `<T>` Целевой массив.
	 */
	/**
	 * @cfg {Function} compare
	 *
	 * `compare(t1: T, t2: T): number`
	 *
	 * Функция-компаратор. По умолчанию равна JW.cmp.
	 */
	/**
	 * @cfg {Object} scope Контекст вызова compare.
	 */
	/**
	 * @property {C} source Исходная коллекция.
	 */
	/**
	 * @property {JW.AbstractArray} target `<T>` Целевой массив.
	 */
	// boolean _targetCreated;
	
	// override
	destroy: function() {
		this._splice(this.source.asArray(), []);
		if (this._targetCreated) {
			this.target.destroy();
		}
		this._super();
	},
	
	/**
	 * Пересортирует целевой массив. Этот метод следует вызывать после смены факторов, влияющих на порядок элементов.
	 * @returns {void}
	 */
	resort: function() {
		this.target.sortComparing(this.compare, this.scope);
	},
	
	_splice: function(removedItems, addedItems) {
		var removedItemsSorted = JW.Array.toSortedComparing(removedItems, this.compare, this.scope);
		var addedItemsSorted = JW.Array.toSortedComparing(addedItems, this.compare, this.scope);
		removedItems = new Array(removedItems.length);
		addedItems = new Array(addedItems.length);
		var iRemoved = 0;
		var iAdded = 0;
		var jRemoved = 0;
		var jAdded = 0;
		// ignore out the items which are removed and added at the same time
		while ((iRemoved < removedItemsSorted.length) || (iAdded < addedItemsSorted.length)) {
			var removedItem = removedItemsSorted[iRemoved];
			var addedItem = addedItemsSorted[iAdded];
			var c = JW.cmp(removedItem === undefined, addedItem === undefined) ||
				this.compare.call(this.scope, removedItem, addedItem);
			if (c < 0) {
				removedItems[jRemoved++] = removedItem;
				++iRemoved;
			} else if (c > 0) {
				addedItems[jAdded++] = addedItem;
				++iAdded;
			} else {
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
		for (iTarget = 0, lTarget = this.target.getLength(); iTarget < lTarget; ++iTarget) {
			var value = this.target.get(iTarget);
			if (removedItems[JW.Array.binarySearch(removedItems, value, this.compare, this.scope) - 1] === value) {
				if (!removeParams) {
					removeParams = new JW.AbstractArray.IndexCount(iTarget, 0);
					removeParamsList.push(removeParams);
				}
				++removeParams.count;
				--addShift;
			} else {
				removeParams = null;
				var addParams = new JW.AbstractArray.IndexItems(iTarget + addShift, []);
				while ((iAdds < addedItems.length) && (this.compare.call(this.scope, addedItems[iAdds], value) < 0)) {
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
		this.target.splice(removeParamsList, addParamsList);
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

JW.AbstractCollection._createStatic$Array = function(namespace, algorithm) {
	return function() {
		return new JW.Array(namespace[algorithm].apply(namespace, arguments), true);
	};
};

JW.AbstractCollection._createStatic$Map = function(namespace, algorithm) {
	return function() {
		return new JW.Map(namespace[algorithm].apply(namespace, arguments), true);
	};
};

JW.AbstractCollection._createStatic$Set = function(namespace, algorithm) {
	return function() {
		return new JW.Set(namespace[algorithm].apply(namespace, arguments), true);
	};
};

JW.AbstractCollection.createStaticMethods = function(namespace) {
	namespace.some = function(target, callback, scope) {
		return !namespace.every(target, function(item) {
			return callback.call(this, item) === false;
		}, scope);
	};
	
	namespace.each = function(target, callback, scope) {
		namespace.every(target, function(item) {
			callback.call(this, item);
			return true;
		}, scope);
	};
	
	namespace.search = function(target, callback, scope) {
		var result;
		namespace.every(target, function(item) {
			if (callback.call(this, item) !== false) {
				result = item;
				return false;
			}
			return true;
		}, scope);
		return result;
	};
	
	namespace.toSorted = function(target, callback, scope, order) {
		callback = callback || function(x) { return x; };
		order = order || 1;
		var pairs = [];
		namespace.every(target, function(item) {
			pairs.push([item, callback.call(this, item)]);
		}, scope);
		pairs.sort(function(x, y) {
			return order * JW.cmp(x[1], y[1]);
		});
		return JW.Array.map(pairs, function(pair) {
			return pair[0];
		});
	};
	
	namespace.$toSorted = JW.AbstractCollection._createStatic$Array(namespace, "toSorted");
	
	namespace.toSortedComparing = function(target, compare, scope, order) {
		compare = compare || JW.cmp;
		scope = scope || target;
		order = order || 1;
		var items = namespace.toArray(target);
		items.sort(function(x, y) {
			return order * compare.call(scope, x, y);
		});
		return items;
	};
	
	namespace.$toSortedComparing = JW.AbstractCollection._createStatic$Array(namespace, "toSortedComparing");
	
	namespace.index = function(target, callback, scope) {
		var result = {};
		namespace.every(target, function(item) {
			var key = callback.call(this, item);
			if (JW.isSet(key)) {
				result[key] = item;
			}
			return true;
		}, scope);
		return result;
	};
	
	namespace.$index = JW.AbstractCollection._createStatic$Map(namespace, "index");
	
	namespace.toArray = function(target) {
		var result = new Array(namespace.getLength(target));
		var index = 0;
		namespace.every(target, function(item) {
			result[index++] = item;
		});
		return result;
	};
	
	namespace.$toArray = JW.AbstractCollection._createStatic$Array(namespace, "toArray");
	
	namespace.toSet = function(target) {
		var result = {};
		namespace.every(target, function(item) {
			JW.Set.add(result, item);
		});
		return result;
	};
	
	namespace.$toSet = JW.AbstractCollection._createStatic$Set(namespace, "toSet");
	
	namespace.asArray = function(target) {
		return namespace.toArray(target);
	};
	
	namespace.$asArray = JW.AbstractCollection._createStatic$Array(namespace, "asArray");
	
	namespace.asSet = function(target) {
		return namespace.toSet(target);
	};
	
	namespace.$asSet = JW.AbstractCollection._createStatic$Set(namespace, "asSet");
};

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<K, T> extends JW.AbstractCollection<T>`
 *
 * Абстрактная коллекция элементов типа T с ключами типа K (индексированная коллекция).
 *
 * Существует 2 типа индексированных коллекций:
 *
 * - JW.AbstractArray (массив, ключ - number)
 * - JW.AbstractMap (словарь, ключ - string)
 *
 * При работе с индексированными коллекциями следует помнить одно простое правило: во всех методах и коллбеках,
 * принимающих на вход элемент и его ключ, элемент всегда идет первым параметром, а ключ - вторым.
 *
 * # Методы индексированной коллекции
 *
 * **Жирным шрифтом выделены изменения по сравнению с JW.AbstractCollection.**
 *
 * Получение содержимого:
 *
 * - {@link #getLength} - Возвращает количество элементов в коллекции.
 * - {@link #isEmpty} - Проверяет коллекцию на пустоту.
 * - **{@link #get} - Возвращает элемент коллекции по ключу.**
 * - {@link #getFirst} - Возвращает первый элемент коллекции.
 * - **{@link #getFirstKey} - Возвращает ключ первого элемента коллекции.**
 * - **{@link #getKeys}, #$getKeys - Возвращает массив ключей всех элементов.**
 * - {@link #containsItem} - Содержит ли коллекция элемент.
 * - **{@link #containsKey} - Содержит ли коллекция ключ.**
 * - **{@link #keyOf} - Возвращает ключ элемента.**
 *
 * Алгоритмы перебора (**функции-коллбеки алгоритмов переопределены и принимают дополнительные параметры -
 * ключи элементов**):
 *
 * - {@link #every} - Проверяет все элементы по критерию.
 * Возвращает true тогда и только тогда, когда все элементы удовлетворяют критерию.
 * - {@link #some} - Проверяет каждый элемент по критерию.
 * Возвращает true тогда и только тогда, когда хотя бы один элемент удовлетворяет критерию.
 * - {@link #each} - Перебирает элементы.
 * - {@link #search} - Ищет элемент по критерию.
 * Возвращает первый элемент, удовлетворяющий критерию.
 * - **{@link #find} - Ищет элемент по критерию.
 * Возвращает ключ первого элемента, удовлетворяющего критерию.**
 * - {@link #filter}, #$filter - Фильтрует коллекцию по критерию.
 * Строит новую коллекцию того же типа, включающую только элементы, удовлетворяющие критерию.
 * - {@link #map}, #$map - Отображает элементы коллекции.
 * Строит новую коллекцию того же типа, состояющую из результатов запуска отображающей функции на каждом элементе
 * коллекции.
 * - {@link #toSorted}, #$toSorted, #toSortedComparing, #$toSortedComparing -
 * Строит массив из элементов коллекции, отсортированный по индексу
 * или компаратору.
 * - **{@link #getSortingKeys}, #$getSortingKeys, #getSortingKeysComparing, #$getSortingKeysComparing -
 * Возвращает ключи элементов, отсортированных по индексу или компаратору.**
 * - {@link #index}, #$index - Индексирует коллекцию.
 * Строит словарь, в ключах которого находятся индексы элементов, а в значениях - соответствующие элементы.
 * - {@link #toArray}, #$toArray - Строит новый массив из элементов коллекции.
 * - **{@link #toMap}, #$toMap - Строит новый словарь из элементов коллекции.**
 * - {@link #toSet}, #$toSet - Строит новое множество из элементов коллекции.
 * - {@link #asArray}, #$asArray - Представляет коллекцию в виде массива.
 * - **{@link #asMap}, #$asMap - Представляет коллекцию в виде словаря.**
 * - {@link #asSet}, #$asSet - Представляет коллекцию в виде множества.
 *
 * Изменение коллекции:
 *
 * - **{@link #set}, #trySet - Заменяет элемент по ключу.**
 * - **{@link #remove}, #tryRemove - Удаляет элемент по ключу.**
 * - {@link #removeItem} - Удаляет первое вхождение элемента из коллекции.
 * - {@link #removeItems} - Удаляет все вхождения элементов из коллекции.
 * - {@link #clear}, #$clear, #tryClear - Очищает коллекцию.
 *
 * Создание синхронизаторов:
 *
 * - {@link #createMapper} - Создает конвертер элементов.
 * - {@link #createFilterer} - Создает фильтровщик.
 * - {@link #createLister} - Создает конвертер в множество.
 * - {@link #createIndexer} - Создает индексатор.
 * - {@link #createOrderer} - Создает конвертер в массив (упорядочитель).
 * - {@link #createSorterComparing} - Создает конвертер в массив (сортировщик по компаратору).
 * - {@link #createObserver} - Создает наблюдатель.
 *
 * Создание родственных коллекций (для разработки алгоритмов и синхронизаторов):
 *
 * - {@link #createEmpty} - Создает пустую коллекцию того же типа.
 * - {@link #createEmptyArray} - Создает пустой массив того же типа.
 * - {@link #createEmptyMap} - Создает пустой словарь того же типа.
 * - {@link #createEmptySet} - Создает пустое множество того же типа.
 *
 * Все те же самые алгоритмы доступны и для нативных коллекций JavaScript:
 *
 * - Array, смотрите статические методы JW.Array
 * - Object как словарь, смотрите статические методы JW.Map
 *
 * @extends JW.AbstractCollection
 * @abstract
 */
JW.IndexedCollection = function() {
	JW.IndexedCollection._super.call(this);
};

JW.extend(JW.IndexedCollection, JW.AbstractCollection, {
	/**
	 * @method get
	 * Возвращает элемент по ключу. В случае, если элемента с таким ключом нет, вернет undefined.
	 * @param {K} key Ключ.
	 * @returns {T} Элемент.
	 */
	/**
	 * @method $clear
	 * Очищает коллекцию.
	 * @returns {JW.IndexedCollection} `<K, T>` Бывшее содержимое коллекции.
	 */
	
	/**
	 * Возвращает ключ первого элемента коллекции. Если коллекция пуста, вернет undefined.
	 * @returns {K} Ключ.
	 */
	getFirstKey: function() {
		return this._callStatic("getFirstKey");
	},
	
	/**
	 * @method getKeys
	 * Возвращает массив ключей всех элементов коллекции.
	 * @returns {Array} `<K>` Массив ключей.
	 */
	/**
	 * Возвращает массив ключей всех элементов коллекции.
	 * @returns {JW.Array} `<K>` Массив ключей.
	 */
	$getKeys: JW.AbstractCollection._create$Array("getKeys"),
	
	/**
	 * Проверяет наличие элемента с заданным ключом в коллекции.
	 * @param {K} key Ключ.
	 * @returns {boolean} Коллекция содержит элемент с указанным ключом.
	 */
	containsKey: function(key) {
		return this.get(key) !== undefined;
	},
	
	containsItem: function(item) {
		return !this.every(function(v) { return item !== v; });
	},
	
	/**
	 * Определяет ключ элемента в данной коллекции. Если такого элемента в коллекции нет, вернет undefined.
	 * @param {T} item Элемент.
	 * @returns {K} Ключ элемента.
	 */
	keyOf: function(item) {
		return this.find(function(v) { return item === v; });
	},
	
	/**
	 * @method trySet
	 *
	 * Заменяет элемент по ключу. В случае если элемента с таким ключом нет:
	 *
	 * - Массив сломается
	 * - Словарь добавит новый элемент
	 *
	 * @param {T} item Элемент.
	 * @param {K} key Ключ.
	 * @returns {JW.Proxy} `<T>` Обертка над бывшим элементом коллекции. Если нет изменений - undefined.
	 */
	/**
	 * Заменяет элемент по ключу. В случае если элемента с таким ключом нет:
	 *
	 * - Массив сломается
	 * - Словарь добавит новый элемент
	 *
	 * @param {T} item Элемент.
	 * @param {K} key Ключ.
	 * @returns {T} Бывший элемент коллекции.
	 */
	set: function(item, key) {
		var result = this.trySet(item, key);
		return (result !== undefined) ? result.value : this.get(key);
	},
	
	/**
	 * @method tryRemove
	 *
	 * Удаляет элемент по ключу. В случае если элемента с таким ключом нет:
	 *
	 * - Массив сломается
	 * - Словарь вернет undefined
	 *
	 * @param {K} key Ключ.
	 * @returns {T} Бывший элемент коллекции. Если нет изменений - undefined.
	 */
	/**
	 * Удаляет элемент по ключу. В случае если элемента с таким ключом нет:
	 *
	 * - Массив сломается
	 * - Словарь вернет undefined
	 *
	 * @param {K} key Ключ.
	 * @returns {T} Бывший элемент коллекции.
	 */
	remove: function(key) {
		return this.tryRemove(key);
	},
	
	removeItem: function(item) {
		var key = this.keyOf(item);
		if (key !== undefined) {
			this.tryRemove(key);
		}
		return key;
	},
	
	/**
	 * @method every
	 *
	 * Проверяет все элементы по критерию.
	 * 
	 * Возвращает true тогда и только тогда, когда функция f возвращает !== false на всех элементах коллекции.
	 * 
	 * Алгоритм последовательно перебирает все элементы, и останавливается после первого элемента, не удовлетворяющего
	 * критерию.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: K): boolean`
	 *
	 * Критерий проверки элементов.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {boolean} Результат проверки.
	 */
	/**
	 * Проверяет каждый элемент по критерию.
	 * 
	 * Возвращает true тогда и только тогда, когда функция f возвращает !== false хотя бы на одном элементе коллекции.
	 * 
	 * Алгоритм последовательно перебирает все элементы, и останавливается после первого элемента, удовлетворяющего
	 * критерию.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: K): boolean`
	 *
	 * Критерий проверки элементов.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {boolean} Результат проверки.
	 */
	some: function(callback, scope) {
		return !this.every(function(item, key) {
			return callback.call(this, item, key) === false;
		}, scope);
	},
	
	/**
	 * Перебирает элементы коллекции. Запускает указанную функцию на всех элементах.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: K): void`
	 *
	 * Функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {void}
	 */
	each: function(callback, scope) {
		this.every(function(item, key) {
			callback.call(this, item, key);
			return true;
		}, scope);
	},
	
	/**
	 * Ищет элемент по критерию.
	 * 
	 * Возвращает ключ первого элемента, функция f на котором возвращает !== false.
	 * 
	 * Алгоритм последовательно перебирает все элементы, и останавливается после первого элемента, удовлетворяющего
	 * критерию.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: K): boolean`
	 *
	 * Критерий проверки элементов.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {K} Ключ найденного элемента или undefined.
	 */
	find: function(callback, scope) {
		var result;
		this.every(function(item, key) {
			if (callback.call(this, item, key) !== false) {
				result = key;
				return false;
			}
			return true;
		}, scope);
		return result;
	},
	
	/**
	 * Ищет элемент по критерию.
	 * 
	 * Возвращает первый элемент, функция f на котором возвращает !== false.
	 * 
	 * Алгоритм последовательно перебирает все элементы, и останавливается после первого элемента, удовлетворяющего
	 * критерию.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: K): boolean`
	 *
	 * Критерий проверки элементов.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {T} Найденный элемент или undefined.
	 */
	search: function(callback, scope) {
		var result;
		this.every(function(item, key) {
			if (callback.call(this, item, key) !== false) {
				result = item;
				return false;
			}
			return true;
		}, scope);
		return result;
	},
	
	/**
	 * @method toSorted
	 *
	 * Преобразует коллекцию в отсортированный массив.
	 *
	 * Строит массив из элементов коллекции, отсортированный по результату запуска функции f на каждом элементе.
	 *
	 * @param {Function} [f]
	 *
	 * `f(item: T, key: K): number/string`
	 *
	 * Функция-сортировщик для элемента. По умолчанию возвращает item.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {Array} Отсортированный массив.
	 */
	/**
	 * @method $toSorted
	 *
	 * Преобразует коллекцию в отсортированный массив.
	 *
	 * Строит массив из элементов коллекции, отсортированный по результату запуска функции f на каждом элементе.
	 *
	 * @param {Function} [f]
	 *
	 * `f(item: T, key: K): number/string`
	 *
	 * Функция-сортировщик для элемента. По умолчанию возвращает item.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {JW.Array} `<T>` Отсортированный массив.
	 */
	/**
	 * @method toSortedComparing
	 *
	 * Преобразует коллекцию в отсортированный массив.
	 *
	 * Строит массив из элементов коллекции, отсортированный по компаратору.
	 *
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, k1: K, k2: K): Number`
	 *
	 * Функция-компаратор. Возвращает положительное значение, если t1 > t2; отрицательное значение, если t1 < t2;
	 * 0, если t1 == t2. По умолчанию возвращает JW.cmp(t1, t2).
	 *
	 * @param {Object} [scope] Контекст вызова compare. По умолчанию compare вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {Array} Отсортированный массив.
	 */
	/**
	 * @method $toSortedComparing
	 *
	 * Преобразует коллекцию в отсортированный массив.
	 *
	 * Строит массив из элементов коллекции, отсортированный по компаратору.
	 *
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, k1: K, k2: K): Number`
	 *
	 * Функция-компаратор. Возвращает положительное значение, если t1 > t2; отрицательное значение, если t1 < t2;
	 * 0, если t1 == t2. По умолчанию возвращает JW.cmp(t1, t2).
	 *
	 * @param {Object} [scope] Контекст вызова compare. По умолчанию compare вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {JW.Array} `<T>` Отсортированный массив.
	 */
	 
	/**
	 * Возвращает массив ключей отсортированных элементов.
	 *
	 * Строит массив из ключей элементов коллекции, отсортированный по результату запуска функции f на каждом элементе.
	 *
	 * @param {Function} [f]
	 *
	 * `f(item: T, key: K): number/string`
	 *
	 * Функция-сортировщик для элемента. По умолчанию возвращает item.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {Array} `<K>` Массив ключей отсортированных элементов.
	 */
	getSortingKeys: function(callback, scope, order) {
		return this._callStatic("getSortingKeys", [callback, scope || this, order]);
	},
	
	/**
	 * Возвращает массив ключей отсортированных элементов.
	 *
	 * Строит массив из ключей элементов коллекции, отсортированный по результату запуска функции f на каждом элементе.
	 *
	 * @param {Function} [f]
	 *
	 * `f(item: T, key: K): number/string`
	 *
	 * Функция-сортировщик для элемента. По умолчанию возвращает item.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {JW.Array} `<K>` Массив ключей отсортированных элементов.
	 */
	$getSortingKeys: JW.AbstractCollection._create$Array("getSortingKeys"),
	
	/**
	 * Возвращает массив ключей отсортированных элементов.
	 *
	 * Строит массив из ключей элементов коллекции, отсортированный по компаратору.
	 *
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, k1: K, k2: K): Number`
	 *
	 * Функция-компаратор. Возвращает положительное значение, если t1 > t2; отрицательное значение, если t1 < t2;
	 * 0, если t1 == t2. По умолчанию возвращает JW.cmp(t1, t2).
	 *
	 * @param {Object} [scope] Контекст вызова compare. По умолчанию compare вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {Array} `<K>` Массив ключей отсортированных элементов.
	 */
	getSortingKeysComparing: function(compare, scope, order) {
		return this._callStatic("getSortingKeysComparing", [compare, scope || this, order]);
	},
	
	/**
	 * Возвращает массив ключей отсортированных элементов.
	 *
	 * Строит массив из ключей элементов коллекции, отсортированный по компаратору.
	 *
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, k1: K, k2: K): Number`
	 *
	 * Функция-компаратор. Возвращает положительное значение, если t1 > t2; отрицательное значение, если t1 < t2;
	 * 0, если t1 == t2. По умолчанию возвращает JW.cmp(t1, t2).
	 *
	 * @param {Object} [scope] Контекст вызова compare. По умолчанию compare вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {JW.Array} `<K>` Массив ключей отсортированных элементов.
	 */
	$getSortingKeysComparing: JW.AbstractCollection._create$Array("getSortingKeysComparing"),
	
	/**
	 * @method $index
	 *
	 * Индексирует коллекцию.
	 *
	 * Строит словарь, в ключах которого находятся результаты запуска функции f на всех элементах,
	 * а в значениях - соответствующие элементы.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: K): string`
	 *
	 * Функция-индексатор для элемента.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {JW.Map} `<T>` Индекс коллекции.
	 */
	/**
	 * Индексирует коллекцию.
	 *
	 * Строит словарь, в ключах которого находятся результаты запуска функции f на всех элементах,
	 * а в значениях - соответствующие элементы.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: K): string`
	 *
	 * Функция-индексатор для элемента.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {Object} Индекс коллекции.
	 */
	index: function(callback, scope) {
		var result = {};
		this.every(function(item, k) {
			var key = callback.call(this, item, k);
			if (JW.isSet(key)) {
				result[key] = item;
			}
			return true;
		}, scope);
		return result;
	},
	
	/**
	 * Преобразует коллекцию в словарь.
	 *
	 * Строит новый словарь, включающий все элементы коллекции с их ключами в данной коллекции.
	 *
	 * @returns {Object} Словарь элементов.
	 */
	toMap: function() {
		var result = {};
		this.every(function(v, k) {
			result[k] = v;
		});
		return result;
	},
	
	/**
	 * Преобразует коллекцию в словарь.
	 *
	 * Строит новый словарь, включающий все элементы коллекции с их ключами в данной коллекции.
	 *
	 * @returns {JW.Map} `<T>` Словарь элементов.
	 */
	$toMap: JW.AbstractCollection._create$Map("toMap"),
	
	/**
	 * Представляет коллекцию в виде словаря.
	 *
	 * Если данная коллекция - словарь, сразу возвращает его. В противном случае запускает метод #toMap.
	 * Данная функция работает как правило быстрее #toMap, но сначала убедитесь, что возвращенный массив
	 * никто не меняет, иначе могут возникнуть странные непредвиденные баги.
	 *
	 * @returns {Object} Словарь элементов.
	 */
	asMap: function() {
		return this.toMap();
	},
	
	/**
	 * Представляет коллекцию в виде словаря.
	 *
	 * Если данная коллекция - словарь, сразу возвращает его. В противном случае запускает метод #toMap.
	 * Данная функция работает как правило быстрее #toMap, но сначала убедитесь, что возвращенный массив
	 * никто не меняет, иначе могут возникнуть странные непредвиденные баги.
	 *
	 * @returns {JW.Map} `<K, T>` Словарь элементов.
	 */
	$asMap: JW.AbstractCollection._create$Map("asMap")
	
	/**
	 * @method filter
	 *
	 * Фильтрует коллекцию по критерию.
	 *
	 * Строит новую коллекцию того же типа, включающую только те элементы, функция f на которых вернула !== false.
	 *
	 * @param {Function} f
	 *
	 * `f(T item, key: K): boolean`
	 *
	 * Фильтрующая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {Array/Object} Отфильтрованная коллекция.
	 */
	/**
	 * @method $filter
	 *
	 * Фильтрует коллекцию по критерию.
	 *
	 * Строит новую коллекцию того же типа, включающую только те элементы, функция f на которых вернула !== false.
	 *
	 * @param {Function} f
	 *
	 * `f(T item, key: K): boolean`
	 *
	 * Фильтрующая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {JW.IndexedCollection} `<K, T>` Отфильтрованная коллекция.
	 */
	/**
	 * @method map
	 *
	 * `<U>` Отображает элементы коллекции.
	 * 
	 * Строит новую коллекцию того же типа, состояющую из результатов запуска функции f на каждом элементе коллекции.
	 *
	 * @param {Function} f
	 *
	 * `f(T item, key: K): U`
	 *
	 * Отображающая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {Array/Object} Отображенная коллекция.
	 */
	/**
	 * @method $map
	 *
	 * `<U>` Отображает элементы коллекции.
	 * 
	 * Строит новую коллекцию того же типа, состояющую из результатов запуска функции f на каждом элементе коллекции.
	 *
	 * @param {Function} f
	 *
	 * `f(T item, key: K): U`
	 *
	 * Отображающая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {JW.IndexedCollection} `<K, U>` Отображенная коллекция.
	 */
	
	/**
	 * @method createEmpty
	 * `<U>` Конструирует пустую коллекцию того же типа.
	 * @returns {JW.IndexedCollection} `<K, U>` Коллекция.
	 */
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

JW.IndexedCollection.createStaticMethods = function(namespace) {
	JW.AbstractCollection.createStaticMethods(namespace);
	
	namespace.getFirst = function(target) {
		var key = namespace.getFirstKey(target);
		if (key !== undefined) {
			return namespace.get(target, key);
		}
	};
	
	namespace.$getKeys = JW.AbstractCollection._createStatic$Array(namespace, "getKeys");
	
	namespace.containsKey = function(target, key) {
		return namespace.get(target, key) !== undefined;
	};
	
	namespace.containsItem = function(target, item) {
		return !namespace.every(target, function(v) { return item !== v; });
	};
	
	namespace.keyOf = function(target, item) {
		return namespace.find(target, function(v) { return item === v; });
	};
	
	namespace.set = function(target, item, key) {
		var result = namespace.trySet(target, item, key);
		return (result !== undefined) ? result.value : namespace.get(target, key);
	};
	
	namespace.remove = function(target, key) {
		return namespace.tryRemove(target, key);
	};
	
	namespace.removeItem = function(target, item) {
		var key = namespace.keyOf(target, item);
		if (key !== undefined) {
			namespace.tryRemove(target, key);
		}
		return key;
	};
	
	namespace.some = function(target, callback, scope) {
		return !namespace.every(target, function(item, key) {
			return callback.call(this, item, key) === false;
		}, scope);
	};
	
	namespace.each = function(target, callback, scope) {
		namespace.every(target, function(item, key) {
			callback.call(this, item, key);
			return true;
		}, scope);
	};
	
	namespace.find = function(target, callback, scope) {
		var result;
		namespace.every(target, function(item, key) {
			if (callback.call(this, item, key) !== false) {
				result = key;
				return false;
			}
			return true;
		}, scope);
		return result;
	};
	
	namespace.search = function(target, callback, scope) {
		var result;
		namespace.every(target, function(item, key) {
			if (callback.call(this, item, key) !== false) {
				result = item;
				return false;
			}
			return true;
		}, scope);
		return result;
	};
	
	namespace.getSortingKeys = function(target, callback, scope, order) {
		callback = callback || function(x) { return x; };
		order = order || 1;
		var pairs = [];
		namespace.every(target, function(item, key) {
			pairs.push([key, callback.call(this, item, key)]);
		}, scope);
		pairs.sort(function(x, y) {
			return order * JW.cmp(x[1], y[1]);
		});
		return JW.Array.map(pairs, function(pair) {
			return pair[0];
		});
	};
	
	namespace.$getSortingKeys = JW.AbstractCollection._createStatic$Array(namespace, "getSortingKeys");
	
	namespace.getSortingKeysComparing = function(target, compare, scope, order) {
		compare = compare || JW.cmp;
		order = order || 1;
		var pairs = [];
		namespace.every(target, function(item, key) {
			pairs.push([key, item]);
		}, scope);
		pairs.sort(function(x, y) {
			return order * compare(x[1], y[1], x[0], y[0]);
		});
		return JW.Array.map(pairs, function(pair) {
			return pair[0];
		});
	};
	
	namespace.$getSortingKeysComparing = JW.AbstractCollection._createStatic$Array(namespace, "getSortingKeysComparing");
	
	namespace.toSorted = function(target, callback, scope, order) {
		return JW.Array.map(namespace.getSortingKeys(target, callback, scope, order), function(key) {
			return namespace.get(target, key);
		});
	};
	
	namespace.$toSorted = JW.AbstractCollection._createStatic$Array(namespace, "toSorted");
	
	namespace.toSortedComparing = function(target, compare, scope, order) {
		return JW.Array.map(namespace.getSortingKeysComparing(target, compare, scope, order), function(key) {
			return namespace.get(target, key);
		});
	};
	
	namespace.$toSortedComparing = JW.AbstractCollection._createStatic$Array(namespace, "toSortedComparing");
	
	namespace.index = function(target, callback, scope) {
		var result = {};
		namespace.every(target, function(item, k) {
			var key = callback.call(this, item, k);
			if (JW.isSet(key)) {
				result[key] = item;
			}
			return true;
		}, scope);
		return result;
	};
	
	namespace.toMap = function(target) {
		var result = {};
		namespace.every(target, function(v, k) {
			result[k] = v;
		});
		return result;
	};
	
	namespace.$toMap = JW.AbstractCollection._createStatic$Map(namespace, "toMap");
	
	namespace.asMap = function(target) {
		return namespace.toMap(target);
	};
	
	namespace.$asMap = JW.AbstractCollection._createStatic$Map(namespace, "asMap");
};

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T> extends JW.IndexedCollection<number, T>`
 *
 * Абстрактный массив.
 *
 * Массив - это упорядоченная коллекция, в которой каждый элемент имеет свой индекс. Индекс первого элемента равен 0,
 * индекс каждого следующего элемента на единицу больше.
 *
 * # Методы массива
 *
 * **Жирным шрифтом выделены изменения по сравнению с JW.IndexedCollection.**
 *
 * Получение содержимого:
 *
 * - {@link #getLength} - Возвращает количество элементов в коллекции.
 * - {@link #isEmpty} - Проверяет коллекцию на пустоту.
 * - {@link #get} - Возвращает элемент коллекции по индексу.
 * - {@link #getFirst} - Возвращает первый элемент коллекции.
 * - **{@link #getLast} - Возвращает последний элемент коллекции.**
 * - {@link #getFirstKey} - Возвращает индекс первого элемента коллекции.
 * - **{@link #getLastKey} - Возвращает индекс последнего элемента коллекции.**
 * - {@link #getKeys}, #$getKeys - Возвращает массив индексов всех элементов.
 * - {@link #containsItem} - Содержит ли коллекция элемент.
 * - {@link #containsKey} - Содержит ли коллекция индекс.
 * - {@link #keyOf} - Возвращает индекс элемента. Если элемент не найден, вернет undefined.
 * - **{@link #indexOf} - Возвращает индекс элемента. Если элемент не найден, вернет -1.**
 * - **{@link #getItems} - Возвращает внутреннее представление массива.**
 * - **{@link #binarySearch} - Ищет позицию бинарным поиском.**
 *
 * Алгоритмы перебора:
 *
 * - {@link #every} - Проверяет все элементы по критерию.
 * Возвращает true тогда и только тогда, когда все элементы удовлетворяют критерию.
 * - {@link #some} - Проверяет каждый элемент по критерию.
 * Возвращает true тогда и только тогда, когда хотя бы один элемент удовлетворяет критерию.
 * - {@link #each} - Перебирает элементы.
 * - {@link #search} - Ищет элемент по критерию.
 * Возвращает первый элемент, удовлетворяющий критерию.
 * - {@link #find} - Ищет элемент по критерию.
 * Возвращает индекс первого элемента, удовлетворяющего критерию.
 * - {@link #filter}, #$filter - Фильтрует коллекцию по критерию.
 * Строит новую коллекцию того же типа, включающую только элементы, удовлетворяющие критерию.
 * - {@link #map}, #$map - Отображает элементы коллекции.
 * Строит новую коллекцию того же типа, состояющую из результатов запуска отображающей функции на каждом элементе
 * коллекции.
 * - {@link #toSorted}, #$toSorted, #toSortedComparing, #$toSortedComparing -
 * Строит массив из элементов коллекции, отсортированный по индексу
 * или компаратору.
 * - {@link #getSortingKeys}, #$getSortingKeys, #getSortingKeysComparing, #$getSortingKeysComparing -
 * Возвращает индексы элементов, отсортированных по индексу или компаратору.
 * - {@link #index}, #$index - Индексирует коллекцию.
 * Строит словарь, в индексах которого находятся индексы элементов, а в значениях - соответствующие элементы.
 * - {@link #toArray}, #$toArray - Строит новый массив из элементов коллекции.
 * - {@link #toMap}, #$toMap - Строит новый словарь из элементов коллекции.
 * - {@link #toSet}, #$toSet - Строит новое множество из элементов коллекции.
 * - {@link #asArray}, #$asArray - Представляет коллекцию в виде массива.
 * - {@link #asMap}, #$asMap - Представляет коллекцию в виде словаря.
 * - {@link #asSet}, #$asSet - Представляет коллекцию в виде множества.
 * - **{@link #backEvery} - Проверяет все элементы по критерию в обратном порядке.**
 *
 * Изменение коллекции:
 *
 * - **{@link #add}, #tryAdd - Вставляет элемент.**
 * - **{@link #addAll}, #tryAddAll - Вставляет набор элементов.**
 * - {@link #set}, #trySet - Заменяет элемент по индексу.
 * - {@link #remove}, #tryRemove - Удаляет элемент по индексу.
 * - **{@link #removeAll}, #$removeAll, #tryRemoveAll - Удаляет набор элементов.**
 * - {@link #removeItem} - Удаляет первое вхождение элемента из коллекции.
 * - {@link #removeItems} - Удаляет все вхождения элементов из коллекции.
 * - **{@link #pop} - Удаляет последний элемент.**
 * - **{@link #move}, #tryMove - Перемещает элемент.**
 * - {@link #clear}, #$clear, #tryClear - Очищает коллекцию.
 * - **{@link #splice}, #trySplice - Удаляет/вставляет элементы.**
 * - **{@link #reorder}, #tryReorder - Переупорядочивает элементы.**
 * - **{@link #sort}, #sortComparing - Сортирует массив.**
 * - **{@link #performSplice} - Приводит содержимое методом #splice.**
 * - **{@link #performFilter} - Фильтрует содержимое методом #splice.**
 * - **{@link #performReorder} - Приводит содержимое методом #reorder.**
 *
 * Создание синхронизаторов:
 *
 * - {@link #createMapper} - Создает конвертер элементов.
 * - {@link #createFilterer} - Создает фильтровщик.
 * - {@link #createLister} - Создает конвертер в множество.
 * - {@link #createIndexer} - Создает индексатор.
 * - {@link #createOrderer} - Создает конвертер в массив (упорядочитель).
 * - {@link #createSorterComparing} - Создает конвертер в массив (сортировщик по компаратору).
 * - {@link #createObserver} - Создает наблюдатель.
 * - **{@link #createInserter} - Создает синхронизатор представления с массивом.**
 * - **{@link #createMerger} - Создает объединитель массивов.**
 * - **{@link #createReverser} - Создает обратитель массива.**
 *
 * Создание родственных коллекций (для разработки алгоритмов и синхронизаторов):
 *
 * - {@link #createEmpty} - Создает пустую коллекцию того же типа.
 * - {@link #createEmptyArray} - Создает пустой массив того же типа.
 * - {@link #createEmptyMap} - Создает пустой словарь того же типа.
 * - {@link #createEmptySet} - Создает пустое множество того же типа.
 *
 * Другие методы:
 *
 * - **{@link #detectSplice} - Определяет параметры метода #splice для приведения содержимого.**
 * - **{@link #detectFilter} - Определяет параметр removeParamsList метода #splice для фильтрации содержимого.**
 * - **{@link #detectReorder} - Определяет параметры метода #reorder для приведения содержимого.**
 * - **{@link #detectSort} - Определяет параметры метода #reorder для сортировки по индексу.**
 * - **{@link #detectSortComparing} - Определяет параметры метода #reorder для сортировки по компаратору.**
 * - **{@link #collapse} - Сплющивает многомерный массив.**
 * - **{@link #equal} - Сравнивает с другим массивом.**
 *
 * Все те же самые алгоритмы доступны и для нативного массива JavaScript Array, смотрите статические методы JW.Array.
 *
 * @extends JW.IndexedCollection
 * @abstract
 */
JW.AbstractArray = function(items, adapter) {
	JW.AbstractArray._super.call(this);
	this.items = adapter ? items : !items ? [] : (typeof items === "number") ? new Array(items) : items.concat();
	this.getKey = null;
};

JW.extend(JW.AbstractArray, JW.IndexedCollection, {
	/**
	 * @property {Function} getKey
	 *
	 * `getKey(item: T): number/string`
	 *
	 * Функция, возвращающая уникальный ключ элемента в данной коллекции. Функция используется
	 * алгоритмами #detectSplice, #performSplice, #detectReorder, #performReorder. По умолчанию равна JW.iid.
	 * Если коллекция содержит экземпляры JW.Class, то все тип-топ.
	 */
	/**
	 * @method getFirstKey
	 * Возвращает индекс первого элемента коллекции. Если коллекция пуста, вернет undefined.
	 * @returns {number} Индекс.
	 */
	/**
	 * @method containsKey
	 * Проверяет наличие элемента с заданным индексом в коллекции.
	 * @param {number} index Индекс.
	 * @returns {boolean} Коллекция содержит элемент с указанным индексом.
	 */
	/**
	 * @method keyOf
	 * Определяет индекс элемента в данной коллекции. Если такого элемента в коллекции нет, вернет undefined.
	 * @param {T} item Элемент.
	 * @returns {number} Индекс элемента.
	 */
	
	/**
	 * Возвращает массив элементов - внутреннее представление коллекции.
	 *
	 * **Метод не копирует коллекцию, будьте осторожны.**
	 *
	 * @returns {Array} Массив элементов.
	 */
	getItems: function() {
		return this.items;
	},
	
	/**
	 * Возвращает последний элемент коллекции. Если коллекция пуста, вернет undefined.
	 * @returns {T} Элемент.
	 */
	getLast: function() {
		return this.items[this.items.length - 1];
	},
	
	/**
	 * Возвращает индекс последнего элемента коллекции. Если коллекция пуста, вернет undefined.
	 * @returns {number} индекс.
	 */
	getLastKey: function() {
		var l = this.items.length;
		if (l !== 0) {
			return l - 1;
		}
	},
	
	getLength: function() {
		return this.items.length;
	},
	
	isEmpty: function() {
		return this.items.length === 0;
	},
	
	/**
	 * @method get
	 * Возвращает элемент по индексу. В случае, если элемента с таким индексом нет, вернет undefined.
	 * @param {number} index Индекс.
	 * @returns {T} Элемент.
	 */
	get: function(index) {
		return this.items[index];
	},
	
	/**
	 * @method $getKeys
	 * Возвращает массив индексов всех элементов коллекции, т.е. массив `[0, 1, ... , length - 1]`.
	 * @returns {JW.Array} `<number>` Массив ключей.
	 */
	/**
	 * Возвращает массив индексов всех элементов коллекции, т.е. массив `[0, 1, ... , length - 1]`.
	 * @returns {Array} Массив индексов.
	 */
	getKeys: function() {
		var items = this.items;
		var result = new Array(items.length);
		for (var i = 0, l = items.length; i < l; ++i) {
			result[i] = i;
		}
		return result;
	},
	
	/**
	 * Проверяет все элементы по критерию.
	 * 
	 * Возвращает true тогда и только тогда, когда функция f возвращает !== false на всех элементах коллекции.
	 * 
	 * Алгоритм последовательно перебирает все элементы, и останавливается после первого элемента, не удовлетворяющего
	 * критерию.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): boolean`
	 *
	 * Критерий проверки элементов.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {boolean} Результат проверки.
	 */
	every: function(callback, scope) {
		return JW.Array.every(this.items, callback, scope || this);
	},
	
	/**
	 * @method some
	 *
	 * Проверяет каждый элемент по критерию.
	 * 
	 * Возвращает true тогда и только тогда, когда функция f возвращает !== false хотя бы на одном элементе коллекции.
	 * 
	 * Алгоритм последовательно перебирает все элементы, и останавливается после первого элемента, удовлетворяющего
	 * критерию.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): boolean`
	 *
	 * Критерий проверки элементов.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {boolean} Результат проверки.
	 */
	/**
	 * @method each
	 *
	 * Перебирает элементы коллекции. Запускает указанную функцию на всех элементах.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): void`
	 *
	 * Функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {void}
	 */
	/**
	 * @method find
	 *
	 * Ищет элемент по критерию.
	 * 
	 * Возвращает индекс первого элемента, функция f на котором возвращает !== false.
	 * 
	 * Алгоритм последовательно перебирает все элементы, и останавливается после первого элемента, удовлетворяющего
	 * критерию.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): boolean`
	 *
	 * Критерий проверки элементов.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {number} Индекс найденного элемента или undefined.
	 */
	/**
	 * @method search
	 *
	 * Ищет элемент по критерию.
	 * 
	 * Возвращает первый элемент, функция f на котором возвращает !== false.
	 * 
	 * Алгоритм последовательно перебирает все элементы, и останавливается после первого элемента, удовлетворяющего
	 * критерию.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): boolean`
	 *
	 * Критерий проверки элементов.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {T} Найденный элемент или undefined.
	 */
	/**
	 * @method toSorted
	 *
	 * Преобразует коллекцию в отсортированный массив.
	 *
	 * Строит массив из элементов коллекции, отсортированный по результату запуска функции f на каждом элементе.
	 *
	 * @param {Function} [f]
	 *
	 * `f(item: T, index: number): number/string`
	 *
	 * Функция-сортировщик для элемента. По умолчанию возвращает item.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {Array} Отсортированный массив.
	 */
	/**
	 * @method $toSorted
	 *
	 * Преобразует коллекцию в отсортированный массив.
	 *
	 * Строит массив из элементов коллекции, отсортированный по результату запуска функции f на каждом элементе.
	 *
	 * @param {Function} [f]
	 *
	 * `f(item: T, index: number): number/string`
	 *
	 * Функция-сортировщик для элемента. По умолчанию возвращает item.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {JW.Array} `<T>` Отсортированный массив.
	 */
	/**
	 * @method toSortedComparing
	 *
	 * Преобразует коллекцию в отсортированный массив.
	 *
	 * Строит массив из элементов коллекции, отсортированный по компаратору.
	 *
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, i1: number, i2: number): Number`
	 *
	 * Функция-компаратор. Возвращает положительное значение, если t1 > t2; отрицательное значение, если t1 < t2;
	 * 0, если t1 == t2. По умолчанию возвращает JW.cmp(t1, t2).
	 *
	 * @param {Object} [scope] Контекст вызова compare. По умолчанию compare вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {Array} Отсортированный массив.
	 */
	/**
	 * @method $toSortedComparing
	 *
	 * Преобразует коллекцию в отсортированный массив.
	 *
	 * Строит массив из элементов коллекции, отсортированный по компаратору.
	 *
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, i1: number, i2: number): Number`
	 *
	 * Функция-компаратор. Возвращает положительное значение, если t1 > t2; отрицательное значение, если t1 < t2;
	 * 0, если t1 == t2. По умолчанию возвращает JW.cmp(t1, t2).
	 *
	 * @param {Object} [scope] Контекст вызова compare. По умолчанию compare вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {JW.Array} `<T>` Отсортированный массив.
	 */
	/**
	 * @method getSortingKeys
	 *
	 * Возвращает массив индексов отсортированных элементов.
	 *
	 * Строит массив из индексов элементов коллекции, отсортированный по результату запуска функции f на каждом
	 * элементе.
	 *
	 * @param {Function} [f]
	 *
	 * `f(item: T, index: number): number/string`
	 *
	 * Функция-сортировщик для элемента. По умолчанию возвращает item.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {Array} `<number>` Массив индексов отсортированных элементов.
	 */
	/**
	 * @method $getSortingKeys
	 *
	 * Возвращает массив индексов отсортированных элементов.
	 *
	 * Строит массив из индексов элементов коллекции, отсортированный по результату запуска функции f на каждом
	 * элементе.
	 *
	 * @param {Function} [f]
	 *
	 * `f(item: T, index: number): number/string`
	 *
	 * Функция-сортировщик для элемента. По умолчанию возвращает item.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {JW.Array} `<number>` Массив индексов отсортированных элементов.
	 */
	/**
	 * @method getSortingKeysComparing
	 *
	 * Возвращает массив индексов отсортированных элементов.
	 *
	 * Строит массив из индексов элементов коллекции, отсортированный по компаратору.
	 *
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, i1: number, i2: number): Number`
	 *
	 * Функция-компаратор. Возвращает положительное значение, если t1 > t2; отрицательное значение, если t1 < t2;
	 * 0, если t1 == t2. По умолчанию возвращает JW.cmp(t1, t2).
	 *
	 * @param {Object} [scope] Контекст вызова compare. По умолчанию compare вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {Array} `<number>` Массив индексов отсортированных элементов.
	 */
	/**
	 * @method $getSortingKeysComparing
	 *
	 * Возвращает массив индексов отсортированных элементов.
	 *
	 * Строит массив из индексов элементов коллекции, отсортированный по компаратору.
	 *
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, i1: number, i2: number): Number`
	 *
	 * Функция-компаратор. Возвращает положительное значение, если t1 > t2; отрицательное значение, если t1 < t2;
	 * 0, если t1 == t2. По умолчанию возвращает JW.cmp(t1, t2).
	 *
	 * @param {Object} [scope] Контекст вызова compare. По умолчанию compare вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {JW.Array} `<number>` Массив индексов отсортированных элементов.
	 */
	/**
	 * @method index
	 *
	 * Индексирует коллекцию.
	 *
	 * Строит словарь, в ключах которого находятся результаты запуска функции f на всех элементах,
	 * а в значениях - соответствующие элементы.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): string`
	 *
	 * Функция-индексатор для элемента.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {Object} Индекс коллекции.
	 */
	/**
	 * @method $index
	 *
	 * Индексирует коллекцию.
	 *
	 * Строит словарь, в ключах которого находятся результаты запуска функции f на всех элементах,
	 * а в значениях - соответствующие элементы.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): string`
	 *
	 * Функция-индексатор для элемента.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {JW.Map} `<T>` Индекс коллекции.
	 */
	
	/**
	 * Фильтрует коллекцию по критерию.
	 *
	 * Строит новую коллекцию того же типа, включающую только те элементы, функция f на которых вернула !== false.
	 *
	 * @param {Function} f
	 *
	 * `f(T item, index: number): boolean`
	 *
	 * Фильтрующая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {Array} Отфильтрованная коллекция.
	 */
	filter: function(callback, scope) {
		return JW.Array.filter(this.items, callback, scope || this);
	},
	
	/**
	 * Фильтрует коллекцию по критерию.
	 *
	 * Строит новую коллекцию того же типа, включающую только те элементы, функция f на которых вернула !== false.
	 *
	 * @param {Function} f
	 *
	 * `f(T item, index: number): boolean`
	 *
	 * Фильтрующая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {JW.Array} `<T>` Отфильтрованная коллекция.
	 */
	$filter: JW.AbstractCollection._create$Array("filter"),
	
	/**
	 * `<U>` Отображает элементы коллекции.
	 * 
	 * Строит новую коллекцию того же типа, состояющую из результатов запуска функции f на каждом элементе коллекции.
	 *
	 * @param {Function} f
	 *
	 * `f(T item, index: number): U`
	 *
	 * Отображающая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {Array} Отображенная коллекция.
	 */
	map: function(callback, scope) {
		return JW.Array.map(this.items, callback, scope || this);
	},
	
	/**
	 * `<U>` Отображает элементы коллекции.
	 * 
	 * Строит новую коллекцию того же типа, состояющую из результатов запуска функции f на каждом элементе коллекции.
	 *
	 * @param {Function} f
	 *
	 * `f(T item, index: number): U`
	 *
	 * Отображающая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {JW.Array} `<U>` Отображенная коллекция.
	 */
	$map: JW.AbstractCollection._create$Array("map"),
	
	toArray: function() {
		return this.items.concat();
	},
	
	asArray: function() {
		return this.items;
	},
	
	$asArray: function() {
		return this;
	},
	
	/**
	 * Добавляет элемент в массив.
	 * @param {T} item Элемент.
	 * @param {number} [index] Индекс элемента, перед которым вставить новый элемент. По умолчанию, добавляет элемент
	 * в конец массива.
	 * @returns {void}
	 */
	add: function(item, index) {
		this.tryAdd(item, index);
	},
	
	/**
	 * Добавляет элемент в массив.
	 * @param {T} item Элемент.
	 * @param {number} [index] Индекс элемента, перед которым вставить новый элемент. По умолчанию, добавляет элемент
	 * в конец массива.
	 * @returns {boolean} true.
	 */
	tryAdd: function(item, index) {
		return this.tryAddAll([item], index);
	},
	
	/**
	 * Добавляет набор элементов в массив.
	 * @param {Array} items `<T>` Элементы.
	 * @param {number} [index] Индекс элемента, перед которым вставить новые элементы. По умолчанию, добавляет элементы
	 * в конец массива.
	 * @returns {void}
	 */
	addAll: function(items, index) {
		this.tryAddAll(items, index);
	},
	
	/**
	 * Добавляет набор элементов в массив.
	 * @param {Array} items `<T>` Элементы.
	 * @param {number} [index] Индекс элемента, перед которым вставить новые элементы. По умолчанию, добавляет элементы
	 * в конец массива.
	 * @returns {boolean} true. Если нет изменений - undefined.
	 */
	tryAddAll: function(items, index) {
		if (index === undefined) {
			index = this.items.length;
		}
		if (this.trySplice([], [new JW.AbstractArray.IndexItems(index, items)])) {
			return true;
		}
	},
	
	/**
	 * @method set
	 * Заменяет элемент с указанным индексом. В случае если элемента с таким индексом нет, массив сломается
	 * (не надо так).
	 * @param {T} item Элемент.
	 * @param {number} index Индекс.
	 * @returns {T} Бывший элемент коллекции.
	 */
	/**
	 * Заменяет элемент с указанным индексом. В случае если элемента с таким индексом нет, массив сломается
	 * (не надо так).
	 * @param {T} item Элемент.
	 * @param {number} index Индекс.
	 * @returns {JW.Proxy} `<T>` Обертка над бывшим элементом коллекции. Если нет изменений - undefined.
	 */
	trySet: function(item, index) {
		return JW.Array.trySet(this.items, item, index);
	},
	
	/**
	 * @method remove
	 * Удаляет элемент с указанным индексом. В случае если элемента с таким индексом нет, массив сломается
	 * (не надо так).
	 * @param {number} index Индекс.
	 * @returns {T} Бывший элемент коллекции.
	 */
	/**
	 * Удаляет элемент с указанным индексом. В случае если элемента с таким индексом нет, массив сломается
	 * (не надо так).
	 * @param {number} index Индекс.
	 * @returns {T} Бывший элемент коллекции. Если нет изменений - undefined.
	 */
	tryRemove: function(index) {
		var result = this.tryRemoveAll(index, 1);
		if (result !== undefined) {
			return result[0];
		}
	},
	
	/**
	 * Удаляет набор элементов из массива.
	 * @param {number} index Индекс элемента, начиная с которого удалять.
	 * @param {number} count Количество удаленных элементов.
	 * @returns {Array} `<T>` Удаленные элементы.
	 */
	removeAll: function(index, count) {
		var result = this.tryRemoveAll(index, count);
		return result || [];
	},
	
	/**
	 * Удаляет набор элементов из массива.
	 * @param {number} index Индекс элемента, начиная с которого удалять.
	 * @param {number} count Количество удаленных элементов.
	 * @returns {JW.Array} `<T>` Удаленные элементы.
	 */
	$removeAll: JW.AbstractCollection._create$Array("removeAll"),
	
	/**
	 * Удаляет набор элементов из массива.
	 * @param {number} index Индекс элемента, начиная с которого удалять.
	 * @param {number} count Количество удаленных элементов.
	 * @returns {Array} `<T>` Удаленные элементы. Если нет изменений - undefined.
	 */
	tryRemoveAll: function(index, count) {
		var result = this.trySplice([new JW.AbstractArray.IndexCount(index, count)], []);
		if (result !== undefined) {
			return result.removedItemsList[0].items;
		}
	},
	
	removeItems: function(items) {
		var itemSet = new JW.Set(items);
		var newItems = this.filter(function(item) { return !itemSet.contains(item); });
		this.performFilter(newItems);
	},
	
	/**
	 * Перемещает элемент в массиве.
	 * @param {number} fromIndex Индекс элемента, который переместить.
	 * @param {number} toIndex Куда переместить.
	 * @returns {T} Перемещенный элемент.
	 */
	move: function(fromIndex, toIndex) {
		this.tryMove(fromIndex, toIndex);
		return this.get(toIndex);
	},
	
	/**
	 * Перемещает элемент в массиве.
	 * @param {number} fromIndex Индекс элемента, который переместить.
	 * @param {number} toIndex Куда переместить.
	 * @returns {T} Перемещенный элемент. Если нет изменений - undefined.
	 */
	tryMove: function(fromIndex, toIndex) {
		return JW.Array.tryMove(this.items, fromIndex, toIndex);
	},
	
	/**
	 * Очищает коллекцию.
	 * @returns {Array} `<T>` Бывшее содержимое коллекции.
	 */
	clear: function() {
		var result = this.tryClear();
		return (result !== undefined) ? result : [];
	},
	
	/**
	 * Очищает коллекцию.
	 * @returns {JW.Array} `<T>` Бывшее содержимое коллекции.
	 */
	$clear: JW.AbstractCollection._create$Array("clear"),
	
	/**
	 * Очищает коллекцию.
	 * @returns {Array} `<T>` Бывшее содержимое коллекции. Если нет изменений - undefined.
	 */
	tryClear: function() {
		return JW.Array.tryClear(this.items);
	},
	
	/**
	 * Добавляет и удаляет элементы коллекции. Универсальная оптимизированная атомарная операция удаления/вставки.
	 * @param {Array} removeParamsList `<JW.AbstractArray.IndexCount>` Список отрезков для удаления по возрастанию
	 * индекса. Отрезки удаляются от конца к началу массива.
	 * @param {Array} addParamsList `<JW.AbstractArray.IndexItems<T>>` Список наборов для вставки по возрастанию
	 * индекса. Наборы вставляются от начала к концу массива.
	 * @returns {JW.AbstractArray.SpliceResult} `<T>` Результат.
	 */
	splice: function(removeParamsList, addParamsList) {
		var result = this.trySplice(removeParamsList, addParamsList);
		return (result !== undefined) ? result : new JW.AbstractArray.SpliceResult(this.items.concat(), [], []);
	},
	
	/**
	 * Добавляет и удаляет элементы коллекции. Универсальная оптимизированная атомарная операция удаления/вставки.
	 * @param {Array} removeParamsList `<JW.AbstractArray.IndexCount>` Список отрезков для удаления по возрастанию
	 * индекса. Отрезки удаляются от конца к началу массива.
	 * @param {Array} addParamsList `<JW.AbstractArray.IndexItems<T>>` Список наборов для вставки по возрастанию
	 * индекса. Наборы вставляются от начала к концу массива.
	 * @returns {JW.AbstractArray.SpliceResult} `<T>` Результат. Если нет изменений - undefined.
	 */
	trySplice: function(removeParamsList, addParamsList) {
		return JW.Array.trySplice(this.items, removeParamsList, addParamsList);
	},
	
	/**
	 * Переупорядочивает элементы массива.
	 * @param {Array} indexArray `<number>` Массив индексов. Элемент с индексом i будет перемещен в
	 * индекс indexArray[i]. Должен содержать все индексы от 0 до (length - 1).
	 * @returns {void}
	 */
	reorder: function(indexArray) {
		this.tryReorder(indexArray);
	},
	
	/**
	 * Переупорядочивает элементы массива.
	 * @param {Array} indexArray `<number>` Массив индексов. Элемент с индексом i будет перемещен в
	 * индекс indexArray[i]. Должен содержать все индексы от 0 до (length - 1).
	 * @returns {Array} `<T>` Бывшее содержимое массива. Если нет изменений - undefined.
	 */
	tryReorder: function(indexArray) {
		return JW.Array.tryReorder(this.items, indexArray);
	},
	
	/**
	 * Определяет параметры метода #splice, с которыми содержимое массива станет равно newItems.
	 * Т.е. определяет, какие элементы нужно удалить, какие вставить, и в какое место. Все элементы должны быть
	 * уникальны относительно функции getKey. Если элементы не уникальны, попробуйте метод #detectFilter.
	 * @param {Array} newItems `<T>` Новое содержимое массива.
	 * @param {Function} [getKey] Функция, возвращающая уникальный ключ элемента в коллекции. По умолчанию
	 * равна #getKey. Если коллекция содержит экземпляры JW.Class, то все тип-топ.
	 * @param {Object} [scope] Контекст вызова getKey. По умолчанию, функция вызывается в контексте коллекции.
	 * @returns {JW.AbstractArray.SpliceParams}
	 * `<T>` Параметры метода #splice.
	 * Если вызова метода не требуется - undefined.
	 */
	detectSplice: function(newItems, getKey, scope) {
		return JW.Array.detectSplice(this.items, newItems, getKey || this.getKey, scope || this);
	},
	
	/**
	 * Определяет параметр removeParamsList метода #splice, с которыми содержимое массива станет равно newItems.
	 * Определяет, какие элементы нужно удалить. Не предусматривает вставку новых элементов. В отличие от
	 * метода #detectSplice, не требует уникальности элементов массива.
	 * @param {Array} newItems `<T>` Новое содержимое массива.
	 * @returns {Array}
	 * `<JW.AbstractArray.IndexCount>` Параметр removeParamsList метода #splice.
	 * Если вызова метода не требуется - undefined.
	 */
	detectFilter: function(newItems) {
		return JW.Array.detectFilter(this.items, newItems);
	},
	
	/**
	 * Определяет параметр метода #reorder, с которым содержимое массива станет равно newItems.
	 * Т.е. определяет, какие элементы куда нужно переместить.
	 * Если содержимое newItems отличается от содержимого массива, массив сломается.
	 * @param {Array} newItems `<T>` Новое содержимое массива.
	 * @param {Function} [getKey] Функция, возвращающая уникальный ключ элемента в коллекции. По умолчанию
	 * равна #getKey. Если коллекция содержит экземпляры JW.Class, то все тип-топ.
	 * @param {Object} [scope] Контекст вызова getKey. По умолчанию, функция вызывается в контексте коллекции.
	 * @returns {Array}
	 * `<number>` Параметр indexArray метода #reorder.
	 * Если вызова метода не требуется - undefined.
	 */
	detectReorder: function(newItems, getKey, scope) {
		return JW.Array.detectReorder(this.items, newItems, getKey || this.getKey, scope || this);
	},
	
	/**
	 * Определяет параметр метода #reorder, с которым содержимое массива отсортируется по результату вызова
	 * функции f на всех элементах.
	 *
	 * @param {Function} [f]
	 *
	 * `f(item: T, index: number): number/string`
	 *
	 * Функция-сортировщик для элемента. По умолчанию возвращает item.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {Array}
	 * `<number>` Параметр indexArray метода #reorder.
	 * Если вызова метода не требуется - undefined.
	 */
	detectSort: function(callback, scope, order) {
		return JW.Array.detectSort(this.items, callback, scope || this, order);
	},
	
	/**
	 * Определяет параметр метода #reorder, с которым содержимое массива отсортируется по компаратору.
	 *
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, i1: number, i2: number): Number`
	 *
	 * Функция-компаратор. Возвращает положительное значение, если t1 > t2; отрицательное значение, если t1 < t2;
	 * 0, если t1 == t2. По умолчанию возвращает JW.cmp(t1, t2).
	 *
	 * @param {Object} [scope] Контекст вызова compare. По умолчанию compare вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {Array}
	 * `<number>` Параметр indexArray метода #reorder.
	 * Если вызова метода не требуется - undefined.
	 */
	detectSortComparing: function(compare, scope, order) {
		return JW.Array.detectSortComparing(this.items, compare, scope || this, order);
	},
	
	/**
	 * Преобразует содержимое массива к newItems комбинацией методов #detectSplice и #splice.
	 * Все элементы должны быть
	 * уникальны относительно функции getKey. Если элементы не уникальны, попробуйте метод #performFilter.
	 * @param {Array} newItems `<T>` Новое содержимое массива.
	 * @param {Function} [getKey] Функция, возвращающая уникальный ключ элемента в коллекции. По умолчанию
	 * равна #getKey. Если коллекция содержит экземпляры JW.Class, то все тип-топ.
	 * @param {Object} [scope] Контекст вызова getKey. По умолчанию, функция вызывается в контексте коллекции.
	 * @returns {void}
	 */
	performSplice: function(newItems, getKey, scope) {
		var params = this.detectSplice(newItems, getKey || this.getKey, scope || this);
		if (params !== undefined) {
			this.trySplice(params.removeParamsList, params.addParamsList);
		}
	},
	
	/**
	 * Преобразует содержимое массива к newItems комбинацией методов #detectFilter и #splice.
	 * Только удаляет элементы. Не предусматривает вставку новых элементов. В отличие от
	 * метода #performSplice, не требует уникальности элементов массива.
	 * @param {Array} newItems `<T>` Новое содержимое массива.
	 * @returns {void}
	 */
	performFilter: function(newItems) {
		var params = this.detectFilter(newItems);
		if (params !== undefined) {
			this.trySplice(params, []);
		}
	},
	
	/**
	 * Преобразует содержимое массива к newItems комбинацией методов #detectReorder и #reorder.
	 * @param {Array} newItems `<T>` Новое содержимое массива.
	 * @param {Function} [getKey] Функция, возвращающая уникальный ключ элемента в коллекции. По умолчанию
	 * равна #getKey. Если коллекция содержит экземпляры JW.Class, то все тип-топ.
	 * @param {Object} [scope] Контекст вызова getKey. По умолчанию, функция вызывается в контексте коллекции.
	 * @returns {void}
	 */
	performReorder: function(newItems, getKey, scope) {
		var indexArray = this.detectReorder(newItems, getKey || this.getKey, scope || this);
		if (indexArray !== undefined) {
			this.tryReorder(indexArray);
		}
	},
	
	/**
	 * Сортирует массив по результату запуска функции f на элементах.
	 *
	 * @param {Function} [f]
	 *
	 * `f(item: T, index: number): number/string`
	 *
	 * Функция-сортировщик для элемента. По умолчанию возвращает item.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {void}
	 */
	sort: function(callback, scope, order) {
		var indexArray = this.detectSort(callback, scope, order);
		if (indexArray !== undefined) {
			this.tryReorder(indexArray);
		}
	},
	
	/**
	 * Сортирует массив по компаратору.
	 *
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, i1: number, i2: number): number`
	 *
	 * Функция-компаратор. Возвращает положительное значение, если t1 > t2; отрицательное значение, если t1 < t2;
	 * 0, если t1 == t2. По умолчанию возвращает JW.cmp(t1, t2).
	 *
	 * @param {Object} [scope] Контекст вызова compare. По умолчанию compare вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {void}
	 */
	sortComparing: function(compare, scope, order) {
		var indexArray = this.detectSortComparing(compare, scope, order);
		if (indexArray !== undefined) {
			this.tryReorder(indexArray);
		}
	},
	
	/**
	 * `<U>` Конструирует конвертер элементов коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractArray.Mapper}
	 * `<T, U>` Синхронизатор.
	 */
	createMapper: function(config) {
		return new JW.AbstractArray.Mapper(this, config);
	},
	
	/**
	 * Конструирует фильтровщик коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractArray.Filterer}
	 * `<T>` Синхронизатор.
	 */
	createFilterer: function(config) {
		return new JW.AbstractArray.Filterer(this, config);
	},
	
	/**
	 * Конструирует наблюдатель коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractArray.Observer}
	 * `<T>` Синхронизатор.
	 */
	createObserver: function(config) {
		return new JW.AbstractArray.Observer(this, config);
	},
	
	/**
	 * Конструирует конвертер коллекции в массив (упорядочитель).
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractArray.Orderer}
	 * `<T>` Синхронизатор.
	 */
	createOrderer: function(config) {
		return new JW.AbstractArray.Orderer(this, config);
	},
	
	/**
	 * Конструирует конвертер коллекции в массив (сортировщик по компаратору).
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractArray.SorterComparing}
	 * `<T>` Синхронизатор.
	 */
	createSorterComparing: function(config) {
		return new JW.AbstractArray.SorterComparing(this, config);
	},
	
	/**
	 * Конструирует индексатор коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractArray.Indexer}
	 * `<T>` Синхронизатор.
	 */
	createIndexer: function(config) {
		return new JW.AbstractArray.Indexer(this, config);
	},
	
	/**
	 * Конструирует конвертер коллекции в множество.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractArray.Lister}
	 * `<T>` Синхронизатор.
	 */
	createLister: function(config) {
		return new JW.AbstractArray.Lister(this, config);
	},
	
	/**
	 * Конструирует синхронизатор представления с массивом.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractArray.Inserter}
	 * `<T>` Синхронизатор.
	 */
	createInserter: function(config) {
		return new JW.AbstractArray.Inserter(this, config);
	},
	
	/**
	 * Конструирует объединитель массивов.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractArray.Merger}
	 * `<T>` Синхронизатор.
	 */
	createMerger: function(config) {
		return new JW.AbstractArray.Merger(this, config);
	},
	
	createMergerBunch: function(merger) {
		return new JW.AbstractArray.Merger.Bunch(merger, this);
	},
	
	/**
	 * Конструирует обратитель массива.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractArray.Reverser}
	 * `<T>` Синхронизатор.
	 */
	createReverser: function(config) {
		return new JW.AbstractArray.Reverser(this, config);
	},
	
	createSplitter: function(config) {
		return new JW.AbstractArray.Splitter(this, config);
	},
	
	/**
	 * Поэлементно сравнивает с другим массивом.
	 * @param {Array} arr `<T>` Другой массив.
	 * @returns {boolean} Массивы поэлементно равны.
	 */
	equal: function(arr) {
		return JW.Array.equal(this.items, arr);
	},
	
	/**
	 * Сплющивает массив массивов массивов... в один массив.
	 * @param {number} depth Глубина сплющивания.
	 * @returns {Array} Сплющенный массив.
	 */
	collapse: function(depth) {
		return JW.Array.collapse(this.items, depth);
	},
	
	/**
	 * Определяет индекс элемента в данной коллекции. Если такого элемента в коллекции нет, вернет -1.
	 * @param {T} item Элемент.
	 * @returns {number} Индекс элемента.
	 */
	indexOf: function(item) {
		return JW.Array.indexOf(this.items, item);
	},
	
	/**
	 * Проверяет все элементы по критерию в обратном порядке.
	 * 
	 * Возвращает true тогда и только тогда, когда функция f возвращает !== false на всех элементах коллекции.
	 * 
	 * Алгоритм перебирает все элементы с конца в начало, и останавливается после первого элемента, не удовлетворяющего
	 * критерию.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): boolean`
	 *
	 * Критерий проверки элементов.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {boolean} Результат проверки.
	 */
	backEvery: function(callback, scope) {
		return JW.Array.backEvery(this.items, callback, scope);
	},
	
	// deprecated
	top: function() {
		return JW.Array.top(this.items);
	},
	
	/**
	 * Удаляет последний элемент массива. Ничего не делает, если массив пуст.
	 * @returns {T} Удаленный элемент или undefined.
	 */
	pop: function() {
		if (this.items.length !== 0) {
			return this.tryRemove(this.items.length - 1);
		}
	},
	
	/**
	 * Ищет индекс первого элемента, который больше указанного значения относительно функции compare,
	 * используя бинарный поиск. Массив должен быть отсортирован по функции compare.
	 * @param {T} value Значение.
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T): number`
	 *
	 * Функция-компаратор. Возвращает положительное значение, если t1 > t2; отрицательное значение, если t1 < t2;
	 * 0, если t1 == t2. По умолчанию возвращает JW.cmp(t1, t2).
	 *
	 * @param {Object} [scope]
	 * Контекст вызова compare. По умолчанию, вызывается в контексте массива.
	 * @returns {number} Индекс элемента.
	 */
	binarySearch: function(value, compare, scope) {
		return JW.Array.binarySearch(this.items, value, compare, scope);
	},
	
	_callStatic: function(algorithm, args) {
		return JW.Array[algorithm].apply(JW.Array, [this.items].concat(args || []));
	}
	
	/**
	 * @method createEmpty
	 * `<U>` Конструирует пустую коллекцию того же типа.
	 * @returns {JW.AbstractArray} `<U>` Коллекция.
	 */
});

/**
 * @class
 * Пара "индекс-количество". Используется в параметрах метода JW.AbstractArray#splice чтобы указать, какие
 * элементы нужно удалить из массива.
 * @extends JW.Class
 *
 * @constructor
 * @param {number} index Индекс.
 * @param {number} count Количество.
 */
JW.AbstractArray.IndexCount = function(index, count) {
	JW.AbstractArray.IndexCount._super.call(this);
	this.index = index;
	this.count = count;
};

JW.extend(JW.AbstractArray.IndexCount, JW.Class, {
	/**
	 * @property {number} index Индекс.
	 */
	/**
	 * @property {number} count Количество.
	 */
	
	/**
	 * Клонирует пару.
	 * @returns JW.AbstractArray.IndexCount
	 */
	clone: function() {
		return new JW.AbstractArray.IndexCount(this.index, this.count);
	}
});

/**
 * @class
 * `<T>` Пара "индекс-элементы". Используется в параметрах метода JW.AbstractArray#splice чтобы указать, какие
 * элементы нужно вставить в массив.
 * @extends JW.Class
 *
 * @constructor
 * @param {number} index Индекс.
 * @param {Array} items `<T>` Элементы.
 */
JW.AbstractArray.IndexItems = function(index, items) {
	JW.AbstractArray.IndexItems._super.call(this);
	this.index = index;
	this.items = items;
};

JW.extend(JW.AbstractArray.IndexItems, JW.Class, {
	/**
	 * @property {number} index Индекс.
	 */
	/**
	 * @property {Array} items `<T>` Элементы.
	 */
	
	/**
	 * Преобразует в пару "индекс-количество".
	 * @returns {JW.AbstractArray.IndexCount} Пара "индекс-количество".
	 */
	toIndexCount: function() {
		return new JW.AbstractArray.IndexCount(this.index, this.items.length);
	},
	
	/**
	 * Клонирует пару.
	 * @returns JW.AbstractArray.IndexItems
	 */
	clone: function() {
		return new JW.AbstractArray.IndexItems(this.index, this.items.concat());
	}
});

/**
 * @class
 * `<T>` Параметры метода JW.AbstractArray#splice.
 * @extends JW.Class
 *
 * @constructor
 * @param {Array} removeParamsList `<JW.AbstractArray.IndexCount>` Сегменты для удаления.
 * @param {Array} addParamsList `<JW.AbstractArray.IndexItems<T>>` Наборы для вставки.
 */
JW.AbstractArray.SpliceParams = function(removeParamsList, addParamsList) {
	JW.AbstractArray.SpliceParams._super.call(this);
	this.removeParamsList = removeParamsList;
	this.addParamsList = addParamsList;
};

JW.extend(JW.AbstractArray.SpliceParams/*<T>*/, JW.Class, {
	/**
	 * @property {Array} removeParamsList `<JW.AbstractArray.IndexCount>` Сегменты для удаления.
	 */
	/**
	 * @property {Array} addParamsList `<JW.AbstractArray.IndexItems<T>>` Наборы для вставки.
	 */
});

/**
 * @class
 * `<T>` Результат метода JW.AbstractArray#splice.
 * @extends JW.Class
 *
 * @constructor
 * @param {Array} oldItems `<T>` Бывшее содержимое массива.
 * @param {Array} removedItemsList `<JW.AbstractArray.IndexItems<T>>` Наборы удаленных элементов.
 * @param {Array} addedItemsList `<JW.AbstractArray.IndexItems<T>>` Наборы вставленных элементов.
 */
JW.AbstractArray.SpliceResult = function(oldItems, removedItemsList, addedItemsList) {
	JW.AbstractArray.SpliceResult._super.call(this);
	this.oldItems = oldItems;
	this.removedItemsList = removedItemsList;
	this.addedItemsList = addedItemsList;
	this.removedItems = null;
	this.addedItems = null;
	this.removeParamsList = null;
};

JW.extend(JW.AbstractArray.SpliceResult/*<T>*/, JW.Class, {
	/**
	 * @property {Array} oldItems `<T>` Бывшее содержимое массива.
	 */
	/**
	 * @property {Array} removedItemsList `<JW.AbstractArray.IndexItems<T>>` Наборы удаленных элементов.
	 */
	/**
	 * @property {Array} addedItemsList `<JW.AbstractArray.IndexItems<T>>` Наборы вставленных элементов.
	 */
	/*
	Array<T> removedItems;
	Array<T> addedItems;
	Array<JW.AbstractArray.IndexCount<T>> removeParamsList;
	*/
	
	/**
	 * Возвращает общий массив удаленных элементов.
	 * @returns {Array} `<T>` Массив удаленных элементов.
	 */
	getRemovedItems: function() {
		if (!this.removedItems) {
			this.removedItems = JW.Array.merge(JW.Array.map(this.removedItemsList, JW.byField("items")));
		}
		return this.removedItems;
	},
	
	/**
	 * Возвращает общий массив добавленных элементов.
	 * @returns {Array} `<T>` Массив добавленных элементов.
	 */
	getAddedItems: function() {
		if (!this.addedItems) {
			this.addedItems = JW.Array.merge(JW.Array.map(this.addedItemsList, JW.byField("items")));
		}
		return this.addedItems;
	},
	
	/**
	 * Преобразует наборы удаленных элементов в сегменты для удаления.
	 * @returns {Array} `<JW.AbstractArray.IndexCount<T>>` Сегменты для удаления.
	 */
	getRemoveParamsList: function() {
		if (!this.removeParamsList) {
			this.removeParamsList = JW.Array.map(this.removedItemsList, JW.byMethod("toIndexCount"));
		}
		return this.removeParamsList;
	},
	
	/**
	 * Проверяет, что массив не изменился в результате вызова JW.AbstractArray#splice.
	 * @returns {boolean} Массив не изменился.
	 */
	isEmpty: function() {
		return (this.removedItemsList.length === 0) && (this.addedItemsList.length === 0);
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T> extends JW.AbstractCollection.Filterer<T, JW.AbstractArray<T>>`
 *
 * Фильтровщик массива. Подробнее читайте JW.AbstractCollection.Filterer.
 *
 * @extends JW.AbstractCollection.Filterer
 *
 * @constructor
 * Конструирует синхронизатор. Предпочтительнее использовать метод JW.AbstractCollection#createFilterer.
 * @param {JW.AbstractArray} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.AbstractArray.Filterer = function(source, config) {
	JW.AbstractArray.Filterer._super.call(this, source, config);
	this._filtered = [];
	this._splice([], [new JW.AbstractArray.IndexItems(0, this.source.getItems())]);
};

JW.extend(JW.AbstractArray.Filterer, JW.AbstractCollection.Filterer, {
	/**
	 * @cfg {JW.AbstractArray} target `<T>` Целевая коллекция.
	 */
	/**
	 * @property {JW.AbstractArray} source `<T>` Исходная коллекция.
	 */
	/**
	 * @property {JW.AbstractArray} target `<T>` Целевая коллекция.
	 */
	// Array<number> _filtered; // 0 - false, 1 - true
	
	// override
	destroy: function() {
		this.target.tryClear();
		this._super();
	},
	
	_countFiltered: function(index, count) {
		var result = 0;
		for (var i = 0; i < count; ++i) {
			result += this._filtered[index + i];
		}
		return result;
	},
	
	_splice: function(removedItemsList, addedItemsList) {
		var sourceIndex = 0;
		var targetIndex = 0;
		var removeParamsList = JW.Array.map(removedItemsList, function(indexItems) {
			targetIndex += this._countFiltered(sourceIndex, indexItems.index - sourceIndex);
			var count = this._countFiltered(indexItems.index, indexItems.items.length);
			var params = new JW.AbstractArray.IndexCount(targetIndex, count);
			sourceIndex = indexItems.index + indexItems.length;
			targetIndex += count;
			return params;
		}, this);
		JW.Array.trySplice(this._filtered, JW.Array.map(removedItemsList, JW.byMethod("toIndexCount")), []);
		
		var sourceIndex = 0;
		var targetIndex = 0;
		var addParamsList = JW.Array.map(addedItemsList, function(indexItems) {
			targetIndex += this._countFiltered(sourceIndex, indexItems.index - sourceIndex);
			var items = [];
			var filtered = JW.Array.map(indexItems.items, function(item) {
				if (this.filterItem.call(this.scope, item) === false) {
					return 0;
				}
				items.push(item);
				return 1;
			}, this);
			var params = new JW.AbstractArray.IndexItems(targetIndex, items);
			JW.Array.tryAddAll(this._filtered, filtered, indexItems.index);
			sourceIndex = indexItems.index + filtered.length;
			targetIndex += items.length;
			return params;
		}, this);
		
		this.target.trySplice(removeParamsList, addParamsList);
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T> extends JW.AbstractCollection.Indexer<T, JW.AbstractArray<T>>`
 *
 * Индексатор массива. Подробнее читайте JW.AbstractCollection.Indexer.
 *
 * @extends JW.AbstractCollection.Indexer
 *
 * @constructor
 * Конструирует синхронизатор. Предпочтительнее использовать метод JW.AbstractCollection#createIndexer.
 * @param {JW.AbstractArray} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.AbstractArray.Indexer = function(source, config) {
	JW.AbstractArray.Indexer._super.call(this, source, config);
};

JW.extend(JW.AbstractArray.Indexer, JW.AbstractCollection.Indexer, {
	/**
	 * @property {JW.AbstractArray} source `<T>` Исходная коллекция.
	 */
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T>`
 *
 * Синхронизатор представления массива. Прослушивает все события массива и сводит их к 2 элементарным функциям:
 * элемент добавлен в указанное место и элемент удален из указанного места. В целях оптимизации, можно определить
 * третью функцию: коллекция очищена (в случае, если есть более эффективный алгоритм очистки, чем удаление всех
 * элементов простым перебором). В отличие от JW.AbstractCollection.Observer, следит за порядком элементов.
 * Синхронизатор используется, прежде всего, для синхронизации DOM-элемента с массивом дочерних элементов.
 *
 * Создавайте синхронизатор с помощью метода JW.AbstractArray#createInserter:
 *
 *     var inserter = array.createInserter({
 *         addItem: function(el, index) { this.el.insert(el, index); },
 *         removeItem: function(el, index) { el.detach(); },
 *         scope: this
 *     });
 *
 * Метод сам определит, какая реализация синхронизатора лучше подойдет (простая или observable).
 *
 * Справка: jQuery.insert
 *
 * Правила работы синхронизатора:
 *
 * - При конструировании синхронизатора для всех элементов исходной коллекции вызывается функция
 * {@link #cfg-addItem}.
 * - При уничтожении синхронизатора вызывается функция {@link #cfg-clearItems}, либо для всех элементов
 * вызывается функция {@link #cfg-removeItem}.
 * - При перемещении/переупорядочении элементов вызовами функций синхронизируется порядок элементов.
 *
 * @extends JW.Class
 *
 * @constructor
 * Конструирует синхронизатор. Предпочтительнее использовать метод JW.AbstractArray#createInserter.
 * @param {JW.AbstractArray} source `<T>` Исходный массив.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.AbstractArray.Inserter = function(source, config) {
	JW.AbstractArray.Inserter._super.call(this);
	config = config || {};
	this.source = source;
	this.addItem = config.addItem;
	this.removeItem = config.removeItem;
	this.clearItems = config.clearItems;
	this.scope = config.scope || this;
	this._addItems(this.source.getItems(), 0);
};

JW.extend(JW.AbstractArray.Inserter, JW.Class, {
	/**
	 * @cfg {Function} addItem
	 *
	 * `addItem(item: T, index: number): void`
	 *
	 * Элемент добавлен в указанное место массива.
	 */
	/**
	 * @cfg {Function} removeItem
	 *
	 * `removeItem(item: T, index: number): void`
	 *
	 * Элемент удален из указанного места массива.
	 */
	/**
	 * @cfg {Function} clearItems
	 *
	 * `clearItems(items: Array<T>): void`
	 *
	 * Массив очищен. По умолчанию, вызывает removeItem для всех элементов массива.
	 */
	/**
	 * @cfg {Object} scope Контекст вызова addItem, removeItem, clearItems.
	 */
	/**
	 * @property {JW.AbstractArray} source `<T>` Исходный массив.
	 */
	
	destroy: function() {
		this._clearItems(this.source.getItems());
		this._super();
	},
	
	_addItems: function(items, index) {
		if (!this.addItem) {
			return;
		}
		for (var i = 0; i < items.length; ++i) {
			this.addItem.call(this.scope, items[i], i + index);
		}
	},
	
	_removeItems: function(items, index) {
		if (!this.removeItem) {
			return;
		}
		for (var i = items.length - 1; i >= 0; --i) {
			this.removeItem.call(this.scope, items[i], i + index);
		}
	},
	
	_clearItems: function(items) {
		if (items.length === 0) {
			return;
		}
		if (this.clearItems) {
			this.clearItems.call(this.scope || this, items);
		} else {
			this._removeItems(items, 0);
		}
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T extends JW.Class> extends JW.AbstractCollection.Lister<T, JW.AbstractArray<T>>`
 *
 * Конвертер массива в множество. Подробнее читайте JW.AbstractCollection.Lister.
 *
 * @extends JW.AbstractCollection.Lister
 *
 * @constructor
 * Конструирует конвертер. Предпочтительнее использовать метод JW.AbstractCollection#createLister.
 * @param {JW.AbstractArray} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.AbstractArray.Lister = function(source, config) {
	JW.AbstractArray.Lister._super.call(this, source, config);
};

JW.extend(JW.AbstractArray.Lister, JW.AbstractCollection.Lister, {
	/**
	 * @property {JW.AbstractArray} source `<T>` Исходная коллекция.
	 */
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T, U> extends JW.AbstractCollection.Mapper<T, U, JW.AbstractArray<T>, JW.AbstractArray<U>>`
 *
 * Конвертер элементов массива. Подробнее читайте JW.AbstractCollection.Mapper.
 *
 * @extends JW.AbstractCollection.Mapper
 *
 * @constructor
 * Конструирует синхронизатор. Предпочтительнее использовать метод JW.AbstractCollection#createMapper.
 * @param {JW.AbstractArray} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.AbstractArray.Mapper = function(source, config) {
	JW.AbstractArray.Mapper._super.call(this, source, config);
	this.target.tryAddAll(this._createItems(this.source.getItems()));
};

JW.extend(JW.AbstractArray.Mapper, JW.AbstractCollection.Mapper, {
	/**
	 * @cfg {JW.AbstractArray} target `<U>` Целевая коллекция.
	 */
	/**
	 * @property {JW.AbstractArray} source `<T>` Исходная коллекция.
	 */
	/**
	 * @property {JW.AbstractArray} target `<U>` Целевая коллекция.
	 */
	
	// override
	destroy: function() {
		this._destroyItems(this.target.clear(), this.source.getItems());
		this._super();
	},
	
	_createItems: function(datas) {
		var items = [];
		for (var i = 0, l = datas.length; i < l; ++i) {
			items.push(this.createItem.call(this.scope, datas[i]));
		}
		return items;
	},
	
	_destroyItems: function(items, datas) {
		if (this.destroyItem === undefined) {
			return;
		}
		for (var i = items.length - 1; i >= 0; --i) {
			this.destroyItem.call(this.scope, items[i], datas[i]);
		}
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T>`
 *
 * Объединитель массивов. Создает массив, содержащий все элементы исходных массивов в том же порядке.
 *
 *     var source = new JW.ObservableArray([
 *         new JW.Array([1, 2, 3]),
 *         new JW.ObservableArray(),
 *         new JW.Array([4])
 *     ]);
 *     var merger = source.{@link JW.AbstractArray#createMerger createMerger}();
 *     assert(merger.{@link #property-target target}.{@link JW.AbstractArray#equal equal}([1, 2, 3, 4]));
 *     
 *     source.{@link JW.AbstractArray#add add}(new JW.Array([5, 6]));
 *     assert(merger.{@link #property-target target}.{@link JW.AbstractArray#equal equal}([1, 2, 3, 4, 5, 6]));
 *     
 *     source.{@link JW.AbstractArray#get get}(1).{@link JW.AbstractArray#addAll addAll}([7, 8, 9]);
 *     assert(merger.{@link #property-target target}.{@link JW.AbstractArray#equal equal}([1, 2, 3, 7, 8, 9, 4, 5, 6]));
 * 
 * Создавайте синхронизатор с помощью метода JW.AbstractArray#createMerger:
 *
 *     var merger = array.{@link JW.AbstractArray#createMerger createMerger}();
 *     var array = merger.{@link #property-target target};
 *
 * Метод сам определит, какая реализация синхронизатора лучше подойдет (простая или observable).
 *
 * Целевой массив можно передать в качестве конфигурационной опции:
 *
 *     var source = new JW.Array();
 *     var target = new JW.Array();
 *     var merger = source.{@link JW.AbstractArray#createMerger createMerger}({
 *         {@link #cfg-target target}: target
 *     });
 *
 * Правила работы синхронизатора:
 *
 * - Целевой массив находится в поле {@link #property-target}.
 * - Перед конструированием синхронизатора целевой массив должен быть пуст, в целевой массив нельзя добавлять элементы
 * вручную, нельзя создавать другие синхронизаторы с тем же целевым массивом.
 * - При конструировании синхронизатора все элементы исходных коллекций сразу добавляются в {@link #property-target}.
 * - При уничтожении синхронизатора все элементы исходных коллекций удаляются из {@link #property-target}.
 * - Целевой массив можно передать в качестве конфигурационной опции {@link #cfg-target}.
 * В этом случае, вся забота о его уничтожении ложится на вас.
 * - Если {@link #cfg-target} не передан, то он будет создан автоматически. Синхронизатор подберет наиболее подходящую
 * реализацию {@link #property-target} (простая или observable). В этом
 * случае, {@link #property-target} будет уничтожен автоматически при уничтожении синхронизатора.
 *
 * @extends JW.Class
 *
 * @constructor
 * Конструирует синхронизатор. Предпочтительнее использовать метод JW.AbstractArray#createMerger.
 * @param {JW.AbstractArray} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.AbstractArray.Merger = function(source, config) {
	JW.AbstractArray.Merger._super.call(this);
	config = config || {};
	this.source = source;
	this._targetCreated = !config.target;
	this.target = this._targetCreated ? this._createTarget() : config.target;
	this._mapper = source.createMapper({
		createItem: function(bunch) {
			return bunch.createMergerBunch(this);
		},
		destroyItem: JW.destroy,
		scope: this
	});
	this.target.addAll(this._getAllItems());
};

JW.extend(JW.AbstractArray.Merger, JW.Class, {
	/**
	 * @cfg {JW.AbstractArray} target `<T>` Целевая коллекция.
	 */
	/**
	 * @property {JW.AbstractArray} source `<? extends JW.AbstractArray<T>>` Исходная коллекция.
	 */
	/**
	 * @property {JW.AbstractArray} target `<T>` Целевая коллекция.
	 */
	// boolean _targetCreated;
	// JW.AbstractArray.Mapper<JW.AbstractArray<? extends JW.AbstractArray<T>>, JW.AbstractArray.Merger.Bunch<T>> _mapper;
	
	// override
	destroy: function() {
		this.target.tryClear();
		this._mapper.destroy();
		if (this._targetCreated) {
			this.target.destroy();
		}
		this._super();
	},
	
	// virtual
	_createTarget: function() {
		return this.source.some(function(bunch) { return bunch instanceof JW.ObservableArray; }, this) ?
			new JW.ObservableArray() : new JW.Array();
	},
	
	_getAllItems: function() {
		return this._merge(this.source.getItems());
	},
	
	_merge: function(bunches) {
		var items = new Array(this._count(bunches));
		var iItems = 0;
		for (var i = 0, l = bunches.length; i < l; ++i) {
			var bunch = bunches[i].getItems();
			for (var j = 0, m = bunch.length; j < m; ++j) {
				items[iItems++] = bunch[j];
			}
		}
		return items;
	},
	
	_count: function(bunches, index, length) {
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
	}
});

JW.AbstractArray.Merger.Bunch = function(merger, bunch) {
	JW.AbstractArray.Merger.Bunch._super.call(this);
};

JW.extend(JW.AbstractArray.Merger.Bunch, JW.Class);

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T> extends JW.AbstractCollection.Observer<T, JW.AbstractArray<T>>`
 *
 * Наблюдатель массива. Подробнее читайте JW.AbstractCollection.Observer.
 *
 * @extends JW.AbstractCollection.Observer
 *
 * @constructor
 * Конструирует синхронизатор. Предпочтительнее использовать метод JW.AbstractCollection#createObserver.
 * @param {JW.AbstractArray} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.AbstractArray.Observer = function(source, config) {
	JW.AbstractArray.Observer._super.call(this, source, config);
};

JW.extend(JW.AbstractArray.Observer, JW.AbstractCollection.Observer, {
	/**
	 * @property {JW.AbstractArray} source `<T>` Исходная коллекция.
	 */
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T extends JW.Class> extends JW.AbstractCollection.Orderer<T, JW.AbstractArray<T>>`
 *
 * Конвертер массива в массив lol (упорядочитель). Подробнее читайте JW.AbstractCollection.Orderer.
 *
 * @extends JW.AbstractCollection.Orderer
 *
 * @constructor
 * Конструирует конвертер. Предпочтительнее использовать метод JW.AbstractCollection#createOrderer.
 * @param {JW.AbstractArray} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.AbstractArray.Orderer = function(source, config) {
	JW.AbstractArray.Orderer._super.call(this, source, config);
};

JW.extend(JW.AbstractArray.Orderer, JW.AbstractCollection.Orderer, {
	/**
	 * @property {JW.AbstractArray} source `<T>` Исходная коллекция.
	 */
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T>`
 *
 * Обратитель массива. Создает массив, содержащий все элементы исходного массива в обратном порядке.
 *
 *     var source = new JW.ObservableArray([1, 2, 3]);
 *     var reverser = source.{@link JW.AbstractArray#createReverser createReverser}();
 *     assert(reverser.{@link #property-target target}.{@link JW.AbstractArray#equal equal}([3, 2, 1]));
 *     
 *     source.{@link JW.AbstractArray#add add}(4);
 *     assert(reverser.{@link #property-target target}.{@link JW.AbstractArray#equal equal}([4, 3, 2, 1]));
 *     
 *     source.{@link JW.AbstractArray#remove remove}(2);
 *     assert(reverser.{@link #property-target target}.{@link JW.AbstractArray#equal equal}([4, 2, 1]));
 * 
 * Создавайте синхронизатор с помощью метода JW.AbstractArray#createReverser.
 * Метод сам определит, какая реализация синхронизатора лучше подойдет (простая или observable).
 *
 * Целевой массив можно передать в качестве конфигурационной опции:
 *
 *     var source = new JW.Array();
 *     var target = new JW.Array();
 *     var reverser = source.{@link JW.AbstractArray#createReverser createReverser}({
 *         {@link #cfg-target target}: target
 *     });
 *
 * Правила работы синхронизатора:
 *
 * - Целевой массив находится в поле {@link #property-target}.
 * - Перед конструированием синхронизатора целевой массив должен быть пуст, в целевой массив нельзя добавлять элементы
 * вручную, нельзя создавать другие синхронизаторы с тем же целевым массивом.
 * - При конструировании синхронизатора все элементы исходной коллекции сразу добавляются в {@link #property-target}.
 * - При уничтожении синхронизатора все элементы исходной коллекции удаляются из {@link #property-target}.
 * - Целевой массив можно передать в качестве конфигурационной опции {@link #cfg-target}.
 * В этом случае, вся забота о его уничтожении ложится на вас.
 * - Если {@link #cfg-target} не передан, то он будет создан автоматически. Синхронизатор подберет наиболее подходящую
 * реализацию {@link #property-target} (простая или observable). В этом
 * случае, {@link #property-target} будет уничтожен автоматически при уничтожении синхронизатора.
 *
 * @extends JW.Class
 *
 * @constructor
 * Конструирует синхронизатор. Предпочтительнее использовать метод JW.AbstractArray#createReverser.
 * @param {JW.AbstractArray} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.AbstractArray.Reverser = function(source, config) {
	JW.AbstractArray.Reverser._super.call(this);
	config = config || {};
	this.source = source;
	this._targetCreated = !config.target;
	this.target = this._targetCreated ? source.createEmpty() : config.target;
	this.target.addAll(this._reverse(source.getItems()));
};

JW.extend(JW.AbstractArray.Reverser, JW.Class, {
	/**
	 * @cfg {JW.AbstractArray} target `<T>` Целевая коллекция.
	 */
	/**
	 * @property {JW.AbstractArray} source `<T>` Исходная коллекция.
	 */
	/**
	 * @property {JW.AbstractArray} target `<T>` Целевая коллекция.
	 */
	// boolean _targetCreated;
	
	// override
	destroy: function() {
		this.target.tryClear();
		if (this._targetCreated) {
			this.target.destroy();
		}
		this._super();
	},
	
	_reverse: function(items) {
		items = items.concat();
		items.reverse();
		return items;
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T> extends JW.AbstractCollection.SorterComparing<T, JW.AbstractArray<T>>`
 *
 * Конвертер массива в массив lol (сортировщик по компаратору).
 * Подробнее читайте JW.AbstractCollection.SorterComparing.
 *
 * @extends JW.AbstractCollection.SorterComparing
 *
 * @constructor
 * Конструирует конвертер. Предпочтительнее использовать метод JW.AbstractCollection#createSorterComparing.
 * @param {JW.AbstractArray} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.AbstractArray.SorterComparing = function(source, config) {
	JW.AbstractArray.SorterComparing._super.call(this, source, config);
};

JW.extend(JW.AbstractArray.SorterComparing, JW.AbstractCollection.SorterComparing, {
	/**
	 * @property {JW.AbstractArray} source `<T>` Исходная коллекция.
	 */
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

JW.AbstractArray.Splitter = function(source, config) {
	JW.AbstractArray.Splitter._super.call(this);
	config = config || {};
	this.source = source;
	this._rowsCreated = !config.rows;
	this.rows = config.rows || this.source.createEmpty();
	this.capacity = config.capacity || 1;
	this._length = 0;
	
	this._inserter = this.source.createInserter({
		addItem    : this._addItem,
		removeItem : this._removeItem,
		clearItems : this._clearItems,
		scope      : this
	});
};

JW.extend(JW.AbstractArray.Splitter/*<T extends Any, R extends JW.AbstractArray<T>>*/, JW.Class, {
	/*
	Required
	JW.AbstractArray<T> source;
	
	Optional
	JW.AbstractArray<R> rows;
	Integer capacity;
	
	Fields
	Boolean _rowsCreated;
	Integer _length;
	JW.AbstractArray.Inserter<T> _inserter;
	*/
	
	destroy: function() {
		this._inserter.destroy();
		if (this._rowsCreated) {
			this.rows.destroy();
		}
		this._super();
	},
	
	createRow: function() {
		return this.source.createEmpty();
	},
	
	destroyRow: function(row) {
		row.destroy();
	},
	
	_addItem: function(item, index) {
		if (this._length % this.capacity === 0) {
			this.rows.tryAdd(this.createRow.call(this.scope || this));
		}
		var firstRow = Math.floor(index / this.capacity);
		for (var i = this.rows.getLength() - 1; i > firstRow; --i) {
			var broughtItem = this.rows.get(i - 1).tryRemove(this.capacity - 1);
			this.rows.get(i).tryAdd(broughtItem, 0);
		}
		this.rows.get(firstRow).tryAdd(item, index % this.capacity);
		++this._length;
	},
	
	_removeItem: function(item, index) {
		var firstRow = Math.floor(index / this.capacity);
		this.rows.get(firstRow).tryRemove(index % this.capacity);
		for (var i = firstRow + 1; i < this.rows.getLength(); ++i) {
			var broughtItem = this.rows.get(i).tryRemove(0);
			this.rows.get(i - 1).tryAdd(broughtItem, this.capacity - 1);
		}
		--this._length;
		if (this._length % this.capacity === 0) {
			this.destroyRow.call(this.scope || this, this.rows.tryRemove(this.rows.getLength() - 1));
		}
	},
	
	_clearItems: function() {
		var rows = this.rows.tryClear();
		this._length = 0;
		JW.Array.each(rows, this.destroyRow, this.scope || this);
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T> extends JW.IndexedCollection<string, T>`
 *
 * Абстрактный словарь.
 *
 * Словарь - это неупорядоченная коллекция, в которой каждый элемент имеет свой строковый ключ.
 *
 * # Методы словаря
 *
 * **Жирным шрифтом выделены изменения по сравнению с JW.IndexedCollection.**
 *
 * Получение содержимого:
 *
 * - {@link #getLength} - Возвращает количество элементов в коллекции.
 * - {@link #isEmpty} - Проверяет коллекцию на пустоту.
 * - {@link #get} - Возвращает элемент коллекции по ключу.
 * - {@link #getFirst} - Возвращает первый элемент коллекции.
 * - {@link #getFirstKey} - Возвращает ключ первого элемента коллекции.
 * - {@link #getKeys}, #$getKeys - Возвращает массив ключей всех элементов.
 * - {@link #containsItem} - Содержит ли коллекция элемент.
 * - {@link #containsKey} - Содержит ли коллекция ключ.
 * - {@link #keyOf} - Возвращает ключ элемента.
 * - **{@link #getJson} - Возвращает внутреннее представление словаря.**
 *
 * Алгоритмы перебора:
 *
 * - {@link #every} - Проверяет все элементы по критерию.
 * Возвращает true тогда и только тогда, когда все элементы удовлетворяют критерию.
 * - {@link #some} - Проверяет каждый элемент по критерию.
 * Возвращает true тогда и только тогда, когда хотя бы один элемент удовлетворяет критерию.
 * - {@link #each} - Перебирает элементы.
 * - {@link #search} - Ищет элемент по критерию.
 * Возвращает первый элемент, удовлетворяющий критерию.
 * - {@link #find} - Ищет элемент по критерию.
 * Возвращает ключ первого элемента, удовлетворяющего критерию.
 * - {@link #filter}, #$filter - Фильтрует коллекцию по критерию.
 * Строит новую коллекцию того же типа, включающую только элементы, удовлетворяющие критерию.
 * - {@link #map}, #$map - Отображает элементы коллекции.
 * Строит новую коллекцию того же типа, состояющую из результатов запуска отображающей функции на каждом элементе
 * коллекции.
 * - {@link #toSorted}, #$toSorted, #toSortedComparing, #$toSortedComparing -
 * Строит массив из элементов коллекции, отсортированный по индексу
 * или компаратору.
 * - {@link #getSortingKeys}, #$getSortingKeys, #getSortingKeysComparing, #$getSortingKeysComparing -
 * Возвращает ключи элементов, отсортированных по индексу или компаратору.
 * - {@link #index}, #$index - Индексирует коллекцию.
 * Строит словарь, в ключах которого находятся индексы элементов, а в значениях - соответствующие элементы.
 * - {@link #toArray}, #$toArray - Строит новый массив из элементов коллекции.
 * - {@link #toMap}, #$toMap - Строит новый словарь из элементов коллекции.
 * - {@link #toSet}, #$toSet - Строит новое множество из элементов коллекции.
 * - {@link #asArray}, #$asArray - Представляет коллекцию в виде массива.
 * - {@link #asMap}, #$asMap - Представляет коллекцию в виде словаря.
 * - {@link #asSet}, #$asSet - Представляет коллекцию в виде множества.
 *
 * Изменение коллекции:
 *
 * - {@link #set}, #trySet - Добавляет/заменяет элемент по ключу.
 * - **{@link #setAll}, #trySetAll - Добавляет/заменяет набор элементов.**
 * - {@link #remove}, #tryRemove - Удаляет элемент по ключу.
 * - **{@link #removeAll}, #$removeAll, #tryRemoveAll - Удаляет набор элементов.**
 * - {@link #removeItem} - Удаляет первое вхождение элемента из коллекции.
 * - {@link #removeItems} - Удаляет все вхождения элементов из коллекции.
 * - **{@link #setKey}, #trySetKey - Меняет ключ элемента.**
 * - {@link #clear}, #$clear, #tryClear - Очищает коллекцию.
 * - **{@link #splice}, #trySplice - Удаляет/добавляет элементы.**
 * - **{@link #reindex}, #tryReindex - Меняет ключи элементов.**
 * - **{@link #performSplice} - Приводит содержимое методом #splice.**
 * - **{@link #performReindex} - Приводит содержимое методом #reindex.**
 *
 * Создание синхронизаторов:
 *
 * - {@link #createMapper} - Создает конвертер элементов.
 * - {@link #createFilterer} - Создает фильтровщик.
 * - {@link #createLister} - Создает конвертер в множество.
 * - {@link #createIndexer} - Создает индексатор.
 * - {@link #createOrderer} - Создает конвертер в массив (упорядочитель).
 * - {@link #createSorterComparing} - Создает конвертер в массив (сортировщик по компаратору).
 * - {@link #createObserver} - Создает наблюдатель.
 * - **{@link #createInserter} - Создает синхронизатор представления со словарем.**
 *
 * Создание родственных коллекций (для разработки алгоритмов и синхронизаторов):
 *
 * - {@link #createEmpty} - Создает пустую коллекцию того же типа.
 * - {@link #createEmptyArray} - Создает пустой массив того же типа.
 * - {@link #createEmptyMap} - Создает пустой словарь того же типа.
 * - {@link #createEmptySet} - Создает пустое множество того же типа.
 *
 * Другие методы:
 *
 * - **{@link #detectSplice} - Определяет параметры метода #splice для приведения содержимого.**
 * - **{@link #detectReindex} - Определяет параметры метода #reindex для приведения содержимого.**
 * - **{@link #equal} - Сравнивает с другим словарем.**
 *
 * Все те же самые алгоритмы доступны и для нативного словаря JavaScript Object, смотрите статические методы JW.Map.
 *
 * @extends JW.IndexedCollection
 * @abstract
 */
JW.AbstractMap = function(json, adapter) {
	JW.AbstractMap._super.call(this);
	this.json = adapter ? json : json ? JW.apply({}, json) : {};
	this.length = JW.Map.getLength(this.json);
	this.getKey = null;
};

JW.extend(JW.AbstractMap, JW.IndexedCollection, {
	/**
	 * @property {Function} getKey
	 *
	 * `getKey(item: T): number/string`
	 *
	 * Функция, возвращающая уникальный ключ элемента в данной коллекции. Функция используется
	 * алгоритмами #detectReindex, #performReindex. По умолчанию равна JW.iid.
	 * Если коллекция содержит экземпляры JW.Class, то все тип-топ.
	 */
	/**
	 * @method getFirstKey
	 * Возвращает ключ первого элемента коллекции. Если коллекция пуста, вернет undefined.
	 * @returns {string} Ключ.
	 */
	/**
	 * @method containsKey
	 * Проверяет наличие элемента с заданным ключом в коллекции.
	 * @param {string} key Ключ.
	 * @returns {boolean} Коллекция содержит элемент с указанным ключом.
	 */
	/**
	 * @method keyOf
	 * Определяет ключ элемента в данной коллекции. Если такого элемента в коллекции нет, вернет undefined.
	 * @param {T} item Элемент.
	 * @returns {string} Ключ элемента.
	 */
	
	/**
	 * Возвращает словарь элементов - внутреннее представление коллекции.
	 *
	 * **Метод не копирует коллекцию, будьте осторожны.**
	 *
	 * @returns {Object} Словарь элементов.
	 */
	getJson: function() {
		return this.json;
	},
	
	getLength: function() {
		return this.length;
	},
	
	isEmpty: function() {
		return this.length === 0;
	},
	
	/**
	 * @method get
	 * Возвращает элемент по ключу. В случае, если элемента с таким ключом нет, вернет undefined.
	 * @param {string} key Ключ.
	 * @returns {T} Элемент.
	 */
	get: function(key) {
		return this.json[key];
	},
	
	/**
	 * @method $getKeys
	 * Возвращает массив ключей всех элементов коллекции.
	 * @returns {JW.Array} `<string>` Массив ключей.
	 */
	/**
	 * Возвращает массив ключей всех элементов коллекции.
	 * @returns {Array} `<string>` Массив ключей.
	 */
	getKeys: function() {
		return JW.Map.getKeys(this.json);
	},
	
	/**
	 * Проверяет все элементы по критерию.
	 * 
	 * Возвращает true тогда и только тогда, когда функция f возвращает !== false на всех элементах коллекции.
	 * 
	 * Алгоритм последовательно перебирает все элементы, и останавливается после первого элемента, не удовлетворяющего
	 * критерию.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): boolean`
	 *
	 * Критерий проверки элементов.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {boolean} Результат проверки.
	 */
	every: function(callback, scope) {
		return JW.Map.every(this.json, callback, scope);
	},
	
	/**
	 * @method some
	 *
	 * Проверяет каждый элемент по критерию.
	 * 
	 * Возвращает true тогда и только тогда, когда функция f возвращает !== false хотя бы на одном элементе коллекции.
	 * 
	 * Алгоритм последовательно перебирает все элементы, и останавливается после первого элемента, удовлетворяющего
	 * критерию.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): boolean`
	 *
	 * Критерий проверки элементов.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {boolean} Результат проверки.
	 */
	/**
	 * @method each
	 *
	 * Перебирает элементы коллекции. Запускает указанную функцию на всех элементах.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): void`
	 *
	 * Функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {void}
	 */
	/**
	 * @method find
	 *
	 * Ищет элемент по критерию.
	 * 
	 * Возвращает ключ первого элемента, функция f на котором возвращает !== false.
	 * 
	 * Алгоритм последовательно перебирает все элементы, и останавливается после первого элемента, удовлетворяющего
	 * критерию.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): boolean`
	 *
	 * Критерий проверки элементов.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {string} Ключ найденного элемента или undefined.
	 */
	/**
	 * @method search
	 *
	 * Ищет элемент по критерию.
	 * 
	 * Возвращает первый элемент, функция f на котором возвращает !== false.
	 * 
	 * Алгоритм последовательно перебирает все элементы, и останавливается после первого элемента, удовлетворяющего
	 * критерию.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: K): boolean`
	 *
	 * Критерий проверки элементов.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {T} Найденный элемент или undefined.
	 */
	/**
	 * @method toSorted
	 *
	 * Преобразует коллекцию в отсортированный массив.
	 *
	 * Строит массив из элементов коллекции, отсортированный по результату запуска функции f на каждом элементе.
	 *
	 * @param {Function} [f]
	 *
	 * `f(item: T, key: string): number/string`
	 *
	 * Функция-сортировщик для элемента. По умолчанию возвращает item.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {Array} Отсортированный массив.
	 */
	/**
	 * @method $toSorted
	 *
	 * Преобразует коллекцию в отсортированный массив.
	 *
	 * Строит массив из элементов коллекции, отсортированный по результату запуска функции f на каждом элементе.
	 *
	 * @param {Function} [f]
	 *
	 * `f(item: T, key: string): number/string`
	 *
	 * Функция-сортировщик для элемента. По умолчанию возвращает item.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {JW.Array} `<T>` Отсортированный массив.
	 */
	/**
	 * @method toSortedComparing
	 *
	 * Преобразует коллекцию в отсортированный массив.
	 *
	 * Строит массив из элементов коллекции, отсортированный по компаратору.
	 *
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, k1: string, k2: string): Number`
	 *
	 * Функция-компаратор. Возвращает положительное значение, если t1 > t2; отрицательное значение, если t1 < t2;
	 * 0, если t1 == t2. По умолчанию возвращает JW.cmp(t1, t2).
	 *
	 * @param {Object} [scope] Контекст вызова compare. По умолчанию compare вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {Array} Отсортированный массив.
	 */
	/**
	 * @method $toSortedComparing
	 *
	 * Преобразует коллекцию в отсортированный массив.
	 *
	 * Строит массив из элементов коллекции, отсортированный по компаратору.
	 *
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, k1: string, k2: string): Number`
	 *
	 * Функция-компаратор. Возвращает положительное значение, если t1 > t2; отрицательное значение, если t1 < t2;
	 * 0, если t1 == t2. По умолчанию возвращает JW.cmp(t1, t2).
	 *
	 * @param {Object} [scope] Контекст вызова compare. По умолчанию compare вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {JW.Array} `<T>` Отсортированный массив.
	 */
	/**
	 * @method getSortingKeys
	 *
	 * Возвращает массив ключей отсортированных элементов.
	 *
	 * Строит массив из ключей элементов коллекции, отсортированный по результату запуска функции f на каждом элементе.
	 *
	 * @param {Function} [f]
	 *
	 * `f(item: T, key: string): number/string`
	 *
	 * Функция-сортировщик для элемента. По умолчанию возвращает item.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {Array} `<string>` Массив ключей отсортированных элементов.
	 */
	/**
	 * @method $getSortingKeys
	 *
	 * Возвращает массив ключей отсортированных элементов.
	 *
	 * Строит массив из ключей элементов коллекции, отсортированный по результату запуска функции f на каждом элементе.
	 *
	 * @param {Function} [f]
	 *
	 * `f(item: T, key: string): number/string`
	 *
	 * Функция-сортировщик для элемента. По умолчанию возвращает item.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {JW.Array} `<string>` Массив ключей отсортированных элементов.
	 */
	/**
	 * @method getSortingKeysComparing
	 *
	 * Возвращает массив ключей отсортированных элементов.
	 *
	 * Строит массив из ключей элементов коллекции, отсортированный по компаратору.
	 *
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, k1: string, k2: string): Number`
	 *
	 * Функция-компаратор. Возвращает положительное значение, если t1 > t2; отрицательное значение, если t1 < t2;
	 * 0, если t1 == t2. По умолчанию возвращает JW.cmp(t1, t2).
	 *
	 * @param {Object} [scope] Контекст вызова compare. По умолчанию compare вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {Array} `<string>` Массив ключей отсортированных элементов.
	 */
	/**
	 * @method $getSortingKeysComparing
	 *
	 * Возвращает массив ключей отсортированных элементов.
	 *
	 * Строит массив из ключей элементов коллекции, отсортированный по компаратору.
	 *
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, k1: string, k2: string): Number`
	 *
	 * Функция-компаратор. Возвращает положительное значение, если t1 > t2; отрицательное значение, если t1 < t2;
	 * 0, если t1 == t2. По умолчанию возвращает JW.cmp(t1, t2).
	 *
	 * @param {Object} [scope] Контекст вызова compare. По умолчанию compare вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {JW.Array} `<string>` Массив ключей отсортированных элементов.
	 */
	
	/**
	 * @method index
	 *
	 * Индексирует коллекцию.
	 *
	 * Строит словарь, в ключах которого находятся результаты запуска функции f на всех элементах,
	 * а в значениях - соответствующие элементы.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): string`
	 *
	 * Функция-индексатор для элемента.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {Object} Индекс коллекции.
	 */
	/**
	 * @method $index
	 *
	 * Индексирует коллекцию.
	 *
	 * Строит словарь, в ключах которого находятся результаты запуска функции f на всех элементах,
	 * а в значениях - соответствующие элементы.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): string`
	 *
	 * Функция-индексатор для элемента.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {JW.Map} `<T>` Индекс коллекции.
	 */
	
	/**
	 * Фильтрует коллекцию по критерию.
	 *
	 * Строит новую коллекцию того же типа, включающую только те элементы, функция f на которых вернула !== false.
	 *
	 * @param {Function} f
	 *
	 * `f(T item, key: string): boolean`
	 *
	 * Фильтрующая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {Object} Отфильтрованная коллекция.
	 */
	filter: function(callback, scope) {
		return JW.Map.filter(this.json, callback, scope);
	},
	
	/**
	 * Фильтрует коллекцию по критерию.
	 *
	 * Строит новую коллекцию того же типа, включающую только те элементы, функция f на которых вернула !== false.
	 *
	 * @param {Function} f
	 *
	 * `f(T item, key: string): boolean`
	 *
	 * Фильтрующая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {JW.Map} `<T>` Отфильтрованная коллекция.
	 */
	$filter: JW.AbstractCollection._create$Map("filter"),
	
	/**
	 * `<U>` Отображает элементы коллекции.
	 * 
	 * Строит новую коллекцию того же типа, состояющую из результатов запуска функции f на каждом элементе коллекции.
	 *
	 * @param {Function} f
	 *
	 * `f(T item, key: string): U`
	 *
	 * Отображающая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {Object} Отображенная коллекция.
	 */
	map: function(callback, scope) {
		return JW.Map.map(this.json, callback, scope);
	},
	
	/**
	 * `<U>` Отображает элементы коллекции.
	 * 
	 * Строит новую коллекцию того же типа, состояющую из результатов запуска функции f на каждом элементе коллекции.
	 *
	 * @param {Function} f
	 *
	 * `f(T item, key: string): U`
	 *
	 * Отображающая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {JW.Map} `<T>` Отображенная коллекция.
	 */
	$map: JW.AbstractCollection._create$Map("map"),
	
	asMap: function() {
		return this.json;
	},
	
	$asMap: function() {
		return this;
	},
	
	/**
	 * @method set
	 * Заменяет элемент по ключу. В случае если элемента с таким ключом нет, он будет добавлен.
	 * @param {T} item Элемент.
	 * @param {string} key Ключ.
	 * @returns {T} Бывший элемент коллекции.
	 */
	/**
	 * Заменяет элемент по ключу. В случае если элемента с таким ключом нет, он будет добавлен.
	 * @param {T} item Элемент.
	 * @param {string} key Ключ.
	 * @returns {JW.Proxy} `<T>` Обертка над бывшим элементом коллекции. Если нет изменений - undefined.
	 */
	trySet: function(item, key) {
		var spliceResult = this.trySplice([], JW.Map.single(key, item));
		if (spliceResult !== undefined) {
			return new JW.Proxy(spliceResult.removedItems[key]);
		}
	},
	
	/**
	 * Заменяет/добавляет набор элементов в словаре.
	 * @param {Object} items Элементы.
	 * @returns {JW.AbstractMap.SpliceResult} `<T>` Результат метода #splice.
	 */
	setAll: function(items) {
		var spliceResult = this.trySetAll(items);
		return (spliceResult !== undefined) ? spliceResult : new JW.AbstractMap.SpliceResult({}, {});
	},
	
	/**
	 * Заменяет/добавляет набор элементов в словаре.
	 * @param {Object} items Элементы.
	 * @returns {JW.AbstractMap.SpliceResult} `<T>` Результат метода #splice. Если нет изменений - undefined.
	 */
	trySetAll: function(items) {
		return this.trySplice([], items);
	},
	
	/**
	 * Меняет ключ элемента в словаре. Если элемента с таким ключом нет, метод сломается.
	 * @param {string} oldKey Старый ключ элемента.
	 * @param {string} newKey Новый ключ элемента.
	 * @returns {T} Элемент.
	 */
	setKey: function(oldKey, newKey) {
		this.trySetKey(oldKey, newKey);
		return this.json[newKey];
	},
	
	/**
	 * Меняет ключ элемента в словаре.
	 * @param {string} oldKey Старый ключ элемента.
	 * @param {string} newKey Новый ключ элемента.
	 * @returns {T} Элемент. Если нет изменений - undefined.
	 */
	trySetKey: function(oldKey, newKey) {
		var keyMap = this.tryReindex(JW.Map.single(oldKey, newKey));
		if (keyMap !== undefined) {
			return this.json[newKey];
		}
	},
	
	/**
	 * @method remove
	 * Удаляет элемент по ключу, если он существует в коллекции.
	 * @param {K} key Ключ.
	 * @returns {T} Бывший элемент коллекции или undefined.
	 */
	/**
	 * Удаляет элемент по ключу, если он существует в коллекции.
	 * @param {K} key Ключ.
	 * @returns {T} Бывший элемент коллекции. Если нет изменений - undefined.
	 */
	tryRemove: function(key) {
		var spliceResult = this.trySplice([key], {});
		if (spliceResult !== undefined) {
			return spliceResult.removedItems[key];
		}
	},
	
	/**
	 * Удаляет набор элементов из словаря.
	 * @param {Array} keys `<string>` Ключи элементов.
	 * @returns {Object} Удаленные элементы.
	 */
	removeAll: function(keys) {
		var items = this.tryRemoveAll(keys);
		return (items !== undefined) ? items : {};
	},
	
	/**
	 * Удаляет набор элементов из словаря.
	 * @param {Array} keys `<string>` Ключи элементов.
	 * @returns {JW.Map} `<T>` Удаленные элементы.
	 */
	$removeAll: JW.AbstractCollection._create$Map("removeAll"),
	
	/**
	 * Удаляет набор элементов из словаря.
	 * @param {Array} keys `<string>` Ключи элементов.
	 * @returns {Object} Удаленные элементы. Если нет изменений - undefined.
	 */
	tryRemoveAll: function(keys) {
		var spliceResult = this.trySplice(keys, {});
		if (spliceResult !== undefined) {
			return spliceResult.removedItems;
		}
	},
	
	removeItems: function(items) {
		var itemSet = new JW.Set(items);
		var newItems = this.filter(function(item) {
			return !itemSet.contains(item);
		});
		this.performSplice(newItems);
	},
	
	/**
	 * Очищает коллекцию.
	 * @returns {Object} Бывшее содержимое коллекции.
	 */
	clear: function() {
		var result = this.tryClear();
		return (result !== undefined) ? result : {};
	},
	
	/**
	 * Очищает коллекцию.
	 * @returns {JW.Map} `<T>` Бывшее содержимое коллекции.
	 */
	$clear: JW.AbstractCollection._create$Map("clear"),
	
	/**
	 * Очищает коллекцию.
	 * @returns {Object} Бывшее содержимое коллекции. Если нет изменений - undefined.
	 */
	tryClear: function() {
		this.length = 0;
		return JW.Map.tryClear(this.json);
	},
	
	/**
	 * Добавляет и удаляет элементы коллекции. Универсальная оптимизированная атомарная операция удаления/вставки.
	 * @param {Array} removedKeys `<string>` Ключи элементов для удаления.
	 * @param {Object} updatedItems Элементы для добавления/замены.
	 * @returns {JW.AbstractMap.SpliceResult} `<T>` Результат.
	 */
	splice: function(removedKeys, updatedItems) {
		var spliceResult = this.trySplice(removedKeys, updatedItems);
		return (spliceResult !== undefined) ? spliceResult : new JW.AbstractMap.SpliceResult({}, {});
	},
	
	/**
	 * Добавляет и удаляет элементы коллекции. Универсальная оптимизированная атомарная операция удаления/вставки.
	 * @param {Array} removedKeys `<string>` Ключи элементов для удаления.
	 * @param {Object} updatedItems Элементы для добавления/замены.
	 * @returns {JW.AbstractMap.SpliceResult} `<T>` Результат. Если нет изменений - undefined.
	 */
	trySplice: function(removedKeys, updatedItems) {
		var spliceResult = JW.Map.trySplice(this.json, removedKeys, updatedItems);
		if (spliceResult) {
			this.length += JW.Map.getLength(spliceResult.addedItems) - JW.Map.getLength(spliceResult.removedItems);
			return spliceResult;
		}
	},
	
	/**
	 * Меняет ключи элементов словаря.
	 * @param {Object} keyMap `<string>` Словарь ключей. Элемент с ключем k будет перемещен в ключ keyMap[k].
	 * Обязательно указывать только изменившиеся ключи.
	 * @returns {Object} Словарь изменившихся ключей.
	 */
	reindex: function(keyMap) {
		var result = this.tryReindex(keyMap);
		return (result !== undefined) ? result : {};
	},
	
	/**
	 * Меняет ключи элементов словаря.
	 * @param {Object} keyMap `<string>` Словарь ключей. Элемент с ключем k будет перемещен в ключ keyMap[k].
	 * Обязательно указывать только изменившиеся ключи.
	 * @returns {Object} Словарь изменившихся ключей. Если нет изменений - undefined.
	 */
	tryReindex: function(keyMap) {
		return JW.Map.tryReindex(this.json, keyMap);
	},
	
	/**
	 * Определяет параметры метода #splice, с которыми содержимое словаря станет равно newItems.
	 * Т.е. определяет, какие элементы нужно удалить, какие добавить, и с каким ключом.
	 * @param {Object} newItems Новое содержимое словаря.
	 * @returns {JW.AbstractMap.SpliceParams}
	 * `<T>` Параметры метода #splice.
	 * Если вызова метода не требуется - undefined.
	 */
	detectSplice: function(newItems) {
		return JW.Map.detectSplice(this.json, newItems);
	},
	
	/**
	 * Определяет параметр метода #reindex, с которым содержимое словаря станет равно newItems.
	 * Т.е. определяет, какие элементы куда нужно переместить.
	 * Если содержимое newItems отличается от содержимого словаря, словарь сломается.
	 * @param {Object} newItems Новое содержимое словаря.
	 * @param {Function} [getKey] Функция, возвращающая уникальный ключ элемента в коллекции. По умолчанию
	 * равна #getKey. Если коллекция содержит экземпляры JW.Class, то все тип-топ.
	 * @param {Object} [scope] Контекст вызова getKey. По умолчанию, функция вызывается в контексте коллекции.
	 * @returns {Object}
	 * Параметр keyMap метода #reindex.
	 * Если вызова метода не требуется - undefined.
	 */
	detectReindex: function(newItems, getKey, scope) {
		return JW.Map.detectReindex(this.json, newItems, getKey || this.getKey, scope || this);
	},
	
	/**
	 * Преобразует содержимое словаря к newItems комбинацией методов #detectSplice и #splice.
	 * @param {Object} newItems Новое содержимое словаря.
	 * @returns {void}
	 */
	performSplice: function(newItems) {
		var params = this.detectSplice(newItems);
		if (params !== undefined) {
			this.trySplice(params.removedKeys, params.updatedItems);
		}
	},
	
	/**
	 * Преобразует содержимое словаря к newItems комбинацией методов #detectReindex и #reindex.
	 * @param {Object} newItems Новое содержимое словаря.
	 * @param {Function} [getKey] Функция, возвращающая уникальный ключ элемента в коллекции. По умолчанию
	 * равна #getKey. Если коллекция содержит экземпляры JW.Class, то все тип-топ.
	 * @param {Object} [scope] Контекст вызова getKey. По умолчанию, функция вызывается в контексте коллекции.
	 * @returns {void}
	 */
	performReindex: function(newItems, getKey, scope) {
		var keyMap = this.detectReindex(newItems, getKey, scope);
		if (keyMap !== undefined) {
			this.tryReindex(keyMap);
		}
	},
	
	/**
	 * `<U>` Конструирует конвертер элементов коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractMap.Mapper}
	 * `<T, U>` Синхронизатор.
	 */
	createMapper: function(config) {
		return new JW.AbstractMap.Mapper(this, config);
	},
	
	/**
	 * Конструирует фильтровщик коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractMap.Filterer}
	 * `<T>` Синхронизатор.
	 */
	createFilterer: function(config) {
		return new JW.AbstractMap.Filterer(this, config);
	},
	
	/**
	 * Конструирует наблюдатель коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractMap.Observer}
	 * `<T>` Синхронизатор.
	 */
	createObserver: function(config) {
		return new JW.AbstractMap.Observer(this, config);
	},
	
	/**
	 * Конструирует конвертер коллекции в массив (упорядочитель).
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractMap.Orderer}
	 * `<T>` Синхронизатор.
	 */
	createOrderer: function(config) {
		return new JW.AbstractMap.Orderer(this, config);
	},
	
	/**
	 * Конструирует конвертер коллекции в массив (сортировщик по компаратору).
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractMap.SorterComparing}
	 * `<T>` Синхронизатор.
	 */
	createSorterComparing: function(config) {
		return new JW.AbstractMap.SorterComparing(this, config);
	},
	
	/**
	 * Конструирует индексатор коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractMap.Indexer}
	 * `<T>` Синхронизатор.
	 */
	createIndexer: function(config) {
		return new JW.AbstractMap.Indexer(this, config);
	},
	
	/**
	 * Конструирует конвертер коллекции в множество.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractMap.Lister}
	 * `<T>` Синхронизатор.
	 */
	createLister: function(config) {
		return new JW.AbstractMap.Lister(this, config);
	},
	
	/**
	 * Конструирует синхронизатор представления с массивом.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractMap.Inserter}
	 * `<T>` Синхронизатор.
	 */
	createInserter: function(config) {
		return new JW.AbstractMap.Inserter(this, config);
	},
	
	/**
	 * Поэлементно сравнивает с другим словарем.
	 * @param {Object} map Другой словарь.
	 * @returns {boolean} Словари поэлементно равны.
	 */
	equal: function(map) {
		return JW.Map.equal(this.json, map);
	},
	
	_callStatic: function(algorithm, args) {
		return JW.Map[algorithm].apply(JW.Map, [this.json].concat(JW.args(args || [])));
	}
	
	/**
	 * @method createEmpty
	 * `<U>` Конструирует пустую коллекцию того же типа.
	 * @returns {JW.AbstractMap} `<U>` Коллекция.
	 */
});

/**
 * @class
 * `<T>` Параметры метода JW.AbstractMap#splice.
 * @extends JW.Class
 *
 * @constructor
 * @param {Array} removedKeys `<string>` Ключи для удаления.
 * @param {Object} updatedItems Элементы для добавления/замены.
 */
JW.AbstractMap.SpliceParams = function(removedKeys, updatedItems) {
	JW.AbstractMap.SpliceParams._super.call(this);
	this.removedKeys = removedKeys;
	this.updatedItems = updatedItems;
};

JW.extend(JW.AbstractMap.SpliceParams, JW.Class, {
	/**
	 * @property {Array} removedKeys `<string>` Ключи для удаления.
	 */
	/**
	 * @property {Object} updatedItems Элементы для добавления/замены.
	 */
});

/**
 * @class
 * `<T>` Результат вызова метода JW.AbstractMap#splice.
 * @extends JW.Class
 *
 * @constructor
 * @param {Object} removedItems Удаленные элементы.
 * @param {Object} updatedItems Добавленные элементы.
 */
JW.AbstractMap.SpliceResult = function(removedItems, addedItems) {
	JW.AbstractMap.SpliceResult._super.call(this);
	this.removedItems = removedItems;
	this.addedItems = addedItems;
};

JW.extend(JW.AbstractMap.SpliceResult, JW.Class, {
	/**
	 * @property {Object} removedItems Удаленные элементы.
	 */
	/**
	 * @property {Object} updatedItems Добавленные элементы.
	 */
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T> extends JW.AbstractCollection.Filterer<T, JW.AbstractMap<T>>`
 *
 * Фильтровщик словаря. Подробнее читайте JW.AbstractCollection.Filterer.
 *
 * @extends JW.AbstractCollection.Filterer
 *
 * @constructor
 * Конструирует синхронизатор. Предпочтительнее использовать метод JW.AbstractCollection#createFilterer.
 * @param {JW.AbstractMap} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.AbstractMap.Filterer = function(source, config) {
	JW.AbstractMap.Filterer._super.call(this, source, config);
	this.target.trySetAll(source.filter(this.filterItem, this.scope));
};

JW.extend(JW.AbstractMap.Filterer, JW.AbstractCollection.Filterer, {
	/**
	 * @cfg {JW.AbstractMap} target `<T>` Целевая коллекция.
	 */
	/**
	 * @property {JW.AbstractMap} source `<T>` Исходная коллекция.
	 */
	/**
	 * @property {JW.AbstractMap} target `<T>` Целевая коллекция.
	 */
	
	// override
	destroy: function() {
		this.target.tryRemoveAll(this.source.getKeys());
		this._super();
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T> extends JW.AbstractCollection.Indexer<T, JW.AbstractMap<T>>`
 *
 * Индексатор словаря. Подробнее читайте JW.AbstractCollection.Indexer.
 *
 * @extends JW.AbstractCollection.Indexer
 *
 * @constructor
 * Конструирует синхронизатор. Предпочтительнее использовать метод JW.AbstractCollection#createIndexer.
 * @param {JW.AbstractMap} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.AbstractMap.Indexer = function(source, config) {
	JW.AbstractMap.Indexer._super.call(this, source, config);
};

JW.extend(JW.AbstractMap.Indexer, JW.AbstractCollection.Indexer, {
	/**
	 * @property {JW.AbstractMap} source `<T>` Исходная коллекция.
	 */
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T>`
 *
 * Синхронизатор представления словаря. Прослушивает все события словаря и сводит их к 2 элементарным функциям:
 * элемент добавлен с указанным ключом и элемент удален с указанным ключом. В целях оптимизации, можно определить
 * третью функцию: коллекция очищена (в случае, если есть более эффективный алгоритм очистки, чем удаление всех
 * элементов простым перебором). В отличие от JW.AbstractCollection.Observer, следит за ключами элементов.
 * Синхронизатор используется, прежде всего, для синхронизации DOM-элемента со словарем дочерних элементов.
 *
 * Создавайте синхронизатор с помощью метода JW.AbstractMap#createInserter:
 *
 *     var inserter = map.createInserter({
 *         addItem: function(el, key) { this.el.find("[elkey=" + key + "]").append(el); },
 *         removeItem: function(el, key) { el.detach(); },
 *         scope: this
 *     });
 *
 * Метод сам определит, какая реализация синхронизатора лучше подойдет (простая или observable).
 *
 * Правила работы синхронизатора:
 *
 * - При конструировании синхронизатора для всех элементов исходной коллекции вызывается функция
 * {@link #cfg-addItem}.
 * - При уничтожении синхронизатора вызывается функция {@link #cfg-clearItems}, либо для всех элементов
 * вызывается функция {@link #cfg-removeItem}.
 * - При изменении ключей/переиндексации элементов вызовами функций синхронизируется порядок элементов.
 *
 * @extends JW.Class
 *
 * @constructor
 * Конструирует синхронизатор. Предпочтительнее использовать метод JW.AbstractMap#createInserter.
 * @param {JW.AbstractMap} source `<T>` Исходный словарь.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.AbstractMap.Inserter = function(source, config) {
	JW.AbstractMap.Inserter._super.call(this);
	config = config || {};
	this.source = source;
	this.addItem = config.addItem;
	this.removeItem = config.removeItem;
	this.scope = config.scope || this;
	this.clearItems = config.clearItems;
	this._addItems(this.source.getJson());
};

JW.extend(JW.AbstractMap.Inserter, JW.Class, {
	/**
	 * @cfg {Function} addItem
	 *
	 * `addItem(item: T, key: string): void`
	 *
	 * Элемент добавлен в словарь с указанным ключом.
	 */
	/**
	 * @cfg {Function} removeItem
	 *
	 * `removeItem(item: T, key: string): void`
	 *
	 * Элемент удален из словаря с указанным ключом.
	 */
	/**
	 * @cfg {Function} clearItems
	 *
	 * `clearItems(items: Object): void`
	 *
	 * Словарь очищен. По умолчанию, вызывает removeItem для всех элементов словаря.
	 */
	/**
	 * @cfg {Object} scope Контекст вызова addItem, removeItem, clearItems.
	 */
	/**
	 * @property {JW.AbstractMap} source `<T>` Исходный словарь.
	 */
	
	destroy: function() {
		this._clearItems(this.source.getJson());
		this._super();
	},
	
	_addItems: function(items) {
		if (!this.addItem) {
			return;
		}
		for (var key in items) {
			this.addItem.call(this.scope, items[key], key);
		}
	},
	
	_removeItems: function(items) {
		if (!this.removeItem) {
			return;
		}
		for (var key in items) {
			this.removeItem.call(this.scope, key, items[key]);
		}
	},
	
	_clearItems: function(items) {
		if (JW.Map.isEmpty(items)) {
			return;
		}
		if (this.clearItems) {
			this.clearItems.call(this.scope || this, items);
		} else {
			this._removeItems(items);
		}
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T extends JW.Class> extends JW.AbstractCollection.Lister<T, JW.AbstractMap<T>>`
 *
 * Конвертер словаря в множество. Подробнее читайте JW.AbstractCollection.Lister.
 *
 * @extends JW.AbstractCollection.Lister
 *
 * @constructor
 * Конструирует конвертер. Предпочтительнее использовать метод JW.AbstractCollection#createLister.
 * @param {JW.AbstractMap} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.AbstractMap.Lister = function(source, config) {
	JW.AbstractMap.Lister._super.call(this, source, config);
};

JW.extend(JW.AbstractMap.Lister, JW.AbstractCollection.Lister, {
	/**
	 * @property {JW.AbstractMap} source `<T>` Исходная коллекция.
	 */
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T, U> extends JW.AbstractCollection.Mapper<T, U, JW.AbstractMap<T>, JW.AbstractMap<U>>`
 *
 * Конвертер элементов словаря. Подробнее читайте JW.AbstractCollection.Mapper.
 *
 * @extends JW.AbstractCollection.Mapper
 *
 * @constructor
 * Конструирует синхронизатор. Предпочтительнее использовать метод JW.AbstractCollection#createMapper.
 * @param {JW.AbstractMap} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.AbstractMap.Mapper = function(source, config) {
	JW.AbstractMap.Mapper._super.call(this, source, config);
	this.target.trySetAll(this._createItems(source.getJson()));
};

JW.extend(JW.AbstractMap.Mapper, JW.AbstractCollection.Mapper, {
	/**
	 * @cfg {JW.AbstractMap} target `<U>` Целевая коллекция.
	 */
	/**
	 * @property {JW.AbstractMap} source `<T>` Исходная коллекция.
	 */
	/**
	 * @property {JW.AbstractMap} target `<U>` Целевая коллекция.
	 */
	
	// override
	destroy: function() {
		this._destroyItems(this.target.removeAll(this.source.getKeys()), this.source.getJson());
		this._super();
	},
	
	_createItems: function(datas) {
		var items = {};
		for (var key in datas) {
			items[key] = this.createItem.call(this.scope, datas[key]);
		}
		return items;
	},
	
	_destroyItems: function(items, datas) {
		if (this.destroyItem === undefined) {
			return;
		}
		for (var key in items) {
			this.destroyItem.call(this.scope, items[key], datas[key]);
		}
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T> extends JW.AbstractCollection.Observer<T, JW.AbstractMap<T>>`
 *
 * Наблюдатель словаря. Подробнее читайте JW.AbstractCollection.Observer.
 *
 * @extends JW.AbstractCollection.Observer
 *
 * @constructor
 * Конструирует синхронизатор. Предпочтительнее использовать метод JW.AbstractCollection#createObserver.
 * @param {JW.AbstractMap} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.AbstractMap.Observer = function(source, config) {
	JW.AbstractMap.Observer._super.call(this, source, config);
};

JW.extend(JW.AbstractMap.Observer, JW.AbstractCollection.Observer, {
	/**
	 * @property {JW.AbstractMap} source `<T>` Исходная коллекция.
	 */
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T extends JW.Class> extends JW.AbstractCollection.Orderer<T, JW.AbstractMap<T>>`
 *
 * Конвертер словаря в массив (упорядочитель). Подробнее читайте JW.AbstractCollection.Orderer.
 *
 * @extends JW.AbstractCollection.Orderer
 *
 * @constructor
 * Конструирует конвертер. Предпочтительнее использовать метод JW.AbstractCollection#createOrderer.
 * @param {JW.AbstractMap} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.AbstractMap.Orderer = function(source, config) {
	JW.AbstractMap.Orderer._super.call(this, source, config);
};

JW.extend(JW.AbstractMap.Orderer, JW.AbstractCollection.Orderer, {
	/**
	 * @property {JW.AbstractMap} source `<T>` Исходная коллекция.
	 */
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T> extends JW.AbstractCollection.SorterComparing<T, JW.AbstractMap<T>>`
 *
 * Конвертер словаря в массив (сортировщик по компаратору). Подробнее читайте JW.AbstractCollection.SorterComparing.
 *
 * @extends JW.AbstractCollection.SorterComparing
 *
 * @constructor
 * Конструирует конвертер. Предпочтительнее использовать метод JW.AbstractCollection#createSorterComparing.
 * @param {JW.AbstractMap} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.AbstractMap.SorterComparing = function(source, config) {
	JW.AbstractMap.SorterComparing._super.call(this, source, config);
};

JW.extend(JW.AbstractMap.SorterComparing, JW.AbstractCollection.SorterComparing, {
	/**
	 * @property {JW.AbstractMap} source `<T>` Исходная коллекция.
	 */
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T extends JW.Class> extends JW.AbstractCollection<T>`
 *
 * Абстрактное множество.
 *
 * Множество - это неупорядоченная коллекция, оптимизированная под добавление/удаление/поиск элемента. В отличие от
 * массива и словаря, множество может содержать только экземпляры JW.Class. Внутреннее представление множества - это
 * словарь из {@link JW.Class#_iid iid} элемента в сам элемент.
 *
 * # Методы множества
 *
 * **Жирным шрифтом выделены изменения по сравнению с JW.AbstractCollection.**
 *
 * Получение содержимого:
 *
 * - {@link #getLength} - Возвращает количество элементов в коллекции.
 * - {@link #isEmpty} - Проверяет коллекцию на пустоту.
 * - {@link #getFirst} - Возвращает первый элемент коллекции.
 * - {@link #containsItem}, **{@link #contains}** - Содержит ли коллекция элемент.
 * - **{@link #getJson} - Возвращает внутреннее представление множества.**
 *
 * Алгоритмы перебора:
 *
 * - {@link #every} - Проверяет все элементы по критерию.
 * Возвращает true тогда и только тогда, когда все элементы удовлетворяют критерию.
 * - {@link #some} - Проверяет каждый элемент по критерию.
 * Возвращает true тогда и только тогда, когда хотя бы один элемент удовлетворяет критерию.
 * - {@link #each} - Перебирает элементы.
 * - {@link #search} - Ищет элемент по критерию.
 * Возвращает первый элемент, удовлетворяющий критерию.
 * - {@link #filter}, #$filter - Фильтрует коллекцию по критерию.
 * Строит новую коллекцию того же типа, включающую только элементы, удовлетворяющие критерию.
 * - {@link #map}, #$map - Отображает элементы коллекции.
 * Строит новую коллекцию того же типа, состояющую из результатов запуска отображающей функции на каждом элементе
 * коллекции.
 * - {@link #toSorted}, #$toSorted, #toSortedComparing, #$toSortedComparing -
 * Строит массив из элементов коллекции, отсортированный по индексу
 * или компаратору.
 * - {@link #index}, #$index - Индексирует коллекцию.
 * Строит словарь, в ключах которого находятся индексы элементов, а в значениях - соответствующие элементы.
 * - {@link #toArray}, #$toArray - Строит новый массив из элементов коллекции.
 * - {@link #toSet}, #$toSet - Строит новое множество из элементов коллекции.
 * - {@link #asArray}, #$asArray - Представляет коллекцию в виде массива.
 * - {@link #asSet}, #$asSet - Представляет коллекцию в виде множества.
 *
 * Изменение коллекции:
 *
 * - **{@link #add}, #tryAdd - Добавляет элемент в множество.**
 * - **{@link #addAll}, #$addAll, #tryAddAll - Добавляет набор элементов в множество.**
 * - **{@link #remove}, #tryRemove - Удаляет элемент из множества.**
 * - **{@link #removeAll}, #$removeAll, #tryRemoveAll - Удаляет набор элементов из множества.**
 * - {@link #removeItem} - Удаляет первое вхождение элемента из коллекции.
 * - {@link #removeItems} - Удаляет все вхождения элементов из коллекции.
 * - {@link #clear}, #$clear, #tryClear - Очищает коллекцию.
 * - **{@link #splice}, #trySplice - Удаляет/вставляет элементы.**
 * - **{@link #performSplice} - Приводит содержимое методом #splice.**
 *
 * Создание синхронизаторов:
 *
 * - {@link #createMapper} - Создает конвертер элементов.
 * - {@link #createFilterer} - Создает фильтровщик.
 * - {@link #createLister} - Создает конвертер в множество.
 * - {@link #createIndexer} - Создает индексатор.
 * - {@link #createOrderer} - Создает конвертер в массив (упорядочитель).
 * - {@link #createSorterComparing} - Создает конвертер в массив (сортировщик по компаратору).
 * - {@link #createObserver} - Создает наблюдатель.
 *
 * Создание родственных коллекций (для разработки алгоритмов и синхронизаторов):
 *
 * - {@link #createEmpty} - Создает пустую коллекцию того же типа.
 * - {@link #createEmptyArray} - Создает пустой массив того же типа.
 * - {@link #createEmptyMap} - Создает пустой словарь того же типа.
 * - {@link #createEmptySet} - Создает пустое множество того же типа.
 *
 * Другие методы:
 *
 * - **{@link #detectSplice} - Определяет параметры метода #splice для приведения содержимого.**
 * - **{@link #equal} - Сравнивает с массивом.**
 *
 * Все те же самые методы доступны и для нативного JavaScript Object как множества, смотрите статические методы JW.Set.
 *
 * @extends JW.AbstractCollection
 * @abstract
 */
JW.AbstractSet = function(items, adapter) {
	JW.AbstractSet._super.call(this);
	this.json = adapter ? items : items ? JW.Array.index(items, JW.byField("_iid")) : {};
	this.length = JW.Set.getLength(this.json);
};

JW.extend(JW.AbstractSet, JW.AbstractCollection, {
	/**
	 * Возвращает внутреннее представление множества.
	 *
	 * **Метод не копирует коллекцию, будьте осторожны.**
	 *
	 * @returns {Object} Внутреннее представление множества.
	 */
	getJson: function() {
		return this.json;
	},
	
	getLength: function() {
		return this.length;
	},
	
	isEmpty: function() {
		return this.length === 0;
	},
	
	containsItem: function(item) {
		return this.json.hasOwnProperty(item._iid);
	},
	
	/**
	 * Проверяет наличие элемента в коллекции. Сокращение #containsItem.
	 * @param {T} item Элемент.
	 * @returns {boolean} Коллекция содержит указанный элемент.
	 */
	contains: function(item) {
		return this.json.hasOwnProperty(item._iid);
	},
	
	every: function(callback, scope) {
		return JW.Set.every(this.json, callback, scope);
	},
	
	/**
	 * Фильтрует коллекцию по критерию.
	 *
	 * Строит новую коллекцию того же типа, включающую только те элементы, функция f на которых вернула !== false.
	 *
	 * @param {Function} f
	 *
	 * `f(T item): boolean`
	 *
	 * Фильтрующая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {Object} Отфильтрованная коллекция.
	 */
	filter: function(callback, scope) {
		return JW.Set.filter(this.json, callback, scope);
	},
	
	/**
	 * Фильтрует коллекцию по критерию.
	 *
	 * Строит новую коллекцию того же типа, включающую только те элементы, функция f на которых вернула !== false.
	 *
	 * @param {Function} f
	 *
	 * `f(T item): boolean`
	 *
	 * Фильтрующая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {JW.Set} `<T>` Отфильтрованная коллекция.
	 */
	$filter: JW.AbstractCollection._create$Set("filter"),
	
	/**
	 * `<U>` Отображает элементы коллекции.
	 * 
	 * Строит новую коллекцию того же типа, состояющую из результатов запуска функции f на каждом элементе коллекции.
	 *
	 * @param {Function} f
	 *
	 * `f(T item): U`
	 *
	 * Отображающая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {Object} Отображенная коллекция.
	 */
	map: function(callback, scope) {
		return JW.Set.map(this.json, callback, scope);
	},
	
	/**
	 * `<U>` Отображает элементы коллекции.
	 * 
	 * Строит новую коллекцию того же типа, состояющую из результатов запуска функции f на каждом элементе коллекции.
	 *
	 * @param {Function} f
	 *
	 * `f(T item): U`
	 *
	 * Отображающая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {JW.Set} `<U>` Отображенная коллекция.
	 */
	$map: JW.AbstractCollection._create$Set("map"),
	
	asSet: function() {
		return this.json;
	},
	
	$asSet: function() {
		return this;
	},
	
	/**
	 * Добавляет элемент в множество, если его еще нет.
	 * @param {T} item Элемент.
	 * @returns {boolean} Элемент добавлен.
	 */
	add: function(item) {
		return this.tryAdd(item) !== undefined;
	},
	
	/**
	 * Добавляет элемент в множество, если его еще нет.
	 * @param {T} item Элемент.
	 * @returns {boolean} Элемент добавлен. Если нет изменений - undefined.
	 */
	tryAdd: function(item) {
		if (this.trySplice([], [item]) !== undefined) {
			return true;
		}
	},
	
	/**
	 * Добавляет набор элементов в множество, если их еще нет.
	 * @param {Array} items `<T>` Элементы.
	 * @returns {Array} `<T>` Добавленные элементы.
	 */
	addAll: function(items) {
		var result = this.tryAddAll(items);
		return (result !== undefined) ? result : [];
	},
	
	/**
	 * Добавляет набор элементов в множество, если их еще нет.
	 * @param {Array} items `<T>` Элементы.
	 * @returns {JW.Array} `<T>` Добавленные элементы.
	 */
	$addAll: JW.AbstractCollection._create$Array("addAll"),
	
	/**
	 * Добавляет набор элементов в множество, если их еще нет.
	 * @param {Array} items `<T>` Элементы.
	 * @returns {Array} `<T>` Добавленные элементы. Если нет изменений - undefined.
	 */
	tryAddAll: function(items) {
		var spliceResult = this.trySplice([], items);
		if (spliceResult !== undefined) {
			return spliceResult.addedItems;
		}
	},
	
	/**
	 * Удаляет элемент из множества, если он там есть.
	 * @param {T} item Элемент.
	 * @returns {boolean} Элемент удален.
	 */
	remove: function(item) {
		return this.tryRemove(item) !== undefined;
	},
	
	/**
	 * Удаляет элемент из множества, если он там есть.
	 * @param {T} item Элемент.
	 * @returns {boolean} Элемент удален. Если нет изменений - undefined.
	 */
	tryRemove: function(item) {
		if (this.trySplice([item], []) !== undefined) {
			return true;
		}
	},
	
	removeItem: function(item) {
		this.tryRemove(item);
	},
	
	/**
	 * Удаляет набор элементов из множества, если они там есть.
	 * @param {Array} items `<T>` Элементы.
	 * @returns {Array} `<T>` Удаленные элементы.
	 */
	removeAll: function(items) {
		var result = this.tryRemoveAll(items);
		return (result !== undefined) ? result : [];
	},
	
	/**
	 * Удаляет набор элементов из множества, если они там есть.
	 * @param {Array} items `<T>` Элементы.
	 * @returns {JW.Array} `<T>` Удаленные элементы.
	 */
	$removeAll: JW.AbstractCollection._create$Array("removeAll"),
	
	/**
	 * Удаляет набор элементов из множества, если они там есть.
	 * @param {Array} items `<T>` Элементы.
	 * @returns {Array} `<T>` Удаленные элементы. Если нет изменений - undefined.
	 */
	tryRemoveAll: function(items) {
		var spliceResult = this.trySplice(items, []);
		if (spliceResult !== undefined) {
			return spliceResult.removedItems;
		}
	},
	
	removeItems: function(items) {
		this.tryRemoveAll(items);
	},
	
	/**
	 * Очищает коллекцию.
	 * @returns {Array} `<T>` Бывшее содержимое коллекции.
	 */
	clear: function() {
		var items = this.tryClear();
		return (items !== undefined) ? items : [];
	},
	
	/**
	 * Очищает коллекцию.
	 * @returns {JW.Array} `<T>` Бывшее содержимое коллекции.
	 */
	$clear: JW.AbstractCollection._create$Array("clear"),
	
	/**
	 * Очищает коллекцию.
	 * @returns {Array} `<T>`. Бывшее содержимое коллекции. Если нет изменений - undefined.
	 */
	tryClear: function() {
		this.length = 0;
		return JW.Set.tryClear(this.json);
	},
	
	/**
	 * Добавляет и удаляет элементы коллекции. Универсальная оптимизированная атомарная операция удаления/вставки.
	 * @param {Array} removedItems `<T>` Список элементов для удаления.
	 * @param {Array} addedItems `<T>` Список элементов для добавления.
	 * @returns {JW.AbstractSet.SpliceResult} `<T>` Результат.
	 */
	splice: function(removedItems, addedItems) {
		var spliceResult = this.trySplice(removedItems, addedItems);
		return (spliceResult !== undefined) ? spliceResult : new JW.AbstractSet.SpliceResult([], []);
	},
	
	/**
	 * Добавляет и удаляет элементы коллекции. Универсальная оптимизированная атомарная операция удаления/вставки.
	 * @param {Array} removedItems `<T>` Список элементов для удаления.
	 * @param {Array} addedItems `<T>` Список элементов для добавления.
	 * @returns {JW.AbstractSet.SpliceResult} `<T>` Результат. Если нет изменений - undefined.
	 */
	trySplice: function(removedItems, addedItems) {
		var spliceResult = JW.Set.trySplice(this.json, removedItems, addedItems);
		if (spliceResult) {
			this.length += spliceResult.addedItems.length - spliceResult.removedItems.length;
			return spliceResult;
		}
	},
	
	/**
	 * Определяет параметры метода #splice, с которыми содержимое множества станет равно newItems.
	 * Т.е. определяет, какие элементы нужно удалить, какие добавить.
	 * @param {Array} newItems `<T>` Новое содержимое множества.
	 * @returns {JW.AbstractSet.SpliceParams}
	 * `<T>` Параметры метода #splice.
	 * Если вызова метода не требуется - undefined.
	 */
	detectSplice: function(newItems) {
		return JW.Set.detectSplice(this.json, newItems);
	},
	
	/**
	 * Преобразует содержимое множества к newItems комбинацией методов #detectSplice и #splice.
	 * @param {Array} newItems `<T>` Новое содержимое множества.
	 * @returns {void}
	 */
	performSplice: function(newItems) {
		var spliceParams = this.detectSplice(newItems);
		if (spliceParams !== undefined) {
			this.trySplice(spliceParams.removedItems, spliceParams.addedItems);
		}
	},
	
	/**
	 * `<U>` Конструирует конвертер элементов коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractSet.Mapper}
	 * `<T, U>` Синхронизатор.
	 */
	createMapper: function(config) {
		return new JW.AbstractSet.Mapper(this, config);
	},
	
	/**
	 * Конструирует фильтровщик коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractSet.Filterer}
	 * `<T>` Синхронизатор.
	 */
	createFilterer: function(config) {
		return new JW.AbstractSet.Filterer(this, config);
	},
	
	/**
	 * Конструирует наблюдатель коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractSet.Observer}
	 * `<T>` Синхронизатор.
	 */
	createObserver: function(config) {
		return new JW.AbstractSet.Observer(this, config);
	},
	
	/**
	 * Конструирует конвертер коллекции в массив (упорядочитель).
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractSet.Orderer}
	 * `<T>` Синхронизатор.
	 */
	createOrderer: function(config) {
		return new JW.AbstractSet.Orderer(this, config);
	},
	
	/**
	 * Конструирует конвертер коллекции в массив (сортировщик по компаратору).
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractSet.SorterComparing}
	 * `<T>` Синхронизатор.
	 */
	createSorterComparing: function(config) {
		return new JW.AbstractSet.SorterComparing(this, config);
	},
	
	/**
	 * Конструирует индексатор коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractSet.Indexer}
	 * `<T>` Синхронизатор.
	 */
	createIndexer: function(config) {
		return new JW.AbstractSet.Indexer(this, config);
	},
	
	/**
	 * Конструирует конвертер коллекции в множество.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractSet.Lister}
	 * `<T>` Синхронизатор.
	 */
	createLister: function(config) {
		return new JW.AbstractSet.Lister(this, config);
	},
	
	/**
	 * Поэлементно сравнивает с массивом.
	 * @param {Array} array `<T>` Массив.
	 * @returns {boolean} Множество равно массиву.
	 */
	equal: function(array) {
		return JW.Set.equal(this.json, array);
	},
	
	_callStatic: function(algorithm, args) {
		return JW.Set[algorithm].apply(JW.Set, [this.json].concat(JW.args(args || [])));
	}
	
	/**
	 * @method createEmpty
	 * `<U>` Конструирует пустую коллекцию того же типа.
	 * @returns {JW.AbstractSet} `<U>` Коллекция.
	 */
});

/**
 * @class
 * `<T>` Параметры метода JW.AbstractSet#splice.
 * @extends JW.Class
 *
 * @constructor
 * @param {Array} removedItems `<T>` Элементы для удаления.
 * @param {Array} addedItems `<T>` Элементы для добавления.
 */
JW.AbstractSet.SpliceParams = function(removedItems, addedItems) {
	JW.AbstractSet.SpliceParams._super.call(this);
	this.removedItems = removedItems;
	this.addedItems = addedItems;
};

JW.extend(JW.AbstractSet.SpliceParams, JW.Class, {
	/**
	 * @property {Array} removedItems `<T>` Элементы для удаления.
	 */
	/**
	 * @property {Array} addedItems `<T>` Элементы для добавления.
	 */
});

/**
 * @class
 * `<T>` Результат метода JW.AbstractSet#splice.
 * @extends JW.Class
 *
 * @constructor
 * @param {Array} removedItems `<T>` Удаленные элементы.
 * @param {Array} addedItems `<T>` Добавленные элементы.
 */
JW.AbstractSet.SpliceResult = function(removedItems, addedItems) {
	JW.AbstractSet.SpliceResult._super.call(this);
	this.removedItems = removedItems;
	this.addedItems = addedItems;
};

JW.extend(JW.AbstractSet.SpliceResult, JW.Class, {
	/**
	 * @property {Array} removedItems `<T>` Удаленные элементы.
	 */
	/**
	 * @property {Array} addedItems `<T>` Добавленные элементы.
	 */
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T extends JW.Class> extends JW.AbstractCollection.Filterer<T, JW.AbstractSet<T>>`
 *
 * Фильтровщик множества. Подробнее читайте JW.AbstractCollection.Filterer.
 *
 * @extends JW.AbstractCollection.Filterer
 *
 * @constructor
 * Конструирует синхронизатор. Предпочтительнее использовать метод JW.AbstractCollection#createFilterer.
 * @param {JW.AbstractSet} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.AbstractSet.Filterer = function(source, config) {
	JW.AbstractSet.Filterer._super.call(this, source, config);
	this.target.tryAddAll(source.$toArray().filter(this.filterItem, this.scope));
};

JW.extend(JW.AbstractSet.Filterer, JW.AbstractCollection.Filterer, {
	/**
	 * @cfg {JW.AbstractSet} target `<T>` Целевая коллекция.
	 */
	/**
	 * @property {JW.AbstractSet} source `<T>` Исходная коллекция.
	 */
	/**
	 * @property {JW.AbstractSet} target `<T>` Целевая коллекция.
	 */
	
	// override
	destroy: function() {
		this.target.tryRemoveAll(this.source.toArray());
		this._super();
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T extends JW.Class> extends JW.AbstractCollection.Indexer<T, JW.AbstractSet<T>>`
 *
 * Индексатор множества. Подробнее читайте JW.AbstractCollection.Indexer.
 *
 * @extends JW.AbstractCollection.Indexer
 *
 * @constructor
 * Конструирует синхронизатор. Предпочтительнее использовать метод JW.AbstractCollection#createIndexer.
 * @param {JW.AbstractSet} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.AbstractSet.Indexer = function(source, config) {
	JW.AbstractSet.Indexer._super.call(this, source, config);
};

JW.extend(JW.AbstractSet.Indexer, JW.AbstractCollection.Indexer, {
	/**
	 * @property {JW.AbstractSet} source `<T>` Исходная коллекция.
	 */
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T extends JW.Class> extends JW.AbstractCollection.Lister<T, JW.AbstractSet<T>>`
 *
 * Конвертер множества в множество. Подробнее читайте JW.AbstractCollection.Lister.
 *
 * @extends JW.AbstractCollection.Lister
 *
 * @constructor
 * Конструирует конвертер. Предпочтительнее использовать метод JW.AbstractCollection#createLister.
 * @param {JW.AbstractSet} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.AbstractSet.Lister = function(source, config) {
	JW.AbstractSet.Lister._super.call(this, source, config);
};

JW.extend(JW.AbstractSet.Lister, JW.AbstractCollection.Lister, {
	/**
	 * @property {JW.AbstractSet} source `<T>` Исходная коллекция.
	 */
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T extends JW.Class, U extends JW.Class> extends JW.AbstractCollection.Mapper<T, U, JW.AbstractSet<T>, JW.AbstractSet<U>>`
 *
 * Конвертер элементов множества. Подробнее читайте JW.AbstractCollection.Mapper.
 *
 * @extends JW.AbstractCollection.Mapper
 *
 * @constructor
 * Конструирует синхронизатор. Предпочтительнее использовать метод JW.AbstractCollection#createMapper.
 * @param {JW.AbstractArray} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.AbstractSet.Mapper = function(source, config) {
	JW.AbstractSet.Mapper._super.call(this, source, config);
	this._items = {};
	this.target.tryAddAll(this._createItems(source.toArray()));
};

JW.extend(JW.AbstractSet.Mapper, JW.AbstractCollection.Mapper, {
	/**
	 * @cfg {JW.AbstractSet} target `<U>` Целевая коллекция.
	 */
	/**
	 * @property {JW.AbstractSet} source `<T>` Исходная коллекция.
	 */
	/**
	 * @property {JW.AbstractSet} target `<U>` Целевая коллекция.
	 */
	/*
	Map<T> _items;
	*/
	
	// override
	destroy: function() {
		var datas = this.source.toArray();
		this.target.tryRemoveAll(this._getItems(datas));
		this._destroyItems(datas);
		this._super();
	},
	
	_getItems: function(datas) {
		return JW.Array.map(datas, function(data) {
			return this._items[data._iid];
		}, this);
	},
	
	_createItems: function(datas) {
		var items = [];
		for (var i = 0, l = datas.length; i < l; ++i) {
			var data = datas[i];
			var item = this.createItem.call(this.scope || this, data);
			items.push(item);
			this._items[data._iid] = item;
		}
		return items;
	},
	
	_destroyItems: function(datas) {
		if (this.destroyItem === undefined) {
			return
		}
		for (var i = datas.length - 1; i >= 0; --i) {
			var data = datas[i];
			var iid = data._iid;
			var item = this._items[iid];
			delete this._items[iid];
			this.destroyItem.call(this.scope || this, item, data);
		}
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T extends JW.Class> extends JW.AbstractCollection.Observer<T, JW.AbstractSet<T>>`
 *
 * Наблюдатель множества. Подробнее читайте JW.AbstractCollection.Observer.
 *
 * @extends JW.AbstractCollection.Observer
 *
 * @constructor
 * Конструирует синхронизатор. Предпочтительнее использовать метод JW.AbstractCollection#createObserver.
 * @param {JW.AbstractSet} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.AbstractSet.Observer = function(source, config) {
	JW.AbstractSet.Observer._super.call(this, source, config);
};

JW.extend(JW.AbstractSet.Observer, JW.AbstractCollection.Observer, {
	/**
	 * @property {JW.AbstractSet} source `<T>` Исходная коллекция.
	 */
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T extends JW.Class> extends JW.AbstractCollection.Orderer<T, JW.AbstractSet<T>>`
 *
 * Конвертер множества в массив (упорядочитель). Подробнее читайте JW.AbstractCollection.Orderer.
 *
 * @extends JW.AbstractCollection.Orderer
 *
 * @constructor
 * Конструирует конвертер. Предпочтительнее использовать метод JW.AbstractCollection#createOrderer.
 * @param {JW.AbstractSet} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.AbstractSet.Orderer = function(source, config) {
	JW.AbstractSet.Orderer._super.call(this, source, config);
};

JW.extend(JW.AbstractSet.Orderer, JW.AbstractCollection.Orderer, {
	/**
	 * @property {JW.AbstractSet} source `<T>` Исходная коллекция.
	 */
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T extends JW.Class> extends JW.AbstractCollection.SorterComparing<T, JW.AbstractSet<T>>`
 *
 * Конвертер множества в массив (сортировщик по компаратору). Подробнее читайте JW.AbstractCollection.SorterComparing.
 *
 * @extends JW.AbstractCollection.SorterComparing
 *
 * @constructor
 * Конструирует конвертер. Предпочтительнее использовать метод JW.AbstractCollection#createSorterComparing.
 * @param {JW.AbstractSet} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.AbstractSet.SorterComparing = function(source, config) {
	JW.AbstractSet.SorterComparing._super.call(this, source, config);
};

JW.extend(JW.AbstractSet.SorterComparing, JW.AbstractCollection.SorterComparing, {
	/**
	 * @property {JW.AbstractSet} source `<T>` Исходная коллекция.
	 */
});

/*
	JW array extension.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T> extends JW.AbstractArray<T>`
 *
 * Простой массив. Структурированный список методов смотрите в JW.AbstractArray.
 * Статические методы повторяют интерфейс JW.AbstractArray, только принимают нативный Array в качестве
 * первого аргумента.
 *
 * @extends JW.AbstractArray
 *
 * @constructor
 * @param {Array} [items] `<T>` Изначальное содержимое массива. По умолчанию, создается пустой массив.
 * @param {boolean} [adapter] Создать массив как адаптер над items. По умолчанию, равен false, т.е. создается
 * копия массива items.
 */
JW.Array = function(items, adapter) {
	JW.Array._super.call(this, items, adapter);
};

JW.extend(JW.Array, JW.AbstractArray, {
	/**
	 * `<U>` Конструирует пустую коллекцию того же типа.
	 * @returns {JW.Array} `<U>` Коллекция.
	 */
	createEmpty: function() {
		return new JW.Array();
	},
	
	/**
	 * `<U>` Конструирует пустой массив того же типа (простой или оповещающий).
	 * @returns {JW.Array} `<U>` Массив.
	 */
	createEmptyArray: function() {
		return new JW.Array();
	},
	
	/**
	 * `<U>` Конструирует пустой словарь того же типа (простой или оповещающий).
	 * @returns {JW.Map} `<U>` Словарь.
	 */
	createEmptyMap: function() {
		return new JW.Map();
	},
	
	/**
	 * `<U>` Конструирует пустое множество того же типа (простое или оповещающее).
	 * @returns {JW.Set} `<U>` Множество.
	 */
	createEmptySet: function() {
		return new JW.Set();
	}
	
	/**
	 * @method getLength
	 * `<T>` Возвращает количество элементов в коллекции.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @returns {number} Количество элементов в коллекции.
	 */
	/**
	 * @method isEmpty
	 * `<T>` Проверяет коллекцию на пустоту.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @returns {boolean} Коллекция не содержит ни одного элемента.
	 */
	/**
	 * @method getFirst
	 * `<T>` Возвращает первый элемент коллекции. Если коллекция пуста, вернет undefined.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @returns {T} Элемент.
	 */
	/**
	 * @method getFirstKey
	 * `<T>` Возвращает индекс первого элемента коллекции. Если коллекция пуста, вернет undefined.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @returns {number} Индекс.
	 */
	/**
	 * @method getLast
	 * `<T>` Возвращает последний элемент коллекции. Если коллекция пуста, вернет undefined.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @returns {T} Элемент.
	 */
	/**
	 * @method getLastKey
	 * `<T>` Возвращает индекс последнего элемента коллекции. Если коллекция пуста, вернет undefined.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @returns {number} Индекс.
	 */
	/**
	 * @method get
	 * `<T>` Возвращает элемент по индексу. В случае, если элемента с таким индексом нет, вернет undefined.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {number} index Индекс.
	 * @returns {T} Элемент.
	 */
	/**
	 * @method containsKey
	 * `<T>` Проверяет наличие элемента с заданным индексом в коллекции.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {number} index Индекс.
	 * @returns {boolean} Коллекция содержит элемент с указанным индексом.
	 */
	/**
	 * @method containsItem
	 * `<T>` Проверяет наличие элемента в коллекции.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {T} item Элемент.
	 * @returns {boolean} Коллекция содержит указанный элемент.
	 */
	/**
	 * @method keyOf
	 * `<T>` Определяет индекс элемента в данной коллекции. Если такого элемента в коллекции нет, вернет undefined.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {T} item Элемент.
	 * @returns {number} Индекс элемента.
	 */
	/**
	 * @method getKeys
	 * `<T>` Возвращает массив индексов всех элементов коллекции, т.е. массив `[0, 1, ... , length - 1]`.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @returns {Array} Массив индексов.
	 */
	/**
	 * @method $getKeys
	 * `<T>` Возвращает массив индексов всех элементов коллекции, т.е. массив `[0, 1, ... , length - 1]`.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @returns {JW.Array} `<number>` Массив ключей.
	 */
	/**
	 * @method removeItem
	 * `<T>` Удаляет первое вхождение указанного элемента из коллекции.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {T} item Элемент.
	 * @returns {void}
	 */
	/**
	 * @method removeItems
	 * `<T extends JW.Class>` Удаляет все вхождения указанных элементов из коллекции.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Array} items `<T>` Элементы.
	 * @returns {void}
	 */
	/**
	 * @method tryClear
	 * `<T>` Очищает коллекцию.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @returns {Array} Бывшее содержимое коллекции. Если нет изменений - undefined.
	 */
	/**
	 * @method clear
	 * `<T>` Очищает коллекцию.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @returns {Array} Бывшее содержимое коллекции.
	 */
	/**
	 * @method $clear
	 * `<T>` Очищает коллекцию.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @returns {JW.Array} `<T>` Бывшее содержимое коллекции.
	 */
	/**
	 * @method every
	 *
	 * `<T>` Проверяет все элементы по критерию.
	 * 
	 * Возвращает true тогда и только тогда, когда функция f возвращает !== false на всех элементах коллекции.
	 * 
	 * Алгоритм последовательно перебирает все элементы, и останавливается после первого элемента, не удовлетворяющего
	 * критерию.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): boolean`
	 *
	 * Критерий проверки элементов.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {boolean} Результат проверки.
	 */
	/**
	 * @method some
	 *
	 * `<T>` Проверяет каждый элемент по критерию.
	 * 
	 * Возвращает true тогда и только тогда, когда функция f возвращает !== false хотя бы на одном элементе коллекции.
	 * 
	 * Алгоритм последовательно перебирает все элементы, и останавливается после первого элемента, удовлетворяющего
	 * критерию.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): boolean`
	 *
	 * Критерий проверки элементов.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {boolean} Результат проверки.
	 */
	/**
	 * @method each
	 * `<T>` Перебирает элементы коллекции. Запускает указанную функцию на всех элементах.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): void`
	 *
	 * Функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {void}
	 */
	/**
	 * @method find
	 *
	 * `<T>` Ищет элемент по критерию.
	 * 
	 * Возвращает индекс первого элемента, функция f на котором возвращает !== false.
	 * 
	 * Алгоритм последовательно перебирает все элементы, и останавливается после первого элемента, удовлетворяющего
	 * критерию.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): boolean`
	 *
	 * Критерий проверки элементов.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {number} Индекс найденного элемента или undefined.
	 */
	/**
	 * @method search
	 *
	 * `<T>` Ищет элемент по критерию.
	 * 
	 * Возвращает первый элемент, функция f на котором возвращает !== false.
	 * 
	 * Алгоритм последовательно перебирает все элементы, и останавливается после первого элемента, удовлетворяющего
	 * критерию.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 *
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): boolean`
	 *
	 * Критерий проверки элементов.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {T} Найденный элемент или undefined.
	 */
	/**
	 * @method toSorted
	 *
	 * `<T>` Преобразует коллекцию в отсортированный массив.
	 *
	 * Строит массив из элементов коллекции, отсортированный по результату запуска функции f на каждом элементе.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 *
	 * @param {Function} [f]
	 *
	 * `f(item: T, index: number): number/string`
	 *
	 * Функция-сортировщик для элемента. По умолчанию возвращает item.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {Array} `<T>` Отсортированный массив.
	 */
	/**
	 * @method $toSorted
	 *
	 * `<T>` Преобразует коллекцию в отсортированный массив.
	 *
	 * Строит массив из элементов коллекции, отсортированный по результату запуска функции f на каждом элементе.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 *
	 * @param {Function} [f]
	 *
	 * `f(item: T, index: number): number/string`
	 *
	 * Функция-сортировщик для элемента. По умолчанию возвращает item.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {JW.Array} `<T>` Отсортированный массив.
	 */
	/**
	 * @method toSortedComparing
	 *
	 * `<T>` Преобразует коллекцию в отсортированный массив.
	 *
	 * Строит массив из элементов коллекции, отсортированный по компаратору.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, i1: number, i2: number): Number`
	 *
	 * Функция-компаратор. Возвращает положительное значение, если t1 > t2; отрицательное значение, если t1 < t2;
	 * 0, если t1 == t2. По умолчанию возвращает JW.cmp(t1, t2).
	 *
	 * @param {Object} [scope] Контекст вызова compare. По умолчанию compare вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {Array} `<T>` Отсортированный массив.
	 */
	/**
	 * @method $toSortedComparing
	 *
	 * `<T>` Преобразует коллекцию в отсортированный массив.
	 *
	 * Строит массив из элементов коллекции, отсортированный по компаратору.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, i1: number, i2: number): Number`
	 *
	 * Функция-компаратор. Возвращает положительное значение, если t1 > t2; отрицательное значение, если t1 < t2;
	 * 0, если t1 == t2. По умолчанию возвращает JW.cmp(t1, t2).
	 *
	 * @param {Object} [scope] Контекст вызова compare. По умолчанию compare вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {JW.Array} `<T>` Отсортированный массив.
	 */
	/**
	 * @method getSortingKeys
	 *
	 * `<T>` Возвращает массив индексов отсортированных элементов.
	 *
	 * Строит массив из индексов элементов коллекции, отсортированный по результату запуска функции f на каждом
	 * элементе.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Function} [f]
	 *
	 * `f(item: T, index: number): number/string`
	 *
	 * Функция-сортировщик для элемента. По умолчанию возвращает item.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {Array} `<number>` Массив индексов отсортированных элементов.
	 */
	/**
	 * @method $getSortingKeys
	 *
	 * `<T>` Возвращает массив индексов отсортированных элементов.
	 *
	 * Строит массив из индексов элементов коллекции, отсортированный по результату запуска функции f на каждом
	 * элементе.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Function} [f]
	 *
	 * `f(item: T, index: number): number/string`
	 *
	 * Функция-сортировщик для элемента. По умолчанию возвращает item.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {JW.Array} `<number>` Массив индексов отсортированных элементов.
	 */
	/**
	 * @method getSortingKeysComparing
	 *
	 * `<T>` Возвращает массив индексов отсортированных элементов.
	 *
	 * Строит массив из индексов элементов коллекции, отсортированный по компаратору.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, i1: number, i2: number): Number`
	 *
	 * Функция-компаратор. Возвращает положительное значение, если t1 > t2; отрицательное значение, если t1 < t2;
	 * 0, если t1 == t2. По умолчанию возвращает JW.cmp(t1, t2).
	 *
	 * @param {Object} [scope] Контекст вызова compare. По умолчанию compare вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {Array} `<number>` Массив индексов отсортированных элементов.
	 */
	/**
	 * @method $getSortingKeysComparing
	 *
	 * `<T>` Возвращает массив индексов отсортированных элементов.
	 *
	 * Строит массив из индексов элементов коллекции, отсортированный по компаратору.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, i1: number, i2: number): Number`
	 *
	 * Функция-компаратор. Возвращает положительное значение, если t1 > t2; отрицательное значение, если t1 < t2;
	 * 0, если t1 == t2. По умолчанию возвращает JW.cmp(t1, t2).
	 *
	 * @param {Object} [scope] Контекст вызова compare. По умолчанию compare вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {JW.Array} `<number>` Массив индексов отсортированных элементов.
	 */
	/**
	 * @method index
	 *
	 * `<T>` Индексирует коллекцию.
	 *
	 * Строит словарь, в ключах которого находятся результаты запуска функции f на всех элементах,
	 * а в значениях - соответствующие элементы.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): string`
	 *
	 * Функция-индексатор для элемента.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {Object} Индекс коллекции.
	 */
	/**
	 * @method $index
	 *
	 * `<T>` Индексирует коллекцию.
	 *
	 * Строит словарь, в ключах которого находятся результаты запуска функции f на всех элементах,
	 * а в значениях - соответствующие элементы.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): string`
	 *
	 * Функция-индексатор для элемента.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {JW.Map} `<T>` Индекс коллекции.
	 */
	/**
	 * @method toArray
	 *
	 * `<T>` Преобразует коллекцию в массив.
	 *
	 * Строит новый массив, включающий все элементы коллекции.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @returns {Array} `<T>` Массив элементов.
	 */
	/**
	 * @method $toArray
	 *
	 * `<T>` Преобразует коллекцию в массив.
	 *
	 * Строит новый массив, включающий все элементы коллекции.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @returns {JW.Array} `<T>` Массив элементов.
	 */
	/**
	 * @method toMap
	 *
	 * Преобразует коллекцию в словарь.
	 *
	 * Строит новый словарь, включающий все элементы коллекции с их ключами в данной коллекции.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @returns {Object} Словарь элементов.
	 */
	/**
	 * @method $toMap
	 *
	 * Преобразует коллекцию в словарь.
	 *
	 * Строит новый словарь, включающий все элементы коллекции с их ключами в данной коллекции.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @returns {JW.Map} `<T>` Словарь элементов.
	 */
	/**
	 * @method toSet
	 *
	 * `<T>` Преобразует коллекцию в множество.
	 *
	 * Строит новое множество, включающее все элементы коллекции.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @returns {Object} Множество элементов.
	 */
	/**
	 * @method $toSet
	 *
	 * `<T>` Преобразует коллекцию в множество.
	 *
	 * Строит новое множество, включающее все элементы коллекции.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @returns {JW.Set} `<T>` Множество элементов.
	 */
	/**
	 * @method asArray
	 *
	 * `<T>` Представляет коллекцию в виде массива.
	 *
	 * Если данная коллекция - массив, сразу возвращает его. В противном случае запускает метод {@link #static-method-toArray}.
	 * Данная функция работает как правило быстрее {@link #static-method-toArray}, но сначала убедитесь, что возвращенный массив
	 * никто не меняет, иначе могут возникнуть странные непредвиденные баги.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @returns {Array} `<T>` Массив элементов.
	 */
	/**
	 * @method $asArray
	 *
	 * `<T>` Представляет коллекцию в виде массива.
	 *
	 * Если данная коллекция - массив, сразу возвращает его. В противном случае запускает метод {@link #static-method-toArray}.
	 * Данная функция работает как правило быстрее {@link #static-method-toArray}, но сначала убедитесь, что возвращенный массив
	 * никто не меняет, иначе могут возникнуть странные непредвиденные баги.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @returns {JW.Array} `<T>` Массив элементов.
	 */
	/**
	 * @method asMap
	 *
	 * Представляет коллекцию в виде словаря.
	 *
	 * Если данная коллекция - словарь, сразу возвращает его. В противном случае запускает метод {@link #static-method-toMap}.
	 * Данная функция работает как правило быстрее {@link #static-method-toMap}, но сначала убедитесь, что возвращенный массив
	 * никто не меняет, иначе могут возникнуть странные непредвиденные баги.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @returns {Object} Словарь элементов.
	 */
	/**
	 * @method $asMap
	 *
	 * Представляет коллекцию в виде словаря.
	 *
	 * Если данная коллекция - словарь, сразу возвращает его. В противном случае запускает метод {@link #static-method-toMap}.
	 * Данная функция работает как правило быстрее {@link #static-method-toMap}, но сначала убедитесь, что возвращенный массив
	 * никто не меняет, иначе могут возникнуть странные непредвиденные баги.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @returns {JW.Map} `<T>` Словарь элементов.
	 */
	/**
	 * @method asSet
	 *
	 * `<T>` Представляет коллекцию в виде множества.
	 *
	 * Если данная коллекция - множество, сразу возвращает его. В противном случае запускает метод {@link #static-method-toSet}.
	 * Данная функция работает как правило быстрее {@link #static-method-toSet}, но сначала убедитесь, что возвращенное множество
	 * никто не меняет, иначе могут возникнуть странные непредвиденные баги.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @returns {Object} Множество элементов.
	 */
	/**
	 * @method $asSet
	 *
	 * `<T>` Представляет коллекцию в виде множества.
	 *
	 * Если данная коллекция - множество, сразу возвращает его. В противном случае запускает метод {@link #static-method-toSet}.
	 * Данная функция работает как правило быстрее {@link #static-method-toSet}, но сначала убедитесь, что возвращенное множество
	 * никто не меняет, иначе могут возникнуть странные непредвиденные баги.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @returns {JW.Set} `<T>` Множество элементов.
	 */
	/**
	 * @method filter
	 *
	 * `<T>` Фильтрует коллекцию по критерию.
	 *
	 * Строит новую коллекцию того же типа, включающую только те элементы, функция f на которых вернула !== false.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Function} f
	 *
	 * `f(T item, index: number): boolean`
	 *
	 * Фильтрующая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {Array} `<T>` Отфильтрованная коллекция.
	 */
	/**
	 * @method $filter
	 *
	 * `<T>` Фильтрует коллекцию по критерию.
	 *
	 * Строит новую коллекцию того же типа, включающую только те элементы, функция f на которых вернула !== false.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Function} f
	 *
	 * `f(T item, index: number): boolean`
	 *
	 * Фильтрующая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {JW.Array} `<T>` Отфильтрованная коллекция.
	 */
	/**
	 * @method map
	 *
	 * `<T, U>` Отображает элементы коллекции.
	 * 
	 * Строит новую коллекцию того же типа, состояющую из результатов запуска функции f на каждом элементе коллекции.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Function} f
	 *
	 * `f(T item, index: number): U`
	 *
	 * Отображающая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {Array} `<U>` Отображенная коллекция.
	 */
	/**
	 * @method $map
	 *
	 * `<T, U>` Отображает элементы коллекции.
	 * 
	 * Строит новую коллекцию того же типа, состояющую из результатов запуска функции f на каждом элементе коллекции.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Function} f
	 *
	 * `f(T item, index: number): U`
	 *
	 * Отображающая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {JW.Array} `<U>` Отображенная коллекция.
	 */
	/**
	 * @method add
	 * `<T>` Добавляет элемент в массив.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {T} item Элемент.
	 * @param {number} [index] Индекс элемента, перед которым вставить новый элемент. По умолчанию, добавляет элемент
	 * в конец массива.
	 * @returns {void}
	 */
	/**
	 * @method tryAdd
	 * `<T>` Добавляет элемент в массив.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {T} item Элемент.
	 * @param {number} [index] Индекс элемента, перед которым вставить новый элемент. По умолчанию, добавляет элемент
	 * в конец массива.
	 * @returns {boolean} true.
	 */
	/**
	 * @method addAll
	 * `<T>` Добавляет набор элементов в массив.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Array} items `<T>` Элементы.
	 * @param {number} [index] Индекс элемента, перед которым вставить новые элементы. По умолчанию, добавляет элементы
	 * в конец массива.
	 * @returns {void}
	 */
	/**
	 * @method tryAddAll
	 * `<T>` Добавляет набор элементов в массив.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Array} items `<T>` Элементы.
	 * @param {number} [index] Индекс элемента, перед которым вставить новые элементы. По умолчанию, добавляет элементы
	 * в конец массива.
	 * @returns {boolean} true. Если нет изменений - undefined.
	 */
	/**
	 * @method set
	 * `<T>` Заменяет элемент с указанным индексом. В случае если элемента с таким индексом нет, массив сломается
	 * (не надо так).
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {T} item Элемент.
	 * @param {number} index Индекс.
	 * @returns {T} Бывший элемент коллекции.
	 */
	/**
	 * @method trySet
	 * `<T>` Заменяет элемент с указанным индексом. В случае если элемента с таким индексом нет, массив сломается
	 * (не надо так).
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {T} item Элемент.
	 * @param {number} index Индекс.
	 * @returns {JW.Proxy} `<T>` Обертка над бывшим элементом коллекции. Если нет изменений - undefined.
	 */
	/**
	 * @method remove
	 * `<T>` Удаляет элемент с указанным индексом. В случае если элемента с таким индексом нет, массив сломается
	 * (не надо так).
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {number} index Индекс.
	 * @returns {T} Бывший элемент коллекции.
	 */
	/**
	 * @method tryRemove
	 * `<T>` Удаляет элемент с указанным индексом. В случае если элемента с таким индексом нет, массив сломается
	 * (не надо так).
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {number} index Индекс.
	 * @returns {T} Бывший элемент коллекции. Если нет изменений - undefined.
	 */
	/**
	 * @method removeAll
	 * `<T>` Удаляет набор элементов из массива.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {number} index Индекс элемента, начиная с которого удалять.
	 * @param {number} count Количество удаленных элементов.
	 * @returns {Array} `<T>` Удаленные элементы.
	 */
	/**
	 * @method $removeAll
	 * `<T>` Удаляет набор элементов из массива.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {number} index Индекс элемента, начиная с которого удалять.
	 * @param {number} count Количество удаленных элементов.
	 * @returns {JW.Array} `<T>` Удаленные элементы.
	 */
	/**
	 * @method tryRemoveAll
	 * `<T>` Удаляет набор элементов из массива.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {number} index Индекс элемента, начиная с которого удалять.
	 * @param {number} count Количество удаленных элементов.
	 * @returns {Array} `<T>` Удаленные элементы. Если нет изменений - undefined.
	 */
	/**
	 * @method move
	 * `<T>` Перемещает элемент в массиве.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {number} fromIndex Индекс элемента, который переместить.
	 * @param {number} toIndex Куда переместить.
	 * @returns {T} Перемещенный элемент.
	 */
	/**
	 * @method tryMove
	 * `<T>` Перемещает элемент в массиве.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {number} fromIndex Индекс элемента, который переместить.
	 * @param {number} toIndex Куда переместить.
	 * @returns {T} Перемещенный элемент. Если нет изменений - undefined.
	 */
	/**
	 * @method splice
	 * `<T>` Добавляет и удаляет элементы коллекции. Универсальная оптимизированная атомарная операция удаления/вставки.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Array} removeParamsList `<JW.AbstractArray.IndexCount>` Список отрезков для удаления по возрастанию
	 * индекса. Отрезки удаляются от конца к началу массива.
	 * @param {Array} addParamsList `<JW.AbstractArray.IndexItems<T>>` Список наборов для вставки по возрастанию
	 * индекса. Наборы вставляются от начала к концу массива.
	 * @returns {JW.AbstractArray.SpliceResult} `<T>` Результат.
	 */
	/**
	 * @method trySplice
	 * `<T>` Добавляет и удаляет элементы коллекции. Универсальная оптимизированная атомарная операция удаления/вставки.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Array} removeParamsList `<JW.AbstractArray.IndexCount>` Список отрезков для удаления по возрастанию
	 * индекса. Отрезки удаляются от конца к началу массива.
	 * @param {Array} addParamsList `<JW.AbstractArray.IndexItems<T>>` Список наборов для вставки по возрастанию
	 * индекса. Наборы вставляются от начала к концу массива.
	 * @returns {JW.AbstractArray.SpliceResult} `<T>` Результат. Если нет изменений - undefined.
	 */
	/**
	 * @method reorder
	 * `<T>` Переупорядочивает элементы массива.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Array} indexArray `<number>` Массив индексов. Элемент с индексом i будет перемещен в
	 * индекс indexArray[i]. Должен содержать все индексы от 0 до (length - 1).
	 * @returns {void}
	 */
	/**
	 * @method tryReorder
	 * `<T>` Переупорядочивает элементы массива.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Array} indexArray `<number>` Массив индексов. Элемент с индексом i будет перемещен в
	 * индекс indexArray[i]. Должен содержать все индексы от 0 до (length - 1).
	 * @returns {Array} `<T>` Бывшее содержимое массива. Если нет изменений - undefined.
	 */
	/**
	 * @method detectSplice
	 * `<T>` Определяет параметры метода {@link #static-method-splice}, с которыми содержимое массива станет равно newItems.
	 * Т.е. определяет, какие элементы нужно удалить, какие вставить, и в какое место. Все элементы должны быть
	 * уникальны относительно функции getKey. Если элементы не уникальны, попробуйте метод
	 * {@link #static-method-detectFilter}.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Array} newItems `<T>` Новое содержимое массива.
	 * @param {Function} [getKey] Функция, возвращающая уникальный ключ элемента в коллекции. По умолчанию
	 * равна JW.iid. Если коллекция содержит экземпляры JW.Class, то все тип-топ.
	 * @param {Object} [scope] Контекст вызова getKey. По умолчанию, функция вызывается в контексте коллекции.
	 * @returns {JW.AbstractArray.SpliceParams}
	 * `<T>` Параметры метода {@link #static-method-splice}.
	 * Если вызова метода не требуется - undefined.
	 */
	/**
	 * @method detectFilter
	 * Определяет параметр removeParamsList метода {@link #static-method-splice}, с которыми содержимое массива станет равно newItems.
	 * Определяет, какие элементы нужно удалить. Не предусматривает вставку новых элементов. В отличие от
	 * метода {@link #static-method-detectSplice}, не требует уникальности элементов массива.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Array} newItems `<T>` Новое содержимое массива.
	 * @returns {Array}
	 * `<JW.AbstractArray.IndexCount>` Параметр removeParamsList метода {@link #static-method-splice}.
	 * Если вызова метода не требуется - undefined.
	 */
	/**
	 * @method detectReorder
	 * `<T>` Определяет параметр метода {@link #static-method-reorder}, с которым содержимое массива станет равно newItems.
	 * Т.е. определяет, какие элементы куда нужно переместить.
	 * Если содержимое newItems отличается от содержимого массива, массив сломается.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Array} newItems `<T>` Новое содержимое массива.
	 * @param {Function} [getKey] Функция, возвращающая уникальный ключ элемента в коллекции. По умолчанию
	 * равна JW.iid. Если коллекция содержит экземпляры JW.Class, то все тип-топ.
	 * @param {Object} [scope] Контекст вызова getKey. По умолчанию, функция вызывается в контексте коллекции.
	 * @returns {Array}
	 * `<number>` Параметр indexArray метода {@link #static-method-reorder}.
	 * Если вызова метода не требуется - undefined.
	 */
	/**
	 * @method detectSort
	 * `<T>` Определяет параметр метода {@link #static-method-reorder}, с которым содержимое массива отсортируется по результату вызова
	 * функции f на всех элементах.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Function} [f]
	 *
	 * `f(item: T, index: number): number/string`
	 *
	 * Функция-сортировщик для элемента. По умолчанию возвращает item.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {Array}
	 * `<number>` Параметр indexArray метода {@link #static-method-reorder}.
	 * Если вызова метода не требуется - undefined.
	 */
	/**
	 * @method detectSortComparing
	 * `<T>` Определяет параметр метода {@link #static-method-reorder}, с которым содержимое массива отсортируется по компаратору.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, i1: number, i2: number): Number`
	 *
	 * Функция-компаратор. Возвращает положительное значение, если t1 > t2; отрицательное значение, если t1 < t2;
	 * 0, если t1 == t2. По умолчанию возвращает JW.cmp(t1, t2).
	 *
	 * @param {Object} [scope] Контекст вызова compare. По умолчанию compare вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {Array}
	 * `<number>` Параметр indexArray метода {@link #static-method-reorder}.
	 * Если вызова метода не требуется - undefined.
	 */
	/**
	 * @method performSplice
	 * `<T>` Преобразует содержимое массива к newItems комбинацией методов {@link #static-method-detectSplice} и {@link #static-method-splice}.
	 * Все элементы должны быть
	 * уникальны относительно функции getKey. Если элементы не уникальны, попробуйте метод {@link #static-method-performFilter}.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Array} newItems `<T>` Новое содержимое массива.
	 * @param {Function} [getKey] Функция, возвращающая уникальный ключ элемента в коллекции. По умолчанию
	 * равна JW.iid. Если коллекция содержит экземпляры JW.Class, то все тип-топ.
	 * @param {Object} [scope] Контекст вызова getKey. По умолчанию, функция вызывается в контексте коллекции.
	 * @returns {void}
	 */
	/**
	 * @method performFilter
	 * `<T>` Преобразует содержимое массива к newItems комбинацией методов {@link #static-method-detectFilter} и {@link #static-method-splice}.
	 * Только удаляет элементы. Не предусматривает вставку новых элементов. В отличие от
	 * метода {@link #static-method-performSplice}, не требует уникальности элементов массива.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Array} newItems `<T>` Новое содержимое массива.
	 * @returns {void}
	 */
	/**
	 * @method performReorder
	 * `<T>` Преобразует содержимое массива к newItems комбинацией методов {@link #static-method-detectReorder} и {@link #static-method-reorder}.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Array} newItems `<T>` Новое содержимое массива.
	 * @param {Function} [getKey] Функция, возвращающая уникальный ключ элемента в коллекции. По умолчанию
	 * равна JW.iid. Если коллекция содержит экземпляры JW.Class, то все тип-топ.
	 * @param {Object} [scope] Контекст вызова getKey. По умолчанию, функция вызывается в контексте коллекции.
	 * @returns {void}
	 */
	/**
	 * @method sort
	 * `<T>` Сортирует массив по результату запуска функции f на элементах.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Function} [f]
	 *
	 * `f(item: T, index: number): number/string`
	 *
	 * Функция-сортировщик для элемента. По умолчанию возвращает item.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {void}
	 */
	/**
	 * @method sortComparing
	 * `<T>` Сортирует массив по компаратору.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, i1: number, i2: number): Number`
	 *
	 * Функция-компаратор. Возвращает положительное значение, если t1 > t2; отрицательное значение, если t1 < t2;
	 * 0, если t1 == t2. По умолчанию возвращает JW.cmp(t1, t2).
	 *
	 * @param {Object} [scope] Контекст вызова compare. По умолчанию compare вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {void}
	 */
	/**
	 * @method createMapper
	 * `<T, U>` Конструирует конвертер элементов коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractArray.Mapper}
	 * `<T, U>` Синхронизатор.
	 */
	/**
	 * @method createFilterer
	 * `<T>` Конструирует фильтровщик коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractArray.Filterer}
	 * `<T>` Синхронизатор.
	 */
	/**
	 * @method createObserver
	 * `<T>` Конструирует наблюдатель коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractArray.Observer}
	 * `<T>` Синхронизатор.
	 */
	/**
	 * @method createOrderer
	 * `<T>` Конструирует конвертер коллекции в массив (упорядочитель).
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractArray.Orderer}
	 * `<T>` Синхронизатор.
	 */
	/**
	 * @method createSorterComparing
	 * `<T>` Конструирует конвертер коллекции в массив (сортировщик по компаратору).
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractArray.SorterComparing}
	 * `<T>` Синхронизатор.
	 */
	/**
	 * @method createIndexer
	 * `<T>` Конструирует индексатор коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractArray.Indexer}
	 * `<T>` Синхронизатор.
	 */
	/**
	 * @method createLister
	 * `<T>` Конструирует конвертер коллекции в множество.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractArray.Lister}
	 * `<T>` Синхронизатор.
	 */
	/**
	 * @method createInserter
	 * `<T>` Конструирует синхронизатор представления с массивом.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractArray.Inserter}
	 * `<T>` Синхронизатор.
	 */
	/**
	 * @method createMerger
	 * `<T>` Конструирует объединитель массивов.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractArray.Merger}
	 * `<T>` Синхронизатор.
	 */
	/**
	 * @method createReverser
	 * `<T>` Конструирует обратитель массива.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractArray.Reverser}
	 * `<T>` Синхронизатор.
	 */
	/**
	 * @method equal
	 * `<T>` Поэлементно сравнивает два массива.
	 * @static
	 * @param {Array} array1 `<T>` Массив.
	 * @param {Array} array2 `<T>` Другой массив.
	 * @returns {boolean} Массивы поэлементно равны.
	 */
	/**
	 * @method collapse
	 * `<T>` Сплющивает массив массивов массивов... в один массив.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {number} depth Глубина сплющивания.
	 * @returns {Array} Сплющенный массив.
	 */
	/**
	 * @method indexOf
	 * `<T>` Определяет индекс элемента в данной коллекции. Если такого элемента в коллекции нет, вернет -1.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {T} item Элемент.
	 * @returns {number} Индекс элемента.
	 */
	/**
	 * @method backEvery
	 *
	 * `<T>` Проверяет все элементы по критерию в обратном порядке.
	 * 
	 * Возвращает true тогда и только тогда, когда функция f возвращает !== false на всех элементах коллекции.
	 * 
	 * Алгоритм перебирает все элементы с конца в начало, и останавливается после первого элемента, не удовлетворяющего
	 * критерию.
	 *
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @param {Function} f
	 *
	 * `f(item: T, index: number): boolean`
	 *
	 * Критерий проверки элементов.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {boolean} Результат проверки.
	 */
	/**
	 * @method pop
	 * `<T>` Удаляет последний элемент массива. Ничего не делает, если массив пуст.
	 * @static
	 * @param {Array} array `<T>` Массив.
	 * @returns {T} Удаленный элемент или undefined.
	 */
	/**
	 * @method binarySearch
	 * Ищет индекс первого элемента, который больше указанного значения относительно функции compare,
	 * используя бинарный поиск. Массив должен быть отсортирован по функции compare.
	 * @param {T} value Значение.
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T): number`
	 *
	 * Функция-компаратор. Возвращает положительное значение, если t1 > t2; отрицательное значение, если t1 < t2;
	 * 0, если t1 == t2. По умолчанию возвращает JW.cmp(t1, t2).
	 *
	 * @param {Object} [scope]
	 * Контекст вызова compare. По умолчанию, вызывается в контексте массива.
	 * @returns {number} Индекс элемента.
	 */
});

/*
	JW array extension.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

JW.IndexedCollection.createStaticMethods(JW.Array);

JW.apply(JW.Array, {
	getFirstKey: function(target) {
		if (target.length !== 0) {
			return 0;
		}
	},
	
	getLast: function(target) {
		return target[target.length - 1];
	},
	
	getLastKey: function(target) {
		var l = target.length;
		if (l !== 0) {
			return l - 1;
		}
	},
	
	getLength: function(target) {
		return target.length;
	},
	
	isEmpty: function(target) {
		return target.length === 0;
	},
	
	get: function(target, index) {
		return target[index];
	},
	
	getKeys: function(target) {
		var result = new Array(target.length);
		for (var i = 0, l = target.length; i < l; ++i) {
			result[i] = i;
		}
		return result;
	},
	
	every: function(target, callback, scope) {
		// JW.assertArray(target);
		// JW.assertFunction(callback);
		for (var i = 0, l = target.length; i < l; ++i) {
			if (callback.call(scope || target, target[i], i) === false) {
				return false;
			}
		}
		return true;
	},
	
	filter: function(target, callback, scope) {
		var result = [];
		JW.Array.every(target, function(item, index) {
			if (callback.call(this, item, index) !== false) {
				result.push(item);
			}
		}, scope);
		return result;
	},
	
	$filter: JW.AbstractCollection._createStatic$Array(JW.Array, "filter"),
	
	map: function(target, callback, scope) {
		var result = [];
		JW.Array.every(target, function(item, index) {
			result.push(callback.call(this, item, index));
		}, scope);
		return result;
	},
	
	$map: JW.AbstractCollection._createStatic$Array(JW.Array, "map"),
	
	toArray: function(target) {
		return target.concat();
	},
	
	toSet: function(target) {
		return JW.Array.index(target, JW.iid);
	},
	
	asArray: function(target) {
		return target;
	},
	
	add: function(target, item, index) {
		JW.Array.tryAdd(target, item, index);
	},
	
	tryAdd: function(target, item, index) {
		target.splice(JW.def(index, target.length), 0, item);
		return true;
	},
	
	addAll: function(target, items, index) {
		JW.Array.tryAddAll(target, items, index);
	},
	
	tryAddAll: function(target, items, index) {
		if (items.length === 0) {
			return;
		}
		if (index === undefined) {
			target.push.apply(target, items);
		} else {
			target.splice.apply(target, [ index, 0 ].concat(items));
		}
		return true;
	},
	
	trySet: function(target, item, index) {
		// JW.assertArray(target);
		// JW.assertIsSet(item);
		// JW.assertInt(index, 0, target.length);
		var oldItem = target[index];
		if (item !== oldItem) {
			target[index] = item;
			return new JW.Proxy(oldItem);
		}
	},
	
	tryRemove: function(target, index) {
		return target.splice(index, 1)[0];
	},
	
	removeAll: function(target, index, count) {
		var result = JW.Array.tryRemoveAll(target, index, count);
		return result || [];
	},
	
	$removeAll: JW.AbstractCollection._createStatic$Array(JW.Array, "removeAll"),
	
	tryRemoveAll: function(target, index, count) {
		if (count === 0) {
			return;
		}
		return target.splice(index, count);
	},
	
	removeItems: function(target, items) {
		var itemSet = new JW.Set(items);
		var newItems = JW.Array.filter(target, function(item) { return !itemSet.contains(item); });
		JW.Array.performSplice(target, newItems);
	},
	
	move: function(target, fromIndex, toIndex) {
		JW.Array.tryMove(target, fromIndex, toIndex);
		return JW.Array.get(target, toIndex);
	},
	
	tryMove: function(target, fromIndex, toIndex) {
		// JW.assertArray(target);
		// JW.assertInt(fromIndex, 0, target.length);
		// JW.assertInt(toIndex, 0, target.length);
		if (fromIndex === toIndex) {
			return;
		}
		var item = target[fromIndex];
		target.splice(fromIndex, 1);
		target.splice(toIndex, 0, item);
		return item;
	},
	
	clear: function(target) {
		var result = JW.Array.tryClear(target);
		return (result !== undefined) ? result : [];
	},
	
	$clear: JW.AbstractCollection._createStatic$Array(JW.Array, "clear"),
	
	tryClear: function(target) {
		// JW.assertArray(target);
		if (target.length !== 0) {
			return target.splice(0, target.length);
		}
	},
	
	splice: function(target, removeParamsList, addParamsList) {
		var result = JW.Array.trySplice(target, removeParamsList, addParamsList);
		return (result !== undefined) ? result : new JW.AbstractArray.SpliceResult(target.concat(), [], []);
	},
	
	trySplice: function(target, removeParamsList, addParamsList) {
		// JW.assertArray(target);
		// JW.assertArray(removeParamsList, function(params) { return params instanceof JW.AbstractArray.IndexCount; }, this);
		// JW.assertArray(addParamsList, function(params) { return params instanceof JW.AbstractArray.IndexItems; }, this);
		// TODO: assert out of bounds stuff
		var last;
		
		var optimizedRemoveParamsList = [];
		last = null;
		for (var i = 0, l = removeParamsList.length; i < l; ++i) {
			var params = removeParamsList[i];
			if (last && (params.index === last.index + last.count)) {
				last.count += params.count;
			} else {
				last = params.clone();
				optimizedRemoveParamsList.push(last);
			}
		}
		
		var optimizedAddParamsList = [];
		last = null;
		for (var i = 0, l = addParamsList.length; i < l; ++i) {
			var params = addParamsList[i];
			if (last && (params.index === last.index + last.items.length)) {
				JW.Array.tryAddAll(last.items, params.items);
			} else {
				last = params.clone();
				optimizedAddParamsList.push(last);
			}
		}
		
		var oldItems = target.concat();
		var removedItemsList = [];
		for (var i = optimizedRemoveParamsList.length - 1; i >= 0; --i) {
			var params = optimizedRemoveParamsList[i];
			var index = params.index;
			var items = JW.Array.tryRemoveAll(target, index, params.count);
			if (items === undefined) {
				continue;
			}
			removedItemsList.push(new JW.AbstractArray.IndexItems(index, items));
		}
		var addedItemsList = [];
		for (var i = 0, l = optimizedAddParamsList.length; i < l; ++i) {
			var params = optimizedAddParamsList[i];
			if (JW.Array.tryAddAll(target, params.items, params.index) === undefined) {
				continue;
			}
			addedItemsList.push(params);
		}
		if ((removedItemsList.length !== 0) || (addedItemsList.length !== 0)) {
			removedItemsList.reverse();
			return new JW.AbstractArray.SpliceResult(oldItems, removedItemsList, addedItemsList);
		}
	},
	
	reorder: function(target, indexList) {
		JW.Array.tryReorder(target, indexList);
	},
	
	tryReorder: function(target, indexArray) {
		// JW.assertArray(target);
		// JW.assertArray(indexArray);
		// JW.assert(target.length === indexArray.length, '"target" and "indexArray" must have equal length');
		// var indexArraySorted = indexArray.concat();
		// indexArraySorted.sort();
		// JW.assert(JW.Array.isIdentity(indexArraySorted), '"indexArray" must contain all indexes from 0 to target.length - 1');
		var length = target.length;
		if (JW.Array.isIdentity(indexArray)) {
			return;
		}
		var oldItems = target.concat();
		for (var i = 0; i < length; ++i) {
			target[indexArray[i]] = oldItems[i];
		}
		return oldItems;
	},
	
	detectSplice: function(oldItems, newItems, getKey, scope) {
		getKey = getKey || JW.iid;
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
			} else {
				flush();
				testRemove(oldIndex);
				nextOldIndex = oldIndex + 1;
			}
		}
		flush();
		testRemove(oldItems.length);
		if ((removeParamsList.length !== 0) || (addParamsList.length !== 0)) {
			return new JW.AbstractArray.SpliceParams(removeParamsList, addParamsList);
		}
	},
	
	detectFilter: function(oldItems, newItems) {
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
	},
	
	detectReorder: function(oldItems, newItems, getKey, scope) {
		getKey = getKey || JW.iid;
		scope = scope || oldItems;
		var indexArray = [];
		var newIndexMap = {};
		for (var i = 0, l = newItems.length; i < l; ++i) {
			newIndexMap[getKey.call(scope, newItems[i])] = i;
		}
		for (var i = 0, l = oldItems.length; i < l; ++i) {
			indexArray.push(newIndexMap[getKey.call(scope, oldItems[i])]);
		}
		if (!JW.Array.isIdentity(indexArray)) {
			return indexArray;
		}
	},
	
	detectSort: function(target, callback, scope, order) {
		var keys = JW.Array.getSortingKeys(target, callback, scope, order);
		if (!JW.Array.isIdentity(keys)) {
			return JW.Array.invert(keys);
		}
	},
	
	detectSortComparing: function(target, compare, scope, order) {
		var keys = JW.Array.getSortingKeysComparing(target, compare, scope, order);
		if (!JW.Array.isIdentity(keys)) {
			return JW.Array.invert(keys);
		}
	},
	
	performSplice: function(target, newItems, getKey, scope) {
		var params = JW.Array.detectSplice(target, newItems, getKey, scope);
		if (params !== undefined) {
			JW.Array.trySplice(target, params.removeParamsList, params.addParamsList);
		}
	},
	
	performFilter: function(target, newItems) {
		var params = JW.Array.detectFilter(target, newItems);
		if (params !== undefined) {
			JW.Array.trySplice(target, params, []);
		}
	},
	
	performReorder: function(target, newItems, getKey, scope) {
		var indexArray = JW.Array.detectReorder(target, newItems, getKey, scope);
		if (indexArray !== undefined) {
			JW.Array.tryReorder(target, indexArray);
		}
	},
	
	sort: function(target, callback, scope, order) {
		var indexArray = JW.Array.detectSort(target, callback, scope, order);
		if (indexArray !== undefined) {
			JW.Array.tryReorder(target, indexArray);
		}
	},
	
	sortComparing: function(target, compare, scope, order) {
		var indexArray = JW.Array.detectSortComparing(target, compare, scope, order);
		if (indexArray !== undefined) {
			JW.Array.tryReorder(target, indexArray);
		}
	},
	
	createMapper: function(source, config) {
		return new JW.AbstractArray.Mapper(new JW.Array(source, true), config);
	},
	
	createFilterer: function(source, config) {
		return new JW.AbstractArray.Filterer(new JW.Array(source, true), config);
	},
	
	createObserver: function(source, config) {
		return new JW.AbstractArray.Observer(new JW.Array(source, true), config);
	},
	
	createOrderer: function(source, config) {
		return new JW.AbstractArray.Orderer(new JW.Array(source, true), config);
	},
	
	createSorterComparing: function(source, config) {
		return new JW.AbstractArray.SorterComparing(new JW.Array(source, true), config);
	},
	
	createIndexer: function(source, config) {
		return new JW.AbstractArray.Indexer(new JW.Array(source, true), config);
	},
	
	createLister: function(source, config) {
		return new JW.AbstractArray.Lister(new JW.Array(source, true), config);
	},
	
	createInserter: function(source, config) {
		return new JW.AbstractArray.Inserter(new JW.Array(source, true), config);
	},
	
	createMerger: function(source, config) {
		return new JW.AbstractArray.Merger(new JW.Array(source, true), config);
	},
	
	createReverser: function(source, config) {
		return new JW.AbstractArray.Reverser(new JW.Array(source, true), config);
	},
	
	createSplitter: function(source, config) {
		return new JW.AbstractArray.Splitter(new JW.Array(source, true), config);
	},
	
	equal: function(target, arr) {
		if (target === arr) {
			return true;
		}
		if (target.length !== arr.length) {
			return false;
		}
		for (var i = 0, l = target.length; i < l; ++i) {
			if (target[i] !== arr[i]) {
				return false;
			}
		}
		return true;
	},
	
	collapse: function(target, depth) {
		var result = [];
		for (var i = 0, l = target.length; i < l; ++i) {
			if (!JW.isArray(target[i])) {
				result.push(target[i]);
				continue;
			}
			if (!JW.isSet(depth)) {
				JW.Array.tryAddAll(result, JW.Array.collapse(target[i]));
				continue;
			}
			if (depth) {
				JW.Array.tryAddAll(result, JW.Array.collapse(target[i], depth - 1));
				continue;
			}
			result.push(target[i]);
		}
		return result;
	},
	
	indexOf: Array.prototype.indexOf ? function(target, item) {
		return target.indexOf(item);
	} : function(target, item) {
		var key = JW.Array.keyOf(target, item);
		return (key !== undefined) ? key : -1;
	},
	
	backEvery: function(target, callback, scope) {
		for (var i = target.length - 1; i >= 0; --i) {
			if (callback.call(scope || target, target[i], i) === false) {
				return false;
			}
		}
		return true;
	},
	
	cmp: function(x, y, caseInsensitive) {
		var n = Math.min(x.length, y.length);
		for (var i = 0; i < n; ++i) {
			var result = JW.cmp(x[i], y[i], caseInsensitive);
			if (result) {
				return result;
			}
		}
		return JW.cmp(x.length, y.length);
	},
	
	shuffle: function(n) {
		var result = new Array(n);
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
	},
	
	isIdentity: function(array) {
		for (var i = 0, l = array.length; i < l; ++i) {
			if (array[i] !== i) {
				return false;
			}
		}
		return true;
	},
	
	invert: function(array) {
		var l = array.length;
		var result = new Array(l);
		for (var i = 0; i < l; ++i) {
			result[array[i]] = i;
		}
		return result;
	},
	
	merge: function(arrays) {
		var result = [];
		for (var i = 0, l = arrays.length; i < l; ++i) {
			result.push.apply(result, arrays[i]);
		}
		return result;
	},
	
	// deprecated
	top: function(target) {
		return JW.Array.getLast(target);
	},
	
	pop: function(target) {
		return target.pop();
	},
	
	binarySearch: function(target, value, compare, scope) {
		compare = compare || function(x, y) { return (x < y) ? -1 : (x > y) ? 1 : 0 };
		scope = scope || target;
		var length = target.length;
		var len2 = length >> 1;
		var step = 1;
		while (step <= len2) {
			step <<= 1;
		}
		var index = 0;
		while (step) {
			if ((index + step <= length) && (compare.call(scope, value, target[index + step - 1]) >= 0)) {
				index += step;
			}
			step >>= 1;
		}
		return index;
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T> extends JW.AbstractMap<T>`
 *
 * Простой словарь. Структурированный список методов смотрите в JW.AbstractMap.
 * Статические методы повторяют интерфейс JW.AbstractMap, только принимают нативный Object в качестве
 * первого аргумента.
 *
 * @extends JW.AbstractMap
 *
 * @constructor
 * @param {Object} [items] Изначальное содержимое словаря. По умолчанию, создается пустой словарь.
 * @param {boolean} [adapter] Создать словарь как адаптер над items. По умолчанию, равен false, т.е. создается
 * копия словаря items.
 */
JW.Map = function(json, adapter) {
	JW.Map._super.call(this, json, adapter);
};

JW.extend(JW.Map, JW.AbstractMap, {
	/**
	 * `<U>` Конструирует пустую коллекцию того же типа.
	 * @returns {JW.Map} `<U>` Коллекция.
	 */
	createEmpty: function() {
		return new JW.Map();
	},
	
	/**
	 * `<U>` Конструирует пустой массив того же типа (простой или оповещающий).
	 * @returns {JW.Array} `<U>` Массив.
	 */
	createEmptyArray: function() {
		return new JW.Array();
	},
	
	/**
	 * `<U>` Конструирует пустой словарь того же типа (простой или оповещающий).
	 * @returns {JW.Map} `<U>` Словарь.
	 */
	createEmptyMap: function() {
		return new JW.Map();
	},
	
	/**
	 * `<U>` Конструирует пустое множество того же типа (простое или оповещающее).
	 * @returns {JW.Set} `<U>` Множество.
	 */
	createEmptySet: function() {
		return new JW.Set();
	}
	
	/**
	 * @method getLength
	 * `<T>` Возвращает количество элементов в коллекции.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @returns {number} Количество элементов в коллекции.
	 */
	/**
	 * @method isEmpty
	 * `<T>` Проверяет коллекцию на пустоту.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @returns {boolean} Коллекция не содержит ни одного элемента.
	 */
	/**
	 * @method getFirst
	 * `<T>` Возвращает первый элемент коллекции. Если коллекция пуста, вернет undefined.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @returns {T} Элемент.
	 */
	/**
	 * @method getFirstKey
	 * `<T>` Возвращает ключ первого элемента коллекции. Если коллекция пуста, вернет undefined.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @returns {string} Ключ.
	 */
	/**
	 * @method get
	 * `<T>` Возвращает элемент по ключу. В случае, если элемента с таким ключом нет, вернет undefined.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {string} key Ключ.
	 * @returns {T} Элемент.
	 */
	/**
	 * @method getKeys
	 * `<T>` Возвращает массив ключей всех элементов коллекции.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @returns {Array} `<string>` Массив ключей.
	 */
	/**
	 * @method $getKeys
	 * `<T>` Возвращает массив ключей всех элементов коллекции.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @returns {JW.Array} `<string>` Массив ключей.
	 */
	/**
	 * @method containsKey
	 * `<T>` Проверяет наличие элемента с заданным ключом в коллекции.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {string} key Ключ.
	 * @returns {boolean} Коллекция содержит элемент с указанным ключом.
	 */
	/**
	 * @method containsItem
	 * `<T>` Проверяет наличие элемента в коллекции.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {T} item Элемент.
	 * @returns {boolean} Коллекция содержит указанный элемент.
	 */
	/**
	 * @method keyOf
	 * `<T>` Определяет ключ элемента в данной коллекции. Если такого элемента в коллекции нет, вернет undefined.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {T} item Элемент.
	 * @returns {string} Ключ элемента.
	 */
	/**
	 * @method removeItem
	 * `<T>` Удаляет первое вхождение указанного элемента из коллекции.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {T} item Элемент.
	 * @returns {void}
	 */
	/**
	 * @method removeItems
	 * `<T extends JW.Class>` Удаляет все вхождения указанных элементов из коллекции.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Array} items `<T>` Элементы.
	 * @returns {void}
	 */
	/**
	 * @method tryClear
	 * `<T>` Очищает коллекцию.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @returns {Object} Бывшее содержимое коллекции. Если нет изменений - undefined.
	 */
	/**
	 * @method clear
	 * `<T>` Очищает коллекцию.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @returns {Object} Бывшее содержимое коллекции.
	 */
	/**
	 * @method $clear
	 * `<T>` Очищает коллекцию.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @returns {JW.Map} `<T>` Бывшее содержимое коллекции.
	 */
	/**
	 * @method every
	 *
	 * `<T>` Проверяет все элементы по критерию.
	 * 
	 * Возвращает true тогда и только тогда, когда функция f возвращает !== false на всех элементах коллекции.
	 * 
	 * Алгоритм последовательно перебирает все элементы, и останавливается после первого элемента, не удовлетворяющего
	 * критерию.
	 *
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): boolean`
	 *
	 * Критерий проверки элементов.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {boolean} Результат проверки.
	 */
	/**
	 * @method some
	 *
	 * `<T>` Проверяет каждый элемент по критерию.
	 * 
	 * Возвращает true тогда и только тогда, когда функция f возвращает !== false хотя бы на одном элементе коллекции.
	 * 
	 * Алгоритм последовательно перебирает все элементы, и останавливается после первого элемента, удовлетворяющего
	 * критерию.
	 *
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): boolean`
	 *
	 * Критерий проверки элементов.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {boolean} Результат проверки.
	 */
	/**
	 * @method each
	 *
	 * `<T>` Перебирает элементы коллекции. Запускает указанную функцию на всех элементах.
	 *
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): void`
	 *
	 * Функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {void}
	 */
	/**
	 * @method find
	 *
	 * `<T>` Ищет элемент по критерию.
	 * 
	 * Возвращает ключ первого элемента, функция f на котором возвращает !== false.
	 * 
	 * Алгоритм последовательно перебирает все элементы, и останавливается после первого элемента, удовлетворяющего
	 * критерию.
	 *
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): boolean`
	 *
	 * Критерий проверки элементов.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {string} Ключ найденного элемента или undefined.
	 */
	/**
	 * @method search
	 *
	 * `<T>` Ищет элемент по критерию.
	 * 
	 * Возвращает первый элемент, функция f на котором возвращает !== false.
	 * 
	 * Алгоритм последовательно перебирает все элементы, и останавливается после первого элемента, удовлетворяющего
	 * критерию.
	 *
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): boolean`
	 *
	 * Критерий проверки элементов.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {T} Найденный элемент или undefined.
	 */
	/**
	 * @method toSorted
	 *
	 * `<T>` Преобразует коллекцию в отсортированный массив.
	 *
	 * Строит массив из элементов коллекции, отсортированный по результату запуска функции f на каждом элементе.
	 *
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Function} [f]
	 *
	 * `f(item: T, key: string): number/string`
	 *
	 * Функция-сортировщик для элемента. По умолчанию возвращает item.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {Array} `<T>` Отсортированный массив.
	 */
	/**
	 * @method $toSorted
	 *
	 * `<T>` Преобразует коллекцию в отсортированный массив.
	 *
	 * Строит массив из элементов коллекции, отсортированный по результату запуска функции f на каждом элементе.
	 *
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Function} [f]
	 *
	 * `f(item: T, key: string): number/string`
	 *
	 * Функция-сортировщик для элемента. По умолчанию возвращает item.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {JW.Array} `<T>` Отсортированный массив.
	 */
	/**
	 * @method toSortedComparing
	 *
	 * `<T>` Преобразует коллекцию в отсортированный массив.
	 *
	 * Строит массив из элементов коллекции, отсортированный по компаратору.
	 *
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, k1: string, k2: string): Number`
	 *
	 * Функция-компаратор. Возвращает положительное значение, если t1 > t2; отрицательное значение, если t1 < t2;
	 * 0, если t1 == t2. По умолчанию возвращает JW.cmp(t1, t2).
	 *
	 * @param {Object} [scope] Контекст вызова compare. По умолчанию compare вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {Array} `<T>` Отсортированный массив.
	 */
	/**
	 * @method $toSortedComparing
	 *
	 * `<T>` Преобразует коллекцию в отсортированный массив.
	 *
	 * Строит массив из элементов коллекции, отсортированный по компаратору.
	 *
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, k1: string, k2: string): Number`
	 *
	 * Функция-компаратор. Возвращает положительное значение, если t1 > t2; отрицательное значение, если t1 < t2;
	 * 0, если t1 == t2. По умолчанию возвращает JW.cmp(t1, t2).
	 *
	 * @param {Object} [scope] Контекст вызова compare. По умолчанию compare вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {JW.Array} `<T>` Отсортированный массив.
	 */
	/**
	 * @method getSortingKeys
	 *
	 * `<T>` Возвращает массив ключей отсортированных элементов.
	 *
	 * Строит массив из ключей элементов коллекции, отсортированный по результату запуска функции f на каждом элементе.
	 *
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Function} [f]
	 *
	 * `f(item: T, key: string): number/string`
	 *
	 * Функция-сортировщик для элемента. По умолчанию возвращает item.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {Array} `<string>` Массив ключей отсортированных элементов.
	 */
	/**
	 * @method $getSortingKeys
	 *
	 * `<T>` Возвращает массив ключей отсортированных элементов.
	 *
	 * Строит массив из ключей элементов коллекции, отсортированный по результату запуска функции f на каждом элементе.
	 *
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Function} [f]
	 *
	 * `f(item: T, key: string): number/string`
	 *
	 * Функция-сортировщик для элемента. По умолчанию возвращает item.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {JW.Array} `<string>` Массив ключей отсортированных элементов.
	 */
	/**
	 * @method getSortingKeysComparing
	 *
	 * `<T>` Возвращает массив ключей отсортированных элементов.
	 *
	 * Строит массив из ключей элементов коллекции, отсортированный по компаратору.
	 *
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, k1: string, k2: string): Number`
	 *
	 * Функция-компаратор. Возвращает положительное значение, если t1 > t2; отрицательное значение, если t1 < t2;
	 * 0, если t1 == t2. По умолчанию возвращает JW.cmp(t1, t2).
	 *
	 * @param {Object} [scope] Контекст вызова compare. По умолчанию compare вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {Array} `<string>` Массив ключей отсортированных элементов.
	 */
	/**
	 * @method $getSortingKeysComparing
	 *
	 * `<T>` Возвращает массив ключей отсортированных элементов.
	 *
	 * Строит массив из ключей элементов коллекции, отсортированный по компаратору.
	 *
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T, k1: string, k2: string): Number`
	 *
	 * Функция-компаратор. Возвращает положительное значение, если t1 > t2; отрицательное значение, если t1 < t2;
	 * 0, если t1 == t2. По умолчанию возвращает JW.cmp(t1, t2).
	 *
	 * @param {Object} [scope] Контекст вызова compare. По умолчанию compare вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {JW.Array} `<string>` Массив ключей отсортированных элементов.
	 */
	/**
	 * @method index
	 *
	 * `<T>` Индексирует коллекцию.
	 *
	 * Строит словарь, в ключах которого находятся результаты запуска функции f на всех элементах,
	 * а в значениях - соответствующие элементы.
	 *
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): string`
	 *
	 * Функция-индексатор для элемента.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {Object} Индекс коллекции.
	 */
	/**
	 * @method $index
	 *
	 * `<T>` Индексирует коллекцию.
	 *
	 * Строит словарь, в ключах которого находятся результаты запуска функции f на всех элементах,
	 * а в значениях - соответствующие элементы.
	 *
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): string`
	 *
	 * Функция-индексатор для элемента.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {JW.Map} `<T>` Индекс коллекции.
	 */
	/**
	 * @method toArray
	 *
	 * `<T>` Преобразует коллекцию в массив.
	 *
	 * Строит новый массив, включающий все элементы коллекции.
	 *
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @returns {Array} `<T>` Массив элементов.
	 */
	/**
	 * @method $toArray
	 *
	 * `<T>` Преобразует коллекцию в массив.
	 *
	 * Строит новый массив, включающий все элементы коллекции.
	 *
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @returns {JW.Array} `<T>` Массив элементов.
	 */
	/**
	 * @method toMap
	 *
	 * `<T>` Преобразует коллекцию в словарь.
	 *
	 * Строит новый словарь, включающий все элементы коллекции с их ключами в данной коллекции.
	 *
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @returns {Object} Словарь элементов.
	 */
	/**
	 * @method $toMap
	 *
	 * `<T>` Преобразует коллекцию в словарь.
	 *
	 * Строит новый словарь, включающий все элементы коллекции с их ключами в данной коллекции.
	 *
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @returns {JW.Map} `<T>` Словарь элементов.
	 */
	/**
	 * @method toSet
	 *
	 * `<T>` Преобразует коллекцию в множество.
	 *
	 * Строит новое множество, включающее все элементы коллекции.
	 *
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @returns {Object} Множество элементов.
	 */
	/**
	 * @method $toSet
	 *
	 * `<T>` Преобразует коллекцию в множество.
	 *
	 * Строит новое множество, включающее все элементы коллекции.
	 *
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @returns {JW.Set} `<T>` Множество элементов.
	 */
	/**
	 * @method asArray
	 *
	 * `<T>` Представляет коллекцию в виде массива.
	 *
	 * Если данная коллекция - массив, сразу возвращает его. В противном случае запускает метод {@link #static-method-toArray}.
	 * Данная функция работает как правило быстрее {@link #static-method-toArray}, но сначала убедитесь, что возвращенный массив
	 * никто не меняет, иначе могут возникнуть странные непредвиденные баги.
	 *
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @returns {Array} `<T>` Массив элементов.
	 */
	/**
	 * @method $asArray
	 *
	 * `<T>` Представляет коллекцию в виде массива.
	 *
	 * Если данная коллекция - массив, сразу возвращает его. В противном случае запускает метод {@link #static-method-toArray}.
	 * Данная функция работает как правило быстрее {@link #static-method-toArray}, но сначала убедитесь, что возвращенный массив
	 * никто не меняет, иначе могут возникнуть странные непредвиденные баги.
	 *
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @returns {JW.Array} `<T>` Массив элементов.
	 */
	/**
	 * @method asMap
	 *
	 * `<T>` Представляет коллекцию в виде словаря.
	 *
	 * Если данная коллекция - словарь, сразу возвращает его. В противном случае запускает метод {@link #static-method-toMap}.
	 * Данная функция работает как правило быстрее {@link #static-method-toMap}, но сначала убедитесь, что возвращенный массив
	 * никто не меняет, иначе могут возникнуть странные непредвиденные баги.
	 *
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @returns {Object} Словарь элементов.
	 */
	/**
	 * @method $asMap
	 *
	 * `<T>` Представляет коллекцию в виде словаря.
	 *
	 * Если данная коллекция - словарь, сразу возвращает его. В противном случае запускает метод {@link #static-method-toMap}.
	 * Данная функция работает как правило быстрее {@link #static-method-toMap}, но сначала убедитесь, что возвращенный массив
	 * никто не меняет, иначе могут возникнуть странные непредвиденные баги.
	 *
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @returns {JW.Map} `<T>` Словарь элементов.
	 */
	/**
	 * @method asSet
	 *
	 * `<T>` Представляет коллекцию в виде множества.
	 *
	 * Если данная коллекция - множество, сразу возвращает его. В противном случае запускает метод {@link #static-method-toSet}.
	 * Данная функция работает как правило быстрее {@link #static-method-toSet}, но сначала убедитесь, что возвращенное множество
	 * никто не меняет, иначе могут возникнуть странные непредвиденные баги.
	 *
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @returns {Object} Множество элементов.
	 */
	/**
	 * @method $asSet
	 *
	 * `<T>` Представляет коллекцию в виде множества.
	 *
	 * Если данная коллекция - множество, сразу возвращает его. В противном случае запускает метод {@link #static-method-toSet}.
	 * Данная функция работает как правило быстрее {@link #static-method-toSet}, но сначала убедитесь, что возвращенное множество
	 * никто не меняет, иначе могут возникнуть странные непредвиденные баги.
	 *
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @returns {JW.Set} `<T>` Множество элементов.
	 */
	/**
	 * @method filter
	 *
	 * `<T>` Фильтрует коллекцию по критерию.
	 *
	 * Строит новую коллекцию того же типа, включающую только те элементы, функция f на которых вернула !== false.
	 *
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): boolean`
	 *
	 * Фильтрующая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {Object} Отфильтрованная коллекция.
	 */
	/**
	 * @method $filter
	 *
	 * `<T>` Фильтрует коллекцию по критерию.
	 *
	 * Строит новую коллекцию того же типа, включающую только те элементы, функция f на которых вернула !== false.
	 *
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): boolean`
	 *
	 * Фильтрующая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {JW.Map} `<T>` Отфильтрованная коллекция.
	 */
	/**
	 * @method map
	 *
	 * `<T, U>` Отображает элементы коллекции.
	 * 
	 * Строит новую коллекцию того же типа, состояющую из результатов запуска функции f на каждом элементе коллекции.
	 *
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): U`
	 *
	 * Отображающая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {Object} Отображенная коллекция.
	 */
	/**
	 * @method $map
	 *
	 * `<T, U>` Отображает элементы коллекции.
	 * 
	 * Строит новую коллекцию того же типа, состояющую из результатов запуска функции f на каждом элементе коллекции.
	 *
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Function} f
	 *
	 * `f(item: T, key: string): U`
	 *
	 * Отображающая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {JW.Map} `<U>` Отображенная коллекция.
	 */
	/**
	 * @method set
	 * `<T>` Заменяет элемент по ключу. В случае если элемента с таким ключом нет, он будет добавлен.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {T} item Элемент.
	 * @param {string} key Ключ.
	 * @returns {T} Бывший элемент коллекции.
	 */
	/**
	 * @method trySet
	 * `<T>` Заменяет элемент по ключу. В случае если элемента с таким ключом нет, он будет добавлен.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {T} item Элемент.
	 * @param {string} key Ключ.
	 * @returns {JW.Proxy} `<T>` Обертка над бывшим элементом коллекции. Если нет изменений - undefined.
	 */
	/**
	 * @method setAll
	 * `<T>` Заменяет/добавляет набор элементов в словаре.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Object} items Элементы.
	 * @returns {JW.AbstractMap.SpliceResult} `<T>` Результат метода {@link #static-method-splice}.
	 */
	/**
	 * @method trySetAll
	 * `<T>` Заменяет/добавляет набор элементов в словаре.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Object} items Элементы.
	 * @returns {JW.AbstractMap.SpliceResult} `<T>` Результат метода {@link #static-method-splice}. Если нет изменений - undefined.
	 */
	/**
	 * @method setKey
	 * `<T>` Меняет ключ элемента в словаре. Если элемента с таким ключом нет, метод сломается.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {string} oldKey Старый ключ элемента.
	 * @param {string} newKey Новый ключ элемента.
	 * @returns {T} Элемент.
	 */
	/**
	 * @method trySetKey
	 * `<T>` Меняет ключ элемента в словаре.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {string} oldKey Старый ключ элемента.
	 * @param {string} newKey Новый ключ элемента.
	 * @returns {T} Элемент. Если нет изменений - undefined.
	 */
	/**
	 * @method remove
	 * `<T>` Удаляет элемент по ключу, если он существует в коллекции.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {K} key Ключ.
	 * @returns {T} Бывший элемент коллекции или undefined.
	 */
	/**
	 * @method tryRemove
	 * `<T>` Удаляет элемент по ключу, если он существует в коллекции.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {K} key Ключ.
	 * @returns {T} Бывший элемент коллекции. Если нет изменений - undefined.
	 */
	/**
	 * @method removeAll
	 * `<T>` Удаляет набор элементов из словаря.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Array} keys `<string>` Ключи элементов.
	 * @returns {Object} Удаленные элементы.
	 */
	/**
	 * @method $removeAll
	 * `<T>` Удаляет набор элементов из словаря.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Array} keys `<string>` Ключи элементов.
	 * @returns {JW.Map} `<T>` Удаленные элементы.
	 */
	/**
	 * @method tryRemoveAll
	 * `<T>` Удаляет набор элементов из словаря.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Array} keys `<string>` Ключи элементов.
	 * @returns {Object} Удаленные элементы. Если нет изменений - undefined.
	 */
	/**
	 * @method splice
	 * `<T>` Добавляет и удаляет элементы коллекции. Универсальная оптимизированная атомарная операция удаления/вставки.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Array} removedKeys `<string>` Ключи элементов для удаления.
	 * @param {Object} updatedItems Элементы для добавления/замены.
	 * @returns {JW.AbstractMap.SpliceResult} `<T>` Результат.
	 */
	/**
	 * @method trySplice
	 * `<T>` Добавляет и удаляет элементы коллекции. Универсальная оптимизированная атомарная операция удаления/вставки.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Array} removedKeys `<string>` Ключи элементов для удаления.
	 * @param {Object} updatedItems Элементы для добавления/замены.
	 * @returns {JW.AbstractMap.SpliceResult} `<T>` Результат. Если нет изменений - undefined.
	 */
	/**
	 * @method reindex
	 * `<T>` Меняет ключи элементов словаря.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Object} keyMap `<string>` Словарь ключей. Элемент с ключем k будет перемещен в ключ keyMap[k].
	 * Обязательно указывать только изменившиеся ключи.
	 * @returns {Object} Словарь изменившихся ключей.
	 */
	/**
	 * @method tryReindex
	 * `<T>` Меняет ключи элементов словаря.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Object} keyMap `<string>` Словарь ключей. Элемент с ключем k будет перемещен в ключ keyMap[k].
	 * Обязательно указывать только изменившиеся ключи.
	 * @returns {Object} Словарь изменившихся ключей. Если нет изменений - undefined.
	 */
	/**
	 * @method detectSplice
	 * `<T>` Определяет параметры метода {@link #static-method-splice}, с которыми содержимое словаря станет равно newItems.
	 * Т.е. определяет, какие элементы нужно удалить, какие добавить, и с каким ключом.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Object} newItems Новое содержимое словаря.
	 * @returns {JW.AbstractMap.SpliceParams}
	 * `<T>` Параметры метода {@link #static-method-splice}.
	 * Если вызова метода не требуется - undefined.
	 */
	/**
	 * @method detectReindex
	 * `<T>` Определяет параметр метода {@link #static-method-reindex}, с которым содержимое словаря станет равно newItems.
	 * Т.е. определяет, какие элементы куда нужно переместить.
	 * Если содержимое newItems отличается от содержимого словаря, словарь сломается.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Object} newItems Новое содержимое словаря.
	 * @param {Function} [getKey] Функция, возвращающая уникальный ключ элемента в коллекции. По умолчанию
	 * равна JW.iid. Если коллекция содержит экземпляры JW.Class, то все тип-топ.
	 * @param {Object} [scope] Контекст вызова getKey. По умолчанию, функция вызывается в контексте коллекции.
	 * @returns {Object}
	 * Параметр keyMap метода {@link #static-method-reindex}.
	 * Если вызова метода не требуется - undefined.
	 */
	/**
	 * @method performSplice
	 * `<T>` Преобразует содержимое словаря к newItems комбинацией методов {@link #static-method-detectSplice} и {@link #static-method-splice}.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Object} newItems Новое содержимое словаря.
	 * @returns {void}
	 */
	/**
	 * @method performReindex
	 * `<T>` Преобразует содержимое словаря к newItems комбинацией методов {@link #static-method-detectReindex} и {@link #static-method-reindex}.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Object} newItems Новое содержимое словаря.
	 * @param {Function} [getKey] Функция, возвращающая уникальный ключ элемента в коллекции. По умолчанию
	 * равна JW.iid. Если коллекция содержит экземпляры JW.Class, то все тип-топ.
	 * @param {Object} [scope] Контекст вызова getKey. По умолчанию, функция вызывается в контексте коллекции.
	 * @returns {void}
	 */
	/**
	 * @method createMapper
	 * `<T, U>` Конструирует конвертер элементов коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractMap.Mapper}
	 * `<T, U>` Синхронизатор.
	 */
	/**
	 * @method createFilterer
	 * `<T>` Конструирует фильтровщик коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractMap.Filterer}
	 * `<T>` Синхронизатор.
	 */
	/**
	 * @method createObserver
	 * `<T>` Конструирует наблюдатель коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractMap.Observer}
	 * `<T>` Синхронизатор.
	 */
	/**
	 * @method createOrderer
	 * `<T>` Конструирует конвертер коллекции в массив (упорядочитель).
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractMap.Orderer}
	 * `<T>` Синхронизатор.
	 */
	/**
	 * @method createSorterComparing
	 * `<T>` Конструирует конвертер коллекции в массив (сортировщик по компаратору).
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractMap.SorterComparing}
	 * `<T>` Синхронизатор.
	 */
	/**
	 * @method createIndexer
	 * `<T>` Конструирует индексатор коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractMap.Indexer}
	 * `<T>` Синхронизатор.
	 */
	/**
	 * @method createLister
	 * `<T>` Конструирует конвертер коллекции в множество.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractMap.Lister}
	 * `<T>` Синхронизатор.
	 */
	/**
	 * @method createInserter
	 * `<T>` Конструирует синхронизатор представления с массивом.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @static
	 * @param {Object} map `<T>` Словарь.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractMap.Inserter}
	 * `<T>` Синхронизатор.
	 */
	/**
	 * @method equal
	 * `<T>` Поэлементно сравнивает два словаря.
	 * @static
	 * @param {Object} map1 `<T>` Словарь.
	 * @param {Object} map2 `<T>` Другой словарь.
	 * @returns {boolean} Словари поэлементно равны.
	 */
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

JW.IndexedCollection.createStaticMethods(JW.Map);

JW.apply(JW.Map, {
	getLength: function(target) {
		var length = 0;
		for (var key in target) {
			++length;
		}
		return length;
	},
	
	isEmpty: function(target) {
		for (var key in target) {
			return false;
		}
		return true;
	},
	
	getFirstKey: function(target) {
		for (var key in target) {
			return key;
		}
		return undefined;
	},
	
	get: function(target, key) {
		return target[key];
	},
	
	getKeys: function(target) {
		var keys = [];
		for (var key in target) {
			keys.push(key);
		}
		return keys;
	},
	
	every: function(target, callback, scope) {
		scope = scope || target;
		for (var key in target) {
			if (callback.call(scope, target[key], key) === false) {
				return false;
			}
		}
		return true;
	},
	
	filter: function(target, callback, scope) {
		var result = {};
		JW.Map.every(target, function(item, key) {
			if (callback.call(this, item, key) !== false) {
				result[key] = item;
			}
		}, scope);
		return result;
	},
	
	$filter: JW.AbstractCollection._createStatic$Map(JW.Map, "filter"),
	
	map: function(target, callback, scope) {
		var result = {};
		JW.Map.every(target, function(item, key) {
			result[key] = callback.call(this, item, key);
		}, scope);
		return result;
	},
	
	$map: JW.AbstractCollection._createStatic$Map(JW.Map, "map"),
	
	asMap: function(target) {
		return target;
	},
	
	trySet: function(target, item, key) {
		var oldItem = target[key];
		if (oldItem === item) {
			return;
		}
		target[key] = item;
		return new JW.Proxy(oldItem);
	},
	
	setAll: function(target, items) {
		var spliceResult = JW.Map.trySetAll(target, items);
		return (spliceResult !== undefined) ? spliceResult : new JW.AbstractMap.SpliceResult({}, {});
	},
	
	trySetAll: function(target, map) {
		// JW.assertMap(target);
		// JW.assertMap(map, JW.assertDefined);
		var removedItems = {};
		var addedItems = {};
		for (var key in map) {
			var item = map[key];
			var oldItem = JW.Map.trySet(target, item, key);
			if (oldItem === undefined) {
				continue;
			}
			var removedItem = oldItem.value;
			if (removedItem !== undefined) {
				removedItems[key] = removedItem;
			}
			addedItems[key] = item;
		}
		if (!JW.Map.isEmpty(removedItems) || !JW.Map.isEmpty(addedItems)) {
			return new JW.AbstractMap.SpliceResult(removedItems, addedItems);
		}
	},
	
	setKey: function(target, oldKey, newKey) {
		var item = JW.Map.trySetKey(target, oldKey, newKey);
		return (item !== undefined) ? item : target[newKey];
	},
	
	trySetKey: function(target, oldKey, newKey) {
		// JW.assertMap(target);
		// JW.assertString(oldKey);
		// JW.assertString(newKey);
		// JW.assertDefined(target[oldKey]);
		// JW.assertUndefined(target[newKey]);
		if (oldKey === newKey) {
			return;
		}
		var item = target[oldKey];
		delete target[oldKey];
		target[newKey] = item;
		return item;
	},
	
	tryRemove: function(target, key) {
		// JW.assertMap(target);
		// JW.assertString(key);
		var item = target[key];
		if (item !== undefined) {
			delete target[key];
		}
		return item;
	},
	
	removeAll: function(target, keys) {
		var items = JW.Map.tryRemoveAll(target, keys);
		return (items !== undefined) ? items : {};
	},
	
	$removeAll: JW.AbstractCollection._createStatic$Map(JW.Map, "removeAll"),
	
	tryRemoveAll: function(target, keys) {
		// JW.assertMap(target);
		var items = {};
		for (var i = 0, l = keys.length; i < l; ++i) {
			var key = keys[i];
			var item = JW.Map.tryRemove(target, key);
			if (item !== undefined) {
				items[key] = item;
			}
		}
		if (!JW.Map.isEmpty(items)) {
			return items;
		}
	},
	
	removeItems: function(target, items) {
		var itemSet = new JW.Set(items);
		var newItems = JW.Map.filter(target, function(item) {
			return !itemSet.contains(item);
		});
		JW.Map.performSplice(target, newItems);
	},
	
	clear: function(target) {
		var result = JW.Map.tryClear(target);
		return (result !== undefined) ? result : {};
	},
	
	$clear: JW.AbstractCollection._createStatic$Map(JW.Map, "clear"),
	
	tryClear: function(target) {
		// JW.assertMap(target);
		if (JW.Map.isEmpty(target)) {
			return;
		}
		var items = JW.apply({}, target);
		for (var key in items) {
			delete target[key];
		}
		return items;
	},
	
	splice: function(target, removedKeys, updatedItems) {
		var spliceResult = JW.Map.trySplice(target, removedKeys, updatedItems);
		return (spliceResult !== undefined) ? spliceResult : new JW.AbstractMap.SpliceResult({}, {});
	},
	
	trySplice: function(target, removedKeys, updatedItems) {
		// JW.assertMap(target);
		// JW.assertArray(item, JW.assertString);
		// JW.assertMap(updatedItems, JW.assertDefined);
		removedKeys = JW.Array.filter(removedKeys, function(key) {
			return !updatedItems.hasOwnProperty(key);
		});
		var removedItems = JW.Map.tryRemoveAll(target, removedKeys);
		var spliceResult = JW.Map.trySetAll(target, updatedItems);
		if (spliceResult !== undefined) {
			JW.apply(spliceResult.removedItems, removedItems);
			return spliceResult;
		}
		if (removedItems !== undefined) {
			return new JW.AbstractMap.SpliceResult(removedItems, {});
		}
	},
	
	reindex: function(target, keyMap) {
		var result = JW.Map.tryReindex(target, keyMap);
		return (result !== undefined) ? result : {};
	},
	
	tryReindex: function(target, keyMap) {
		// JW.assertMap(target);
		// JW.assertMap(keyMap, JW.assertString);
		// JW.assertMap(keyMap, function(key) { return target.hasOwnProperty(key); }, this);
		var oldItems = JW.Map.tryClear(target);
		if (oldItems === undefined) {
			return;
		}
		var resultMap = {};
		for (var oldKey in oldItems) {
			var newKey = keyMap[oldKey];
			if ((newKey === undefined) || (newKey === oldKey)) {
				// JW.assertUndefined(target[oldKey]);
				target[oldKey] = oldItems[oldKey];
			} else {
				// JW.assertUndefined(target[newKey]);
				target[newKey] = oldItems[oldKey];
				resultMap[oldKey] = newKey;
			}
		}
		if (!JW.Map.isEmpty(resultMap)) {
			return resultMap;
		}
	},
	
	detectSplice: function(oldItems, newItems) {
		// JW.assertMap(oldItems);
		// JW.assertMap(newItems, JW.assertDefined);
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
		if ((removedKeys.length !== 0) || !JW.Map.isEmpty(updatedItems)) {
			return new JW.AbstractMap.SpliceParams(removedKeys, updatedItems);
		}
	},
	
	detectReindex: function(oldItems, newItems, getKey, scope) {
		// JW.assertMap(oldItems);
		// JW.assertMap(newItems, JW.assertDefined);
		getKey = getKey || JW.iid;
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
		if (!JW.Map.isEmpty(keyMap)) {
			return keyMap;
		}
	},
	
	performSplice: function(target, newItems) {
		var params = JW.Map.detectSplice(target, newItems);
		if (params !== undefined) {
			JW.Map.trySplice(target, params.removedKeys, params.updatedItems);
		}
	},
	
	performReindex: function(target, newItems, getKey, scope) {
		var keyMap = JW.Map.detectReindex(target, newItems, getKey, scope);
		if (keyMap !== undefined) {
			JW.Map.tryReindex(target, keyMap);
		}
	},
	
	createMapper: function(source, config) {
		return new JW.AbstractMap.Mapper(new JW.Map(source, true), config);
	},
	
	createFilterer: function(source, config) {
		return new JW.AbstractMap.Filterer(new JW.Map(source, true), config);
	},
	
	createObserver: function(source, config) {
		return new JW.AbstractMap.Observer(new JW.Map(source, true), config);
	},
	
	createOrderer: function(source, config) {
		return new JW.AbstractMap.Orderer(new JW.Map(source, true), config);
	},
	
	createSorterComparing: function(source, config) {
		return new JW.AbstractMap.SorterComparing(new JW.Map(source, true), config);
	},
	
	createIndexer: function(source, config) {
		return new JW.AbstractMap.Indexer(new JW.Map(source, true), config);
	},
	
	createLister: function(source, config) {
		return new JW.AbstractMap.Lister(new JW.Map(source, true), config);
	},
	
	createInserter: function(source, config) {
		return new JW.AbstractMap.Inserter(new JW.Map(source, true), config);
	},
	
	equal: function(x, y) {
		if (x === y) {
			return true;
		}
		var length = JW.Map.getLength(y);
		for (var key in x) {
			if ((--length < 0) || (x[key] !== y[key])) {
				return false;
			}
		}
		return length === 0;
	},
	
	single: function(key, item) {
		var result = {};
		result[key] = item;
		return result;
	},
	
	getRemovedKeys: function(removedItems, addedItems) {
		var removedKeys = [];
		for (var key in removedItems) {
			if (!addedItems.hasOwnProperty(key)) {
				removedKeys.push(key);
			}
		}
		return removedKeys;
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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
	
	----
	
	This is an adapter of array that triggers events about modifications.
	Events are taken from ActionScript's CollectionEventKind (with small
	reasonable changes).
*/

/**
 * @class
 *
 * `<T> extends JW.AbstractSet<T>`
 *
 * Простое множество. Структурированный список методов смотрите в JW.AbstractSet.
 * Статические методы повторяют интерфейс JW.AbstractSet, только принимают нативный Object в качестве
 * первого аргумента.
 *
 * @extends JW.AbstractSet
 *
 * @constructor
 * @param {Array} [items] `<T>` Изначальное содержимое множества. По умолчанию, создается пустое множество.
 * @param {boolean} [adapter] Создать множество как адаптер над items (тогда это должен быть Object, а не Array).
 * По умолчанию, равен false.
 */
JW.Set = function(json, adapter) {
	JW.Set._super.call(this, json, adapter);
};

JW.extend(JW.Set, JW.AbstractSet, {
	/**
	 * `<U>` Конструирует пустую коллекцию того же типа.
	 * @returns {JW.Set} `<U>` Коллекция.
	 */
	createEmpty: function() {
		return new JW.Set();
	},
	
	/**
	 * `<U>` Конструирует пустой массив того же типа (простой или оповещающий).
	 * @returns {JW.Array} `<U>` Массив.
	 */
	createEmptyArray: function() {
		return new JW.Array();
	},
	
	/**
	 * `<U>` Конструирует пустой словарь того же типа (простой или оповещающий).
	 * @returns {JW.Map} `<U>` Словарь.
	 */
	createEmptyMap: function() {
		return new JW.Map();
	},
	
	/**
	 * `<U>` Конструирует пустое множество того же типа (простое или оповещающее).
	 * @returns {JW.Set} `<U>` Множество.
	 */
	createEmptySet: function() {
		return new JW.Set();
	}
	
	/**
	 * @method getLength
	 * `<T>` Возвращает количество элементов в коллекции.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @returns {number} Количество элементов в коллекции.
	 */
	/**
	 * @method isEmpty
	 * `<T>` Проверяет коллекцию на пустоту.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @returns {boolean} Коллекция не содержит ни одного элемента.
	 */
	/**
	 * @method getFirst
	 * `<T>` Возвращает первый элемент коллекции. Если коллекция пуста, вернет undefined.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @returns {T} Элемент.
	 */
	/**
	 * @method containsItem
	 * `<T>` Проверяет наличие элемента в коллекции.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {T} item Элемент.
	 * @returns {boolean} Коллекция содержит указанный элемент.
	 */
	/**
	 * @method contains
	 * `<T>` Проверяет наличие элемента в коллекции. Сокращение {@link #static-method-containsItem}.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {T} item Элемент.
	 * @returns {boolean} Коллекция содержит указанный элемент.
	 */
	/**
	 * @method removeItem
	 * `<T>` Удаляет первое вхождение указанного элемента из коллекции.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {T} item Элемент.
	 * @returns {void}
	 */
	/**
	 * @method removeItems
	 * `<T extends JW.Class>` Удаляет все вхождения указанных элементов из коллекции.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {Array} items `<T>` Элементы.
	 * @returns {void}
	 */
	/**
	 * @method tryClear
	 * `<T>` Очищает коллекцию.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @returns {Array} `<T>` Бывшее содержимое коллекции. Если нет изменений - undefined.
	 */
	/**
	 * @method clear
	 * `<T>` Очищает коллекцию.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @returns {Array} `<T>` Бывшее содержимое коллекции.
	 */
	/**
	 * @method $clear
	 * `<T>` Очищает коллекцию.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @returns {JW.Array} `<T>` Бывшее содержимое коллекции.
	 */
	/**
	 * @method every
	 *
	 * `<T>` Проверяет все элементы по критерию.
	 * 
	 * Возвращает true тогда и только тогда, когда функция f возвращает !== false на всех элементах коллекции.
	 * 
	 * Алгоритм последовательно перебирает все элементы, и останавливается после первого элемента, не удовлетворяющего
	 * критерию.
	 *
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {Function} f
	 *
	 * `f(item: T): boolean`
	 *
	 * Критерий проверки элементов.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {boolean} Результат проверки.
	 */
	/**
	 * @method some
	 *
	 * `<T>` Проверяет каждый элемент по критерию.
	 * 
	 * Возвращает true тогда и только тогда, когда функция f возвращает !== false хотя бы на одном элементе коллекции.
	 * 
	 * Алгоритм последовательно перебирает все элементы, и останавливается после первого элемента, удовлетворяющего
	 * критерию.
	 *
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {Function} f
	 *
	 * `f(item: T): boolean`
	 *
	 * Критерий проверки элементов.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {boolean} Результат проверки.
	 */
	/**
	 * @method each
	 * `<T>` Перебирает элементы коллекции. Запускает указанную функцию на всех элементах.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {Function} f
	 *
	 * `f(item: T): void`
	 *
	 * Функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {void}
	 */
	/**
	 * @method search
	 *
	 * `<T>` Ищет элемент по критерию.
	 * 
	 * Возвращает первый элемент, функция f на котором возвращает !== false.
	 * 
	 * Алгоритм последовательно перебирает все элементы, и останавливается после первого элемента, удовлетворяющего
	 * критерию.
	 *
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {Function} f
	 *
	 * `f(item: T): boolean`
	 *
	 * Критерий проверки элементов.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {T} Найденный элемент или undefined.
	 */
	/**
	 * @method toSorted
	 *
	 * `<T>` Преобразует коллекцию в отсортированный массив.
	 *
	 * Строит массив из элементов коллекции, отсортированный по результату запуска функции f на каждом элементе.
	 *
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {Function} [f]
	 *
	 * `f(item: T): number/string`
	 *
	 * Функция-сортировщик для элемента. По умолчанию возвращает item.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {Array} `<T>` Отсортированный массив.
	 */
	/**
	 * @method $toSorted
	 *
	 * `<T>` Преобразует коллекцию в отсортированный массив.
	 *
	 * Строит массив из элементов коллекции, отсортированный по результату запуска функции f на каждом элементе.
	 *
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {Function} [f]
	 *
	 * `f(item: T): number/string`
	 *
	 * Функция-сортировщик для элемента. По умолчанию возвращает item.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {JW.Array} `<T>` Отсортированный массив.
	 */
	/**
	 * @method toSortedComparing
	 *
	 * `<T>` Преобразует коллекцию в отсортированный массив.
	 *
	 * Строит массив из элементов коллекции, отсортированный по компаратору.
	 *
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T): Number`
	 *
	 * Функция-компаратор. Возвращает положительное значение, если t1 > t2; отрицательное значение, если t1 < t2;
	 * 0, если t1 == t2. По умолчанию возвращает JW.cmp(t1, t2).
	 *
	 * @param {Object} [scope] Контекст вызова compare. По умолчанию compare вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {Array} `<T>` Отсортированный массив.
	 */
	/**
	 * @method $toSortedComparing
	 *
	 * `<T>` Преобразует коллекцию в отсортированный массив.
	 *
	 * Строит массив из элементов коллекции, отсортированный по компаратору.
	 *
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {Function} [compare]
	 *
	 * `f(t1: T, t2: T): Number`
	 *
	 * Функция-компаратор. Возвращает положительное значение, если t1 > t2; отрицательное значение, если t1 < t2;
	 * 0, если t1 == t2. По умолчанию возвращает JW.cmp(t1, t2).
	 *
	 * @param {Object} [scope] Контекст вызова compare. По умолчанию compare вызывается в контексте коллекции.
	 * @param {1/-1} [order] Порядок сортировки.
	 * @returns {JW.Array} `<T>` Отсортированный массив.
	 */
	/**
	 * @method index
	 *
	 * `<T>` Индексирует коллекцию.
	 *
	 * Строит словарь, в ключах которого находятся результаты запуска функции f на всех элементах,
	 * а в значениях - соответствующие элементы.
	 *
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {Function} f
	 *
	 * `f(item: T): string`
	 *
	 * Функция-индексатор для элемента.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {Object} Индекс коллекции.
	 */
	/**
	 * @method $index
	 *
	 * `<T>` Индексирует коллекцию.
	 *
	 * Строит словарь, в ключах которого находятся результаты запуска функции f на всех элементах,
	 * а в значениях - соответствующие элементы.
	 *
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {Function} f
	 *
	 * `f(item: T): string`
	 *
	 * Функция-индексатор для элемента.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {JW.Map} `<T>` Индекс коллекции.
	 */
	/**
	 * @method toArray
	 *
	 * `<T>` Преобразует коллекцию в массив.
	 *
	 * Строит новый массив, включающий все элементы коллекции.
	 *
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @returns {Array} `<T>` Массив элементов.
	 */
	/**
	 * @method $toArray
	 *
	 * `<T>` Преобразует коллекцию в массив.
	 *
	 * Строит новый массив, включающий все элементы коллекции.
	 *
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @returns {JW.Array} `<T>` Массив элементов.
	 */
	/**
	 * @method toSet
	 *
	 * `<T>` Преобразует коллекцию в множество.
	 *
	 * Строит новое множество, включающее все элементы коллекции.
	 *
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @returns {Object} Множество элементов.
	 */
	/**
	 * @method $toSet
	 *
	 * `<T>` Преобразует коллекцию в множество.
	 *
	 * Строит новое множество, включающее все элементы коллекции.
	 *
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @returns {JW.Set} `<T>` Множество элементов.
	 */
	/**
	 * @method asArray
	 *
	 * `<T>` Представляет коллекцию в виде массива.
	 *
	 * Если данная коллекция - массив, сразу возвращает его. В противном случае запускает метод {@link #static-method-toArray}.
	 * Данная функция работает как правило быстрее {@link #static-method-toArray}, но сначала убедитесь, что возвращенный массив
	 * никто не меняет, иначе могут возникнуть странные непредвиденные баги.
	 *
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @returns {Array} `<T>` Массив элементов.
	 */
	/**
	 * @method $asArray
	 *
	 * `<T>` Представляет коллекцию в виде массива.
	 *
	 * Если данная коллекция - массив, сразу возвращает его. В противном случае запускает метод {@link #static-method-toArray}.
	 * Данная функция работает как правило быстрее {@link #static-method-toArray}, но сначала убедитесь, что возвращенный массив
	 * никто не меняет, иначе могут возникнуть странные непредвиденные баги.
	 *
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @returns {JW.Array} `<T>` Массив элементов.
	 */
	/**
	 * @method asSet
	 *
	 * `<T>` Представляет коллекцию в виде множества.
	 *
	 * Если данная коллекция - множество, сразу возвращает его. В противном случае запускает метод {@link #static-method-toSet}.
	 * Данная функция работает как правило быстрее {@link #static-method-toSet}, но сначала убедитесь, что возвращенное множество
	 * никто не меняет, иначе могут возникнуть странные непредвиденные баги.
	 *
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @returns {Object} Множество элементов.
	 */
	/**
	 * @method $asSet
	 *
	 * `<T>` Представляет коллекцию в виде множества.
	 *
	 * Если данная коллекция - множество, сразу возвращает его. В противном случае запускает метод {@link #static-method-toSet}.
	 * Данная функция работает как правило быстрее {@link #static-method-toSet}, но сначала убедитесь, что возвращенное множество
	 * никто не меняет, иначе могут возникнуть странные непредвиденные баги.
	 *
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @returns {JW.Set} `<T>` Множество элементов.
	 */
	/**
	 * @method filter
	 *
	 * `<T>` Фильтрует коллекцию по критерию.
	 *
	 * Строит новую коллекцию того же типа, включающую только те элементы, функция f на которых вернула !== false.
	 *
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {Function} f
	 *
	 * `f(item: T): boolean`
	 *
	 * Фильтрующая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {Object} Отфильтрованная коллекция.
	 */
	/**
	 * @method $filter
	 *
	 * `<T>` Фильтрует коллекцию по критерию.
	 *
	 * Строит новую коллекцию того же типа, включающую только те элементы, функция f на которых вернула !== false.
	 *
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {Function} f
	 *
	 * `f(item: T): boolean`
	 *
	 * Фильтрующая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {JW.Set} `<T>` Отфильтрованная коллекция.
	 */
	/**
	 * @method map
	 *
	 * `<T, U>` Отображает элементы коллекции.
	 * 
	 * Строит новую коллекцию того же типа, состояющую из результатов запуска функции f на каждом элементе коллекции.
	 *
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {Function} f
	 *
	 * `f(item: T): U`
	 *
	 * Отображающая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {Object} Отображенная коллекция.
	 */
	/**
	 * @method $map
	 *
	 * `<T, U>` Отображает элементы коллекции.
	 * 
	 * Строит новую коллекцию того же типа, состояющую из результатов запуска функции f на каждом элементе коллекции.
	 *
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {Function} f
	 *
	 * `f(item: T): U`
	 *
	 * Отображающая функция.
	 *
	 * @param {Object} [scope] Контекст вызова f. По умолчанию f вызывается в контексте коллекции.
	 * @returns {JW.Set} `<U>` Отображенная коллекция.
	 */
	/**
	 * @method add
	 * `<T>` Добавляет элемент в множество, если его еще нет.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {T} item Элемент.
	 * @returns {boolean} Элемент добавлен.
	 */
	/**
	 * @method tryAdd
	 * `<T>` Добавляет элемент в множество, если его еще нет.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {T} item Элемент.
	 * @returns {boolean} Элемент добавлен. Если нет изменений - undefined.
	 */
	/**
	 * @method addAll
	 * `<T>` Добавляет набор элементов в множество, если их еще нет.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {Array} items `<T>` Элементы.
	 * @returns {Array} `<T>` Добавленные элементы.
	 */
	/**
	 * @method $addAll
	 * `<T>` Добавляет набор элементов в множество, если их еще нет.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {Array} items `<T>` Элементы.
	 * @returns {JW.Array} `<T>` Добавленные элементы.
	 */
	/**
	 * @method tryAddAll
	 * `<T>` Добавляет набор элементов в множество, если их еще нет.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {Array} items `<T>` Элементы.
	 * @returns {Array} `<T>` Добавленные элементы. Если нет изменений - undefined.
	 */
	/**
	 * @method remove
	 * `<T>` Удаляет элемент из множества, если он там есть.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {T} item Элемент.
	 * @returns {boolean} Элемент удален.
	 */
	/**
	 * @method tryRemove
	 * `<T>` Удаляет элемент из множества, если он там есть.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {T} item Элемент.
	 * @returns {boolean} Элемент удален. Если нет изменений - undefined.
	 */
	/**
	 * @method removeAll
	 * `<T>` Удаляет набор элементов из множества, если они там есть.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {Array} items `<T>` Элементы.
	 * @returns {Array} `<T>` Удаленные элементы.
	 */
	/**
	 * @method $removeAll
	 * `<T>` Удаляет набор элементов из множества, если они там есть.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {Array} items `<T>` Элементы.
	 * @returns {JW.Array} `<T>` Удаленные элементы.
	 */
	/**
	 * @method tryRemoveAll
	 * `<T>` Удаляет набор элементов из множества, если они там есть.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {Array} items `<T>` Элементы.
	 * @returns {Array} `<T>` Удаленные элементы. Если нет изменений - undefined.
	 */
	/**
	 * @method splice
	 * `<T>` Добавляет и удаляет элементы коллекции. Универсальная оптимизированная атомарная операция удаления/вставки.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {Array} removedItems `<T>` Список элементов для удаления.
	 * @param {Array} addedItems `<T>` Список элементов для добавления.
	 * @returns {JW.AbstractSet.SpliceResult} `<T>` Результат.
	 */
	/**
	 * @method trySplice
	 * `<T>` Добавляет и удаляет элементы коллекции. Универсальная оптимизированная атомарная операция удаления/вставки.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {Array} removedItems `<T>` Список элементов для удаления.
	 * @param {Array} addedItems `<T>` Список элементов для добавления.
	 * @returns {JW.AbstractSet.SpliceResult} `<T>` Результат. Если нет изменений - undefined.
	 */
	/**
	 * @method detectSplice
	 * `<T>` Определяет параметры метода {@link #static-method-splice}, с которыми содержимое множества станет равно newItems.
	 * Т.е. определяет, какие элементы нужно удалить, какие добавить.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {Array} newItems `<T>` Новое содержимое множества.
	 * @returns {JW.AbstractSet.SpliceParams}
	 * `<T>` Параметры метода {@link #static-method-splice}.
	 * Если вызова метода не требуется - undefined.
	 */
	/**
	 * @method performSplice
	 * `<T>` Преобразует содержимое множества к newItems комбинацией методов {@link #static-method-detectSplice} и {@link #static-method-splice}.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {Array} newItems `<T>` Новое содержимое множества.
	 * @returns {void}
	 */
	/**
	 * @method createMapper
	 * `<T, U>` Конструирует конвертер элементов коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractSet.Mapper}
	 * `<T, U>` Синхронизатор.
	 */
	/**
	 * @method createFilterer
	 * `<T>` Конструирует фильтровщик коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractSet.Filterer}
	 * `<T>` Синхронизатор.
	 */
	/**
	 * @method createObserver
	 * `<T>` Конструирует наблюдатель коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractSet.Observer}
	 * `<T>` Синхронизатор.
	 */
	/**
	 * @method createOrderer
	 * `<T>` Конструирует конвертер коллекции в массив (упорядочитель).
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractSet.Orderer}
	 * `<T>` Синхронизатор.
	 */
	/**
	 * @method createSorterComparing
	 * `<T>` Конструирует конвертер коллекции в массив (сортировщик по компаратору).
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractSet.SorterComparing}
	 * `<T>` Синхронизатор.
	 */
	/**
	 * @method createIndexer
	 * `<T>` Конструирует индексатор коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractSet.Indexer}
	 * `<T>` Синхронизатор.
	 */
	/**
	 * @method createLister
	 * `<T>` Конструирует конвертер коллекции в множество.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractSet.Lister}
	 * `<T>` Синхронизатор.
	 */
	/**
	 * @method equal
	 * `<T>` Поэлементно сравнивает множество с массивом.
	 * @static
	 * @param {Object} set `<T>` Множество.
	 * @param {Array} array `<T>` Массив.
	 * @returns {boolean} Множество равно массиву.
	 */
});

/*
	JW set extension.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

JW.AbstractCollection.createStaticMethods(JW.Set);

JW.apply(JW.Set, {
	getLength: function(target) {
		var length = 0;
		for (var key in target) {
			++length;
		}
		return length;
	},
	
	isEmpty: function(target) {
		for (var key in target) {
			return false;
		}
		return true;
	},
	
	getFirst: function(target) {
		for (var key in target) {
			return target[key];
		}
		return undefined;
	},
	
	containsItem: function(target, item) {
		return target.hasOwnProperty(item._iid);
	},
	
	contains: function(target, item) {
		return target.hasOwnProperty(item._iid);
	},
	
	every: function(target, callback, scope) {
		scope = scope || target;
		for (var iid in target) {
			if (callback.call(scope, target[iid]) === false) {
				return false;
			}
		}
		return true;
	},
	
	filter: function(target, callback, scope) {
		var result = {};
		JW.Set.every(target, function(item) {
			if (callback.call(this, item) !== false) {
				result[item._iid] = item;
			}
		}, scope);
		return result;
	},
	
	$filter: JW.AbstractCollection._createStatic$Set(JW.Set, "filter"),
	
	map: function(target, callback, scope) {
		var result = {};
		JW.Set.every(target, function(item) {
			JW.Set.tryAdd(result, callback.call(this, item));
		}, scope);
		return result;
	},
	
	$map: JW.AbstractCollection._createStatic$Set(JW.Set, "map"),
	
	asSet: function(target) {
		return target;
	},
	
	add: function(target, item) {
		return JW.Set.tryAdd(target, item) !== undefined;
	},
	
	tryAdd: function(target, item) {
		var iid = item._iid;
		if (target.hasOwnProperty(iid)) {
			return;
		}
		target[iid] = item;
		return true;
	},
	
	addAll: function(target, items) {
		var result = JW.Set.tryAddAll(target, items);
		return (result !== undefined) ? result : [];
	},
	
	$addAll: JW.AbstractCollection._createStatic$Array(JW.Set, "addAll"),
	
	tryAddAll: function(target, items) {
		var addedItems = [];
		for (var i = 0, l = items.length; i < l; ++i) {
			var item = items[i];
			if (JW.Set.tryAdd(target, item)) {
				addedItems.push(item);
			}
		}
		if (addedItems.length !== 0) {
			return addedItems;
		}
	},
	
	remove: function(target, item) {
		return JW.Set.tryRemove(target, item) !== undefined;
	},
	
	tryRemove: function(target, item) {
		var iid = item._iid;
		if (!target.hasOwnProperty(iid)) {
			return;
		}
		delete target[iid];
		return true;
	},
	
	removeItem: function(target, item) {
		JW.Set.tryRemove(target, item);
	},
	
	removeAll: function(target, items) {
		var result = JW.Set.tryRemoveAll(target, items);
		return (result !== undefined) ? result : [];
	},
	
	$removeAll: JW.AbstractCollection._createStatic$Array(JW.Set, "removeAll"),
	
	tryRemoveAll: function(target, items) {
		var removedItems = [];
		for (var i = 0, l = items.length; i < l; ++i) {
			var item = items[i];
			if (JW.Set.tryRemove(target, item)) {
				removedItems.push(item);
			}
		}
		if (removedItems.length !== 0) {
			return removedItems;
		}
	},
	
	removeItems: function(target, items) {
		JW.Set.tryRemoveAll(target, items);
	},
	
	clear: function(target) {
		var result = JW.Set.tryClear(target);
		return (result !== undefined) ? result : [];
	},
	
	$clear: JW.AbstractCollection._createStatic$Array(JW.Set, "clear"),
	
	tryClear: function(target) {
		var items = JW.Set.toArray(target);
		if (!items.length) {
			return;
		}
		JW.Set.tryRemoveAll(target, items);
		return items;
	},
	
	splice: function(target, removedItems, addedItems) {
		var spliceResult = JW.Set.trySplice(target, removedItems, addedItems);
		return (spliceResult !== undefined) ? spliceResult : new JW.AbstractSet.SpliceResult([], []);
	},
	
	trySplice: function(target, removedItems, addedItems) {
		var addedItemSet = new JW.Set(addedItems);
		removedItems = JW.Array.filter(removedItems, function(item) { return !addedItemSet.contains(item); });
		removedItems = JW.Set.tryRemoveAll(target, removedItems);
		addedItems = JW.Set.tryAddAll(target, addedItems);
		if ((removedItems !== undefined) || (addedItems !== undefined)) {
			return new JW.AbstractSet.SpliceResult(removedItems || [], addedItems || []);
		}
	},
	
	detectSplice: function(oldItems, newItemArray) {
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
			return new JW.AbstractSet.SpliceParams(removedItems, addedItems);
		}
	},
	
	performSplice: function(target, newItems) {
		var spliceParams = JW.Set.detectSplice(target, newItems);
		if (spliceParams !== undefined) {
			JW.Set.trySplice(target, spliceParams.removedItems, spliceParams.addedItems);
		}
	},
	
	createMapper: function(source, config) {
		return new JW.AbstractSet.Mapper(new JW.Set(source, true), config);
	},
	
	createFilterer: function(source, config) {
		return new JW.AbstractSet.Filterer(new JW.Set(source, true), config);
	},
	
	createObserver: function(source, config) {
		return new JW.AbstractSet.Observer(new JW.Set(source, true), config);
	},
	
	createOrderer: function(source, config) {
		return new JW.AbstractSet.Orderer(new JW.Set(source, true), config);
	},
	
	createSorterComparing: function(source, config) {
		return new JW.AbstractSet.SorterComparing(new JW.Set(source, true), config);
	},
	
	createIndexer: function(source, config) {
		return new JW.AbstractSet.Indexer(new JW.Set(source, true), config);
	},
	
	createLister: function(source, config) {
		return new JW.AbstractSet.Lister(new JW.Set(source, true), config);
	},
	
	equal: function(x, y) {
		if (JW.Set.getLength(x) !== y.length) {
			return false;
		}
		for (var i = 0, l = y.length; i < l; ++i) {
			if (!x.hasOwnProperty(y[i]._iid)) {
				return false;
			}
		}
		return true;
	},
	
	single: function(item) {
		var result = {};
		result[item._iid] = item;
		return result;
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T> extends JW.AbstractArray<T>`
 *
 * Оповещающий массив. Структурированный список методов смотрите в JW.AbstractArray.
 *
 * @extends JW.AbstractArray
 *
 * @constructor
 * @param {Array} [items] `<T>` Изначальное содержимое массива. По умолчанию, создается пустой массив.
 * @param {boolean} [adapter] Создать массив как адаптер над items. По умолчанию, равен false, т.е. создается
 * копия массива items.
 */
JW.ObservableArray = function(items, adapter) {
	JW.ObservableArray._super.call(this, items, adapter);
	this.spliceEvent = new JW.Event();
	this.replaceEvent = new JW.Event();
	this.moveEvent = new JW.Event();
	this.clearEvent = new JW.Event();
	this.reorderEvent = new JW.Event();
	this.changeEvent = new JW.Event();
	this.lengthChangeEvent = new JW.Event();
	this._lastLength = this.items.length;
};

JW.extend(JW.ObservableArray, JW.AbstractArray, {
	/**
	 * @event spliceEvent
	 * Элементы удалены/вставлены в массив. Возникает в результате запуска
	 * метода #add, #tryAdd, #addAll, #tryAddAll, #remove, #tryRemove, #removeItem, #pop, #removeAll, #tryRemoveAll,
	 * {@link #removeItems}, #splice, #trySplice, #performSplice.
	 * @param {JW.ObservableArray.SpliceEventParams} params `<T>` Параметры.
	 */
	/**
	 * @event replaceEvent
	 * Элемент заменен в массиве. Возникает в результате запуска метода #set, #trySet.
	 * @param {JW.ObservableArray.ReplaceEventParams} params `<T>` Параметры.
	 */
	/**
	 * @event moveEvent
	 * Элемент перемещен в массиве. Возникает в результате запуска метода #move, #tryMove.
	 * @param {JW.ObservableArray.MoveEventParams} params `<T>` Параметры.
	 */
	/**
	 * @event clearEvent
	 * Массив очищен. Возникает в результате запуска метода #clear, #$clear, #tryClear.
	 * @param {JW.ObservableArray.ItemsEventParams} params
	 * `<T>` Параметры. JW.ObservableArray.ItemsEventParams#items обозначает бывшее содержимое массива.
	 */
	/**
	 * @event reorderEvent
	 * Элементы переупорядочены в массиве. Возникает в результате запуска
	 * метода #reorder, #tryReorder, #performReorder, #sort, #sortComparing.
	 * @param {JW.ObservableArray.ReorderEventParams} params
	 * `<T>` Параметры. JW.ObservableArray.ReorderEventParams#items обозначает бывшее содержимое массива.
	 */
	/**
	 * @event changeEvent
	 * Массив изменен. Возникает после одного из
	 * событий #spliceEvent, #replaceEvent, #moveEvent, #clearEvent, #reorderEvent.
	 * @param {JW.ObservableArray.EventParams} params `<T>` Параметры.
	 */
	/**
	 * @event lengthChangeEvent
	 * Изменена длина массива. Возникает после события #changeEvent в случае изменения длины.
	 * @param {JW.ObservableArray.LengthChangeEventParams} params `<T>` Параметры.
	 */
	
	// override
	destroy: function() {
		this.lengthChangeEvent.destroy();
		this.changeEvent.destroy();
		this.reorderEvent.destroy();
		this.clearEvent.destroy();
		this.moveEvent.destroy();
		this.replaceEvent.destroy();
		this.spliceEvent.destroy();
		this._super();
	},
	
	// override
	trySet: function(item, index) {
		var oldItem = this._super(item, index);
		if (oldItem === undefined) {
			return;
		}
		this.replaceEvent.trigger(new JW.ObservableArray.ReplaceEventParams(this, index, oldItem.value, item));
		this._triggerChange();
		return oldItem;
	},
	
	// override
	tryMove: function(fromIndex, toIndex) {
		var item = this._super(fromIndex, toIndex);
		if (item === undefined) {
			return;
		}
		this.moveEvent.trigger(new JW.ObservableArray.MoveEventParams(this, fromIndex, toIndex, item));
		this._triggerChange();
		return item;
	},
	
	// override
	tryClear: function() {
		var oldItems = this._super();
		if (oldItems === undefined) {
			return;
		}
		this.clearEvent.trigger(new JW.ObservableArray.ItemsEventParams(this, oldItems));
		this._triggerChange();
		return oldItems;
	},
	
	// override
	trySplice: function(removeParamsList, addParamsList) {
		var result = this._super(removeParamsList, addParamsList);
		if (result === undefined) {
			return;
		}
		this.spliceEvent.trigger(new JW.ObservableArray.SpliceEventParams(this, result));
		this._triggerChange();
		return result;
	},
	
	// override
	tryReorder: function(indexArray) {
		var items = this._super(indexArray);
		if (items === undefined) {
			return;
		}
		this.reorderEvent.trigger(new JW.ObservableArray.ReorderEventParams(this, indexArray, items));
		this._triggerChange();
		return items;
	},
	
	/**
	 * `<U>` Конструирует пустую коллекцию того же типа.
	 * @returns {JW.ObservableArray} `<U>` Коллекция.
	 */
	createEmpty: function() {
		return new JW.ObservableArray();
	},
	
	/**
	 * `<U>` Конструирует пустой массив того же типа (простой или оповещающий).
	 * @returns {JW.ObservableArray} `<U>` Массив.
	 */
	createEmptyArray: function() {
		return new JW.ObservableArray();
	},
	
	/**
	 * `<U>` Конструирует пустой словарь того же типа (простой или оповещающий).
	 * @returns {JW.ObservableMap} `<U>` Словарь.
	 */
	createEmptyMap: function() {
		return new JW.ObservableMap();
	},
	
	/**
	 * `<U>` Конструирует пустое множество того же типа (простое или оповещающее).
	 * @returns {JW.ObservableSet} `<U>` Множество.
	 */
	createEmptySet: function() {
		return new JW.ObservableSet();
	},
	
	/**
	 * `<U>` Конструирует конвертер элементов коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.ObservableArray.Mapper}
	 * `<T, U>` Синхронизатор.
	 */
	createMapper: function(config) {
		return new JW.ObservableArray.Mapper(this, config);
	},
	
	/**
	 * Конструирует фильтровщик коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.ObservableArray.Filterer}
	 * `<T>` Синхронизатор.
	 */
	createFilterer: function(config) {
		return new JW.ObservableArray.Filterer(this, config);
	},
	
	/**
	 * Конструирует наблюдатель коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.ObservableArray.Observer}
	 * `<T>` Синхронизатор.
	 */
	createObserver: function(config) {
		return new JW.ObservableArray.Observer(this, config);
	},
	
	/**
	 * Конструирует конвертер коллекции в массив (упорядочитель).
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.ObservableArray.Orderer}
	 * `<T>` Синхронизатор.
	 */
	createOrderer: function(config) {
		return new JW.ObservableArray.Orderer(this, config);
	},
	
	/**
	 * Конструирует конвертер коллекции в массив (сортировщик по компаратору).
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.ObservableArray.SorterComparing}
	 * `<T>` Синхронизатор.
	 */
	createSorterComparing: function(config) {
		return new JW.ObservableArray.SorterComparing(this, config);
	},
	
	/**
	 * Конструирует индексатор коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.ObservableArray.Indexer}
	 * `<T>` Синхронизатор.
	 */
	createIndexer: function(config) {
		return new JW.ObservableArray.Indexer(this, config);
	},
	
	/**
	 * Конструирует конвертер коллекции в множество.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.ObservableArray.Lister}
	 * `<T>` Синхронизатор.
	 */
	createLister: function(config) {
		return new JW.ObservableArray.Lister(this, config);
	},
	
	/**
	 * Конструирует синхронизатор представления с массивом.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.ObservableArray.Inserter}
	 * `<T>` Синхронизатор.
	 */
	createInserter: function(config) {
		return new JW.ObservableArray.Inserter(this, config);
	},
	
	/**
	 * Конструирует объединитель массивов.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.ObservableArray.Merger}
	 * `<T>` Синхронизатор.
	 */
	createMerger: function(config) {
		return new JW.ObservableArray.Merger(this, config);
	},
	
	createMergerBunch: function(merger) {
		return new JW.ObservableArray.Merger.Bunch(merger, this);
	},
	
	/**
	 * Конструирует обратитель массива.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.AbstractArray.Reverser}
	 * `<T>` Синхронизатор.
	 */
	createReverser: function(config) {
		return new JW.ObservableArray.Reverser(this, config);
	},
	
	createSplitter: function(config) {
		return new JW.ObservableArray.Splitter(this, config);
	},
	
	_triggerChange: function() {
		this.changeEvent.trigger(new JW.ObservableArray.EventParams(this));
		var length = this.getLength();
		if (this._lastLength !== length) {
			this.lengthChangeEvent.trigger(new JW.ObservableArray.LengthChangeEventParams(this, this._lastLength, length));
			this._lastLength = length;
		}
	}
});

/**
 * @class
 * `<T>` Параметры события JW.ObservableArray.
 * @extends JW.EventParams
 *
 * @constructor
 * @param {JW.ObservableArray} sender `<T>` Отправитель события.
 */
JW.ObservableArray.EventParams = function(sender) {
	JW.ObservableArray.EventParams._super.call(this, sender);
};

JW.extend(JW.ObservableArray.EventParams, JW.EventParams, {
	/**
	 * @property {JW.ObservableArray} sender `<T>` Отправитель события.
	 */
});

/**
 * @class
 *
 * `<T> extends JW.ObservableArray.EventParams<T>`
 *
 * Параметры события JW.ObservableArray#spliceEvent.
 *
 * @extends JW.ObservableArray.EventParams
 *
 * @constructor
 * @param {JW.ObservableArray} sender `<T>` Отправитель события.
 * @param {JW.AbstractArray.SpliceResult} spliceResult `<T>` Результат метода JW.AbstractArray#splice.
 */
JW.ObservableArray.SpliceEventParams = function(sender, spliceResult) {
	JW.ObservableArray.SpliceEventParams._super.call(this, sender);
	this.spliceResult = spliceResult;
};

JW.extend(JW.ObservableArray.SpliceEventParams/*<T>*/, JW.ObservableArray.EventParams/*<T>*/, {
	/**
	 * @property {JW.AbstractArray.SpliceResult} spliceResult `<T>` Результат метода JW.AbstractArray#splice.
	 */
});

/**
 * @class
 *
 * `<T> extends JW.ObservableArray.EventParams<T>`
 *
 * Параметры события JW.ObservableArray#moveEvent.
 *
 * @extends JW.ObservableArray.EventParams
 *
 * @constructor
 * @param {JW.ObservableArray} sender `<T>` Отправитель события.
 * @param {number} fromIndex Откуда перенесен элемент.
 * @param {number} toIndex Куда перенесен элемент.
 * @param {T} item Элемент.
 */
JW.ObservableArray.MoveEventParams = function(sender, fromIndex, toIndex, item) {
	JW.ObservableArray.MoveEventParams._super.call(this, sender);
	this.fromIndex = fromIndex;
	this.toIndex = toIndex;
	this.item = item;
};

JW.extend(JW.ObservableArray.MoveEventParams, JW.ObservableArray.EventParams, {
	/**
	 * @property {number} fromIndex Откуда перенесен элемент.
	 */
	/**
	 * @property {number} toIndex Куда перенесен элемент.
	 */
	/**
	 * @property {T} item Элемент.
	 */
});

/**
 * @class
 *
 * `<T> extends JW.ObservableArray.EventParams<T>`
 *
 * Параметры события JW.ObservableArray#replaceEvent.
 *
 * @extends JW.ObservableArray.EventParams
 *
 * @constructor
 * @param {JW.ObservableArray} sender `<T>` Отправитель события.
 * @param {number} index Индекс элемента.
 * @param {T} oldItem Старое значение.
 * @param {T} newItem Новое значение.
 */
JW.ObservableArray.ReplaceEventParams = function(sender, index, oldItem, newItem) {
	JW.ObservableArray.ReplaceEventParams._super.call(this, sender);
	this.index = index;
	this.oldItem = oldItem;
	this.newItem = newItem;
};

JW.extend(JW.ObservableArray.ReplaceEventParams, JW.ObservableArray.EventParams, {
	/**
	 * @property {number} index Индекс элемента.
	 */
	/**
	 * @property {T} oldItem Старое значение.
	 */
	/**
	 * @property {T} newItem Новое значение.
	 */
});

/**
 * @class
 *
 * `<T> extends JW.ObservableArray.EventParams<T>`
 *
 * Параметры события JW.ObservableArray, несущие его бывшее содержимое.
 *
 * @extends JW.ObservableArray.EventParams
 *
 * @constructor
 * @param {JW.ObservableArray} sender `<T>` Отправитель события.
 * @param {Array} items `<T>` Бывшее содержимое массива.
 */
JW.ObservableArray.ItemsEventParams = function(sender, items) {
	JW.ObservableArray.ItemsEventParams._super.call(this, sender);
	this.items = items;
};

JW.extend(JW.ObservableArray.ItemsEventParams, JW.ObservableArray.EventParams, {
	/**
	 * @property {Array} items `<T>` Бывшее содержимое массива.
	 */
});

/**
 * @class
 *
 * `<T> extends JW.ObservableArray.ItemsEventParams<T>`
 *
 * Параметры события JW.ObservableArray#reorderEvent.
 *
 * @extends JW.ObservableArray.ItemsEventParams
 *
 * @constructor
 * @param {JW.ObservableArray} sender `<T>` Отправитель события.
 * @param {Array} indexArray `<number>` Индексы элементов в переупорядоченном массиве.
 * @param {Array} items `<T>` Набор элементов.
 */
JW.ObservableArray.ReorderEventParams = function(sender, indexArray, items) {
	JW.ObservableArray.ReorderEventParams._super.call(this, sender, items);
	this.indexArray = indexArray;
};

JW.extend(JW.ObservableArray.ReorderEventParams, JW.ObservableArray.ItemsEventParams, {
	/**
	 * @property {Array} indexArray `<number>` Индексы элементов в переупорядоченном массиве.
	 */
});

/**
 * @class
 *
 * `<T> extends JW.ObservableArray.EventParams<T>`
 *
 * Параметры события JW.ObservableArray#lengthChangeEvent.
 *
 * @extends JW.ObservableArray.EventParams
 *
 * @constructor
 * @param {JW.ObservableArray} sender `<T>` Отправитель события.
 * @param {number} oldLength Старая длина массива.
 * @param {number} newLength Новая длина массива.
 */
JW.ObservableArray.LengthChangeEventParams = function(sender, oldLength, newLength) {
	JW.ObservableArray.LengthChangeEventParams._super.call(this, sender);
	this.oldLength = oldLength;
	this.newLength = newLength;
};

JW.extend(JW.ObservableArray.LengthChangeEventParams, JW.ObservableArray.EventParams, {
	/**
	 * @property {number} oldLength Старая длина массива.
	 */
	/**
	 * @property {number} newLength Новая длина массива.
	 */
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T> extends JW.AbstractArray.Filterer<T>`
 *
 * Фильтровщик оповещающего массива. Подробнее читайте JW.AbstractCollection.Filterer.
 *
 * @extends JW.AbstractArray.Filterer
 *
 * @constructor
 * Конструирует синхронизатор. Предпочтительнее использовать метод JW.AbstractCollection#createFilterer.
 * @param {JW.ObservableArray} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.ObservableArray.Filterer = function(source, config) {
	JW.ObservableArray.Filterer._super.call(this, source, config);
	this._spliceEventAttachment = source.spliceEvent.bind(this._onSplice, this);
	this._replaceEventAttachment = source.replaceEvent.bind(this._onReplace, this);
	this._moveEventAttachment = source.moveEvent.bind(this._onMove, this);
	this._clearEventAttachment = source.clearEvent.bind(this._onClear, this);
	this._reorderEventAttachment = source.reorderEvent.bind(this._onReorder, this);
};

JW.extend(JW.ObservableArray.Filterer, JW.AbstractArray.Filterer, {
	/*
	JW.EventAttachment _spliceEventAttachment;
	JW.EventAttachment _replaceEventAttachment;
	JW.EventAttachment _moveEventAttachment;
	JW.EventAttachment _clearEventAttachment;
	JW.EventAttachment _reorderEventAttachment;
	*/
	
	// override
	destroy: function() {
		this._reorderEventAttachment.destroy();
		this._clearEventAttachment.destroy();
		this._moveEventAttachment.destroy();
		this._replaceEventAttachment.destroy();
		this._spliceEventAttachment.destroy();
		this._super();
	},
	
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		this._splice(spliceResult.removedItemsList, spliceResult.addedItemsList);
	},
	
	_onReplace: function(params) {
		var oldFiltered = this._filtered[params.index] !== 0;
		var newFiltered = this.filterItem.call(this.scope, params.newItem) !== false;
		if (!oldFiltered && !newFiltered) {
			return;
		}
		var index = this._countFiltered(0, params.index);
		this._filtered[params.index] = newFiltered ? 1 : 0;
		if (!newFiltered) {
			this.target.tryRemove(index);
		} else if (!oldFiltered) {
			this.target.tryAdd(params.newItem, index);
		} else {
			this.target.trySet(params.newItem, index);
		}
	},
	
	_onMove: function(params) {
		if (this._filtered[params.fromIndex] !== 0) {
			var fromIndex, toIndex;
			if (params.fromIndex < params.toIndex) {
				fromIndex = this._countFiltered(0, params.fromIndex);
				toIndex = fromIndex + this._countFiltered(params.fromIndex + 1, params.toIndex - params.fromIndex);
			} else {
				toIndex = this._countFiltered(0, params.toIndex);
				fromIndex = toIndex + this._countFiltered(params.toIndex, params.fromIndex - params.toIndex);
			}
			this.target.tryMove(fromIndex, toIndex);
		}
		JW.Array.tryMove(this._filtered, params.fromIndex, params.toIndex);
	},
	
	_onClear: function(params) {
		this.target.tryClear();
	},
	
	_onReorder: function(params) {
		var targetIndex = 0;
		var targetIndexWhichMovesToI = {}
		for (var sourceIndex = 0, l = this._filtered.length; sourceIndex < l; ++sourceIndex) {
			if (this._filtered[sourceIndex] !== 0) {
				targetIndexWhichMovesToI[params.indexArray[sourceIndex]] = targetIndex++;
			}
		}
		JW.Array.tryReorder(this._filtered, params.indexArray);
		
		var targetIndex = 0;
		var indexes = new Array(this.target.getLength());
		for (var sourceIndex = 0, l = this._filtered.length; sourceIndex < l; ++sourceIndex) {
			if (this._filtered[sourceIndex] !== 0) {
				indexes[targetIndexWhichMovesToI[sourceIndex]] = targetIndex++;
			}
		}
		
		this.target.tryReorder(indexes);
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T> extends JW.AbstractArray.Indexer<T>`
 *
 * Индексатор оповещающего массива. Подробнее читайте JW.AbstractCollection.Indexer.
 *
 * @extends JW.AbstractArray.Indexer
 *
 * @constructor
 * Конструирует синхронизатор. Предпочтительнее использовать метод JW.AbstractCollection#createIndexer.
 * @param {JW.ObservableArray} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.ObservableArray.Indexer = function(source, config) {
	JW.ObservableArray.Indexer._super.call(this, source, config);
	this._spliceEventAttachment = source.spliceEvent.bind(this._onSplice, this);
	this._replaceEventAttachment = source.replaceEvent.bind(this._onReplace, this);
	this._clearEventAttachment = source.clearEvent.bind(this._onClear, this);
};

JW.extend(JW.ObservableArray.Indexer, JW.AbstractArray.Indexer, {
	/*
	JW.EventAttachment _spliceEventAttachment;
	JW.EventAttachment _replaceEventAttachment;
	JW.EventAttachment _clearEventAttachment;
	*/
	
	// override
	destroy: function() {
		this._clearEventAttachment.destroy();
		this._replaceEventAttachment.destroy();
		this._spliceEventAttachment.destroy();
		this._super();
	},
	
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		this.target.trySplice(
			this._keys(spliceResult.getRemovedItems()),
			this._index(spliceResult.getAddedItems()));
	},
	
	_onReplace: function(params) {
		this.target.trySplice(
			this._keys([params.oldItem]),
			this._index([params.newItem]));
	},
	
	_onClear: function(params) {
		this.target.tryRemoveAll(
			this._keys(params.items));
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T> extends JW.AbstractArray.Inserter<T>`
 *
 * Синхронизатор представления оповещающего массива. Подробнее читайте JW.AbstractArray.Inserter.
 *
 * @extends JW.AbstractArray.Inserter
 *
 * @constructor
 * Конструирует синхронизатор. Предпочтительнее использовать метод JW.AbstractArray#createInserter.
 * @param {JW.ObservableArray} source `<T>` Исходный массив.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.ObservableArray.Inserter = function(source, config) {
	JW.ObservableArray.Inserter._super.call(this, source, config);
	this._spliceEventAttachment = source.spliceEvent.bind(this._onSplice, this);
	this._replaceEventAttachment = source.replaceEvent.bind(this._onReplace, this);
	this._moveEventAttachment = source.moveEvent.bind(this._onMove, this);
	this._clearEventAttachment = source.clearEvent.bind(this._onClear, this);
	this._reorderEventAttachment = source.reorderEvent.bind(this._onReorder, this);
};

JW.extend(JW.ObservableArray.Inserter, JW.AbstractArray.Inserter, {
	/*
	JW.EventAttachment _spliceEventAttachment;
	JW.EventAttachment _replaceEventAttachment;
	JW.EventAttachment _moveEventAttachment;
	JW.EventAttachment _clearEventAttachment;
	JW.EventAttachment _reorderEventAttachment;
	*/
	
	// override
	destroy: function() {
		this._reorderEventAttachment.destroy();
		this._clearEventAttachment.destroy();
		this._moveEventAttachment.destroy();
		this._replaceEventAttachment.destroy();
		this._spliceEventAttachment.destroy();
		this._super();
	},
	
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		var oldItems = spliceResult.oldItems;
		var removedItems = spliceResult.getRemovedItems();
		
		// if there is an effective clearing function, just reset the controller
		if (this.clearItems && (3 * removedItems.length > 2 * oldItems.length)) {
			this.clearItems.call(this.scope, oldItems);
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
	},
	
	_onReplace: function(params) {
		if (this.removeItem) {
			this.removeItem.call(this.scope, params.oldItem, params.index);
		}
		if (this.addItem) {
			this.addItem.call(this.scope, params.newItem, params.index);
		}
	},
	
	_onMove: function(params) {
		if (this.removeItem) {
			this.removeItem.call(this.scope, params.item, params.fromIndex);
		}
		if (this.addItem) {
			this.addItem.call(this.scope, params.item, params.toIndex);
		}
	},
	
	_onClear: function(params) {
		this._clearItems(params.items);
	},
	
	_onReorder: function(params) {
		this._clearItems(params.items);
		this._addItems(this.source.getItems(), 0);
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T extends JW.Class> extends JW.AbstractArray.Lister<T>`
 *
 * Конвертер оповещающего массива в множество. Подробнее читайте JW.AbstractCollection.Lister.
 *
 * @extends JW.AbstractArray.Lister
 *
 * @constructor
 * Конструирует конвертер. Предпочтительнее использовать метод JW.AbstractCollection#createLister.
 * @param {JW.ObservableArray} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.ObservableArray.Lister = function(source, config) {
	JW.ObservableArray.Lister._super.call(this, source, config);
	this._spliceEventAttachment = this.source.spliceEvent.bind(this._onSplice, this);
	this._replaceEventAttachment = this.source.replaceEvent.bind(this._onReplace, this);
	this._clearEventAttachment = this.source.clearEvent.bind(this._onClear, this);
};

JW.extend(JW.ObservableArray.Lister, JW.AbstractArray.Lister, {
	/*
	JW.EventAttachment _spliceEventAttachment;
	JW.EventAttachment _replaceEventAttachment;
	JW.EventAttachment _clearEventAttachment;
	*/
	
	// override
	destroy: function() {
		this._clearEventAttachment.destroy();
		this._replaceEventAttachment.destroy();
		this._spliceEventAttachment.destroy();
		this._super();
	},
	
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		this.target.trySplice(spliceResult.getRemovedItems(), spliceResult.getAddedItems());
	},
	
	_onReplace: function(params) {
		this.target.trySplice([params.oldItem], [params.newItem]);
	},
	
	_onClear: function(params) {
		this.target.tryRemoveAll(params.items);
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T, U> extends JW.AbstractArray.Mapper<T, U>`
 *
 * Конвертер элементов оповещающего массива. Подробнее читайте JW.AbstractCollection.Mapper.
 *
 * @extends JW.AbstractArray.Mapper
 *
 * @constructor
 * Конструирует синхронизатор. Предпочтительнее использовать метод JW.AbstractCollection#createMapper.
 * @param {JW.ObservableArray} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.ObservableArray.Mapper = function(source, config) {
	JW.ObservableArray.Mapper._super.call(this, source, config);
	this._spliceEventAttachment = source.spliceEvent.bind(this._onSplice, this);
	this._replaceEventAttachment = source.replaceEvent.bind(this._onReplace, this);
	this._moveEventAttachment = source.moveEvent.bind(this._onMove, this);
	this._clearEventAttachment = source.clearEvent.bind(this._onClear, this);
	this._reorderEventAttachment = source.reorderEvent.bind(this._onReorder, this);
};

JW.extend(JW.ObservableArray.Mapper, JW.AbstractArray.Mapper, {
	/*
	JW.EventAttachment _spliceEventAttachment;
	JW.EventAttachment _replaceEventAttachment;
	JW.EventAttachment _moveEventAttachment;
	JW.EventAttachment _clearEventAttachment;
	JW.EventAttachment _reorderEventAttachment;
	*/
	
	destroy: function() {
		this._reorderEventAttachment.destroy();
		this._clearEventAttachment.destroy();
		this._moveEventAttachment.destroy();
		this._replaceEventAttachment.destroy();
		this._spliceEventAttachment.destroy();
		this._super();
	},
	
	_onSplice: function(params) {
		var sourceResult = params.spliceResult;
		var sourceAddedItemsList = sourceResult.addedItemsList;
		var targetAddParamsList = [];
		for (var i = 0, l = sourceAddedItemsList.length; i < l; ++i) {
			var addParams = sourceAddedItemsList[i];
			targetAddParamsList.push(new JW.AbstractArray.IndexItems(
				addParams.index, this._createItems(addParams.items)));
		}
		var targetResult = this.target.trySplice(sourceResult.getRemoveParamsList(), targetAddParamsList);
		var sourceRemovedItemsList = sourceResult.removedItemsList;
		var targetRemovedItemsList = targetResult.removedItemsList;
		for (var i = targetRemovedItemsList.length - 1; i >= 0; --i) {
			this._destroyItems(targetRemovedItemsList[i].items, sourceRemovedItemsList[i].items);
		}
	},
	
	_onReplace: function(params) {
		var newItem = this.createItem.call(this.scope, params.newItem);
		var oldItem = this.target.trySet(newItem, params.index).value;
		this.destroyItem.call(this.scope, oldItem, params.oldItem);
	},
	
	_onMove: function(params) {
		this.target.tryMove(params.fromIndex, params.toIndex);
	},
	
	_onClear: function(params) {
		this._destroyItems(this.target.tryClear(), params.items);
	},
	
	_onReorder: function(params) {
		this.target.tryReorder(params.indexArray);
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T> extends JW.AbstractArray.Merger<T>`
 *
 * Объединитель массивов. Подробнее читайте JW.AbstractArray.Merger.
 *
 * @extends JW.AbstractArray.Merger
 *
 * @constructor
 * Конструирует синхронизатор. Предпочтительнее использовать метод JW.AbstractArray#createMerger.
 * @param {JW.ObservableArray} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.ObservableArray.Merger = function(source, config) {
	JW.ObservableArray.Merger._super.call(this, source, config);
	this._spliceEventAttachment = source.spliceEvent.bind(this._onSplice, this);
	this._replaceEventAttachment = source.replaceEvent.bind(this._onReplace, this);
	this._moveEventAttachment = source.moveEvent.bind(this._onMove, this);
	this._clearEventAttachment = source.clearEvent.bind(this._onClear, this);
	this._reorderEventAttachment = source.reorderEvent.bind(this._onReorder, this);
};

JW.extend(JW.ObservableArray.Merger, JW.AbstractArray.Merger, {
	/*
	JW.EventAttachment _spliceEventAttachment;
	JW.EventAttachment _replaceEventAttachment;
	JW.EventAttachment _moveEventAttachment;
	JW.EventAttachment _clearEventAttachment;
	JW.EventAttachment _reorderEventAttachment;
	*/
	
	// override
	destroy: function() {
		this._reorderEventAttachment.destroy();
		this._clearEventAttachment.destroy();
		this._moveEventAttachment.destroy();
		this._replaceEventAttachment.destroy();
		this._spliceEventAttachment.destroy();
		this._super();
	},
	
	// override
	_createTarget: function() {
		return new JW.ObservableArray();
	},
	
	_getIndexes: function(bunches) {
		var currentIndex = 0;
		var indexes = JW.Array.map(bunches, function(bunch) {
			var index = currentIndex;
			currentIndex += bunch.getLength();
			return index;
		}, this);
		indexes.push(currentIndex);
		return indexes;
	},
	
	// 0 x,x
	// 2 x,x,x delete
	// 5 x,x,x,x
	// 9 x,x
	
	// 0 x,x
	// 2 x,x,x,x
	// 6 x,x
	
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		var indexes = this._getIndexes(spliceResult.oldItems);
		var removeParamsList = JW.Array.map(spliceResult.removedItemsList, function(indexItems) {
			return new JW.AbstractArray.IndexCount(indexes[indexItems.index], this._count(indexItems.items));
		}, this);
		JW.Array.backEvery(spliceResult.removedItemsList, function(indexItems) {
			indexes.splice(indexItems.index, indexItems.items.length);
			var count = this._count(indexItems.items);
			for (var i = indexItems.index; i < indexes.length; ++i) {
				indexes[i] -= count;
			}
		}, this);
		var addParamsList = JW.Array.map(spliceResult.addedItemsList, function(indexItems) {
			return new JW.AbstractArray.IndexItems(indexes[indexItems.index], this._merge(indexItems.items));
		}, this);
		this.target.trySplice(removeParamsList, addParamsList);
	},
	
	_onReplace: function(params) {
		var index = this._count(this.source.getItems(), 0, params.index);
		this.target.trySplice(
			[new JW.AbstractArray.IndexCount(index, params.oldItem.getLength())],
			[new JW.AbstractArray.IndexItems(index, params.newItem.getItems())]);
	},
	
	_onMove: function(params) {
		var count = params.item.getLength();
		var indexes = new Array(this.target.getLength());
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
			// [1], [2], [3], [4], [5]        [2] move to 3
			// [1], [3], [4], [2], [5]
			shiftBunch(count, this._count(this.source.getItems(), params.fromIndex, params.toIndex - params.fromIndex));
			for (var i = params.fromIndex; i < params.toIndex; ++i) {
				shiftBunch(this.source.get(i).getLength(), -count);
			}
		} else {
			// [1], [2], [3], [4], [5]        [4] move to 1
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
	},
	
	_onClear: function(params) {
		this.target.clear();
	},
	
	_onReorder: function(params) {
		var oldIndexes = this._getIndexes(params.items);
		var newIndexes = this._getIndexes(this.source.getItems());
		var indexes = new Array(this.target.getLength());
		for (var i = 0, l = params.items.length; i < l; ++i) {
			var bunch = params.items[i];
			var oldIndex = oldIndexes[i];
			var newIndex = newIndexes[params.indexArray[i]];
			for (var j = 0, m = bunch.getLength(); j < m; ++j) {
				indexes[oldIndex + j] = newIndex + j;
			}
		}
		this.target.tryReorder(indexes);
	}
});

JW.ObservableArray.Merger.Bunch = function(merger, bunch) {
	JW.ObservableArray.Merger.Bunch._super.call(this);
	this.source = merger.source;
	this.target = merger.target;
	this.bunch = bunch;
	this._spliceAttachment = bunch.spliceEvent.bind(this._onSplice, this);
	this._replaceAttachment = bunch.replaceEvent.bind(this._onReplace, this);
	this._moveAttachment = bunch.moveEvent.bind(this._onMove, this);
	this._clearAttachment = bunch.clearEvent.bind(this._onClear, this);
	this._reorderAttachment = bunch.reorderEvent.bind(this._onReorder, this);
};

JW.extend(JW.ObservableArray.Merger.Bunch, JW.AbstractArray.Merger.Bunch, {
	/*
	Fields
	JW.AbstractArray<? extends JW.ObservableArray<T>> source;
	JW.AbstractArray<T> target;
	JW.AbstractArray<T> bunch;
	JW.EventAttachment _spliceAttachment;
	JW.EventAttachment _replaceAttachment;
	JW.EventAttachment _moveAttachment;
	JW.EventAttachment _clearAttachment;
	JW.EventAttachment _reorderAttachment;
	*/
	
	// override
	destroy: function() {
		this._reorderAttachment.destroy();
		this._clearAttachment.destroy();
		this._moveAttachment.destroy();
		this._replaceAttachment.destroy();
		this._spliceAttachment.destroy();
		this._super();
	},
	
	_getIndex: function() {
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
	},
	
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		var index = this._getIndex();
		var removeParamsList = JW.Array.map(spliceResult.removedItemsList, function(indexItems) {
			return new JW.AbstractArray.IndexCount(indexItems.index + index, indexItems.items.length);
		}, this);
		var addParamsList = JW.Array.map(spliceResult.addedItemsList, function(indexItems) {
			return new JW.AbstractArray.IndexItems(indexItems.index + index, indexItems.items.concat());
		}, this);
		this.target.trySplice(removeParamsList, addParamsList);
	},
	
	_onReplace: function(params) {
		this.target.trySet(params.newItem, this._getIndex() + params.index);
	},
	
	_onMove: function(params) {
		var index = this._getIndex();
		this.target.tryMove(index + params.fromIndex, index + params.toIndex);
	},
	
	_onClear: function(params) {
		this.target.tryRemoveAll(this._getIndex(), params.items.length);
	},
	
	_onReorder: function(params) {
		var index = this._getIndex();
		var bunchIndexArray = params.indexArray;
		var bunchLength = bunchIndexArray.length;
		var targetLength = this.target.getLength();
		var targetIndexArray = new Array(targetLength);
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
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T> extends JW.AbstractArray.Observer<T>`
 *
 * Наблюдатель оповещающего массива. Подробнее читайте JW.AbstractCollection.Observer.
 *
 * @extends JW.AbstractArray.Observer
 *
 * @constructor
 * Конструирует синхронизатор. Предпочтительнее использовать метод JW.AbstractCollection#createObserver.
 * @param {JW.ObservableArray} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.ObservableArray.Observer = function(source, config) {
	JW.ObservableArray.Observer._super.call(this, source, config);
	this._spliceEventAttachment = source.spliceEvent.bind(this._onSplice, this);
	this._replaceEventAttachment = source.replaceEvent.bind(this._onReplace, this);
	this._clearEventAttachment = source.clearEvent.bind(this._onClear, this);
	if (this.change) {
		this._changeAttachment = source.changeEvent.bind(this._onChange, this);
	}
};

JW.extend(JW.ObservableArray.Observer, JW.AbstractArray.Observer, {
	/*
	JW.EventAttachment _spliceEventAttachment;
	JW.EventAttachment _replaceEventAttachment;
	JW.EventAttachment _clearEventAttachment;
	JW.EventAttachment _changeAttachment;
	*/
	
	// override
	destroy: function() {
		if (this._changeAttachment) {
			this._changeAttachment.destroy();
		}
		this._clearEventAttachment.destroy();
		this._replaceEventAttachment.destroy();
		this._spliceEventAttachment.destroy();
		this._super();
	},
	
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		var oldItems = spliceResult.oldItems;
		var removedItems = spliceResult.getRemovedItems();
		
		if (this.clearItems && (3 * removedItems.length > 2 * oldItems.length)) {
			// if there is an effective clearing function, just reset the controller
			this.clearItems.call(this.scope, oldItems);
			this._addItems(this.source.getItems());
		} else {
			// else, splice the elements
			this._removeItems(removedItems);
			this._addItems(spliceResult.getAddedItems());
		}
	},
	
	_onReplace: function(params) {
		if (this.removeItem) {
			this.removeItem.call(this.scope, params.oldItem);
		}
		if (this.addItem) {
			this.addItem.call(this.scope, params.newItem);
		}
	},
	
	_onClear: function(params) {
		this._clearItems(params.items);
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T extends JW.Class> extends JW.AbstractArray.Orderer<T>`
 *
 * Конвертер оповещающего массива в массив (упорядочитель). Подробнее читайте JW.AbstractCollection.Orderer.
 *
 * @extends JW.AbstractArray.Orderer
 *
 * @constructor
 * Конструирует конвертер. Предпочтительнее использовать метод JW.AbstractCollection#createOrderer.
 * @param {JW.ObservableArray} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.ObservableArray.Orderer = function(source, config) {
	JW.ObservableArray.Orderer._super.call(this, source, config);
	this._spliceEventAttachment = source.spliceEvent.bind(this._onSplice, this);
	this._replaceEventAttachment = source.replaceEvent.bind(this._onReplace, this);
	this._clearEventAttachment = source.clearEvent.bind(this._onClear, this);
};

JW.extend(JW.ObservableArray.Orderer, JW.AbstractArray.Orderer, {
	/*
	JW.EventAttachment _spliceEventAttachment;
	JW.EventAttachment _replaceEventAttachment;
	JW.EventAttachment _clearEventAttachment;
	*/
	
	// override
	destroy: function() {
		this._clearEventAttachment.destroy();
		this._replaceEventAttachment.destroy();
		this._spliceEventAttachment.destroy();
		this._super();
	},
	
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		this._splice(
			JW.Array.toSet(spliceResult.getRemovedItems()),
			JW.Array.toSet(spliceResult.getAddedItems()));
	},
	
	_onReplace: function(params) {
		var index = this.target.keyOf(params.oldItem);
		this.target.trySplice(
			[new JW.AbstractArray.IndexCount(index, 1)],
			[new JW.AbstractArray.IndexItems(this.target.getLength() - 1, [params.newItem])]);
	},
	
	_onClear: function(params) {
		this.target.removeItems(params.items);
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T> extends JW.AbstractArray.Reverser<T>`
 *
 * Объединитель массивов. Подробнее читайте JW.AbstractArray.Reverser.
 *
 * @extends JW.AbstractArray.Reverser
 *
 * @constructor
 * Конструирует синхронизатор. Предпочтительнее использовать метод JW.AbstractArray#createReverser.
 * @param {JW.ObservableArray} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.ObservableArray.Reverser = function(source, config) {
	JW.ObservableArray.Reverser._super.call(this, source, config);
	this._spliceEventAttachment = source.spliceEvent.bind(this._onSplice, this);
	this._replaceEventAttachment = source.replaceEvent.bind(this._onReplace, this);
	this._moveEventAttachment = source.moveEvent.bind(this._onMove, this);
	this._clearEventAttachment = source.clearEvent.bind(this._onClear, this);
	this._reorderEventAttachment = source.reorderEvent.bind(this._onReorder, this);
};

JW.extend(JW.ObservableArray.Reverser, JW.AbstractArray.Reverser, {
	/*
	JW.EventAttachment _spliceEventAttachment;
	JW.EventAttachment _replaceEventAttachment;
	JW.EventAttachment _moveEventAttachment;
	JW.EventAttachment _clearEventAttachment;
	JW.EventAttachment _reorderEventAttachment;
	*/
	
	// override
	destroy: function() {
		this._reorderEventAttachment.destroy();
		this._clearEventAttachment.destroy();
		this._moveEventAttachment.destroy();
		this._replaceEventAttachment.destroy();
		this._spliceEventAttachment.destroy();
		this._super();
	},
	
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		var oldLength = this.target.getLength();
		var newLength = oldLength;
		
		var removeParamsList = JW.Array.map(spliceResult.removedItemsList, function(indexItems) {
			var length = indexItems.items.length;
			var index = oldLength - indexItems.index - length;
			newLength -= length;
			return new JW.AbstractArray.IndexCount(index, length);
		}, this);
		removeParamsList.reverse();
		
		var addedItemsList = spliceResult.addedItemsList.concat();
		addedItemsList.reverse();
		
		JW.Array.each(addedItemsList, function(indexItems) {
			newLength += indexItems.items.length;
		}, this);
		
		var addParamsList = JW.Array.map(addedItemsList, function(indexItems) {
			var items = indexItems.items;
			var length = items.length;
			var index = newLength - indexItems.index - length;
			return new JW.AbstractArray.IndexItems(index, this._reverse(items));
		}, this);
		
		this.target.trySplice(removeParamsList, addParamsList);
	},
	
	_onReplace: function(params) {
		this.target.trySet(params.newItem, this.target.getLength() - params.index - 1);
	},
	
	_onMove: function(params) {
		this.target.tryMove(
			this.target.getLength() - params.fromIndex - 1,
			this.target.getLength() - params.toIndex - 1);
	},
	
	_onClear: function(params) {
		this.target.tryClear();
	},
	
	_onReorder: function(params) {
		var indexArray = params.indexArray;
		var length = indexArray.length;
		var indexes = new Array(indexArray.length);
		for (var i = 0; i < length; ++i) {
			indexes[length - i - 1] = length - indexArray[i] - 1;
		}
		this.target.tryReorder(indexes);
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T> extends JW.AbstractArray.SorterComparing<T>`
 *
 * Конвертер оповещающего массива в массив (сортировщик по компаратору).
 * Подробнее читайте JW.AbstractCollection.SorterComparing.
 *
 * @extends JW.AbstractArray.SorterComparing
 *
 * @constructor
 * Конструирует конвертер. Предпочтительнее использовать метод JW.AbstractCollection#createSorterComparing.
 * @param {JW.ObservableArray} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.ObservableArray.SorterComparing = function(source, config) {
	JW.ObservableArray.SorterComparing._super.call(this, source, config);
	this._spliceEventAttachment = source.spliceEvent.bind(this._onSplice, this);
	this._replaceEventAttachment = source.replaceEvent.bind(this._onReplace, this);
	this._clearEventAttachment = source.clearEvent.bind(this._onClear, this);
};

JW.extend(JW.ObservableArray.SorterComparing, JW.AbstractArray.SorterComparing, {
	/*
	JW.EventAttachment _spliceEventAttachment;
	JW.EventAttachment _replaceEventAttachment;
	JW.EventAttachment _clearEventAttachment;
	*/
	
	// override
	destroy: function() {
		this._clearEventAttachment.destroy();
		this._replaceEventAttachment.destroy();
		this._spliceEventAttachment.destroy();
		this._super();
	},
	
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		this._splice(spliceResult.getRemovedItems(), spliceResult.getAddedItems());
	},
	
	_onReplace: function(params) {
		this._splice([params.oldItem], [params.newItem]);
	},
	
	_onClear: function(params) {
		this._splice(params.items, []);
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

JW.ObservableArray.Splitter = JW.AbstractArray.Splitter.extend();

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T> extends JW.AbstractMap<T>`
 *
 * Оповещающий словарь. Структурированный список методов смотрите в JW.AbstractMap.
 *
 * @extends JW.AbstractMap
 *
 * @constructor
 * @param {Object} [items] Изначальное содержимое словаря. По умолчанию, создается пустой словарь.
 * @param {boolean} [adapter] Создать словарь как адаптер над items. По умолчанию, равен false, т.е. создается
 * копия словаря items.
 */
JW.ObservableMap = function(json, adapter) {
	JW.ObservableMap._super.call(this, json, adapter);
	this.spliceEvent = new JW.Event();
	this.reindexEvent = new JW.Event();
	this.clearEvent = new JW.Event();
	this.changeEvent = new JW.Event();
	this.lengthChangeEvent = new JW.Event();
	this._lastLength = this.getLength();
};

JW.extend(JW.ObservableMap, JW.AbstractMap, {
	/**
	 * @event spliceEvent
	 * Элементы удалены/добавлены в словарь. Возникает в результате запуска
	 * метода #set, #trySet, #setAll, #trySetAll, #remove, #tryRemove, #removeItem, #removeAll, #tryRemoveAll,
	 * {@link #removeItems}, #splice, #trySplice, #performSplice.
	 * @param {JW.ObservableMap.SpliceEventParams} params `<T>` Параметры.
	 */
	/**
	 * @event reindexEvent
	 * Изменены ключи элементов в словаре. Возникает в результате запуска
	 * метода #setKey, #trySetKey, #reindex, #tryReindex, #performReindex.
	 * @param {JW.ObservableMap.ReindexEventParams} params `<T>` Параметры.
	 */
	/**
	 * @event clearEvent
	 * Словарь очищен. Возникает в результате запуска
	 * метода #clear, #$clear, #tryClear.
	 * @param {JW.ObservableMap.ItemsEventParams} params
	 * `<T>` Параметры. JW.ObservableMap.ItemsEventParams#items обозначает бывшее содержимое коллекции.
	 */
	/**
	 * @event changeEvent
	 * Словарь изменен. Возникает после одного из
	 * событий #spliceEvent, #reindexEvent, #clearEvent.
	 * @param {JW.ObservableMap.EventParams} params `<T>` Параметры.
	 */
	/**
	 * @event lengthChangeEvent
	 * Изменен размер словаря. Возникает после события #changeEvent в случае изменения размера.
	 * @param {JW.ObservableMap.LengthChangeEventParams} params `<T>` Параметры.
	 */
	
	// override
	destroy: function() {
		this.lengthChangeEvent.destroy();
		this.changeEvent.destroy();
		this.clearEvent.destroy();
		this.reindexEvent.destroy();
		this.spliceEvent.destroy();
		this._super();
	},
	
	// override
	trySplice: function(removedKeys, updatedItems) {
		var spliceResult = this._super(removedKeys, updatedItems);
		if (spliceResult === undefined) {
			return;
		}
		this.spliceEvent.trigger(new JW.ObservableMap.SpliceEventParams(this, spliceResult));
		this._triggerChange();
		return spliceResult;
	},
	
	// override
	tryClear: function() {
		var items = this._super();
		if (items === undefined) {
			return;
		}
		this.clearEvent.trigger(new JW.ObservableMap.ItemsEventParams(this, items));
		this._triggerChange();
		return items;
	},
	
	// override
	tryReindex: function(keyMap) {
		var result = this._super(keyMap);
		if (result === undefined) {
			return;
		}
		this.reindexEvent.trigger(new JW.ObservableMap.ReindexEventParams(this, result));
		this._triggerChange();
		return result;
	},
	
	/**
	 * `<U>` Конструирует пустую коллекцию того же типа.
	 * @returns {JW.ObservableMap} `<U>` Коллекция.
	 */
	createEmpty: function() {
		return new JW.ObservableMap();
	},
	
	/**
	 * `<U>` Конструирует пустой массив того же типа (простой или оповещающий).
	 * @returns {JW.ObservableArray} `<U>` Массив.
	 */
	createEmptyArray: function() {
		return new JW.ObservableArray();
	},
	
	/**
	 * `<U>` Конструирует пустой словарь того же типа (простой или оповещающий).
	 * @returns {JW.ObservableMap} `<U>` Словарь.
	 */
	createEmptyMap: function() {
		return new JW.ObservableMap();
	},
	
	/**
	 * `<U>` Конструирует пустое множество того же типа (простое или оповещающее).
	 * @returns {JW.ObservableSet} `<U>` Множество.
	 */
	createEmptySet: function() {
		return new JW.ObservableSet();
	},
	
	/**
	 * `<U>` Конструирует конвертер элементов коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.ObservableMap.Mapper}
	 * `<T, U>` Синхронизатор.
	 */
	createMapper: function(config) {
		return new JW.ObservableMap.Mapper(this, config);
	},
	
	/**
	 * Конструирует фильтровщик коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.ObservableMap.Filterer}
	 * `<T>` Синхронизатор.
	 */
	createFilterer: function(config) {
		return new JW.ObservableMap.Filterer(this, config);
	},
	
	/**
	 * Конструирует наблюдатель коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.ObservableMap.Observer}
	 * `<T>` Синхронизатор.
	 */
	createObserver: function(config) {
		return new JW.ObservableMap.Observer(this, config);
	},
	
	/**
	 * Конструирует конвертер коллекции в массив (упорядочитель).
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.ObservableMap.Orderer}
	 * `<T>` Синхронизатор.
	 */
	createOrderer: function(config) {
		return new JW.ObservableMap.Orderer(this, config);
	},
	
	/**
	 * Конструирует конвертер коллекции в массив (сортировщик по компаратору).
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.ObservableMap.SorterComparing}
	 * `<T>` Синхронизатор.
	 */
	createSorterComparing: function(config) {
		return new JW.ObservableMap.SorterComparing(this, config);
	},
	
	/**
	 * Конструирует индексатор коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.ObservableMap.Indexer}
	 * `<T>` Синхронизатор.
	 */
	createIndexer: function(config) {
		return new JW.ObservableMap.Indexer(this, config);
	},
	
	/**
	 * Конструирует конвертер коллекции в множество.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.ObservableMap.Lister}
	 * `<T>` Синхронизатор.
	 */
	createLister: function(config) {
		return new JW.ObservableMap.Lister(this, config);
	},
	
	/**
	 * Конструирует синхронизатор представления с массивом.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.ObservableMap.Inserter}
	 * `<T>` Синхронизатор.
	 */
	createInserter: function(config) {
		return new JW.ObservableMap.Inserter(this, config);
	},
	
	_triggerChange: function() {
		this.changeEvent.trigger(new JW.ObservableMap.EventParams(this));
		var newLength = this.getLength();
		if (this._lastLength !== newLength) {
			this.lengthChangeEvent.trigger(new JW.ObservableMap.LengthChangeEventParams(this, this._lastLength, newLength));
			this._lastLength = newLength;
		}
	}
});

/**
 * @class
 * `<T>` Параметры события JW.ObservableMap.
 * @extends JW.EventParams
 *
 * @constructor
 * @param {JW.ObservableMap} sender `<T>` Отправитель события.
 */
JW.ObservableMap.EventParams = function(sender) {
	JW.ObservableMap.EventParams._super.call(this, sender);
};

JW.extend(JW.ObservableMap.EventParams, JW.EventParams, {
	/**
	 * @property {JW.ObservableMap} sender `<T>` Отправитель события.
	 */
});

/**
 * @class
 *
 * `<T> extends JW.ObservableMap.EventParams<T>`
 *
 * Параметры события JW.ObservableMap#spliceEvent.
 *
 * @extends JW.ObservableMap.EventParams
 *
 * @constructor
 * @param {JW.ObservableMap} sender `<T>` Отправитель события.
 * @param {JW.AbstractMap.SpliceResult} spliceResult `<T>` Результат метода JW.AbstractMap#splice.
 */
JW.ObservableMap.SpliceEventParams = function(sender, spliceResult) {
	JW.ObservableMap.SpliceEventParams._super.call(this, sender);
	this.spliceResult = spliceResult;
};

JW.extend(JW.ObservableMap.SpliceEventParams, JW.ObservableMap.EventParams, {
	/**
	 * @property {JW.AbstractMap.SpliceResult} spliceResult `<T>` Результат метода JW.AbstractMap#splice.
	 */
});

/**
 * @class
 *
 * `<T> extends JW.ObservableMap.EventParams<T>`
 *
 * Параметры события JW.ObservableMap#reindexEvent.
 *
 * @extends JW.ObservableMap.EventParams
 *
 * @constructor
 * @param {JW.ObservableMap} sender `<T>` Отправитель события.
 * @param {Object} keyMap Ключи элементов в измененном словаре.
 */
JW.ObservableMap.ReindexEventParams = function(sender, keyMap) {
	JW.ObservableMap.ReindexEventParams._super.call(this, sender);
	this.keyMap = keyMap;
};

JW.extend(JW.ObservableMap.ReindexEventParams/*<T>*/, JW.ObservableMap.EventParams/*<T>*/, {
	/**
	 * @property {Object} keyMap Ключи элементов в измененном словаре.
	 */
});

/**
 * @class
 *
 * `<T> extends JW.ObservableMap.EventParams<T>`
 *
 * Параметры события JW.ObservableMap с элементами.
 *
 * @extends JW.ObservableMap.EventParams
 *
 * @constructor
 * @param {JW.ObservableMap} sender `<T>` Отправитель события.
 * @param {Object} items Набор элементов.
 */
JW.ObservableMap.ItemsEventParams = function(sender, items) {
	JW.ObservableMap.ItemsEventParams._super.call(this, sender);
	this.items = items;
};

JW.extend(JW.ObservableMap.ItemsEventParams, JW.ObservableMap.EventParams, {
	/**
	 * @property {Object} items Набор элементов.
	 */
});

/**
 * @class
 *
 * `<T> extends JW.ObservableMap.EventParams<T>`
 *
 * Параметры события JW.ObservableMap#lengthChangeEvent.
 *
 * @extends JW.ObservableMap.EventParams
 *
 * @constructor
 * @param {JW.ObservableMap} sender `<T>` Отправитель события.
 * @param {number} oldLength Старый размер коллекции.
 * @param {number} newLength Новый размер коллекции.
 */
JW.ObservableMap.LengthChangeEventParams = function(sender, oldLength, newLength) {
	JW.ObservableMap.LengthChangeEventParams._super.call(this, sender);
	this.oldLength = oldLength;
	this.newLength = newLength;
};

JW.extend(JW.ObservableMap.LengthChangeEventParams/*<T>*/, JW.ObservableMap.EventParams/*<T>*/, {
	/**
	 * @property {number} oldLength Старый размер коллекции.
	 */
	/**
	 * @property {number} newLength Новый размер коллекции.
	 */
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T> extends JW.AbstractMap.Filterer<T>`
 *
 * Фильтровщик оповещающего словаря. Подробнее читайте JW.AbstractCollection.Filterer.
 *
 * @extends JW.AbstractMap.Filterer
 *
 * @constructor
 * Конструирует синхронизатор. Предпочтительнее использовать метод JW.AbstractCollection#createFilterer.
 * @param {JW.ObservableMap} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.ObservableMap.Filterer = function(source, config) {
	JW.ObservableMap.Filterer._super.call(this, source, config);
	this._spliceEventAttachment = source.spliceEvent.bind(this._onSplice, this);
	this._reindexEventAttachment = source.reindexEvent.bind(this._onReindex, this);
	this._clearEventAttachment = source.clearEvent.bind(this._onClear, this);
};

JW.extend(JW.ObservableMap.Filterer, JW.AbstractMap.Filterer, {
	/*
	JW.EventAttachment _spliceEventAttachment;
	JW.EventAttachment _reindexEventAttachment;
	JW.EventAttachment _clearEventAttachment;
	*/
	
	// override
	destroy: function() {
		this._clearEventAttachment.destroy();
		this._reindexEventAttachment.destroy();
		this._spliceEventAttachment.destroy();
		this._super();
	},
	
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		this.target.trySplice(
			JW.Map.getKeys(spliceResult.removedItems),
			JW.Map.filter(spliceResult.addedItems, this.filterItem, this.scope));
	},
	
	_onReindex: function(params) {
		this.target.tryReindex(params.keyMap);
	},
	
	_onClear: function(params) {
		this.target.tryRemoveAll(JW.Map.getKeys(params.items));
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T> extends JW.AbstractMap.Indexer<T>`
 *
 * Индексатор оповещающего словаря. Подробнее читайте JW.AbstractCollection.Indexer.
 *
 * @extends JW.AbstractMap.Indexer
 *
 * @constructor
 * Конструирует синхронизатор. Предпочтительнее использовать метод JW.AbstractCollection#createIndexer.
 * @param {JW.ObservableMap} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.ObservableMap.Indexer = function(source, config) {
	JW.ObservableMap.Indexer._super.call(this, source, config);
	this._spliceEventAttachment = this.source.spliceEvent.bind(this._onSplice, this);
	this._clearEventAttachment = this.source.clearEvent.bind(this._onClear, this);
};

JW.extend(JW.ObservableMap.Indexer, JW.AbstractMap.Indexer, {
	/*
	JW.EventAttachment _spliceEventAttachment;
	JW.EventAttachment _clearEventAttachment;
	*/
	
	// override
	destroy: function() {
		this._clearEventAttachment.destroy();
		this._spliceEventAttachment.destroy();
		this._super();
	},
	
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		this.target.trySplice(
			this._keys(JW.Map.toArray(spliceResult.removedItems)),
			this._index(JW.Map.toArray(spliceResult.addedItems)));
	},
	
	_onClear: function(params) {
		this.target.tryRemoveAll(
			this._keys(JW.Map.toArray(params.items)));
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T> extends JW.AbstractMap.Inserter<T>`
 *
 * Синхронизатор представления оповещающего словаря. Подробнее читайте JW.AbstractMap.Inserter.
 *
 * @extends JW.AbstractMap.Inserter
 *
 * @constructor
 * Конструирует синхронизатор. Предпочтительнее использовать метод JW.AbstractMap#createInserter.
 * @param {JW.ObservableMap} source `<T>` Исходный словарь.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.ObservableMap.Inserter = function(source, config) {
	JW.ObservableMap.Inserter._super.call(this, source, config);
	this._spliceEventAttachment = source.spliceEvent.bind(this._onSplice, this);
	this._reindexEventAttachment = source.reindexEvent.bind(this._onReindex, this);
	this._clearEventAttachment = source.clearEvent.bind(this._onClear, this);
};

JW.extend(JW.ObservableMap.Inserter, JW.AbstractMap.Inserter, {
	/*
	JW.EventAttachment _spliceEventAttachment;
	JW.EventAttachment _reindexEventAttachment;
	JW.EventAttachment _clearEventAttachment;
	*/
	
	// override
	destroy: function() {
		this._clearEventAttachment.destroy();
		this._reindexEventAttachment.destroy();
		this._spliceEventAttachment.destroy();
		this._super();
	},
	
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		this._removeItems(spliceResult.removedItems);
		this._addItems(spliceResult.addedItems);
	},
	
	_onReindex: function(params) {
		var keyMap = params.keyMap;
		for (var oldKey in keyMap) {
			var newKey = keyMap[oldKey];
			var item = this.source.get(newKey);
			if (this.removeItem) {
				this.removeItem.call(this.scope, oldKey, item);
			}
			if (this.addItem) {
				this.addItem.call(this.scope, item, newKey);
			}
		}
	},
	
	_onClear: function(params) {
		this._clearItems(params.items);
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T extends JW.Class> extends JW.AbstractMap.Lister<T>`
 *
 * Конвертер оповещающего словаря в множество. Подробнее читайте JW.AbstractCollection.Lister.
 *
 * @extends JW.AbstractMap.Lister
 *
 * @constructor
 * Конструирует конвертер. Предпочтительнее использовать метод JW.AbstractCollection#createLister.
 * @param {JW.ObservableMap} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.ObservableMap.Lister = function(source, config) {
	JW.ObservableMap.Lister._super.call(this, source, config);
	this._spliceEventAttachment = this.source.spliceEvent.bind(this._onSplice, this);
	this._clearEventAttachment = this.source.clearEvent.bind(this._onClear, this);
};

JW.extend(JW.ObservableMap.Lister, JW.AbstractMap.Lister, {
	/*
	JW.EventAttachment _spliceEventAttachment;
	JW.EventAttachment _clearEventAttachment;
	*/
	
	// override
	destroy: function() {
		this._clearEventAttachment.destroy();
		this._spliceEventAttachment.destroy();
		this._super();
	},
	
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		this.target.trySplice(
			JW.Map.toArray(spliceResult.removedItems),
			JW.Map.toArray(spliceResult.addedItems));
	},
	
	_onClear: function(params) {
		this.target.tryRemoveAll(
			JW.Map.toArray(params.items));
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T, U> extends JW.AbstractMap.Mapper<T, U>`
 *
 * Конвертер элементов оповещающего словаря. Подробнее читайте JW.AbstractCollection.Mapper.
 *
 * @extends JW.AbstractMap.Mapper
 *
 * @constructor
 * Конструирует синхронизатор. Предпочтительнее использовать метод JW.AbstractCollection#createMapper.
 * @param {JW.ObservableMap} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.ObservableMap.Mapper = function(source, config) {
	JW.ObservableMap.Mapper._super.call(this, source, config);
	this._spliceEventAttachment = source.spliceEvent.bind(this._onSplice, this);
	this._reindexEventAttachment = source.reindexEvent.bind(this._onReindex, this);
	this._clearEventAttachment = source.clearEvent.bind(this._onClear, this);
};

JW.extend(JW.ObservableMap.Mapper, JW.AbstractMap.Mapper, {
	/*
	JW.EventAttachment _spliceEventAttachment;
	JW.EventAttachment _reindexEventAttachment;
	JW.EventAttachment _clearEventAttachment;
	*/
	
	// override
	destroy: function() {
		this._clearEventAttachment.destroy();
		this._reindexEventAttachment.destroy();
		this._spliceEventAttachment.destroy();
		this._super();
	},
	
	_onSplice: function(params) {
		var sourceResult = params.spliceResult;
		var removedDatas = sourceResult.removedItems;
		var addedDatas = sourceResult.addedItems;
		var targetResult = this.target.trySplice(
			JW.Map.getRemovedKeys(removedDatas, addedDatas),
			this._createItems(addedDatas));
		if (targetResult !== undefined) {
			this._destroyItems(targetResult.removedItems, removedDatas);
		}
	},
	
	_onReindex: function(params) {
		this.target.tryReindex(params.keyMap);
	},
	
	_onClear: function(params) {
		var datas = params.items;
		this._destroyItems(this.target.tryRemoveAll(JW.Map.getKeys(datas)), datas);
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T> extends JW.AbstractMap.Observer<T>`
 *
 * Наблюдатель оповещающего словаря. Подробнее читайте JW.AbstractCollection.Observer.
 *
 * @extends JW.AbstractMap.Observer
 *
 * @constructor
 * Конструирует синхронизатор. Предпочтительнее использовать метод JW.AbstractCollection#createObserver.
 * @param {JW.ObservableMap} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.ObservableMap.Observer = function(source, config) {
	JW.ObservableMap.Observer._super.call(this, source, config);
	this._spliceEventAttachment = source.spliceEvent.bind(this._onSplice, this);
	this._clearEventAttachment = source.clearEvent.bind(this._onClear, this);
	if (this.change) {
		this._changeAttachment = source.changeEvent.bind(this._onChange, this);
	}
};

JW.extend(JW.ObservableMap.Observer, JW.AbstractMap.Observer, {
	/*
	JW.EventAttachment _spliceEventAttachment;
	JW.EventAttachment _clearEventAttachment;
	JW.EventAttachment _changeAttachment;
	*/
	
	// override
	destroy: function() {
		if (this._changeAttachment) {
			this._changeAttachment.destroy();
		}
		this._clearEventAttachment.destroy();
		this._spliceEventAttachment.destroy();
		this._super();
	},
	
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		this._removeItems(JW.Map.toArray(spliceResult.removedItems));
		this._addItems(JW.Map.toArray(spliceResult.addedItems));
	},
	
	_onClear: function(params) {
		this._clearItems(JW.Map.toArray(params.items));
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T extends JW.Class> extends JW.AbstractMap.Orderer<T>`
 *
 * Конвертер оповещающего словаря в массив (упорядочитель). Подробнее читайте JW.AbstractCollection.Orderer.
 *
 * @extends JW.AbstractMap.Orderer
 *
 * @constructor
 * Конструирует конвертер. Предпочтительнее использовать метод JW.AbstractCollection#createOrderer.
 * @param {JW.ObservableMap} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.ObservableMap.Orderer = function(source, config) {
	JW.ObservableMap.Orderer._super.call(this, source, config);
	this._spliceEventAttachment = source.spliceEvent.bind(this._onSplice, this);
	this._clearEventAttachment = source.clearEvent.bind(this._onClear, this);
};

JW.extend(JW.ObservableMap.Orderer, JW.AbstractMap.Orderer, {
	/*
	JW.EventAttachment _spliceEventAttachment;
	JW.EventAttachment _clearEventAttachment;
	*/
	
	// override
	destroy: function() {
		this._clearEventAttachment.destroy();
		this._spliceEventAttachment.destroy();
		this._super();
	},
	
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		this._splice(
			JW.Map.toSet(spliceResult.removedItems),
			JW.Map.toSet(spliceResult.addedItems));
	},
	
	_onClear: function(params) {
		this.target.removeItems(
			JW.Map.toArray(params.items));
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T> extends JW.AbstractMap.SorterComparing<T>`
 *
 * Конвертер оповещающего словаря в массив (сортировщик по компаратору).
 * Подробнее читайте JW.AbstractCollection.SorterComparing.
 *
 * @extends JW.AbstractMap.SorterComparing
 *
 * @constructor
 * Конструирует конвертер. Предпочтительнее использовать метод JW.AbstractCollection#createSorterComparing.
 * @param {JW.ObservableMap} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.ObservableMap.SorterComparing = function(source, config) {
	JW.ObservableMap.SorterComparing._super.call(this, source, config);
	this._spliceEventAttachment = source.spliceEvent.bind(this._onSplice, this);
	this._clearEventAttachment = source.clearEvent.bind(this._onClear, this);
};

JW.extend(JW.ObservableMap.SorterComparing, JW.AbstractMap.SorterComparing, {
	/*
	JW.EventAttachment _spliceEventAttachment;
	JW.EventAttachment _clearEventAttachment;
	*/
	
	// override
	destroy: function() {
		this._clearEventAttachment.destroy();
		this._spliceEventAttachment.destroy();
		this._super();
	},
	
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		this._splice(
			JW.Map.toArray(spliceResult.removedItems),
			JW.Map.toArray(spliceResult.addedItems));
	},
	
	_onClear: function(params) {
		this._splice(JW.Map.toArray(params.items), []);
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T> extends JW.AbstractSet<T>`
 *
 * Оповещающее множество. Структурированный список методов смотрите в JW.AbstractSet.
 *
 * @extends JW.AbstractSet
 *
 * @constructor
 * @param {Array} [items] `<T>` Изначальное содержимое множества. По умолчанию, создается пустое множество.
 * @param {boolean} [adapter] Создать множество как адаптер над items (тогда это должен быть Object, а не Array).
 * По умолчанию, равен false.
 */
JW.ObservableSet = function(json, adapter) {
	JW.ObservableSet._super.call(this, json, adapter);
	this.spliceEvent = new JW.Event();
	this.clearEvent = new JW.Event();
	this.changeEvent = new JW.Event();
	this.lengthChangeEvent = new JW.Event();
	this._lastLength = this.getLength();
};

JW.extend(JW.ObservableSet, JW.AbstractSet, {
	/**
	 * @event spliceEvent
	 * Элементы удалены/добавлены в множество. Возникает в результате запуска
	 * метода #add, #tryAdd, #addAll, #$addAll, #tryAddAll, #remove, #tryRemove, #removeItem, #removeAll, #$removeAll,
	 * {@link #tryRemoveAll}, #removeItems, #splice, #trySplice, #performSplice.
	 * @param {JW.ObservableSet.SpliceEventParams} params `<T>` Параметры.
	 */
	/**
	 * @event clearEvent
	 * Множество очищено. Возникает в результате запуска
	 * метода #clear, #$clear, #tryClear.
	 * @param {JW.ObservableSet.ItemsEventParams} params
	 * `<T>` Параметры. JW.ObservableSet.ItemsEventParams#items обозначает бывшее содержимое коллекции.
	 */
	/**
	 * @event changeEvent
	 * Множество изменено. Возникает после одного из
	 * событий #spliceEvent, #clearEvent.
	 * @param {JW.ObservableSet.EventParams} params `<T>` Параметры.
	 */
	/**
	 * @event lengthChangeEvent
	 * Изменен размер множества. Возникает после события #changeEvent в случае изменения размера.
	 * @param {JW.ObservableSet.LengthChangeEventParams} params `<T>` Параметры.
	 */
	
	// override
	destroy: function() {
		this.lengthChangeEvent.destroy();
		this.changeEvent.destroy();
		this.clearEvent.destroy();
		this.spliceEvent.destroy();
		this._super();
	},
	
	// override
	tryClear: function() {
		var items = this._super();
		if (items === undefined) {
			return;
		}
		this.clearEvent.trigger(new JW.ObservableSet.ItemsEventParams(this, items));
		this._triggerChange();
		return items;
	},
	
	// override
	trySplice: function(removedItems, addedItems) {
		var spliceResult = this._super(removedItems, addedItems);
		if (spliceResult === undefined) {
			return;
		}
		this.spliceEvent.trigger(new JW.ObservableSet.SpliceEventParams(this, spliceResult));
		this._triggerChange();
		return spliceResult;
	},
	
	/**
	 * `<U>` Конструирует пустую коллекцию того же типа.
	 * @returns {JW.ObservableSet} `<U>` Коллекция.
	 */
	createEmpty: function() {
		return new JW.ObservableSet();
	},
	
	/**
	 * `<U>` Конструирует пустой массив того же типа (простой или оповещающий).
	 * @returns {JW.ObservableArray} `<U>` Массив.
	 */
	createEmptyArray: function() {
		return new JW.ObservableArray();
	},
	
	/**
	 * `<U>` Конструирует пустой словарь того же типа (простой или оповещающий).
	 * @returns {JW.ObservableMap} `<U>` Словарь.
	 */
	createEmptyMap: function() {
		return new JW.ObservableMap();
	},
	
	/**
	 * `<U>` Конструирует пустое множество того же типа (простое или оповещающее).
	 * @returns {JW.ObservableSet} `<U>` Множество.
	 */
	createEmptySet: function() {
		return new JW.ObservableSet();
	},
	
	/**
	 * `<U>` Конструирует конвертер элементов коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.ObservableSet.Mapper}
	 * `<T, U>` Синхронизатор.
	 */
	createMapper: function(config) {
		return new JW.ObservableSet.Mapper(this, config);
	},
	
	/**
	 * Конструирует фильтровщик коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.ObservableSet.Filterer}
	 * `<T>` Синхронизатор.
	 */
	createFilterer: function(config) {
		return new JW.ObservableSet.Filterer(this, config);
	},
	
	/**
	 * Конструирует наблюдатель коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.ObservableSet.Observer}
	 * `<T>` Синхронизатор.
	 */
	createObserver: function(config) {
		return new JW.ObservableSet.Observer(this, config);
	},
	
	/**
	 * Конструирует конвертер коллекции в массив (упорядочитель).
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.ObservableSet.Orderer}
	 * `<T>` Синхронизатор.
	 */
	createOrderer: function(config) {
		return new JW.ObservableSet.Orderer(this, config);
	},
	
	/**
	 * Конструирует конвертер коллекции в массив (сортировщик по компаратору).
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.ObservableSet.SorterComparing}
	 * `<T>` Синхронизатор.
	 */
	createSorterComparing: function(config) {
		return new JW.ObservableSet.SorterComparing(this, config);
	},
	
	/**
	 * Конструирует индексатор коллекции.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.ObservableSet.Indexer}
	 * `<T>` Синхронизатор.
	 */
	createIndexer: function(config) {
		return new JW.ObservableSet.Indexer(this, config);
	},
	
	/**
	 * Конструирует конвертер коллекции в множество.
	 * Автоматически подбирает наиболее подходящую реализацию синхронизатора.
	 * @param {Object} config Конфигурация (см. Config options синхронизатора).
	 * @returns {JW.ObservableSet.Lister}
	 * `<T>` Синхронизатор.
	 */
	createLister: function(config) {
		return new JW.ObservableSet.Lister(this, config);
	},
	
	_triggerChange: function() {
		this.changeEvent.trigger(new JW.ObservableSet.EventParams(this));
		var newLength = this.getLength();
		if (this._lastLength !== newLength) {
			this.lengthChangeEvent.trigger(new JW.ObservableSet.LengthChangeEventParams(this, this._lastLength, newLength));
			this._lastLength = newLength;
		}
	}
});

/**
 * @class
 * `<T>` Параметры события JW.ObservableSet.
 * @extends JW.EventParams
 *
 * @constructor
 * @param {JW.ObservableSet} sender `<T>` Отправитель события.
 */
JW.ObservableSet.EventParams = function(sender) {
	JW.ObservableSet.EventParams._super.call(this, sender);
};

JW.extend(JW.ObservableSet.EventParams, JW.EventParams, {
	/**
	 * @property {JW.ObservableSet} sender `<T>` Отправитель события.
	 */
});

/**
 * @class
 *
 * `<T> extends JW.ObservableSet.EventParams<T>`
 *
 * Параметры события JW.ObservableSet#spliceEvent.
 *
 * @extends JW.ObservableSet.EventParams
 *
 * @constructor
 * @param {JW.ObservableSet} sender `<T>` Отправитель события.
 * @param {JW.AbstractSet.SpliceResult} spliceResult `<T>` Результат метода JW.AbstractSet#splice.
 */
JW.ObservableSet.SpliceEventParams = function(sender, spliceResult) {
	JW.ObservableSet.SpliceEventParams._super.call(this, sender);
	this.spliceResult = spliceResult;
};

JW.extend(JW.ObservableSet.SpliceEventParams, JW.ObservableSet.EventParams, {
	/**
	 * @property {JW.AbstractSet.SpliceResult} spliceResult `<T>` Результат метода JW.AbstractSet#splice.
	 */
});

/**
 * @class
 *
 * `<T> extends JW.ObservableSet.EventParams<T>`
 *
 * Параметры события JW.ObservableSet с элементами.
 *
 * @extends JW.ObservableSet.EventParams
 *
 * @constructor
 * @param {JW.ObservableSet} sender `<T>` Отправитель события.
 * @param {Array} items `<T>` Набор элементов.
 */
JW.ObservableSet.ItemsEventParams = function(sender, items) {
	JW.ObservableSet.ItemsEventParams._super.call(this, sender);
	this.items = items;
};

JW.extend(JW.ObservableSet.ItemsEventParams, JW.ObservableSet.EventParams, {
	/**
	 * @property {Array} items `<T>` Набор элементов.
	 */
});

/**
 * @class
 *
 * `<T> extends JW.ObservableSet.EventParams<T>`
 *
 * Параметры события JW.ObservableSet#lengthChangeEvent.
 *
 * @extends JW.ObservableSet.EventParams
 *
 * @constructor
 * @param {JW.ObservableSet} sender `<T>` Отправитель события.
 * @param {number} oldLength Старый размер коллекции.
 * @param {number} newLength Новый размер коллекции.
 */
JW.ObservableSet.LengthChangeEventParams = function(sender, oldLength, newLength) {
	JW.ObservableSet.LengthChangeEventParams._super.call(this, sender);
	this.oldLength = oldLength;
	this.newLength = newLength;
};

JW.extend(JW.ObservableSet.LengthChangeEventParams, JW.ObservableSet.EventParams, {
	/**
	 * @property {number} oldLength Старый размер коллекции.
	 */
	/**
	 * @property {number} newLength Новый размер коллекции.
	 */
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T extends JW.Class> extends JW.AbstractSet.Filterer<T>`
 *
 * Фильтровщик оповещающего множества. Подробнее читайте JW.AbstractCollection.Filterer.
 *
 * @extends JW.AbstractSet.Filterer
 *
 * @constructor
 * Конструирует синхронизатор. Предпочтительнее использовать метод JW.AbstractCollection#createFilterer.
 * @param {JW.ObservableSet} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.ObservableSet.Filterer = function(source, config) {
	JW.ObservableSet.Filterer._super.call(this, source, config);
	this._spliceEventAttachment = source.spliceEvent.bind(this._onSplice, this);
	this._clearEventAttachment = source.clearEvent.bind(this._onClear, this);
};

JW.extend(JW.ObservableSet.Filterer, JW.AbstractSet.Filterer, {
	/*
	JW.EventAttachment _spliceEventAttachment;
	JW.EventAttachment _clearEventAttachment;
	*/
	
	// override
	destroy: function() {
		this._clearEventAttachment.destroy();
		this._spliceEventAttachment.destroy();
		this._super();
	},
	
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		this.target.trySplice(
			spliceResult.removedItems,
			JW.Array.filter(spliceResult.addedItems, this.filterItem, this.scope));
	},
	
	_onClear: function(params) {
		this.target.tryRemoveAll(params.items);
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T extends JW.Class> extends JW.AbstractSet.Indexer<T>`
 *
 * Индексатор оповещающего множества. Подробнее читайте JW.AbstractCollection.Indexer.
 *
 * @extends JW.AbstractSet.Indexer
 *
 * @constructor
 * Конструирует синхронизатор. Предпочтительнее использовать метод JW.AbstractCollection#createIndexer.
 * @param {JW.ObservableSet} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.ObservableSet.Indexer = function(source, config) {
	JW.ObservableSet.Indexer._super.call(this, source, config);
	this._spliceEventAttachment = this.source.spliceEvent.bind(this._onSplice, this);
	this._clearEventAttachment = this.source.clearEvent.bind(this._onClear, this);
};

JW.extend(JW.ObservableSet.Indexer, JW.AbstractSet.Indexer, {
	/*
	JW.EventAttachment _spliceEventAttachment;
	JW.EventAttachment _clearEventAttachment;
	*/
	
	// override
	destroy: function() {
		this._clearEventAttachment.destroy();
		this._spliceEventAttachment.destroy();
		this._super();
	},
	
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		this.target.trySplice(
			this._keys(spliceResult.removedItems),
			this._index(spliceResult.addedItems));
	},
	
	_onClear: function(params) {
		this.target.tryRemoveAll(
			this._keys(params.items));
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T extends JW.Class> extends JW.AbstractSet.Lister<T>`
 *
 * Конвертер оповещающего множества в множество. Подробнее читайте JW.AbstractCollection.Lister.
 *
 * @extends JW.AbstractSet.Lister
 *
 * @constructor
 * Конструирует конвертер. Предпочтительнее использовать метод JW.AbstractCollection#createLister.
 * @param {JW.ObservableSet} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.ObservableSet.Lister = function(source, config) {
	JW.ObservableSet.Lister._super.call(this, source, config);
	this._spliceEventAttachment = this.source.spliceEvent.bind(this._onSplice, this);
	this._clearEventAttachment = this.source.clearEvent.bind(this._onClear, this);
};

JW.extend(JW.ObservableSet.Lister, JW.AbstractSet.Lister, {
	/*
	JW.EventAttachment _spliceEventAttachment;
	JW.EventAttachment _clearEventAttachment;
	*/
	
	// override
	destroy: function() {
		this._clearEventAttachment.destroy();
		this._spliceEventAttachment.destroy();
		this._super();
	},
	
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		this.target.trySplice(spliceResult.removedItems, spliceResult.addedItems);
	},
	
	_onClear: function(params) {
		this.target.tryRemoveAll(params.items);
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T extends JW.Class, U extends JW.Class> extends JW.AbstractSet.Mapper<T, U>`
 *
 * Конвертер элементов оповещающего множества. Подробнее читайте JW.AbstractCollection.Mapper.
 *
 * @extends JW.AbstractSet.Mapper
 *
 * @constructor
 * Конструирует синхронизатор. Предпочтительнее использовать метод JW.AbstractCollection#createMapper.
 * @param {JW.ObservableSet} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.ObservableSet.Mapper = function(source, config) {
	JW.ObservableSet.Mapper._super.call(this, source, config);
	this._spliceEventAttachment = source.spliceEvent.bind(this._onSplice, this);
	this._clearEventAttachment = source.clearEvent.bind(this._onClear, this);
};

JW.extend(JW.ObservableSet.Mapper, JW.AbstractSet.Mapper, {
	/*
	EventAttachment _spliceEventAttachment;
	EventAttachment _clearEventAttachment;
	*/
	
	// override
	destroy: function() {
		this._clearEventAttachment.destroy();
		this._spliceEventAttachment.destroy();
		this._super();
	},
	
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		var removedDatas = spliceResult.removedItems;
		var addedDatas = spliceResult.addedItems;
		this.target.trySplice(this._getItems(removedDatas), this._createItems(addedDatas));
		this._destroyItems(removedDatas);
	},
	
	_onClear: function(params) {
		var datas = params.items;
		this.target.tryRemoveAll(this._getItems(datas));
		this._destroyItems(datas);
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T extends JW.Class> extends JW.AbstractSet.Observer<T>`
 *
 * Наблюдатель оповещающего множества. Подробнее читайте JW.AbstractCollection.Observer.
 *
 * @extends JW.AbstractSet.Observer
 *
 * @constructor
 * Конструирует синхронизатор. Предпочтительнее использовать метод JW.AbstractCollection#createObserver.
 * @param {JW.ObservableSet} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.ObservableSet.Observer = function(source, config) {
	JW.ObservableSet.Observer._super.call(this, source, config);
	this._spliceEventAttachment = source.spliceEvent.bind(this._onSplice, this);
	this._clearEventAttachment = source.clearEvent.bind(this._onClear, this);
	if (this.change) {
		this._changeAttachment = source.changeEvent.bind(this._onChange, this);
	}
};

JW.extend(JW.ObservableSet.Observer, JW.AbstractSet.Observer, {
	/*
	JW.EventAttachment _spliceEventAttachment;
	JW.EventAttachment _clearEventAttachment;
	JW.EventAttachment _changeAttachment;
	*/
	
	// override
	destroy: function() {
		if (this._changeAttachment) {
			this._changeAttachment.destroy();
		}
		this._clearEventAttachment.destroy();
		this._spliceEventAttachment.destroy();
		this._super();
	},
	
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		this._removeItems(spliceResult.removedItems);
		this._addItems(spliceResult.addedItems);
	},
	
	_onClear: function(params) {
		this._clearItems(params.items);
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T extends JW.Class> extends JW.AbstractSet.Orderer<T>`
 *
 * Конвертер оповещающего множества в массив (упорядочитель). Подробнее читайте JW.AbstractCollection.Orderer.
 *
 * @extends JW.AbstractSet.Orderer
 *
 * @constructor
 * Конструирует конвертер. Предпочтительнее использовать метод JW.AbstractCollection#createOrderer.
 * @param {JW.ObservableSet} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.ObservableSet.Orderer = function(source, config) {
	JW.ObservableSet.Orderer._super.call(this, source, config);
	this._spliceEventAttachment = source.spliceEvent.bind(this._onSplice, this);
	this._clearEventAttachment = source.clearEvent.bind(this._onClear, this);
};

JW.extend(JW.ObservableSet.Orderer, JW.AbstractSet.Orderer, {
	/*
	JW.EventAttachment _spliceEventAttachment;
	JW.EventAttachment _clearEventAttachment;
	*/
	
	// override
	destroy: function() {
		this._clearEventAttachment.destroy();
		this._spliceEventAttachment.destroy();
		this._super();
	},
	
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		this._splice(
			JW.Array.toSet(spliceResult.removedItems),
			JW.Array.toSet(spliceResult.addedItems));
	},
	
	_onClear: function(params) {
		this.target.removeItems(params.items);
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T extends JW.Class> extends JW.AbstractSet.SorterComparing<T>`
 *
 * Конвертер оповещающего множества в массив (сортировщик по компаратору).
 * Подробнее читайте JW.AbstractCollection.SorterComparing.
 *
 * @extends JW.AbstractSet.SorterComparing
 *
 * @constructor
 * Конструирует конвертер. Предпочтительнее использовать метод JW.AbstractCollection#createSorterComparing.
 * @param {JW.ObservableSet} source `<T>` Исходная коллекция.
 * @param {Object} config Конфигурация (см. Config options).
 */
JW.ObservableSet.SorterComparing = function(source, config) {
	JW.ObservableSet.SorterComparing._super.call(this, source, config);
	this._spliceEventAttachment = source.spliceEvent.bind(this._onSplice, this);
	this._clearEventAttachment = source.clearEvent.bind(this._onClear, this);
};

JW.extend(JW.ObservableSet.SorterComparing, JW.AbstractSet.SorterComparing, {
	/*
	JW.EventAttachment _spliceEventAttachment;
	JW.EventAttachment _clearEventAttachment;
	*/
	
	// override
	destroy: function() {
		this._clearEventAttachment.destroy();
		this._spliceEventAttachment.destroy();
		this._super();
	},
	
	_onSplice: function(params) {
		var spliceResult = params.spliceResult;
		this._splice(spliceResult.removedItems, spliceResult.addedItems);
	},
	
	_onClear: function(params) {
		this._splice(params.items, []);
	}
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

JW.makeFactory = function(cls, idField) {
	idField = idField || "id";
	
	JW.apply(cls, {
		items: {},
		
		registerItem: function(item) {
			cls.items[item[idField]] = item;
		},
		
		getItem: function(value) {
			return (value instanceof cls) ? value : cls.items[value];
		},
		
		getId: function(value) {
			return (value instanceof cls) ? value[idField] : value;
		}
	});
	
	return cls;
};

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * `<T>` Адаптер объекта jWidget. Обертка JW.Class над произвольным значением типа T.
 *
 * Поскольку некоторые классы jWidget работают исключительно с экземплярами JW.Class (например, JW.AbstractSet),
 * библиотека предлагает простой адаптер для приведения любых объектов и значений к классу JW.Class.
 *
 * @extends JW.Class
 *
 * @constructor
 * @param {T} value Объект.
 */
JW.Proxy = function(value) {
	JW.Proxy._super.call(this);
	this.value = value;
};

JW.extend(JW.Proxy, JW.Class, {
	/**
	 * @property {T} value Объект.
	 */
});

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

JW.setInterval = function(callback, ms) {
	if (!ms) {
		return setInterval(callback, ms);
	}
	if (typeof callback == "string") {
		callback = function() { eval(callback); };
	}
	
	var lastTime = Date.getTime();
	
	function onInterval() {
		var curTime = Date.getTime();
		
		// Prevent inactive time lapses
		if (curTime - lastTime > 10 * ms) {
			lastTime = curTime - ms;
		}
		var b = true;
		while (b || (lastTime < curTime)) {
			b = false;
			lastTime += ms;
			callback();
		}
	}
	
	return setInterval(onInterval, ms);
};

/*
	jWidget Lib source file.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

/**
 * @class
 *
 * Набор утилитарных функций для строк.
 */
JW.String = {
	/**
	 * Экранирует специальные символы HTML в строке.
	 * Преобразует символы &amp;, &gt;, &lt;, &quot; в `&amp;` `&gt;` `&lt;` `&quot;` соответственно.
	 * @param {string} str Строка.
	 * @returns {string} Результат.
	 */
	htmlEncode: function(target) {
		return String(target).
			replace(/&/g, "&amp;").
			replace(/>/g, "&gt;").
			replace(/</g, "&lt;").
			replace(/"/g, "&quot;");
	},
	
	/**
	 * Деэкранирует специальные символы HTML в строке.
	 * Преобразует символы `&amp;` `&gt;` `&lt;` `&quot;` в &amp;, &gt;, &lt;, &quot; соответственно.
	 * @param {string} str Строка.
	 * @returns {string} Результат.
	 */
	htmlDecode: function(target) {
		return String(target).
			replace(/&quot;/g, '"').
			replace(/&lt;/g, "<").
			replace(/&gt;/g, ">").
			replace(/&amp;/g, "&");
	},
	
	removeScripts: function(target) {
		target = String(target);
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
	},
	
	/**
	 * Сокращает строку до указанного количества символов. Если строка укладывается в указанную длину, она не меняется.
	 * В противном случае, она обрезается, и в конце добавляется подстрока ellipsis, так что итоговая строка
	 * получается длины length.
	 * @param {string} str Строка.
	 * @param {number} length Максимальная длина искомой строки.
	 * @param {string} [ellipsis] Конец строки при сокращении. По умолчанию равен многоточию `...`
	 * @returns {string} Результат.
	 */
	ellipsis: function(target, length, ellipsis) {
		target = String(target);
		if (target.length <= length) {
			return target;
		}
		ellipsis = ellipsis || "...";
		return target.substr(0, length - ellipsis.length) + ellipsis;
	},
	
	/**
	 * Дополняет строку в начале указанным символом до фиксированной длины.
	 * Если строка длиннее указанной длины, она не меняется.
	 * 
	 *     JW.String.prepend("123", 5, "0")  // "00123"
	 * 
	 * @param {string} str Строка.
	 * @param {number} length Длина искомой строки.
	 * @param {string} ch Символ, которым дополнить строку.
	 * @returns {string} Результат.
	 */
	prepend: function(target, length, ch) {
		target = String(target);
		var buf = [];
		length -= target.length;
		for (var i = 0; i < length; ++i) {
			buf.push(ch);
		}
		buf.push(target);
		return buf.join("");
	},
	
	/**
	 * Переводит первый символ в верхний регистр.
	 * 
	 *     JW.String.capitalize("vasya")  // "Vasya"
	 * 
	 * @param {string} str Строка.
	 * @returns {string} Результат.
	 */
	capitalize: function(target) {
		target = String(target);
		return target.charAt(0).toUpperCase() + target.substr(1);
	},
	
	/**
	 * Преобразует hyphen-style в camelStyle.
	 * 
	 *     JW.String.camel("i-love-js")  // "iLoveJs"
	 *
	 * @param {string} str Строка.
	 * @returns {string} Результат.
	 */
	camel: function(target) {
		return String(target).replace(/-([a-z])/ig, JW.String._fcamel);
	},
	
	/**
	 * Преобразует camelStyle в hyphen-style.
	 * 
	 *     JW.String.hyphen("iLoveJs")  // "i-love-js"
	 *
	 * @param {string} str Строка.
	 * @returns {string} Результат.
	 */
	hyphen: function(target) {
		return String(target).replace(/([A-Z])/g, JW.String._fhyphen);
	},
	
	/**
	 * Удаляет пробельные символы в начале и в конце строки.
	 * 
	 *     JW.String.trim("\t\tI love JS!    ")  // "I love JS!"
	 *
	 * @param {string} str Строка.
	 * @returns {string} Результат.
	 */
	trim: function(target) {
		return String(target).replace(/^\s*/, "").replace(/\s*$/, "");
	},
	
	_fcamel: function(a, b) {
		return b.toUpperCase();
	},
	
	_fhyphen: function(a, b) {
		return "-" + b.toLowerCase();
	}
};

/*
	JW timer.
	
	Copyright (C) 2013 Egor Nepomnyaschih
	
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

JW.Timer = function(delay, repeat, sensitive) {
	JW.Timer._super.call(this);
	this.tickEvent = new JW.Event();
	this.delay = delay || 0;
	this.repeat = repeat || false;
	this.sensitive = sensitive || false;
	this._handle = 0;
	this._onTimeout = JW.inScope(this._onTimeout, this);
};

JW.extend(JW.Timer, JW.Class, {
	/*
	Fields
	JW.Event<JW.Timer.EventParams> tickEvent;
	Number delay;
	Boolean repeat;
	Boolean sensitive;
	Integer _handle;
	*/
	
	destroy: function() {
		this.stop();
		this.tickEvent.destroy();
		this._super();
	},
	
	start: function() {
		if (this.isStarted()) {
			return;
		}
		var runner = this._getRunner();
		this._handle = runner(this._onTimeout, this.delay);
	},
	
	stop: function() {
		if (!this.isStarted()) {
			return;
		}
		var stopper = this._getStopper();
		stopper(this._handle);
		this._handle = 0;
	},
	
	restart: function() {
		this.stop();
		this.start();
	},
	
	isStarted: function() {
		return this._handle !== 0;
	},
	
	_getRunner: function() {
		return !this.repeat ? setTimeout : this.sensitive ? JW.setInterval : setInterval;
	},
	
	_getStopper: function() {
		return this.repeat ? clearInterval : clearTimeout;
	},
	
	_onTimeout: function() {
		if (!this.repeat) {
			this._handle = 0;
		}
		this.tickEvent.trigger(new JW.Timer.EventParams(this));
	}
});

JW.Timer.EventParams = JW.EventParams.extend();
