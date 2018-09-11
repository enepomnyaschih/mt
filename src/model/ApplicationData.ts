import List from "jwidget/List";
import Profile from "./Profile";
import Tweet from "./Tweet";

export default class ApplicationData {

	readonly tweets: List<Tweet>;

	constructor(readonly profile: Profile, tweets: Tweet[] = []) {
		this.tweets = new List(tweets);
	}

	static createByJson(json: any) {
		return new ApplicationData(json.profile,
			(<any[]>json.tweets || []).map(Tweet.createByJson));
	}
}
