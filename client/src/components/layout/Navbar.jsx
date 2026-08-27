import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCart, toggleMobileMenu, showToast } from '../../redux/slices/uiSlice';
import { logout } from '../../redux/slices/authSlice';
import { 
  ShoppingBag, 
  User as UserIcon, 
  Menu, 
  X, 
  Search, 
  Heart, 
  LogOut, 
  LayoutDashboard, 
  ChevronDown 
} from 'lucide-react';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const { totalQuantity } = useSelector((state) => state.cart);
  const { isMobileMenuOpen } = useSelector((state) => state.ui);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
      setIsSearchVisible(false);
      setSearchTerm('');
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(showToast({ type: 'info', message: 'Logged out successfully' }));
    setIsProfileOpen(false);
    navigate('/login');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop All', path: '/shop' },
    { name: 'Thobes & Kurtas', path: '/shop?category=Thobes' },
    { name: 'Abayas & Shawls', path: '/shop?category=Abayas' },
    { name: 'About Brand', path: '/about' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname + location.search === path) return true;
    return false;
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-brand-plum text-brand-cream text-xs py-2 px-4 text-center tracking-widest uppercase font-medium border-b border-brand-rose/20 flex items-center justify-center gap-2">
        <span className="font-arabic text-sm text-brand-rose">المفلحون</span>
        <span>•</span>
        <span>Wear • Believe • Succeed</span>
        <span className="hidden md:inline">•</span>
        <span className="hidden md:inline text-brand-rose">Complimentary Express Shipping on Orders Above PKR 10,000</span>
      </div>

      {/* Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-brand-cream-light/95 backdrop-blur-md border-b border-brand-rose/20 shadow-subtle transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => dispatch(toggleMobileMenu())}
                className="text-brand-plum hover:text-brand-plum-light p-2 rounded-lg focus:outline-none"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Brand Logo & Title */}
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/logo.jpg"
                alt="AL-MUFLIHON Brand Logo"
                className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-brand-plum p-0.5 object-cover shadow-sm group-hover:scale-105 transition-transform duration-300"
              />
              <div className="flex flex-col">
                <span className="font-serif text-xl md:text-2xl font-bold tracking-wider text-brand-plum group-hover:text-brand-plum-light transition-colors">
                  AL-MUFLIHON
                </span>
                <span className="text-[10px] tracking-[0.25em] text-brand-plum/70 uppercase -mt-1 font-semibold">
                  Luxury Modest Wear
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium transition-all duration-200 tracking-wide hover:text-brand-plum relative py-1 ${
                    isActive(link.path)
                      ? 'text-brand-plum font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-brand-plum'
                      : 'text-brand-dark/80 hover:text-brand-plum'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right Action Icons (Search, Account, Cart) */}
            <div className="flex items-center space-x-4 md:space-x-6">
              
              {/* Search Toggle */}
              <button
                onClick={() => setIsSearchVisible(!isSearchVisible)}
                className="text-brand-plum hover:text-brand-rose transition-colors p-2"
                aria-label="Search items"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* User Account Menu */}
              <div className="relative">
                {user ? (
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 text-brand-plum hover:text-brand-plum-light transition-colors p-1 rounded-full border border-brand-rose/40 hover:border-brand-plum"
                  >
                    <img
                      src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
                      alt={user.name}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <ChevronDown className="w-3.5 h-3.5 text-brand-plum hidden sm:block" />
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center gap-1.5 text-sm font-medium text-brand-plum hover:text-brand-rose transition-colors"
                  >
                    <UserIcon className="w-5 h-5" />
                    <span className="hidden sm:inline">Sign In</span>
                  </Link>
                )}

                {/* Profile Dropdown */}
                {user && isProfileOpen && (
                  <div 
                    className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-luxury border border-brand-rose/30 py-2 z-50 animate-fade-in"
                    onMouseLeave={() => setIsProfileOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-xs text-gray-500">Signed in as</p>
                      <p className="text-sm font-bold text-brand-plum truncate">{user.name}</p>
                      <p className="text-xs text-gray-400 truncate">{user.email}</p>
                    </div>

                    <Link
                      to="/dashboard"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-brand-cream/50 hover:text-brand-plum transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-brand-plum" />
                      User Dashboard
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>

              {/* Shopping Bag Button with Redux Badge */}
              <button
                onClick={() => dispatch(toggleCart(true))}
                className="relative bg-brand-plum text-brand-cream p-2.5 rounded-full hover:bg-brand-plum-dark transition-all duration-300 shadow-md hover:scale-105"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalQuantity > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-brand-rose text-brand-plum font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm animate-pulse-subtle">
                    {totalQuantity}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Inline Search Bar */}
        {isSearchVisible && (
          <div className="border-t border-brand-rose/20 bg-brand-cream/40 px-4 py-3 animate-fade-in">
            <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-brand-plum/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search Saudi thobes, pure linen kurtas, abayas, shawls..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white pl-10 pr-4 py-2 text-sm rounded-full border border-brand-rose/40 focus:outline-none focus:border-brand-plum focus:ring-1 focus:ring-brand-plum shadow-inner"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="bg-brand-plum text-brand-cream text-xs font-semibold px-5 py-2 rounded-full hover:bg-brand-plum-dark transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        )}

        {/* Mobile Dropdown Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-brand-rose/20 px-6 py-6 space-y-4 shadow-xl animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => dispatch(toggleMobileMenu(false))}
                className="block text-base font-medium text-brand-dark hover:text-brand-plum py-1 border-b border-gray-100"
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-2">
              {user ? (
                <div className="space-y-2">
                  <Link
                    to="/dashboard"
                    onClick={() => dispatch(toggleMobileMenu(false))}
                    className="block text-sm font-semibold text-brand-plum bg-brand-cream/60 p-3 rounded-lg"
                  >
                    Manage Account & Orders ({user.name})
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      dispatch(toggleMobileMenu(false));
                    }}
                    className="w-full text-left text-sm font-medium text-red-600 p-2"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 pt-2">
                  <Link
                    to="/login"
                    onClick={() => dispatch(toggleMobileMenu(false))}
                    className="w-full text-center bg-brand-plum text-brand-cream py-2.5 rounded-lg text-sm font-medium"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => dispatch(toggleMobileMenu(false))}
                    className="w-full text-center border border-brand-plum text-brand-plum py-2.5 rounded-lg text-sm font-medium"
                  >
                    Create Account
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
