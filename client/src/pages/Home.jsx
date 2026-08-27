import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeaturedProducts } from '../redux/slices/productSlice';
import SEO from '../components/common/SEO';
import ProductCard from '../components/shop/ProductCard';
import { 
  ArrowRight, 
  Sparkles, 
  Shield, 
  Feather, 
  Crown, 
  Star, 
  CheckCircle2, 
  Compass 
} from 'lucide-react';

const Home = () => {
  const dispatch = useDispatch();
  const { featured, newArrivals, bestSellers, items } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchFeaturedProducts());
  }, [dispatch]);

  const categories = [
    {
      title: 'Saudi & Emirati Thobes',
      desc: 'Refined silhouette in pure cotton & linen weaves',
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
      category: 'Thobes'
    },
    {
      title: 'Opulent Occasion Abayas',
      desc: 'Flowing Nida and velvet fabrics with subtle embroidery',
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
      category: 'Abayas'
    },
    {
      title: 'Linen Kurta Sets',
      desc: 'Crisp, breathable, hand-finished for Friday prayers & festivities',
      image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=800&q=80',
      category: 'Kurta Collection'
    },
    {
      title: 'Handcrafted Cashmere Shawls',
      desc: 'Pure wool with delicate rose and sage tilla borders',
      image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=800&q=80',
      category: 'Luxury Shawls'
    }
  ];

  return (
    <>
      <SEO
        title="Luxury Modest Wear & Bespoke Apparel"
        description="Discover AL-MUFLIHON (المفلحون). Handcrafted Saudi thobes, bespoke kurtas, flowing abayas, and Kashmiri shawls. Wear • Believe • Succeed."
      />

      <div className="space-y-20 pb-20">
        
        {/* ================= HERO SECTION ================= */}
        <section className="relative min-h-[85vh] flex items-center justify-center bg-brand-plum text-brand-cream overflow-hidden px-4 sm:px-6 lg:px-8 py-20">
          
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(234,157,157,0.25),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(139,187,146,0.15),transparent_50%)]" />

          {/* Geometric Pattern Overlay */}
          <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:4rem_4rem]" />

          <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8 animate-fade-in">
            
            {/* Brand Emblem & Arabic Calligraphy */}
            <div className="flex flex-col items-center space-y-3">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-brand-rose/60 p-1 bg-white/10 backdrop-blur-md shadow-2xl">
                <img
                  src="/logo.jpg"
                  alt="AL-MUFLIHON Emblem"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              <div className="font-arabic text-3xl sm:text-5xl text-brand-rose tracking-wider mt-2 font-bold">
                اَلْمُفْلِحُوْنَ
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-plum-dark/80 border border-brand-rose/30 text-xs font-semibold tracking-widest text-brand-rose uppercase">
                <Crown className="w-3.5 h-3.5 text-brand-cream" />
                <span>Bespoke Modest Sartorial Elegance • EST. 2024</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-brand-cream max-w-4xl mx-auto">
              Wear with Reverence. <br />
              <span className="text-brand-rose font-normal italic">Believe with Conviction.</span> <br />
              Succeed with Grace.
            </h1>

            {/* Tagline / Subtitle */}
            <p className="text-base sm:text-xl text-brand-cream/80 max-w-2xl mx-auto font-light leading-relaxed">
              Tailored for those who seek uncompromised dignity and luxury. Pure Egyptian cotton thobes, 
              embroidered shawls, and couture abayas crafted for the contemporary believer.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                to="/shop"
                className="w-full sm:w-auto bg-brand-rose text-brand-plum font-bold text-sm uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-white transition-all duration-300 shadow-luxury hover:scale-105 flex items-center justify-center gap-2 group"
              >
                <span>Explore The Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/about"
                className="w-full sm:w-auto border-2 border-brand-rose/40 text-brand-cream font-semibold text-sm uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-brand-plum-dark transition-all duration-300 hover:border-brand-rose flex items-center justify-center gap-2"
              >
                <span>The Brand Story</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ================= PILLARS OF EXCELLENCE ================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-panel p-8 rounded-2xl shadow-subtle border border-brand-rose/20 text-center space-y-3 hover:border-brand-plum transition-all duration-300">
              <div className="w-14 h-14 bg-brand-plum text-brand-cream rounded-2xl flex items-center justify-center mx-auto shadow-md">
                <Crown className="w-7 h-7 text-brand-rose" />
              </div>
              <h3 className="font-serif text-xl font-bold text-brand-plum">Bespoke Tailoring</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Precision cuts rooted in centuries of Arab and South Asian artisanal mastery, offering sublime comfort.
              </p>
            </div>

            <div className="glass-panel p-8 rounded-2xl shadow-subtle border border-brand-rose/20 text-center space-y-3 hover:border-brand-plum transition-all duration-300">
              <div className="w-14 h-14 bg-brand-plum text-brand-cream rounded-2xl flex items-center justify-center mx-auto shadow-md">
                <Feather className="w-7 h-7 text-brand-sage" />
              </div>
              <h3 className="font-serif text-xl font-bold text-brand-plum">Pure Heritage Fabrics</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                100% fine Egyptian cotton, Irish linen, and authentic Kashmiri cashmere wool for unmatched breathability.
              </p>
            </div>

            <div className="glass-panel p-8 rounded-2xl shadow-subtle border border-brand-rose/20 text-center space-y-3 hover:border-brand-plum transition-all duration-300">
              <div className="w-14 h-14 bg-brand-plum text-brand-cream rounded-2xl flex items-center justify-center mx-auto shadow-md">
                <Shield className="w-7 h-7 text-brand-rose" />
              </div>
              <h3 className="font-serif text-xl font-bold text-brand-plum">Modesty Without Compromise</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Designed to fulfill every standard of Islamic modesty while embodying world-class high-fashion luxury.
              </p>
            </div>
          </div>
        </section>

        {/* ================= CURATED COLLECTIONS ================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-brand-plum/70">
              Exquisite Craftsmanship
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-plum">
              Curated Collections
            </h2>
            <div className="w-20 h-1 bg-brand-rose mx-auto rounded-full mt-2" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.title}
                to={`/shop?category=${encodeURIComponent(cat.category)}`}
                className="group relative rounded-2xl overflow-hidden aspect-[4/5] shadow-subtle hover:shadow-luxury transition-all duration-500 flex flex-col justify-end p-6"
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-plum/95 via-brand-plum/40 to-transparent" />
                <div className="relative z-10 text-brand-cream space-y-1.5">
                  <h3 className="font-serif text-xl font-bold text-brand-cream group-hover:text-brand-rose transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-brand-cream/80 line-clamp-2">
                    {cat.desc}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-rose uppercase tracking-wider pt-2 group-hover:translate-x-1 transition-transform">
                    Discover Collection <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ================= FEATURED SHOWCASE ================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-brand-rose/20 pb-4">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-brand-plum/70">
                Handpicked Favorites
              </span>
              <h2 className="font-serif text-3xl font-bold text-brand-plum">
                Signature Arrivals
              </h2>
            </div>
            <Link
              to="/shop"
              className="text-sm font-bold text-brand-plum hover:text-brand-plum-light flex items-center gap-1.5 group"
            >
              <span>View Full Inventory</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {(featured.length > 0 ? featured : items).slice(0, 6).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>

        {/* ================= BRAND SPOTLIGHT / MANIFESTO ================= */}
        <section className="bg-brand-plum text-brand-cream py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Image Art */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden border-2 border-brand-rose/30 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80"
                  alt="Modest couture craftsmanship"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-brand-cream text-brand-plum p-6 rounded-2xl shadow-2xl border border-brand-rose/40 hidden sm:block max-w-xs">
                <p className="font-serif font-bold text-lg mb-1">المفلحون</p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  "Indeed, the believers have succeeded." — Crafted with timeless Islamic reverence.
                </p>
              </div>
            </div>

            {/* Right Copy */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-rose/20 border border-brand-rose/40 text-brand-rose text-xs font-semibold tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Our Heritage Philosophy</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
                Crafting Garments of <br />
                <span className="text-brand-rose">Dignity, Honor & Piety.</span>
              </h2>

              <p className="text-brand-cream/80 text-base leading-relaxed font-light">
                At AL-MUFLIHON, we believe that modesty is the pinnacle of true elegance. 
                Every stitch in our Saudi cut thobes, our handcrafted Kashmir shawls, and our couture abayas 
                is executed with uncompromising devotion to excellence.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-sage flex-shrink-0" />
                  <span className="text-sm font-medium">Bespoke sizing customized for comfort during daily prayers</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-sage flex-shrink-0" />
                  <span className="text-sm font-medium">Naturally sourced organic linens and hypoallergenic cottons</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-sage flex-shrink-0" />
                  <span className="text-sm font-medium">Timeless silhouettes that bridge Islamic heritage and modern aesthetics</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 bg-brand-rose text-brand-plum px-7 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-white transition-all duration-300 shadow-md"
                >
                  <span>Read Full Brand Manifesto</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ================= TESTIMONIALS ================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-brand-plum/70">
              Client Testimonials
            </span>
            <h2 className="font-serif text-3xl font-bold text-brand-plum">
              Loved by Discerning Patrons
            </h2>
            <div className="w-20 h-1 bg-brand-rose mx-auto rounded-full mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-panel p-8 rounded-2xl shadow-subtle border border-brand-rose/20 space-y-4">
              <div className="flex text-amber-500 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-gray-700 italic leading-relaxed">
                "The Imperial Royal Plum Thobe exceeded all my expectations. The fabric weight is sublime and the cut feels truly presidential for Jumu'ah and Eid."
              </p>
              <div>
                <p className="font-serif font-bold text-brand-plum">Dr. Salman Farooq</p>
                <p className="text-xs text-gray-500">Islamabad, Pakistan</p>
              </div>
            </div>

            <div className="glass-panel p-8 rounded-2xl shadow-subtle border border-brand-rose/20 space-y-4">
              <div className="flex text-amber-500 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-gray-700 italic leading-relaxed">
                "Finding an abaya that blends heavy modesty with regal grace is rare. AL-MUFLIHON’s Zahra velvet piece is exquisite down to the last stitch."
              </p>
              <div>
                <p className="font-serif font-bold text-brand-plum">Maryam Al-Hassan</p>
                <p className="text-xs text-gray-500">Dubai / Lahore</p>
              </div>
            </div>

            <div className="glass-panel p-8 rounded-2xl shadow-subtle border border-brand-rose/20 space-y-4">
              <div className="flex text-amber-500 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-gray-700 italic leading-relaxed">
                "The packaging, the brand emblem, and the Irish linen kurta suit — everything about this brand screams high luxury. Truly wear, believe, succeed."
              </p>
              <div>
                <p className="font-serif font-bold text-brand-plum">Hamza Tariq</p>
                <p className="text-xs text-gray-500">Karachi, Pakistan</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default Home;
