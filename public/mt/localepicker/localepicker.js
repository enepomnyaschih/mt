mt.LocalePicker = function(locale) {
	mt.LocalePicker._super.call(this);
	this.locale = locale;
	this._mapper = null;
};

JW.extend(mt.LocalePicker, JW.UI.Component, {
	/*
	mt.Locale locale;
	JW.AbstractArray.Mapper<String, mt.localepicker.Lang> _mapper;
	*/
	
	// override
	renderComponent: function() {
		this._super();
		var langs = JW.Map.getKeysArray(this.locale.dictionary);
		this._mapper = new JW.Array(langs).createMapper({
			createItem: function(lang) {
				return new mt.localepicker.Lang(this.locale, lang);
			},
			destroyItem: JW.destroy,
			scope: this
		});
		this.addArray(this._mapper.target);
	}
});

mt.localepicker = {};
