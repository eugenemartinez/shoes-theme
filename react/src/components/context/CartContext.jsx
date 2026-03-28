import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
	// ── Initialize from LocalStorage ──
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [cart, setCart] = useState(() => {
		const savedCart = localStorage.getItem("system_cart_data");
		return savedCart
			? JSON.parse(savedCart)
			: { items: [], total_price: 0, item_count: 0 };
	});

	// ── Auto-Sync to LocalStorage ──
	useEffect(() => {
		localStorage.setItem("system_cart_data", JSON.stringify(cart));
	}, [cart]);

	// ── Helper: Calculate Totals ──
	const updateTotals = (items) => {
		const item_count = items.reduce((acc, item) => acc + item.quantity, 0);
		const total_price = items.reduce(
			(acc, item) => acc + item.price * item.quantity,
			0,
		);
		return { items, item_count, total_price };
	};

	const openDrawer = () => setIsDrawerOpen(true);
	const closeDrawer = () => setIsDrawerOpen(false);

	// ── Actions ──
	const addToCart = (product, variant, quantity = 1) => {
		setCart((prev) => {
			const itemKey = `${product.id}-${variant.id}`;
			const existingItem = prev.items.find((item) => item.key === itemKey);

			let newItems;
			if (existingItem) {
				newItems = prev.items.map((item) =>
					item.key === itemKey
						? { ...item, quantity: item.quantity + quantity }
						: item,
				);
			} else {
				newItems = [
					...prev.items,
					{
						key: itemKey,
						id: product.id,
						handle: product.handle,
						title: product.title,
						variant_title: variant.title,
						price: product.price, // Ensure this matches your data (cents vs dollars)
						image: product.featured_image,
						quantity,
					},
				];
			}
			return updateTotals(newItems);
		});

		openDrawer();
	};

	const updateQty = (key, newQty) => {
		if (newQty <= 0) return removeItem(key);
		setCart((prev) => {
			const newItems = prev.items.map((item) =>
				item.key === key ? { ...item, quantity: newQty } : item,
			);
			return updateTotals(newItems);
		});
	};

	const removeItem = (key) => {
		setCart((prev) => {
			const newItems = prev.items.filter((item) => item.key !== key);
			return updateTotals(newItems);
		});
	};

	const clearCart = () => {
		setCart({ items: [], total_price: 0, item_count: 0 });
	};

	return (
		<CartContext.Provider
			value={{
				cart,
				addToCart,
				updateQty,
				removeItem,
				isDrawerOpen,
				openDrawer,
				closeDrawer,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => useContext(CartContext);
