export type USER = {
	id?: string;
	username: string;
	password: string;
	passwordConfirm: string;
	email: string;
	emailVisibility: boolean;
	name: string;
	avatar?: File;
};
