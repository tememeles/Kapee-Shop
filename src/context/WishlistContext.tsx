import React, { createContext, useState, useEffect } from 'react';

export interface WishlistItem {
  _id: string;
  productId?: string; // For best selling products
  productname: string;
  productdescrib: string;
  productprice: number;
  category: string;
  image: string;
  source: 'product' | 'bestselling'; // To track where it came from
  discount?: number;
  label?: string;
  salesCount?: number; // For best selling products
  addedAt?: string; // When item was added to wishlist
}

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (itemId: string) => void;
  isInWishlist: (itemId: string) => boolean;
  clearWishlist: () => void;
  wishlistCount: number;
}

export const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  console.log('🚀 WishlistProvider initialized');

  // Load wishlist from localStorage on mount
  useEffect(() => {
    console.log('📥 Loading wishlist from localStorage');
    const savedWishlist = localStorage.getItem('kapee-wishlist');
    if (savedWishlist) {
      try {
        const parsedWishlist = JSON.parse(savedWishlist);
        console.log('✅ Wishlist loaded from localStorage:', parsedWishlist);
        setWishlistItems(parsedWishlist);
      } catch (error) {
        console.error('❌ Error loading wishlist from localStorage:', error);
      }
    } else {
      console.log('ℹ️ No saved wishlist found in localStorage');
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    console.log('💾 Saving wishlist to localStorage:', wishlistItems);
    localStorage.setItem('kapee-wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (item: WishlistItem) => {
    console.log('🔥 Adding to wishlist:', item);
    setWishlistItems(prev => {
      // Check if item already exists
      const exists = prev.some(existingItem => existingItem._id === item._id);
      if (exists) {
        console.log('❌ Item already exists in wishlist');
        return prev; // Don't add duplicates
      }
      const newItem = { ...item, addedAt: new Date().toISOString() };
      console.log('✅ Item added to wishlist:', newItem);
      return [...prev, newItem];
    });
  };

  const removeFromWishlist = (itemId: string) => {
    setWishlistItems(prev => prev.filter(item => item._id !== itemId));
  };

  const isInWishlist = (itemId: string) => {
    return wishlistItems.some(item => item._id === itemId);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const wishlistCount = wishlistItems.length;

  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      clearWishlist,
      wishlistCount
    }}>
      {children}
    </WishlistContext.Provider>
  );
};