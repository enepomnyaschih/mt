mt.Locale = Class.extend({
	/*
	Fields
	Object dictionary;
	String lang;
	Array<Function()> onChange;
	*/
	
	init: function(dictionary, lang) {
		this.dictionary = dictionary;
		this.lang = lang || "en";
		this.onChange = [];
	},
	
	destroy: function() {
		this.onChange = null;
	},
	
	getString: function(key) {
		return this.dictionary[this.lang][key];
	},
	
	setLang: function(lang) {
		if (lang === this.lang) {
			return;
		}
		this.lang = lang;
		var onChange = this.onChange.concat();
		for (var i = 0; i < onChange.length; ++i) {
			onChange[i].call(this);
		}
	}
});

mt.locale = {};
