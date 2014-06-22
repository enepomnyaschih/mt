var Greeter = function() {
	Greeter._super.call(this);
	this.name = this.own(new JW.Property("wanderer"));
};

JW.extend(Greeter, JW.UI.Component, {
	renderNameField: function(el) {
		this.own(new JW.UI.ValueUpdater(el, this.name)); // bind element value to property
		this.own(new JW.UI.ValueListener(el, this.name)); // bind property to element value
	},
	
	renderGreeting: function(el) {
		var text = this.own(new JW.Functor([this.name], function(name) {
			return "Hello, " + name + "!";
		}, this)).target; // build greeting message
		this.own(new JW.UI.TextUpdater(el, text)); // bind element text to message
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
