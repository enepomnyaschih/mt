mt.TweetView = function(tweetData) {
	mt.TweetView._super.call(this);
	this.tweetData = tweetData;
};

JW.extend(mt.TweetView, JW.UI.Component, {
	/*
	mt.data.Tweet tweetData;
	*/
	
	renderAvatar: function(el) {
		el.css("background-image", "url(" + this.tweetData.avatarUrl48 + ")");
	},
	
	renderTime: function(el) {
		var timeAgo = new Date().getTime() - this.tweetData.time;
		var text = this._getTimeString(timeAgo);
		el.text(text);
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
		el.toggleClass("active", this.tweetData.like).text(this.tweetData.like ? "Unlike" : "Like");
	},
	
	renderRetweet: function(el) {
		el.toggleClass("active", this.tweetData.retweet).text(this.tweetData.retweet ? "Unretweet" : "Retweet");
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
					'<a jwid="like" class="mt-tweet-button" href="#"></a>' +
					'<a jwid="retweet" class="mt-tweet-button" href="#"></a>' +
					'<a jwid="remove" class="mt-tweet-button" href="#">Remove</a>' +
				'</div>' +
			'</div>' +
			'<div class="clear"></div>' +
		'</div>'
});
