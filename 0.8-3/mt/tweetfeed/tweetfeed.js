mt.TweetFeed = function(data) {
	mt.TweetFeed._super.call(this);
	this.data = data;
};

JW.extend(mt.TweetFeed, JW.UI.Component, {
	/*
	mt.Data data;
	*/
	
	renderTweets: function() {
		return this.own(this.data.tweets.$map(function(tweetData) {
			return new mt.TweetView(tweetData);
		}, this)).ownItems();
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
