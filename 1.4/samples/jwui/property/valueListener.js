var Application = function() {
	Application._super.call(this);
	this.value = this.own(new JW.Property("Input some text"));
};

JW.extend(Application, JW.UI.Component, {
	renderFirst: function(el) {
		this.initInput(el);
	},

	renderSecond: function(el) {
		this.initInput(el);
	},

	initInput: function(el) {
		// Bind input to property
		this.own(el.jwval(this.value));

		// Bind property to input
		this.own(new JW.UI.ValueListener(el, {target: this.value}));
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
