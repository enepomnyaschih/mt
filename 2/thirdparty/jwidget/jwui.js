/*!
	jWidget UI 0.6
	
	https://github.com/enepomnyaschih/jwidget/wiki
	
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
 * @class JW.UI
 *
 * Пространство имен для View-части библиотеки jWidget.
 */
JW.UI = {
	/**
	 * Задает HTML-шаблоны для подкласса JW.UI.Component.
	 * 
	 * Для каждого подкласса JW.UI.Component можно задать ряд шаблонов. Каждый шаблон имеет свое имя.
	 * Получить шаблон компонента можно через словарь JW.UI.Component.templates.
	 * 
	 * При наследовании компонентов их шаблоны тоже наследуются.
	 * 
	 * Для любого подкласса JW.UI.Component определен по крайней мере один шаблон, который именуется `main`.
	 * Это главный шаблон, по которому рендерятся все компоненты данного класса. По умолчанию, `main` равен `<div />`.
	 * Как правило, шаблона `main` достаточно для большинства компонентов. Этот шаблон применяется автоматически,
	 * тогда как остальные шаблоны нужно использовать вручную.
	 * 
	 * Функция JW.UI.template вызывается автоматически при подключении `jw.html`-файлов через
	 * [jWidget SDK](https://github.com/enepomnyaschih/jwsdk/wiki/ru). Для подробностей, смотрите
	 * [пример](https://github.com/enepomnyaschih/jwidget/wiki/Пример-3.-Интеграция-с-jWidget-SDK).
	 *
	 * @static
	 * @param {Function} cls Класс, унаследованный от JW.UI.Component.
	 * @param {Object} tpls Шаблоны для добавления/переопределения.
	 */
	template: function(cls, tpls) {
		if (cls.prototype.Templates && cls.prototype.Templates.componentCls == cls) {
			JW.apply(cls.prototype.Templates.prototype, tpls);
		} else {
			cls.prototype.Templates = (cls.superclass.Templates || JW.Class).extend(tpls);
			cls.prototype.Templates.componentCls = cls;
			cls.prototype.templates = new cls.prototype.Templates();
		}
	},
	
	/**
	 * Проверяет, является ли переменная [элементом jQuery](http://api.jquery.com/).
	 * @static
	 * @param {Mixed} x Переменная.
	 * @returns {boolean} Переменная является элементом jQuery.
	 */
	isElement: function(v) {
		return v instanceof jQuery.fn.init;
	},
	
	/**
	 * Запускает метод `preventDefault` для [события jQuery](http://api.jquery.com/category/events/event-object/).
	 *
	 * Используется для отмены поведения по умолчанию некоторого события:
	 *
	 *     el.click(JW.UI.preventDefault);
	 *
	 * @static
	 * @param {Object} event Событие jQuery.
	 */
	preventDefault: function(event) {
		event.preventDefault();
	}
};

jQuery(function() {
	JW.UI.windowEl = jQuery(window);
	JW.UI.bodyEl   = jQuery(document.body);
});

/*
	JW jQuery element prototype extension.
	
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
 * @class jQuery
 *
 * Элемент jQuery. Расширен дополнительным набором методов.
 */
JW.apply(jQuery.fn, {
	/**
	 * Вставить элемент в качестве дочернего элемента текущего элемента в указанное место.
	 * @param {jQuery} el Элемент.
	 * @param {number} index Индекс дочернего элемента, перед которым вставить el.
	 * @returns {jQuery} this.
	 */
	insert: function(item, index) {
		if (!JW.isSet(index)) {
			this.append(item);
		} else if (index == 0) {
			this.prepend(item);
		} else {
			jQuery(this.children()[index - 1]).after(item);
		}
		return this;
	},
	
	/**
	 * Заменить элемент другим элементом в DOM. В отличие от стандартного replaceWith, не убивает
	 * обработчики событий, а только убирает элемент из DOM.
	 * @param {jQuery} el Элемент.
	 * @param {boolean} [attrs=false] Присвоить аттрибут id (если определен) и добавить все классы текущего элемента
	 * в el.
	 * @returns {jQuery} this.
	 */
	replaceBy: function(el, attrs) {
		var id = attrs ? this.attr("id") : null,
			cls = attrs ? this.attr("class") : null;
		
		el = jQuery(el);
		this.after(el);
		this.detach();
		
		if (id) {
			el.attr("id", id);
		}
		if (cls) {
			el.addClass(cls);
		}
		return this;
	}
});

