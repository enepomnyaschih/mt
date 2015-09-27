var Application = function() {
	Application._super.call(this);
};

JW.extend(Application, JW.UI.Component, {
	renderRect: function(el) {
		// Watch input value
		var color = this.own(this.getElement("input").jwval());

		// Update rectangle CSS style
		this.own(el.jwcss("background-color", color));
	}
});

JW.UI.template(Application, {
	main:
		'<div jwclass="application">' +
			'<div>"background-color" style: <input jwid="input" type="text" value="red"></div>' +
			'<div jwid="rect">Modify as you wish to see result here</div>' +
		'</div>'
});

$(function() {
	new Application().renderTo("body");
});
