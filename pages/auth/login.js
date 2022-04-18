import { getProviders, signIn } from "next-auth/react";

export default function Login({ providers }) {
	return (
		<>
			<div className="-mt-28 flex min-h-screen flex-col items-center justify-center py-2 px-14 text-center">
				<img className="w-80" src="https://links.papareact.com/ocw" alt="" />
				<p className="font-xs italic">This is an Instagram copy - not the real thing!</p>
				<div className="mt-40">
					{Object.values(providers).map((provider) => (
						<div key={provider.name}>
							<button className="rounded-lg bg-blue-500 p-3 text-white" onClick={() => signIn(provider.id, { callbackUrl: "/" })}>
								Sign in with {provider.name}
							</button>
						</div>
					))}
				</div>
			</div>
		</>
	);
}

export async function getServerSideProps() {
	const providers = await getProviders();

	return {
		props: {
			providers,
		},
	};
}
