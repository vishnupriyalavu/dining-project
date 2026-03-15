import { create } from "zustand"

import { API_BASE_URL } from "../services/api"

export interface CartItem {
  cartItemId?: string
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

interface BackendCartItem {
  id: string
  productId: string
  quantity: number
  food: {
    id: string
    name: string
    price: number
    image: string
  }
}

interface CartState {
  cart: CartItem[]
  isLoading: boolean
  addToCart: (item: CartItem) => Promise<void>
  increaseQuantity: (id: string) => Promise<void>
  decreaseQuantity: (id: string) => Promise<void>
  fetchCart: () => Promise<void>
  syncLocalCart: () => Promise<void>
  clearCart: () => void
}

const getToken = () => localStorage.getItem("token")

const mapBackendCart = (items: BackendCartItem[]): CartItem[] =>
  items.map((item) => ({
    cartItemId: item.id,
    id: item.productId,
    name: item.food.name,
    price: item.food.price,
    image: item.food.image,
    quantity: item.quantity,
  }))

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],
  isLoading: false,

  addToCart: async (item) => {
    const token = getToken()

    if (!token) {
      set((state) => {
        const existing = state.cart.find((cartItem) => cartItem.id === item.id)

        if (existing) {
          return {
            cart: state.cart.map((cartItem) =>
              cartItem.id === item.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
            ),
          }
        }

        return { cart: [...state.cart, item] }
      })
      return
    }

    await fetch(`${API_BASE_URL}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId: item.id,
        quantity: 1,
      }),
    })

    await get().fetchCart()
  },

  increaseQuantity: async (id) => {
    const token = getToken()
    const cartItem = get().cart.find((item) => item.id === id)

    if (!cartItem) {
      return
    }

    if (!token || !cartItem.cartItemId) {
      set((state) => ({
        cart: state.cart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      }))
      return
    }

    await fetch(`${API_BASE_URL}/cart/${cartItem.cartItemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        quantity: cartItem.quantity + 1,
      }),
    })

    await get().fetchCart()
  },

  decreaseQuantity: async (id) => {
    const token = getToken()
    const cartItem = get().cart.find((item) => item.id === id)

    if (!cartItem) {
      return
    }

    if (!token || !cartItem.cartItemId) {
      set((state) => ({
        cart: state.cart
          .map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter((item) => item.quantity > 0),
      }))
      return
    }

    if (cartItem.quantity <= 1) {
      await fetch(`${API_BASE_URL}/cart/${cartItem.cartItemId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    } else {
      await fetch(`${API_BASE_URL}/cart/${cartItem.cartItemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          quantity: cartItem.quantity - 1,
        }),
      })
    }

    await get().fetchCart()
  },

  fetchCart: async () => {
    const token = getToken()

    if (!token) {
      return
    }

    set({ isLoading: true })

    try {
      const response = await fetch(`${API_BASE_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch cart")
      }

      const data: BackendCartItem[] = await response.json()
      set({ cart: mapBackendCart(data) })
    } catch (error) {
      console.error("Fetch cart failed:", error)
    } finally {
      set({ isLoading: false })
    }
  },

  syncLocalCart: async () => {
    const token = getToken()

    if (!token) {
      return
    }

    const localOnlyItems = get().cart.filter((item) => !item.cartItemId)

    if (localOnlyItems.length === 0) {
      await get().fetchCart()
      return
    }

    for (const item of localOnlyItems) {
      await fetch(`${API_BASE_URL}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: item.id,
          quantity: item.quantity,
        }),
      })
    }

    await get().fetchCart()
  },

  clearCart: () => set({ cart: [] }),
}))
