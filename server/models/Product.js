const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true }
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a product name'],
      trim: true,
      maxlength: [120, 'Name cannot exceed 120 characters']
    },
    sku: {
      type: String,
      unique: true,
      sparse: true
    },
    description: {
      type: String,
      required: [true, 'Please add a product description']
    },
    price: {
      type: Number,
      required: [true, 'Please add product price'],
      min: [0, 'Price must be positive']
    },
    discountPrice: {
      type: Number,
      default: 0
    },
    category: {
      type: String,
      required: [true, 'Please select a category'],
      enum: ['Men', 'Women', 'Thobes', 'Abayas', 'Kurta Collection', 'Luxury Shawls', 'Accessories', 'Formal', 'Casual']
    },
    subCategory: {
      type: String,
      default: 'General'
    },
    images: {
      type: [String],
      required: [true, 'Please add at least one product image']
    },
    sizes: {
      type: [String],
      enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Custom'],
      default: ['S', 'M', 'L', 'XL']
    },
    colors: [
      {
        name: { type: String, required: true },
        hexCode: { type: String, default: '#601D49' }
      }
    ],
    fabric: {
      type: String,
      default: 'Premium Egyptian Cotton'
    },
    careInstructions: {
      type: String,
      default: 'Dry clean or gentle hand wash with cold water. Iron inside out.'
    },
    stock: {
      type: Number,
      required: [true, 'Please add stock count'],
      default: 25
    },
    rating: {
      type: Number,
      default: 4.8
    },
    numReviews: {
      type: Number,
      default: 0
    },
    reviews: [reviewSchema],
    isFeatured: {
      type: Boolean,
      default: false
    },
    isNewArrival: {
      type: Boolean,
      default: false
    },
    isBestSeller: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Product', productSchema);
