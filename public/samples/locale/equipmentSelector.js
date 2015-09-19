var EquipmentSelector = function(locale) {
	EquipmentSelector._super.call(this);
	this.locale = locale; // JW.Plugins.Locale
};

JW.extend(EquipmentSelector, JW.UI.Component, {
	renderMonitor: function(el) {
		var text = this.own(this.locale.getProperty("monitor"));
		this.own(new JW.UI.TextUpdater(el, text));
	},

	renderKeyboard: function(el) {
		var text = this.own(this.locale.getProperty("keyboard"));
		this.own(new JW.UI.TextUpdater(el, text));
	},

	renderMouse: function(el) {
		var text = this.own(this.locale.getProperty("mouse"));
		this.own(new JW.UI.TextUpdater(el, text));
	}
});

JW.UI.template(EquipmentSelector, {
	main:
		'<form>' +
			'<button jwid="monitor"></button>' +
			'<button jwid="keyboard"></button>' +
			'<button jwid="mouse"></button>' +
		'</form>'
});
