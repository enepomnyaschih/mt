import Class from 'jwidget/Class';
import IArray from 'jwidget/IArray';
import JWArray from 'jwidget/JWArray';

import Profile from './Profile';
import Tweet from './Tweet';

export default class Data extends Class {
	private _profile: Profile;
	private _tweets: IArray<Tweet>;

	constructor(profile: Profile, tweets: Tweet[]) {
		super();
		this._profile = this.own(profile);
		this._tweets = this.own(new JWArray<Tweet>(tweets)).ownItems();
	}

	get profile() {
		return this._profile;
	}

	get tweets() {
		return this._tweets;
	}

	static createByJson(json: any) {
		let tweets = (<any[]>json['tweets']).map(Tweet.createByJson);
		return new Data(json['profile'], tweets);
	}
}
