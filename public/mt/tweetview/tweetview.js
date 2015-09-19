﻿mt.TweetView = function(tweetData) {
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
		var text = this.own(new JW.Functor([this.tweetData.like], function(like) {
			return like ? "Unlike" : "Like";
		}, this)).target;
		this.own(new JW.UI.TextUpdater(el, text));
		this.own(new JW.UI.ClassUpdater(el, "active", this.tweetData.like));
		el.jwon("click", this._onLikeClick, this);
	},
	
	renderRetweet: function(el) {
		var text = this.own(new JW.Functor([this.tweetData.retweet], function(retweet) {
			return retweet ? "Unretweet" : "Retweet";
		}, this)).target;
		this.own(new JW.UI.TextUpdater(el, text));
		this.own(new JW.UI.ClassUpdater(el, "active", this.tweetData.retweet));
		el.jwon("click", this._onRetweetClick, this);
	},
	
	_updateTime: function() {
		var timeAgo = new Date().getTime() - this.tweetData.time;
		var text = this._getTimeString(timeAgo);
		this.getElement("time").text(text);
	},
	
	_onLikeClick: function(event) {
		event.preventDefault();
		this.tweetData.like.set(!this.tweetData.like.get());
	},
	
	_onRetweetClick: function(event) {
		event.preventDefault();
		this.tweetData.retweet.set(!this.tweetData.retweet.get());
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
