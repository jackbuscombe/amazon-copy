import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Currency from "react-currency-formatter";
import { useStore } from "../appStore";

function CheckoutProduct({ id, title, price, description, category, image, rating, hasPrime }) {
	const addToCart = useStore((state) => state.addToCart);
	const removeFromCart = useStore((state) => state.removeFromCart);

	const addItemToCart = () => {
		const product = { id, title, price, description, category, image, rating, hasPrime };
		addToCart(product);
	};

	const removeItemFromCart = () => {
		removeFromCart(id);
	};

	return (
		<div className="grid grid-cols-5">
			<Image src={image} height={200} width={200} objectFit="contain" />

			{/* Middle */}
			<div className="col-span-3 mx-5">
				<p>{title}</p>
				<div className="flex">
					{Array(rating)
						.fill()
						.map((_, i) => (
							<StarIcon key={i} className="h-5 text-yellow-500" />
						))}
				</div>

				<p className="text-xs my-2 line-clamp-3">{description}</p>
				<Currency quantity={price} currency="AUD" />

				{hasPrime && (
					<div className="flex items-center space-x-2">
						<img className="w-12" loading="lazy" src="https://links.papareact.com/fdw" alt="" />
						<p className="text-xs text-gray-500">FREE Next-day Delivery</p>
					</div>
				)}
			</div>

			{/* Right add/remove cart */}
			<div className="flex flex-col space-y-2 my-auto justify-self-end">
				<button onClick={addItemToCart} className="button">
					Add to Cart
				</button>
				<button onClick={removeItemFromCart} className="button">
					Remove from Cart
				</button>
			</div>
		</div>
	);
}
export default CheckoutProduct;
