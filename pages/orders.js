import Header from "../components/Header";
import { getSession, useSession } from "next-auth/react";
import { db } from "../firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import moment from "moment";
import Order from "../components/Order";

function Orders({ orders }) {
	const { data: session } = useSession();

	return (
		<div className="">
			<Header />
			<main className="max-w-screen-lg mx-auto p-10">
				<h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">Your Orders</h1>

				{session ? <h2>{orders.length} Orders</h2> : <h2>Please sign in to see your orders</h2>}

				<div className="mt-5 space-y-4">
					{orders?.map(({ id, amount, amountShipping, items, timestamp, images }) => (
						<Order key={id} id={id} amount={amount} amountShipping={amountShipping} items={items} timestamp={timestamp} images={images} />
					))}
				</div>
			</main>
			<div></div>
		</div>
	);
}
export default Orders;

export async function getServerSideProps({ req, res }) {
	const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

	// Get the users logged in credentions...
	const session = await getSession({ req });

	if (!session) {
		return {
			props: {},
		};
	}

	// Firebase DB
	const ordersQuery = query(collection(db, "users", session.user.email, "orders"), orderBy("timestamp", "asc"));
	const stripeOrders = await getDocs(ordersQuery);

	// Stripe Orders
	const orders = await Promise.all(
		stripeOrders.docs.map(async (order) => ({
			id: order.id,
			amount: order.data().amount,
			amountShipping: order.data().amount_shipping,
			images: order.data().images,
			timestamp: moment(order.data().timestamp.toDate()).unix(),
			items: (
				await stripe.checkout.sessions.listLineItems(order.id, {
					limit: 100,
				})
			).data,
		}))
	);

	return {
		props: {
			orders,
			session,
		},
	};
}
