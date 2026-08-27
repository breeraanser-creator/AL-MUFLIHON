import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearAuthStatus } from '../redux/slices/authSlice';
import { showToast } from '../redux/slices/uiSlice';
import SEO from '../components/common/SEO';
import { User, Mail, Lock, Phone, ArrowRight, CheckCircle } from 'lucide-react';

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading, error, successMessage } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    dispatch(clearAuthStatus());
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setValidationError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');

    if (formData.password !== formData.confirmPassword) {
      setValidationError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setValidationError('Password must be at least 6 characters');
      return;
    }

    const result = await dispatch(
      registerUser({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      })
    );

    if (registerUser.fulfilled.match(result)) {
      dispatch(
        showToast({
          type: 'success',
          message: 'Welcome to AL-MUFLIHON! Your account is active.'
        })
      );
      navigate('/dashboard');
    }
  };

  return (
    <>
      <SEO
        title="Create Account - Join AL-MUFLIHON"
        description="Create your AL-MUFLIHON member account for bespoke orders, tracking, and VIP launches."
      />

      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-brand-cream/30">
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
                Join AL-MUFLIHON
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Wear • Believe • Succeed. Create your private account.
              </p>
            </div>
          </div>

          {/* Form */}
          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            {(validationError || error) && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2.5 rounded-xl text-xs font-medium">
                {validationError || error}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Ahmad Tariq"
                  className="w-full bg-gray-50 pl-10 pr-4 py-3 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-brand-plum"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full bg-gray-50 pl-10 pr-4 py-3 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-brand-plum"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">
                Phone Number (Optional)
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+92 300 1234567"
                  className="w-full bg-gray-50 pl-10 pr-4 py-3 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-brand-plum"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full bg-gray-50 pl-9 pr-3 py-3 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-brand-plum"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full bg-gray-50 pl-9 pr-3 py-3 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-brand-plum"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-plum text-brand-cream hover:bg-brand-plum-dark py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-luxury flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 mt-2"
            >
              {loading ? (
                <span>Creating Account...</span>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer Navigation */}
          <div className="text-center pt-2 text-xs text-gray-600">
            <span>Already have an account? </span>
            <Link to="/login" className="font-bold text-brand-plum hover:text-brand-rose transition-colors">
              Sign In Here
            </Link>
          </div>

        </div>
      </div>
    </>
  );
};

export default Signup;
