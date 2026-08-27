import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearAuthStatus } from '../redux/slices/authSlice';
import { showToast } from '../redux/slices/uiSlice';
import SEO from '../components/common/SEO';
import { Mail, Lock, ArrowRight, Shield } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const redirectPath = location.state?.from?.pathname || '/dashboard';

  useEffect(() => {
    dispatch(clearAuthStatus());
    if (user) {
      navigate(redirectPath);
    }
  }, [user, navigate, redirectPath, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(result)) {
      dispatch(
        showToast({
          type: 'success',
          message: `Welcome back to AL-MUFLIHON!`
        })
      );
      navigate(redirectPath);
    }
  };

  return (
    <>
      <SEO
        title="Sign In - AL-MUFLIHON Client Portal"
        description="Sign in to your AL-MUFLIHON account to view your tailored orders, tracked parcels, and private wishlist."
      />

      <div className="min-h-[75vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-brand-cream/30">
        <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-brand-rose/30 shadow-luxury animate-fade-in">
          
          {/* Header & Logo */}
          <div className="text-center space-y-3">
            <Link to="/" className="inline-block">
              <img
                src="/logo.jpg"
                alt="AL-MUFLIHON"
                className="w-16 h-16 rounded-full border-2 border-brand-plum p-0.5 mx-auto shadow-sm"
              />
            </Link>
            <div>
              <span className="font-arabic text-xl text-brand-plum font-bold">المفلحون</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark">
                Client Portal
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Enter your credentials to access your luxury wardrobe orders.
              </p>
            </div>
          </div>

          {/* Form */}
          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2.5 rounded-xl text-xs font-medium">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="client@almuflihon.com"
                  className="w-full bg-gray-50 pl-10 pr-4 py-3 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-brand-plum"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-[11px] font-semibold text-brand-plum hover:text-brand-rose transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-gray-50 pl-10 pr-4 py-3 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-brand-plum"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-plum text-brand-cream hover:bg-brand-plum-dark py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-luxury flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 mt-2"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials */}
          <div className="bg-brand-cream/60 p-3.5 rounded-2xl border border-brand-rose/30 text-xs text-brand-dark space-y-1">
            <p className="font-bold text-brand-plum flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" /> Demo Access Available
            </p>
            <p className="text-[11px] text-gray-600">
              You can log in with any sample email (e.g. <code>customer@almuflihon.com</code>) or create a new account!
            </p>
          </div>

          {/* Footer Navigation */}
          <div className="text-center pt-2 text-xs text-gray-600">
            <span>New to AL-MUFLIHON? </span>
            <Link to="/signup" className="font-bold text-brand-plum hover:text-brand-rose transition-colors">
              Create an Account
            </Link>
          </div>

        </div>
      </div>
    </>
  );
};

export default Login;
