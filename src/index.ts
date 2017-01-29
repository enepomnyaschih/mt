import Tweet from './data/Tweet';
import TweetView from './tweetview/TweetView';

require('./reset.css');

var tweet: Tweet;
var tweetView: TweetView;

$(function() {
	tweet = Tweet.createByJson({
		"fullName": "Road Runner",
		"shortName": "roadrunner",
		"avatarUrl48": "backend/avatar-48.png",
		"contentHtml": "jWidget documentation is here <a href=\"https://enepomnyaschih.github.com/jwidget\" target=\"_blank\">enepomnyaschih.github.com/jwidget</a>",
		"timeAgo": 215000,
		"like": false,
		"retweet": true
	});
	tweetView = new TweetView(tweet);
	tweetView.renderTo("body");
});
