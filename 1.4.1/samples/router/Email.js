var Email = function(email, parentRouter) {
	Email._super.call(this);
	this.email = email; // Object
	this.parentRouter = parentRouter; // JW.Plugins.Router
};

JW.extend(Email, JW.UI.Component, {
	renderSummary: function(el) {
		el.text(this.email.summary);
	},

	renderContent: function(el) {
		el.html(this.email.content);
	},

	renderBack: function(el) {
		el.jwon("click", function(event) {
			event.preventDefault();

			// if you don't know exactly, how many routers can be above or below this component,
			// using parent router on redirection is a smart choice
			this.parentRouter.redirect("");

			// see an alternative solution in EmailNotFound class
		}, this);
	}
});

JW.UI.template(Email, {
	main:
		'<div jwclass="email">' +
			'<h3 jwid="summary"></h3>' +
			'<div jwid="content"></div>' +
			'<div><a jwid="back" href="#">Back</a></div>' +
		'</div>'
});
