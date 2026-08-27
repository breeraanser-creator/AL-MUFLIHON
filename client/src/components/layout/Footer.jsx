import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showToast } from '../../redux/slices/uiSlice';
import { 
  Send, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Award, 
  Instagram, 
  Facebook, 
  Twitter, 
  MapPin, 
  Phone, 
  Mail 
} from 'lucide-react';

const Footer = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      dispatch(
        showToast({
          type: 'success',
          message: 'JazakAllah Khair! You have subscribed to AL-MUFLIHON VIP releases.'
        })
      );
      setEmail('');
    }
  };

  return (
    <footer className="bg-brand-plum text-brand-cream border-t-4 border-brand-rose">
      {/* Brand Value Strip */}
      <div className="border-b border-brand-rose/20 bg-brand-plum-dark/80 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-brand-plum flex items-center justify-center text-brand-rose border border-brand-rose/30">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm tracking-wide">Heritage Fabrics</h4>
              <p className="text-xs text-brand-cream/70">100% pure Egyptian cotton & linen</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-brand-plum flex items-center justify-center text-brand-sage border border-brand-sage/30">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm tracking-wide">Nationwide Delivery</h4>
              <p className="text-xs text-brand-cream/70">Express delivery within 2-4 days</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-brand-plum flex items-center justify-center text-brand-rose border border-brand-rose/30">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm tracking-wide">Seamless Exchange</h4>
              <p className="text-xs text-brand-cream/70">7 days hassle-free sizing exchange</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-brand-plum flex items-center justify-center text-brand-cream border border-brand-cream/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm tracking-wide">Secure Shopping</h4>
              <p className="text-xs text-brand-cream/70">Cash on Delivery & Secure Checkout</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Column 1: Brand Manifesto & Logo */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.jpg"
                alt="AL-MUFLIHON Logo"
                className="w-14 h-14 rounded-full border-2 border-brand-rose/60 p-0.5 object-cover bg-white"
              />
              <div>
                <h3 className="font-serif text-2xl font-bold tracking-widest text-brand-cream">
                  AL-MUFLIHON
                </h3>
                <span className="font-arabic text-sm text-brand-rose tracking-wider">
                  المفلحون • EST. 2024
                </span>
              </div>
            </div>

            <p className="text-sm text-brand-cream/80 leading-relaxed font-light pr-4">
              "Those who succeed" — AL-MUFLIHON is dedicated to redefining modern modest fashion. 
              We curate premium Saudi thobes, bespoke kurtas, flowing abayas, and Kashmiri shawls 
              crafted with spiritual reverence and timeless sartorial excellence.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <h5 className="text-xs uppercase font-bold tracking-wider text-brand-rose mb-2">
                Join Our Private Circle
              </h5>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2 max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-brand-plum-dark/90 border border-brand-rose/40 rounded-lg px-4 py-2 text-sm text-brand-cream placeholder-brand-cream/40 focus:outline-none focus:border-brand-rose flex-1"
                />
                <button
                  type="submit"
                  className="bg-brand-rose text-brand-plum font-semibold px-4 py-2 rounded-lg hover:bg-white transition-colors flex items-center gap-1.5 text-sm"
                >
                  <span>Join</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>

          {/* Column 2: Collections */}
          <div>
            <h4 className="font-serif text-base font-bold text-brand-rose mb-4 tracking-wider uppercase">
              Collections
            </h4>
            <ul className="space-y-2.5 text-sm text-brand-cream/80">
              <li>
                <Link to="/shop?category=Thobes" className="hover:text-brand-rose transition-colors">
                  Saudi & Emirati Thobes
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Kurta Collection" className="hover:text-brand-rose transition-colors">
                  Pure Linen Kurtas
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Abayas" className="hover:text-brand-rose transition-colors">
                  Opulent Occasion Abayas
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Luxury Shawls" className="hover:text-brand-rose transition-colors">
                  Handwoven Shawls
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Accessories" className="hover:text-brand-rose transition-colors">
                  Crest Rings & Cufflinks
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Brand & Information */}
          <div>
            <h4 className="font-serif text-base font-bold text-brand-rose mb-4 tracking-wider uppercase">
              The Brand
            </h4>
            <ul className="space-y-2.5 text-sm text-brand-cream/80">
              <li>
                <Link to="/about" className="hover:text-brand-rose transition-colors">
                  Our Philosophy & Story
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-brand-rose transition-colors">
                  Lookbook 2024 / 2025
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-brand-rose transition-colors">
                  Client Dashboard
                </Link>
              </li>
              <li>
                <span className="text-brand-cream/50 cursor-pointer hover:text-brand-rose">
                  Artisanal Craftsmanship
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Concierge */}
          <div>
            <h4 className="font-serif text-base font-bold text-brand-rose mb-4 tracking-wider uppercase">
              Concierge
            </h4>
            <ul className="space-y-3 text-sm text-brand-cream/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-rose flex-shrink-0 mt-1" />
                <span>Islamabad / Lahore / Karachi, Pakistan</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-rose flex-shrink-0" />
                <a href="tel:03294377954" className="hover:text-brand-rose transition-colors font-semibold">
                  03294377954 (+92 329 4377954)
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-rose flex-shrink-0" />
                <a href="mailto:admin@almuflihon.com" className="hover:text-brand-rose transition-colors">
                  admin@almuflihon.com
                </a>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-4">
              <a
                href="#instagram"
                className="w-8 h-8 rounded-full bg-brand-plum-dark flex items-center justify-center text-brand-rose hover:bg-brand-rose hover:text-brand-plum transition-colors border border-brand-rose/30"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#facebook"
                className="w-8 h-8 rounded-full bg-brand-plum-dark flex items-center justify-center text-brand-rose hover:bg-brand-rose hover:text-brand-plum transition-colors border border-brand-rose/30"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#twitter"
                className="w-8 h-8 rounded-full bg-brand-plum-dark flex items-center justify-center text-brand-rose hover:bg-brand-rose hover:text-brand-plum transition-colors border border-brand-rose/30"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-brand-rose/20 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-brand-cream/60 gap-4">
          <p>© {new Date().getFullYear()} AL-MUFLIHON Clothing Brand. All Rights Reserved. (المفلحون)</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-brand-cream cursor-pointer">Privacy Policy</span>
            <span className="hover:text-brand-cream cursor-pointer">Terms of Service</span>
            <span className="text-brand-sage font-medium">Wear • Believe • Succeed</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
