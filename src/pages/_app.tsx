import Header from "@/components/Header";
import "@/styles/globals.css";
import "@/styles/github-dark.min.css";
import type { AppProps } from "next/app";
import Footer from "@/components/Footer";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<div className=" flex flex-col h-screen">
			<Header></Header>
			<Component {...pageProps} />
			<Footer></Footer>
		</div>
	);
}
