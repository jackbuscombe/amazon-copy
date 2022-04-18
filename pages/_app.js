import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { useStore } from "../appStore";
import { useEffect } from "react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	const cart = useStore((state) => state.cart);
	const setTotal = useStore((state) => state.setTotal);

	useEffect(() => {
		let runningTotal = 0;
		for (let i = 0; i < cart.length; i++) {
			runningTotal += cart[i].price;
		}

		setTotal(runningTotal);
	}, [cart]);

	return (
		<SessionProvider session={session}>
			<Component {...pageProps} />
		</SessionProvider>
	);
}

export default MyApp;
