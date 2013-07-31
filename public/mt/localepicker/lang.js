mt.localepicker.Lang = function(locale, lang) {
	this._onRadioClick = JW.inScope(this._onRadioClick, this);
	mt.localepicker.Lang._super.call(this);
	this.locale = locale;
	this.lang = lang;
};

JW.extend(mt.localepicker.Lang, JW.UI.Component, {
	/*
	mt.Locale locale;
	JW.AbstractArray.Mapper<String, mt.localepicker.Lang> _mapper;
	*/
	
	renderName: function(el) {
		el.text(this.locale.getString("language", this.lang));
	},
	
	renderRadio: function(el) {
		if (this.locale.lang === this.lang) {
			el.prop("checked", true);
		}
		el.click(this._onRadioClick);
	},
	
	_onRadioClick: function() {
		this.locale.setLang(this.lang);
	}
});
