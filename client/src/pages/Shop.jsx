import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/productSlice';
import SEO from '../components/common/SEO';
import ProductCard from '../components/shop/ProductCard';
import { Filter, SlidersHorizontal, Search, RotateCcw, Sparkles } from 'lucide-react';

const categories = [
  'All',
  'Thobes',
  'Abayas',
  'Kurta Collection',
  'Luxury Shawls',
  'Accessories'
];

const Shop = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { items, loading } = useSelector((state) => state.products);

  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedSort, setSelectedSort] = useState('default');
  const [priceRange, setPriceRange] = useState(20000);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    const searchParam = searchParams.get('search');
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [searchParams]);

  useEffect(() => {
    dispatch(
      fetchProducts({
        category: selectedCategory,
        search: searchQuery,
        sort: selectedSort,
        maxPrice: priceRange
      })
    );
  }, [selectedCategory, searchQuery, selectedSort, priceRange, dispatch]);

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSelectedSort('default');
    setPriceRange(20000);
    setSearchParams({});
  };

  // Filter products locally to ensure instant response
  const filteredProducts = items.filter((product) => {
    if (selectedCategory !== 'All' && product.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchDesc = product.description.toLowerCase().includes(q);
      const matchFabric = product.fabric?.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchFabric) return false;
    }
    const effectivePrice = product.discountPrice || product.price;
    if (effectivePrice > priceRange) {
      return false;
    }
    return true;
  }).sort((a, b) => {
    if (selectedSort === 'price-low') {
      return (a.discountPrice || a.price) - (b.discountPrice || b.price);
    }
    if (selectedSort === 'price-high') {
      return (b.discountPrice || b.price) - (a.discountPrice || a.price);
    }
    if (selectedSort === 'rating') {
      return (b.rating || 0) - (a.rating || 0);
    }
    if (selectedSort === 'bestseller') {
      return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
    }
    return 0;
  });

  return (
    <>
      <SEO
        title={`Shop ${selectedCategory !== 'All' ? selectedCategory : 'All Collections'}`}
        description="Browse the complete catalog of AL-MUFLIHON modest apparel, bespoke Saudi thobes, pure linen kurtas, abayas, and Kashmiri shawls."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Page Header */}
        <div className="bg-brand-plum text-brand-cream rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-luxury">
          <div className="absolute -right-10 -bottom-10 opacity-10 font-arabic text-9xl text-brand-rose select-none">
            المفلحون
          </div>
          <div className="relative z-10 space-y-3 max-w-2xl">
            <span className="text-xs uppercase font-bold tracking-widest text-brand-rose">
              The Sovereign Collection
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
              Modest Haute Couture
            </h1>
            <p className="text-sm sm:text-base text-brand-cream/80 leading-relaxed font-light">
              Explore our master-tailored garments. Filter by category, fabric, and price to find your bespoke attire.
            </p>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-brand-plum text-brand-cream shadow-md scale-105'
                  : 'bg-white text-gray-700 hover:bg-brand-cream/60 border border-brand-rose/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white rounded-2xl p-4 border border-brand-rose/20 shadow-subtle flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search garments, fabrics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 pl-10 pr-4 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-brand-plum"
            />
          </div>

          {/* Price Range Slider */}
          <div className="w-full md:w-64 flex flex-col gap-1">
            <div className="flex justify-between text-xs font-semibold text-gray-600">
              <span>Max Price:</span>
              <span className="text-brand-plum font-bold">PKR {priceRange.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="2000"
              max="20000"
              step="500"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-brand-plum cursor-pointer"
            />
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-brand-plum" />
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-medium text-gray-700 focus:outline-none focus:border-brand-plum cursor-pointer"
              >
                <option value="default">Featured / Default</option>
                <option value="bestseller">Best Sellers First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            <button
              onClick={handleResetFilters}
              title="Reset All Filters"
              className="text-xs text-brand-plum hover:text-brand-rose flex items-center gap-1 font-semibold p-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between text-xs text-gray-500 px-2">
          <span>
            Showing <strong className="text-brand-plum">{filteredProducts.length}</strong> luxurious designs
          </span>
          {selectedCategory !== 'All' && (
            <span className="bg-brand-rose/20 text-brand-plum px-3 py-1 rounded-full font-bold">
              Category: {selectedCategory}
            </span>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-200 p-8 space-y-4 shadow-subtle">
            <div className="w-16 h-16 bg-brand-cream rounded-full flex items-center justify-center mx-auto text-brand-plum">
              <Search className="w-8 h-8 opacity-50" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-brand-plum">No garments found</h3>
            <p className="text-sm text-gray-500 max-w-sm mx-auto">
              We couldn't find any designs matching your criteria. Try adjusting your filters or price range.
            </p>
            <button
              onClick={handleResetFilters}
              className="bg-brand-plum text-brand-cream px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-brand-plum-dark transition-colors shadow-md"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Shop;
