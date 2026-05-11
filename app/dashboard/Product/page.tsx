"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart, Trash2, Plus, Minus, Tag, ChevronRight,
  Package, Shield, RotateCcw, Truck, X, Star, Heart,
  ArrowLeft, CheckCircle, ChevronDown,
} from "lucide-react";



interface ProductVariant {
  label: string;
  stock: number;
  priceModifier?: number;
}

interface CartItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  quantity: number;
  image: string;
  size: string;
  color: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  category: string;
  variants: ProductVariant[];
  selectedVariant: string;
}

interface SuggestedProduct {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  rating: number;
  category: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    brand: "SoundMax Pro",
    price: 2499,
    originalPrice: 3999,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
    size: "One Size",
    color: "Midnight Black",
    rating: 4.5,
    reviews: 2341,
    inStock: true,
    category: "Electronics",
    variants: [
      { label: "Sony WH-1000XM5", stock: 12 },
      { label: "Sony WH-1000XM4", stock: 5 },
      { label: "Sony WF-1000XM4", stock: 0 },
      { label: "SoundMax Ultra", stock: 34 },
    ],
    selectedVariant: "Sony WH-1000XM5",
  },
  {
    id: 2,
    name: "Running Shoes Ultra Boost",
    brand: "SpeedFit",
    price: 3799,
    originalPrice: 5999,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop",
    size: "UK 9",
    color: "Electric Blue",
    rating: 4.8,
    reviews: 876,
    inStock: true,
    category: "Footwear",
    variants: [
      { label: "UK 7", stock: 8 },
      { label: "UK 8", stock: 3 },
      { label: "UK 9", stock: 15 },
      { label: "UK 10", stock: 2 },
      { label: "UK 11", stock: 0 },
    ],
    selectedVariant: "UK 9",
  },
  {
    id: 3,
    name: "Smart Watch Series X",
    brand: "TechWear",
    price: 8999,
    originalPrice: 12999,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop",
    size: "44mm",
    color: "Silver",
    rating: 4.6,
    reviews: 1234,
    inStock: true,
    category: "Wearables",
    variants: [
      { label: "40mm - Black", stock: 7 },
      { label: "44mm - Silver", stock: 4 },
      { label: "44mm - Gold", stock: 1 },
      { label: "48mm - Black", stock: 0 },
    ],
    selectedVariant: "44mm - Silver",
  },
  {
    id: 4,
    name: "Leather Crossbody Bag",
    brand: "LuxCraft",
    price: 1899,
    originalPrice: 2799,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&h=200&fit=crop",
    size: "Medium",
    color: "Caramel Brown",
    rating: 4.3,
    reviews: 567,
    inStock: false,
    category: "Bags",
    variants: [
      { label: "Small - Black", stock: 0 },
      { label: "Medium - Brown", stock: 0 },
      { label: "Large - Tan", stock: 2 },
    ],
    selectedVariant: "Medium - Brown",
  },
];

const suggestedProducts: SuggestedProduct[] = [
  { id: 10, name: "Wireless Earbuds", brand: "SoundMax", price: 1299, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&h=200&fit=crop", rating: 4.4, category: "Electronics" },
  { id: 11, name: "Fitness Band", brand: "TechWear", price: 2199, image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=200&h=200&fit=crop", rating: 4.2, category: "Wearables" },
  { id: 12, name: "Sunglasses Pro", brand: "ViewCraft", price: 999, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200&h=200&fit=crop", rating: 4.6, category: "Accessories" },
  { id: 13, name: "Backpack Urban", brand: "CarryAll", price: 1599, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop", rating: 4.5, category: "Bags" },
];

const VALID_COUPONS: Record<string, number> = {
  SAVE10: 10,
  FLAT200: 200,
  NEWUSER: 15,
};

const CATEGORY_COLORS: Record<string, string> = {
  Electronics: "bg-blue-900 text-blue-300 border-blue-700",
  Footwear:    "bg-orange-900 text-orange-300 border-orange-700",
  Wearables:   "bg-purple-900 text-purple-300 border-purple-700",
  Bags:        "bg-amber-900 text-amber-300 border-amber-700",
  Accessories: "bg-teal-900 text-teal-300 border-teal-700",
};

// ─── Star Rating ──────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} className={`w-3 h-3 ${star <= Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}`} />
      ))}
    </div>
  );
}

// ─── Variant Dropdown ─────────────────────────────────────────────────────────

