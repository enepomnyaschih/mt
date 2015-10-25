mt.TweetView = function(tweetData) {
	mt.TweetView._super.call(this);
	this.tweetData = tweetData; // mt.data.Tweet
};

JW.extend(mt.TweetView, JW.UI.Component, {
	renderAvatar: function(el) {
		el.css("background-image", "url(" + this.tweetData.avatarUrl48 + ")");
	},
	
	renderTime: function() {
		this._updateTime();
		this.own(new JW.Interval(this._updateTime, this, 30000));
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
		this.own(this.tweetData.likeChangeEvent.bind(this._updateLike, this));
		el.jwon("click", this._onLikeClick, this);
	},
	
	renderRetweet: function(el) {
		this._updateRetweet();
		this.own(this.tweetData.retweetChangeEvent.bind(this._updateRetweet, this));
		el.jwon("click", this._onRetweetClick, this);
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

JW.UI.template(mt.TweetView, {
	main:
		'<div jwclass="mt-tweet">' +
			'<div jwid="avatar"></div>' +
			'<div jwid="content">' +
				'<div jwid="header">' +
					'<div jwid="full-name"></div>' +
					'<div jwid="short-name"></div>' +
					'<div jwid="time"></div>' +
					'<div class="clear"></div>' +
				'</div>' +
				'<div jwid="text"></div>' +
				'<div jwid="buttons">' +
					'<a jwid="button like" href="#"></a>' +
					'<a jwid="button retweet" href="#"></a>' +
					'<a jwid="button remove" href="#">Remove</a>' +
				'</div>' +
			'</div>' +
			'<div class="clear"></div>' +
		'</div>'
});
