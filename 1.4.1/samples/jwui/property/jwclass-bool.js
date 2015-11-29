var Application = function() {
	Application._super.call(this);
};

JW.extend(Application, JW.UI.Component, {
	renderRect: function(el) {
		// Watch checkbox state
		var checked = this.own(this.getElement("checkbox").jwprop("checked"));

		// Bind "checked" CSS class to checked property value
		this.own(el.jwclass("checked", checked));
	}
});

JW.UI.template(Application, {
	main:
		'<div jwclass="application">' +
			'<div><label><input jwid="checkbox" type="checkbox">Enable class</label></div>' +
			'<div jwid="rect"></div>' +
		'</div>'
});

$(function() {
	new Application().renderTo("body");
});
