mt.LocalePicker = Class.extend({
	/*
	Fields
	mt.Locale locale;
	Element el;
	Map<Element> langEls;
	*/
	
	init: function(locale) {
		this.locale = locale;
		this._render();
	},
	
	_render: function() {
		this.el = $(mt.LocalePicker.template);
		this.langEls = {};
		for (var lang in this.locale.dictionary) {
			this._renderLang(this.locale.dictionary[lang], lang);
		}
	},
	
	_renderLang: function(dictionary, lang) {
		var el = $(mt.LocalePicker.langTemplate);
		el.find(".mt-locale-picker-lang-name").text(dictionary.language);
		this.langEls[lang] = el;
		if (this.locale.lang === lang) {
			el.find(".mt-locale-picker-lang-radio").prop("checked", true);
		}
		
		var self = this;
		
		el.find(".mt-locale-picker-lang-radio").click(function() {
			self.locale.setLang(lang);
		});
		
		this.el.append(el);
	}
});

mt.LocalePicker.template = '<div class="mt-locale-picker" />';

mt.LocalePicker.langTemplate =
	'<label class="mt-locale-picker-lang">' +
		'<input type="radio" name="locale" class="mt-locale-picker-lang-radio" />' +
		'<span class="mt-locale-picker-lang-name" />' +
	'</label>';
