import { Slackey } from "next/font/google";

const slackey = Slackey({
	subsets: ["latin"],
	weight: "400",
});

export default function Header() {
	return (
		<header
			className={`text-center ${slackey.className} p-3 text-xl border-b-2 bg-white select-none`}
		>
			Lazy.dev
		</header>
	);
}
