import Class from "jwidget/Class";
import Property from "jwidget/Property";

export default class Tweet extends Class {
	fullName: string;
	shortName: string;
	avatarUrl48: string;
	contentHtml: string;
	time: number;
	like: Property<boolean>;
	retweet: Property<boolean>;

	constructor(config: TweetConfig) {
		super();
		this.fullName = config.fullName;
		this.shortName = config.shortName;
		this.avatarUrl48 = config.avatarUrl48;
		this.contentHtml = config.contentHtml;
		this.time = config.time;
		this.like = new Property(config.like || false);
		this.retweet = new Property(config.retweet || false);
	}

	static createByJson(json: any) {
		return new Tweet({
			fullName: json["fullName"],
			shortName: json["shortName"],
			avatarUrl48: json["avatarUrl48"],
			contentHtml: json["contentHtml"],
			time: new Date().getTime() - json["timeAgo"],
			like: json["like"],
			retweet: json["retweet"]
		});
	}
}

export interface TweetConfig {
	fullName: string;
	shortName: string;
	avatarUrl48: string;
	contentHtml: string;
	time: number;
	like: boolean;
	retweet: boolean;
}
