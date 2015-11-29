var Application = function() {
	Application._super.call(this);
};

JW.extend(Application, JW.UI.Component, {
	renderOutput: function(el) {
		// Watch input element value
		var value = this.own(this.getElement("input").jwval());

		// Bind element value to property
		this.own(el.jwval(value));
	}
});

JW.UI.template(Application, {
	main:
		'<div jwclass="application">' +
			'<div>Value:</div>' +
			'<textarea jwid="input" rows="5" cols="80">Hello!</textarea>' +
			'<div>Output:</div>' +
			'<textarea jwid="output" rows="5" cols="80" disabled></textarea>' +
		'</div>'
});

$(function() {
	new Application().renderTo("body");
});
