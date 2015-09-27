var Application = function() {
	Application._super.call(this);
};

JW.extend(Application, JW.UI.Component, {
	renderRect: function(el) {
		// Watch input value
		var title = this.own(this.getElement("input").jwval());

		// Update rectangle title attribute
		this.own(el.jwattr("title", title));
	}
});

JW.UI.template(Application, {
	main:
		'<div jwclass="application">' +
			'<div>"title" attribute: <input jwid="input" type="text" value="This is a tooltip!"></div>' +
			'<div jwid="rect">Modify as you wish and hover mouse to see a tooltip</div>' +
		'</div>'
});

$(function() {
	new Application().renderTo("body");
});
