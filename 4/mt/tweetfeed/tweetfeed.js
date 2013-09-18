mt.TweetFeed = function(data) {
	mt.TweetFeed._super.call(this);
	this.data = data;
	this.tweetViews = null;
};

JW.extend(mt.TweetFeed, JW.UI.Component, {
	/*
	mt.Data data;
	JW.AbstractArray<mt.TweetView> tweetViews;
	*/
	
	renderTweets: function() {
		this.tweetViews = this.data.tweets.$map(function(tweetData) {
			return new mt.TweetView(tweetData);
		}, this);
		return this.tweetViews;
	},
	
	// override
	destroyComponent: function() {
		this.tweetViews.each(JW.destroy);
		this._super();
	}
});

JW.UI.template(mt.TweetFeed, {
	main:
		'<div jwclass="mt-tweet-feed">' +
			'<div jwid="header">Tweets</div>' +
			'<div jwid="tweets"></div>' +
			'<div jwid="footer">...</div>' +
		'</div>'
});
