var Application = function() {
	Application._super.call(this);
	this.value = this.own(new JW.Property("a"));
};

JW.extend(Application, JW.UI.Component, {
	renderRoot: function() {
		this.initGroup("first");
		this.initGroup("second");
	},

	initGroup: function(name) {
		// Bind radio group to property
		this.own(this.el.jwradio(name, this.value));

		// Bind property to radio group
		this.own(new JW.UI.RadioListener(this.el, name, {target: this.value}));
	}
});

JW.UI.template(Application, {
	main:
		'<div jwclass="application">' +
			'<div>This sample demonstrates how to bind two radio groups to a single string property.</div>' +
			'<div>First group:</div>' +
			'<div><label><input type="radio" name="first" value="a">a</label></div>' +
			'<div><label><input type="radio" name="first" value="b">b</label></div>' +
			'<div><label><input type="radio" name="first" value="c">c</label></div>' +
			'<div>Second group:</div>' +
			'<div><label><input type="radio" name="second" value="a">a</label></div>' +
			'<div><label><input type="radio" name="second" value="b">b</label></div>' +
			'<div><label><input type="radio" name="second" value="c">c</label></div>' +
		'</div>'
});

$(function() {
	new Application().renderTo("body");
});
