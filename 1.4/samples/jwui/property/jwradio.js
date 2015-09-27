var Application = function() {
	Application._super.call(this);
};

JW.extend(Application, JW.UI.Component, {
	renderLetters: function(el) {
		var value = this.own(this.getElement("input").jwval());
		this.own(el.jwradio("letter", value));
	}
});

JW.UI.template(Application, {
	main:
		'<div jwclass="application">' +
			'<div>Letter: <input jwid="input" type="text" value="a"></div>' +
			'<div jwid="letters">' +
				'<div><label><input type="radio" name="letter" value="a" disabled>a</label></div>' +
				'<div><label><input type="radio" name="letter" value="b" disabled>b</label></div>' +
				'<div><label><input type="radio" name="letter" value="c" disabled>c</label></div>' +
			'</div>' +
		'</div>'
});

$(function() {
	new Application().renderTo("body");
});
