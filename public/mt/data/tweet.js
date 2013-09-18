mt.data.Tweet = function(config) {
	mt.data.Tweet._super.call(this);
	this.fullName = config.fullName;
	this.shortName = config.shortName;
	this.avatarUrl48 = config.avatarUrl48;
	this.contentHtml = config.contentHtml;
	this.time = config.time;
	this.like = config.like;
	this.retweet = config.retweet;
	this.likeChangeEvent = new JW.Event();
	this.retweetChangeEvent = new JW.Event();
};

JW.extend(mt.data.Tweet, JW.Class, {
	/*
	string fullName;
	string shortName;
	string contentHtml;
	string avatarUrl48;
	number time;
	boolean like;
	boolean retweet;
	JW.Event<JW.ValueEventParams<boolean>> likeChangeEvent;
	JW.Event<JW.ValueEventParams<boolean>> retweetChangeEvent;
	*/
	
	// override
	destroy: function() {
		this.retweetChangeEvent.destroy();
		this.likeChangeEvent.destroy();
		this._super();
	},
	
	setLike: function(value) {
		if (this.like === value) {
			return;
		}
		this.like = value;
		this.likeChangeEvent.trigger(new JW.ValueEventParams(this, value));
	},
	
	setRetweet: function(value) {
		if (this.retweet === value) {
			return;
		}
		this.retweet = value;
		this.retweetChangeEvent.trigger(new JW.ValueEventParams(this, value));
	}
});

mt.data.Tweet.createByJson = function(json) {
	return new mt.data.Tweet(JW.apply({}, json, {
		time: new Date().getTime() - json.timeAgo
	}));
};
