import { Sigmar_One } from "next/font/google";
const sigmar = Sigmar_One({
	weight: "400",
	subsets: ["latin"],
});
export default function Footer() {
	return (
		<footer
			className={`select-none p-3 text-center text-sm ${sigmar.className}`}
		>
			@copyright 2023
		</footer>
	);
}
