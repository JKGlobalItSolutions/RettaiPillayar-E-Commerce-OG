import React, { useState, useEffect } from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import { db } from '../firebase/firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where, getDocsFromCache } from 'firebase/firestore';
import styled from 'styled-components';

const StyledCategoryManagement = styled.div`
  h3 {
    color: #A41E19;
    font-weight: bold;
    margin-bottom: 1.5rem;
  }

  .form-label {
    font-weight: 600;
    color: #333;
  }

  .form-control {
    border-color: #ced4da;
    &:focus {
      border-color: #A41E19;
      box-shadow: 0 0 0 0.2rem rgba(164, 30, 25, 0.25);
    }
  }

  .btn-primary {
    background-color: #A41E19;
    border-color: #A41E19;
    font-weight: 600;
    padding: 0.5rem 1.5rem;
    &:hover, &:focus {
      background-color: #7d1713;
      border-color: #7d1713;
    }
  }

  .btn-danger {
    font-weight: 600;
    padding: 0.3rem 1rem;
  }

  .table {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
    th {
      background-color: #A41E19;
      color: #ffffff;
    }
    td {
      vertical-align: middle;
    }
  }
`;

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const categoriesCollection = collection(db, 'categories');
      const categoriesSnapshot = await getDocs(categoriesCollection);
      const categoriesList = categoriesSnapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name
      }));
      setCategories(categoriesList);
    } catch (error) {
      console.error('Error fetching categories:', error);
      alert('Failed to fetch categories. Please try again.');
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (newCategory.trim() === '') {
      alert('Please enter a category name.');
      return;
    }
    try {
      const categoriesRef = collection(db, 'categories');
      await addDoc(categoriesRef, { name: newCategory });
      setNewCategory('');
      fetchCategories();
      alert('Category added successfully!');
    } catch (error) {
      console.error('Error adding category:', error);
      alert('Error adding category. Please try again.');
    }
  };

  const handleEditCategory = (category) => {
    setEditCategoryId(category.id);
    setEditCategoryName(category.name);
  };

  const updateProductsCollection = async (oldCategoryName, newCategoryName) => {
    try {
      const productsCollection = collection(db, 'products');
      const q = query(productsCollection, where('category', '==', oldCategoryName));
      const productsSnapshot = await getDocs(q);

      const updatePromises = productsSnapshot.docs.map((productDoc) =>
        updateDoc(doc(db, 'products', productDoc.id), { category: newCategoryName })
      );

      await Promise.all(updatePromises);
      console.log(`Products updated successfully for category ${oldCategoryName}`);
    } catch (error) {
      console.error('Error updating products collection:', error);
      throw new Error('Failed to update products.');
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    if (editCategoryName.trim() === '') {
      alert('Please enter a category name.');
      return;
    }
    try {
      const categoryRef = doc(db, 'categories', editCategoryId);

      // Get the old category name
      const oldCategoryName = categories.find((category) => category.id === editCategoryId)?.name;

      // Update the category name in the categories collection
      await updateDoc(categoryRef, { name: editCategoryName });

      // Update the category name in the products collection
      await updateProductsCollection(oldCategoryName, editCategoryName);

      setEditCategoryId(null);
      setEditCategoryName('');
      fetchCategories();
      alert('Category updated successfully!');
    } catch (error) {
      console.error('Error updating category:', error);
      alert('Error updating category. Please try again.');
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        const categoryRef = doc(db, 'categories', categoryId);
        await deleteDoc(categoryRef);
        fetchCategories();
        alert('Category deleted successfully!');
      } catch (error) {
        console.error('Error deleting category:', error);
        alert('Error deleting category. Please try again.');
      }
    }
  };

  return (
    <StyledCategoryManagement>
      <h3>Category Management</h3>
      
      {editCategoryId ? (
        <Form onSubmit={handleUpdateCategory} className="mb-4">
          <Form.Group>
            <Form.Label>Edit Category Name</Form.Label>
            <Form.Control
              type="text"
              value={editCategoryName}
              onChange={(e) => setEditCategoryName(e.target.value)}
              placeholder="Enter category name"
              required
            />
          </Form.Group>
          <Button type="submit" variant="primary" className="mt-3">
            Update Category
          </Button>
          <Button
            variant="secondary"
            className="mt-3 ms-2"
            onClick={() => setEditCategoryId(null)}
          >
            Cancel
          </Button>
        </Form>
      ) : (
        <Form onSubmit={handleAddCategory} className="mb-4">
          <Form.Group>
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter new category name"
              required
            />
          </Form.Group>
          <Button type="submit" variant="primary" className="mt-3">
            Add Category
          </Button>
        </Form>
      )}
      
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.name}</td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleEditCategory(category)}
                  className="me-2"
                >
                  Edit
                </Button>
                <Button
                  style={{backgroundColor:"black",border:"none"}}
                  size="sm"
                  onClick={() => handleDeleteCategory(category.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </StyledCategoryManagement>
  );
};

export default CategoryManagement;
