var Application = function() {
	Application._super.call(this);
};

JW.extend(Application, JW.UI.Component, {
	renderTextarea: function(el) {
		// Watch checkbox state
		var disabled = this.own(this.getElement("checkbox").jwprop("checked"));

		// Enable/disable text area
		this.own(el.jwprop("disabled", disabled));
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
