import React, { useState } from 'react';
import styled from 'styled-components';
import { Menu, User } from 'lucide-react';

const StyledNavbar = styled.nav`
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  .menu-btn {
    background: none;
    border: none;
    cursor: pointer;
    display: none;

    @media (max-width: 991px) {
      display: block;
    }
  }

  .profile-upload {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #f0f0f0;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    overflow: hidden;
    margin-left: auto; // This pushes the profile to the right

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const Navbar = ({ setIsOpen }) => {
  const [profileImage, setProfileImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <StyledNavbar>
      <button className="menu-btn" onClick={() => setIsOpen(true)}>
        <Menu size={24} />
      </button>
      <div className="profile-upload">
        <input
          type="file"
          id="profile-upload"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleImageUpload}
        />
        <label htmlFor="profile-upload">
          {profileImage ? (
            <img src={profileImage} alt="Profile" />
          ) : (
            <User size={24} />
          )}
        </label>
      </div>
    </StyledNavbar>
  );
};

export default Navbar;

