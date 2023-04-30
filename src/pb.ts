import PocketBase from "pocketbase";
import { BLOG, PBRETURN, USER } from "./types";

const pb = new PocketBase("http://127.0.0.1:8090");
pb.autoCancellation(false);

export const userManagement = {
	/**
	 * creates user if the user doesn't exists
	 * @param {USER} data
	 * @returns {Promise<PBRETURN>}
	 */
	createUser: async (data: USER): Promise<PBRETURN> => {
		const usernameAvailable = await userManagement.userDoesNotExists(
			data.username
		);
		if (!usernameAvailable.status) {
			return usernameAvailable.msg;
		}
		try {
			const res = pb.collection("users").create(data);
			return {
				status: true,
				msg: res,
			};
		} catch (e: any) {
			return {
				status: false,
				msg: e,
			};
		}
	},
	/**
	 * checks if user exists or not
	 * @param {string} username
	 * @returns {Promise<PBRETURN>}
	 */
	userDoesNotExists: async (username: string): Promise<PBRETURN> => {
		try {
			const res = await pb
				.collection("users")
				.getFullList({ filter: `username="${username}"` });
			if (res.length == 0) {
				return {
					status: true,
					msg: "user doesn't exists",
				};
			} else {
				return {
					status: false,
					msg: "user already exists",
				};
			}
		} catch (e: any) {
			return {
				status: false,
				msg: e,
			};
		}
	},
	/**
	 * authenticates user
	 * @param {string} username
	 * @param {string} password
	 * @returns {Promise<PBRETURN>}
	 */
	authUser: async (username: string, password: string): Promise<PBRETURN> => {
		try {
			const token = await pb
				.collection("users")
				.authWithPassword(username, password);
			return {
				status: true,
				msg: token,
			};
		} catch (e: any) {
			return {
				status: false,
				msg: e,
			};
		}
	},
	/**
	 * used to logout the user
	 * @returns {Promise<void>}
	 */
	logout: async (): Promise<void> => {
		pb.authStore.clear();
	},
};

export const blogManagement = {
	/**
	 * creates a new blog
	 * @param {BLOG} blog
	 * @returns {Promise<PBRETURN>}
	 */
	createBlog: async (blog: BLOG): Promise<PBRETURN> => {
		const formData = new FormData();
		formData.append("title", blog.title);
		formData.append("discription", blog.discription);
		formData.append("author", blog.author);
		formData.append("mdx", blog.mdx);
		for (let i = 0; i < blog.images.length; i++) {
			formData.append("images", blog.images[i]);
		}
		try {
			const res = await pb.collection("posts").create(formData);
			return {
				status: true,
				msg: res,
			};
		} catch (e: any) {
			return {
				status: false,
				msg: e,
			};
		}
	},
	/**
	 * gets all the blogs in the database
	 * @returns {Promise<PBRETURN>}
	 */
	getBlogs: async (): Promise<PBRETURN> => {
		try {
			const res = await pb.collection("posts").getFullList();
			return {
				status: true,
				msg: res,
			};
		} catch (e: any) {
			return {
				status: false,
				msg: e,
			};
		}
	},
	/**
	 * fetches the author info
	 * @param {string} author
	 * @returns {Promise<PBRETURN>}
	 */
	getAuthorInfo: async (author: string): Promise<PBRETURN> => {
		try {
			const res = await pb
				.collection("users")
				.getFullList({ filter: `username="${author}"` });
			return {
				status: true,
				msg: res,
			};
		} catch (e: any) {
			return {
				status: false,
				msg: e,
			};
		}
	},
};

export default pb;
