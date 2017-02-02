import Class from 'jwidget/Class';
import IArray from 'jwidget/IArray';
import JWArray from 'jwidget/JWArray';

import Tweet from './Tweet';

export default class Data extends Class {
	private _tweets: IArray<Tweet>;

	constructor(tweets: Tweet[]) {
		super();
		this._tweets = this.own(new JWArray<Tweet>(tweets)).ownItems();
	}

	get tweets() {
		return this._tweets;
	}

	static createByJson(json: any) {
		let tweets = (<any[]>json).map(Tweet.createByJson);
		return new Data(tweets);
	}
}
