import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase';

const products = [
  // --- Products from productCards.tsx ---
  {
    name: 'iPhone 16',
    category: 'Digital Smart',
    price: 30,
    oldPrice: 70,
    discount: '30-70% OFF',
    image: '2.jpeg',
    description: 'The latest iPhone 16 with advanced camera and performance.',
    label: 'SHOP NOW',
    banner: true,
  },
  {
    name: 'iPhone 16',
    category: 'Digital Smart',
    price: 30,
    oldPrice: 70,
    discount: '30-70% OFF',
    image: '4.jpeg',
    description: 'iPhone 16 in a new color variant, perfect for tech lovers.',
    label: 'SHOP NOW',
    banner: true,
  },
  {
    name: 'Apple Watch Series',
    category: 'Electronics',
    price: 499,
    oldPrice: 599,
    image: '3.jpeg',
    description: 'Apple Watch Series with health tracking and GPS.',
  },
  {
    name: 'Apple Watch Series',
    category: 'Electronics',
    price: 499,
    oldPrice: 599,
    image: '5.jpeg',
    description: 'Apple Watch Series in stainless steel, premium design.',
  },
  {
    name: 'Apple Watch Series',
    category: 'Electronics',
    price: 499,
    oldPrice: 599,
    image: '6.jpeg',
    description: 'Apple Watch Series with cellular connectivity.',
  },
  {
    name: 'Apple Watch Series',
    category: 'Electronics',
    price: 499,
    oldPrice: 599,
    image: '7.jpeg',
    description: 'Apple Watch Series with customizable watch faces.',
  },
  {
    name: 'Apple Watch Series',
    category: 'Electronics',
    price: 499,
    oldPrice: 599,
    image: '8.jpeg',
    description: 'Apple Watch Series with long battery life.',
  },
  {
    name: 'Apple Watch Series',
    category: 'Electronics',
    price: 499,
    oldPrice: 599,
    image: '9.jpeg',
    description: 'Apple Watch Series with water resistance.',
  },
  // --- Products from BestSellingProducts.tsx ---
  {
    name: 'Apple Watch Series 5',
    category: 'Electronics',
    price: 499,
    oldPrice: 599,
    discount: '17% OFF',
    image: '18.jpg',
    description: 'Stay connected and track your health with the Apple Watch Series 5, featuring an always-on display and advanced fitness features.',
  },
  {
    name: 'Microsoft Xbox One Wireless Controller',
    category: 'Electronics',
    price: 25,
    oldPrice: 45,
    discount: '44% OFF',
    image: '11.jpeg',
    description: 'Experience precise control and comfort with the Xbox One Wireless Controller, perfect for gaming sessions with friends.',
  },
  {
    name: 'JBL On-Ear Headphones',
    category: 'Electronics',
    price: 124,
    featured: true,
    image: '12.jpeg',
    description: 'Enjoy powerful sound and deep bass with JBL On-Ear Headphones, designed for music lovers on the go.',
  },
  {
    name: 'Samsung Virtual Reality Headset',
    category: 'Electronics',
    price: 18,
    image: '13.jpeg',
    description: 'Immerse yourself in virtual worlds with the Samsung VR Headset, compatible with a wide range of devices.',
  },
  {
    name: 'Apple Watch Series 5 Black Milanese Loop',
    category: 'Electronics',
    price: 599,
    image: '14.jpg',
    description: 'Upgrade your style with the Apple Watch Series 5 Black Milanese Loop, combining elegance and technology.',
  },
  {
    name: 'Samsung Gear 360 Camera',
    category: 'Electronics',
    price: 29,
    oldPrice: 48,
    discount: '40% OFF',
    image: '15.jpg',
    description: 'Capture every angle with the Samsung Gear 360 Camera, perfect for creating immersive photos and videos.',
  },
  {
    name: 'Beats Studio3 Wireless Headphones',
    category: 'Electronics',
    price: 99,
    image: '16.jpg',
    description: 'Experience premium sound and noise cancellation with Beats Studio3 Wireless Headphones for all-day listening.',
  },
  {
    name: 'Sony Extra Bass Portable Speaker',
    category: 'Electronics',
    price: 149,
    image: '17.jpg',
    description: 'Take your music anywhere with the Sony Extra Bass Portable Speaker, featuring long battery life and waterproof design.',
  },
];

async function seedProducts() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Products seeded successfully!');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding products:', error);
    mongoose.disconnect();
  }
}

seedProducts();
