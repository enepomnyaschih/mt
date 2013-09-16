mt.TweetView = function(data) {
	this._updateTime = JW.inScope(this._updateTime, this);
	this._onLikeClick = JW.inScope(this._onLikeClick, this);
	this._onRetweetClick = JW.inScope(this._onRetweetClick, this);
	mt.TweetView._super.call(this);
	this.data = data;
	this._timer = null;
};

JW.extend(mt.TweetView, JW.UI.Component, {
	/*
	mt.data.Tweet data;
	Integer _timer;
	JW.EventAttachment _likeChangeAttachment;
	JW.EventAttachment _retweetChangeAttachment;
	*/
	
	renderAvatar: function(el) {
		el.css("background-image", "url(" + this.data.avatarUrl48 + ")");
	},
	
	renderTime: function(el) {
		this._updateTime();
		this._timer = setInterval(this._updateTime, 30000);
	},
	
	renderFullName: function(el) {
		el.text(this.data.fullName);
	},
	
	renderShortName: function(el) {
		el.text("@" + this.data.shortName);
	},
	
	renderText: function(el) {
		el.html(this.data.contentHtml);
	},
	
	renderLike: function(el) {
		this._updateLike();
		this._likeChangeAttachment = this.data.likeChangeEvent.bind(this._updateLike, this);
		el.click(this._onLikeClick);
	},
	
	renderRetweet: function(el) {
		this._updateRetweet();
		this._retweetChangeAttachment = this.data.retweetChangeEvent.bind(this._updateRetweet, this);
		el.click(this._onRetweetClick);
	},
	
	// override
	destroyComponent: function() {
		this._retweetChangeAttachment.destroy();
		this._likeChangeAttachment.destroy();
		clearInterval(this._timer);
		this._super();
	},
	
	_updateTime: function() {
		var timeAgo = new Date().getTime() - this.data.time;
		var text = this._getTimeString(timeAgo);
		this.getElement("time").text(text);
	},
	
	_updateLike: function() {
		this.getElement("like").
			toggleClass("active", this.data.like).
			text(this.data.like ? "Unlike" : "Like");
	},
	
	_updateRetweet: function() {
		this.getElement("retweet").
			toggleClass("active", this.data.retweet).
			text(this.data.retweet ? "Unretweet" : "Retweet");
	},
	
	_onLikeClick: function(event) {
		event.preventDefault();
		this.data.setLike(!this.data.like);
	},
	
	_onRetweetClick: function(event) {
		event.preventDefault();
		this.data.setRetweet(!this.data.retweet);
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
