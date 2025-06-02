"use client";
import React, { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { promotions } from "@/data/promotions"; // Import promotions
import { cakes } from "@/data/cakes"; // Import cakes
import { gifts } from "@/data/gifts";
import { flowers } from "@/data/flowers";
import { catering } from "@/data/catering";
import { addons } from "@/data/addons"; // Import add-ons
import { flavors, getFlavorById } from "@/data/flavors";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

// Add custom styles for the calendar
const calendarStyles = `
  .react-calendar {
    width: 100%;
    border: none;
    font-size: 0.875rem;
  }
  .react-calendar__tile {
    padding: 0.25em 0.1em;
    font-size: 0.875rem;
    line-height: 1;
  }
  .react-calendar__month-view__days__day {
    padding: 0.1em 0;
  }
  .react-calendar__month-view__days__day > abbr {
    padding: 0.1em;
    display: inline-block;
  }
  .react-calendar__month-view__days__day > div {
    margin: 0;
    padding: 0;
  }
  .react-calendar__tile--now {
    background: #fef2f2;
  }
  .react-calendar__tile--active {
    background: #ef4444 !important;
  }
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #dc2626 !important;
  }
  .react-calendar__month-view__days__day--neighboringMonth {
    color: #9ca3af;
  }
  .react-calendar__month-view__days__day--weekend {
    color: #ef4444;
  }
  .react-calendar__navigation {
    margin-bottom: 0.5em;
  }
  .react-calendar__navigation button {
    min-width: 24px;
    padding: 0.25em;
  }
  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 0.75em;
    padding: 0.25em 0;
  }
  .react-calendar__month-view__weekdays__weekday {
    padding: 0.1em;
  }
  .react-calendar__month-view__weekdays__weekday > abbr {
    text-decoration: none;
  }
`;

// Remove the custom styles for glow animation
const customStyles = `
  .flame-container {
    position: relative;
    width: 56px;
    height: 80px;
  }

  .flame {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

function OrderContent() {
  const searchParams = useSearchParams();
  const cakeId = searchParams.get("cakeId");
  
  // Calculate date 3 days from now
  const getDefaultDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    return date;
  };
  
  const [date, setDate] = useState(getDefaultDate());
  const [productType, setProductType] = useState("cakes");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedSize, setSelectedSize] = useState("6-inch");
  const [selectedShape, setSelectedShape] = useState("round");
  const [selectedFlavor, setSelectedFlavor] = useState("");
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [customerNotes, setCustomerNotes] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerOccasion, setCustomerOccasion] = useState("");
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (cakeId && productType === "cakes") {
      const cake = cakes.find(cake => cake.id === cakeId);
      if (cake) {
        setSelectedProduct(cake.name);
        setSelectedSize(cake.defaultSize);
      }
    } else if (productType === "cakes" && cakes.length > 0) {
      setSelectedProduct(cakes[0].name);
      setSelectedSize(cakes[0].defaultSize);
    } else if (productType === "gifts" && gifts.length > 0) {
      setSelectedProduct(gifts[0].name);
    } else if (productType === "flowers" && flowers.length > 0) {
      setSelectedProduct(flowers[0].name);
    } else if (productType === "catering" && catering.length > 0) {
      setSelectedProduct(catering[0].name);
    }
  }, [cakeId, productType]);

  const getSelectedProductDetails = () => {
    switch (productType) {
      case "cakes":
        return cakes.find(cake => cake.name === selectedProduct);
      case "gifts":
        return gifts.find(gift => gift.name === selectedProduct);
      case "flowers":
        return flowers.find(flower => flower.name === selectedProduct);
      case "catering":
        return catering.find(pkg => pkg.name === selectedProduct);
      default:
        return null;
    }
  };

  const selectedProductDetails = getSelectedProductDetails();

  const toggleAddon = (addonId) => {
    setSelectedAddons(prev => 
      prev.includes(addonId)
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    );
  };

  const getSelectedAddonsDetails = () => {
    return selectedAddons.map(id => {
      const addon = Object.values(addons).flat().find(addon => addon.id === id);
      return addon;
    });
  };

  // Calculate shape price adjustment
  const getShapePriceAdjustment = () => {
    if (selectedShape === "round") return 0;
    if (selectedShape === "heart") {
      return selectedSize === "6-inch" ? 10 : 15;
    }
    if (selectedShape === "square") {
      return selectedSize === "6-inch" ? 20 : 30;
    }
    return 0;
  };

  // Calculate flavor price adjustment
  const getFlavorPriceAdjustment = () => {
    if (!selectedFlavor) return 0;
    const flavor = Object.values(flavors).flat().find(f => f.id === selectedFlavor);
    return flavor ? parseInt(flavor.price.replace(/[^0-9]/g, '')) : 0;
  };

  // Update calculateTotal to include shape and flavor price
  const calculateTotal = () => {
    let total = 0;
    
    if (productType === "cakes") {
      // Add cake price
      if (selectedProductDetails && selectedProductDetails.sizes[selectedSize]) {
        const cakePrice = parseInt(selectedProductDetails.sizes[selectedSize].replace(/[^0-9]/g, ''));
        total += cakePrice;
      }
      
      // Add shape price adjustment
      const shapeAdjustment = getShapePriceAdjustment();
      total += shapeAdjustment;

      // Add flavor price adjustment
      const flavorAdjustment = getFlavorPriceAdjustment();
      total += flavorAdjustment;
      
      // Add add-ons prices
      const selectedAddonsDetails = getSelectedAddonsDetails();
      selectedAddonsDetails.forEach(addon => {
        const addonPrice = parseInt(addon.price.replace(/[^0-9]/g, ''));
        total += addonPrice;
      });
    } else {
      // For other product types, just add their base price
      if (selectedProductDetails) {
        const price = parseInt(selectedProductDetails.price.replace(/[^0-9]/g, ''));
        total += price;
      }
    }
    
    return total;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedProductDetails) return;

    const formattedDate = date.toISOString().split("T")[0];
    const selectedAddonsDetails = getSelectedAddonsDetails();
    const selectedFlavorDetails = selectedFlavor ? getFlavorById(selectedFlavor) : null;
    
    let orderMessage = `Hello, I would like to order:\n\n`;

    if (productType === "cakes") {
      orderMessage += `  - Cake: ${selectedProductDetails.name} (${selectedSize})
  - Shape: ${selectedShape.charAt(0).toUpperCase() + selectedShape.slice(1)}
  - Flavor: ${selectedFlavorDetails ? selectedFlavorDetails.name : "Not selected"}
  - Price: ${selectedProductDetails.sizes[selectedSize]}
  ${getShapePriceAdjustment() > 0 ? `  - Shape Adjustment: RM ${getShapePriceAdjustment()}` : ""}
  ${selectedFlavorDetails && selectedFlavorDetails.price !== "RM 0" ? `  - Flavor Adjustment: ${selectedFlavorDetails.price}` : ""}
  ${selectedAddonsDetails.length > 0 ? "\n  Add-ons:" : ""}
  ${selectedAddonsDetails.map(addon => `  - ${addon.name}: ${addon.price}`).join("\n")}`;
    } else {
      orderMessage += `  - ${productType.charAt(0).toUpperCase() + productType.slice(1)}: ${selectedProductDetails.name}
  - Price: ${selectedProductDetails.price}`;
      
      if (productType === "catering") {
        orderMessage += `\n  - Minimum guests: ${selectedProductDetails.minGuests}
  - Maximum guests: ${selectedProductDetails.maxGuests}`;
      }
    }

    orderMessage += `\n  - Total Amount: RM ${calculateTotal()}
  - Delivery Date: ${formattedDate}
  - Time: 6 PM
  - Occasion: ${customerOccasion ? customerOccasion : "Not mentioned"}
  - Address: ${customerAddress ? customerAddress : "Not mentioned"}
  - Notes: ${customerNotes ? customerNotes : "Not mentioned"}`;

    // Encode the message for a URL
    const encodedMessage = encodeURIComponent(orderMessage);

    // Your WhatsApp number
    const whatsappNumber = "601111283937";

    // Open WhatsApp chat with pre-filled message
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodedMessage}`,
      "_blank"
    );
  };

  return (
    <div className="bg-pink-50 min-h-screen p-3 sm:p-6">
      <style>{calendarStyles}</style>
      <style>{customStyles}</style>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-6 sm:py-10 bg-gradient-to-r from-pink-200 to-red-200"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">Order Now</h1>
        <p className="text-base sm:text-lg text-gray-600 mt-2 sm:mt-4">
          Select your product and place your order!
        </p>
      </motion.div>

      <div className="max-w-3xl mx-auto bg-white p-4 sm:p-8 shadow-lg rounded-lg mt-3 sm:mt-6">
        {/* Product Type Selection */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Select Product Type</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { id: "cakes", label: "Cakes" },
              { id: "gifts", label: "Gifts" },
              { id: "flowers", label: "Flowers" },
              { id: "catering", label: "Catering" }
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setProductType(type.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  productType === type.id
                    ? "bg-red-500 text-white border-red-500"
                    : "bg-white text-gray-700 border-gray-300 hover:border-red-300"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Selection Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Select Your {productType.charAt(0).toUpperCase() + productType.slice(1)}</h2>
          <select
            className="w-full p-2 border rounded mb-4"
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
          >
            <option value="">-- Choose a {productType.slice(0, -1)} --</option>
            {productType === "cakes" && cakes.map((cake) => (
              <option key={cake.id} value={cake.name}>
                {cake.name}
              </option>
            ))}
            {productType === "gifts" && gifts.map((gift) => (
              <option key={gift.id} value={gift.name}>
                {gift.name}
              </option>
            ))}
            {productType === "flowers" && flowers.map((flower) => (
              <option key={flower.id} value={flower.name}>
                {flower.name}
              </option>
            ))}
            {productType === "catering" && catering.map((pkg) => (
              <option key={pkg.id} value={pkg.name}>
                {pkg.name}
              </option>
            ))}
          </select>

          {selectedProductDetails && (
            <div className="mt-4">
              <p className="text-gray-600 mb-4 text-sm italic">
                {selectedProductDetails.description}
              </p>
              <div className="relative w-full max-w-md mx-auto aspect-square rounded-lg overflow-hidden">
                <Image
                  src={selectedProductDetails.img}
                  alt={selectedProductDetails.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-xl font-semibold">{selectedProductDetails.name}</h3>
                
                {/* Cake-specific options */}
                {productType === "cakes" && (
                  <>
                    {/* Before/After Slider for Flaming Cake */}
                    {selectedProductDetails.name === "Flaming Cake" && (
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Before & After Effect
                        </label>
                        <div className="w-full max-w-md mx-auto">
                          <ReactCompareSlider
                            itemOne={<ReactCompareSliderImage src="/images/slider/s1-before.png" alt="Before flaming effect" />}
                            itemTwo={<ReactCompareSliderImage src="/images/slider/s1-after1.png" alt="After flaming effect" />}
                            className="rounded-lg"
                            style={{
                              height: '300px',
                              width: '100%',
                            }}
                            position={50}
                          />
                          <div className="flex justify-between mt-2 text-sm text-gray-600">
                            <span>Before</span>
                            <span>After</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Flavor Selection */}
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Flavor
                      </label>
                      <div className="border rounded-lg p-3">
                        <select
                          className="w-full p-2 border rounded text-sm"
                          value={selectedFlavor}
                          onChange={(e) => setSelectedFlavor(e.target.value)}
                        >
                          <option value="">-- Select a flavor --</option>
                          {Object.entries(flavors).map(([category, categoryFlavors]) => (
                            <optgroup key={category} label={`${category.charAt(0).toUpperCase() + category.slice(1)} Flavors`}>
                              {categoryFlavors.map((flavor) => (
                                <option key={flavor.id} value={flavor.id}>
                                  {flavor.name} {flavor.price !== "RM 0" ? `(${flavor.price})` : ""}
                                </option>
                              ))}
                            </optgroup>
                          ))}
                        </select>
                        {selectedFlavor && (
                          <div className="mt-2">
                            <p className="text-xs text-gray-500">
                              {getFlavorById(selectedFlavor).description}
                            </p>
                            {getFlavorById(selectedFlavor).price !== "RM 0" && (
                              <p className="text-xs font-medium text-red-600 mt-1">
                                Additional cost: {getFlavorById(selectedFlavor).price}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Shape Selection */}
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Shape
                      </label>
                      <div className="flex justify-center gap-4">
                        {[
                          {
                            shape: "round",
                            svg: (
                              <svg viewBox="0 0 24 24" className="w-8 h-8">
                                <circle cx="12" cy="12" r="10" fill="currentColor" />
                              </svg>
                            ),
                            price: 0
                          },
                          {
                            shape: "heart",
                            svg: (
                              <svg viewBox="0 0 24 24" className="w-8 h-8">
                                <path
                                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                  fill="currentColor"
                                />
                              </svg>
                            ),
                            price: selectedSize === "6-inch" ? 10 : 15
                          },
                          {
                            shape: "square",
                            svg: (
                              <svg viewBox="0 0 24 24" className="w-8 h-8">
                                <rect x="2" y="2" width="20" height="20" fill="currentColor" />
                              </svg>
                            ),
                            price: selectedSize === "6-inch" ? 20 : 30
                          }
                        ].map(({ shape, svg, price }) => (
                          <button
                            key={shape}
                            onClick={() => setSelectedShape(shape)}
                            className={`p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${
                              selectedShape === shape
                                ? "bg-red-500 text-white border-red-500"
                                : "bg-white text-gray-700 border-gray-300 hover:border-red-300"
                            }`}
                          >
                            <div className="w-12 h-12 flex items-center justify-center">
                              {svg}
                            </div>
                            <div className="text-sm capitalize">{shape}</div>
                            {price > 0 && (
                              <div className="text-xs">
                                +RM {price}
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Size Selection */}
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Size
                      </label>
                      <div className="flex justify-center gap-4">
                        {Object.entries(selectedProductDetails.sizes).map(([size, price]) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`px-6 py-2 rounded-lg border-2 transition-all ${
                              selectedSize === size
                                ? "bg-red-500 text-white border-red-500"
                                : "bg-white text-gray-700 border-gray-300 hover:border-red-300"
                            }`}
                          >
                            <div className="font-medium">{size}</div>
                            <div className="text-sm">{price}</div>
                            <div className="text-xs text-gray-500">
                              {size === "6-inch" ? "6-8 pax" : "8-10 pax"}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Catering-specific options */}
                {productType === "catering" && (
                  <div className="mt-4">
                    <div className="text-sm text-gray-600">
                      <p>Minimum guests: {selectedProductDetails.minGuests}</p>
                      <p>Maximum guests: {selectedProductDetails.maxGuests}</p>
                    </div>
                    <div className="mt-4">
                      <h4 className="font-medium text-gray-800">Menu Includes:</h4>
                      <ul className="mt-2 space-y-1">
                        {selectedProductDetails.menu.map((item) => (
                          <li key={item} className="text-gray-600 text-sm">
                            • {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Gifts-specific options */}
                {productType === "gifts" && (
                  <div className="mt-4">
                    <div className="mt-4">
                      <h4 className="font-medium text-gray-800">Contents:</h4>
                      <ul className="mt-2 space-y-1">
                        {selectedProductDetails.contents.map((item) => (
                          <li key={item} className="text-gray-600 text-sm">
                            • {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Flowers-specific options */}
                {productType === "flowers" && (
                  <div className="mt-4">
                    <div className="mt-4">
                      <h4 className="font-medium text-gray-800">Features:</h4>
                      <ul className="mt-2 space-y-1">
                        {selectedProductDetails.features.map((feature) => (
                          <li key={feature} className="text-gray-600 text-sm">
                            • {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Add-ons Section (only for cakes) */}
        {productType === "cakes" && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-6">Add-ons</h2>
            
            {/* Flowers Section */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-3">Flowers</h3>
              <div className="relative">
                <div className="overflow-x-auto pb-2 hide-scrollbar">
                  <div className="flex gap-2 min-w-min">
                    {addons.flowers.map((addon) => (
                      <button
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`flex-none w-36 sm:w-48 p-2 sm:p-3 rounded-lg border-2 transition-all ${
                          selectedAddons.includes(addon.id)
                            ? "bg-red-50 border-red-500"
                            : "bg-white border-gray-200 hover:border-red-300"
                        }`}
                      >
                        <div className="relative w-full aspect-square mb-1.5 sm:mb-2 rounded-lg overflow-hidden">
                          <Image
                            src={addon.img}
                            alt={addon.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="text-left">
                          <h4 className="font-medium text-gray-900 text-xs sm:text-sm">{addon.name}</h4>
                          <p className="text-[10px] sm:text-xs text-gray-600 mt-0.5">{addon.description}</p>
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-[10px] sm:text-xs font-medium text-red-600">{addon.price}</p>
                            <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 flex items-center justify-center ${
                              selectedAddons.includes(addon.id)
                                ? "bg-red-500 border-red-500"
                                : "border-gray-300"
                            }`}>
                              {selectedAddons.includes(addon.id) && (
                                <svg className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Decorations Section */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-3">Decorations</h3>
              <div className="relative">
                <div className="overflow-x-auto pb-2 hide-scrollbar">
                  <div className="flex gap-2 min-w-min">
                    {addons.decorations.map((addon) => (
                      <button
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`flex-none w-36 sm:w-48 p-2 sm:p-3 rounded-lg border-2 transition-all ${
                          selectedAddons.includes(addon.id)
                            ? "bg-red-50 border-red-500"
                            : "bg-white border-gray-200 hover:border-red-300"
                        }`}
                      >
                        <div className="relative w-full aspect-square mb-1.5 sm:mb-2 rounded-lg overflow-hidden">
                          <Image
                            src={addon.img}
                            alt={addon.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="text-left">
                          <h4 className="font-medium text-gray-900 text-xs sm:text-sm">{addon.name}</h4>
                          <p className="text-[10px] sm:text-xs text-gray-600 mt-0.5">{addon.description}</p>
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-[10px] sm:text-xs font-medium text-red-600">{addon.price}</p>
                            <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 flex items-center justify-center ${
                              selectedAddons.includes(addon.id)
                                ? "bg-red-500 border-red-500"
                                : "border-gray-300"
                            }`}>
                              {selectedAddons.includes(addon.id) && (
                                <svg className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Total Amount Display */}
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-800">Total Amount:</h3>
            <span className="text-2xl font-bold text-red-600">RM {calculateTotal()}</span>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            {productType === "cakes" && selectedProductDetails && (
              <>
                <div className="flex justify-between">
                  <span>{selectedProductDetails.name} ({selectedSize})</span>
                  <span>{selectedProductDetails.sizes[selectedSize]}</span>
                </div>
                {selectedShape !== "round" && (
                  <div className="flex justify-between">
                    <span>Shape Adjustment ({selectedShape})</span>
                    <span>RM {getShapePriceAdjustment()}</span>
                  </div>
                )}
                {selectedFlavor && (
                  <div className="flex justify-between">
                    <span>Flavor ({getFlavorById(selectedFlavor).name})</span>
                    <span>{getFlavorById(selectedFlavor).price}</span>
                  </div>
                )}
                {getSelectedAddonsDetails().map(addon => (
                  <div key={addon.id} className="flex justify-between">
                    <span>{addon.name}</span>
                    <span>{addon.price}</span>
                  </div>
                ))}
              </>
            )}
            {productType !== "cakes" && selectedProductDetails && (
              <div className="flex justify-between">
                <span>{selectedProductDetails.name}</span>
                <span>{selectedProductDetails.price}</span>
              </div>
            )}
          </div>
        </div>

        {/* Delivery Date Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Choose Delivery Date</h2>
          <Calendar
            onChange={setDate}
            value={date}
            className="custom-calendar w-full"
            style={{ width: '100%', height: 'auto' }}
            tileContent={({ date }) => {
              const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
              return promotions[key] ? (
                <p className="text-[9px] sm:text-xs text-red-500 font-semibold whitespace-normal break-words px-0 sm:px-0.5 leading-tight">
                  {promotions[key]}
                </p>
              ) : null;
            }}
          />
          {promotions[`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`] && (
            <p className="mt-1 sm:mt-2 text-sm sm:text-lg font-semibold text-red-600">
              {promotions[`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`]}
            </p>
          )}
        </div>

        {/* Order Details Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
          <h4 className="text-md font-semibold mt-1 mb-1">Occasion</h4>
          <input
            type="text"
            placeholder="e.g., Birthday, Wedding, Anniversary"
            className="w-full p-2 border rounded mb-3"
            value={customerOccasion}
            onChange={(e) => setCustomerOccasion(e.target.value)}
          />
          <h4 className="text-md font-semibold mt-1 mb-1">Address / Area</h4>
          <input
            type="text"
            placeholder="Delivery Address"
            className="w-full p-2 border rounded mb-3"
            value={customerAddress}
            onChange={(e) => setCustomerAddress(e.target.value)}
          />
          <h4 className="text-md font-semibold mt-1 mb-1">Notes</h4>
          <input
            type="tel"
            placeholder="Urgent!"
            className="w-full p-2 border rounded mb-3"
            value={customerNotes}
            onChange={(e) => setCustomerNotes(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            disabled={!selectedProductDetails}
            className="mt-6 bg-red-500 text-white px-6 py-3 rounded-xl w-full hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Place Order
          </button>
          <div>
            <h4 className="text-sm mt-1 mb-1">
              Payment should only made to Vbake or TnG +6014 xxxxxxx
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderNow() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800">Loading...</h2>
          <p className="text-gray-600 mt-2">Please wait while we prepare your order form</p>
        </div>
      </div>
    }>
      <OrderContent />
    </Suspense>
  );
}

