import Profile from "./Profile";
import Tweet from "./Tweet";

export default class ApplicationData {

	constructor(readonly profile: Profile, readonly tweets: Tweet[] = []) {
	}

	static createByJson(json: any) {
		return new ApplicationData(json.profile,
			(<any[]>json.tweets || []).map(Tweet.createByJson));
	}
}
