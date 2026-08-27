import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../redux/slices/cartSlice';
import { showToast } from '../redux/slices/uiSlice';
import { orderAPI } from '../services/api';
import SEO from '../components/common/SEO';
import { 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  Banknote, 
  Wallet, 
  CheckCircle2, 
  Lock, 
  ArrowRight, 
  ChevronLeft 
} from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { items, itemsPrice, shippingPrice, totalPrice } = useSelector((state) => state.cart);

  const defaultAddr = user?.addresses?.[0] || {};

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '+92 300 1234567',
    email: user?.email || '',
    street: defaultAddr.street || 'House 42, Street 7, F-7/2',
    city: defaultAddr.city || 'Islamabad',
    state: defaultAddr.state || 'Federal',
    postalCode: defaultAddr.postalCode || '44000',
    country: 'Pakistan',
  });

  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(null);

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="font-serif text-3xl font-bold text-brand-plum">Your Shopping Bag is Empty</h2>
        <p className="text-sm text-gray-500">Please add items to your cart before proceeding to checkout.</p>
        <Link
          to="/shop"
          className="inline-block bg-brand-plum text-brand-cream font-bold text-xs uppercase px-8 py-3.5 rounded-xl hover:bg-brand-plum-dark transition-colors shadow-md"
        >
          Explore Catalog
        </Link>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderPayload = {
      orderItems: items.map((item) => ({
        name: item.name,
        qty: item.qty,
        image: item.images?.[0] || item.image,
        price: item.discountPrice || item.price,
        size: item.selectedSize,
        color: item.selectedColor,
        product: item._id
      })),
      shippingAddress: formData,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice
    };

    try {
      const res = await orderAPI.create(orderPayload);
      dispatch(clearCart());
      setOrderComplete(res.order);
      dispatch(
        showToast({
          type: 'success',
          message: 'JazakAllah Khair! Your order has been placed successfully.'
        })
      );
    } catch (err) {
      dispatch(showToast({ type: 'error', message: err.message || 'Order placement failed' }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Secure Checkout - AL-MUFLIHON"
        description="Complete your order for AL-MUFLIHON bespoke modest attire with secure payment and express courier dispatch."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {orderComplete ? (
          /* Order Confirmation Screen */
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-brand-rose/40 shadow-luxury text-center space-y-6 animate-slide-up">
            <div className="w-20 h-20 bg-brand-cream rounded-full flex items-center justify-center mx-auto text-brand-plum border-2 border-brand-rose">
              <CheckCircle2 className="w-10 h-10 text-brand-sage" />
            </div>

            <div className="space-y-2">
              <span className="font-arabic text-xl text-brand-rose font-bold">المفلحون</span>
              <h2 className="font-serif text-3xl font-bold text-brand-dark">Order Confirmed!</h2>
              <p className="text-sm text-gray-600">
                Thank you for choosing AL-MUFLIHON. Your bespoke pieces are being prepared by our master tailors.
              </p>
            </div>

            <div className="bg-brand-cream/50 p-6 rounded-2xl border border-brand-rose/20 text-left space-y-3 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500 font-sans">Tracking Reference:</span>
                <span className="font-bold text-brand-plum">{orderComplete.trackingNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-sans">Delivery Address:</span>
                <span className="font-sans text-gray-800 text-right">{orderComplete.shippingAddress?.street}, {orderComplete.shippingAddress?.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-sans">Payment Method:</span>
                <span className="font-sans font-bold text-brand-plum">{orderComplete.paymentMethod}</span>
              </div>
              <div className="flex justify-between border-t border-brand-rose/20 pt-2 text-sm font-sans font-bold text-brand-plum">
                <span>Total Amount:</span>
                <span>PKR {orderComplete.totalPrice?.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-brand-plum text-brand-cream px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-brand-plum-dark transition-colors shadow-md"
              >
                Track in Dashboard
              </button>
              <Link
                to="/shop"
                className="border border-brand-plum text-brand-plum px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-brand-cream/60 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          /* Main Checkout Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left 7 Cols: Address & Payment Form */}
            <div className="lg:col-span-7 space-y-8">
              
              <div className="flex items-center gap-2 text-brand-plum">
                <Link to="/shop" className="text-xs text-gray-500 hover:text-brand-plum flex items-center gap-1 font-medium">
                  <ChevronLeft className="w-4 h-4" /> Back to Catalog
                </Link>
              </div>

              <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-8">
                
                {/* Step 1: Shipping Destination */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-rose/20 shadow-subtle space-y-5">
                  <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                    <div className="w-8 h-8 rounded-full bg-brand-plum text-brand-cream text-xs font-bold flex items-center justify-center">
                      1
                    </div>
                    <h3 className="font-serif text-lg font-bold text-brand-plum">
                      Delivery Destination
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">
                        Recipient Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full bg-gray-50 p-3 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-brand-plum"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">
                        Contact Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-gray-50 p-3 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-brand-plum"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">
                      Street Address & House / Flat #
                    </label>
                    <input
                      type="text"
                      name="street"
                      required
                      value={formData.street}
                      onChange={handleChange}
                      placeholder="e.g. Villa 14, Phase 6, DHA"
                      className="w-full bg-gray-50 p-3 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-brand-plum"
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full bg-gray-50 p-3 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-brand-plum"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        required
                        value={formData.postalCode}
                        onChange={handleChange}
                        className="w-full bg-gray-50 p-3 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-brand-plum"
                      />
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">
                        Country
                      </label>
                      <input
                        type="text"
                        name="country"
                        disabled
                        value="Pakistan"
                        className="w-full bg-gray-100 p-3 text-xs rounded-xl border border-gray-200 text-gray-500 font-semibold"
                      />
                    </div>
                  </div>
                </div>

                {/* Step 2: Payment Method */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-rose/20 shadow-subtle space-y-5">
                  <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                    <div className="w-8 h-8 rounded-full bg-brand-plum text-brand-cream text-xs font-bold flex items-center justify-center">
                      2
                    </div>
                    <h3 className="font-serif text-lg font-bold text-brand-plum">
                      Payment Method
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {[
                      {
                        id: 'Cash on Delivery',
                        label: 'Cash on Delivery (COD)',
                        desc: 'Pay safely with cash when your luxury parcel arrives at your doorstep.',
                        icon: Banknote
                      },
                      {
                        id: 'Card',
                        label: 'Credit / Debit Card (Visa / Mastercard)',
                        desc: 'Encrypted online transaction with instant confirmation.',
                        icon: CreditCard
                      },
                      {
                        id: 'EasyPaisa',
                        label: 'EasyPaisa / JazzCash',
                        desc: 'Direct wallet payment transfer.',
                        icon: Wallet
                      }
                    ].map((pm) => {
                      const Icon = pm.icon;
                      return (
                        <label
                          key={pm.id}
                          className={`flex items-start gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                            paymentMethod === pm.id
                              ? 'border-brand-plum bg-brand-cream/30 shadow-sm'
                              : 'border-gray-200 hover:border-gray-300 bg-white'
                          }`}
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            checked={paymentMethod === pm.id}
                            onChange={() => setPaymentMethod(pm.id)}
                            className="mt-1 accent-brand-plum"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <Icon className="w-4 h-4 text-brand-plum" />
                              <span className="font-bold text-xs text-brand-dark uppercase tracking-wider">
                                {pm.label}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{pm.desc}</p>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>

              </form>
            </div>

            {/* Right 5 Cols: Order Summary */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-rose/30 shadow-luxury space-y-6 sticky top-28">
                <h3 className="font-serif text-xl font-bold text-brand-plum border-b border-gray-100 pb-3">
                  Order Summary ({items.length} Designs)
                </h3>

                {/* Items preview */}
                <div className="space-y-4 max-h-64 overflow-y-auto pr-2 divide-y divide-gray-100">
                  {items.map((item, idx) => (
                    <div key={idx} className="flex gap-3 pt-3 first:pt-0">
                      <img
                        src={item.images?.[0] || item.image}
                        alt={item.name}
                        className="w-14 h-18 object-cover rounded-lg border border-gray-200 flex-shrink-0"
                      />
                      <div className="flex-1 text-xs">
                        <h4 className="font-bold text-brand-dark line-clamp-1">{item.name}</h4>
                        <p className="text-gray-500 mt-0.5">
                          Size: {item.selectedSize} • Qty: {item.qty}
                        </p>
                        <p className="font-bold text-brand-plum mt-1">
                          PKR {((item.discountPrice || item.price) * item.qty).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pricing Breakout */}
                <div className="border-t border-gray-200 pt-4 space-y-2 text-xs">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-bold text-brand-dark">PKR {itemsPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Express Shipping</span>
                    <span className="font-bold">
                      {shippingPrice === 0 ? (
                        <span className="text-brand-sage-dark uppercase font-bold">Free</span>
                      ) : (
                        `PKR ${shippingPrice}`
                      )}
                    </span>
                  </div>
                  <div className="border-t border-brand-rose/20 pt-3 flex justify-between text-base font-bold text-brand-plum font-serif">
                    <span>Total Amount</span>
                    <span>PKR {totalPrice.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  form="checkout-form"
                  disabled={isSubmitting}
                  className="w-full bg-brand-plum text-brand-cream hover:bg-brand-plum-dark py-4 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-luxury flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span>Confirming Order...</span>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Confirm & Place Order</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400 text-center pt-2">
                  <ShieldCheck className="w-4 h-4 text-brand-sage" />
                  <span>256-Bit SSL Encrypted & Guaranteed Modesty</span>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </>
  );
};

export default Checkout;
