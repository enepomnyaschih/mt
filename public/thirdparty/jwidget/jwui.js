/*!
    jWidget UI 2.0

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
/// <reference path="../build/d.ts/jwlib.d.ts" />
/// <reference path="../scripts/jquery/jquery.d.ts" />
/// <reference path="core/Core.ts" />
/// <reference path="core/AbstractInserter.ts" />
/// <reference path="core/AbstractTemplate.ts" />
/// <reference path="core/Component.ts" />
/// <reference path="core/DomTemplate.ts" />
/// <reference path="core/Inserter.ts" />
/// <reference path="core/JQuery.ts" />
/// <reference path="core/JQEventAttachment.ts" />
/// <reference path="core/Template.ts" />
/// <reference path="core/TemplateOutput.ts" />
/// <reference path="property/AttrUpdater.ts" />
/// <reference path="property/CheckedListener.ts" />
/// <reference path="property/ClassUpdater.ts" />
/// <reference path="property/ClassNameUpdater.ts" />
/// <reference path="property/CssUpdater.ts" />
/// <reference path="property/HtmlUpdater.ts" />
/// <reference path="property/PropBinding.ts" />
/// <reference path="property/PropUpdater.ts" />
/// <reference path="property/RadioBinding.ts" />
/// <reference path="property/RadioListener.ts" />
/// <reference path="property/RadioUpdater.ts" />
/// <reference path="property/TextUpdater.ts" />
/// <reference path="property/ValueBinding.ts" />
/// <reference path="property/ValueListener.ts" />
/// <reference path="property/ValueUpdater.ts" />
/// <reference path="property/VisibleUpdater.ts" />
;
/// <reference path="../jwui.ref.ts" />
var JW;
(function (JW) {
    /**
     * Main jWidget UI library namespace.
     */
    var UI;
    (function (UI) {
        /**
         * Some code is taken from jQuery. We are not happy with standard jQuery.parseHtml, because it is slow.
         * We implement an own parseHtml which omits a good bunch of useless manupulations.
         *
         * @hidden
         */
        var wrapMap = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
        /**
         * @hidden
         */
        var rtagName = /^<([\w:]+)/;
        /**
         * @hidden
         */
        var _fragment = null;
        /**
         * Defines HTML templates for specified [[JW.UI.Component]] subclass.
         *
         * You can define multiple templates for any subclass of [[JW.UI.Component]]. Each template has a name.
         * You can get component template via [[JW.UI.Component.templates|templates]] dictionary.
         *
         * Templates are inherited along with component classes.
         *
         * Each component class has at least one template, its name is `main`. This is the main template which is
         * used to render the component. By default, `main` equals to `<div></div>`.
         * Usually, `main` template is enough for the majority of components. This template is applied automatically,
         * unlike other templates which should be applied manually.
         *
         * This function is called automatically if you attach `jw.html` files via
         * <a href="https://github.com/enepomnyaschih/jwsdk/wiki" target="_blank">jWidget SDK</a>. See
         * "Getting started. Part 7. Project infrastructure" guide for details.
         *
         * @param cls [[JW.UI.Component]] subclass.
         * @param tpls Templates to add or override.
         */
        function template(cls, tpls) {
            var templates = JW.Map.map(tpls, function (html) {
                return new UI.Template(html);
            });
            if (cls.prototype.Templates && cls.prototype.Templates.componentCls == cls) {
                JW.apply(cls.prototype.Templates.prototype, templates);
            }
            else {
                function __() { }
                __.prototype = (cls.prototype.Templates || JW.Class).prototype;
                cls.prototype.Templates = function () { };
                cls.prototype.Templates.prototype = new __();
                cls.prototype.Templates.componentCls = cls;
                JW.apply(cls.prototype.Templates.prototype, templates);
                cls.prototype.templates = new cls.prototype.Templates();
            }
        }
        UI.template = template;
        /**
         * Checks if v is a <a href="http://api.jquery.com/" target="_blank">jQuery</a> element.
         */
        function isElement(v) {
            return v instanceof jQuery.fn.init;
        }
        UI.isElement = isElement;
        /**
         * @hidden
         */
        function preventDefault(event) {
            event.preventDefault();
        }
        UI.preventDefault = preventDefault;
        /**
         * @hidden
         */
        function isLifeInput(el) {
            var $el = jQuery(el);
            var tagName = $el[0].tagName.toLowerCase();
            if (tagName === "input") {
                var type = $el.attr("type");
                return (type === "text") || (type !== "password");
            }
            return tagName === "textarea";
        }
        UI.isLifeInput = isLifeInput;
        /**
         * @hidden
         */
        function insert(parent, child, index) {
            if ((index == null) || (index >= parent.childNodes.length)) {
                parent.appendChild(child);
            }
            else {
                parent.insertBefore(child, parent.childNodes.item(index));
            }
        }
        UI.insert = insert;
        /**
         * @hidden
         */
        function remove(el) {
            if (el.parentNode) {
                el.parentNode.removeChild(el);
            }
        }
        UI.remove = remove;
        /**
         * @hidden
         */
        function parseHtml(html) {
            if (_fragment) {
                _fragment.textContent = "";
            }
            else {
                _fragment = document.createDocumentFragment();
            }
            var el = document.createElement("div");
            _fragment.appendChild(el);
            var tagName = rtagName.exec(html)[1];
            var wrap = wrapMap[tagName] || wrapMap._default;
            el.innerHTML = wrap[1] + html + wrap[2];
            for (var i = 0; i < wrap[0]; ++i) {
                el = (el.firstChild);
            }
            return (el.firstChild);
        }
        UI.parseHtml = parseHtml;
        /**
         * @hidden
         */
        function hasClass(el, cls) {
            return (" " + el.className + " ").indexOf(cls) !== -1;
        }
        UI.hasClass = hasClass;
        /**
         * @hidden
         */
        function addClass(el, cls) {
            if (!el.className) {
                el.className = cls;
            }
            else if (!hasClass(el, cls)) {
                el.className += " " + cls;
            }
        }
        UI.addClass = addClass;
        /**
         * @hidden
         */
        function inDom(el) {
            while (el) {
                if (el.tagName.toLowerCase() === "body") {
                    return true;
                }
                el = (el.parentNode);
            }
            return false;
        }
        UI.inDom = inDom;
        /**
         * @hidden
         */
        function inEl(childEl, parentEl) {
            while (childEl) {
                if (childEl === parentEl) {
                    return true;
                }
                childEl = childEl.parentElement;
            }
            return false;
        }
        UI.inEl = inEl;
        /**
         * @hidden
         */
        function replace(removeEl, insertEl, attrs) {
            var parentEl = removeEl.parentNode;
            if (!parentEl) {
                return;
            }
            var id = attrs ? removeEl.getAttribute("id") : null, cls = attrs ? removeEl.getAttribute("class") : null;
            parentEl.replaceChild(insertEl, removeEl);
            if (id) {
                insertEl.setAttribute("id", id);
            }
            if (cls) {
                addClass(insertEl, cls);
            }
        }
        UI.replace = replace;
        /**
         * @hidden
         */
        function _afterAppend(child) {
            child._afterAppend();
        }
        UI._afterAppend = _afterAppend;
        (function (wrapMap) {
            wrapMap.optgroup = wrapMap.option;
            wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
            wrapMap.th = wrapMap.td;
        })(wrapMap);
        jQuery(function () {
            UI.windowEl = jQuery(window);
            UI.bodyEl = jQuery(document.body);
        });
    })(UI = JW.UI || (JW.UI = {}));
})(JW || (JW = {}));
;
/// <reference path="../jwui.ref.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JW;
(function (JW) {
    var UI;
    (function (UI) {
        /**
         * Abstract view synchronizer. See [[Inserter]] for details.
         */
        var AbstractInserter = (function (_super) {
            __extends(AbstractInserter, _super);
            /**
             * @param source Source array.
             * @param el Parent element.
             */
            function AbstractInserter(source, el) {
                _super.call(this);
                this.el = el;
                this.own(source.createInserter({
                    addItem: this._addItem,
                    removeItem: this._removeItem,
                    scope: this
                }));
            }
            /**
             * @hidden
             */
            AbstractInserter.prototype._getElement = function (item) {
                throw new SyntaxError("Method not implemented");
            };
            /**
             * @hidden
             */
            AbstractInserter.prototype._addItem = function (item, index) {
                var parent = this.el;
                var anchor = parent.childNodes[index];
                var child = this._getElement(item);
                if (anchor != null) {
                    parent.insertBefore(child, anchor);
                }
                else {
                    parent.appendChild(child);
                }
            };
            /**
             * @hidden
             */
            AbstractInserter.prototype._removeItem = function (item, index) {
                UI.remove(this._getElement(item));
            };
            return AbstractInserter;
        })(JW.Class);
        UI.AbstractInserter = AbstractInserter;
    })(UI = JW.UI || (JW.UI = {}));
})(JW || (JW = {}));
;
/// <reference path="../jwui.ref.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JW;
(function (JW) {
    var UI;
    (function (UI) {
        /**
         * Abstract HTML template.
         */
        var AbstractTemplate = (function (_super) {
            __extends(AbstractTemplate, _super);
            function AbstractTemplate() {
                _super.apply(this, arguments);
                /**
                 * @hidden
                 */
                this.prefixes = null;
                /**
                 * The parent IDs of [key] item.
                 * @hidden
                 */
                this.parentIdMap = null;
                /**
                 * The child IDs of [key] item.
                 * @hidden
                 */
                this.childIdMap = null;
                /**
                 * ID's in dependency order.
                 * @hidden
                 */
                this.ids = null;
                /**
                 * @hidden
                 */
                this.requiresAfterAppend = false;
            }
            /**
             * Renders the template. See [[TemplateOutput]] for details.
             */
            AbstractTemplate.prototype.createElement = function () {
                throw new SyntaxError("Method not implemented");
            };
            /**
             * @hidden
             */
            AbstractTemplate.prototype._addElement = function (id, el, path) {
                throw new SyntaxError("Method not implemented");
            };
            /**
             * @hidden
             */
            AbstractTemplate.prototype._compileAttributes = function (root) {
                this.prefixes = JW.String.parseClass(root.getAttribute("jwclass"));
                root.removeAttribute("jwclass");
                for (var i = 0, l = this.prefixes.length; i < l; ++i) {
                    UI.addClass(root, this.prefixes[i]);
                }
                this.parentIdMap = {};
                this.childIdMap = {};
                // add elements to groups and fill in dependencies
                this._walkAll(root);
                // resolving dependencies to a plain list of IDs
                this.ids = [];
                this._backtrace("root");
                // check for trash
                var remainingIds = JW.Map.getKeys(this.parentIdMap);
                if (remainingIds.length !== 0) {
                    // some ID's may not have been backtraced if they are assigned to the root element,
                    // so we must backtrace them to make sure that everything is processed
                    JW.Array.each(remainingIds, this._backtrace, this);
                    remainingIds = JW.Map.getKeys(this.parentIdMap);
                    if (remainingIds.length !== 0) {
                        console.warn("jWidget template '" + this.prefixes.join(" ") +
                            "' has cyclic dependencies among the next jwid's: " + remainingIds.join(", ") +
                            ". Can't detect the desired rendering order. Rendering elements in arbitrary order...");
                        this.ids.push.apply(this.ids, remainingIds);
                    }
                }
                this.prefixes = null;
                this.parentIdMap = null;
                this.childIdMap = null;
            };
            /**
             * @hidden
             */
            AbstractTemplate.prototype._walkAll = function (root) {
                var _this = this;
                this._walk(root, [], [], function (el, path) {
                    var attr = el.getAttribute("jwid");
                    if (!attr) {
                        return null;
                    }
                    var ids = JW.String.parseClass(attr);
                    el.removeAttribute("jwid");
                    var l = ids.length;
                    if (l === 0) {
                        return null;
                    }
                    for (var i = 0; i < l; ++i) {
                        var id = ids[i];
                        for (var j = 0, n = _this.prefixes.length; j < n; ++j) {
                            UI.addClass(el, _this.prefixes[j] + "-" + id);
                        }
                        _this._addElement(id, el, path);
                    }
                    return ids;
                }, this);
                this._addElement("root", root, []);
            };
            /**
             * @hidden
             */
            AbstractTemplate.prototype._walk = function (el, path, parentIds, callback, scope) {
                if (el.nodeType !== 1) {
                    return;
                }
                var childIds = callback.call(scope, el, path);
                if (path.length === 0) {
                    childIds = childIds || [];
                    childIds.push("root");
                }
                if (childIds !== null) {
                    for (var i = 0, l = childIds.length; i < l; ++i) {
                        var childId = childIds[i];
                        this.parentIdMap[childId] = this.parentIdMap[childId] || {};
                        for (var j = 0, m = parentIds.length; j < m; ++j) {
                            var parentId = parentIds[j];
                            this.childIdMap[parentId] = this.childIdMap[parentId] || {};
                            this.parentIdMap[childId][parentId] = true;
                            this.childIdMap[parentId][childId] = true;
                        }
                    }
                    parentIds = childIds;
                }
                var index = path.length;
                path.push(0);
                var childNodes = el.childNodes;
                for (var i = 0, l = childNodes.length; i < l; ++i) {
                    path[index] = i;
                    this._walk(childNodes[i], path, parentIds, callback, scope);
                }
                path.pop();
            };
            /**
             * @hidden
             */
            AbstractTemplate.prototype._backtrace = function (id) {
                // if this element has already been processed, skip it
                var parentIds = this.parentIdMap[id];
                if (parentIds === undefined) {
                    return;
                }
                // if this element still has parents, skip it
                for (var parentId in parentIds) {
                    if (this.parentIdMap.hasOwnProperty(parentId)) {
                        return;
                    }
                }
                // remove the element from graph
                delete this.parentIdMap[id];
                this.ids.push(id);
                // traverse into children
                var childIds = this.childIdMap[id];
                for (var childId in childIds) {
                    this._backtrace(childId);
                }
            };
            return AbstractTemplate;
        })(JW.Class);
        UI.AbstractTemplate = AbstractTemplate;
    })(UI = JW.UI || (JW.UI = {}));
})(JW || (JW = {}));
;
/// <reference path="../jwui.ref.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JW;
(function (JW) {
    var UI;
    (function (UI) {
        /**
         * Base class of UI component.
         *
         * Features:
         *
         * - Rendering by HTML template
         * - Direct access to component elements
         * - <a href="http://api.jquery.com/" target="_blank">jQuery-interface</a> for element manipulations
         * - Convenient API for child component management
         *
         * jWidget has very simple interface, but pretty unusual philosophy, which guarantees Model-View architecture
         * following without a lot of effort. Let's start with examples.
         *
         * ### jWidget UI-component example
         *
         *     // Define namespace
         *     var MyApp = {};
         *
         *     // Define component constructor
         *     MyApp.Component = function(message, link) {
         *         MyApp.Component._super.call(this);
         *         this.message = message;
         *         this.link = link;
         *     };
         *
         *     // Inherit from JW.UI.Component
         *     JW.extend(MyApp.Component, JW.UI.Component, {
         *         // String message;
         *         // String link;
         *
         *         // override
         *         afterRender: function() {
         *             this._super();
         *             this.getElement("hello-message").text(this.message);
         *             this.getElement("link").attr("href", this.link);
         *         }
         *     });
         *
         *     JW.UI.template(MyApp.Component, {
         *         main:
         *             '<div jwclass="myapp-component">' +
         *                 '<div jwid="hello-message"></div>' +
         *                 '<a href="#" jwid="link">Click me!</a>' +
         *             '</div>'
         *     });
         *
         * Let's learn, how HTML-template works. Each component has main template, which is passed into
         * JW.UI.template function with name `main` and defaults to
         * <code>&lt;div&gt;&lt;/div&gt;</code>. You can add other templates as well, they'll be available in component's field
         * <code>this.templates.&lt;template_name&gt;</code> (but they are not used usually).
         * Subclass inherits superclass templates.
         *
         * Take a note at special attributes `jwclass` and `jwid`. `jwclass` is root CSS-class of component,
         * `jwid` is a suffix to `jwclass` in this element. So, next HTML fragment will be rendered in result
         * of this component rendering:
         *
         *     <div class="myapp-component">
         *         <div class="myapp-component-hello-message"></div>
         *         <a href="#" class="myapp-component-link">Click me!</a>
         *     </div>
         *
         * You can retrieve an element by its `jwid` using method [[getElement]]. Result of this method is
         * a <a href="http://api.jquery.com/" target="_blank">jQuery-wrapper</a> over this element. Root element always has jwid "root".
         * In addition, root element of the component is stored in [[el]] property.
         *
         * ### Component creation in code
         *
         * Component can be created by simple construction of component object. After that, you can use method [[renderTo]]
         * or [[renderAs]] in order to insert this component into DOM.
         *
         *     var component;
         *
         *     jQuery(function() {
         *         component = new MyApp.Component("Hello world!", "http://google.com");
         *         component.renderTo("body");
         *     });
         *
         * ### Child components
         *
         * There are 5 ways to add a child component:
         *
         * - Add a child component into [[children]] map with a key equal to `jwid` of element to replace with the child
         * component. Usually it is done in [[afterRender]] method.
         * - Add an easily replaceable child component using [[addReplaceable]] method. Pass [[JW.Property]] there and
         * the framework will provide the continuous synchronization with this property during application running.
         * - Add an array of child components into some element using [[addArray]] method. If the passed array
         * is [[JW.ObservableArray]], then framework will provide the continuous synchronization with this array during
         * application running.
         * - Add a collection of child components into some element using [[addCollection]] method. As opposed to [[addArray]]
         * method, [[addCollection]] doesn't keep the child component order. A newly added component is always appended to the
         * end. If the passed collection is observable, then framework will provide the continuous synchronization with this
         * collection during application running.
         * - Define method <code>render&lt;ChildId&gt;</code>, where <code>&lt;ChildId&gt;</code> is `jwid` of element,
         * written in CamelCase with capitalized first letter. Example: `renderArticle` (renders element `jwid="article"`).
         * If the method returns JW.UI.Component, [[JW.Property]] or [[JW.AbstractCollection]], then result will be treated as child component
         * or child component collection. Define method `renderRoot` to render root element, but you can return [[JW.AbstractCollection]]
         * only there.
         * See **More about render&lt;ChildId&gt; method** paragraph for details.
         *
         * Such interface provides simplicity, at one hand, and flexibility in Model-View architecture following regard,
         * at another hand.
         *
         * [Getting started. Part 1. Model and view](#!/guide/ensample1)
         *
         * ### More about child component collections
         *
         * It is convenient to use [[JW.AbstractCollection.$$mapObjects|$$mapObjects]] method to convert data collections into UI component collections.
         * Thanks to it, view will be updated on data update automatically.
         *
         * That's the reason why we recommend to use jWidget collections in data model instead of native JavaScript
         * Array and Object: jWidget collections have observable implementations which can be synchronized to each other.
         *
         * [Getting started. Part 6. Collection synchronizers](#!/guide/ensample6)
         *
         * ### More about render&lt;ChildId&gt; method
         *
         * You can define method `render<ChildId>` for every element in HTML template that has attribute `jwid`.
         * `<ChildId>` equals to this `jwid`, written in CamelCase with capitalized first letter. Method signature:
         *
         * <code>renderChildId(el: <a href="http://api.jquery.com/" target="_blank">jQuery</a>): Mixed</code>
         *
         * `el` - element with corresponding `jwid`.
         *
         * Depending on the returned result of this method, there are next capabilities:
         *
         * - If method returns JW.UI.Component, then it will be added into [[children]] map and will become a child component.
         * Doesn't work for root element.
         * - If method returns JW.Property, then it will be added as easily replaceable child component by
         * method [[addReplaceable]]. Doesn't work for root element.
         * - If method returns JW.AbstractArray, then it will be added as child array by method [[addArray]].
         * - If method returns JW.AbstractCollection (which is not JW.AbstractArray), then it will be added as child
         * collection by method [[addCollection]].
         * - If method returns `false` (===), then element will be removed from component HTML. Doesn't work for root element.
         * - In any other case, framework won't perform any additional action.
         *
         * ### Components removal and destruction
         *
         * You can destroy the component via [[destroy]] method. However you can not destroy a component which is added into
         * another one as a child (framework will throw an exception in this case). You must remove child component from a
         * parent first. To remove the component from a parent, you must perform the operation opposite to adding operation.
         *
         * - If you have added a component to [[children]] object, you must remove it via
         * [[JW.AbstractMap.remove|remove]] method.
         * - Method [[addReplaceable]] returns an instance of [[JW.UI.Component.Replaceable]]. Its destruction removes the
         * replaceable child.
         * - Method [[addArray]] returns an instance of [[JW.UI.Component.Array]]. Its destruction removes the array.
         * - Method [[addCollection]] returns an instance of [[JW.UI.Component.Collection]]. Its destruction removes the collection.
         *
         * As soon as child component is removed, you can destroy it:
         *
         *     this.children.remove("comments").destroy();
         *
         * Another example:
         *
         *     // should be called not before the rendering initiation
         *     initLabels: function() {
         *         this._labelViews = this.labels.$$mapObjects(function(label) {
         *             return new LabelView(label);
         *         }, this);
         *         // Add labels into element with jwid="labels"
         *         this._labelArray = this.addArray(this._labelViews, "labels");
         *     },
         *
         *     clearLabels: function() {
         *         this._labelArray.destroy();
         *         this._labelArray = null;
         *         this._labelViews.destroy();
         *         this._labelViews = null;
         *     }
         *
         * You don't need to remove child components explicitly all the time. On parent component destruction, framework
         * automatically removes all the children before [[unrender]] method call. However, it doesn't destroy them.
         * You can use aggregation method [[JW.Class.own|own]] to destroy the child components. So, usually your code will
         * look as simple as this:
         *
         *     renderTitleBox: function() {
         *         return this.own(new TitleBox());
         *     },
         *
         *     renderLabels: function() {
         *         return this.(this.labels.$$mapObjects(function(label) {
         *             return new LabelView(label);
         *         }, this));
         *     }
         *
         * ### Common practices of child component management
         *
         * **Create child component**
         *
         * This example describes how to create and destroy a child component with `jwid="title-box"`.
         *
         *     var MyComponent = function() {
         *         MyComponent._super.call(this);
         *     };
         *
         *     JW.extend(MyComponent, JW.UI.Component, {
         *         renderTitleBox: function() {
         *             return this.own(new TitleBox());
         *         }
         *     });
         *
         *     JW.UI.template(MyComponent, {
         *         main:
         *             '<div jwclass="my-component">' +
         *                 '<div jwid="title-box"></div>' +
         *             '</div>'
         *     });
         *
         * **Create replaceable child component**
         *
         * This example describes how to create an easily replaceable child component with `jwid="document"`.
         * Assume that you have a property "document" and want to replace an old document view with a new one
         * on document change.
         *
         *     var MyComponent = function(document) {
         *         MyComponent._super.call(this);
         *         this.document = document;
         *     };
         *
         *     JW.extend(MyComponent, JW.UI.Component, {
         *         // JW.Property<Document> document;
         *
         *         renderDocument: function() {
         *             return this.own(this.document.$$mapObject(function(document) {
         *                 return new DocumentView(document);
         *             }, this));
         *         }
         *     });
         *
         *     JW.UI.template(MyComponent, {
         *         main:
         *             '<div jwclass="my-component">' +
         *                 '<div jwid="document"></div>' +
         *             '</div>'
         *     });
         *
         * **Create child collection**
         *
         * This example describes how to create and destroy child components by data collection, and insert them into
         * element with `jwid="labels"`. If data collection is observable, child collection will be constantly synchronized with data.
         *
         *     var MyComponent = function(labels) {
         *         MyComponent._super.call(this);
         *         this.labels = labels;
         *     };
         *
         *     JW.extend(MyComponent, JW.UI.Component, {
         *         // JW.AbstractArray<Label> labels;
         *
         *         renderLabels: function() {
         *             return this.own(this.labels.$$mapObjects(function(label) {
         *                 return new LabelView(label);
         *             }, this));
         *         }
         *     });
         *
         *     JW.UI.template(MyComponent, {
         *         main:
         *             '<div jwclass="my-component">' +
         *                 '<div jwid="labels"></div>' +
         *             '</div>'
         *     });
         *
         * **Add existing components as children**
         *
         * This example describes how to insert child components which were created by someone else, and therefore
         * shouldn't be destroyed automatically. Here, "titleBox" can be either JW.UI.Component, or
         * [[JW.Property]]<JW.UI.Component>, or [[JW.AbstractCollection]]<JW.UI.Component>.
         *
         *     var MyComponent = function(titleBox) {
         *         MyComponent._super.call(this);
         *         this.titleBox = titleBox;
         *     };
         *
         *     JW.extend(MyComponent, JW.UI.Component, {
         *         // Mixed titleBox;
         *
         *         renderTitleBox: function() {
         *             return this.titleBox;
         *         }
         *     });
         *
         *     JW.UI.template(MyComponent, {
         *         main:
         *             '<div jwclass="my-component">' +
         *                 '<div jwid="title-box"></div>' +
         *             '</div>'
         *     });
         *
         * ### Component life stages
         *
         * Each component has several stages of life.
         *
         * 1. Like in all other classes, **constructor** is called first. Usually all fields are defined and assigned to
         * their initial values here, events are created etc. Only component model should be touched here, view is completely
         * ignored. Notice that component is not rendered after construction yet, so it doesn't have
         * fields [[el]] and [[children]], methods [[addArray]], [[addCollection]] and [[addReplaceable]] won't work.
         * The main reason of that is to give you ability to
         * do something else between component construction and rendering, for example, change some field values and call
         * some methods. Second reason: it is not recommended to call virtual methods in constructor in any object-oriented
         * language. You can render the component directly by calling [[render]], [[renderTo]], [[renderAs]],
         * or by adding this component into another component as a child. For example, component will be rendered immediately
         * after adding into [[children]] map. You can invoke component rendering multiple times, but it will be rendered only
         * on first invokation.
         * 1. Method [[beforeRender]] is called during rendering, after HTML template reading and initialization of all links to
         * this template elements. It is convenient to perform some preliminary action here before child components creation.
         * But you are already able to create child components here. <code>this._super()</code> call is performed at first line
         * of method.
         * 1. All <code>render&lt;ChildId&gt;</code> methods are called for HTML template elements, i.e. child component
         * creation is performed.
         * 1. Method [[afterRender]] is called. You should assign all elements' attributes here, create child components,
         * bind to events and fill component with interactivity. Component rendering is finished here.
         * <code>this._super()</code> call is performed at first line of method.
         * 1. Method [[afterAppend]] is called once the component first time appears in HTML DOM and UI component tree.
         * Component layouting should be performed here (calculate element sizes).
         * <code>this._super()</code> call is performed at first line of method.
         * 1. Method [[releaseDom]] is called during component destruction. Everything that was performed in [[afterAppend]] method,
         * i.e. on step 5, should be reverted here. <code>this._super()</code> method call is performed at last line of method.
         * 1. Method [[unrender]] is called during component destruction. Everything that was performed during component
         * rendering, i.e. on steps 2-4, should be reverted here. All child components are already removed by framework
         * before this method call, but the components themselves are not destroyed. You must destroy them explicitly unless
         * you used [[JW.Class.own|own]] method to aggregate them.
         * <code>this._super()</code> method call is performed at last line of method.
         * 1. Method [[afterDestroy]] is called during component destruction. Everything that was performed in component
         * constructor, i.e. on step 1, should be reverted here. <code>this._super()</code> method call is performed
         * at last line of method.
         *
         * ### Intergration with jWidget SDK
         *
         * jWidget UI library is integrated with <a href="https://github.com/enepomnyaschih/jwsdk/wiki/en" target="_blank">jWidget SDK</a> perfectly, and
         * it gives you nice code optimizations of JS-code out of the box and capability to extract HTML templates into
         * separate files. For example, you can simplify the very first example by splitting code into 2 files:
         *
         * **component.js**
         *
         *     // Define namespace
         *     var MyApp = {};
         *
         *     // Define component constructor
         *     MyApp.Component = function(message, link) {
         *         MyApp.Component._super.call(this);
         *         this.message = message;
         *         this.link = link;
         *     };
         *
         *     // Inherit from JW.UI.Component
         *     JW.extend(MyApp.Component, JW.UI.Component, {
         *         // String message;
         *         // String link;
         *
         *         // override
         *         afterRender: function() {
         *             this._super();
         *             this.getElement("hello-message").text(this.message);
         *             this.getElement("link").attr("href", this.link);
         *         }
         *     });
         *
         * **component.jw.html**
         *
         *     <div jwclass="myapp-component">
         *         <div jwid="hello-message"></div>
         *         <a href="#" jwid="link">Click me!</a>
         *     </div>
         *
         * To make this work, you just need to register the next resources in corresponding jWidget SDK package:
         *
         *     {
         *         "resources" : [
         *             "component.js",
         *             "component.jw.html : MyApp.Component",
         *             ...
         *         ]
         *     }
         *
         * Sure, you can use jWidget even without jWidget SDK, but in this case you'll need to either load HTML templates
         * dinamically or define them explicitly right in JavaScript code using JW.UI.template function.
         *
         * See more complicated example in article:
         *
         * [Getting started. Part 7. Project infrastructure](#!/guide/ensample7)
         *
         * ### Clear-div persistence
         *
         * As of jWidget 1.4, you may render child collections to non-blank DOM elements. In this case, all existing nodes
         * stay at the end of the element. The most common application of this feature
         * is <a href="https://css-tricks.com/the-how-and-why-of-clearing-floats/" target="_blank">clear-div usage</a>.
         *
         * <iframe style="border: 1px solid green; padding: 10px;" width="600" height="260" src="http://enepomnyaschih.github.io/mt/1.4/jwui-clear-div.html"></iframe>
         */
        var Component = (function (_super) {
            __extends(Component, _super);
            /**
             * Creates a component instance.
             */
            function Component() {
                _super.call(this);
                /**
                 * Parent component. Field is available from component rendering beginning.
                 */
                this.parent = null;
                /**
                 * Was [[afterAppend]] called?
                 */
                this.wasAfterAppend = false;
                /**
                 * Root element. Field is available from component rendering beginning.
                 */
                this.el = null;
                /**
                 * Mutable named child components. Use this map to add child components in place of
                 * elements with corresponding `jwid`. Field is available from component rendering beginning.
                 */
                this.children = null;
                /**
                 * @hidden
                 */
                this._template = null;
                /**
                 * @hidden
                 */
                this._elements = null;
                /**
                 * @hidden
                 */
                this._replaceables = null;
                /**
                 * @hidden
                 */
                this._arrays = null;
                /**
                 * @hidden
                 */
                this._collections = null;
                this._template = this.templates['main'];
            }
            /**
             * @inheritdoc
             */
            Component.prototype.destroy = function () {
                if (this.parent) {
                    throw new Error("JW.UI.Component.destroy must be used for root and detached components only");
                }
                if (this.wasAfterAppend) {
                    this.releaseDom();
                }
                if (this.el) {
                    UI.remove(this.el[0]);
                    JW.Set.each(this._collections, JW.destroy);
                    this._collections = null;
                    JW.Set.each(this._arrays, JW.destroy);
                    this._arrays = null;
                    JW.Set.each(this._replaceables, JW.destroy);
                    this._replaceables = null;
                    this.children.unrender();
                    this.unrender();
                    this.children.destroy();
                    this.children = null;
                    this.el.remove();
                }
                this._elements = null;
                this.el = null;
                this.afterDestroy();
                _super.prototype.destroy.call(this);
            };
            /**
             * Component life stage method. Called during component rendering after HTML template parsing and initialization
             * of references to all elements of the template. Called before `render<ChildId>` methods and
             * [[afterRender]] method. It is convenient to perform some preliminary action here before child
             * components creation. But you are already able to create child components here. <code>this._super()</code>
             * call is performed at first line of method.
             */
            Component.prototype.beforeRender = function () {
            };
            /**
             * Component life stage method. Called after [[beforeRender]] method and `render<ChildId>` methods.
             * You should assign all elements' attributes here, create child components,
             * bind to events and fill component with interactivity. <code>this._super()</code> call is performed at
             * first line of method.
             */
            Component.prototype.afterRender = function () {
            };
            /**
             * Component life stage method. Called after first-time component appearing in HTML DOM and UI components tree.
             * Component layouting should be performed here (calculate element sizes).
             * Component rendering is finished here. <code>this._super()</code> call is performed at first line of method.
             */
            Component.prototype.afterAppend = function () {
            };
            /**
             * Component life stage method. Called during component destruction before [[unrender]] method call.
             * Everything that was performed in [[afterAppend]] method should be reverted here.
             */
            Component.prototype.releaseDom = function () {
            };
            /**
             * Component life stage method. Called during component destruction before [[afterDestroy]] method call.
             * Everything that was performed during component
             * rendering should be reverted here. All child component arrays are already removed by framework
             * before this method call, but the components themselves are not destroyed. You must destroy them explicitly.
             * Unlike arrays, named child component will be destroyed automatically after [[unrender]] method, so you must
             * remove them from [[children]] map if you want to keep them alive. <code>this._super()</code> method call is performed
             * at last line of method.
             */
            Component.prototype.unrender = function () {
            };
            /**
             * Component life stage method. Called during component destruction after [[unrender]] method call.
             * Everything that was performed during component construction should be reverted here.
             * <code>this._super()</code> method call is performed at last line of method.
             */
            Component.prototype.afterDestroy = function () {
            };
            /**
             * Virtual method to render the component document fragment.
             * By default, renders `main` HTML [[template|templates]].
             */
            Component.prototype.createElement = function () {
                return this._template.createElement();
            };
            Component.prototype.using = function (value) {
                this._template =
                    (typeof value === "string") ? new UI.Template(value) :
                        (value instanceof UI.Template) ? value : new UI.DomTemplate(value);
                return this;
            };
            /**
             * Renders component. Call this method to initialize references to all elements of component and create
             * child components. This method is called automatically in next cases:
             *
             * - One of methods [[renderTo]], [[renderAs]] is called
             * - The component is added into another component as a child
             *
             * Feel free to call component rendering multiple times: it will be rendered only once.
             *
             * @returns this
             */
            Component.prototype.render = function () {
                if (this.el) {
                    return this;
                }
                var output = this.createElement();
                this.el = jQuery(output.root);
                this._elements = JW.Map.map(output.groups, function (x) { return jQuery(x); });
                this.children = new Component.Children(this);
                this._replaceables = {};
                this._arrays = {};
                this._collections = {};
                this.beforeRender();
                var elements = JW.apply({}, this._elements);
                for (var jwId in elements) {
                    var element = elements[jwId];
                    var aliveElements = JW.Array.filter(element, function (el) {
                        return UI.inEl(el, this.el[0]);
                    }, this);
                    if (aliveElements.length === 0) {
                        delete this._elements[jwId];
                        continue;
                    }
                    if (aliveElements.length !== element.length) {
                        element = jQuery(aliveElements);
                        this._elements[jwId] = element;
                    }
                    var jwIdCamel = JW.String.camel(jwId);
                    var renderMethodName = "render" + JW.String.capitalize(jwIdCamel);
                    if (typeof this[renderMethodName] === "function") {
                        var result = this[renderMethodName](element);
                        if (jwId === "root") {
                            if (result instanceof JW.AbstractArray) {
                                this.addArray(result, jwId);
                            }
                            else if (result instanceof JW.AbstractCollection) {
                                this.addCollection(result, jwId);
                            }
                        }
                        else {
                            if (result instanceof Component) {
                                this.children.set(result, jwId);
                            }
                            else if (result instanceof JW.Property) {
                                this.addReplaceable(result, jwId);
                            }
                            else if (result instanceof JW.AbstractArray) {
                                this.addArray(result, jwId);
                            }
                            else if (result instanceof JW.AbstractCollection) {
                                this.addCollection(result, jwId);
                            }
                            else if (result === false) {
                                this.removeElement(jwId);
                            }
                        }
                    }
                }
                this.afterRender();
                if (this._template.requiresAfterAppend) {
                    this._afterAppend();
                }
                return this;
            };
            /**
             * Renders component into specified element. Use it to render root component only: its children must be rendered
             * using [[children]] or [[addArray]] stuff.
             *
             * @param el Element to render component into.
             * @returns this
             */
            Component.prototype.renderTo = function (el) {
                this.render();
                jQuery(el)[0].appendChild(this.el[0]);
                this._afterAppend();
                return this;
            };
            /**
             * Render component in place of specified element. Use it to render root component only: its children must be rendered
             * using [[children]] or [[addArray]] stuff.
             *
             * @param el Element to render component in place of.
             * @returns this
             */
            Component.prototype.renderAs = function (el) {
                this.render();
                UI.replace(jQuery(el)[0], this.el[0], true);
                this._afterAppend();
                return this;
            };
            /**
             * Remove component from DOM. Can be used for root component only (which was added via [[renderTo]] or [[renderAs]]
             * method. All child components should be removed using [[children]] or [[JW.UI.Component.Array]] stuff.
             *
             * @returns this
             */
            Component.prototype.remove = function () {
                if (this.parent) {
                    throw new Error("JW.UI.Component.remove must be used for root components only");
                }
                UI.remove(this.el[0]);
                return this;
            };
            /**
             * Get element by its `jwid`.
             * @param jwid of the element.
             */
            Component.prototype.getElement = function (id) {
                return this._elements[id];
            };
            /**
             * Remove element by `jwid`. Element will be removed from DOM and it will be impossible to get it
             * by [[getElement]] method.
             * @param jwid of the element.
             */
            Component.prototype.removeElement = function (id) {
                var el = this._elements[id];
                if (!el) {
                    return;
                }
                el.remove();
                delete this._elements[id];
            };
            /**
             * Add an easily replaceable child component into specified element.
             *
             * Pass an instance of [[JW.Property]]<JW.UI.Component>, and view will be synchronized with this property of fly.
             *
             * It is convenient to create "component" property from data property using [[JW.Property.$$mapObject|$$mapObject]] method.
             *
             * Method returns an instance of [[JW.UI.Component.Replaceable]]. This object is purposed for replaceable child
             * removal from parent component. Use [[JW.Class.destroy|destroy]] method to do this.
             * Also, the replaceable is removed from parent component on parent component destruction right
             * before [[unrender]] method call.
             * But notice that child component inside this property ain't destroyed automatically.
             * Usually it can be done by corresponding [[JW.Mapper]] or property destruction in [[unrender]] method.
             *
             * @param component Child component property.
             * @param id jwid of element to replace.
             * @returns Replaceable child component wrapper. Destroy it to remove the replaceable from the component.
             */
            Component.prototype.addReplaceable = function (component, id) {
                return new JW.UI.Component.Replaceable(this, component, id);
            };
            Component.prototype.addArray = function (source, el) {
                return new Component.Array(this, source, this._getContainerElement(el));
            };
            Component.prototype.addCollection = function (source, el) {
                return new Component.Collection(this, source, this._getContainerElement(el));
            };
            /**
             * @hidden
             */
            Component.prototype._afterAppend = function () {
                if (this.wasAfterAppend || !this.el) {
                    return;
                }
                if (this.parent && !this.parent.wasAfterAppend) {
                    return;
                }
                if (!this.parent && !UI.inDom(this.el[0])) {
                    return;
                }
                this.wasAfterAppend = true;
                this.afterAppend();
                this.children.each(UI._afterAppend);
                JW.Set.each(this._arrays, UI._afterAppend);
                JW.Set.each(this._collections, UI._afterAppend);
            };
            /**
             * @hidden
             */
            Component.prototype._initChild = function (component) {
                component.render();
                component.parent = this;
            };
            /**
             * @hidden
             */
            Component.prototype._doneChild = function (component) {
                component.parent = null;
            };
            /**
             * @hidden
             */
            Component.prototype._getContainerElement = function (el) {
                return (el === undefined) ? this.el :
                    (typeof el === "string") ? this._elements[el] : jQuery(el);
            };
            return Component;
        })(JW.Class);
        UI.Component = Component;
        var Component;
        (function (Component) {
            /**
             * Child component array wrapper in [[JW.UI.Component]].
             *
             * Returned by [[JW.UI.Component.addArray|addArray]] method. If you'll destroy this object, child components will be removed
             * from parent.
             */
            var Array = (function (_super) {
                __extends(Array, _super);
                /**
                 * @hidden
                 */
                function Array(parent, source, el) {
                    var _this = this;
                    _super.call(this);
                    this.parent = parent;
                    this.source = source;
                    JW.Set.add(parent._arrays, this);
                    var mapper = this.own(source.createMapper({
                        createItem: function (child) {
                            _this.parent._initChild(child);
                            return child;
                        },
                        destroyItem: function (child) {
                            _this.parent._doneChild(child);
                        },
                        scope: this
                    }));
                    this.own(new Component.Inserter(mapper.target, el[0]));
                }
                /**
                 * @inheritdoc
                 */
                Array.prototype.destroy = function () {
                    JW.Set.remove(this.parent._arrays, this);
                    _super.prototype.destroy.call(this);
                };
                /**
                 * @inheritdoc
                 */
                Array.prototype._afterAppend = function () {
                    this.source.each(UI._afterAppend);
                };
                return Array;
            })(JW.Class);
            Component.Array = Array;
            /**
             * @hidden
             */
            var Child = (function (_super) {
                __extends(Child, _super);
                function Child(parent, child) {
                    _super.call(this);
                    this.parent = parent;
                    this.child = child;
                }
                Child.prototype.attach = function (name) {
                    // JW.assertNull(this.name);
                    this.name = name;
                    this._el = this.parent._elements[name];
                    this.parent._initChild(this.child);
                    this.parent._elements[name] = this.child.el;
                    UI.replace(this._el[0], this.child.el[0], true);
                    this.child._afterAppend();
                };
                Child.prototype.detach = function () {
                    // JW.assertString(this.name, JW.isNotBlank);
                    if (this.parent._elements[this.name] === this.child.el) {
                        this.parent._elements[this.name] = this._el;
                    }
                    UI.replace(this.child.el[0], this._el[0]);
                    this.parent._doneChild(this.child);
                    this._el = null;
                    this.name = null;
                };
                return Child;
            })(JW.Class);
            Component.Child = Child;
            /**
             * @hidden
             */
            var ChildInserter = (function (_super) {
                __extends(ChildInserter, _super);
                function ChildInserter() {
                    _super.apply(this, arguments);
                }
                ChildInserter.prototype.trySet = function (item, key) {
                    var result = _super.prototype.trySet.call(this, item, key);
                    if (result === undefined) {
                        return;
                    }
                    var removedItem = result.value;
                    if (removedItem) {
                        removedItem.detach();
                    }
                    item.attach(key);
                    return result;
                };
                ChildInserter.prototype.trySetKey = function (oldKey, newKey) {
                    var item = _super.prototype.trySetKey.call(this, oldKey, newKey);
                    if (item === undefined) {
                        return;
                    }
                    item.detach();
                    item.attach(newKey);
                    return item;
                };
                ChildInserter.prototype.tryRemove = function (key) {
                    var item = _super.prototype.tryRemove.call(this, key);
                    if (item === undefined) {
                        return;
                    }
                    item.detach();
                    return item;
                };
                ChildInserter.prototype.trySplice = function (removedKeys, updatedItems) {
                    var spliceResult = _super.prototype.trySplice.call(this, removedKeys, updatedItems);
                    if (spliceResult === undefined) {
                        return;
                    }
                    JW.Map.each(spliceResult.removedItems, this._detach, this);
                    JW.Map.each(spliceResult.addedItems, this._attach, this);
                    return spliceResult;
                };
                ChildInserter.prototype.tryClear = function () {
                    var items = _super.prototype.tryClear.call(this);
                    if (items === undefined) {
                        return;
                    }
                    JW.Map.each(items, this._detach, this);
                    return items;
                };
                ChildInserter.prototype.tryReindex = function (keyMap) {
                    var result = _super.prototype.tryReindex.call(this, keyMap);
                    if (result === undefined) {
                        return;
                    }
                    for (var oldKey in keyMap) {
                        var newKey = keyMap[oldKey];
                        var item = this.get(newKey);
                        item.detach();
                        item.attach(newKey);
                    }
                    return result;
                };
                ChildInserter.prototype._attach = function (item, key) {
                    item.attach(key);
                };
                ChildInserter.prototype._detach = function (item) {
                    item.detach();
                };
                return ChildInserter;
            })(JW.Map);
            Component.ChildInserter = ChildInserter;
            /**
             * Mutable named child component map for [[JW.UI.Component]].
             * Use this map to add child components in place of
             * elements with corresponding `jwid`. Field is available from component rendering beginning.
             */
            var Children = (function (_super) {
                __extends(Children, _super);
                /**
                 * @hidden
                 */
                function Children(component) {
                    _super.call(this);
                    this.component = component;
                    this.target = new JW.UI.Component.ChildInserter();
                }
                /**
                 * @hidden
                 */
                Children.prototype.unrender = function () {
                    this.target.destroy();
                };
                /**
                 * @inheritdoc
                 */
                Children.prototype.trySet = function (item, key) {
                    var result = _super.prototype.trySet.call(this, item, key);
                    if (result === undefined) {
                        return;
                    }
                    var child = new Component.Child(this.component, item);
                    this.target.trySet(child, key);
                    return result;
                };
                /**
                 * @inheritdoc
                 */
                Children.prototype.trySetKey = function (oldKey, newKey) {
                    var item = _super.prototype.trySetKey.call(this, oldKey, newKey);
                    if (item === undefined) {
                        return;
                    }
                    this.target.trySetKey(oldKey, newKey);
                    return item;
                };
                /**
                 * @inheritdoc
                 */
                Children.prototype.tryRemove = function (key) {
                    var item = _super.prototype.tryRemove.call(this, key);
                    if (item === undefined) {
                        return;
                    }
                    this.target.tryRemove(key);
                    return item;
                };
                /**
                 * @inheritdoc
                 */
                Children.prototype.trySplice = function (removedKeys, updatedItems) {
                    var _this = this;
                    var spliceResult = _super.prototype.trySplice.call(this, removedKeys, updatedItems);
                    if (spliceResult === undefined) {
                        return;
                    }
                    var removedItems = spliceResult.removedItems;
                    var addedItems = spliceResult.addedItems;
                    var children = JW.Map.map(addedItems, function (item) {
                        return new Component.Child(_this.component, item);
                    }, this);
                    var targetResult = this.target.trySplice(JW.Map.getRemovedKeys(removedItems, addedItems), children);
                    return spliceResult;
                };
                /**
                 * @inheritdoc
                 */
                Children.prototype.tryClear = function () {
                    var items = _super.prototype.tryClear.call(this);
                    if (items === undefined) {
                        return;
                    }
                    this.target.tryClear();
                    return items;
                };
                /**
                 * @inheritdoc
                 */
                Children.prototype.tryReindex = function (keyMap) {
                    var result = _super.prototype.tryReindex.call(this, keyMap);
                    if (result === undefined) {
                        return;
                    }
                    this.target.tryReindex(keyMap);
                    return result;
                };
                return Children;
            })(JW.Map);
            Component.Children = Children;
            /**
             * Child component collection wrapper in [[JW.UI.Component]].
             *
             * Returned by [[JW.UI.Component.addCollection|addCollection]] method. If you'll destroy this object, child components will be removed
             * from parent.
             */
            var Collection = (function (_super) {
                __extends(Collection, _super);
                /**
                 * @hidden
                 */
                function Collection(parent, source, el) {
                    var _this = this;
                    _super.call(this);
                    this.parent = parent;
                    this.source = source;
                    JW.Set.add(parent._collections, this);
                    var mapper = this.own(source.createMapper({
                        createItem: function (child) {
                            _this.parent._initChild(child);
                            return child;
                        },
                        destroyItem: function (child) {
                            _this.parent._doneChild(child);
                        },
                        scope: this
                    }));
                    this.own(new Component.CollectionInserter(mapper.target, el[0]));
                }
                /**
                 * @inheritdoc
                 */
                Collection.prototype.destroy = function () {
                    JW.Set.remove(this.parent._collections, this);
                    _super.prototype.destroy.call(this);
                };
                /**
                 * @inheritdoc
                 */
                Collection.prototype._afterAppend = function () {
                    this.source.each(UI._afterAppend);
                };
                return Collection;
            })(JW.Class);
            Component.Collection = Collection;
            /**
             * @hidden
             */
            var CollectionInserter = (function (_super) {
                __extends(CollectionInserter, _super);
                function CollectionInserter(source, el) {
                    _super.call(this);
                    this.el = el;
                    this.len = 0;
                    this.own(source.createObserver({
                        addItem: this._addItem,
                        removeItem: this._removeItem,
                        scope: this
                    }));
                }
                CollectionInserter.prototype._addItem = function (item) {
                    var parent = this.el;
                    var anchor = parent.childNodes[this.len];
                    var child = item.el[0];
                    if (anchor != null) {
                        parent.insertBefore(child, anchor);
                    }
                    else {
                        parent.appendChild(child);
                    }
                    ++this.len;
                    item._afterAppend();
                };
                CollectionInserter.prototype._removeItem = function (item) {
                    UI.remove(item.el[0]);
                    --this.len;
                };
                return CollectionInserter;
            })(JW.Class);
            Component.CollectionInserter = CollectionInserter;
            /**
             * @hidden
             */
            var Inserter = (function (_super) {
                __extends(Inserter, _super);
                function Inserter() {
                    _super.apply(this, arguments);
                }
                Inserter.prototype._getElement = function (item) {
                    return item.el[0];
                };
                Inserter.prototype._addItem = function (item, index) {
                    _super.prototype._addItem.call(this, item, index);
                    item._afterAppend();
                };
                return Inserter;
            })(UI.AbstractInserter);
            Component.Inserter = Inserter;
            /**
             * Replaceable child component wrapper in [[JW.UI.Component]].
             *
             * Returned by [[JW.UI.Component.addReplaceable|addReplaceable]] method. If you'll destroy this object, replaceables child component
             * will be removed from parent and element will return to its original state.
             */
            var Replaceable = (function (_super) {
                __extends(Replaceable, _super);
                /**
                 * @hidden
                 */
                function Replaceable(parent, component, id) {
                    var _this = this;
                    _super.call(this);
                    this.parent = parent;
                    this.id = id;
                    JW.Set.add(parent._replaceables, this);
                    this.own(new JW.Switcher([component], {
                        init: function (child) {
                            _this.parent.children.set(child, _this.id);
                        },
                        done: function () {
                            _this.parent.children.remove(_this.id);
                        }
                    }));
                }
                /**
                 * @inheritdoc
                 */
                Replaceable.prototype.destroy = function () {
                    JW.Set.remove(this.parent._replaceables, this);
                    _super.prototype.destroy.call(this);
                };
                return Replaceable;
            })(JW.Class);
            Component.Replaceable = Replaceable;
        })(Component = UI.Component || (UI.Component = {}));
    })(UI = JW.UI || (JW.UI = {}));
})(JW || (JW = {}));
;
/// <reference path="../jwui.ref.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JW;
(function (JW) {
    var UI;
    (function (UI) {
        /**
         * @hidden
         */
        var DomTemplate = (function (_super) {
            __extends(DomTemplate, _super);
            function DomTemplate(el) {
                _super.call(this);
                this.output = null;
                this.requiresAfterAppend = true;
                this.el = jQuery(el)[0];
            }
            DomTemplate.prototype.createElement = function () {
                if (this.output !== null) {
                    return this.output;
                }
                this.groups = {};
                this._compileAttributes(this.el);
                var orderedGroups = {};
                for (var i = 0, l = this.ids.length; i < l; ++i) {
                    var id = this.ids[i];
                    orderedGroups[id] = this.groups[id];
                }
                this.output = { root: this.el, groups: orderedGroups };
                return this.output;
            };
            DomTemplate.prototype._addElement = function (id, el, path) {
                this.groups[id] = this.groups[id] || [];
                this.groups[id].push(el);
            };
            return DomTemplate;
        })(UI.AbstractTemplate);
        UI.DomTemplate = DomTemplate;
    })(UI = JW.UI || (JW.UI = {}));
})(JW || (JW = {}));
;
/// <reference path="../jwui.ref.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JW;
(function (JW) {
    var UI;
    (function (UI) {
        /**
         * View synchronizer. Synchronizes DOM element children with the source array. Usually used in conjunction with
         * [[JW.AbstractArray.Mapper]].
         *
         *     var data = new JW.ObservableArray(["apple", "banana", "cherry"]);
         *     var elements = data.$$mapValues(function(value) {
         *         return jQuery('<option />').text(value)[0];
         *     });
         *     var inserter = new JW.UI.Inserter(elements, document.getElementById("myselect"));
         */
        var Inserter = (function (_super) {
            __extends(Inserter, _super);
            function Inserter() {
                _super.apply(this, arguments);
            }
            /**
             * @hidden
             */
            Inserter.prototype._getElement = function (item) {
                return item;
            };
            return Inserter;
        })(UI.AbstractInserter);
        UI.Inserter = Inserter;
    })(UI = JW.UI || (JW.UI = {}));
})(JW || (JW = {}));
;
/// <reference path="../jwui.ref.ts" />
;
/// <reference path="../jwui.ref.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JW;
(function (JW) {
    var UI;
    (function (UI) {
        /**
         * Result of [[JQuery.jwon|jwon]] method call. Destroy it to unbind event handler.
         */
        var JQEventAttachment = (function (_super) {
            __extends(JQEventAttachment, _super);
            function JQEventAttachment(el, events, selector, handler, scope) {
                _super.call(this);
                this.el = el;
                this.events = events;
                if (typeof selector === "function" || typeof selector === "boolean") {
                    scope = handler;
                    handler = selector;
                    selector = null;
                }
                this.selector = selector;
                if (scope && typeof handler === "function") {
                    this.handler = function (eventObject) {
                        return handler.call(scope || this, eventObject, this);
                    };
                }
                else {
                    this.handler = handler;
                }
                el.on(events, this.selector, this.handler);
            }
            /**
             * @inheritdoc
             */
            JQEventAttachment.prototype.destroyObject = function () {
                this.el.off(this.events, this.selector, this.handler);
                _super.prototype.destroyObject.call(this);
            };
            return JQEventAttachment;
        })(JW.Class);
        UI.JQEventAttachment = JQEventAttachment;
    })(UI = JW.UI || (JW.UI = {}));
})(JW || (JW = {}));
;
/// <reference path="../jwui.ref.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JW;
(function (JW) {
    var UI;
    (function (UI) {
        /**
         * HTML template. This class compiles the input template only once, and uses element cloning further on to
         * optimize rendering performance.
         */
        var Template = (function (_super) {
            __extends(Template, _super);
            /**
             * @param html Input HTML.
             */
            function Template(html) {
                _super.call(this);
                this.html = html;
                /**
                 * @hidden
                 */
                this.mirror = null;
            }
            /**
             * @inheritdoc
             */
            Template.prototype.createElement = function () {
                this._compile();
                var root = (this.mirror.cloneNode(true));
                var groups = {};
                for (var index = 0, count = this.ids.length; index < count; ++index) {
                    var id = this.ids[index];
                    var paths = this.groups[id];
                    var groupSize = paths.length;
                    var group = new _JW.A(groupSize);
                    for (var i = 0; i < groupSize; ++i) {
                        var path = paths[i];
                        var el = root;
                        for (var j = 0, n = path.length; j < n; ++j) {
                            el = (el.childNodes[path[j]]);
                        }
                        group[i] = el;
                    }
                    groups[id] = group;
                }
                return { root: root, groups: groups };
            };
            /**
             * @hidden
             */
            Template.prototype._addElement = function (id, el, path) {
                this.groups[id] = this.groups[id] || [];
                this.groups[id].push(path.concat());
            };
            /**
             * @hidden
             */
            Template.prototype._compile = function () {
                if (this.mirror !== null) {
                    return;
                }
                this.mirror = UI.parseHtml(this.html);
                this.groups = {};
                this._compileAttributes(this.mirror);
            };
            return Template;
        })(UI.AbstractTemplate);
        UI.Template = Template;
        UI.template(UI.Component, {
            main: '<div></div>'
        });
    })(UI = JW.UI || (JW.UI = {}));
})(JW || (JW = {}));
;
/// <reference path="../jwui.ref.ts" />
;
/// <reference path="../jwui.ref.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JW;
(function (JW) {
    var UI;
    (function (UI) {
        /**
         * Result of [[JQuery.jwattr|jwattr]] method call. Destroy it to stop synchronization.
         *
         * Was used as a standalone class before jWidget 1.4.
         * As of jWidget 1.4, [[JQuery.jwattr|jwattr]] is an easier alternative.
         */
        var AttrUpdater = (function (_super) {
            __extends(AttrUpdater, _super);
            /**
             * @param el DOM element.
             * @param attr Element's attribute name.
             * @param property Source property.
             */
            function AttrUpdater(el, attr, property) {
                _super.call(this);
                this.el = el;
                this.attr = attr;
                this.property = property;
                this._update();
                this.own(property.changeEvent.bind(this._update, this));
            }
            AttrUpdater.prototype._update = function () {
                this.el.attr(this.attr, this.property.get());
            };
            return AttrUpdater;
        })(JW.Class);
        UI.AttrUpdater = AttrUpdater;
    })(UI = JW.UI || (JW.UI = {}));
})(JW || (JW = {}));
;
/// <reference path="../jwui.ref.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JW;
(function (JW) {
    var UI;
    (function (UI) {
        /**
         * @deprecated 1.4 Use [[JQuery.jwprop|jwprop]] instead.
         */
        var CheckedListener = (function (_super) {
            __extends(CheckedListener, _super);
            function CheckedListener(el, config) {
                var _this = this;
                if (config === void 0) { config = {}; }
                _super.call(this);
                this.el = el;
                this.update = function () { return _this._update(); };
                this.target = config.target || this.own(new JW.Property());
                this._update();
                this.el.bind("change", this.update);
            }
            CheckedListener.prototype.destroy = function () {
                this.el.unbind("change", this.update);
                _super.prototype.destroy.call(this);
            };
            CheckedListener.prototype._update = function () {
                this.target.set(this.el.prop("checked"));
            };
            return CheckedListener;
        })(JW.Class);
        UI.CheckedListener = CheckedListener;
    })(UI = JW.UI || (JW.UI = {}));
})(JW || (JW = {}));
;
/// <reference path="../jwui.ref.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JW;
(function (JW) {
    var UI;
    (function (UI) {
        /**
         * Result of [[JQuery.jwclass|jwclass]] method call. Destroy it to stop synchronization.
         *
         * Was used as a standalone class before jWidget 1.4.
         * As of jWidget 1.4, [[JQuery.jwclass|jwclass]] is an easier alternative.
         */
        var ClassUpdater = (function (_super) {
            __extends(ClassUpdater, _super);
            /**
             * @param el DOM element.
             * @param cls CSS class name.
             * @param property Source property.
             */
            function ClassUpdater(el, cls, property) {
                _super.call(this);
                this.el = el;
                this.cls = cls;
                this.property = property;
                this._update();
                this.own(property.changeEvent.bind(this._update, this));
            }
            ClassUpdater.prototype._update = function () {
                this.el.toggleClass(this.cls, !!this.property.get());
            };
            return ClassUpdater;
        })(JW.Class);
        UI.ClassUpdater = ClassUpdater;
    })(UI = JW.UI || (JW.UI = {}));
})(JW || (JW = {}));
;
/// <reference path="../jwui.ref.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JW;
(function (JW) {
    var UI;
    (function (UI) {
        /**
         * Result of [[JQuery.jwclass|jwclass]] method call. Destroy it to stop synchronization.
         *
         * Was used as a standalone class before jWidget 1.4.
         * As of jWidget 1.4, [[JQuery.jwclass|jwclass]] is an easier alternative.
         */
        var ClassNameUpdater = (function (_super) {
            __extends(ClassNameUpdater, _super);
            /**
             * @param el DOM element.
             * @param property Source property.
             */
            function ClassNameUpdater(el, property) {
                _super.call(this);
                this.el = el;
                this.own(new JW.Switcher([property], {
                    init: function (value) { this.el.addClass(value); },
                    done: function (value) { this.el.removeClass(value); },
                    scope: this
                }));
            }
            return ClassNameUpdater;
        })(JW.Class);
        UI.ClassNameUpdater = ClassNameUpdater;
    })(UI = JW.UI || (JW.UI = {}));
})(JW || (JW = {}));
;
/// <reference path="../jwui.ref.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JW;
(function (JW) {
    var UI;
    (function (UI) {
        /**
         * Result of [[JQuery.jwcss|jwcss]] method call. Destroy it to stop synchronization.
         *
         * Was used as a standalone class before jWidget 1.4.
         * As of jWidget 1.4, [[JQuery.jwcss|jwcss]] is an easier alternative.
         */
        var CssUpdater = (function (_super) {
            __extends(CssUpdater, _super);
            /**
             * @param el DOM element.
             * @param style CSS style name.
             * @param property Source property.
             */
            function CssUpdater(el, style, property) {
                _super.call(this);
                this.el = el;
                this.style = style;
                this.property = property;
                this._update();
                this.own(property.changeEvent.bind(this._update, this));
            }
            CssUpdater.prototype._update = function () {
                this.el.css(this.style, this.property.get());
            };
            return CssUpdater;
        })(JW.Class);
        UI.CssUpdater = CssUpdater;
    })(UI = JW.UI || (JW.UI = {}));
})(JW || (JW = {}));
;
/// <reference path="../jwui.ref.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JW;
(function (JW) {
    var UI;
    (function (UI) {
        /**
         * Result of [[JQuery.jwhtml|jwhtml]] method call. Destroy it to stop synchronization.
         *
         * Was used as a standalone class before jWidget 1.4.
         * As of jWidget 1.4, [[JQuery.jwhtml|jwhtml]] is an easier alternative.
         */
        var HtmlUpdater = (function (_super) {
            __extends(HtmlUpdater, _super);
            /**
             * @param el DOM element.
             * @param property Source property.
             */
            function HtmlUpdater(el, property) {
                _super.call(this);
                this.el = el;
                this.property = property;
                this._update();
                this.own(property.changeEvent.bind(this._update, this));
            }
            HtmlUpdater.prototype._update = function () {
                this.el.html(this.property.get());
            };
            return HtmlUpdater;
        })(JW.Class);
        UI.HtmlUpdater = HtmlUpdater;
    })(UI = JW.UI || (JW.UI = {}));
})(JW || (JW = {}));
;
/// <reference path="../jwui.ref.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JW;
(function (JW) {
    var UI;
    (function (UI) {
        /**
         * Result of [[JQuery.jwprop|jwprop]] method call. Destroy it to stop synchronization.
         */
        var PropBinding = (function (_super) {
            __extends(PropBinding, _super);
            /**
             * @param el DOM element.
             * @param prop Element's property name.
             * @param property Property.
             * @param binding Binding mode. Defaults to [[JW.Binding.UPDATE]].
             */
            function PropBinding(el, prop, property, binding) {
                if (binding === void 0) { binding = JW.UPDATE; }
                _super.call(this);
                if (binding & JW.UPDATE) {
                    this.own(new JW.UI.PropUpdater(el, prop, property));
                }
                if (prop === "checked" && (binding & JW.WATCH)) {
                    this.own(new JW.UI.CheckedListener(el, { target: property }));
                }
            }
            return PropBinding;
        })(JW.Class);
        UI.PropBinding = PropBinding;
    })(UI = JW.UI || (JW.UI = {}));
})(JW || (JW = {}));
;
/// <reference path="../jwui.ref.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JW;
(function (JW) {
    var UI;
    (function (UI) {
        /**
         * @deprecated 1.4 Use [[JQuery.jwprop|jwprop]] instead.
         */
        var PropUpdater = (function (_super) {
            __extends(PropUpdater, _super);
            /**
             * @param el DOM element.
             * @param prop Element's property name.
             * @param property Source property.
             */
            function PropUpdater(el, prop, property) {
                _super.call(this);
                this.el = el;
                this.prop = prop;
                this.property = property;
                this._update();
                this.own(property.changeEvent.bind(this._update, this));
            }
            PropUpdater.prototype._update = function () {
                this.el.prop(this.prop, this.property.get());
                if (this.prop === "checked") {
                    this.el.change();
                }
            };
            return PropUpdater;
        })(JW.Class);
        UI.PropUpdater = PropUpdater;
    })(UI = JW.UI || (JW.UI = {}));
})(JW || (JW = {}));
;
/// <reference path="../jwui.ref.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JW;
(function (JW) {
    var UI;
    (function (UI) {
        /**
         * Result of [[JQuery.jwradio|jwradio]] method call. Destroy it to stop synchronization.
         */
        var RadioBinding = (function (_super) {
            __extends(RadioBinding, _super);
            /**
             * @param el Container DOM element.
             * @param name Radios "name" attribute.
             * @param property Property.
             * @param binding Binding mode. Defaults to [[JW.Binding.UPDATE]].
             */
            function RadioBinding(el, name, property, binding) {
                if (binding === void 0) { binding = JW.UPDATE; }
                _super.call(this);
                if (binding & JW.UPDATE) {
                    this.own(new JW.UI.RadioUpdater(el, name, property));
                }
                if (binding & JW.WATCH) {
                    this.own(new JW.UI.RadioListener(el, name, { target: property }));
                }
            }
            return RadioBinding;
        })(JW.Class);
        UI.RadioBinding = RadioBinding;
    })(UI = JW.UI || (JW.UI = {}));
})(JW || (JW = {}));
;
/// <reference path="../jwui.ref.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JW;
(function (JW) {
    var UI;
    (function (UI) {
        /**
         * @deprecated 1.4 Use [[JQuery.jwradio|jwradio]] instead.
         */
        var RadioListener = (function (_super) {
            __extends(RadioListener, _super);
            function RadioListener(el, name, config) {
                var _this = this;
                if (config === void 0) { config = {}; }
                _super.call(this);
                this.el = el;
                this.name = name;
                this.config = config;
                this.update = function () { return _this._update(); };
                this.target = config.target || this.own(new JW.Property());
                this._selector = "input[type=radio][name='" + name + "']";
                this._update();
                this.el.on("change", this._selector, this.update);
            }
            RadioListener.prototype.destroy = function () {
                this.el.off("change", this._selector, this.update);
                _super.prototype.destroy.call(this);
            };
            RadioListener.prototype._update = function () {
                var radio = this.el.find(this._selector + ":checked");
                this.target.set((radio.length !== 0) ? radio.attr("value") : null);
            };
            return RadioListener;
        })(JW.Class);
        UI.RadioListener = RadioListener;
    })(UI = JW.UI || (JW.UI = {}));
})(JW || (JW = {}));
;
/// <reference path="../jwui.ref.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JW;
(function (JW) {
    var UI;
    (function (UI) {
        /**
         * Use [[JQuery.jwradio|jwradio]] instead.
         */
        var RadioUpdater = (function (_super) {
            __extends(RadioUpdater, _super);
            function RadioUpdater(el, name, property) {
                _super.call(this);
                this.el = el;
                this.name = name;
                this.property = property;
                this._selector = "input[type=radio][name='" + name + "']";
                this._update();
                this.own(property.changeEvent.bind(this._update, this));
            }
            RadioUpdater.prototype._update = function () {
                var value = this.property.get();
                if (value != null) {
                    var els = this.el.find(this._selector + "[value='" + value + "']");
                    if (els.length !== 0) {
                        els.prop("checked", true).change();
                        return;
                    }
                }
                this.el.find(this._selector + ":checked").prop("checked", false).change();
            };
            return RadioUpdater;
        })(JW.Class);
        UI.RadioUpdater = RadioUpdater;
    })(UI = JW.UI || (JW.UI = {}));
})(JW || (JW = {}));
;
/// <reference path="../jwui.ref.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JW;
(function (JW) {
    var UI;
    (function (UI) {
        /**
         * Result of [[JQuery.jwtext|jwtext]] method call. Destroy it to stop synchronization.
         *
         * Was used as a standalone class before jWidget 1.4.
         * As of jWidget 1.4, [[JQuery.jwtext|jwtext]] is an easier alternative.
         */
        var TextUpdater = (function (_super) {
            __extends(TextUpdater, _super);
            /**
             * @param el DOM element.
             * @param property Source property.
             */
            function TextUpdater(el, property) {
                _super.call(this);
                this.el = el;
                this.property = property;
                this._update();
                this.own(property.changeEvent.bind(this._update, this));
            }
            TextUpdater.prototype._update = function () {
                this.el[0].textContent = this.property.get();
            };
            return TextUpdater;
        })(JW.Class);
        UI.TextUpdater = TextUpdater;
    })(UI = JW.UI || (JW.UI = {}));
})(JW || (JW = {}));
;
/// <reference path="../jwui.ref.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JW;
(function (JW) {
    var UI;
    (function (UI) {
        /**
         * Result of [[JQuery.jwval|jwval]] method call. Destroy it to stop synchronization.
         */
        var ValueBinding = (function (_super) {
            __extends(ValueBinding, _super);
            /**
             * @param el DOM element.
             * @param property Property.
             * @param binding Binding mode. Defaults to [[JW.Binding.UPDATE]].
             * @param simple
             * If true, watch-binding listens "change" event only. Defaults to false which enables
             * reaction to any real-time field modification.
             */
            function ValueBinding(el, property, binding, simple) {
                if (binding === void 0) { binding = JW.UPDATE; }
                _super.call(this);
                if (binding & JW.UPDATE) {
                    this.own(new JW.UI.ValueUpdater(el, property));
                }
                if (binding & JW.WATCH) {
                    this.own(new JW.UI.ValueListener(el, { target: property, simple: simple }));
                }
            }
            return ValueBinding;
        })(JW.Class);
        UI.ValueBinding = ValueBinding;
    })(UI = JW.UI || (JW.UI = {}));
})(JW || (JW = {}));
;
/// <reference path="../jwui.ref.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JW;
(function (JW) {
    var UI;
    (function (UI) {
        /**
         * @deprecated 1.4 Use [[JQuery.jwval|jwval]] instead.
         */
        var ValueListener = (function (_super) {
            __extends(ValueListener, _super);
            function ValueListener(el, config) {
                var _this = this;
                if (config === void 0) { config = {}; }
                _super.call(this);
                this.el = el;
                this.update = function () { return _this._update(); };
                this.target = config.target || this.own(new JW.Property());
                this.simple = config.simple || !UI.isLifeInput(el);
                this.update();
                this.el.bind("change", this.update);
                if (!this.simple) {
                    this._timer = setInterval(this.update, 100);
                }
            }
            ValueListener.prototype.destroy = function () {
                if (!this.simple) {
                    clearInterval(this._timer);
                }
                this.el.unbind("change", this.update);
                _super.prototype.destroy.call(this);
            };
            ValueListener.prototype._update = function () {
                this.target.set(this.el.val());
            };
            return ValueListener;
        })(JW.Class);
        UI.ValueListener = ValueListener;
    })(UI = JW.UI || (JW.UI = {}));
})(JW || (JW = {}));
;
/// <reference path="../jwui.ref.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JW;
(function (JW) {
    var UI;
    (function (UI) {
        /**
         * @deprecated 1.4 Use [[JQuery.jwval|jwval]] instead.
         */
        var ValueUpdater = (function (_super) {
            __extends(ValueUpdater, _super);
            function ValueUpdater(el, property) {
                _super.call(this);
                this.el = el;
                this.property = property;
                this._update();
                this.own(property.changeEvent.bind(this._update, this));
            }
            ValueUpdater.prototype._update = function () {
                this.el.val(this.property.get());
            };
            return ValueUpdater;
        })(JW.Class);
        UI.ValueUpdater = ValueUpdater;
    })(UI = JW.UI || (JW.UI = {}));
})(JW || (JW = {}));
;
/// <reference path="../jwui.ref.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JW;
(function (JW) {
    var UI;
    (function (UI) {
        /**
         * Result of [[JQuery.jwshow|jwshow]] method call. Destroy it to stop synchronization.
         *
         * Was used as a standalone class before jWidget 1.4.
         * As of jWidget 1.4, [[JQuery.jwshow|jwshow]] is an easier alternative.
         */
        var VisibleUpdater = (function (_super) {
            __extends(VisibleUpdater, _super);
            /**
             * @param el DOM element.
             * @param property Source property.
             */
            function VisibleUpdater(el, property) {
                _super.call(this);
                this.el = el;
                this.property = property;
                this._update();
                this.own(property.changeEvent.bind(this._update, this));
            }
            VisibleUpdater.prototype._update = function () {
                this.el.css("display", this.property.get() ? "" : "none");
            };
            return VisibleUpdater;
        })(JW.Class);
        UI.VisibleUpdater = VisibleUpdater;
    })(UI = JW.UI || (JW.UI = {}));
})(JW || (JW = {}));
;
/*
	jWidget UI source file.

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

jQuery.extend(jQuery.fn, {
	jwon: function(events, selector, handler, scope) {
		return new JW.UI.JQEventAttachment(this, events, selector, handler, scope);
	},

	jwattr: function(attr, property) {
		return new JW.UI.AttrUpdater(this, attr, property);
	},

	jwclass: function() {
		var a = arguments[0], b = arguments[1];
		return (b != null) ? new JW.UI.ClassUpdater(this, a, b) : new JW.UI.ClassNameUpdater(this, a);
	},

	jwcss: function(style, property) {
		return new JW.UI.CssUpdater(this, style, property);
	},

	jwhtml: function(property) {
		return new JW.UI.HtmlUpdater(this, property);
	},

	jwprop: function(prop, property, binding) {
		if (property != null) {
			return new JW.UI.PropBinding(this, prop, property, binding);
		}
		if (prop === "checked") {
			var target = new JW.Property();
			target.own(new JW.UI.CheckedListener(this, {target: target}));
			return target;
		}
		throw new Error("Invalid argument");
	},

	jwradio: function(name, property, binding) {
		if (property != null) {
			return new JW.UI.RadioBinding(this, name, property, binding);
		}
		var target = new JW.Property();
		target.own(new JW.UI.RadioListener(this, name, {target: target}));
		return target;
	},

	jwtext: function(property) {
		return new JW.UI.TextUpdater(this, property);
	},

	jwval: function(property, binding, simple) {
		if (property != null && (typeof property !== "boolean")) {
			return new JW.UI.ValueBinding(this, property, binding, simple);
		}
		var target = new JW.Property();
		target.own(new JW.UI.ValueListener(this, {target: target, simple: simple}));
		return target;
	},

	jwshow: function(property) {
		return new JW.UI.VisibleUpdater(this, property);
	}
});
;