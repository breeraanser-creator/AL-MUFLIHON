import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../redux/slices/authSlice';
import SEO from '../components/common/SEO';
import { Mail, ArrowLeft, Send, CheckCircle2, KeyRound } from 'lucide-react';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetData, setResetData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setResetData(null);

    const result = await dispatch(forgotPassword(email));
    setLoading(false);

    if (forgotPassword.fulfilled.match(result)) {
      setResetData(result.payload);
    } else {
      setErrorMessage(result.payload || 'Failed to initiate password reset');
    }
  };

  return (
    <>
      <SEO
        title="Reset Your Password - AL-MUFLIHON"
        description="Request a secure password reset link for your AL-MUFLIHON client account."
      />

      <div className="min-h-[75vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-brand-cream/30">
        <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-brand-rose/30 shadow-luxury animate-fade-in">
          
          <div className="text-center space-y-3">
            <div className="w-14 h-14 bg-brand-plum text-brand-rose rounded-2xl flex items-center justify-center mx-auto shadow-md">
              <KeyRound className="w-7 h-7" />
            </div>
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark">
                Password Recovery
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Enter your registered email address to receive password reset instructions.
              </p>
            </div>
          </div>

          {resetData ? (
            <div className="bg-brand-cream/60 p-6 rounded-2xl border border-brand-rose/40 space-y-4 text-center animate-slide-up">
              <CheckCircle2 className="w-10 h-10 text-brand-sage mx-auto" />
              <div>
                <h4 className="font-serif font-bold text-brand-plum text-base">
                  Reset Token Issued!
                </h4>
                <p className="text-xs text-gray-600 mt-1">
                  {resetData.message}
                </p>
              </div>

              {resetData.resetToken && (
                <div className="p-3 bg-white rounded-xl border border-gray-200 text-xs text-left space-y-1 font-mono">
                  <span className="text-gray-400 text-[10px] block uppercase font-sans">Verification Token:</span>
                  <span className="text-brand-plum font-bold break-all">{resetData.resetToken}</span>
                </div>
              )}

              <Link
                to={`/reset-password/${resetData.resetToken || 'amf-token'}`}
                className="block w-full bg-brand-plum text-brand-cream py-3 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-brand-plum-dark transition-colors shadow-md"
              >
                Proceed to Reset Password
              </Link>
            </div>
          ) : (
            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              {errorMessage && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2.5 rounded-xl text-xs font-medium">
                  {errorMessage}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">
                  Registered Email Address
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

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-plum text-brand-cream hover:bg-brand-plum-dark py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-luxury flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70"
              >
                {loading ? (
                  <span>Sending Instructions...</span>
                ) : (
                  <>
                    <span>Send Reset Instructions</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          <div className="text-center pt-2">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-plum hover:text-brand-rose transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Sign In</span>
            </Link>
          </div>

        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
