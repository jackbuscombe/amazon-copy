import create from "zustand";

export const useStore = create((set, get) => ({
	cart: [],
	setCart: (e) => set({ cart: e }),

	addToCart: (e) => set((state) => ({ cart: [...state.cart, e] })),
	removeFromCart: (id) => {
		const index = get().cart.findIndex((cartItem) => cartItem.id === id);
		let newCart = [...get().cart];
		if (index >= 0) {
			// The item exists.. remove it
			newCart.splice(index, 1);
		} else {
			console.warn(`Cannnot remove product (id: ${id}) as it is not in the cart.`);
		}
		set((state) => ({ cart: newCart }));
	},

	total: 0,
	setTotal: (e) => set({ total: e }),
}));
