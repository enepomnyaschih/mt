var Application = function() {
	Application._super.call(this);
	this.value = this.own(new JW.Property("Input some text"));
};

JW.extend(Application, JW.UI.Component, {
	renderFirst: function(el) {
		this.own(el.jwval(this.value, JW.TWOWAY));
	},

	renderSecond: function(el) {
		this.own(el.jwval(this.value, JW.TWOWAY));
	}
});

JW.UI.template(Application, {
	main:
		'<div jwclass="application">' +
			'<div>This sample demonstrates how to bind two inputs to a single string property.</div>' +
			'<div><input jwid="first" type="text"></div>' +
			'<div><input jwid="second" type="text"></div>' +
		'</div>'
});

$(function() {
	new Application().renderTo("body");
});
