var EmailNotFound = function(id) {
	EmailNotFound._super.call(this);
	this.id = id; // string
};

JW.extend(EmailNotFound, JW.UI.Component, {
	renderId: function(el) {
		el.text(this.id);
	}
});

JW.UI.template(EmailNotFound, {
	main:
		'<div jwclass="email-not-found">' +
			'<div>Email with id <span jwid="id"></span> is not found</div>' +
			'<div><a href="#inbox">Back</a></div>' +
		'</div>'
});
