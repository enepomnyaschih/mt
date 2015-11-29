var Application = function() {
	Application._super.call(this);
	this.router = null; // JW.Plugins.Router
};

JW.extend(Application, JW.UI.Component, {
	beforeRender: function(el) {
		this._super();
		this.router = this.own(new JW.Plugins.Router({
			path: JW.UI.hash,
			handler: {
				routes: {
					// passing path to inbox constructor lets us avoid an unneccessary redirection
					"inbox"   : function(path) { return new Inbox(path); },
					"compose" : function() { return new Compose(); },
					"settings": function() { return new Settings(); },
					""        : function() { return new JW.Plugins.Router.Redirector("inbox"); }
				},
				notFound: function(route) { return new NotFound(route); }
			},
			scope: this
		}));
		this.router.update();
	},

	renderUrlForm: function(el) {
		el.jwon("submit", function(event) {
			event.preventDefault();
			location.hash = "#" + this.getElement("url").val();
		}, this);
	},

	renderUrl: function(el) {
		this.own(el.jwval(JW.UI.hash));
	},

	renderPage: function() {
		return this.router.target;
	},

	renderRoute: function(el) {
		// assuming that we don't know how many routers can be above this one,
		// we should build href attribute using router.getFullPath method
		var router = this.router;
		el.each(function() {
			var route = $(this).attr("data-route");
			$(this).attr("href", "#" + router.getFullPath(route));
		});

		// the next structure adds/removes href tag in an active link
		this.own(new JW.Switcher([this.router.route], {
			init: function(route) {
				el.filter('[data-route="' + route + '"]').removeAttr("href");
			},
			done: function(route) {
				el.filter('[data-route="' + route + '"]').attr("href", "#" + this.router.getFullPath(route));
			},
			scope: this
		}));
	}
});

JW.UI.template(Application, {
	main:
		'<div jwclass="application">' +
			'<div jwid="header">' +
				'<h1>Application header</h1>' +
				'<form jwid="url-form">' +
					'<b>Current URL hash:</b> #' +
					'<input type="text" jwid="url"> ' +
					'<input type="submit" value="Change now!">' +
				'</form>' +
				'<div><b>Pages:</b> ' +
					'<a jwid="route" data-route="inbox">Inbox</a> | ' +
					'<a jwid="route" data-route="compose">Compose</a> | ' +
					'<a jwid="route" data-route="settings">Settings</a>' +
				'</div>' +
			'</div>' +
			'<div jwid="page"></div>' +
		'</div>'
});
