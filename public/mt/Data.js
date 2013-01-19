mt.Data = Class.extend({
	/*
	Required options
	String fullName;
	String shortName;
	String contentHtml;
	Integer timeAgo;
	Boolean like;
	Boolean retweet;
	
	Fields
	Integer time;
	*/
	
	init: function(config) {
		this.fullName = config.fullName;
		this.shortName = config.shortName;
		this.contentHtml = config.contentHtml;
		this.time = new Date().getTime() - config.timeAgo;
		this.like = config.like;
		this.retweet = config.retweet;
	}
});
