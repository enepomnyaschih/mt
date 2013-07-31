mt.Locale = function(dictionary, lang) {
	mt.Locale._super.call(this);
	this.dictionary = dictionary;
	this.lang = lang || "en";
	this.changeEvent = new JW.Event();
};

JW.extend(mt.Locale, JW.Class, {
	/*
	Object dictionary;
	String lang;
	JW.Event<JW.ValueEventParams<String>> changeEvent;
	*/
	
	// override
	destroy: function() {
		this.changeEvent.destroy();
		this._super();
	},
	
	getString: function(key, lang) {
		return this.dictionary[lang || this.lang][key];
	},
	
	setLang: function(lang) {
		if (lang === this.lang) {
			return;
		}
		this.lang = lang;
		this.changeEvent.trigger(new JW.ValueEventParams(this, lang));
	}
});

var localeData = {};
