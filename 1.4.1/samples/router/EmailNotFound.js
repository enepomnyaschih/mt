var EmailNotFound = function(id) {
	EmailNotFound._super.call(this);
	this.id = id; // string
};

JW.extend(EmailNotFound, JW.UI.Component, {
	renderId: function(el) {
		el.text(this.id);
	},

	renderBack: function(el) {
		el.jwon("click", function(event) {
			event.preventDefault();

			// in this particular case we know that there is no router below, so we can skip
			// router selection on redirection. The next call uses a current top router
			JW.Plugins.Router.redirect("");
		}, this);
	}
});

JW.UI.template(EmailNotFound, {
	main:
		'<div jwclass="email-not-found">' +
			'<div>Email with id <span jwid="id"></span> is not found</div>' +
			'<div><a jwid="back" href="#">Back</a></div>' +
		'</div>'
});
