'use client';

import React, { useMemo, useState } from 'react';
import {
  Package,
  Search,
  Plus,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
} from 'lucide-react';

const inventoryData = [
  {
    id: 1,
    name: 'Wireless Headphone',
    category: 'Electronics',
    currentStock: 120,
    sold: 80,
    price: '₹2,499',
    status: 'In Stock',
  },
  {
    id: 2,
    name: 'Gaming Mouse',
    category: 'Accessories',
    currentStock: 25,
    sold: 140,
    price: '₹1,299',
    status: 'Low Stock',
  },
  {
    id: 3,
    name: 'Smart Watch',
    category: 'Wearables',
    currentStock: 75,
    sold: 60,
    price: '₹4,999',
    status: 'In Stock',
  },
  {
    id: 4,
    name: 'Bluetooth Speaker',
    category: 'Audio',
    currentStock: 10,
    sold: 95,
    price: '₹3,199',
    status: 'Low Stock',
  },
  {
    id: 5,
    name: 'Laptop Stand',
    category: 'Office',
    currentStock: 0,
    sold: 50,
    price: '₹899',
    status: 'Out of Stock',
  },
];

export default function InventoryPage() {
  const [search, setSearch] = useState('');

  const filteredProducts = useMemo(() => {
    return inventoryData.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const totalProducts = inventoryData.length;

  const totalStock = inventoryData.reduce(
    (acc, item) => acc + item.currentStock,
    0
  );

  const totalSold = inventoryData.reduce(
    (acc, item) => acc + item.sold,
    0
  );

  const lowStock = inventoryData.filter(
    (item) => item.currentStock < 30
  ).length;

  return (
    <div className="min-h-screen bg-[#f5f6fa] p-6">

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Inventory Management
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage your products and stock details
          </p>
        </div>

        <button className="flex items-center gap-2 bg-[#7441d8] hover:bg-[#6434c8] text-white px-5 py-3 rounded-xl text-sm font-semibold transition-all shadow-lg">
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">

        {/* Total Products */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Total Products
              </p>

              <h2 className="text-2xl font-bold mt-1 text-gray-900">
                {totalProducts}
              </h2>
            </div>

            <div className="w-12 h-12 rounded-xl bg-[#7441d8] flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Current Stock */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Current Quantity
              </p>

              <h2 className="text-2xl font-bold mt-1 text-gray-900">
                {totalStock}
              </h2>
            </div>

            <div className="w-12 h-12 rounded-xl bg-[#3e82ff] flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Sold */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Total Sold
              </p>

              <h2 className="text-2xl font-bold mt-1 text-gray-900">
                {totalSold}
              </h2>
            </div>

            <div className="w-12 h-12 rounded-xl bg-[#5abc68] flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Low Stock */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Low Stock
              </p>

              <h2 className="text-2xl font-bold mt-1 text-gray-900">
                {lowStock}
              </h2>
            </div>

            <div className="w-12 h-12 rounded-xl bg-[#ff9f43] flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

        {/* Table Header */}
        <div className="p-5 border-b border-gray-100 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Product Inventory
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Current stock and sold products
            </p>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 w-full lg:w-72">
            <Search className="w-4 h-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none text-sm w-full"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">

          <table className="w-full min-w-[800px]">

            <thead className="bg-gray-50">
              <tr>
                <th className="text-left text-sm font-semibold text-gray-600 px-6 py-4">
                  Product
                </th>

                <th className="text-left text-sm font-semibold text-gray-600 px-6 py-4">
                  Category
                </th>

                <th className="text-left text-sm font-semibold text-gray-600 px-6 py-4">
                  Current Qty
                </th>

                <th className="text-left text-sm font-semibold text-gray-600 px-6 py-4">
                  Sold
                </th>

                <th className="text-left text-sm font-semibold text-gray-600 px-6 py-4">
                  Price
                </th>

                <th className="text-left text-sm font-semibold text-gray-600 px-6 py-4">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {item.name}
                      </p>

                      <p className="text-xs text-gray-400">
                        Product ID #{item.id}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {item.category}
                  </td>

                  <td className="px-6 py-4">
                    <span className="font-bold text-gray-900">
                      {item.currentStock}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span className="font-bold text-[#7441d8]">
                      {item.sold}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm font-semibold text-gray-700">
                    {item.price}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.status === 'In Stock'
                          ? 'bg-green-100 text-green-700'
                          : item.status === 'Low Stock'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}