import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Filter, X } from 'lucide-react';
import { ProductCard } from '@/app/components/ProductCard';
import { products, categories } from '@/data/products';
import { Slider } from '@/app/components/ui/slider';

interface ProductListingPageProps {
  onNavigate: (page: string) => void;
}

export const ProductListingPage: React.FC<ProductListingPageProps> = ({ onNavigate }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 2000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(true);

  const brands = Array.from(new Set(products.map((p) => p.brand)));

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesBrand =
        selectedBrands.length === 0 || selectedBrands.includes(product.brand);

      return matchesCategory && matchesPrice && matchesBrand;
    });

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'new':
        filtered.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // popular - keep original order
        break;
    }

    return filtered;
  }, [selectedCategories, priceRange, selectedBrands, sortBy]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 2000]);
    setSelectedBrands([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl mb-2">Shop All Products</h1>
          <p className="text-gray-600">
            {filteredAndSortedProducts.length} products available
          </p>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <motion.div
            className={`${
              showFilters ? 'block' : 'hidden'
            } w-full md:w-64 flex-shrink-0 bg-white p-6 rounded-lg shadow-sm h-fit sticky top-28`}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filters
              </h3>
              <button
                onClick={clearFilters}
                className="text-sm text-rose-600 hover:underline"
              >
                Clear All
              </button>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h4 className="text-sm text-gray-500 mb-3">CATEGORIES</h4>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.name)}
                      onChange={() => toggleCategory(category.name)}
                      className="w-4 h-4 text-rose-600 border-gray-300 rounded focus:ring-rose-500"
                    />
                    <span className="text-sm text-gray-700">{category.name}</span>
                    <span className="text-xs text-gray-400 ml-auto">({category.count})</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h4 className="text-sm text-gray-500 mb-3">PRICE RANGE</h4>
              <Slider
                min={0}
                max={2000}
                step={50}
                value={priceRange}
                onValueChange={setPriceRange}
                className="mb-4"
              />
              <div className="flex items-center justify-between text-sm text-gray-700">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>

            {/* Brands */}
            <div className="mb-6">
              <h4 className="text-sm text-gray-500 mb-3">BRANDS</h4>
              <div className="space-y-2">
                {brands.map((brand) => (
                  <label key={brand} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                      className="w-4 h-4 text-rose-600 border-gray-300 rounded focus:ring-rose-500"
                    />
                    <span className="text-sm text-gray-700">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rating Filter */}
            <div className="mb-6">
              <h4 className="text-sm text-gray-500 mb-3">RATING</h4>
              <div className="space-y-2">
                {[4, 3, 2, 1].map((rating) => (
                  <label key={rating} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-rose-600 border-gray-300 rounded focus:ring-rose-500"
                    />
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                      <span className="text-sm text-gray-600 ml-1">& up</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort and Toggle */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-500 cursor-pointer"
                >
                  <option value="popular">Popular</option>
                  <option value="new">New Arrivals</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">View:</span>
                <button className="p-2 bg-rose-600 text-white rounded">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button className="p-2 hover:bg-gray-100 rounded">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Active Filters */}
            {(selectedCategories.length > 0 || selectedBrands.length > 0) && (
              <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                <div className="flex items-center flex-wrap gap-2">
                  <span className="text-sm text-gray-600">Active filters:</span>
                  {selectedCategories.map((cat) => (
                    <motion.button
                      key={cat}
                      className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm flex items-center gap-2"
                      onClick={() => toggleCategory(cat)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {cat}
                      <X className="w-3 h-3" />
                    </motion.button>
                  ))}
                  {selectedBrands.map((brand) => (
                    <motion.button
                      key={brand}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-2"
                      onClick={() => toggleBrand(brand)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {brand}
                      <X className="w-3 h-3" />
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Products */}
            {filteredAndSortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetails={() => onNavigate(`product-${product.id}`)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg mb-4">No products found</p>
                <button
                  onClick={clearFilters}
                  className="text-rose-600 hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
