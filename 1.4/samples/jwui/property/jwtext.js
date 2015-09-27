var Application = function() {
	Application._super.call(this);
};

JW.extend(Application, JW.UI.Component, {
	renderResult: function(el) {
		var input = this.getElement("input");
		input.text('<b>Hello!</b>');

		// Watch input value
		var text = this.own(input.jwval());

		// Update element inner text
		this.own(el.jwtext(text));
	}
});

JW.UI.template(Application, {
	main:
		'<div jwclass="application">' +
			'<div>Text:</div>' +
			'<textarea jwid="input" rows="5" cols="80"></textarea>' +
			'<div>Output:</div>' +
			'<div jwid="result"></div>' +
		'</div>'
});

$(function() {
	new Application().renderTo("body");
});
