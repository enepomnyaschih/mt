import Class from 'jwidget/Class';

export default class Profile extends Class {
	fullName: string;
	shortName: string;
	avatarUrl32: string;
	avatarUrl48: string;
	tweets: number;
	following: number;
	followers: number;

	constructor(config: ProfileConfig) {
		super();
		this.fullName = config.fullName;
		this.shortName = config.shortName;
		this.avatarUrl32 = config.avatarUrl32;
		this.avatarUrl48 = config.avatarUrl48;
		this.tweets = config.tweets;
		this.following = config.following;
		this.followers = config.followers;
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
