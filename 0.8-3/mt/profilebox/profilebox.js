﻿mt.ProfileBox = function(data) {
	mt.ProfileBox._super.call(this);
	this.data = data;
};

JW.extend(mt.ProfileBox, JW.UI.Component, {
	/*
	mt.Data data;
	*/
	
	renderTop: function(el) {
		el.attr("href", "https://twitter.com/" + this.data.profile.shortName);
	},
	
	renderAvatar: function(el) {
		el.css("background-image", "url(" + this.data.profile.avatarUrl32 + ")");
	},
	
	renderFullName: function(el) {
		el.text(this.data.profile.fullName);
	},
	
	renderTweets: function(el) {
		el.attr("href", "https://twitter.com/" + this.data.profile.shortName);
	},
	
	renderTweetsValue: function(el) {
		el.text(this.data.profile.tweets);
	},
	
	renderFollowingValue: function(el) {
		el.text(this.data.profile.following);
	},
	
	renderFollowersValue: function(el) {
		el.text(this.data.profile.followers);
	}
});

JW.UI.template(mt.ProfileBox, {
	main:
		'<div jwclass="mt-profile-box">' +
			'<a jwid="top" class="blocklink" href="#" target="_blank">' +
				'<div jwid="avatar"></div>' +
				'<div jwid="full-name"></div>' +
				'<div jwid="show-profile">Show my profile</div>' +
				'<div class="clear"></div>' +
			'</a>' +
			'<div jwid="middle">' +
				'<a jwid="count tweets" class="blocklink" href="#" target="_blank">' +
					'<div jwid="count-value tweets-value"></div>' +
					'<div jwid="count-label">TWEETS</div>' +
				'</a>' +
				'<a jwid="count count-border following" class="blocklink" href="https://twitter.com/following" target="_blank">' +
					'<div jwid="count-value following-value"></div>' +
					'<div jwid="count-label">FOLLOWING</div>' +
				'</a>' +
				'<a jwid="count count-border followers" class="blocklink" href="https://twitter.com/followers" target="_blank">' +
					'<div jwid="count-value followers-value"></div>' +
					'<div jwid="count-label">FOLLOWERS</div>' +
				'</a>' +
				'<div class="clear"></div>' +
			'</div>' +
			'<div jwid="bottom">' +
				'<form jwid="compose-form">' +
					'<div jwid="compose-fields">' +
						'<textarea jwid="compose-input" type="text" placeholder="Compose tweet..."></textarea>' +
					'</div>' +
					'<div jwid="compose-buttons">' +
						'<input jwid="compose-submit" type="submit" value="Tweet">' +
					'</div>' +
				'</form>' +
			'</div>' +
		'</div>'
});
