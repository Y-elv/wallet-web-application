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
  const [budget, setBudget] = useState(null); 
  const [userId, setUserId] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userInfo"));
    if (storedUser && storedUser.data.user) {
      setUserId(storedUser.data.user.id);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchBudget();
    }
  }, [userId]);

  const fetchBudget = async () => {
    try {
      const response = await axios.get(
        `https://wallet-web-application-bxne.onrender.com/api/v1/budgets/${userId}`
      );
      if (response.data.success) {
        setBudget(response.data.data); // Update budget with fetched data
        console.log("Fetched budget:", response.data.data);
      }
    } catch (error) {
      toast({
        title: "Error fetching budget",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

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
      const payload = {
        userId,
        amount: parseFloat(amount),
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      };

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
        setAmount("");
        setStartDate(new Date());
        setEndDate(new Date());
        fetchBudget(); // Refresh budget details
      }
    } catch (error) {
      toast({
        title: `Error: ${error.response?.data?.message || error.message}`,
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
        <Label>
          Start Date:
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy/MM/dd"
            className="datepicker"
          />
        </Label>
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

      <BudgetDetails>
        <h3>Your Budget</h3>

        {budget ? (
          <BudgetCard key={budget.id}>
            <p>
              <strong>Amount:</strong> ${budget.amount.toFixed(2)}
            </p>
            <p>
              <strong>Start Date:</strong>{" "}
              {new Date(budget.startDate).toLocaleDateString()}
            </p>
            <p>
              <strong>End Date:</strong>{" "}
              {new Date(budget.endDate).toLocaleDateString()}
            </p>
          </BudgetCard>
        ) : (
          <p>No budget available. Create one to get started!</p>
        )}
      </BudgetDetails>
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

  input,
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
    &:hover {
      background: #155bb5;
    }
  }
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-weight: 600;
`;

const BudgetDetails = styled.div`
  width: 100%;
  max-width: 600px;
  margin-top: 2rem;
  padding: 1rem;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;

  h3 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
    color: #1a73e8;
  }

  p {
    margin: 0.5rem 0;
    font-size: 1rem;
    color: #333;
  }
`;

const BudgetCard = styled.div`
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  background: #f9f9f9;

  p {
    margin: 0.25rem 0;
  }
`;
