mt.Application = function(data) {
	mt.Application._super.call(this);
	this.data = data;
};

JW.extend(mt.Application, JW.UI.Component, {
	/*
	mt.Data data;
	*/
	
	renderProfileBox: function() {
		return this.own(new mt.ProfileBox(this.data));
	},
	
	renderTweets: function() {
		return this.own(new mt.TweetFeed(this.data));
	},
	
	// override
	renderComponent: function() {
		this._super();
		$("html").addClass("mt-html");
		$("body").addClass("mt-body");
	}
});
