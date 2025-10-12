import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import ProfileDetails from "../pages/ProfileDetails";
import ProfileSettings from "../pages/ProfileSettings";

export default function Profile() {
  return (
    <div className="p-6 text-center">
      <h2 className="text-xl font-bold mb-2">Profile</h2>

      <nav className="space-x-4">
        <Link to="details" className="text-blue-600">
          Details
        </Link>
        <Link to="settings" className="text-blue-600">
          Settings
        </Link>
      </nav>

      <div className="mt-4">
        {/* ✅ Define nested routes here */}
        <Routes>
          <Route path="details" element={<ProfileDetails />} />
          <Route path="settings" element={<ProfileSettings />} />
        </Routes>
      </div>
    </div>
  );
}
