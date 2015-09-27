var Application = function() {
	Application._super.call(this);
};

JW.extend(Application, JW.UI.Component, {
	renderOutput: function(el) {
		var input = this.getElement("input");
		input.html('<b>Hello!</b>');

		// Watch input value
		var html = this.own(input.jwval());

		// Update element inner HTML
		this.own(el.jwhtml(html));
	}
});

JW.UI.template(Application, {
	main:
		'<div jwclass="application">' +
			'<div>HTML:</div>' +
			'<textarea jwid="input" rows="5" cols="80"></textarea>' +
			'<div>Output:</div>' +
			'<div jwid="output"></div>' +
		'</div>'
});

$(function() {
	new Application().renderTo("body");
});
