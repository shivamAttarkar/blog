import { Slackey } from "next/font/google";

const slackey = Slackey({
	subsets: ["latin"],
	weight: "400",
});

export default function Header() {
	return (
		<header
			className={
				`${slackey.className}` +
				" --navbar justify-center border-b-2 bg-base-100"
			}
		>
			<button className=" --btn --btn-ghost ">Lazy.dev</button>
		</header>
	);
}
