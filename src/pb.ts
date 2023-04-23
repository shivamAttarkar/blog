import PocketBase from "pocketbase";
import { USER } from "./types";

const pb = new PocketBase("http://127.0.0.1:8090");
pb.autoCancellation(false);

export const userManagement = {
	createUser: async (data: USER) => {
		const usernameAvailable = await userManagement.userDoesNotExists(
			data.username
		);
		if (!usernameAvailable.status) {
			return usernameAvailable.msg;
		}
		try {
			const res = pb.collection("users").create(data);
			return res;
		} catch (e) {
			return {
				status: false,
				msg: e,
			};
		}
	},
	userDoesNotExists: async (username: string) => {
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
		} catch (e) {
			return {
				status: false,
				msg: e,
			};
		}
	},
	authUser: async (username: string, password: string) => {
		try {
			const authStatus = await pb
				.collection("users")
				.authWithPassword(username, password);
			return {
				status: true,
				msg: authStatus,
			};
		} catch (e) {
			return {
				status: false,
				msg: e,
			};
		}
	},
};

export const blogManagement = {};

export default pb;
