var Email = function(email) {
	Email._super.call(this);
	this.email = email; // Object
};

JW.extend(Email, JW.UI.Component, {
	renderSummary: function(el) {
		el.text(this.email.summary);
	},

	renderContent: function(el) {
		el.html(this.email.content);
	}
});

JW.UI.template(Email, {
	main:
		'<div jwclass="email">' +
			'<h3 jwid="summary"></h3>' +
			'<div jwid="content"></div>' +
			'<div><a href="#inbox">Back</a></div>' +
		'</div>'
});
