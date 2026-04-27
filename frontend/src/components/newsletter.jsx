import React, { useState } from "react";

function NewsLetter() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdayMonth, setBirthdayMonth] = useState("");
  const [birthdayDay, setBirthdayDay] = useState("");

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
      <form
        action="https://worlddisastercenter.us22.list-manage.com/subscribe/post?u=c90ad2e6157e6eac27328c681&amp;id=a73ca4362c&amp;f_id=0044d6e1f0"
        method="post"
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
        target="_blank"
      >
        <div className="h-1 w-10 bg-primary mb-6" />
        <h2 className="text-2xl font-bold text-content-primary mb-2">
          Subscribe to Our Impact360 Newsletter
        </h2>
        <p className="text-sm text-content-secondary mb-8 max-w-xl">
          Stay connected with news, impactful stories, and exclusive insights from the World Disaster Center.
          Be part of the movement for a safer world.
        </p>

        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[160px]">
            <label htmlFor="email-address" className="block text-sm font-semibold text-content-secondary mb-1.5">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              value={email}
              name="EMAIL"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              type="email"
              id="email-address"
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-content-primary bg-white transition-colors"
            />
          </div>

          <div className="flex-1 min-w-[120px]">
            <label htmlFor="first-name" className="block text-sm font-semibold text-content-secondary mb-1.5">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              value={firstName}
              name="FNAME"
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              type="text"
              id="first-name"
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-content-primary bg-white transition-colors"
            />
          </div>

          <div className="flex-1 min-w-[120px]">
            <label htmlFor="last-name" className="block text-sm font-semibold text-content-secondary mb-1.5">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              value={lastName}
              name="LNAME"
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
              type="text"
              id="last-name"
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-content-primary bg-white transition-colors"
            />
          </div>

          <div className="shrink-0">
            <label className="block text-sm font-semibold text-content-secondary mb-1.5">Birthday</label>
            <div className="flex gap-2">
              <input
                type="text"
                pattern="[0-9]*"
                placeholder="MM"
                size="2"
                maxLength="2"
                value={birthdayMonth}
                name="BIRTHDAY[month]"
                onChange={(e) => setBirthdayMonth(e.target.value)}
                className="w-14 px-3 py-2.5 border border-gray-300 rounded text-center focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-content-primary bg-white transition-colors"
              />
              <input
                type="text"
                pattern="[0-9]*"
                placeholder="DD"
                size="2"
                maxLength="2"
                value={birthdayDay}
                name="BIRTHDAY[day]"
                onChange={(e) => setBirthdayDay(e.target.value)}
                className="w-14 px-3 py-2.5 border border-gray-300 rounded text-center focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-content-primary bg-white transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="bg-primary hover:bg-primary-dark text-white font-bold px-10 py-3 rounded transition-colors duration-200"
          >
            Subscribe
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewsLetter;
