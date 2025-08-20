// Plans.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    name: "Silver",
    label: "Silver Plan",
    price: 500,
    priceColor: "text-purple-600",
    duration: "180 Days",
    durationColor: "text-purple-600",
    bg: "bg-purple-50",
    checksColor: "text-purple-600",
  },
  {
    name: "Gold",
    label: "Gold Plan",
    price: 1000,
    priceColor: "text-orange-600",
    duration: "365 Days",
    durationColor: "text-orange-600",
    bg: "bg-red-50",
    checksColor: "text-orange-600",
  },
  {
    name: "Diamond",
    label: "Diamond Plan",
    price: 2000,
    priceColor: "text-blue-700",
    duration: "Until the wedding is over Days",
    durationColor: "text-blue-700",
    bg: "bg-blue-100",
    checksColor: "text-blue-700",
  },
];

export default function Plans() {
  const navigate = useNavigate();

  const handleDetails = (plan) => {
    navigate("/payment", { state: { planName: plan.name, planPrice: plan.price } });
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col justify-start items-center py-10 px-4">
      <h1 className="text-4xl font-bold text-slate-800 mb-10">Membership Plans</h1>
      <div className="flex flex-col md:flex-row gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="bg-white rounded-2xl shadow-md w-80 flex flex-col items-center pb-8"
          >
            <div className="w-full text-center">
              <div className="pt-6 pb-3">
                <h2 className="text-2xl font-extrabold text-slate-800">{plan.name}</h2>
              </div>
              <div className={`w-full py-2 ${plan.bg}`}>
                <div className="text-lg font-medium text-gray-600">{plan.label}</div>
              </div>
              <div className="py-4 border-b">
                <div className={`${plan.priceColor} font-extrabold text-2xl`}>
                  Rs. {plan.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </div>
              </div>
              <div className="px-8 pt-8 pb-2 w-full flex flex-col gap-6">
                <div className="flex items-start gap-3">
                  <span className={`${plan.checksColor} text-xl pt-1`}>✔</span>
                  <span className="text-base font-medium">Plan Duration : {plan.duration}</span>
                </div>
                <hr />
                <div className="flex items-start gap-3">
                  <span className={`${plan.checksColor} text-xl pt-1`}>✔</span>
                  <span className="text-base font-medium">Credits : Unlimited Profile Views</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => handleDetails(plan)}
              className="mt-8 bg-orange-600 hover:bg-orange-700 text-white px-8 py-2 rounded-md text-lg font-semibold"
            >
              Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
