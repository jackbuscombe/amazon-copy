import Image from "next/image";
import { MenuIcon, SearchIcon, ShoppingCartIcon } from "@heroicons/react/outline";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useStore } from "../appStore";

function Header() {
	const { data: session } = useSession();
	const router = useRouter();
	const cart = useStore((state) => state.cart);

	return (
		<header>
			{/* Top Nav */}
			<div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
				<div onClick={() => router.push("/")} className="mt-2 flex items-center flex-grow sm:flex-grow-0">
					<Image className="cursor-pointer" src="https://links.papareact.com/f90" width={150} height={40} objectFit="contain" />
				</div>

				{/* Search */}
				<div className="hidden items-center h-10 rounded-md bg-yellow-400 hover:bg-yellow-500 sm:flex flex-grow cursor-pointer">
					<input className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4" type="text" />
					<SearchIcon className="h-12 p-4" />
				</div>

				{/* Right Section */}
				<div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
					<div className="link" onClick={!session ? signIn : signOut}>
						<p>Hello, {session ? session.user.name : "Sign In"}</p>
						<p className="font-bold md:text-sm">Account &amp; Lists</p>
					</div>

					<div className="link">
						<p>Returns</p>
						<p className="font-bold md:text-sm">&amp; Orders</p>
					</div>

					<div onClick={() => router.push("/checkout")} className="relative link flex items-center">
						<span className="absolute top-0 right-0 md:right-6 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">{cart.length}</span>
						<ShoppingCartIcon className="h-10" />
						<p className="hidden md:inline font-bold md:text-sm mt-2">Cart</p>
					</div>
				</div>
			</div>

			{/* Bottom Nav */}
			<div className="flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm">
				<p className="link flex items-center">
					<MenuIcon className="h-6 mr-1" />
				</p>
				<p className="link">Prime Video</p>
				<p className="link">Amazon Business</p>
				<p className="link">Today&apos;s Deals</p>
				<p className="link hidden lg:inline-flex">Electronics</p>
				<p className="link hidden lg:inline-flex">Food &amp; Grocery</p>
				<p className="link hidden lg:inline-flex">Prime</p>
				<p className="link hidden lg:inline-flex">Buy Again</p>
				<p className="link hidden lg:inline-flex">Shopper Toolkit</p>
				<p className="link hidden lg:inline-flex">Health &amp; Personal Care</p>
			</div>
		</header>
	);
}
export default Header;
