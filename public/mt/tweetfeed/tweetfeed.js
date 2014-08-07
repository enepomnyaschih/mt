mt.TweetFeed = function(data) {
	mt.TweetFeed._super.call(this);
	this.data = data; // mt.Data
};

JW.extend(mt.TweetFeed, JW.UI.Component, {
	renderTweets: function() {
		return this.own(this.data.tweets.createMapper({
			createItem: function(tweetData) {
				return new mt.TweetView(this.data, tweetData);
			},
			destroyItem: JW.destroy,
			scope: this
		})).target;
	}
});
