﻿mt.TweetFeed = function(data) {
	mt.TweetFeed._super.call(this);
	this.data = data;
};

JW.extend(mt.TweetFeed, JW.UI.Component, {
	/*
	mt.Data data;
	*/
	
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
