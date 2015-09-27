var Application = function() {
	Application._super.call(this);
};

JW.extend(Application, JW.UI.Component, {
	renderRect: function(el) {
		// Watch radio button selection
		var color = this.own(this.getElement("colors").jwradio("color"));

		// Update rectangle CSS class name
		this.own(el.jwclass(color));
	}
});

JW.UI.template(Application, {
	main:
		'<div jwclass="application">' +
			'<div jwid="colors">' +
				'<div><label><input type="radio" name="color" value="red">Add "red" class</label></div>' +
				'<div><label><input type="radio" name="color" value="green">Add "green" class</label></div>' +
				'<div><label><input type="radio" name="color" value="blue">Add "blue" class</label></div>' +
			'</div>' +
			'<div jwid="rect"></div>' +
		'</div>'
});

$(function() {
	new Application().renderTo("body");
});
