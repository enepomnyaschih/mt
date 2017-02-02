import Class from 'jwidget/Class';
import IArray from 'jwidget/IArray';
import JWArray from 'jwidget/JWArray';

import Tweet from './Tweet';

export default class Data extends Class {
	private _tweets: IArray<Tweet> = this.own(new JWArray<Tweet>()).ownItems();

	public get tweets() {
		return this._tweets;
	}

	public static createByJson(json: any) {
		var data = new Data();
		data.tweets.addAll((<any[]>json).map(Tweet.createByJson));
		return data;
	}
}
