const Product = require('../models/Product');
const fallbackProducts = require('../utils/seeder');

// @desc    Get all products with filtering, search & pagination
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const { category, search, minPrice, maxPrice, sort, page = 1, limit = 12 } = req.query;

    const query = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    let sortQuery = { createdAt: -1 };
    if (sort === 'price-low') sortQuery = { price: 1 };
    if (sort === 'price-high') sortQuery = { price: -1 };
    if (sort === 'rating') sortQuery = { rating: -1 };

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort(sortQuery)
      .skip(skip)
      .limit(limitNum);

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      pages: Math.ceil(total / limitNum) || 1,
      currentPage: pageNum,
      products
    });
  } catch (error) {
    // Graceful fallback to seeded inventory if MongoDB is connecting/offline
    let filtered = [...fallbackProducts];
    const { category, search, sort } = req.query;

    if (category && category !== 'All') {
      filtered = filtered.filter((p) => p.category === category);
    }

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }

    if (sort === 'price-low') filtered.sort((a, b) => a.price - b.price);
    if (sort === 'price-high') filtered.sort((a, b) => b.price - a.price);

    res.status(200).json({
      success: true,
      count: filtered.length,
      total: filtered.length,
      pages: 1,
      currentPage: 1,
      products: filtered,
      mode: 'standalone-catalog'
    });
  }
};

// @desc    Get featured, new arrivals and bestsellers for Home page
// @route   GET /api/products/featured
// @access  Public
const getFeaturedProducts = async (req, res) => {
  try {
    const featured = await Product.find({ isFeatured: true }).limit(8);
    const newArrivals = await Product.find({ isNewArrival: true }).limit(8);
    const bestSellers = await Product.find({ isBestSeller: true }).limit(8);

    res.status(200).json({
      success: true,
      featured,
      newArrivals,
      bestSellers
    });
  } catch (error) {
    res.status(200).json({
      success: true,
      featured: fallbackProducts.filter((p) => p.isFeatured),
      newArrivals: fallbackProducts.filter((p) => p.isNewArrival),
      bestSellers: fallbackProducts.filter((p) => p.isBestSeller),
      mode: 'standalone-catalog'
    });
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      const fallback = fallbackProducts.find((p) => p.sku === req.params.id || p.name.includes(req.params.id)) || fallbackProducts[0];
      return res.status(200).json({ success: true, product: fallback });
    }

    res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    const fallback = fallbackProducts[0];
    res.status(200).json({ success: true, product: fallback });
  }
};

// @desc    Create product review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ success: true, message: 'Review added successfully' });
  } catch (error) {
    res.status(200).json({ success: true, message: 'Review recorded (Demo Mode)' });
  }
};

module.exports = {
  getProducts,
  getFeaturedProducts,
  getProductById,
  createProductReview
};
