"use client";

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SimpleMailApp: React.FC = () => {
  const [emailSender, setEmailSender] = useState("");
  const [emailReceiver, setEmailReceiver] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const sendMail = async () => {
    const response = await fetch("http://localhost:3001/send-mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: emailSender,
        to: emailReceiver,
        subject,
        message: message,
      }),
    });

    if (response.ok) {
      toast.success(
        `httpStatus ${response.status}, ` +
          " " +
          `statusText ${response.statusText}, ` +
          " " +
          `${response.url}`
      );
    } else {
      toast.error(
        `httpStatus ${response.status}, ` +
          " " +
          `statusText ${response.statusText}, ` +
          " " +
          `${response.url}`
      );
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-md shadow-md mt-16">
      <ToastContainer />
      <h1 className="text-2xl font-bold text-red-600 mb-2">
        Valentine&apos;s Day Mail
      </h1>
      <p className="mb-6 text-gray-500 text-sm">
        By Sittipong Hemloun 6410401183
      </p>
      <label className="block mb-2 font-bold">Your Email</label>
      <input
        type="email"
        placeholder="From"
        className="border w-full px-4 py-2 mb-4 rounded-md border-red-400 focus:outline-none focus:ring focus:border-red-400"
        value={emailSender}
        onChange={(e) => setEmailSender(e.target.value)}
      />
      <label className="block mb-2 font-bold">
        Your Loved One&apos;s Email
      </label>
      <input
        type="email"
        placeholder="To"
        className="border w-full px-4 py-2 mb-4 rounded-md border-red-400 focus:outline-none focus:ring focus:border-red-400"
        value={emailReceiver}
        onChange={(e) => setEmailReceiver(e.target.value)}
      />
      <label className="block mb-2 font-bold">Subject</label>
      <input
        type="text"
        placeholder="Subject"
        className="border w-full px-4 py-2 mb-4 rounded-md border-red-400 focus:outline-none focus:ring focus:border-red-400"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <label className="block mb-2 font-bold">Message</label>
      <textarea
        placeholder="Message"
        className="border w-full px-4 py-2 mb-4 rounded-md border-red-400 focus:outline-none focus:ring focus:border-red-400"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <button
        className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:bg-red-700"
        onClick={sendMail}
      >
        Send Email
      </button>
    </div>
  );
};

export default SimpleMailApp;
