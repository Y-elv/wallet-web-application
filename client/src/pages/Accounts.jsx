import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { useToast } from "@chakra-ui/react";

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [userId, setUserId] = useState(null);
  const [accountName, setAccountName] = useState("");
  const [accountType, setAccountType] = useState("BANK");
  const [balance, setBalance] = useState(0.0);
  const [showAddForm, setShowAddForm] = useState(false); // Define showAddForm state
  const toast = useToast();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      try {
        const parsedUserInfo = JSON.parse(userInfo);
        if (parsedUserInfo.data && parsedUserInfo.data.user) {
          const userId = parsedUserInfo.data.user.id;
          setUserId(userId);
          fetchAccounts(userId);
        }
      } catch (error) {
        console.error("Error parsing user info:", error);
      }
    }
  }, []);

  const fetchAccounts = async (userId) => {
    try {
      const response = await axios.get(
        `https://wallet-web-application-bxne.onrender.com/api/v1/accounts/user/${userId}`
      );
      setAccounts(response.data.data);
      console.log("Accounts data:", response.data.data);
    } catch (error) {
      toast({
        title: "Error fetching accounts",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const handleDeleteAccount = async (accountId) => {
    try {
      await axios.delete(
        `https://wallet-web-application-bxne.onrender.com/api/v1/accounts/${accountId}`
      );
      toast({
        title: "Account deleted",
        description: "The account has been deleted successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      fetchAccounts(userId);
    } catch (error) {
      toast({
        title: "Error deleting account",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const handleAddAccount = async () => {
    try {
      await axios.post(
        `https://wallet-web-application-bxne.onrender.com/api/v1/accounts`,
        {
          userId,
          accountName,
          accountType,
          balance,
        }
      );
      toast({
        title: "Account added",
        description: "The account has been added successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      fetchAccounts(userId);
      setShowAddForm(false); // Hide the form after adding an account
    } catch (error) {
      toast({
        title: "Error adding account",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
    <Wrapper>
      <Header>
        <h1>Accounts Page</h1>
        <AddAccountButton onClick={() => setShowAddForm(!showAddForm)}>
          Add Account
        </AddAccountButton>
      </Header>
      {showAddForm && (
        <AddAccountForm>
          <h2>Add New Account</h2>
          <label>Account Name:</label>
          <input
            type="text"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
          />
          <label>Account Type:</label>
          <select
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
          >
            <option value="BANK">BANK</option>
            <option value="MOBILE">MOBILE</option>
            <option value="CASH">CASH</option>
          </select>
          <label>Balance:</label>
          <input
            type="number"
            value={balance}
            onChange={(e) => setBalance(parseFloat(e.target.value))}
          />
          <button onClick={handleAddAccount}>Add Account</button>
        </AddAccountForm>
      )}
      <AccountList>
        {accounts.map((account) => (
          <AccountItem key={account.id}>
            <AccountDetails>
              <h3>{account.accountName}</h3>
              <p>Type: {account.accountType}</p>
              <p>Balance: ${account.balance.toFixed(2)}</p>
            </AccountDetails>
            <AccountActions>
              <FaEdit className="edit-icon" />
              <FaTrashAlt
                className="delete-icon"
                onClick={() => handleDeleteAccount(account.id)}
              />
            </AccountActions>
          </AccountItem>
        ))}
      </AccountList>
    </Wrapper>
  );
};

export default Accounts;

// styles
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

const AddAccountButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 5px;
  background: #1a73e8;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #155bb5;
  }
`;

const AddAccountForm = styled.div`
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

  label {
    margin-top: 0.5rem;
  }

  input,
  select {
    padding: 0.5rem;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
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
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
      background: #155bb5;
    }
  }
`;

const AccountList = styled.div`
  width: 100%;
`;

const AccountItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-bottom: 1rem;
`;

const AccountDetails = styled.div`
  h3 {
    margin: 0;
  }

  p {
    margin: 0.25rem 0;
  }
`;

const AccountActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  .edit-icon,
  .delete-icon {
    font-size: 1.5rem;
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
      color: #1a73e8;
    }
  }
`;
