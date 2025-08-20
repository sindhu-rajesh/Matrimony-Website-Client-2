import React from "react";

const successStories = [
  {
    id: 1,
    coupleNames: "Raj & Priya",
    story: "We met through MatchMate and now happily married for 2 years.",
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: 2,
    coupleNames: "Arjun & Sneha",
    story: "Thanks to MatchMate, we found each other and started a beautiful journey.",
    photo: "https://randomuser.me/api/portraits/men/43.jpg",
  },
  {
    id: 3,
    coupleNames: "Kumar & Anjali",
    story: "Our love story began on MatchMate. Grateful for this platform!",
    photo: "https://randomuser.me/api/portraits/women/56.jpg",
  },
];

const SuccessStories = () => {
  return (
    <section className="py-16 bg-gray-50 text-center max-w-6xl mx-auto px-6">
      <h2 className="text-3xl font-bold mb-10">Success Stories</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {successStories.map(({ id, coupleNames, story, photo }) => (
          <div
            key={id}
            className="bg-white rounded-lg shadow p-6 flex flex-col items-center"
          >
            <img
              src={photo}
              alt={`${coupleNames}`}
              className="w-28 h-28 rounded-full mb-4 object-cover"
              loading="lazy"
            />
            <p className="italic text-pink-600 mb-2">&ldquo;{story}&rdquo;</p>
            <h3 className="font-semibold">{coupleNames}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SuccessStories;
