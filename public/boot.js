var data;
var tweetFeed;

$(function() {
	data = mt.Data.createByJson([
		{
			"fullName": "Road Runner",
			"shortName": "roadrunner",
			"avatarUrl48": "backend/avatar-48.png",
			"contentHtml": "jWidget documentation is here <a href=\"https://enepomnyaschih.github.com/jwidget\" target=\"_blank\">enepomnyaschih.github.com/jwidget</a>",
			"timeAgo": 215000,
			"like": false,
			"retweet": true
		}, {
			"fullName": "Road Runner",
			"shortName": "roadrunner",
			"avatarUrl48": "backend/avatar-48.png",
			"contentHtml": "Tweet feed is growing",
			"timeAgo": 515000,
			"like": false,
			"retweet": false
		}
	]);
	tweetFeed = new mt.TweetFeed(data);
	tweetFeed.renderTo("#container");
});
