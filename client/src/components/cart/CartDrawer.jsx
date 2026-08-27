import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCart, showToast } from '../../redux/slices/uiSlice';
import { removeFromCart, updateQuantity } from '../../redux/slices/cartSlice';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

const CartDrawer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isCartOpen } = useSelector((state) => state.ui);
  const { items, itemsPrice, shippingPrice, totalPrice } = useSelector((state) => state.cart);

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    dispatch(toggleCart(false));
    navigate('/checkout');
  };

  const freeShippingThreshold = 10000;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - itemsPrice);
  const progressPercent = Math.min(100, (itemsPrice / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => dispatch(toggleCart(false))}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="bg-brand-plum text-brand-cream px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-brand-rose" />
              <h2 className="font-serif text-lg font-bold tracking-wide">Your Shopping Bag</h2>
              <span className="bg-brand-rose text-brand-plum text-xs font-bold px-2 py-0.5 rounded-full">
                {items.length}
              </span>
            </div>
            <button
              onClick={() => dispatch(toggleCart(false))}
              className="text-brand-cream/80 hover:text-white transition-colors p-1"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="bg-brand-cream/60 px-6 py-3 border-b border-brand-rose/20 text-xs">
            {remainingForFreeShipping > 0 ? (
              <p className="text-brand-dark mb-1.5 font-medium">
                Add <span className="font-bold text-brand-plum">PKR {remainingForFreeShipping.toLocaleString()}</span> more for complimentary shipping!
              </p>
            ) : (
              <p className="text-brand-sage-dark font-bold mb-1.5 flex items-center gap-1">
                🎉 You've unlocked Complimentary Express Shipping!
              </p>
            )}
            <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-brand-sage h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-gray-100">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-brand-cream rounded-full flex items-center justify-center mx-auto text-brand-plum">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-brand-plum">Your bag is empty</h3>
                <p className="text-sm text-gray-500 max-w-xs mx-auto">
                  Explore our luxury thobes, handcrafted shawls, and premium modest wear collection.
                </p>
                <button
                  onClick={() => {
                    dispatch(toggleCart(false));
                    navigate('/shop');
                  }}
                  className="bg-brand-plum text-brand-cream text-xs font-semibold uppercase tracking-wider px-6 py-3 rounded-lg hover:bg-brand-plum-dark transition-colors shadow-md"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={`${item._id}-${item.selectedSize}-${item.selectedColor}`} className="py-4 flex gap-4">
                  <img
                    src={item.images?.[0] || item.image}
                    alt={item.name}
                    className="w-20 h-24 object-cover rounded-lg border border-gray-100 flex-shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-semibold text-brand-dark line-clamp-1">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => {
                            dispatch(removeFromCart({
                              _id: item._id,
                              selectedSize: item.selectedSize,
                              selectedColor: item.selectedColor
                            }));
                            dispatch(showToast({ type: 'info', message: 'Item removed from bag' }));
                          }}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                        <span>Size: <strong className="text-brand-plum">{item.selectedSize}</strong></span>
                        <span>•</span>
                        <span>Color: <strong className="text-brand-plum">{item.selectedColor}</strong></span>
                      </div>

                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="text-sm font-bold text-brand-plum">
                          PKR {(item.discountPrice || item.price).toLocaleString()}
                        </span>
                        {item.discountPrice > 0 && (
                          <span className="text-xs text-gray-400 line-through">
                            PKR {item.price.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
                        <button
                          onClick={() => {
                            if (item.qty > 1) {
                              dispatch(updateQuantity({
                                _id: item._id,
                                selectedSize: item.selectedSize,
                                selectedColor: item.selectedColor,
                                qty: item.qty - 1
                              }));
                            } else {
                              dispatch(removeFromCart({
                                _id: item._id,
                                selectedSize: item.selectedSize,
                                selectedColor: item.selectedColor
                              }));
                            }
                          }}
                          className="p-1 hover:bg-gray-200 text-gray-600 rounded-l-lg transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-bold text-brand-dark">
                          {item.qty}
                        </span>
                        <button
                          onClick={() =>
                            dispatch(updateQuantity({
                              _id: item._id,
                              selectedSize: item.selectedSize,
                              selectedColor: item.selectedColor,
                              qty: item.qty + 1
                            }))
                          }
                          className="p-1 hover:bg-gray-200 text-gray-600 rounded-r-lg transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotals & Checkout CTA */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 bg-brand-cream/30 p-6 space-y-4">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-brand-dark">PKR {itemsPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-brand-dark">
                    {shippingPrice === 0 ? (
                      <span className="text-brand-sage-dark font-bold uppercase text-xs">Free</span>
                    ) : (
                      `PKR ${shippingPrice}`
                    )}
                  </span>
                </div>
                <div className="border-t border-brand-rose/20 pt-2 flex justify-between text-base font-bold text-brand-plum">
                  <span>Total</span>
                  <span>PKR {totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-brand-plum text-brand-cream py-3.5 rounded-xl font-semibold text-sm uppercase tracking-wider hover:bg-brand-plum-dark transition-all duration-300 shadow-luxury flex items-center justify-center gap-2 group"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