/*
	JW browser detection.
	
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

JW.UI.Browsers = (function()
{
	ua = navigator.userAgent.toLowerCase();
	function check(r){
		return r.test(ua);
	};
	
	var isStrict = document.compatMode == "CSS1Compat",
		docMode = document.documentMode,
		isOpera = check(/opera/),
		isOpera10_5 = isOpera && check(/version\/10\.5/),
		isChrome = check(/\bchrome\b/),
		isWebKit = check(/webkit/),
		isSafari = !isChrome && check(/safari/),
		isSafari2 = isSafari && check(/applewebkit\/4/), // unique to Safari 2
		isSafari3 = isSafari && check(/version\/3/),
		isSafari4 = isSafari && check(/version\/4/),
		isSafari5 = isSafari && check(/version\/5/),
		isIE = !isOpera && check(/msie/),
		isIE7 = isIE && (check(/msie 7/) || docMode == 7),
		isIE8 = isIE && (check(/msie 8/) && docMode != 7 && docMode != 9 || docMode == 8),
		isIE9 = isIE && (check(/msie 9/) && docMode != 7 && docMode != 8 || docMode == 9),
		isIE6 = isIE && check(/msie 6/),
		isGecko = !isWebKit && check(/gecko/),
		isGecko2 = isGecko && check(/rv:1\.8/),
		isGecko3 = isGecko && check(/rv:1\.9/),
		isGecko4 = isGecko && check(/rv:2\.0/),
		isGecko5 = isGecko && check(/rv:5\./),
		isFF3_0 = isGecko3 && check(/rv:1\.9\.0/),
		isFF3_5 = isGecko3 && check(/rv:1\.9\.1/),
		isFF3_6 = isGecko3 && check(/rv:1\.9\.2/),
		isBorderBox = isIE && !isStrict,
		isWindows = check(/windows|win32/),
		isMac = check(/macintosh|mac os x/),
		isAir = check(/adobeair/),
		isLinux = check(/linux/),
		isIPad = check(/ipad/),
		isSecure = /^https/i.test(window.location.protocol);
	
	var isPaddingWideTd = !(isWebKit || isIPad);
	
	return {
		isStrict    : isStrict,
		isOpera     : isOpera,
		isOpera10_5 : isOpera10_5,
		isChrome    : isChrome,
		isWebKit    : isWebKit,
		isSafari    : isSafari,
		isSafari2   : isSafari2,
		isSafari3   : isSafari3,
		isSafari4   : isSafari4,
		isSafari5   : isSafari5,
		isIE        : isIE,
		isIE7       : isIE7,
		isIE8       : isIE8,
		isIE9       : isIE9,
		isIE6       : isIE6,
		isGecko     : isGecko,
		isGecko2    : isGecko2,
		isGecko3    : isGecko3,
		isGecko4    : isGecko4,
		isGecko5    : isGecko5,
		isFF3_0     : isFF3_0,
		isFF3_5     : isFF3_5,
		isFF3_6     : isFF3_6,
		isBorderBox : isBorderBox,
		isWindows   : isWindows,
		isMac       : isMac,
		isAir       : isAir,
		isLinux     : isLinux,
		isIPad      : isIPad,
		isSecure    : isSecure,
		
		isPaddingWideTd    : isPaddingWideTd
	};
})();

/*
	jWidget UI source file.
	
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
 * @class JW.UI.Component
 *
 * Базовый класс визуального компонента.
 * 
 * Возможности:
 * 
 * - Рендеринг по HTML-шаблону
 * - Прямой доступ к элементам компонента
 * - [jQuery-интерфейс](http://api.jquery.com/) для работы с элементами
 * - Удобный интерфейс для создания дочерних компонентов
 * 
 * У компонента jWidget очень простой интерфейс, но довольно нетипичная философия, обеспечивающая полное соблюдение
 * методики Model-View без особых усилий. Поэтому начнем с примеров.
 * 
 * ### Пример jWidget UI-компонента
 * 
 *     // Объявляем пространство имен
 *     var MyApp = {};
 *     
 *     // Объявляем конструктор компонента
 *     MyApp.Component = function(message, link) {
 *         MyApp.Component._super.call(this);
 *         this.message = message;
 *         this.link = link;
 *     };
 *     
 *     // Наследуем от JW.UI.Component
 *     JW.extend(MyApp.Component, JW.UI.Component, {
 *         // String message;
 *         // String link;
 *         
 *         // override
 *         renderComponent: function() {
 *             this._super();
 *             this.getElement("hello-message").text(message);
 *             this.getElement("link").attr("href", this.link);
 *         }
 *     });
 *     
 *     JW.UI.template(MyApp.Component, {
 *         main:
 *             '<div jwclass="myapp-component">' +
 *                 '<div jwid="hello-message" />' +
 *                 '<a href="#" jwid="link">Click me!</a>' +
 *             '</div>'
 *     });
 * 
 * Сначала рассмотрим, как работает HTML-шаблон. У каждого компонента есть основной шаблон, который описывается в
 * функции JW.UI.template, имеет название `main` и по умолчанию равен
 * <code>&lt;div /&gt;</code>. Можно добавить и другие шаблоны, они будут доступны в компоненте через поле
 * <code>{@link #templates this.templates}.&lt;название_шаблона&gt;</code> (но они, как правило, не используются).
 * 
 * Обратите внимание на специальные атрибуты `jwclass` и `jwid`. `jwclass` - это корневой CSS-класс компонента,
 * а `jwid` - это приставка к `jwclass` в данном элементе. Так, в результате рендеринга этого компонента получится
 * следующий фрагмент HTML:
 * 
 *     <div class="myapp-component">
 *         <div class="myapp-component-hello-message" />
 *         <a href="#" class="myapp-component-link">Click me!</a>
 *     </div>
 * 
 * Элементы, для которых указан атрибут `jwid`, могут быть мгновенно получены методом #getElement. Результатом вызова
 * этого метода будет [jQuery-обертка](http://api.jquery.com/) над соответствующим элементом. Кроме того, у каждого
 * компонента всегда есть поле #el, которое ссылается на корневой jQuery-элемент компонента.
 * 
 * ### Создание компонента в коде
 * 
 * Компонент создается конструированием объекта соответствующего класса. Далее, пользуясь методом #renderTo
 * или #renderAs, можно вставить компонент в DOM.
 * 
 *     var component;
 *     
 *     jQuery(function() {
 *         component = new MyApp.Component("Hello world!", "http://google.com");
 *         component.renderTo("body");
 *     });
 * 
 * ### Дочерние компоненты
 * 
 * Есть 3 способа добавить дочерний компонент:
 * 
 * - Добавить компонент в словарь #children с ключом, равным `jwid` элемента, вместо которого вы хотите вставить
 * дочерний компонент. Как правило, это делается в методе #renderComponent.
 * - Добавить список дочерних компонентов внутрь какого-то элемента вызовом метода #addArray. Если переданный массив
 * является JW.ObservableArray, то фреймворк обеспечит непрерывную синхронизацию с этим массивом в ходе работы
 * приложения.
 * - Определить метод <code>render&lt;ChildId&gt;</code>, где <code>&lt;ChildId&gt;</code> - это `jwid` элемента,
 * записанный в CamelCase с заглавной буквы. Пример: `renderArticle` (рендерит элемент с `jwid="article"`).
 * Если метод вернет JW.UI.Component или JW.AbstractArray, то результат станет дочерним компонентом или списком
 * дочерних компонентов соответственно. Подробнее читайте в следующем разделе.
 * 
 * Такой интерфейс обеспечивает краткость, с одной стороны, и гибкость в плане соблюдения методики Model-View,
 * с другой стороны.
 * 
 * [Пример 1. Model-View](https://github.com/enepomnyaschih/jwidget/wiki/Пример-1.-Model-View)
 * 
 * ### Подробнее о списках дочерних компонентов
 * 
 * Для создания дочерних компонентов на основе массивов данных очень удобно использовать конвертеры элементов
 * JW.AbstractCollection.Mapper и другие синхронизаторы. Благодаря им представление будет реагировать на любые
 * изменения в модели автоматически.
 * 
 * Именно по этой причине в модели рекомендуется использовать {@link JW.AbstractCollection коллекции jWidget} вместо
 * нативных Array и Object: эти коллекции имеют Observable-реализации и синхронизаторы.
 * 
 * [Пример 2. Синхронизатор коллекции](https://github.com/enepomnyaschih/jwidget/wiki/Пример-2.-Синхронизатор-коллекции)
 * 
 * ### Подробнее о методе render&lt;ChildId&gt;
 * 
 * Для каждого `jwid` в HTML-шаблоне компонента можно определить метод `render<ChildId>`, где `<ChildId>` равен этому
 * `jwid`, записанному в CamelCase с заглавной буквы. Сигнатура метода:
 * 
 * <code>renderChildId(el: [jQuery](http://api.jquery.com/)): Mixed</code>
 * 
 * `el` - элемент с данным `jwid`.
 * 
 * В зависимости от возвращаемого значения доступны следующие варианты:
 * 
 * - Если метод вернет экземпляр JW.UI.Component, то он будет добавлен в словарь #children с ключом, равным `jwid`,
 * и станет дочерним компонентом.
 * - Если метод вернет экземпляр JW.AbstractArray, то он будет добавлен как список дочерних компонентов
 * методом #addArray.
 * - Если метод вернет строго false (===), то элемент будет удален.
 * - В любом другом случае никаких дополнительных действий выполнено не будет.
 * 
 * ### Удаление и уничтожение компонентов
 * 
 * Чтобы уничтожить компонент, нужно вызвать метод #destroy. При этом компонент не должен состоять в качестве
 * дочернего компонента внутри какого-то другого компонента (в таком случае будет выброшено исключение). Чтобы удалить
 * компонент из родителя, нужно произвести операцию, обратную операции добавления. Так, для удаления компонента
 * с `jwid="comments"` нужно вызвать метод {@link JW.AbstractMap#method-remove} объекта #children. При желании
 * можно тут же этот компонент уничтожить:
 * 
 *     this.children.remove("comments").destroy();
 * 
 * При этом элемент с соответствующим `jwid` вернется в свое изначальное состояние, каким оно было до добавления
 * дочернего компонента.
 *
 * **Замечание:** Если вы попытаетесь уничтожить дочерний компонент до его удаления из родителя, возникнет исключение.
 * 
 * Со списками дочерних компонентов все чуть-чуть сложнее. Метод #addArray возвращает экземпляр класса
 * JW.UI.Component.Array. Если его уничтожить, список меток будет удален из родительского компонента:
 * 
 *         // override
 *         renderComponent: function() {
 *             this._labelMapper = this.labels.createMapper({
 *                 createItem: function(label) { return new LabelView(label); },
 *                 destroyItem: JW.destroy,
 *                 scope: this
 *             });
 *             // Добавляем метки внутрь элемента с jwid "labels"
 *             this._labelArray = this.addArray(this._labelMapper.target, "labels");
 *         },
 *         
 *         clearLabels: function() {
 *             this._labelArray.destroy();
 *         }
 * 
 * **Замечание:** Внутри метода #destroyComponent все списки уже уничтожены, т.е. все такие дочерние компоненты уже
 * удалены из родителя. Но сами дочерние компоненты еще не уничтожены, для этого мы запускаем уничтожение
 * синхронизатора:
 * 
 *         // override
 *         destroyComponent: function() {
 *             // В destroyComponent уничтожаем синхронизатор
 *             this._labelMapper.destroy();
 *             this._super();
 *         }
 * 
 * Строчка `this._labelMapper.destroy()` уничтожит все представления меток.
 * 
 * ### Жизненный цикл компонента
 * 
 * Каждый компонент проходит несколько этапов жизненного цикла.
 * 
 * 1. Как и у всех классов, сначала вызывается *конструктор*. Здесь обычно объявляются все поля, устанавливаются их
 * изначальные значения, создаются события и т.п. Здесь осуществляется работа только с моделью компонента,
 * а представление не затрагивается. Заметим, что после конструирования компонент еще не отрендерен, т.е. у него нет
 * поля #el и словаря #children, не будет работать метод #addArray. Это сделано для того, чтобы между
 * конструированием и рендерингом компонента еще была возможность поменять какие-нибудь поля или вызвать
 * какие-нибудь методы. Вторая причина: в любом объектно-ориентированном языке вызывать виртуальные методы
 * в конструкторе не рекомендуется. Рендеринг можно осуществить напрямую вызовом метода #render, #renderTo, #renderAs,
 * либо добавив компонент внутрь другого компонента. Например, после добавления в словарь #children компонент будет
 * отрендерен. Можете вызывать рендеринг компонента несколько раз: отрендерен он будет лишь при первом запуске.
 * 1. Метод #beforeRender вызывается во время рендеринга, после чтения HTML-шаблона и инициализации ссылок на все
 * элементы этого шаблона. Здесь удобно произвести какие-то предварительные действия перед созданием дочерних
 * компонентов. Добавлять дочерние компоненты уже можно. Вызов <code>this._super()</code> осуществляется в начале
 * метода.
 * 1. Вызываются все методы <code>render&lt;ChildId&gt;</code> для элементов HTML-шаблона, т.е. начинается создание
 * дочерних компонентов.
 * 1. Вызывается метод #renderComponent. Здесь следует присваивать атрибуты элементов, создавать дочерние компоненты,
 * подписываться на события и наделять компонент поведением. Вызов <code>this._super()</code> осуществляется в
 * начале метода.
 * 1. Метод #afterAppend вызывается после того, как компонент был впервые добавлен в HTML DOM и дерево
 * визуальных компонентов. Здесь удобно осуществлять лайаутинг компонента (вычислять размеры элементов).
 * Здесь заканчивается рендеринг компонента. Вызов <code>this._super()</code> осуществляется в начале метода.
 * 1. Метод #destroyComponent служит для уничтожения компонента. Здесь откатывается все, что было сделано во время
 * рендеринга компонента, т.е. на шагах 2-5. При вызове этого метода все списки дочерних компонентов, добавленные
 * через метод #addArray, уже удалены, но еще не уничтожены. Уничтожать их надо явно. Напротив, дочерние компоненты,
 * состоящие в #children нужно удалить оттуда вручную, если вы не хотите, чтобы они были уничтожены.
 * Вызов <code>this._super()</code> осуществляется в конце метода.
 * 1. Деструктор #destroy. Здесь откатываем все, что было сделано в конструкторе класса. Как правило, этот метод для
 * компонентов не перегружается: все необходимое делается в методе #destroyComponent.
 * 
 * ### Интеграция с jWidget SDK
 * 
 * Библиотека jWidget идеально интегрируется с [jWidget SDK](https://github.com/enepomnyaschih/jwsdk/wiki/ru), что
 * дает хорошую оптимизацию JS-кода и возможность выносить HTML-шаблоны в отдельные файлы. Например, самый первый
 * пример можно упростить, разбив на 2 файла:
 * 
 * **component.js**
 * 
 *     // Объявляем пространство имен
 *     var MyApp = {};
 *     
 *     // Объявляем конструктор компонента
 *     MyApp.Component = function(message, link) {
 *         MyApp.Component._super.call(this);
 *         this.message = message;
 *         this.link = link;
 *     };
 *     
 *     // Наследуем от JW.UI.Component
 *     JW.extend(MyApp.Component, JW.UI.Component, {
 *         // String message;
 *         // String link;
 *         
 *         // override
 *         renderComponent: function() {
 *             this._super();
 *             this.getElement("hello-message").text(message);
 *             this.getElement("link").attr("href", this.link);
 *         }
 *     });
 * 
 * **component.jw.html**
 * 
 *     <div jwclass="myapp-component">
 *         <div jwid="hello-message" />
 *         <a href="#" jwid="link">Click me!</a>
 *     </div>
 * 
 * Чтобы это заработало, достаточно прописать следующие ресурсы в соответствующем пакете jWidget SDK:
 * 
 *     {
 *         "resources" : [
 *             "component.js",
 *             "component.jw.html : MyApp.Component",
 *             ...
 *         ]
 *     }
 * 
 * Естественно, вы можете использовать jWidget и без jWidget SDK, но тогда HTML-шаблоны придется либо загружать
 * динамически, либо описывать явно в исходном JavaScript-коде с использованием функции JW.UI.template.
 * 
 * Более сложный пример смотрите здесь:
 * 
 * [Пример 3. Интеграция с jWidget SDK](https://github.com/enepomnyaschih/jwidget/wiki/Пример-3.-Интеграция-с-jWidget-SDK)
 *
 * @extends JW.Class
 * @constructor
 */
