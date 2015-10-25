mt.TweetFeed = function(data) {
	mt.TweetFeed._super.call(this);
	this.data = data; // mt.Data
};

JW.extend(mt.TweetFeed, JW.UI.Component, {
	renderTweets: function() {
		return this.own(this.data.tweets.$$mapObjects(function(tweetData) {
			return new mt.TweetView(this.data, tweetData);
		}, this));
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
