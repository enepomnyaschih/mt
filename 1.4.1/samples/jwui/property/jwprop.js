var Application = function() {
	Application._super.call(this);
};

JW.extend(Application, JW.UI.Component, {
	renderTextarea: function(el) {
		// Watch checkbox state
		var property = this.own(this.getElement("checkbox").jwprop("checked"));

		// Bind text area state to property
		this.own(el.jwprop("disabled", property));
	}
});

JW.UI.template(Application, {
	main:
		'<div jwclass="application">' +
			'<div><label><input jwid="checkbox" type="checkbox">Disable textarea</label></div>' +
			'<textarea jwid="textarea">This is a textarea</textarea>' +
		'</div>'
});

$(function() {
	new Application().renderTo("body");
});
