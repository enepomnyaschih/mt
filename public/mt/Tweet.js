mt.Tweet = Class.extend({
	/*
	Fields
	mt.Locale locale;
	mt.Data data;
	Element el;
	Integer _timer;
	Function _onLocaleChange;
	*/
	
	init: function(locale, data) {
		this.locale = locale;
		this.data = data;
		this._render();
		this._updateLocale();
		this._subscribe();
	},
	
	destroy: function() {
		clearInterval(this._timer);
		this.locale.onChange.splice(this.locale.onChange.indexOf(this._onLocaleChange), 1);
	},
	
	_render: function() {
		this.el = $(mt.Tweet.template);
		this.el.find(".mt-tweet-full-name").text(this.data.fullName);
		this.el.find(".mt-tweet-short-name").text("@" + this.data.shortName);
		this.el.find(".mt-tweet-content").html(this.data.contentHtml);
	},
	
	_updateLocale: function() {
		this._updateTime();
		this._updateLike();
		this._updateRetweet();
	},
	
	_updateTime: function() {
		var timeAgo = new Date().getTime() - this.data.time;
		var text = this._getTimeString(timeAgo);
		this.el.find(".mt-tweet-time").text(text);
	},
	
	_updateLike: function() {
		this.el.find(".mt-tweet-like").
			toggleClass("active", this.data.like).
			text(this.locale.getString(this.data.like ? "unlike" : "like"));
	},
	
	_updateRetweet: function() {
		this.el.find(".mt-tweet-retweet").
			toggleClass("active", this.data.retweet).
			text(this.locale.getString(this.data.retweet ? "unretweet" : "retweet"));
	},
	
	_subscribe: function() {
		var self = this;
		
		this._timer = setInterval(function() {
			self._updateTime();
		}, 30000);
		
		this.el.find(".mt-tweet-like").click(function() {
			self.data.like = !self.data.like;
			self._updateLike();
		});
		
		this.el.find(".mt-tweet-retweet").click(function() {
			self.data.retweet = !self.data.retweet;
			self._updateRetweet();
		});
		
		this._onLocaleChange = function() {
			self._updateLocale();
		};
		
		this.locale.onChange.push(this._onLocaleChange);
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

mt.Tweet.template =
	'<div class="mt-tweet">' +
		'<div class="mt-tweet-time" />' +
		'<div class="mt-tweet-header">' +
			'<div class="mt-tweet-full-name" />' +
			'<div class="mt-tweet-short-name" />' +
		'</div>' +
		'<div class="mt-tweet-content" />' +
		'<div class="mt-tweet-buttons">' +
			'<div class="mt-tweet-button mt-tweet-like" />' +
			'<div class="mt-tweet-button mt-tweet-retweet" />' +
		'</div>' +
	'</div>';
