"use client";

import React, { useState } from "react";

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
        text: message,
      }),
    });

    if (response.ok) {
      console.log("Email sent successfully");
    } else {
      console.error("Failed to send email");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-md shadow-md mt-16">
      <h1 className="text-2xl font-bold mb-4">Simple Mail Application</h1>
      <label className="block mb-2 font-bold">Your Email</label>
      <input
        type="email"
        placeholder="From"
        className=" border w-full px-4 py-2 mb-4 rounded-md border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
        value={emailSender}
        onChange={(e) => setEmailSender(e.target.value)}
      />
      <label className="block mb-2 font-bold">
        Your Loved One&apos;s Email
      </label>
      <input
        type="email"
        placeholder="To"
        className=" border w-full px-4 py-2 mb-4 rounded-md border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
        value={emailReceiver}
        onChange={(e) => setEmailReceiver(e.target.value)}
      />
      <label className="block mb-2 font-bold">Subject</label>
      <input
        type="text"
        placeholder="Subject"
        className="border w-full px-4 py-2 mb-4 rounded-md border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <label className="block mb-2 font-bold">Message</label>
      <textarea
        placeholder="Message"
        className="border w-full px-4 py-2 mb-4 rounded-md border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <button
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:bg-blue-600"
        onClick={sendMail}
      >
        Send Email
      </button>
    </div>
  );
};

export default SimpleMailApp;
