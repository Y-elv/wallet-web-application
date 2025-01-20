import React, { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import styled from "styled-components";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [subCategoryInputs, setSubCategoryInputs] = useState({});
  const toast = useToast();

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://wallet-web-application-bxne.onrender.com/api/v1/categories"
      );
      if (response.data.success) {
        setCategories(response.data.data);
      }
    } catch (error) {
      toast({
        title: "Error fetching categories",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const addCategory = async () => {
    if (!newCategoryName) {
      toast({
        title: "Category name is required",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    try {
      const payload = { name: newCategoryName, subCategories: [] };
      const response = await axios.post(
        "https://wallet-web-application-bxne.onrender.com/api/v1/categories",
        payload
      );
      if (response.data.success) {
        toast({
          title: "Category added successfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        fetchCategories();
        setNewCategoryName("");
      }
    } catch (error) {
      toast({
        title: "Error adding category",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const addSubCategory = async (categoryId) => {
    const subCategoryName = subCategoryInputs[categoryId];
    if (!subCategoryName) {
      toast({
        title: "Please enter a subcategory name",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const payload = { categoryId, name: subCategoryName };
      const response = await axios.post(
        "http://localhost:8081/api/v1/subcategories/add",
        payload
      );
      if (response.data.success) {
        toast({
          title: "Subcategory added successfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setSubCategoryInputs({ ...subCategoryInputs, [categoryId]: "" });
        fetchCategories();
      }
    } catch (error) {
      toast({
        title: "Error adding subcategory",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleSubCategoryInputChange = (categoryId, value) => {
    setSubCategoryInputs({ ...subCategoryInputs, [categoryId]: value });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Wrapper>
      <Header>
        <h1>Categories Management</h1>
      </Header>
      <AddCategoryForm>
        <h2>Add New Category</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addCategory();
          }}
        >
          <input
            type="text"
            placeholder="Enter new category name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
          <button type="submit">Add Category</button>
        </form>
      </AddCategoryForm>
      <CategoryList>
        {categories.map((category) => (
          <CategoryItem key={category.id}>
            <CategoryDetails>
              <h3>{category.name}</h3>
              <ul>
                {category.subCategories.map((subCategory, index) => (
                  <li key={index}>- {subCategory}</li>
                ))}
              </ul>
              <SubCategoryForm
                onSubmit={(e) => {
                  e.preventDefault();
                  addSubCategory(category.id);
                }}
              >
                <input
                  type="text"
                  placeholder="Enter subcategory name"
                  value={subCategoryInputs[category.id] || ""}
                  onChange={(e) =>
                    handleSubCategoryInputChange(category.id, e.target.value)
                  }
                />
                <button type="submit">Add Subcategory</button>
              </SubCategoryForm>
            </CategoryDetails>
          </CategoryItem>
        ))}
      </CategoryList>
    </Wrapper>
  );
};

export default Categories;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #f0f4f8;
  color: #333;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin-bottom: 2rem;

  h1 {
    font-size: 2.5rem;
    color: #1a73e8;
  }
`;

const AddCategoryForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-bottom: 2rem;

  h2 {
    margin-bottom: 1rem;
  }

  input {
    padding: 0.5rem;
    margin: 0.5rem 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
  }

  button {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 5px;
    background: #1a73e8;
    color: #fff;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
      background: #155bb5;
    }
  }
`;

const CategoryList = styled.div`
  width: 100%;
`;

const CategoryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1rem;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-bottom: 1rem;
`;

const CategoryDetails = styled.div`
  width: 100%;

  h3 {
    margin: 0 0 0.5rem 0;
  }

  ul {
    margin: 0.5rem 0;
    padding-left: 1.5rem;

    li {
      margin: 0.25rem 0;
    }
  }
`;

const SubCategoryForm = styled.form`
  margin-top: 1rem;

  input {
    padding: 0.5rem;
    margin-right: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: calc(100% - 6rem);
  }

  button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    background: #1a73e8;
    color: #fff;
    cursor: pointer;

    &:hover {
      background: #155bb5;
    }
  }
`;
