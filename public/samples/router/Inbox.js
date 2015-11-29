var Inbox = function(path, parentRouter) {
	Inbox._super.call(this);
	this.path = this.own(new JW.Property(path)); // <string>
	this.router = null; // JW.Plugins.Router
	this.emails = new JW.Array([
		{
			id: "1",
			summary: "About router",
			content: "Hello there! jWidget Router is quite simple but powerful, isn't it?"
		}, {
			id: "2",
			summary: "Router documentation",
			content: 'Router documentation is <a href="http://enepomnyaschih.github.io/jwidget#!/api/JW.Plugins.Router" target="_blank">here</a>'
		}
	]);
};

// implements JW.Plugins.Router.Routable
JW.extend(Inbox, JW.UI.Component, {
	renderContent: function() {
		// "inbox/<id>" is routed to email if one exists
		// "inbox" is routed to email list
		this.router = this.own(new JW.Plugins.Router({
			path: this.path,
			handler: function(id) {
				if (!id) {
					return new EmailList(this.emails);
				}
				var email = this.emails.search(JW.byValue("id", id));
				return (email != null) ? new Email(email, this.router) : new EmailNotFound(id);
			},
			scope: this
		}));

		// update call should be done separately to make sure that this.router field
		// is assigned before routing
		this.router.update();

		return this.router.target;
	},

	setPath: function(path) {
		this.path.set(path);
	}
});

JW.UI.template(Inbox, {
	main:
		'<div jwclass="inbox">' +
			'<h2>Inbox</h2>' +
			'<div jwid="content"></div>' +
		'</div>'
});