JW.UI.Component = function(config) {
	JW.UI.Component._super.call(this);
	config = config || {};
	this.rootClass = config.rootClass;
	this.template = config.template;
	this.parent = null;
	this.wasAfterAppend = false;
	this.destroyed = false;
	this.el = null;
	this.replacedEl = null;
	this.children = null;
	this.allChildren = null;
	this._elements = null;
	this._childMapper = null;
	this._childInserter = null;
	this._arrays = null;
},

JW.extend(JW.UI.Component, JW.Class, {
	/**
	 * @property {boolean} wasAfterAppend Вызван ли уже #afterAppend.
	 */
	/**
	 * @property {boolean} destroyed Уничтожен ли компонент.
	 */
	/**
	 * @property {Object} templates Словарь из ID шаблона в шаблон. Шаблоны определяются методом JW.UI.template.
	 */
	/**
	 * @property {JW.UI.Component} parent
	 * Родительский компонент.
	 * Поле доступно только с начала рендеринга компонента.
	 */
	/**
	 * @property {jQuery} el
	 * Корневой элемент.
	 * Поле доступно только с начала рендеринга компонента.
	 */
	/**
	 * @property {jQuery} replacedEl
	 * Элемент, на место которого отрендерен компонент. Автоматически присваивается в момент добавления в
	 * словарь #children родительского компонента.
	 * Поле доступно только с начала рендеринга компонента.
	 */
	/**
	 * @property {JW.ObservableMap} children
	 * `<JW.UI.Component>` (mutable) Именованные дочерние компоненты. Используйте этот словарь, чтобы добавлять
	 * дочерние компоненты на место элементов с соответствующими jwid.
	 * Поле доступно только с начала рендеринга компонента.
	 */
	/**
	 * @property {Object} allChildren
	 * Множество всех дочерних компонентов (включая именованные и состоящие в списках).
	 * Поле доступно только с начала рендеринга компонента.
	 */
	/*
	Optional
	String rootClass;
	String template;
	
	Fields
	Map<Element> _elements;
	JW.ObservableMap.Mapper<JW.UI.Component, JW.UI.Component.Child> _childMapper;
	JW.ObservableMap.Inserter<JW.UI.Component.Child> _childInserter;
	Set<JW.UI.Component.Array> _arrays;
	*/
	
	destroy: function() {
		if (this.parent) {
			throw new Error("JW.UI.Component.destroy must be used for root and detached components only");
		}
		if (this.destroyed) {
			return;
		}
		this.destroyed = true;
		if (this.el) {
			this.el.remove();
			JW.Set.each(this._arrays, JW.byMethod("destroy"));
			this._arrays = null;
			
			this.destroyComponent();
			
			this._childInserter.destroy();
			this._childInserter = null;
			this._childMapper.destroy();
			this._childMapper = null;
			this.children.each(JW.byMethod("destroy"));
			this.children.destroy();
			this.children = null;
		}
		this.allChildren = null;
		this._elements = null;
		this.el = null;
		this._super();
	},
	
	/**
	 * Метод жизненного цикла компонента. Вызывается в момент рендеринга компонента после чтения HTML-шаблона и
	 * инициализации ссылок на все элементы этого шаблона, и до вызова методов вида `render<ChildId>` и метода
	 * #renderComponent. Здесь удобно произвести какие-то предварительные действия перед созданием дочерних
	 * компонентов. Добавлять дочерние компоненты уже можно. Вызов <code>this._super()</code> осуществляется в
	 * начале метода.
	 *
	 * @returns {void}
	 */
	beforeRender: function() {},
	
	/**
	 * Метод жизненного цикла компонента. Вызывается в момент рендеринга компонента после вызова метода #beforeRender
	 * и методов вида `render<ChildId>`. Здесь следует присваивать атрибуты элементов, создавать дочерние компоненты,
	 * подписываться на события и наделять компонент поведением. Вызов <code>this._super()</code> осуществляется
	 * в начале метода.
	 *
	 * @returns {void}
	 */
	renderComponent: function() {},
	
	/**
	 * Метод жизненного цикла компонента. Вызывается после того, как компонент был впервые добавлен в HTML DOM и
	 * дерево визуальных компонентов. Здесь удобно осуществлять лайаутинг компонента (вычислять размеры элементов).
	 * Здесь заканчивается рендеринг компонента. Вызов <code>this._super()</code> осуществляется в начале метода.
	 *
	 * @returns {void}
	 */
	afterAppend: function() {},
	
	/**
	 * Метод жизненного цикла компонента. Служит для уничтожения компонента. Здесь откатывается все, что было сделано
	 * во время рендеринга компонента, т.е. в методах #beforeRender, `render<ChildId>`, #renderComponent и
	 * #afterAppend. При вызове этого метода все списки дочерних компонентов, добавленные через метод #addArray, уже
	 * удалены, но еще не уничтожены. Уничтожать их надо явно. Напротив, дочерние компоненты, состоящие в #children
	 * нужно удалить оттуда вручную, если вы не хотите, чтобы они были уничтожены. Это обосновано работой
	 * синхронизаторов. Вызов <code>this._super()</code> осуществляется в конце метода.
	 *
	 * @returns {void}
	 */
	destroyComponent: function() {},
	
	/**
	 * Отрендерить компонент. Вызовите этот метод после конструирования компонента, чтобы инициализировать все
	 * элементы и поля компонента. Метод вызывается автоматически:
	 * 
	 * - В методах #renderTo, #renderAs
	 * - Если компонент добавлен внутрь другого компонента в качестве дочернего
	 *
	 * @param {jQuery} [replacedEl] Элемент, на место которого рендерится компонент (если определен).
	 * @returns {void}
	 */
	render: function(replacedEl) {
		if (this.el) {
			return;
		}
		this.replacedEl = replacedEl;
		this.el = jQuery(this.template || this.templates.main);
		this._elements = {};
		this.allChildren = {};
		this.children = new JW.ObservableMap();
		this._arrays = {};
		this.rootClass = this.rootClass || this.el.attr("jwclass");
		if (this.rootClass) {
			this.el.removeAttr("jwclass");
			this.el.addClass(this.rootClass);
		}
		var anchorEls = this.el.find("[jwid]");
		for (var i = 0; i < anchorEls.length; ++i) {
			var anchorEl = jQuery(anchorEls[i]);
			var jwId = anchorEl.attr("jwid");
			this._elements[jwId] = anchorEl;
			anchorEl.removeAttr("jwid");
			anchorEl.addClass(this.getElementClass(jwId));
		}
		this._childMapper = this.children.createMapper({
			createItem  : function(child) { return new JW.UI.Component.Child(this, child); },
			destroyItem : function(componentChild) { componentChild.destroy(); },
			scope       : this
		});
		this._childInserter = this._childMapper.target.createInserter({
			addItem    : function(componentChild, key) { componentChild.attach(key); },
			removeItem : function(key, componentChild) { componentChild.detach(); },
			scope      : this
		});
		this.beforeRender();
		var elements = JW.apply({}, this._elements);
		for (var jwId in elements) {
			var anchorEl = elements[jwId];
			var jwIdCamel = JW.String.camel(jwId);
			var renderMethodName = "render" + JW.String.capitalize(jwIdCamel);
			if (typeof this[renderMethodName] === "function") {
				var result = this[renderMethodName](anchorEl);
				if (result instanceof JW.UI.Component) {
					this.children.set(result, jwId);
				} else if ((result instanceof JW.Array) || (result instanceof JW.ObservableArray)) {
					this.addArray(result, jwId);
				} else if (result === false) {
					this.removeElement(jwId);
				}
			}
		}
		this.renderComponent();
	},
	
	/**
	 * Отрендерить компонент внутрь указанного элемента. Используется только для рендеринга корневого компонента: все
	 * остальные должны добавляться как дочерние компоненты (см. соответствующий раздел документации JW.UI.Component).
	 *
	 * @param {jQuery/string} [el] Элемент, внутрь которого отрендерить компонент, или его CSS-селектор.
	 * @returns {void}
	 */
	renderTo: function(el) {
		this.render();
		jQuery(el).insert(this.el);
		this._afterAppend();
	},
	
	/**
	 * Отрендерить компонент на место указанного элемента. Используется только для рендеринга корневого компонента:
	 * все остальные должны добавляться как дочерние компоненты
	 * (см. соответствующий раздел документации JW.UI.Component).
	 *
	 * @param {jQuery/string} [el] Элемент, на место которого отрендерить компонент, или его CSS-селектор.
	 * @returns {void}
	 */
	renderAs: function(el) {
		this.render(el);
		jQuery(el).replaceBy(this.el, true);
		this._afterAppend();
	},
	
	/**
	 * Удалить компонент из DOM. Предназначен только для удаления корневого компонента. Все дочерние компоненты
	 * удаляются по-своему: либо путем удаления компонента из словаря #children, либо путем уничтожения объекта
	 * JW.UI.Component.Array.
	 *
	 * @returns {void}
	 */
	remove: function() {
		if (this.parent) {
			throw new Error("JW.UI.Component.remove must be used for root components only");
		}
		this.el.detach();
	},
	
	/**
	 * Получить элемент по `jwid`.
	 * @param {string} jwid
	 * @returns {jQuery} Элемент.
	 */
	getElement: function(id) {
		return this._elements[id];
	},
	
	/**
	 * Заменить/добавить элемент с выбранным `jwid`.
	 * 
	 * Метод используется, если HTML-содержимое компонента нефиксировано, но нужно добавить элемент. Например, при
	 * наследовании компонента. Добавленный элемент можно использовать для разных целей, в частности, для добавления
	 * дочерних компонентов.
	 * 
	 * **Замечание:** Метод лишь регистрирует элемент в компоненте. Создавать элемент и добавлять его
	 * внутрь другого элемента нужно вручную через [jQuery API](http://api.jquery.com/).
	 *
	 * @param {jQuery} el
	 * @param {string} jwid
	 * @returns {void}
	 */
	setElement: function(el, id) {
		this._elements[id] = el;
	},
	
	getElementClass: function(id) {
		return JW.Array.map(JW.Array.filter([ this.rootClass, id ], JW.isSet), JW.String.hyphen).join("-");
	},
	
	/**
	 * Удалить элемент по `jwid`. Элемент будет удален из DOM и больше его нельзя будет получить
	 * методом #getElement.
	 * @param {string} jwid
	 * @returns {void}
	 */
	removeElement: function(id) {
		var el = this._elements[id];
		if (!el) {
			return;
		}
		el.remove();
		delete this._elements[id];
	},
	
	/**
	 * Добавить список дочерних компонентов в указанный элемент.
	 * 
	 * Работает на базе синхронизатора JW.AbstractArray.Inserter. Благодаря этому, если в качестве аргумента
	 * components передать JW.ObservableArray, то представление будет налету синхронизироваться с содержимым
	 * этого массива.
	 * 
	 * Массив components удобно создавать на основе данных с помощью метода JW.AbstractArray.createMapper
	 * массива данных, т.е. путем создания конвертера элементов JW.AbstractCollection.Mapper.
	 * 
	 * Метод возвращает объект класса JW.UI.Component.Array. Этот объект предназначен для удаления списка дочерних
	 * компонентов из родительского компонента. Делается это путем его уничтожения методом
	 * {@link JW.Class#destroy destroy}. Помимо этого, список будет автоматически удален при уничтожении
	 * родительского компонента непосредственно перед вызовом метода #destroyComponent.
	 * Дочерние компоненты внутри списка при этом уничтожены не будут - обычно это делается в
	 * методе #destroyComponent путем уничтожения соответствующего JW.AbstractCollection.Mapper.
	 *
	 * @param {JW.AbstractArray} components Массив дочерних компонентов.
	 * @param {jQuery/string} [el]
	 * Элемент, внутрь которого добавить дочерние компоненты, или его jwid.
	 * По умолчанию, добавляется в корневой элемент родительского компонента.
	 * @returns {JW.UI.Component.Array} Список дочерних компонентов.
	 */
	addArray: function(source, el) {
		return new JW.UI.Component.Array(this, source, this._getElement(el));
	},
	
	_afterAppend: function() {
		if (this.wasAfterAppend || !this.el) {
			return;
		}
		if (this.parent && !this.parent.wasAfterAppend) {
			return;
		}
		if (!this.parent && !this.el.parents("body").length) {
			return;
		}
		this.wasAfterAppend = true;
		this.afterAppend();
		JW.Set.each(this.allChildren, JW.byMethod("_afterAppend"));
	},
	
	_initChild: function(component, replacedEl) {
		component.render(replacedEl);
		component.parent = this;
		JW.Set.add(this.allChildren, component);
	},
	
	_doneChild: function(component) {
		JW.Set.remove(this.allChildren, component);
		component.parent = null;
	},
	
	_getElement: function(el) {
		return (typeof el === "string") ? this.getElement(el) : (el || this.el);
	}
});

