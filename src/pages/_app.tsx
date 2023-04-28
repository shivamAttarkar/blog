import Header from "@/components/Header";
import "@/styles/globals.css";
import "@/styles/github-dark.min.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Header></Header>
			<Component {...pageProps} />
		</>
	);
}
