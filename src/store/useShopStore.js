import { create } from 'zustand';
import axios from 'axios';

export const useShopStore = create((set, get) => ({
  categories: [],
  product: null,
  categoryProducts: [],
  cart: [],
  wishlist: [],
  loadingCategories: false,
  categoriesError: null,
  user: null,
  newArrivals: [],
  loadingNewArrivals: false,
  newArrivalsError: null,
  loading: false,
  error: null,

  // -------- User --------
  fetchUser: async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/auth/auth-check", { withCredentials: true });
      set({ user: res.data?.success ? res.data.user : null });
    } catch (err) {
      set({ user: null });
    }
  },

  // -------- Categories --------
  fetchCategories: async () => {
    set({ loadingCategories: true, categoriesError: null });
    try {
      const { data } = await axios.get('http://localhost:3000/api/categories/');
      const processedCategories = (data.categories || data).map((cat) => ({
        ...cat,
        img: cat.cat_image_url?.startsWith("http")
          ? cat.cat_image_url
          : `http://localhost:3000/${cat.cat_image_url.replace(/\\/g, "/")}`,
        path: `/category/${cat.id}`,
      }));
      set({ categories: processedCategories, loadingCategories: false });
    } catch (error) {
      set({
        categoriesError: error.response?.data?.message || 'Failed to fetch categories',
        loadingCategories: false,
      });
    }
  },

  // -------- Products --------
  fetchCategoryProducts: async (category_id) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`http://localhost:3000/api/product/Categories-Product/${category_id}`);
      const products = Array.isArray(res.data) ? res.data : [res.data];
      set({ categoryProducts: products, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  fetchProductById: async (id) => {
    set({ loading: true, error: null, product: null });
    try {
      const { data } = await axios.get(`http://localhost:3000/api/product/${id}`);
      set({ product: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false, product: null });
    }
  },

  fetchNewArrivals: async () => {
    set({ loadingNewArrivals: true, newArrivalsError: null });
    try {
      const { data } = await axios.get('http://localhost:3000/api/product/new-arrivals');
      const processedProducts = (data.products || data).map((p) => ({
        ...p,
        img: p.product_image_url?.startsWith('http')
          ? p.product_image_url
          : `/assets/${p.product_image_url}`,
      }));
      set({ newArrivals: processedProducts, loadingNewArrivals: false });
    } catch (error) {
      set({
        newArrivalsError: error.response?.data?.message || 'Failed to fetch new arrivals',
        loadingNewArrivals: false,
      });
    }
  },

  // -------- Cart --------
  fetchCart: async () => {
    const { user } = get();
    if (!user?.id) return;
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`http://localhost:3000/api/cartItem?user_id=${user.id}`);
      const cartItems = Array.isArray(response.data.data) ? response.data.data : [];
      set({ cart: cartItems, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  addToCart: async (user_id, product_id, quantity = 1) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post("http://localhost:3000/api/cartItem/add", { user_id, product_id, quantity });
      if (res.data.status) {
        // merge item if already exists
        set((state) => {
          const exists = state.cart.find(item => item.product_id === product_id);
          if (exists) {
            return {
              cart: state.cart.map(item =>
                item.product_id === product_id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
              loading: false,
            };
          } else {
            return {
              cart: [...state.cart, { user_id, product_id, quantity, ...res.data.item }],
              loading: false,
            };
          }
        });
      } else {
        set({ loading: false, error: res.data.message || "Add to cart failed" });
      }
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  removeFromCart: async (product_id) => {
    set({ loading: true });
    try {
      const { user } = get();
      if (!user) throw new Error("User not logged in");

      const { data } = await axios.delete("http://localhost:3000/api/cartItem/remove", {
        data: { user_id: user.id, product_id },
        withCredentials: true,
      });

      if (data.status) {
        set((state) => ({
          cart: state.cart.filter((item) => item.product_id !== product_id),
          loading: false,
        }));
      } else {
        set({ loading: false });
      }
    } catch (err) {
      set({ loading: false, error: err.message });
    }
  },

  updateCartItemQuantity: async (product_id, newQuantity) => {
    const { user } = get();
    if (!user?.id) return;
    if (newQuantity < 1) return;
    try {
      await axios.put("http://localhost:3000/api/cartItem/update", {
        user_id: user.id,
        product_id,
        quantity: newQuantity,
      });
      set((state) => ({
        cart: state.cart.map((item) =>
          item.product_id === product_id ? { ...item, quantity: newQuantity } : item
        ),
      }));
    } catch (err) {
      console.error("Failed to update quantity:", err.message);
    }
  },

  // -------- Wishlist --------
  fetchWishlist: async () => {
    const { user } = get();
    if (!user?.id) return;
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get(`http://localhost:3000/api/wishlistItems?user_id=${user.id}`, { withCredentials: true });
      set({ wishlist: data.status ? data.data : [], loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
    }
  },

  addToWishlist: async (product_id) => {
    const { user } = get();
    if (!user?.id) return;
    set({ loading: true, error: null });
    try {
      const res = await axios.post("http://localhost:3000/api/wishlistItems/add", { user_id: user.id, product_id }, { withCredentials: true });
      if (res.data.status) {
        await get().fetchWishlist();
        set({ loading: false });
      } else {
        set({ loading: false, error: res.data.message || "Add to wishlist failed" });
      }
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
    }
  },

  removeFromWishlist: async (product_id) => {
    const { user } = get();
    if (!user?.id) return;
    try {
      await axios.delete("http://localhost:3000/api/wishlistItems/remove", {
        data: { user_id: user.id, product_id },
        withCredentials: true,
      });
      set((state) => ({
        wishlist: state.wishlist.filter((item) => item.product_id !== product_id),
      }));
    } catch (err) {
      set({ error: err.response?.data?.message || err.message });
    }
  },
}));
