var Form = function(locale) {
	Form._super.call(this);
	this.locale = locale; // JW.Plugins.Locale
};

JW.extend(Form, JW.UI.Component, {
	renderNameLabel: function(el) {
		var text = this.own(this.locale.getProperty("name"));
		this.own(el.jwtext(text));
	},

	renderSubmit: function(el) {
		var text = this.own(this.locale.getProperty("submit"));
		this.own(el.jwval(text));
	}
});

JW.UI.template(Form, {
	main:
		'<form>' +
			'<label><span jwid="name-label"></span><input type="text"></label>' +
			'<input jwid="submit" type="submit">' +
		'</form>'
});