JW.UI.template(JW.UI.Component, {
	main: '<div />'
});

JW.UI.Component.EventParams = function(sender) {
	JW.UI.Component.EventParams._super.call(this, sender);
};

JW.extend(JW.UI.Component.EventParams, JW.EventParams, {
	/*
	Fields
	JW.UI.Component sender;
	*/
});

/*
	jWidget UI source file.
	
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
 * Список дочерних компонентов JW.UI.Component.
 * 
 * Возвращается методом JW.UI.Component.addArray. Если его уничтожить, дочерние компоненты будут удалены из родителя.
 *
 * @extends JW.Class
 */
JW.UI.Component.Array = function(parent, source, el) {
	JW.UI.Component.Array._super.call(this);
	this.parent = parent;
	JW.Set.add(parent._arrays, this);
	
	this._mapper = source.createMapper({
		createItem  : function(child) { this.parent._initChild(child); return child; },
		destroyItem : function(child) { this.parent._doneChild(child); },
		scope       : this
	});
	
	this._inserter = new JW.UI.Inserter(this._mapper.target, el);
};

JW.extend(JW.UI.Component.Array, JW.Class, {
	/*
	JW.UI.Component parent;
	JW.AbstractArray.Mapper<JW.UI.Component, JW.UI.Component> _mapper;
	JW.AbstractArray.Inserter _inserter;
	*/
	
	// override
	destroy: function() {
		this._inserter.destroy();
		this._mapper.destroy();
		JW.Set.remove(this.parent._arrays, this);
		this._super();
	}
});

