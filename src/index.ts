import Data from './data/Data';
import TweetFeed from './tweetfeed/TweetFeed';

require('./reset.css');

const json = require<any>('./data.json');
let data: Data;
let tweetFeed: TweetFeed;

$(function() {
	data = Data.createByJson(json);
	tweetFeed = new TweetFeed(data);
	tweetFeed.renderTo('body');
});
