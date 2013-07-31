mt.data.Tweet = function(config) {
	mt.data.Tweet._super.call(this);
	this.fullName = config.fullName;
	this.shortName = config.shortName;
	this.contentHtml = config.contentHtml;
	this.time = config.time;
	this.like = config.like;
	this.retweet = config.retweet;
	this.likeChangeEvent = new JW.Event();
	this.retweetChangeEvent = new JW.Event();
};

JW.extend(mt.data.Tweet, JW.Class, {
	/*
	String fullName;
	String shortName;
	String contentHtml;
	Integer time;
	Boolean like;
	Boolean retweet;
	JW.Event<JW.ValueEventParams<Boolean>> likeChangeEvent;
	JW.Event<JW.ValueEventParams<Boolean>> retweetChangeEvent;
	*/
	
	// override
	destroy: function() {
		this.retweetChangeEvent.destroy();
		this.likeChangeEvent.destroy();
		this.destroy();
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
	return new mt.data.Tweet({
		fullName: json.fullName,
		shortName: json.shortName,
		contentHtml: json.contentHtml,
		time: new Date().getTime() - json.timeAgo,
		like: json.like,
		retweet: json.retweet
	});
};
