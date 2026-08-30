import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import { Crown, Sparkles, Feather, ShieldCheck, Heart, ArrowRight } from 'lucide-react';

const About = () => {
  return (
    <>
      <SEO
        title="Our Heritage & Philosophy - The Story of AL-MUFLIHON"
        description="Discover the story of AL-MUFLIHON (المفلحون). Founded in 2024 with the motto 'Wear • Believe • Succeed', uniting timeless Islamic modesty with luxury tailoring."
      />

      <div className="space-y-16 pb-20">

        {/* Hero Header */}
        <section className="bg-brand-plum text-brand-cream py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,157,157,0.2),transparent_70%)]" />

          <div className="relative z-10 max-w-4xl mx-auto space-y-6">
            <div className="w-24 h-24 mx-auto rounded-full border-2 border-brand-rose p-1 bg-white/10 shadow-2xl">
              <img src="/logo.jpg" alt="AL-MUFLIHON Emblem" className="w-full h-full object-cover rounded-full" />
            </div>

            <div className="font-arabic text-4xl sm:text-6xl text-brand-rose font-bold">
              اَلْمُفْلِحُوْنَ
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
              The Heritage of AL-MUFLIHON
            </h1>

            <p className="text-brand-cream/80 text-base sm:text-xl font-light max-w-2xl mx-auto leading-relaxed">
              "Wear • Believe • Succeed" — Established in 2024 to revive the noble tradition of
              regal Islamic modesty, where sacred values meet sovereign craftsmanship.
            </p>
          </div>
        </section>

        {/* Brand Origin Story */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs uppercase font-bold tracking-widest text-brand-plum">
                Founded With Sincerity
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-plum leading-tight">
                "Those Who Succeed Through Dignity and Truth"
              </h2>



              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                In an era of fleeting fast-fashion trends, we recognized a profound longing among Muslims
                and lovers of modest wear for attire that honors both spiritual reverence and supreme tailoring.
                AL-MUFLIHON was born in Pakistan to celebrate modest fashion through beautifully crafted
                kurtas, shalwar kameez, abayas, shawls, and timeless traditional wear.
              </p>

              <div className="border-l-4 border-brand-plum pl-4 py-2 bg-brand-cream/40 rounded-r-xl">
                <p className="font-serif italic text-brand-plum text-sm">
                  "Every garment is designed to instill honor in the wearer, whether standing in prayer or leading in the boardroom."
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-luxury border-2 border-brand-rose/30">
                <img
                  src="https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80"
                  alt="AL-MUFLIHON Craftsmanship"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 4 Pillars of the Brand */}
        <section className="bg-brand-cream/50 py-16 px-4 sm:px-6 lg:px-8 border-y border-brand-rose/20">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-2">
              <span className="text-xs uppercase font-bold tracking-widest text-brand-plum/70">
                The Guiding Tenets
              </span>
              <h2 className="font-serif text-3xl font-bold text-brand-plum">
                The Al-Muflihon Standard
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

              <div className="bg-white p-6 rounded-2xl border border-brand-rose/20 shadow-subtle space-y-3">
                <div className="w-12 h-12 bg-brand-plum text-brand-rose rounded-xl flex items-center justify-center">
                  <Crown className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-brand-plum">1. Sovereign Cuts</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Engineered silhouettes inspired by traditional Pakistani craftsmanship and timeless modest fashion, refined for modern elegance.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-brand-rose/20 shadow-subtle space-y-3">
                <div className="w-12 h-12 bg-brand-plum text-brand-sage rounded-xl flex items-center justify-center">
                  <Feather className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-brand-plum">2. Pure Fibers</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  We reject synthetic shortcuts, sourcing 100% natural Egyptian Giza cotton, pure Irish flax linen, and Cashmere.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-brand-rose/20 shadow-subtle space-y-3">
                <div className="w-12 h-12 bg-brand-plum text-brand-rose rounded-xl flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-brand-plum">3. Ethical Craft</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Fair living wages and ethical working environments for our master artisans and tailors.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-brand-rose/20 shadow-subtle space-y-3">
                <div className="w-12 h-12 bg-brand-plum text-brand-cream rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-brand-plum">4. Modesty Supreme</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Uncompromised coverage, non-sheer thread counts, and tailored ease for complete freedom of movement during Salah.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-plum">
            Experience the Regal Touch
          </h2>
          <p className="text-sm text-gray-600 max-w-lg mx-auto">
            Discover how AL-MUFLIHON garments transform your daily presence. Browse our limited collections today.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-brand-plum text-brand-cream px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-brand-plum-dark transition-all duration-300 shadow-luxury hover:scale-105"
          >
            <span>Explore The Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

      </div>
    </>
  );
};

export default About;
