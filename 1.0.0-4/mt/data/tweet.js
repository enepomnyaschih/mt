mt.data.Tweet = function(config) {
	mt.data.Tweet._super.call(this);
	this.fullName = config.fullName; // string
	this.shortName = config.shortName; // string
	this.avatarUrl48 = config.avatarUrl48; // string
	this.contentHtml = config.contentHtml; // string
	this.time = config.time; // number
	this.like = config.like; // boolean
	this.retweet = config.retweet; // boolean
	this.likeChangeEvent = this.own(new JW.Event()); // JW.Event<JW.ValueEventParams<boolean>>
	this.retweetChangeEvent = this.own(new JW.Event()); // JW.Event<JW.ValueEventParams<boolean>>
};

JW.extend(mt.data.Tweet, JW.Class, {
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
