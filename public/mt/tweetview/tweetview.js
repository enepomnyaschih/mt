mt.TweetView = function(locale, data) {
	this._updateTime = JW.inScope(this._updateTime, this);
	this._onLikeClick = JW.inScope(this._onLikeClick, this);
	this._onRetweetClick = JW.inScope(this._onRetweetClick, this);
	mt.TweetView._super.call(this);
	this.locale = locale;
	this.data = data;
	this._timer = null;
	this._localeChangeAttachment = null;
};

JW.extend(mt.TweetView, JW.UI.Component, {
	/*
	mt.Locale locale;
	mt.data.Tweet data;
	Integer _timer;
	JW.EventAttachment _localeChangeAttachment;
	JW.EventAttachment _likeChangeAttachment;
	JW.EventAttachment _retweetChangeAttachment;
	*/
	
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
	
	renderContent: function(el) {
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
	renderComponent: function() {
		this._super();
		this._localeChangeAttachment = this.locale.changeEvent.bind(this._onLocaleChange, this);
	},
	
	// override
	destroyComponent: function() {
		this._localeChangeAttachment.destroy();
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
			text(this.locale.getString(this.data.like ? "unlike" : "like"));
	},
	
	_updateRetweet: function() {
		this.getElement("retweet").
			toggleClass("active", this.data.retweet).
			text(this.locale.getString(this.data.retweet ? "unretweet" : "retweet"));
	},
	
	_onLikeClick: function() {
		this.data.setLike(!this.data.like);
	},
	
	_onRetweetClick: function() {
		this.data.setRetweet(!this.data.retweet);
	},
	
	_onLocaleChange: function() {
		this._updateTime();
		this._updateLike();
		this._updateRetweet();
	},
	
	_getTimeString: function(timeAgo) {
		var minutes = timeAgo / 60000;
		if (minutes < 1) {
			return this.locale.getString("now");
		}
		if (minutes < 60) {
			return Math.floor(minutes) + this.locale.getString("minuteLiter");
		}
		var hours = minutes / 60;
		if (hours < 24) {
			return Math.round(hours) + this.locale.getString("hourLiter");
		}
		
		function pad(value) {
			return (value < 10) ? ("0" + value) : String(value);
		}
		
		var date = new Date(new Date().getTime() - timeAgo);
		return date.getDate() + "." + pad(date.getMonth());
	}
});