function VariantDropdown({
  variants,
  selected,
  onSelect,
}: {
  variants: ProductVariant[];
  selected: string;
  onSelect: (label: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const current = variants.find((v) => v.label === selected);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 bg-gray-800 border border-gray-700 hover:border-blue-500
                   rounded-lg px-3 py-1.5 text-xs text-gray-300 transition-colors w-full max-w-[220px]"
      >
        <span className="flex-1 text-left truncate font-medium">{selected}</span>
        {current && (
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ml-1 flex-shrink-0 ${
            current.stock === 0
              ? "bg-red-900 text-red-400"
              : current.stock <= 5
              ? "bg-yellow-900 text-yellow-400"
              : "bg-green-900 text-green-400"
          }`}>
            {current.stock === 0 ? "Out" : `${current.stock} left`}
          </span>
        )}
        <ChevronDown className={`w-3 h-3 text-gray-500 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-gray-800 border border-gray-700
                        rounded-xl shadow-2xl z-30 overflow-hidden">
          <div className="px-3 py-2 border-b border-gray-700">
            <p className="text-gray-400 text-[10px] uppercase tracking-wider font-semibold">Select Variant</p>
          </div>
          <div className="max-h-48 overflow-y-auto py-1">
            {variants.map((v) => (
              <button
                key={v.label}
                onClick={() => { onSelect(v.label); setOpen(false); }}
                disabled={v.stock === 0}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-xs
                            hover:bg-gray-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed
                            ${selected === v.label ? "bg-blue-900/50 text-blue-300" : "text-gray-300"}`}
              >
                <span className="font-medium">{v.label}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  v.stock === 0
                    ? "bg-red-900 text-red-400"
                    : v.stock <= 5
                    ? "bg-yellow-900 text-yellow-400"
                    : "bg-green-900 text-green-400"
                }`}>
                  {v.stock === 0 ? "Out of stock" : `${v.stock} remaining`}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Product Info Box ─────────────────────────────────────────────────────────

function ProductInfoBox({ item }: { item: CartItem }) {
  const discount = Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100);
  const categoryStyle = CATEGORY_COLORS[item.category] || "bg-gray-800 text-gray-300 border-gray-600";

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden">
      {/* Header stripe */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-2.5 border-b border-gray-700 flex items-center justify-between">
        <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Product Details</span>
        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${categoryStyle}`}>
          {item.category}
        </span>
      </div>

      <div className="p-4 flex gap-4">
        {/* Image */}
        <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-800 flex-shrink-0 border border-gray-700">
          <Image src={item.image} alt={item.name} fill className="object-cover" unoptimized />
          {discount > 0 && (
            <span className="absolute top-1 left-1 bg-green-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md">
              -{discount}%
            </span>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-gray-500 text-[10px] font-semibold uppercase tracking-wider">{item.brand}</p>
          <h4 className="text-white font-bold text-sm mt-0.5 leading-snug">{item.name}</h4>
          <div className="flex items-center gap-2 mt-1">
            <StarRating rating={item.rating} />
            <span className="text-gray-500 text-[10px]">({item.reviews.toLocaleString()})</span>
          </div>

          {/* Price row */}
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span className="text-white font-extrabold text-base">₹{item.price.toLocaleString()}</span>
            <span className="text-gray-600 text-xs line-through">₹{item.originalPrice.toLocaleString()}</span>
            {discount > 0 && (
              <span className="text-green-400 text-[10px] font-bold bg-green-950 px-1.5 py-0.5 rounded-md">
                {discount}% OFF
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Cart Item Card ───────────────────────────────────────────────────────────

function CartItemCard({
  item,
  onQuantityChange,
  onRemove,
  onMoveToWishlist,
  onVariantChange,
}: {
  item: CartItem;
  onQuantityChange: (id: number, qty: number) => void;
  onRemove: (id: number) => void;
  onMoveToWishlist: (id: number) => void;
  onVariantChange: (id: number, variant: string) => void;
}) {
  const discount = Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100);

  return (
    <div className={`bg-gray-900 rounded-2xl border p-4 transition-all duration-200
                     ${item.inStock ? "border-gray-800" : "border-red-900"}`}>
      <div className="flex gap-4">

        {/* Image */}
        <div className="relative w-28 h-28 rounded-xl overflow-hidden bg-gray-800 flex-shrink-0">
          <Image src={item.image} alt={item.name} fill className="object-cover" unoptimized />
          {!item.inStock && (
            <div className="absolute inset-0 bg-gray-950/70 flex items-center justify-center">
              <span className="text-red-400 text-xs font-bold text-center px-1">Out of Stock</span>
            </div>
          )}
          {discount > 0 && (
            <span className="absolute top-1.5 left-1.5 bg-green-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-lg">
              -{discount}%
            </span>
          )}
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">{item.brand}</p>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border
                              ${CATEGORY_COLORS[item.category] || "bg-gray-800 text-gray-300 border-gray-600"}`}>
              {item.category}
            </span>
          </div>
          <h3 className="text-white font-semibold text-sm mt-0.5 leading-snug">{item.name}</h3>

          <div className="flex items-center gap-2 mt-1">
            <StarRating rating={item.rating} />
            <span className="text-gray-500 text-xs">({item.reviews.toLocaleString()})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span className="text-white font-bold text-base">₹{(item.price * item.quantity).toLocaleString()}</span>
            <span className="text-gray-600 text-sm line-through">₹{(item.originalPrice * item.quantity).toLocaleString()}</span>
            <span className="text-green-400 text-xs font-semibold">
              Save ₹{((item.originalPrice - item.price) * item.quantity).toLocaleString()}
            </span>
          </div>

          {/* ── Variant Dropdown ── */}
          <div className="mt-3">
            <p className="text-gray-500 text-[10px] uppercase tracking-wider font-semibold mb-1.5">
              Select Variant
            </p>
            <VariantDropdown
              variants={item.variants}
              selected={item.selectedVariant}
              onSelect={(v) => onVariantChange(item.id, v)}
            />
          </div>
        </div>

        {/* Remove */}
        <button
          onClick={() => onRemove(item.id)}
          className="w-8 h-8 rounded-xl bg-gray-800 flex items-center justify-center
                     hover:bg-red-900 hover:text-red-400 text-gray-500 transition-colors flex-shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* ── Product Info Box ── */}
      <div className="mt-4">
        <ProductInfoBox item={item} />
      </div>

      {/* Bottom Row */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-800">
        {/* Quantity */}
        <div className="flex items-center gap-1 bg-gray-800 rounded-xl p-1">
          <button
            onClick={() => onQuantityChange(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400
                       hover:bg-gray-700 hover:text-white transition-colors
                       disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-8 text-center text-white font-bold text-sm">{item.quantity}</span>
          <button
            onClick={() => onQuantityChange(item.id, item.quantity + 1)}
            disabled={item.quantity >= 10}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400
                       hover:bg-gray-700 hover:text-white transition-colors
                       disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onMoveToWishlist(item.id)}
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-pink-400
                       transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-800"
          >
            <Heart className="w-3.5 h-3.5" />
            Wishlist
          </button>
          <button
            onClick={() => onRemove(item.id)}
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-red-400
                       transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-800"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Remove
          </button>
        </div>
      </div>

      {!item.inStock && (
        <div className="mt-3 flex items-center gap-2 bg-red-950 border border-red-900 rounded-xl px-3 py-2">
          <X className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
          <p className="text-red-400 text-xs">This item is currently out of stock. Remove it to proceed.</p>
        </div>
      )}
    </div>
  );
}

// ─── Add Product Modal ────────────────────────────────────────────────────────

function AddProductModal({ onClose, onAdd }: { onClose: () => void; onAdd: (p: SuggestedProduct) => void }) {
  return (
    <div className="fixed inset-0 bg-gray-950/80 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-lg">
        <div className="flex items-center justify-between p-5 border-b border-gray-800">
          <h2 className="text-white font-bold text-lg">Add More Items</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-xl bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-5">
          <p className="text-gray-500 text-sm mb-4">Frequently bought together</p>
          <div className="grid grid-cols-2 gap-3">
            {suggestedProducts.map((product) => (
              <div key={product.id} className="bg-gray-800 rounded-xl p-3 flex flex-col gap-2 border border-gray-700 hover:border-blue-600 transition-colors">
                <div className="relative w-full h-24 rounded-lg overflow-hidden bg-gray-700">
                  <Image src={product.image} alt={product.name} fill className="object-cover" unoptimized />
                </div>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border w-fit
                                  ${CATEGORY_COLORS[product.category] || "bg-gray-700 text-gray-300 border-gray-600"}`}>
                  {product.category}
                </span>
                <p className="text-gray-400 text-xs">{product.brand}</p>
                <p className="text-white text-xs font-semibold leading-snug line-clamp-2">{product.name}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-white font-bold text-sm">₹{product.price.toLocaleString()}</span>
                  <button
                    onClick={() => { onAdd(product); onClose(); }}
                    className="flex items-center gap-1 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-colors"
                  >
                    <Plus className="w-3 h-3" /> Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Empty Cart ───────────────────────────────────────────────────────────────

function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-24 h-24 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center mb-6">
        <ShoppingCart className="w-10 h-10 text-gray-700" />
      </div>
      <h2 className="text-white font-bold text-2xl mb-2">Your cart is empty</h2>
      <p className="text-gray-500 text-sm mb-8">Looks like you haven&apos;t added anything yet.</p>
      <Link href="/" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-3 rounded-xl transition-colors flex items-center gap-2">
        <ArrowLeft className="w-4 h-4" />
        Continue Shopping
      </Link>
    </div>
  );
}

// ─── Main Cart Page ───────────────────────────────────────────────────────────

export default function CartPage() {
  const [cartItems, setCartItems]         = useState<CartItem[]>(initialCartItems);
  const [couponCode, setCouponCode]       = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError]     = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");
  const [showAddModal, setShowAddModal]   = useState(false);
  const [wishlist, setWishlist]           = useState<number[]>([]);

  // ── Calculations ────────────────────────────────────────────────────────────
  const subtotal       = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const originalTotal  = cartItems.reduce((sum, i) => sum + i.originalPrice * i.quantity, 0);
  const productDiscount = originalTotal - subtotal;
  const deliveryCharge  = subtotal > 5000 ? 0 : 99;
  const totalItems      = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const hasOutOfStock   = cartItems.some((i) => !i.inStock);

  let couponDiscount = 0;
  if (appliedCoupon) {
    const val = VALID_COUPONS[appliedCoupon];
    couponDiscount = val <= 100 ? Math.round((subtotal * val) / 100) : val;
  }
  const grandTotal = subtotal + deliveryCharge - couponDiscount;

  // ── Handlers ────────────────────────────────────────────────────────────────
  const handleQuantityChange = (id: number, qty: number) => {
    if (qty < 1 || qty > 10) return;
    setCartItems((prev) => prev.map((i) => i.id === id ? { ...i, quantity: qty } : i));
  };

  const handleRemove = (id: number) =>
    setCartItems((prev) => prev.filter((i) => i.id !== id));

  const handleMoveToWishlist = (id: number) => {
    setWishlist((prev) => [...prev, id]);
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleVariantChange = (id: number, variant: string) =>
    setCartItems((prev) => prev.map((i) => i.id === id ? { ...i, selectedVariant: variant } : i));

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (!code) { setCouponError("Please enter a coupon code."); return; }
    if (VALID_COUPONS[code]) {
      setAppliedCoupon(code);
      setCouponSuccess(`Coupon "${code}" applied successfully!`);
      setCouponError("");
    } else {
      setCouponError("Invalid coupon code. Try SAVE10, FLAT200, or NEWUSER.");
      setCouponSuccess("");
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null); setCouponCode("");
    setCouponError(""); setCouponSuccess("");
  };

  const handleAddProduct = (product: SuggestedProduct) => {
    const existing = cartItems.find((i) => i.id === product.id);
    if (existing) {
      handleQuantityChange(product.id, existing.quantity + 1);
    } else {
      setCartItems((prev) => [...prev, {
        id: product.id, name: product.name, brand: product.brand,
        price: product.price, originalPrice: Math.round(product.price * 1.3),
        quantity: 1, image: product.image, size: "One Size", color: "Default",
        rating: product.rating, reviews: 100, inStock: true,
        category: product.category,
        variants: [
          { label: "Option A", stock: 10 },
          { label: "Option B", stock: 3 },
          { label: "Option C", stock: 0 },
        ],
        selectedVariant: "Option A",
      }]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {showAddModal && (
        <AddProductModal onClose={() => setShowAddModal(false)} onAdd={handleAddProduct} />
      )}

      {/* Header */}
      <header className="bg-gray-950 border-b border-gray-800 px-6 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-9 h-9 rounded-xl bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors text-gray-400 hover:text-white">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="text-white font-bold text-lg leading-none">Shopping Cart</h1>
              <p className="text-gray-500 text-xs mt-0.5">{totalItems} item{totalItems !== 1 ? "s" : ""} in your cart</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {wishlist.length > 0 && (
              <div className="flex items-center gap-1.5 text-pink-400 text-sm font-medium">
                <Heart className="w-4 h-4 fill-pink-400" />
                {wishlist.length} in wishlist
              </div>
            )}
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm px-4 py-2 rounded-xl transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Items
            </button>
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {cartItems.length === 0 ? <EmptyCart /> : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left: Cart Items */}
            <div className="lg:col-span-2 flex flex-col gap-4">

              {/* Free delivery progress */}
              {subtotal < 5000 ? (
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Truck className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-300">
                        Add <span className="text-blue-400 font-bold">₹{(5000 - subtotal).toLocaleString()}</span> more for FREE delivery
                      </span>
                    </div>
                    <span className="text-gray-500 text-xs">{Math.round((subtotal / 5000) * 100)}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full transition-all duration-500"
                         style={{ width: `${Math.min((subtotal / 5000) * 100, 100)}%` }} />
                  </div>
                </div>
              ) : (
                <div className="bg-green-950 border border-green-800 rounded-2xl px-4 py-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span className="text-green-400 text-sm font-medium">🎉 You&apos;ve unlocked FREE delivery!</span>
                </div>
              )}

              {/* Cart Items */}
              {cartItems.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemove}
                  onMoveToWishlist={handleMoveToWishlist}
                  onVariantChange={handleVariantChange}
                />
              ))}

              {/* Add More */}
              <button
                onClick={() => setShowAddModal(true)}
                className="w-full border-2 border-dashed border-gray-700 hover:border-blue-600 rounded-2xl py-4
                           flex items-center justify-center gap-2 text-gray-500 hover:text-blue-400 transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span className="font-medium text-sm">Add more items to your cart</span>
              </button>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Shield,    label: "Secure Payment", sub: "100% protected"     },
                  { icon: RotateCcw, label: "Easy Returns",   sub: "30 day policy"      },
                  { icon: Package,   label: "Fast Delivery",  sub: "2-5 business days"  },
                ].map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="bg-gray-900 border border-gray-800 rounded-xl p-3 flex flex-col items-center text-center gap-1.5">
                    <Icon className="w-5 h-5 text-blue-400" />
                    <span className="text-white text-xs font-semibold">{label}</span>
                    <span className="text-gray-500 text-xs">{sub}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Order Summary */}
            <div className="flex flex-col gap-4">

              {/* Coupon */}
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-4 h-4 text-blue-400" />
                  <h3 className="text-white font-semibold text-sm">Apply Coupon</h3>
                </div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-green-950 border border-green-800 rounded-xl px-4 py-3">
                    <div>
                      <p className="text-green-400 font-bold text-sm">{appliedCoupon}</p>
                      <p className="text-green-600 text-xs mt-0.5">You save ₹{couponDiscount.toLocaleString()}</p>
                    </div>
                    <button onClick={handleRemoveCoupon} className="text-gray-500 hover:text-red-400 transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => { setCouponCode(e.target.value.toUpperCase()); setCouponError(""); }}
                        onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                        className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500"
                      />
                      <button onClick={handleApplyCoupon} className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition-colors whitespace-nowrap">
                        Apply
                      </button>
                    </div>
                    {couponError   && <p className="text-red-400 text-xs mt-2">{couponError}</p>}
                    {couponSuccess && <p className="text-green-400 text-xs mt-2">{couponSuccess}</p>}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {Object.keys(VALID_COUPONS).map((code) => (
                        <button key={code} onClick={() => { setCouponCode(code); setCouponError(""); }}
                          className="text-blue-400 text-xs border border-blue-900 bg-blue-950 px-2.5 py-1 rounded-lg hover:bg-blue-900 transition-colors font-medium">
                          {code}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Price Summary */}
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
                <h3 className="text-white font-bold text-base mb-4">Price Details</h3>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Price ({totalItems} items)</span>
                    <span className="text-white">₹{originalTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Product Discount</span>
                    <span className="text-green-400">− ₹{productDiscount.toLocaleString()}</span>
                  </div>
                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Coupon ({appliedCoupon})</span>
                      <span className="text-green-400">− ₹{couponDiscount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Delivery Charges</span>
                    <span className={deliveryCharge === 0 ? "text-green-400 font-medium" : "text-white"}>
                      {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
                    </span>
                  </div>
                  <div className="border-t border-gray-800 pt-3 mt-1">
                    <div className="flex justify-between">
                      <span className="text-white font-bold">Total Amount</span>
                      <span className="text-white font-bold text-lg">₹{grandTotal.toLocaleString()}</span>
                    </div>
                    <p className="text-green-400 text-xs mt-1 text-right">
                      You save ₹{(productDiscount + couponDiscount).toLocaleString()} on this order
                    </p>
                  </div>
                </div>
              </div>

              {/* Checkout */}
              <button
                disabled={hasOutOfStock}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:cursor-not-allowed
                           text-white font-bold text-base py-4 rounded-2xl transition-colors flex items-center justify-center gap-2"
              >
                Proceed to Checkout
                <ChevronRight className="w-5 h-5" />
              </button>

              {hasOutOfStock && (
                <p className="text-red-400 text-xs text-center">Please remove out-of-stock items to proceed.</p>
              )}

              <p className="text-gray-600 text-xs text-center flex items-center justify-center gap-1">
                <Shield className="w-3 h-3" />
                Safe & Secure Checkout
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}