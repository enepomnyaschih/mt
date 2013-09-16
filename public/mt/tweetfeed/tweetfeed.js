mt.TweetFeed = function(data) {
	mt.TweetFeed._super.call(this);
	this.data = data;
	this._mapper = null;
};

JW.extend(mt.TweetFeed, JW.UI.Component, {
	/*
	mt.Data data;
	JW.AbstractArray.Mapper<mt.data.Tweet, mt.TweetView> _mapper;
	*/
	
	renderTweets: function() {
		this._mapper = this.data.tweets.createMapper({
			createItem: function(tweetData) {
				return new mt.TweetView(this.data, tweetData);
			},
			destroyItem: JW.destroy,
			scope: this
		});
		return this._mapper.target;
	},
	
	// override
	destroyComponent: function() {
		this._mapper.destroy();
		this._super();
	}
});
