export default interface Profile {

	readonly fullName: string;
	readonly shortName: string;
	readonly avatarUrl32: string;
	readonly avatarUrl48: string;
	readonly tweets: number;
	readonly following: number;
	readonly followers: number;
}
