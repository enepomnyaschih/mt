import Profile from "./Profile";
import Tweet, {createTweetByJson} from "./Tweet";

export default class ApplicationData {

	constructor(readonly profile: Profile, readonly tweets: Tweet[] = []) {
	}

	static createByJson(json: any) {
		return new ApplicationData(json.profile,
			(<any[]>json.tweets || []).map(createTweetByJson));
	}
}