/*
	jWidget UI source file.
	
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

JW.UI.Component.Child = function(parent, child) {
	JW.UI.Component.Child._super.call(this);
	this.parent = parent;
	this.child = child;
	this.name = null;
	this._el = null;
};

JW.extend(JW.UI.Component.Child, JW.Class, {
	/*
	Fields
	JW.UI.Component parent;
	JW.UI.Component child;
	String name;
	Element _el;
	*/
	
	// override
	destroy: function() {
		this.parent._doneChild(this.child);
		this._super();
	},
	
	attach: function(name) {
		// JW.assertNull(this.name);
		this.name = name;
		this._el = this.parent.getElement(name);
		this.parent._initChild(this.child, this._el);
		this.parent._elements[name] = this.child.el;
		this._el.replaceBy(this.child.el, true);
		this.child._afterAppend();
	},
	
	detach: function() {
		// JW.assertString(this.name, JW.isNotBlank);
		if (this.parent._elements[this.name] === this.child.el) {
			this.parent._elements[this.name] = this._el;
		}
		this.child.el.replaceBy(this._el);
		this.parent._doneChild(this.child);
		this._el = null;
		this.name = null;
	}
});

/*
	JW ordered collection syncher with UI component.
	
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

JW.UI.Inserter = function(source, el) {
	JW.UI.Inserter._super.call(this);
	this.el = el;
	this._inserter = source.createInserter({
		addItem    : this._addItem,
		removeItem : this._removeItem,
		scope      : this
	});
};

JW.extend(JW.UI.Inserter, JW.Class, {
	/*
	Fields
	Element el;
	JW.ObservableArray.Inserter<JW.UI.Component> _inserter;
	*/
	
	destroy: function() {
		this._inserter.destroy();
		this._super();
	},
	
	_addItem: function(item, index) {
		this.el.insert(item.el, index);
		item._afterAppend();
	},
	
	_removeItem: function(item) {
		item.el.detach();
	}
});

/*
	JW query string params object.
	
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

JW.UI.Params = {};

(function() {
	if (!location.search.length)
		return;
	
	var params = location.search.substr(1).split("&");
	for (var i = 0; i < params.length; ++i)
	{
		var tokens = params[i].split("=");
		if (tokens.length != 2)
			continue;
		
		JW.UI.Params[tokens[0]] = decodeURIComponent(tokens[1]).replace(/\+/g, " ");
	}
})();
/*
	JW image preloader.
	
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

JW.UI.preloadImage = function(
	src,      // [required] String
	callback, // [optional] Function(image), image is undefined if error
	scope)    // [optional] Object
{
	var image = new Image();
	jQuery(image).
		load(function() {
			if (typeof callback === "function")
				callback.call(scope, image);
		}).
		error(function() {
			if (typeof callback === "function")
				callback.call(scope);
		}).
		attr("src", src);
}
