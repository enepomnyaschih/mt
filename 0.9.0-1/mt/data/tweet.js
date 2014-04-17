mt.data.Tweet = function(config) {
	mt.data.Tweet._super.call(this);
	this.fullName = config.fullName;
	this.shortName = config.shortName;
	this.avatarUrl48 = config.avatarUrl48;
	this.contentHtml = config.contentHtml;
	this.time = config.time;
	this.like = config.like;
	this.retweet = config.retweet;
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
	*/
});

mt.data.Tweet.createByJson = function(json) {
	return new mt.data.Tweet(JW.apply({}, json, {
		time: new Date().getTime() - json.timeAgo
	}));
};
