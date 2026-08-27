import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { showToast, toggleCart } from '../redux/slices/uiSlice';
import { INITIAL_PRODUCTS } from '../data/mockProducts';
import SEO from '../components/common/SEO';
import ProductCard from '../components/shop/ProductCard';
import { 
  Star, 
  ShoppingBag, 
  Heart, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Check, 
  Minus, 
  Plus, 
  ChevronRight, 
  Ruler, 
  Sparkles 
} from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details');
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  // Review Form state
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewsList, setReviewsList] = useState([
    {
      name: 'Qari Bilal',
      rating: 5,
      comment: 'Exceptional tailoring and drape. The fabric stays crisp throughout the entire day of prayers and meetings.',
      date: '1 week ago'
    },
    {
      name: 'Zubair Sheikh',
      rating: 5,
      comment: 'The color depth of the plum tone is breathtaking. Received countless compliments at our family gathering.',
      date: '2 weeks ago'
    }
  ]);

  useEffect(() => {
    // Find product from dataset
    const found = INITIAL_PRODUCTS.find((p) => p._id === id) || INITIAL_PRODUCTS[0];
    setProduct(found);
    if (found) {
      setActiveImage(found.images?.[0] || '');
      setSelectedSize(found.sizes?.[0] || 'M');
      setSelectedColor(found.colors?.[0]?.name || 'Plum');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="font-serif text-2xl font-bold text-brand-plum">Loading Product...</h2>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        discountPrice: product.discountPrice,
        images: product.images,
        selectedSize,
        selectedColor,
        qty: quantity
      })
    );

    dispatch(
      showToast({
        type: 'success',
        message: `Added ${product.name} (${selectedSize}) to your bag!`
      })
    );

    dispatch(toggleCart(true));
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewName || !reviewComment) return;

    setReviewsList([
      {
        name: reviewName,
        rating: reviewRating,
        comment: reviewComment,
        date: 'Just now'
      },
      ...reviewsList
    ]);

    dispatch(
      showToast({
        type: 'success',
        message: 'Thank you! Your review has been published.'
      })
    );

    setReviewName('');
    setReviewComment('');
  };

  const relatedProducts = INITIAL_PRODUCTS.filter((p) => p._id !== product._id).slice(0, 3);
  const discountAmount = product.discountPrice > 0 ? product.price - product.discountPrice : 0;

  return (
    <>
      <SEO
        title={`${product.name} - Luxury Modest Fashion`}
        description={product.description}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 font-medium">
          <Link to="/" className="hover:text-brand-plum">Home</Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <Link to="/shop" className="hover:text-brand-plum">Catalog</Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-brand-plum">
            {product.category}
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-brand-plum font-semibold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Main Product Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-brand-cream/30 border border-brand-rose/30 shadow-luxury relative group">
              <img
                src={activeImage || product.images?.[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              {discountAmount > 0 && (
                <div className="absolute top-4 left-4 bg-brand-rose text-brand-plum text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-md">
                  Save PKR {discountAmount.toLocaleString()}
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-20 h-24 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      activeImage === img ? 'border-brand-plum scale-105 shadow-md' : 'border-gray-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Info & Purchase Options */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                <span className="uppercase font-bold tracking-widest text-brand-rose bg-brand-plum px-3 py-1 rounded-full">
                  {product.category}
                </span>
                <span className="font-mono text-gray-400">SKU: {product.sku || 'AMF-LTD'}</span>
              </div>

              <h1 className="font-serif text-2xl sm:text-4xl font-bold text-brand-dark leading-snug">
                {product.name}
              </h1>

              {/* Rating & Reviews Count */}
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center text-amber-500 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-sm font-bold text-gray-700">{product.rating || 4.9}</span>
                <span className="text-sm text-gray-400">({reviewsList.length} Verified Reviews)</span>
              </div>
            </div>

            {/* Price Block */}
            <div className="p-4 rounded-2xl bg-brand-cream/50 border border-brand-rose/30 flex items-baseline gap-4">
              <span className="font-serif text-3xl font-bold text-brand-plum">
                PKR {(product.discountPrice || product.price).toLocaleString()}
              </span>
              {product.discountPrice > 0 && (
                <span className="text-base text-gray-400 line-through">
                  PKR {product.price.toLocaleString()}
                </span>
              )}
              <span className="text-xs font-semibold text-brand-sage-dark ml-auto uppercase tracking-wider">
                In Stock & Ready to Dispatch
              </span>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed font-light">
              {product.description}
            </p>

            {/* Color Swatches */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-gray-700">
                  <span>Selected Color: <strong className="text-brand-plum">{selectedColor}</strong></span>
                </div>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                        selectedColor === color.name
                          ? 'border-brand-plum bg-brand-plum text-brand-cream shadow-sm'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-white shadow-inner"
                        style={{ backgroundColor: color.hexCode }}
                      />
                      <span>{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector & Size Guide */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold text-gray-700">
                  <span>Select Size: <strong className="text-brand-plum">{selectedSize}</strong></span>
                  <button
                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                    className="text-brand-plum hover:text-brand-rose flex items-center gap-1 font-semibold"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Size Guide</span>
                  </button>
                </div>

                <div className="grid grid-cols-5 gap-2.5">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 rounded-xl text-xs font-bold uppercase transition-all ${
                        selectedSize === size
                          ? 'bg-brand-plum text-brand-cream shadow-md scale-105'
                          : 'bg-white border border-gray-200 text-gray-700 hover:border-brand-plum'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                {/* Size Guide Modal / Inline Table */}
                {showSizeGuide && (
                  <div className="p-4 bg-white rounded-2xl border border-brand-rose/40 text-xs space-y-2 animate-fade-in shadow-subtle">
                    <p className="font-bold text-brand-plum uppercase tracking-wider">Standard Modest Sizing (Inches)</p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-center border-collapse">
                        <thead>
                          <tr className="bg-brand-cream/60 text-brand-dark">
                            <th className="p-1.5 border border-gray-200">Size</th>
                            <th className="p-1.5 border border-gray-200">Chest</th>
                            <th className="p-1.5 border border-gray-200">Length</th>
                            <th className="p-1.5 border border-gray-200">Shoulder</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr><td className="p-1.5 border border-gray-200 font-bold">S</td><td className="p-1.5 border border-gray-200">38-40</td><td className="p-1.5 border border-gray-200">52</td><td className="p-1.5 border border-gray-200">17.5</td></tr>
                          <tr><td className="p-1.5 border border-gray-200 font-bold">M</td><td className="p-1.5 border border-gray-200">41-43</td><td className="p-1.5 border border-gray-200">54</td><td className="p-1.5 border border-gray-200">18.5</td></tr>
                          <tr><td className="p-1.5 border border-gray-200 font-bold">L</td><td className="p-1.5 border border-gray-200">44-46</td><td className="p-1.5 border border-gray-200">56</td><td className="p-1.5 border border-gray-200">19.5</td></tr>
                          <tr><td className="p-1.5 border border-gray-200 font-bold">XL</td><td className="p-1.5 border border-gray-200">47-49</td><td className="p-1.5 border border-gray-200">58</td><td className="p-1.5 border border-gray-200">20.5</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Quantity & Action Buttons */}
            <div className="pt-2 space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-xl bg-white p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-bold text-sm text-brand-dark">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-brand-plum text-brand-cream hover:bg-brand-plum-dark py-3.5 px-6 rounded-xl font-semibold text-sm uppercase tracking-wider transition-all duration-300 shadow-luxury flex items-center justify-center gap-2 hover:scale-[1.02]"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full bg-brand-rose text-brand-plum hover:bg-white border-2 border-brand-rose py-3.5 px-6 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-md"
              >
                Instant Buy Now
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 border-t border-gray-200 grid grid-cols-3 gap-4 text-center text-xs text-gray-600">
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-5 h-5 text-brand-plum" />
                <span className="font-medium">100% Authentic Quality</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-5 h-5 text-brand-plum" />
                <span className="font-medium">Fast Nationwide Dispatch</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RotateCcw className="w-5 h-5 text-brand-plum" />
                <span className="font-medium">7 Days Easy Exchange</span>
              </div>
            </div>

          </div>
        </div>

        {/* Product Details Tabs (Description, Fabric, Care, Reviews) */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-rose/20 shadow-subtle space-y-6">
          <div className="flex border-b border-gray-200 gap-8 overflow-x-auto">
            {['details', 'fabric', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 font-serif text-base sm:text-lg font-bold capitalize transition-all border-b-2 whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-brand-plum text-brand-plum'
                    : 'border-transparent text-gray-400 hover:text-gray-700'
                }`}
              >
                {tab === 'details' && 'Garment Details'}
                {tab === 'fabric' && 'Fabric & Care Guide'}
                {tab === 'reviews' && `Patron Reviews (${reviewsList.length})`}
              </button>
            ))}
          </div>

          {/* Details Tab */}
          {activeTab === 'details' && (
            <div className="space-y-4 text-sm text-gray-600 leading-relaxed animate-fade-in">
              <p>{product.description}</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Bespoke tailoring optimized for both formal receptions and daily religious observance.</li>
                <li>Single-needle master stitching on collars, plackets, and sleeve cuffs.</li>
                <li>Wrinkle-resistant luxury finish for enduring poise.</li>
              </ul>
            </div>
          )}

          {/* Fabric & Care Tab */}
          {activeTab === 'fabric' && (
            <div className="space-y-4 text-sm text-gray-600 leading-relaxed animate-fade-in">
              <div className="p-4 bg-brand-cream/50 rounded-xl">
                <p className="font-bold text-brand-plum">Primary Fabric Composition:</p>
                <p>{product.fabric || '100% Pure Egyptian Giza Cotton & Irish Linen'}</p>
              </div>
              <div>
                <p className="font-bold text-brand-plum mb-1">Recommended Care Instructions:</p>
                <p>{product.careInstructions || 'Dry clean recommended. Gentle hand wash inside out with mild detergent.'}</p>
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="space-y-8 animate-fade-in">
              
              {/* Existing Reviews */}
              <div className="space-y-4">
                {reviewsList.map((rev, index) => (
                  <div key={index} className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-brand-dark text-sm">{rev.name}</span>
                        <span className="text-[11px] text-brand-sage-dark bg-brand-sage/20 px-2 py-0.5 rounded-full font-bold">
                          Verified Buyer
                        </span>
                      </div>
                      <span className="text-xs text-gray-400">{rev.date}</span>
                    </div>
                    <div className="flex text-amber-500 gap-0.5">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>

              {/* Add Review Form */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="font-serif text-lg font-bold text-brand-plum mb-4">Write a Review</h4>
                <form onSubmit={handleReviewSubmit} className="space-y-4 max-w-xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Your Name</label>
                      <input
                        type="text"
                        value={reviewName}
                        onChange={(e) => setReviewName(e.target.value)}
                        required
                        placeholder="e.g. Tariq Mehmood"
                        className="w-full p-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-brand-plum bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Rating</label>
                      <select
                        value={reviewRating}
                        onChange={(e) => setReviewRating(Number(e.target.value))}
                        className="w-full p-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-brand-plum bg-gray-50 cursor-pointer"
                      >
                        <option value="5">★★★★★ (5 - Outstanding)</option>
                        <option value="4">★★★★☆ (4 - Very Good)</option>
                        <option value="3">★★★☆☆ (3 - Average)</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Your Review</label>
                    <textarea
                      rows="3"
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      required
                      placeholder="Describe the fabric quality, stitching, and fit..."
                      className="w-full p-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-brand-plum bg-gray-50"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-brand-plum text-brand-cream text-xs font-semibold uppercase tracking-wider px-6 py-3 rounded-xl hover:bg-brand-plum-dark transition-colors shadow-sm"
                  >
                    Submit Review
                  </button>
                </form>
              </div>

            </div>
          )}
        </div>

        {/* Related Collections */}
        <div className="space-y-6 pt-6">
          <h3 className="font-serif text-2xl font-bold text-brand-plum">You May Also Admire</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </div>

      </div>
    </>
  );
};

export default ProductDetail;
