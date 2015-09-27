var Application = function() {
	Application._super.call(this);
};

JW.extend(Application, JW.UI.Component, {
	renderResult: function(el) {
		var input = this.getElement("input");
		input.html('<b>Hello!</b>');
		var html = this.own(input.jwval());
		this.own(el.jwhtml(html));
	}
});

JW.UI.template(Application, {
	main:
		'<div jwclass="application">' +
			'<div>HTML:</div>' +
			'<textarea jwid="input" rows="5" cols="80"></textarea>' +
			'<div>Result:</div>' +
			'<div jwid="result"></div>' +
		'</div>'
});

$(function() {
	new Application().renderTo("body");
});
