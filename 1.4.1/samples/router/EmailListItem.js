var EmailListItem = function(email) {
	EmailListItem._super.call(this);
	this.email = email; // Object
};

JW.extend(EmailListItem, JW.UI.Component, {
	renderRoot: function(el) {
		el.text(this.email.summary).attr("href", "#inbox/" + this.email.id);
	}
});

JW.UI.template(EmailListItem, {
	main: '<a jwclass="email-list-item" style="display: block;"></a>'
});
