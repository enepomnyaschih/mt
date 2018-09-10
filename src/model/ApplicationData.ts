import IList from "jwidget/IList";
import List from "jwidget/List";
import ReadonlyList from "jwidget/ReadonlyList";
import Tweet from "./Tweet";

export default class ApplicationData {

	private _tweets: IList<Tweet>;

	constructor(tweets: Tweet[] = []) {
		this._tweets = new List(tweets);
	}

	get tweets(): ReadonlyList<Tweet> {
		return this._tweets;
	}

	static createByJson(json: any) {
		return new ApplicationData((<any[]>json || []).map(Tweet.createByJson));
	}
}
