import React from "react";
import { useCart } from "../context/CartContext";

const CartDrawer = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartSubtotal,
    totalItemsCount,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 transition-opacity duration-300 animate-fade-in"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer Panel */}
      <div
        className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white/95 backdrop-blur-md shadow-2xl z-50 flex flex-col justify-between transition-all duration-300 transform translate-x-0 font-['manrope'] border-l border-slate-100 animate-slide-in"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <svg
                className="w-6 h-6 text-slate-700"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1,0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0,1-1.12-1.243l1.264-12A1.125 1.125 0 0,1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1,1-.75 0 .375.375 0 0,1 .75 0Zm7.5 0a.375.375 0 1,1-.75 0 .375.375 0 0,1 .75 0Z"
                />
              </svg>
              Shopping Cart
            </h3>
            <p className="text-xs text-slate-500 font-semibold mt-0.5">
              {totalItemsCount} {totalItemsCount === 1 ? "item" : "items"} selected
            </p>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
            aria-label="Close cart"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-20">
              <div className="w-20 h-20 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mb-6 border border-dashed border-slate-200">
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 1,0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0,1-1.12-1.243l1.264-12A1.125 1.125 0 0,1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1,1-.75 0 .375.375 0 0,1 .75 0Zm7.5 0a.375.375 0 1,1-.75 0 .375.375 0 0,1 .75 0Z"
                  />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-1">Your cart is empty</h4>
              <p className="text-slate-500 text-sm max-w-[260px] mb-8">
                Looks like you haven't added any products to your cart yet.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="bg-slate-900 text-white font-bold text-sm px-6 py-3 rounded-2xl hover:bg-slate-800 transition-all shadow-md shadow-slate-900/10 cursor-pointer"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 bg-white border border-slate-100 p-4 rounded-2xl shadow-2xs hover:shadow-xs transition-all duration-300"
              >
                {/* Product Thumbnail */}
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-50 flex-shrink-0 border border-slate-100">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>

                {/* Info & Quantity controls */}
                <div className="flex-1 min-w-0 flex flex-col justify-between h-20">
                  <div>
                    <h5
                      className="text-sm font-bold text-slate-900 truncate hover:text-indigo-600 transition-colors"
                      title={item.name}
                    >
                      {item.name}
                    </h5>
                    <p className="text-sm font-black text-slate-800 mt-0.5">
                      ₹{item.price.toLocaleString()}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50/50 p-0.5">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-md flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-white transition-all cursor-pointer"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                        </svg>
                      </button>
                      <span className="text-xs font-bold text-slate-800 px-3 min-w-[32px] text-center select-none">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-md flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-white transition-all cursor-pointer"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      </button>
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-xs font-bold text-red-500 hover:text-red-700 flex items-center gap-1 transition-all cursor-pointer"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-slate-100 bg-slate-50/50 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-slate-500">Subtotal</span>
              <span className="text-xl font-black text-slate-900">
                ₹{cartSubtotal.toLocaleString()}
              </span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={clearCart}
                className="flex-1 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-bold py-3 px-4 rounded-xl hover:bg-slate-100 text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                Clear Cart
              </button>
              <button
                onClick={() => alert("Checkout flow is under development!")}
                className="flex-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl text-xs transition-all shadow-md shadow-slate-900/10 cursor-pointer text-center"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
