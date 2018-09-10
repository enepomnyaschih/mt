export default class Tweet {

	readonly fullName: string;
	readonly shortName: string;
	readonly avatarUrl48: string;
	readonly contentHtml: string;
	readonly time: number;
	readonly like: boolean;
	readonly retweet: boolean;

	constructor(config: TweetConfig) {
		this.fullName = config.fullName;
		this.shortName = config.shortName;
		this.avatarUrl48 = config.avatarUrl48;
		this.contentHtml = config.contentHtml;
		this.time = config.time;
		this.like = config.like;
		this.retweet = config.retweet;
	}

	static createByJson(json: any) {
		return new Tweet({
			...json,
			time: new Date().getTime() - json["timeAgo"]
		});
	}
}

export interface TweetConfig {

	readonly fullName: string;
	readonly shortName: string;
	readonly avatarUrl48: string;
	readonly contentHtml: string;
	readonly time: number;
	readonly like: boolean;
	readonly retweet: boolean;
}
