mt.Application = function(data) {
	mt.Application._super.call(this);
	this.data = data; // mt.Data
};

JW.extend(mt.Application, JW.UI.Component, {
	renderProfileBox: function() {
		return this.own(new mt.ProfileBox(this.data));
	},
	
	renderTweets: function() {
		return this.own(new mt.TweetFeed(this.data));
	},
	
	// override
	afterRender: function() {
		this._super();
		$("html").addClass("mt-html");
		$("body").addClass("mt-body");
	}
});

JW.UI.template(mt.Application, {
	main:
		'<div jwclass="mt-application">' +
			'<div jwid="wrap">' +
				'<div jwid="profile-box"></div>' +
				'<div jwid="tweets"></div>' +
				'<div class="clear"></div>' +
			'</div>' +
		'</div>'
});
