import Class from 'jwidget/Class';
import IArray from 'jwidget/IArray';
import JWArray from 'jwidget/JWArray';

import Tweet from './Tweet';

export default class Data extends Class {
	tweets: IArray<Tweet>;

	constructor(tweets: Tweet[]) {
		super();
		this.tweets = this.own(new JWArray<Tweet>(tweets)).ownItems();
	}

	static createByJson(json: any) {
		return new Data((<any[]>json).map(Tweet.createByJson));
	}
}
