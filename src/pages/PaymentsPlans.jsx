import React from "react";
import { useLocation } from "react-router-dom";
import { FiUser, FiPhone, FiMail } from "react-icons/fi";
import { FaGooglePay, FaWhatsapp, FaUniversity, FaRegCreditCard, FaMoneyCheckAlt } from "react-icons/fa";
import { SiPaytm } from "react-icons/si";

const bankData = [
  {
    bank: "Canara Bank",
    accHolder: "Maheswaran",
    accNo: "110025589949",
    branch: "Surampatti",
    ifsc: "CNRB0005633",
  },
  {
    bank: "SBI",
    accHolder: "Maheswaran A",
    accNo: "11063531084",
    branch: "Palaniappa Street, Erode",
    ifsc: "SBIN0051407",
    qr: true,
  },
];

export default function Payment() {
  const location = useLocation();
  const planName = location.state?.planName || "Gold";
  const planAmount = location.state?.planPrice || 1000;
  const phone = "9865765747";
  const email = "mahes007@yahoo.com";
  
  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-8 ">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Payment Summary Section */}
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-pink-600 mb-6 text-center">Payment Summary</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Details */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="flex items-center gap-2 font-semibold text-pink-500 mb-2 text-lg">
                <FiUser className="text-xl" />
                Contact Details
              </h3>
              <div className="flex items-center gap-2 text-gray-700 mb-1">
                <FiPhone className="text-pink-400" /> 
                <span className="font-semibold">{phone}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <FiMail className="text-pink-400" />
                <span className="font-semibold">{email}</span>
              </div>
            </div>
            {/* Payment Overview */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="flex items-center gap-2 font-semibold text-pink-500 mb-2 text-lg">
                <FaMoneyCheckAlt className="text-xl" />
                Payment Info
              </h3>
              <div className="text-gray-700 mb-1">
                Plan Name: <span className="font-semibold">{planName}</span>
              </div>
              <div className="text-gray-700">
                Plan Amount: <span className="font-semibold">₹{planAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
        {/* UPI & Bank Details Section */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* UPI Details */}
          <div className="bg-white rounded-2xl shadow-md p-6 border-t-4 border-pink-500">
            <h3 className="text-pink-600 rounded-t-lg px-4 py-2 font-semibold text-lg mb-4 text-center">
              UPI Details
            </h3>
            <div className="flex items-center gap-2 text-gray-800 mb-3">
              <FaGooglePay className="text-pink-500 text-xl" />
              G-Pay Number <span className="font-bold">8973040487</span>
            </div>
            <div className="flex items-center gap-2 text-gray-800 mb-3">
              <SiPaytm className="text-pink-400 text-xl" />
              Paytm Number <span className="font-bold">8778626571</span>
            </div>
            <div className="flex items-center gap-2 text-gray-800 mt-4">
              <FaWhatsapp className="text-green-500 text-xl" />
              Payment Screenshot Whatsapp Number <span className="font-bold">8973040487</span>
            </div>
          </div>
          {/* Bank Details - Pink accent line at top, white background */}
          {bankData.map((bank) => (
            <div key={bank.bank} className="bg-white rounded-2xl shadow-md p-6 border-t-4 border-pink-500 relative">
              <div className="flex justify-between items-center px-4 py-2 rounded-t-lg mb-4 font-semibold">
                <span className="text-pink-600 text-lg">{bank.bank}</span>
                {bank.qr && (
                  <span className="text-xs bg-pink-600 text-white rounded px-2 py-1 ml-2">QR Available</span>
                )}
              </div>
              <div className="flex items-center gap-2 text-gray-700 mb-2">
                <FiUser />
                <span>
                  Account Holder <strong>{bank.accHolder}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 mb-2">
                <FaRegCreditCard />
                <span>
                  Account Number <strong>{bank.accNo}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 mb-2">
                <FaUniversity />
                <span>
                  Branch <strong>{bank.branch}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <span className="font-bold">IFSC</span>
                <span>
                  Code <strong>{bank.ifsc}</strong>
                </span>
              </div>
              {bank.qr && (
                <div className="mt-3 text-right">
                  <a href="#" className="text-pink-600 text-sm font-semibold underline hover:text-pink-400 transition">
                    View QR
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

