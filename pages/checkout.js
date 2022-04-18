import Image from "next/image";
import { useStore } from "../appStore";
import CheckoutProduct from "../components/CheckoutProduct";
import Header from "../components/Header";
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

function Checkout() {
	const cart = useStore((state) => state.cart);
	const total = useStore((state) => state.total);
	const { data: session } = useSession();

	return (
		<div className="bg-gray-100">
			<Header />

			<main className="lg:flex max-w-screen-2xl mx-auto">
				{/* Left/Top Section */}
				<div className="flex-grow m-5 shadow-sm">
					<Image src="https://links.papareact.com/ikj" width={1020} height={250} objectFit="contain" />

					<div className="flex flex-col p-5 space-y-10 bg-white">
						<h1 className="text-3xl border-b pb-4">{cart.length === 0 ? "Your Amazon cart is empty" : "Your Shopping Basket"}</h1>
						{cart.map(({ id, title, price, description, category, image, rating, hasPrime }, i) => (
							<CheckoutProduct key={i} id={id} title={title} price={price} description={description} category={category} image={image} rating={rating} hasPrime={hasPrime} />
						))}
					</div>
				</div>

				{/* Right/Bottom Section */}
				<div className="flex flex-col bg-white p-10 shadow-md">
					{cart.length > 0 && (
						<>
							<h2 className="whitespace-nowrap">
								Subtotal ({cart.length} items):{" "}
								<span className="font-bold">
									<Currency quantity={total} currency="AUD" />
								</span>
							</h2>
							<button disabled={!session} className={`button mt-2 ${!session && "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"}`}>
								{!session ? "Sign in to checkout" : "Proceed to checkout"}
							</button>
						</>
					)}
				</div>
			</main>
		</div>
	);
}
export default Checkout;
