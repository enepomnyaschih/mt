import IList from "jwidget/IList";
import List from "jwidget/List";
import ReadonlyList from "jwidget/ReadonlyList";
import Profile from "./Profile";
import Tweet from "./Tweet";

export default class ApplicationData {

	private _tweets: IList<Tweet>;

	constructor(readonly profile: Profile, tweets: Tweet[] = []) {
		this._tweets = new List(tweets);
	}

	get tweets(): ReadonlyList<Tweet> {
		return this._tweets;
	}

	addTweet(tweet: Tweet) {
		this._tweets.add(tweet, 0);
	}

	removeTweet(tweet: Tweet) {
		this._tweets.removeItem(tweet);
	}

	static createByJson(json: any) {
		return new ApplicationData(json.profile,
			(<any[]>json.tweets || []).map(Tweet.createByJson));
	}
}
