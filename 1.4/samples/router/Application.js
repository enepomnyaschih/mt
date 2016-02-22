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
					"inbox"   : function() { return new Inbox();           },
					"compose" : function() { return new Compose();         },
					"settings": function() { return new Settings();        },
					""        : function() { return new JW.UI.Component(); }
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
		this.own(new JW.Switcher([this.router.route], {
			init: function(route) {
				el.filter('[href="#' + route + '"]').attr("data-route", route).removeAttr("href");
			},
			done: function(route) {
				el.filter('[data-route="' + route + '"]').attr("href", "#" + route).removeAttr("data-route");
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
					'<a jwid="route" href="#inbox">Inbox</a> | ' +
					'<a jwid="route" href="#compose">Compose</a> | ' +
					'<a jwid="route" href="#settings">Settings</a>' +
				'</div>' +
			'</div>' +
			'<div jwid="page"></div>' +
		'</div>'
});
