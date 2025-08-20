import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Profile1 from "../assets/profile1.jpg";
import Profile2 from "../assets/profile2.jpg";
import Profile3 from "../assets/profile3.jpg";
import Profile4 from "../assets/profile4.jpg";

// Demo profile data—you should replace with your own data or API
const allMembers = [
  {
    id: 22,
    name: "Ayesha",
    type: "Female",
    age: 20,
    division: "Dhaka",
    occupation: "Engineer",
    img: Profile1,
  },
  {
    id: 21,
    name: "MozahidHriday24",
    type: "Male",
    age: 22,
    division: "Dhaka",
    occupation: "Engineer",
    img: Profile2,
  },
  {
    id: 24,
    name: "Ritika",
    type: "Female",
    age: 25,
    division: "Dhaka",
    occupation: "Teacher",
    img: Profile3,
  },
  {
    id: 27,
    name: "Aarav",
    type: "Male",
    age: 25,
    division: "Khulna",
    occupation: "Engineer",
    img: Profile4,
  },
  // Add more profiles and images as needed
];

const PremimumMembership = () => {
  const [genderFilter, setGenderFilter] = useState("All");
  const navigate = useNavigate();

  const filteredMembers =
    genderFilter === "All"
      ? allMembers
      : allMembers.filter((m) => m.type === genderFilter);

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold text-center mb-8 text-pink-700">
        Premium Members Profile
      </h2>
      <div className="flex justify-end mb-6">
        <select
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
          className="border px-3 py-2 rounded shadow-sm"
        >
          <option value="All">Show All</option>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
        </select>
      </div>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 overflow-y-auto"
        style={{ maxHeight: 600 }}
      >
        {filteredMembers.map((m) => (
          <div
            key={m.id}
            className="bg-white rounded-xl shadow p-4 flex flex-col min-h-[380px]"
          >
            <img
              src={m.img}
              alt={m.name}
              className="w-full h-48 object-cover mb-2 rounded"
            />
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="text-sm font-semibold mb-1 text-pink-700">
                  &#128273; ID: {m.id}
                </div>
                <div className="text-sm mb-1">
                  Type: <span className="font-medium">{m.type}</span>
                </div>
                <div className="text-sm mb-1">
                  Division: <span className="font-medium">{m.division}</span>
                </div>
                <div className="text-sm mb-1">
                  Age: <span className="font-medium">{m.age}</span>
                </div>
                <div className="text-sm mb-1">
                  Occupation: <span className="font-medium">{m.occupation}</span>
                </div>
              </div>
              <button
                onClick={() => navigate(`/profile/${m.id}`)}
                className="mt-6 text-white bg-pink-700 hover:bg-pink-800 px-3 py-2 rounded font-semibold transition"
              >
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PremimumMembership;

