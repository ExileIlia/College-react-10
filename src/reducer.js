import cartItem from "./CartItem";

// Define action types as constants
const CLEAR_CART = "CLEAR_CART";
const REMOVE = "REMOVE";
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";
const GET_TOTALS = "GET_TOTALS";
const LOADING = "LOADING";
const DISPLAYING_ITEMS = "DISPLAYING_ITEMS";

// Helper function to update cart items
const updateCart = (cart, action) => {
  return cart.map((item) => {
    if (item.id === action.payload) {
      return { ...item, amount: action.type === INCREASE ? item.amount + 1 : item.amount - 1 };
    }
    return item;
  });
};

const reducer = (state, action) => {
  switch (action.type) {
    case CLEAR_CART:
      return { ...state, cart: [] };

    case REMOVE:
      return { ...state, cart: state.cart.filter((item) => item.id !== action.payload) };

    case INCREASE:
    case DECREASE:
      return { ...state, cart: updateCart(state.cart, action) };

    case GET_TOTALS:
      const { total, amount } = state.cart.reduce(
        (cartTotal, cartItem) => {
          cartTotal.total += cartItem.amount * cartItem.price;
          cartTotal.amount += cartItem.amount;
          return cartTotal;
        },
        { total: 0, amount: 0 }
      );
      return { ...state, total, amount };

    case LOADING:
      return { ...state, loading: true };

    case DISPLAYING_ITEMS:
      return { ...state, cart: action.payload, loading: false };

    default:
      return state;
  }
};

export default reducer;