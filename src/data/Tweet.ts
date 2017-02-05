import Class from "jwidget/Class";
import Event from "jwidget/Event";

export default class Tweet extends Class {
	fullName: string;
	shortName: string;
	avatarUrl48: string;
	contentHtml: string;
	time: number;
	like: boolean;
	retweet: boolean;
	likeChangeEvent = this.own(new Event<boolean>());
	retweetChangeEvent = this.own(new Event<boolean>());

	constructor(config: TweetConfig) {
		super();
		this.fullName = config.fullName;
		this.shortName = config.shortName;
		this.avatarUrl48 = config.avatarUrl48;
		this.contentHtml = config.contentHtml;
		this.time = config.time;
		this.like = config.like;
		this.retweet = config.retweet;
	}

	setLike(like: boolean) {
		if (this.like === like) {
			return;
		}
		this.like = like;
		this.likeChangeEvent.trigger(like);
	}

	setRetweet(retweet: boolean) {
		if (this.retweet === retweet) {
			return;
		}
		this.retweet = retweet;
		this.retweetChangeEvent.trigger(retweet);
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
