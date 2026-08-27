import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, updateUserLocal } from '../redux/slices/authSlice';
import { showToast } from '../redux/slices/uiSlice';
import { orderAPI, userAPI, authAPI } from '../services/api';
import SEO from '../components/common/SEO';
import { 
  User, 
  Package, 
  MapPin, 
  Lock, 
  Heart, 
  LogOut, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Shield, 
  Edit3, 
  Plus, 
  ShoppingBag 
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Profile Form state
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
  });

  // Password Form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  // Address Form state
  const [addressData, setAddressData] = useState({
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'Pakistan'
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadOrders();
  }, [user, navigate]);

  const loadOrders = async () => {
    setLoadingOrders(true);
    try {
      const res = await orderAPI.getMyOrders();
      if (res.orders) {
        setOrders(res.orders);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await userAPI.updateProfile(profileData);
      dispatch(updateUserLocal(res.user));
      dispatch(showToast({ type: 'success', message: 'Profile updated successfully!' }));
    } catch (err) {
      dispatch(showToast({ type: 'error', message: err.message || 'Update failed' }));
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      dispatch(showToast({ type: 'error', message: 'New passwords do not match' }));
      return;
    }
    try {
      await authAPI.changePassword(passwordData.currentPassword, passwordData.newPassword);
      dispatch(showToast({ type: 'success', message: 'Password updated successfully!' }));
      setPasswordData({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    } catch (err) {
      dispatch(showToast({ type: 'error', message: err.message || 'Password update failed' }));
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    const updatedAddresses = [...(user?.addresses || []), { ...addressData, isDefault: (user?.addresses?.length || 0) === 0 }];
    try {
      const res = await userAPI.updateProfile({ addresses: updatedAddresses });
      dispatch(updateUserLocal(res.user));
      dispatch(showToast({ type: 'success', message: 'New delivery address saved!' }));
      setAddressData({ street: '', city: '', state: '', postalCode: '', country: 'Pakistan' });
    } catch (err) {
      dispatch(showToast({ type: 'error', message: 'Could not save address' }));
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(showToast({ type: 'info', message: 'Signed out successfully' }));
    navigate('/login');
  };

  if (!user) return null;

  return (
    <>
      <SEO
        title={`${user.name}'s Dashboard - AL-MUFLIHON`}
        description="Manage your AL-MUFLIHON bespoke clothing orders, active deliveries, delivery addresses, and account security."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* User Hero Banner */}
        <div className="bg-brand-plum text-brand-cream rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-luxury">
          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
            <img
              src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
              alt={user.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-brand-rose object-cover shadow-lg"
            />
            <div className="text-center sm:text-left space-y-1">
              <span className="font-arabic text-brand-rose text-lg">المفلحون VIP Patron</span>
              <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight">
                {user.name}
              </h1>
              <p className="text-xs sm:text-sm text-brand-cream/70 font-mono">
                {user.email} • Member ID: AMF-{user._id?.substring(0, 6) || '789102'}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="sm:ml-auto bg-brand-rose/20 hover:bg-brand-rose text-brand-rose hover:text-brand-plum px-5 py-2.5 rounded-xl border border-brand-rose/40 text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Dashboard Navigation & Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Left Navigation Sidebar */}
          <div className="bg-white rounded-3xl p-4 border border-brand-rose/20 shadow-subtle space-y-2">
            {[
              { id: 'orders', label: 'My Orders & Tracking', icon: Package },
              { id: 'profile', label: 'Personal Information', icon: User },
              { id: 'addresses', label: 'Delivery Addresses', icon: MapPin },
              { id: 'security', label: 'Password & Security', icon: Lock },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-200 text-left ${
                    activeTab === tab.id
                      ? 'bg-brand-plum text-brand-cream shadow-md'
                      : 'text-gray-600 hover:bg-brand-cream/60 hover:text-brand-plum'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Main Content Area */}
          <div className="lg:col-span-3 bg-white rounded-3xl p-6 sm:p-8 border border-brand-rose/20 shadow-subtle">
            
            {/* ================= TAB: MY ORDERS ================= */}
            {activeTab === 'orders' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-brand-plum">Order History</h2>
                    <p className="text-xs text-gray-500">Track and view your tailored garment shipments.</p>
                  </div>
                  <button
                    onClick={loadOrders}
                    className="text-xs font-semibold text-brand-plum hover:text-brand-rose"
                  >
                    Refresh Orders
                  </button>
                </div>

                {orders.length === 0 ? (
                  <div className="text-center py-16 space-y-3">
                    <Package className="w-12 h-12 text-gray-300 mx-auto" />
                    <h4 className="font-serif text-lg font-bold text-gray-700">No Orders Placed Yet</h4>
                    <p className="text-xs text-gray-500 max-w-sm mx-auto">
                      Explore our catalog to place your first bespoke order with complimentary express dispatch.
                    </p>
                    <button
                      onClick={() => navigate('/shop')}
                      className="bg-brand-plum text-brand-cream text-xs font-bold uppercase px-6 py-2.5 rounded-xl hover:bg-brand-plum-dark transition-colors mt-2"
                    >
                      Shop Collections
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div
                        key={order._id}
                        className="rounded-2xl border border-gray-200 overflow-hidden bg-white hover:border-brand-plum/40 transition-colors shadow-sm"
                      >
                        {/* Order Header */}
                        <div className="bg-brand-cream/50 px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 text-xs">
                          <div>
                            <span className="text-gray-500">Tracking Number:</span>
                            <span className="font-mono font-bold text-brand-plum ml-1.5">
                              {order.trackingNumber || 'AMF-928174'}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">Placed on:</span>
                            <span className="font-semibold text-gray-700">
                              {new Date(order.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase ${
                                order.orderStatus === 'Delivered'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-brand-plum text-brand-cream'
                              }`}
                            >
                              {order.orderStatus || 'Confirmed'}
                            </span>
                          </div>
                        </div>

                        {/* Order Items */}
                        <div className="p-6 space-y-4">
                          {order.orderItems?.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-4">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-14 h-16 object-cover rounded-lg border border-gray-200"
                              />
                              <div className="flex-1">
                                <h4 className="font-serif font-bold text-sm text-brand-dark">{item.name}</h4>
                                <p className="text-xs text-gray-500">
                                  Size: <strong className="text-brand-plum">{item.size}</strong> • Color: <strong className="text-brand-plum">{item.color}</strong> • Qty: {item.qty}
                                </p>
                              </div>
                              <span className="text-sm font-bold text-brand-plum">
                                PKR {(item.price * item.qty).toLocaleString()}
                              </span>
                            </div>
                          ))}

                          {/* Order Footer & Shipping info */}
                          <div className="border-t border-gray-100 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
                            <div>
                              <p className="text-gray-500">
                                Delivery To: <strong className="text-gray-800">{order.shippingAddress?.fullName}</strong> ({order.shippingAddress?.city}, {order.shippingAddress?.street})
                              </p>
                              <p className="text-gray-500">Payment: <strong className="text-brand-plum">{order.paymentMethod}</strong></p>
                            </div>
                            <div className="text-right sm:ml-auto">
                              <span className="text-gray-500">Total Paid: </span>
                              <span className="font-serif text-lg font-bold text-brand-plum">
                                PKR {order.totalPrice?.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ================= TAB: PROFILE INFORMATION ================= */}
            {activeTab === 'profile' && (
              <div className="space-y-6 animate-fade-in max-w-xl">
                <div className="border-b border-gray-100 pb-4">
                  <h2 className="font-serif text-2xl font-bold text-brand-plum">Personal Information</h2>
                  <p className="text-xs text-gray-500">Update your name, contact phone, and avatar.</p>
                </div>

                <form onSubmit={handleProfileSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      className="w-full bg-gray-50 p-3 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-brand-plum"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">
                      Email Address (Permanent)
                    </label>
                    <input
                      type="email"
                      disabled
                      value={user.email}
                      className="w-full bg-gray-100 p-3 text-xs rounded-xl border border-gray-200 text-gray-500 cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">
                      Contact Phone
                    </label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      placeholder="+92 300 1234567"
                      className="w-full bg-gray-50 p-3 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-brand-plum"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-brand-plum text-brand-cream px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-brand-plum-dark transition-colors shadow-md"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            )}

            {/* ================= TAB: SAVED ADDRESSES ================= */}
            {activeTab === 'addresses' && (
              <div className="space-y-6 animate-fade-in">
                <div className="border-b border-gray-100 pb-4">
                  <h2 className="font-serif text-2xl font-bold text-brand-plum">Delivery Addresses</h2>
                  <p className="text-xs text-gray-500">Manage your shipping destinations for faster checkout.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {user.addresses && user.addresses.length > 0 ? (
                    user.addresses.map((addr, i) => (
                      <div key={i} className="p-5 rounded-2xl border border-brand-rose/40 bg-brand-cream/30 space-y-2 relative">
                        {addr.isDefault && (
                          <span className="bg-brand-plum text-brand-cream text-[10px] uppercase font-bold px-2 py-0.5 rounded-full absolute top-3 right-3">
                            Default
                          </span>
                        )}
                        <p className="font-bold text-sm text-brand-dark">{addr.street}</p>
                        <p className="text-xs text-gray-600">{addr.city}, {addr.state} - {addr.postalCode}</p>
                        <p className="text-xs text-gray-500">{addr.country}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-500 italic">No saved addresses yet.</p>
                  )}
                </div>

                {/* Add Address Form */}
                <div className="border-t border-gray-100 pt-6">
                  <h3 className="font-serif text-lg font-bold text-brand-plum mb-4">Add New Delivery Address</h3>
                  <form onSubmit={handleAddAddress} className="space-y-4 max-w-xl">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1 uppercase">Street Address / House #</label>
                      <input
                        type="text"
                        required
                        value={addressData.street}
                        onChange={(e) => setAddressData({ ...addressData, street: e.target.value })}
                        placeholder="House 42, Street 7, F-7/2"
                        className="w-full bg-gray-50 p-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-brand-plum"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1 uppercase">City</label>
                        <input
                          type="text"
                          required
                          value={addressData.city}
                          onChange={(e) => setAddressData({ ...addressData, city: e.target.value })}
                          placeholder="Islamabad / Lahore"
                          className="w-full bg-gray-50 p-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-brand-plum"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1 uppercase">Postal Code</label>
                        <input
                          type="text"
                          required
                          value={addressData.postalCode}
                          onChange={(e) => setAddressData({ ...addressData, postalCode: e.target.value })}
                          placeholder="44000"
                          className="w-full bg-gray-50 p-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-brand-plum"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="bg-brand-plum text-brand-cream px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-brand-plum-dark transition-colors"
                    >
                      Save Address
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* ================= TAB: PASSWORD & SECURITY ================= */}
            {activeTab === 'security' && (
              <div className="space-y-6 animate-fade-in max-w-xl">
                <div className="border-b border-gray-100 pb-4">
                  <h2 className="font-serif text-2xl font-bold text-brand-plum">Change Password</h2>
                  <p className="text-xs text-gray-500">Ensure your account uses a secure password.</p>
                </div>

                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">
                      Current Password
                    </label>
                    <input
                      type="password"
                      required
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      placeholder="••••••••"
                      className="w-full bg-gray-50 p-3 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-brand-plum"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">
                      New Password
                    </label>
                    <input
                      type="password"
                      required
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      placeholder="At least 6 characters"
                      className="w-full bg-gray-50 p-3 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-brand-plum"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      required
                      value={passwordData.confirmNewPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmNewPassword: e.target.value })}
                      placeholder="••••••••"
                      className="w-full bg-gray-50 p-3 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-brand-plum"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-brand-plum text-brand-cream px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-brand-plum-dark transition-colors shadow-md"
                  >
                    Update Password
                  </button>
                </form>
              </div>
            )}

          </div>

        </div>

      </div>
    </>
  );
};

export default Dashboard;
