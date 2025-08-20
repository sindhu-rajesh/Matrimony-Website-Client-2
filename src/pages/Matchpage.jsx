import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const profiles = [
  {
    id: 21,
    name: "MozahidHriday24",
    type: "Male",
    age: 22,
    occupation: "Engineer",
    height: "5'5 ft",
    weight: "50kg",
    dob: "2025-07-01",
    division: "Dhaka",
    image: "/img2.jpg",
    race: "Fair",
  },
  // ...other profiles
];

const similarProfiles = [
  { id: 31, name: "Rakib Hasan", age: 30, division: "Dhaka", image: "/sim1.jpg" },
  { id: 32, name: "Tanvir H", age: 31, division: "Barisal", image: "/sim2.jpg" },
  { id: 33, name: "Tanvir J", age: 33, division: "Rajshahi", image: "/sim3.jpg" },
];

export default function MatchesPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const profile = profiles.find((p) => p.id === Number(id));

  // Fix: show loading or error if not found
  if (!profile) {
    return (
      <div className="flex justify-center items-center h-96 text-xl font-semibold text-gray-500">
        Profile not found.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg flex p-6">
        <img src={profile.image} alt="Profile" className="w-40 h-48 rounded mx-4 object-cover" />
        <div>
          <h2 className="text-2xl font-bold mb-2">{profile.name}</h2>
          <div className="space-y-1">
            <div>Type: {profile.type}</div>
            <div>Age: {profile.age}</div>
            <div>Height: {profile.height}</div>
            <div>Weight: {profile.weight}</div>
            <div>Occupation: {profile.occupation}</div>
            <div>Race: {profile.race}</div>
            <div>DOB: {profile.dob}</div>
            <div>Division: {profile.division}</div>
          </div>
          <div className="bg-yellow-100 text-yellow-700 mt-4 p-2 rounded">
            Contact info is visible to premium members only.
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 text-purple-700">Similar Biodatas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {similarProfiles.map((sim) => (
            <div key={sim.id} className="bg-white p-4 rounded shadow flex flex-col items-center">
              <img src={sim.image} alt={sim.name} className="w-full h-32 object-cover rounded" />
              <div className="mt-2 font-semibold">{sim.name}</div>
              <div>Age: {sim.age}</div>
              <div>Division: {sim.division}</div>
              <button
                className="mt-2 w-full bg-pink-600 text-white py-1 rounded hover:bg-pink-800 transition"
                onClick={() => navigate(`/matches/${sim.id}`)}
              >
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
