import Class from 'jwidget/Class';

export default class Profile extends Class {
	private _fullName: string;
	private _shortName: string;
	private _avatarUrl32: string;
	private _avatarUrl48: string;
	private _tweets: number;
	private _following: number;
	private _followers: number;

	constructor(config: ProfileConfig) {
		super();
		this._fullName = config.fullName;
		this._shortName = config.shortName;
		this._avatarUrl32 = config.avatarUrl32;
		this._avatarUrl48 = config.avatarUrl48;
		this._tweets = config.tweets;
		this._following = config.following;
		this._followers = config.followers;
	}

	get fullName() {
		return this._fullName;
	}

	get shortName() {
		return this._shortName;
	}

	get avatarUrl32() {
		return this._avatarUrl32;
	}

	get avatarUrl48() {
		return this._avatarUrl48;
	}

	get tweets() {
		return this._tweets;
	}

	get following() {
		return this._following;
	}

	get followers() {
		return this._followers;
	}

	static createByJson(json: any) {
		return new Profile({
			fullName: json['fullName'],
			shortName: json['shortName'],
			avatarUrl32: json['avatarUrl32'],
			avatarUrl48: json['avatarUrl48'],
			tweets: json['tweets'],
			following: json['following'],
			followers: json['followers']
		});
	}
}

export interface ProfileConfig {
	fullName: string;
	shortName: string;
	avatarUrl32: string;
	avatarUrl48: string;
	tweets: number;
	following: number;
	followers: number;
}
