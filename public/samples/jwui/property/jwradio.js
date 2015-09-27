var Application = function() {
	Application._super.call(this);
};

JW.extend(Application, JW.UI.Component, {
	renderLetters: function(el) {
		// Watch input value
		var value = this.own(this.getElement("input").jwval());

		// Update radio button selection
		this.own(el.jwradio("letter", value));
	}
});

JW.UI.template(Application, {
	main:
		'<div jwclass="application">' +
			'<div>Enter a letter (a, b or c): <input jwid="input" type="text" value="a"></div>' +
			'<div jwid="letters">' +
				'<div><label><input type="radio" name="letter" value="a" disabled>Is a?</label></div>' +
				'<div><label><input type="radio" name="letter" value="b" disabled>Is b?</label></div>' +
				'<div><label><input type="radio" name="letter" value="c" disabled>Is c?</label></div>' +
			'</div>' +
		'</div>'
});

$(function() {
	new Application().renderTo("body");
});
