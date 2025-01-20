import React, { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import styled from "styled-components";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

const Accounts = () => {
  const toast = useToast();
  const [accounts, setAccounts] = useState([]);
  const [userId, setUserId] = useState(1); // Replace with actual user ID logic
  const [accountName, setAccountName] = useState("");
  const [accountType, setAccountType] = useState("BANK");
  const [balance, setBalance] = useState(0.0);
  const [accountId, setAccountId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await axios.get(
        `https://wallet-web-application-bxne.onrender.com/api/v1/accounts/user/${userId}`
      );
      setAccounts(response.data.data);
      console.log("Accounts data after fetch:", response.data.data);
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

  const handleAddAccount = async () => {
    try {
      const response = await axios.post(
        `https://wallet-web-application-bxne.onrender.com/api/v1/accounts`,
        {
          userId,
          accountName,
          accountType,
          balance,
        }
      );
      console.log("Added account response:", response.data);
      toast({
        title: "Account added",
        description: "The account has been added successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      // Update state locally by adding the new account
      setAccounts((prevAccounts) => [...prevAccounts, response.data.data]);
      setShowForm(false);
      resetForm();
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

  const handleUpdateAccount = async () => {
    try {
      const response = await axios.put(
        `https://wallet-web-application-bxne.onrender.com/api/v1/accounts/${accountId}`,
        {
          accountName,
          accountType,
          balance,
        }
      );
      console.log("Updated account response:", response.data);
      toast({
        title: "Account updated",
        description: "The account has been updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      // Update state locally by modifying the existing account
      setAccounts((prevAccounts) =>
        prevAccounts.map((account) =>
          account.id === accountId
            ? { ...account, accountName, accountType, balance }
            : account
        )
      );

      setIsEditing(false);
      setShowForm(false);
      resetForm();
    } catch (error) {
      toast({
        title: "Error updating account",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const handleDeleteAccount = async (id) => {
    try {
      await axios.delete(
        `https://wallet-web-application-bxne.onrender.com/api/v1/accounts/${id}`
      );
      toast({
        title: "Account deleted",
        description: "The account has been deleted successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      // Remove the account from local state
      setAccounts((prevAccounts) =>
        prevAccounts.filter((account) => account.id !== id)
      );
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

  const handleEditClick = (account) => {
    setAccountId(account.id);
    setAccountName(account.accountName);
    setAccountType(account.accountType);
    setBalance(account.balance);
    setIsEditing(true);
    setShowForm(true);
  };

  const resetForm = () => {
    setAccountName("");
    setAccountType("BANK");
    setBalance(0.0);
    setAccountId(null);
    setShowForm(false);
    setIsEditing(false);
  };

  return (
    <Wrapper>
      <Header>
        <h1>Account Manager</h1>
        <AddAccountButton onClick={() => setShowForm(true)}>
          Add Account
        </AddAccountButton>
      </Header>

      {showForm && (
        <AddAccountForm>
          <h2>{isEditing ? "Edit Account" : "Add New Account"}</h2>
          <div>
            <label>Account Name:</label>
            <input
              type="text"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
            />
          </div>
          <div>
            <label>Account Type:</label>
            <select
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
            >
              <option value="BANK">Bank</option>
              <option value="MOBILE">Mobile</option>
              <option value="CASH">Cash</option>
            </select>
          </div>
          <div>
            <label>Balance:</label>
            <input
              type="number"
              value={balance}
              onChange={(e) => setBalance(parseFloat(e.target.value))}
            />
          </div>
          <div>
            <button
              type="button"
              onClick={isEditing ? handleUpdateAccount : handleAddAccount}
            >
              {isEditing ? "Update Account" : "Add Account"}
            </button>
            <button type="button" onClick={resetForm}>
              Cancel
            </button>
          </div>
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
              <FaEdit
                className="edit-icon"
                onClick={() => handleEditClick(account)}
              />
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

  div {
    display: flex;
    gap: 1rem;

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

      &:last-child {
        background: #ccc;

        &:hover {
          background: #999;
        }
      }
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
