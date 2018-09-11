export default interface Tweet {

	readonly fullName: string;
	readonly shortName: string;
	readonly avatarUrl48: string;
	readonly contentHtml: string;
	readonly time: number;
	readonly like: boolean;
	readonly retweet: boolean;
}

export function createTweetByJson(json: any): Tweet {
	return {
		...json,
		time: new Date().getTime() - json["timeAgo"]
	};
}
