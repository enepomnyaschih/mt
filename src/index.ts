var tweetData;
var tweetView;

$(function() {
	tweetData = mt.data.Tweet.createByJson({
		"fullName": "Road Runner",
		"shortName": "roadrunner",
		"avatarUrl48": "backend/avatar-48.png",
		"contentHtml": "jWidget documentation is here <a href=\"https://enepomnyaschih.github.com/jwidget\" target=\"_blank\">enepomnyaschih.github.com/jwidget</a>",
		"timeAgo": 215000,
		"like": false,
		"retweet": true
	});
	tweetView = new mt.TweetView(tweetData);
	tweetView.renderTo("#container");
});
