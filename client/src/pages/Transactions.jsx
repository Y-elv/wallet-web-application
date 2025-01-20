import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useToast } from "@chakra-ui/react"; // Import useToast

function Transactions() {
  const toast = useToast(); // Initialize toast
  const [userId, setUserId] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [selectedAccountName, setSelectedAccountName] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("INCOME");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userInfo"));
    if (storedUser.data && storedUser.data.user) {
      setUserId(storedUser.data.user.id);
      console.log("user id from transaction", storedUser.data.user.id);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchAccounts();
      fetchTransactions();
      fetchSubcategories();
    }
  }, [userId]);

  const fetchAccounts = async () => {
    try {
      const response = await axios.get(
        `https://wallet-web-application-bxne.onrender.com/api/v1/accounts/user/${userId}`
      );
      setAccounts(response.data.data);
      console.log("user accounts", response.data);
    } catch (error) {
      console.error("Error fetching accounts:", error);
      toast({
        title: "Error fetching accounts",
        description: "There was an error while fetching the accounts.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        `https://wallet-web-application-bxne.onrender.com/api/v1/transactions/user/${userId}`
      );
      setTransactions(response.data.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      toast({
        title: "Error fetching transactions",
        description: "There was an error while fetching the transactions.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const fetchSubcategories = async () => {
    try {
      const response = await axios.get(
        "https://wallet-web-application-bxne.onrender.com/api/v1/subcategories/all-subcategories"
      );
      setSubcategories(response.data.data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      toast({
        title: "Error fetching subcategories",
        description: "There was an error while fetching subcategories.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const handleAddTransaction = async () => {
    const payload = {
      accountId: selectedAccountId,
      userId,
      date: new Date().toISOString().split("T")[0],
      amount: parseFloat(amount),
      type,
      subCategory: selectedSubcategory || "",
    };

    try {
      await axios.post(
        "https://wallet-web-application-bxne.onrender.com/api/v1/transactions",
        payload
      );
      setShowForm(false);
      fetchTransactions();
      toast({
        title: "Transaction added",
        description: "Your transaction was successfully added.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      console.error("Error adding transaction:", error);
      toast({
        title: "Error adding transaction",
        description: "There was an error while adding the transaction.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const handleAccountSelection = (accountId) => {
    const account = accounts.find((acc) => acc.id === accountId);
    setSelectedAccountId(accountId);
    setSelectedAccountName(account.accountName);
  };

  return (
    <Wrapper>
      <Header>
        <h1>Transactions</h1>
        <AddTransactionButton onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close Form" : "Add Transaction"}
        </AddTransactionButton>
      </Header>

      {showForm && (
        <TransactionForm>
          <div>
            <label>Account:</label>
            <select
              value={selectedAccountId}
              onChange={(e) => handleAccountSelection(e.target.value)}
            >
              <option value="">Select Account</option>
              {accounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.accountType}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Account Name:</label>
            <input type="text" value={selectedAccountName} disabled />
          </div>
          <div>
            <label>Amount:</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div>
            <label>Type:</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="INCOME">Income</option>
              <option value="EXPENSE">Expense</option>
            </select>
          </div>
          <div>
            <label>Subcategory:</label>
            <select
              value={selectedSubcategory}
              onChange={(e) => setSelectedSubcategory(e.target.value)}
            >
              <option value="">Select Subcategory</option>
              {subcategories.map((subcategory, index) => (
                <option key={index} value={subcategory}>
                  {subcategory}
                </option>
              ))}
            </select>
          </div>
          <button onClick={handleAddTransaction}>Add Transaction</button>
        </TransactionForm>
      )}

      <TransactionList>
        <h2>Transaction History</h2>
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.id}>
              {transaction.date} - {transaction.type}: ${transaction.amount} (
              {transaction.accountType})
            </li>
          ))}
        </ul>
      </TransactionList>
    </Wrapper>
  );
}

export default Transactions;

// Styled Components
const Wrapper = styled.div`
  padding: 2rem;
  background-color: #f9f9f9;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AddTransactionButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #1a73e8;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #1a73e8;
  }
`;

const TransactionForm = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;

  label {
    margin-top: 0.5rem;
  }

  input,
  select {
    padding: 0.5rem;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
  }

  button {
    padding: 0.5rem 1rem;
    background-color: #1a73e8;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #1a73e8;
    }
  }
`;

const TransactionList = styled.div`
  margin-top: 2rem;

  ul {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 0.5rem;
      padding: 0.5rem;
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
  }
`;
