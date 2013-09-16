mt.TweetView = function(data, tweetData) {
	this._updateTime = JW.inScope(this._updateTime, this);
	this._onLikeClick = JW.inScope(this._onLikeClick, this);
	this._onRetweetClick = JW.inScope(this._onRetweetClick, this);
	this._onRemoveClick = JW.inScope(this._onRemoveClick, this);
	mt.TweetView._super.call(this);
	this.data = data;
	this.tweetData = tweetData;
	this._timer = null;
};

JW.extend(mt.TweetView, JW.UI.Component, {
	/*
	mt.Data data;
	mt.data.Tweet tweetData;
	Integer _timer;
	JW.EventAttachment _likeChangeAttachment;
	JW.EventAttachment _retweetChangeAttachment;
	*/
	
	renderAvatar: function(el) {
		el.css("background-image", "url(" + this.tweetData.avatarUrl48 + ")");
	},
	
	renderTime: function(el) {
		this._updateTime();
		this._timer = setInterval(this._updateTime, 30000);
	},
	
	renderFullName: function(el) {
		el.text(this.tweetData.fullName);
	},
	
	renderShortName: function(el) {
		el.text("@" + this.tweetData.shortName);
	},
	
	renderText: function(el) {
		el.html(this.tweetData.contentHtml);
	},
	
	renderLike: function(el) {
		this._updateLike();
		this._likeChangeAttachment = this.tweetData.likeChangeEvent.bind(this._updateLike, this);
		el.click(this._onLikeClick);
	},
	
	renderRetweet: function(el) {
		this._updateRetweet();
		this._retweetChangeAttachment = this.tweetData.retweetChangeEvent.bind(this._updateRetweet, this);
		el.click(this._onRetweetClick);
	},
	
	renderRemove: function(el) {
		el.click(this._onRemoveClick);
	},
	
	// override
	destroyComponent: function() {
		this._retweetChangeAttachment.destroy();
		this._likeChangeAttachment.destroy();
		clearInterval(this._timer);
		this._super();
	},
	
	_updateTime: function() {
		var timeAgo = new Date().getTime() - this.tweetData.time;
		var text = this._getTimeString(timeAgo);
		this.getElement("time").text(text);
	},
	
	_updateLike: function() {
		this.getElement("like").
			toggleClass("active", this.tweetData.like).
			text(this.tweetData.like ? "Unlike" : "Like");
	},
	
	_updateRetweet: function() {
		this.getElement("retweet").
			toggleClass("active", this.tweetData.retweet).
			text(this.tweetData.retweet ? "Unretweet" : "Retweet");
	},
	
	_onLikeClick: function(event) {
		event.preventDefault();
		this.tweetData.setLike(!this.tweetData.like);
	},
	
	_onRetweetClick: function(event) {
		event.preventDefault();
		this.tweetData.setRetweet(!this.tweetData.retweet);
	},
	
	_onRemoveClick: function(event) {
		event.preventDefault();
		this.data.tweets.removeItem(this.tweetData);
	},
	
	_getTimeString: function(timeAgo) {
		var minutes = timeAgo / 60000;
		if (minutes < 1) {
			return "Just now";
		}
		if (minutes < 60) {
			return Math.floor(minutes) + "m";
		}
		var hours = minutes / 60;
		if (hours < 24) {
			return Math.round(hours) + "h";
		}
		
		function pad(value) {
			return (value < 10) ? ("0" + value) : String(value);
		}
		
		var date = new Date(new Date().getTime() - timeAgo);
		return date.getDate() + "." + pad(date.getMonth());
	}
});
