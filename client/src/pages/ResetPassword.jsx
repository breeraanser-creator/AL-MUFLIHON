import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../redux/slices/authSlice';
import { showToast } from '../redux/slices/uiSlice';
import SEO from '../components/common/SEO';
import { Lock, ArrowRight, ShieldCheck } from 'lucide-react';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');

    if (password !== confirmPassword) {
      setValidationError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setValidationError('Password must be at least 6 characters long');
      return;
    }

    const result = await dispatch(resetPassword({ token, password }));

    if (resetPassword.fulfilled.match(result)) {
      dispatch(
        showToast({
          type: 'success',
          message: 'Password updated successfully! Welcome back to AL-MUFLIHON.'
        })
      );
      navigate('/dashboard');
    }
  };

  return (
    <>
      <SEO
        title="Set New Password - AL-MUFLIHON"
        description="Set a new secure password for your AL-MUFLIHON account."
      />

      <div className="min-h-[75vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-brand-cream/30">
        <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-brand-rose/30 shadow-luxury animate-fade-in">
          
          <div className="text-center space-y-3">
            <div className="w-14 h-14 bg-brand-plum text-brand-sage rounded-2xl flex items-center justify-center mx-auto shadow-md">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark">
                Set New Password
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Enter your new secure password below to regain access.
              </p>
            </div>
          </div>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            {(validationError || error) && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2.5 rounded-xl text-xs font-medium">
                {validationError || error}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">
                New Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full bg-gray-50 pl-10 pr-4 py-3 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-brand-plum"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
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
                <span>Updating Password...</span>
              ) : (
                <>
                  <span>Save Password & Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="text-center pt-2 text-xs text-gray-600">
            <Link to="/login" className="font-semibold text-brand-plum hover:text-brand-rose transition-colors">
              Return to Sign In
            </Link>
          </div>

        </div>
      </div>
    </>
  );
};

export default ResetPassword;
