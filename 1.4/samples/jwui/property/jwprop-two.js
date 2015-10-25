var Application = function() {
	Application._super.call(this);
	this.value = this.own(new JW.Property(false));
};

JW.extend(Application, JW.UI.Component, {
	renderFirst: function(el) {
		this.own(el.jwprop("checked", this.value, JW.TWOWAY));
	},

	renderSecond: function(el) {
		this.own(el.jwprop("checked", this.value, JW.TWOWAY));
	}
});

JW.UI.template(Application, {
	main:
		'<div jwclass="application">' +
			'<div>This sample demonstrates how to bind two checkboxes to a single boolean property.</div>' +
			'<div><label><input jwid="first" type="checkbox">First checkbox</label></div>' +
			'<div><label><input jwid="second" type="checkbox">Second checkbox</label></div>' +
		'</div>'
});

$(function() {
	new Application().renderTo("body");
});
