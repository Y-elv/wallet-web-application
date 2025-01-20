import React, { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Budget = () => {
  const [amount, setAmount] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const toast = useToast();
  const [userId, setUserId] = useState(null);

  // Fetching userId from localStorage on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.data) {
      setUserId(storedUser.data.id);
    }
  }, []);

  // Log userId when it changes
  useEffect(() => {
    if (userId) {
      console.log("userId", userId); // Log userId after it is updated
    }
  }, [userId]);

  const handleCreateBudget = async () => {
    if (!amount || !startDate || !endDate || !userId) {
      toast({
        title: "All fields are required",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      // Log payload before making API call
      const payload = {
        userId,
        amount: parseFloat(amount),
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      };
      console.log("payload", payload); // Log the payload to ensure it's correct

      const response = await axios.post(
        "https://wallet-web-application-bxne.onrender.com/api/v1/budgets",
        payload
      );

      if (response.data.success) {
        toast({
          title: "Budget created successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        // Reset fields
        setAmount("");
        setStartDate(new Date());
        setEndDate(new Date());
      }
    } catch (error) {
      toast({
        title: "Error creating budget",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Wrapper>
      <Header>
        <h1>Budget Management</h1>
      </Header>
      <AddBudgetForm
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateBudget();
        }}
      >
        <h2>Create New Budget</h2>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {/* Start Date Picker */}
        <Label>
          Start Date:
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy/MM/dd"
            className="datepicker"
          />
        </Label>

        {/* End Date Picker */}
        <Label>
          End Date:
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="yyyy/MM/dd"
            className="datepicker"
          />
        </Label>

        <button type="submit">Create Budget</button>
      </AddBudgetForm>
    </Wrapper>
  );
};

export default Budget;

// Styled Components
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

const AddBudgetForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 400px;

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

  .datepicker {
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

// Label Styled Component
const Label = styled.label`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0.5rem 0;
  font-weight: 600;

  .datepicker {
    margin-top: 0.5rem;
  }
`;
