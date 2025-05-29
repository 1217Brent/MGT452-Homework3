"use client";

import React, { useState } from "react";
import { probit } from "simple-statistics";

interface Recipe {
  name: string;
  mu: number;
  sigma: number;
  price: number;
  cost: number;
  lambda?: number;
  expectedProfitPerRecipe?: number;
}

const initialRecipes: Recipe[] = [
  { name: "Cookie1", mu: 200, sigma: 50, price: 25, cost: 14 },
  { name: "Cookie2", mu: 150, sigma: 40, price: 27, cost: 16 },
  { name: "Cookie3", mu: 100, sigma: 30, price: 22, cost: 13 },
];

export default function Homework3() {
  const [inputs, setInputs] = useState({
    mu: "200",
    sigma: "15",
    price: "25",
    cost: "14",
    expectedProfitPerRecipe: "30",
    lambda: "2",
  });

  const mu = Number(inputs.mu);
  const sigma = Number(inputs.sigma);
  const price = Number(inputs.price);
  const cost = Number(inputs.cost);

  const calculateCriticalRatio = (price: number, cost: number) => {
    if (price === 0) return 0;
    return (price - cost) / price;
  };

  const calculateQStar = (mu: number, sigma: number, CR: number) => {
    const cr = Math.min(Math.max(CR, 0.0001), 0.9999);
    const z = probit(cr);
    return mu + z * sigma;
  };

  const CR = calculateCriticalRatio(price, cost);
  const customQStar = calculateQStar(mu, sigma, CR);

  const recipeQStars = initialRecipes.map((r) => {
    const cr = calculateCriticalRatio(r.price, r.cost);
    return calculateQStar(r.mu, r.sigma, cr);
  });

  const UR = (expectedProfitPerRecipe: string, lambda: string): number => {
    const result =
      initialRecipes.length * Number(expectedProfitPerRecipe) -
      Number(lambda) * CR;
    return result;
  };

  const resultUR = String(UR(inputs.expectedProfitPerRecipe, inputs.lambda));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (value === "" || /^-?\d*\.?\d*$/.test(value)) {
      setInputs((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 via-cyan-400 to-green-300 py-8 px-4">
      <section className="bg-white p-6 rounded shadow-md w-full max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">
          Q* Calculator
        </h1>

        <form
          className="grid grid-cols-2 gap-4 mb-6"
          onSubmit={(e) => e.preventDefault()}
        >
          {[
            { label: "Mean Demand (u)", name: "mu", value: inputs.mu },
            { label: "Standard Dev", name: "sigma", value: inputs.sigma },
            { label: "Price", name: "price", value: inputs.price },
            { label: "Cost", name: "cost", value: inputs.cost },
            { label: "Expected Profit Per Recipe", name: "expectedProfitPerRecipe", value: inputs.expectedProfitPerRecipe },
            { label: "Lambda (Salvage Value)", name: "lambda", value: inputs.lambda },
          ].map(({ label, name, value }) => (
            <div key={name} className="flex flex-col">
              <label htmlFor={name} className="mb-1 font-semibold text-black">
                {label}
              </label>
              <input
                type="number"
                id={name}
                name={name}
                value={value}
                onChange={handleChange}
                className="border border-black rounded px-3 py-2 text-black"
                min="0"
                step="any"
              />
            </div>
          ))}
        </form>

        <div className="mb-6 text-center text-black">
          <p>
            <strong>Critical Ratio (CR):</strong>{" "}
            {isNaN(CR) ? "-" : CR.toFixed(4)}
          </p>
          <p>
            <strong>Z* (probit of CR):</strong>{" "}
            {isNaN(probit(CR)) ? "-" : probit(CR).toFixed(4)}
          </p>
          <p>
            <strong>Optimal Quantity (Q*):</strong>{" "}
            {isNaN(customQStar) ? "-" : customQStar.toFixed(2)}
          </p>
        </div>

        <hr className="my-6 border-black" />

        <h2 className="text-xl font-semibold mb-4 text-center text-black">
          Q* for Predefined Recipes
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-black rounded overflow-hidden text-left">
            <thead>
              <tr>
                <th className="px-4 py-2 border-r border-black text-black bg-white">
                  Recipe
                </th>
                <th className="px-4 py-2 border-r border-black text-black bg-white">
                  μ
                </th>
                <th className="px-4 py-2 border-r border-black text-black bg-white">
                  sigma
                </th>
                <th className="px-4 py-2 border-r border-black text-black bg-white">
                  Price
                </th>
                <th className="px-4 py-2 border-r border-black text-black bg-white">
                  Cost
                </th>
                <th className="px-4 py-2 text-black bg-white">Q*</th>
              </tr>
            </thead>
            <tbody>
              {initialRecipes.map((r, i) => (
                <tr key={r.name} className="bg-white">
                  <td className="px-4 py-2 border-r border-b border-black text-black">
                    {r.name}
                  </td>
                  <td className="px-4 py-2 border-r border-b border-black text-black">
                    {r.mu}
                  </td>
                  <td className="px-4 py-2 border-r border-b border-black text-black">
                    {r.sigma}
                  </td>
                  <td className="px-4 py-2 border-r border-b border-black text-black">
                    ${r.price.toFixed(2)}
                  </td>
                  <td className="px-4 py-2 border-r border-b border-black text-black">
                    ${r.cost.toFixed(2)}
                  </td>
                  <td className="px-4 py-2 border-b border-black text-black">
                    {recipeQStars[i].toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-6">
          <a
            href="https://gsm.ucdavis.edu/faculty/pantelis-loupos"
            className="inline-block px-4 py-2 bg-black text-white rounded text-center font-semibold"
          >
            For More Details You Must Click Me!
          </a>
        </div>
        <div className="mt-6 text-center text-black">
          <strong>UR Result:</strong> {isNaN(Number(resultUR)) ? "-" : resultUR}
        </div>
      </section>
    </main>
  );
}