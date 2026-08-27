import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <>
      <SEO title="404 - Page Not Found" description="The page you are looking for does not exist in AL-MUFLIHON." />
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
        <div className="max-w-md space-y-6">
          <span className="font-arabic text-4xl text-brand-plum font-bold">المفلحون</span>
          <h1 className="font-serif text-6xl font-bold text-brand-plum">404</h1>
          <h2 className="font-serif text-2xl font-bold text-gray-800">Page Not Found</h2>
          <p className="text-sm text-gray-600">
            The sartorial piece or destination you requested could not be located.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-brand-plum text-brand-cream px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-brand-plum-dark transition-colors shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
