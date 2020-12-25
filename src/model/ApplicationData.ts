import BindableArray from "jwidget/BindableArray";
import Profile from "./Profile";
import Tweet from "./Tweet";

export default class ApplicationData {

	readonly tweets: BindableArray<Tweet>;

	constructor(readonly profile: Profile, tweets: Tweet[] = []) {
		this.tweets = new BindableArray(tweets);
	}

	static createByJson(json: any) {
		return new ApplicationData(json.profile,
			(<any[]>json.tweets || []).map(Tweet.createByJson));
	}
}
