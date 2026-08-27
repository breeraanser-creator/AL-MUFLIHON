import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import { showToast, toggleCart } from '../../redux/slices/uiSlice';
import { Star, ShoppingBag, Eye, Heart } from 'lucide-react';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'M');
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        discountPrice: product.discountPrice,
        images: product.images,
        selectedSize: selectedSize,
        selectedColor: product.colors?.[0]?.name || 'Plum',
        qty: 1
      })
    );

    dispatch(
      showToast({
        type: 'success',
        message: `Added ${product.name} (${selectedSize}) to bag!`
      })
    );

    dispatch(toggleCart(true));
  };

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    dispatch(
      showToast({
        type: 'info',
        message: !isWishlisted ? 'Saved to your wishlist' : 'Removed from wishlist'
      })
    );
  };

  const discountAmount = product.discountPrice > 0 ? product.price - product.discountPrice : 0;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-brand-rose/20 shadow-subtle hover:shadow-luxury-hover transition-all duration-300 flex flex-col">
      {/* Product Image & Badges */}
      <div className="relative aspect-[3/4] overflow-hidden bg-brand-cream/30">
        <Link to={`/product/${product._id}`}>
          <img
            src={product.images?.[0]}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isBestSeller && (
            <span className="bg-brand-plum text-brand-cream text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md shadow-sm">
              Best Seller
            </span>
          )}
          {product.isNewArrival && (
            <span className="bg-brand-sage text-brand-dark text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md shadow-sm">
              New Arrival
            </span>
          )}
          {discountAmount > 0 && (
            <span className="bg-brand-rose text-brand-plum text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md shadow-sm">
              Save PKR {discountAmount.toLocaleString()}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={toggleWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 z-10 shadow-sm ${
            isWishlisted
              ? 'bg-brand-plum text-brand-rose'
              : 'bg-white/80 backdrop-blur-sm text-gray-600 hover:text-brand-plum hover:bg-white'
          }`}
          aria-label="Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-brand-rose' : ''}`} />
        </button>

        {/* Quick View Button on Hover */}
        <Link
          to={`/product/${product._id}`}
          className="absolute inset-x-4 bottom-4 bg-brand-cream-light/95 backdrop-blur-md text-brand-plum font-semibold text-xs py-2.5 rounded-xl shadow-lg flex items-center justify-center gap-1.5 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-white"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>View Details</span>
        </Link>
      </div>

      {/* Product Details Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
            <span className="uppercase font-semibold tracking-wider text-brand-plum/70">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span className="font-bold text-gray-700">{product.rating || 4.8}</span>
              <span className="text-gray-400">({product.numReviews || 12})</span>
            </div>
          </div>

          <Link to={`/product/${product._id}`}>
            <h3 className="font-serif text-base font-bold text-brand-dark hover:text-brand-plum transition-colors line-clamp-1 mb-2">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-gray-500 line-clamp-2 mb-3 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Size Selection & Price & Add to Bag */}
        <div className="pt-3 border-t border-gray-100 space-y-3">
          
          {/* Sizes Pill Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
              <span className="text-[11px] text-gray-400 font-medium mr-1">Size:</span>
              {product.sizes.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded border transition-all ${
                    selectedSize === sz
                      ? 'bg-brand-plum text-brand-cream border-brand-plum'
                      : 'border-gray-200 text-gray-600 hover:border-brand-plum'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between gap-2">
            <div>
              <div className="text-base font-bold text-brand-plum font-serif">
                PKR {(product.discountPrice || product.price).toLocaleString()}
              </div>
              {product.discountPrice > 0 && (
                <div className="text-xs text-gray-400 line-through">
                  PKR {product.price.toLocaleString()}
                </div>
              )}
            </div>

            <button
              onClick={handleQuickAdd}
              className="bg-brand-plum text-brand-cream hover:bg-brand-plum-dark text-xs font-semibold px-3.5 py-2 rounded-xl transition-all duration-200 flex items-center gap-1.5 shadow-sm hover:scale-105 active:scale-95"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
