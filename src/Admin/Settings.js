import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import { useShopSettings } from './hooks/useShopSettings';

const SettingsContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
`;

const ProfilePicture = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
  margin: 0 auto 2rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Settings = () => {
  const navigate = useNavigate();
  const { shopSettings, updateShopSettings } = useShopSettings();
  const [formData, setFormData] = useState({
    shopName: '',
    shopAddress: '',
    shopContact: '',
  });

  useEffect(() => {
    setFormData({
      shopName: shopSettings.shopName || '',
      shopAddress: shopSettings.shopAddress || '',
      shopContact: shopSettings.shopContact || '',
    });
  }, [shopSettings]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateShopSettings({ profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateShopSettings(formData);
    navigate('/');
  };

  return (
    <SettingsContainer>
      <h1>Shop Settings</h1>
      <ProfilePicture>
        <input
          type="file"
          id="profile-upload"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleImageUpload}
        />
        <label htmlFor="profile-upload">
          {shopSettings.profilePicture ? (
            <img src={shopSettings.profilePicture} alt="Profile" />
          ) : (
            <User size={50} />
          )}
        </label>
      </ProfilePicture>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="shopName"
          value={formData.shopName}
          onChange={handleInputChange}
          placeholder="Shop Name"
        />
        <Input
          type="text"
          name="shopAddress"
          value={formData.shopAddress}
          onChange={handleInputChange}
          placeholder="Shop Address"
        />
        <Input
          type="text"
          name="shopContact"
          value={formData.shopContact}
          onChange={handleInputChange}
          placeholder="Shop Contact"
        />
        <Button type="submit">Update Settings</Button>
      </Form>
    </SettingsContainer>
  );
};

export default Settings;