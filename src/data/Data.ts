import Class from 'jwidget/Class';
import IArray from 'jwidget/IArray';
import JWArray from 'jwidget/JWArray';

import Profile from './Profile';
import Tweet from './Tweet';

export default class Data extends Class {
	profile: Profile;
	tweets: IArray<Tweet>;

	constructor(profile: Profile, tweets: Tweet[]) {
		super();
		this.profile = this.own(profile);
		this.tweets = this.own(new JWArray<Tweet>(tweets)).ownItems();
	}

	static createByJson(json: any) {
		const tweets = (<any[]>json['tweets']).map(Tweet.createByJson);
		return new Data(json['profile'], tweets);
	}
}
