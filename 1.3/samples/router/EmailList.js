var EmailList = function(emails) {
	EmailList._super.call(this);
	this.emails = emails; // JW.AbstractArray
};

JW.extend(EmailList, JW.UI.Component, {
	renderRoot: function(el) {
		el.addClass("email-list");
		return this.own(this.emails.$$mapObjects(function(email) {
			return new EmailListItem(email);
		}, this));
	}
});
