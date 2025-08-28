import React, { useState, useEffect } from 'react';

const ProfilePage = () => {
  // Sample default user info (can be fetched from an API)
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Gold Loan Evaluator at XYZ Bank',
    profileImage: 'https://i.pravatar.cc/150?img=3',
  });

  const [editMode, setEditMode] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  const handleSave = () => {
    setEditMode(false);
    if (previewImage) {
      setUser((prev) => ({ ...prev, profileImage: previewImage }));
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <div className="text-center">
        <img
          src={previewImage || user.profileImage}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto object-cover"
        />
        {editMode && (
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-2"
          />
        )}
        <h2 className="text-xl font-semibold mt-4">{user.name}</h2>
        <p className="text-gray-500">{user.email}</p>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700">Bio</label>
        {editMode ? (
          <textarea
            name="bio"
            value={user.bio}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded"
          />
        ) : (
          <p className="mt-1 text-gray-600">{user.bio}</p>
        )}
      </div>

      <div className="mt-6 flex justify-between">
        {editMode ? (
          <>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
