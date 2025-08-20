import React, { useState } from "react";

// Demo search result data (replace with your API data!)
const demoResults = [
  {
    id: "LoveBirds285",
    name: "R.Brindha",
    age: 29,
    height: "5ft 3inch",
    education: "BE",
    religion: "Hindu",
    work: "Software Engineer",
    marital: "Unmarried",
    star: "Moolam",
    moonsign: "Dhanushu",
    caste: "Nadar",
    subcaste: "-",
    living: "-",
  },
  {
    id: "LoveBirds284",
    name: "L.Akilabharathi",
    age: 28,
    height: "",
    education: "BE",
    religion: "Hindu",
    work: "-",
    marital: "Unmarried",
    star: "Mrigashirisham",
    moonsign: "Rishabam",
    caste: "Nadar",
    subcaste: "-",
    living: "-",
  },
];

const Search = () => {
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  // Search form state can be added here

  const handleSearch = (e) => {
    e.preventDefault();
    setResults(demoResults);
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-white-50 flex flex-col items-center pt-12">
      {!showResults ? (
        // ADVANCED SEARCH FORM
        <form
          onSubmit={handleSearch}
          className="bg-white rounded-xl shadow px-8 py-8 w-full max-w-4xl"
        >
          <div className="flex space-x-2 mb-6">
            <button
              type="button"
              className="bg-pink-700 text-white font-semibold py-2 px-6 rounded-t-md"
            >
              ID Search
            </button>
            <button
              type="button"
              className="bg-pink-500 text-white font-semibold py-2 px-6 rounded-t-md"
            >
              Advanced Search
            </button>
          </div>
          <h2 className="text-2xl font-bold text-pink-700 mb-4">
            Advanced Search
          </h2>
          <span className="block w-10 h-1 bg-pink-500 rounded mb-8" />

          <div className="grid md:grid-cols-4 gap-4 mb-6">
            {/* Demo fields, fill with your form UI */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-pink-700">
                Looking for
              </label>
              <select className="w-full border rounded px-2 py-2 border-pink-300 focus:border-pink-600 focus:ring-pink-200">
                <option>Female</option>
                <option>Male</option>
              </select>
            </div>
            <div className="flex gap-2">
              <div>
                <label className="block text-sm font-semibold mb-2 text-pink-700">Age</label>
                <input
                  type="number"
                  min="18"
                  max="99"
                  defaultValue="18"
                  className="w-16 border rounded px-2 py-2 border-pink-300 focus:border-pink-600 focus:ring-pink-200"
                />
              </div>
              <span className="self-end pb-1 text-pink-700">to</span>
              <div>
                <br />
                <input
                  type="number"
                  min="18"
                  max="99"
                  defaultValue="39"
                  className="w-16 border rounded px-2 py-2 border-pink-300 focus:border-pink-600 focus:ring-pink-200"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-pink-700">
                Education
              </label>
              <select className="w-full border rounded px-2 py-2 border-pink-300 focus:border-pink-600 focus:ring-pink-200">
                <option>All</option>
                <option>UG</option>
                <option>PG</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-pink-700">
                Religion
              </label>
              <select className="w-full border rounded px-2 py-2 border-pink-300 focus:border-pink-600 focus:ring-pink-200">
                <option>Hindu</option>
                <option>Christian</option>
                <option>Muslim</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-pink-700">
                Caste
              </label>
              <select className="w-full border rounded px-2 py-2 border-pink-300 focus:border-pink-600 focus:ring-pink-200">
                <option>Nadar</option>
                <option>All</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-pink-700">
                State
              </label>
              <select className="w-full border rounded px-2 py-2 border-pink-300 focus:border-pink-600 focus:ring-pink-200">
                <option>All</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-pink-700">
                District
              </label>
              <select className="w-full border rounded px-2 py-2 border-pink-300 focus:border-pink-600 focus:ring-pink-200">
                <option>All</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-pink-700">
                Star (Nakshathra)
              </label>
              <select className="w-full border rounded px-2 py-2 border-pink-300 focus:border-pink-600 focus:ring-pink-200">
                <option>All</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-pink-700">
                Moonsign (Rasi)
              </label>
              <select className="w-full border rounded px-2 py-2 border-pink-300 focus:border-pink-600 focus:ring-pink-200">
                <option>All</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-5 rounded"
            >
              Find Your Partner
            </button>
          </div>
        </form>
      ) : (
        // SEARCH RESULTS
        <div className="w-full max-w-4xl mt-6 mb-10 space-y-8">
          {results.map((profile) => (
            <div
              key={profile.id}
              className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row md:items-center"
            >
              <div className="flex-shrink-0 flex flex-col items-center md:w-1/5">
                <div className="h-28 w-24 mb-2 flex items-center justify-center bg-pink-100 rounded">
                  {/* Placeholder Image Icon */}
                  <svg width="48" height="48" fill="none" viewBox="0 0 24 24">
                    <rect width="48" height="48" rx="8" fill="#FAD4D9" />
                    <g>
                      <circle cx="16" cy="16" r="8" fill="#FBE9EB" />
                      <rect x="8" y="24" width="32" height="16" fill="#FADCE1" />
                    </g>
                  </svg>
                </div>
                <p className="text-xs font-semibold text-pink-700 text-center">
                  Login to Reveal<br />the Image
                </p>
                <button className="bg-pink-600 hover:bg-pink-700 text-white rounded mt-3 text-sm px-4 py-2">
                  Contact for More details
                </button>
              </div>
              <div className="flex-1 ml-0 md:ml-8 mt-4 md:mt-0 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 text-sm text-pink-900">
                <div>
                  <span className="font-bold">{profile.name}</span> &nbsp;
                  <span>Id : <span className="font-medium">{profile.id}</span></span>
                </div>
                <div>Age : <span className="font-medium">{profile.age}</span></div>
                <div>Education : <span className="font-medium">{profile.education}</span></div>
                <div>Height : <span className="font-medium">{profile.height || '-'}</span></div>
                <div>Religion : <span className="font-medium">{profile.religion}</span></div>
                <div>Living Place : <span className="font-medium">{profile.living}</span></div>
                <div>Work : <span className="font-medium">{profile.work}</span></div>
                <div>Sub Caste : <span className="font-medium">{profile.subcaste}</span></div>
                <div>Marital Status : <span className="font-medium">{profile.marital}</span></div>
                <div>Caste : <span className="font-medium">{profile.caste}</span></div>
                <div>Star (Nakshathra) : <span className="font-medium">{profile.star}</span></div>
                <div>Moonsign (Rasi) : <span className="font-medium">{profile.moonsign}</span></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
