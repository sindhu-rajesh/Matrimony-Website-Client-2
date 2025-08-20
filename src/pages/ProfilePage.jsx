import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Profile2 from "../assets/profile2.jpg"; // The actual imported image

// Example profile data (you can fetch from API)
const allMembers = [
  {
    id: 21,
    name: "MozahidHriday24",
    type: "Male",
    age: 22,
    division: "Dhaka",
    occupation: "Engineer",
    img: Profile2, // Use imported image here instead of string path
    height: "5'5 ft",
    weight: "50kg",
    dob: "2025-07-01",
    race: "Fair",
    father: "-",
    mother: "-",
    permanentDivision: "Dhaka",
    presentDivision: "Dhaka",
  },
  // ...other profiles with correct img fields
];

const ProfileDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const profile = allMembers.find((m) => String(m.id) === id);

  if (!profile) {
    return (
      <div className="text-center mt-20 text-red-600 font-bold">
        Profile Not Found
        <div>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 text-sm underline text-blue-500"
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow mt-10">
      <div className="flex flex-col md:flex-row gap-8">
        <div>
          <img
            src={profile.img}
            alt={profile.name}
            className="w-60 h-72 object-cover border rounded mb-2"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-pink-700 mb-4">{profile.name}</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 text-gray-700 mb-6">
            <div>Type: <span className="font-semibold">{profile.type}</span></div>
            <div>Age: <span className="font-semibold">{profile.age}</span></div>
            <div>Height: <span className="font-semibold">{profile.height}</span></div>
            <div>Weight: <span className="font-semibold">{profile.weight}</span></div>
            <div>DOB: <span className="font-semibold">{profile.dob}</span></div>
            <div>Occupation: <span className="font-semibold">{profile.occupation}</span></div>
            <div>Race: <span className="font-semibold">{profile.race}</span></div>
            <div>Father's Name: <span className="font-semibold">{profile.father}</span></div>
            <div>Mother's Name: <span className="font-semibold">{profile.mother}</span></div>
            <div>Permanent Division: <span className="font-semibold">{profile.permanentDivision}</span></div>
            <div>Present Division: <span className="font-semibold">{profile.presentDivision}</span></div>
          </div>
          <div className="mt-6 p-4 bg-yellow-100 border-l-4 border-yellow-400 rounded text-yellow-800 text-sm">
            Contact info is visible to premium members only.
          </div>
          <div className="mt-4 p-4 bg-red-100 border-l-4 border-red-400 rounded text-red-800 text-sm">
            ⚠️ Please complete your biodata first to send a contact request.
          </div>
          <div className="mt-6 flex flex-wrap gap-4">
            <button className="bg-pink-600 text-white px-5 py-2 rounded hover:bg-pink-700 font-semibold">
              Add to Favourites
            </button>
            <button className="bg-purple-600 text-white px-5 py-2 rounded hover:bg-purple-700 font-semibold">
              Complete Your Biodata
            </button>
            <button
              onClick={() => navigate(-1)}
              className="ml-auto text-gray-500 underline hover:text-gray-700"
            >
              ← Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
