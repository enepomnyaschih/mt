var Greeter = function() {
	Greeter._super.call(this);
	this.name = this.own(new JW.Property("guest"));
};

JW.extend(Greeter, JW.UI.Component, {
	renderNameField: function(el) {
		// Setup two-way binding between element value and property
		this.own(el.jwval(this.name, JW.TWOWAY));
	},
	
	renderGreeting: function(el) {
		// Build greeting message
		var text = this.own(this.name.$$mapValue(function(name) {
			return "Hello, " + name + "!";
		}, this));

		// Bind element text to message
		this.own(el.jwtext(text));
	}
});

JW.UI.template(Greeter, {
	main:
		'<div class="greeter">' +
			'<p>Your name: <input jwid="name-field"></p>' +
			'<div jwid="greeting"></div>' +
		'</div>'
});

new Greeter().renderTo("body");
