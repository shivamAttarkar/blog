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

export type BLOG = {
	id?: string;
	title: string;
	discription: string;
	author: string;
	mdx: File | Blob;
	images: File[] | Blob[];
};

export type PBRETURN = {
	status: boolean;
	msg: any;
};

export type RECORD = {
	collectionId: string;
	collectionName: string;
	created: string;
	updated: string;
	id: string;
	title: string;
	discription: string;
	author: string;
	mdx: string;
	images: string[];
};
