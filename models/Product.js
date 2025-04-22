const mongoose = require("mongoose");

// Define a specific schema for property data
const PropertyDataSchema = new mongoose.Schema({
  propertyType: String,
  bhk: String,
  bathrooms: String,
  furnishing: String,
  projectStatus: String,
  listedBy: String,
  superBuiltupArea: String,
  carpetArea: String,
  maintenance: String,
  totalFloors: String,
  floorNo: String,
  carParking: String,
  facing: String,
  projectName: String,
  age: String,
  balconies: String,
  amenities: {
    lift: Boolean,
    powerBackup: Boolean,
    security: Boolean,
    garden: Boolean,
    clubhouse: Boolean,
    swimmingPool: Boolean,
    gym: Boolean,
    waterSupply: Boolean
  }
}, { _id: false });

const ProductSchema = new mongoose.Schema({
  useremail: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  address: {
    type: Array,
  },
  price: {
    type: String,
  },
  productpic1: {
    type: String,
  },
  productpic2: {
    type: String,
  },
  productpic3: {
    type: String,
  },
  productpic4: {
    type: String,
  },
  productpic5: {
    type: String,
  },
  productpic6: {
    type: String,
  },
  productpic7: {
    type: String,
  },
  productpic8: {
    type: String,
  },
  productpic9: {
    type: String,
  },
  productpic10: {
    type: String,
  },
  productpic11: {
    type: String,
  },
  productpic12: {
    type: String,
  },
  owner: {
    type: String,
  },
  ownerpicture: {
    type: String,
  },
  catagory: {
    type: String,
    required: true,
  },
  subcatagory: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Set the default value to the current date and time
  },
  isPromoted: {
    type: Boolean,
    default: false,
  },
  promotionStartDate: {
    type: Date,
  },
  promotionEndDate: {
    type: Date,
  },
  promotionPaymentId: {
    type: String,
  },
  promotionOrderId: {
    type: String,
  },
  vehicleData: {
    type: Object,  // Using Object type to store nested vehicle properties
  },
  categoryData: {
    type: Object,  // Using Object type to store nested category-specific properties
  },
  propertyData: {
    type: PropertyDataSchema,  // Using our defined schema instead of generic Object
  },
});

// Add toJSON method to ensure property data is correctly serialized
ProductSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    // If property data is missing, initialize it
    if (!ret.propertyData) {
      ret.propertyData = {};
    }
    
    // Ensure we have the correct property data structure even if MongoDB returns it in a strange format
    if (ret.propertyData && typeof ret.propertyData === 'string') {
      try {
        ret.propertyData = JSON.parse(ret.propertyData);
        console.log('Parsed propertyData from string to object');
      } catch (e) {
        console.error('Failed to parse propertyData string:', e);
        ret.propertyData = {}; // Fallback to empty object
      }
    }
    
    return ret;
  }
});

// Pre-save middleware to ensure property data is properly formatted
ProductSchema.pre('save', function(next) {
  // Log the property data before saving
  console.log('Pre-save propertyData type:', typeof this.propertyData);
  console.log('Pre-save propertyData:', this.propertyData);
  
  // If property data is a string, try to parse it
  if (this.propertyData && typeof this.propertyData === 'string') {
    try {
      this.propertyData = JSON.parse(this.propertyData);
      console.log('Parsed propertyData from string to object before saving');
    } catch (e) {
      console.error('Failed to parse propertyData string before saving:', e);
      this.propertyData = {}; // Fallback to empty object
    }
  }
  
  next();
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
