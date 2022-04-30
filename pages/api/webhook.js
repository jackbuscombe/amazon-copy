import { buffer } from "micro";
import { serviceAccount } from "../../permissions";
const { initializeApp, applicationDefault, cert, getApps, getApp } = require("firebase-admin/app");
const { getFirestore, Timestamp, FieldValue } = require("firebase-admin/firestore");

// Secure a connection to firebase from the backend
const admin = require("firebase-admin");
const app = !getApps().length
	? initializeApp({
			credential: admin.credential.cert(serviceAccount),
	  })
	: getApp();
const db = getFirestore();

// Establish connection to Stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfillOrder = async (session) => {
	const docRef = db.collection("users").doc(session.metadata.email).collection("orders").doc(session.id);
	return docRef
		.set({
			amount: session.amount_total / 100,
			amount_shipping: session.total_details.amount_shipping / 100,
			images: JSON.parse(session.metadata.images),
			timestamp: FieldValue.serverTimestamp(),
		})
		.then(() => {
			console.log(`SUCCESS: Order ${session.id} has been added to the database`);
		});
};

export default async (req, res) => {
	if (req.method === "POST") {
		const requestBuffer = await buffer(req);
		const payload = requestBuffer.toString();
		const sig = req.headers["stripe-signature"];

		let event;

		// Verify that the EVENT posted came from Stripe
		try {
			event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
		} catch (err) {
			console.log("ERROR", err.message);
			return res.status(400).send(`Webhook error': ${err.message}`);
		}

		// Handle the checkout.session.completed event
		if (event.type === "checkout.session.completed") {
			const session = event.data.object;

			// Fulfill the order => Push inside of a database
			return fulfillOrder(session)
				.then(() => res.status(200))
				.catch((err) => res.status(400).send(`Webhook Error: ${err.message}`));
		}
	}
};

export const config = {
	api: {
		bodyParser: false,
		externalResolver: true,
	},
};
