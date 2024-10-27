import React, { useState, useEffect } from "react";
import { RiDeleteBinLine } from "@remixicon/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { states, taxRates } from "../data/states.js";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [animateTotal, setAnimateTotal] = useState(false);
  const [animateTax, setAnimateTax] = useState(false);

  const addItem = () => {
    if (!name) {
      toast.error("Item name cannot be empty");
      return;
    }
    if (!cost || isNaN(cost) || parseFloat(cost) <= 0) {
      toast.error("Please enter a valid cost greater than 0");
      return;
    }

    setItems([...items, { name, cost: parseFloat(cost), isFadingOut: false }]);
    setName("");
    setCost("");
  };

  const deleteItem = (indexToDelete) => {
    setItems((prevItems) =>
      prevItems.map((item, index) =>
        index === indexToDelete ? { ...item, isFadingOut: true } : item
      )
    );
    setTimeout(() => {
      setItems((prevItems) =>
        prevItems.filter((_, index) => index !== indexToDelete)
      );
    }, 300);
  };

  const totalCost = items.reduce((acc, item) => acc + item.cost, 0);
  const taxRate = taxRates[selectedState] || 0;
  const taxAmount = totalCost * taxRate;
  const totalWithTax = totalCost + taxAmount;

  useEffect(() => {
    if (items.length > 0) {
      setAnimateTotal(true);
      const timer = setTimeout(() => setAnimateTotal(false), 300);
      return () => clearTimeout(timer);
    }
  }, [totalWithTax]);

  useEffect(() => {
    if (selectedState) {
      setAnimateTax(true);
      const timer = setTimeout(() => setAnimateTax(false), 300);
      return () => clearTimeout(timer);
    }
  }, [taxAmount]);

  return (
    <div className="max-w-md mx-auto p-6 bg-white bg-opacity-50 rounded-xl shadow-md space-y-4 cursor-default max-h-screen overflow-hidden">
      <ToastContainer position="top-left" />
      <h1 className="text-xl font-semibold text-primary">Item List</h1>
      <div className="flex space-x-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Item Name"
          className="w-3/6 p-2 border border-gray-300 text-primary font-medium rounded-lg focus:outline-none focus:ring-1 focus:ring-secondary"
        />
        <input
          type="number"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          placeholder="Cost"
          className="w-2/6 p-2 border border-gray-300 text-primary font-medium rounded-lg focus:outline-none focus:ring-1 focus:ring-secondary"
        />
        <button
          onClick={addItem}
          className="w-1/6 p-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity duration-200"
        >
          Add
        </button>
      </div>
      <ul className="space-y-2 p-4 overflow-y-auto overflow-x-hidden max-h-60 scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-200">
        {items.map((item, index) => (
          <li
            key={index}
            className={`flex justify-between items-center p-2 bg-gray-100 rounded-lg transition-all duration-300 transform hover:scale-105 opacity-100 ${
              item.isFadingOut ? "animate-fade-out" : "animate-fade-in"
            }`}
          >
            <div className="flex justify-between w-full text-primary font-medium">
              <span>{item.name}</span>
              <span>${item.cost.toFixed(2)}</span>
            </div>
            <button
              onClick={() => deleteItem(index)}
              className="ml-4 text-primary hover:text-red-600 transition-colors duration-200"
            >
              <RiDeleteBinLine className="text-lg" />
            </button>
          </li>
        ))}
      </ul>
      <div className="font-semibold text-lg text-primary transition-all duration-500">
        Total Cost:{" "}
        <span
          className={`${animateTotal ? "animate-fade-in" : "animate-fade-out"}`}
        >
          ${totalCost.toFixed(2)}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          {selectedState && (
            <div
              className={`font-semibold text-lg text-primary transition-colors duration-300 ${
                animateTax ? "animate-fade-in" : "animate-fade-out"
              }`}
            >
              Tax ({(taxRate * 100).toFixed(0)}%): ${taxAmount.toFixed(2)}
            </div>
          )}
        </div>
        <div className="flex-1">
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="w-full p-2 border font-medium border-gray-300 text-primary rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-secondary transition-all duration-200"
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option
                key={state.value}
                value={state.value}
                className="font-medium"
              >
                {state.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex gap-1 font-semibold text-lg text-primary transition-all duration-300">
        Total cost with tax:
        <div
          className={`${selectedState ? "text-primary" : "text-red-500"} ${
            animateTotal ? "animate-flash" : ""
          } transition-transform duration-300`}
        >
          {selectedState
            ? `$${totalWithTax.toFixed(2)}`
            : "Please select a state"}
        </div>
      </div>
    </div>
  );
};

export default ItemList;
