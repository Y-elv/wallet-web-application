// client/src/components/Overview.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Chart } from "chart.js/auto"; // Use 'chart.js/auto' for auto-registration
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useToast } from "@chakra-ui/react";
import { saveAs } from "file-saver"; // Import FileSaver.js

const Overview = () => {
  const [summary, setSummary] = useState({});
  const [userId, setUserId] = useState(null);
  const [startDate, setStartDate] = useState(new Date("2024-10-01"));
  const [endDate, setEndDate] = useState(new Date());
  const toast = useToast();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      try {
        const parsedUserInfo = JSON.parse(userInfo);
        if (parsedUserInfo.data && parsedUserInfo.data.user) {
          setUserId(parsedUserInfo.data.user.id);
          fetchTransactionSummary(parsedUserInfo.data.user.id);
        }
      } catch (error) {
        console.error("Error parsing user info:", error);
      }
    }
  }, []);

  const fetchTransactionSummary = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/v1/transactions/summary/${userId}`
      );
      const data = await response.json();
      setSummary(data);
      renderChart(data);
    } catch (error) {
      toast({
        title: "Error fetching transaction summary",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const renderChart = (summary) => {
    const labels = Object.keys(summary);
    const data = Object.values(summary);

    const ctx = document.getElementById("transactionChart").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Transaction Summary",
            data: data,
            backgroundColor: [
              "rgba(75, 192, 192, 0.2)",
              "rgba(255, 99, 132, 0.2)",
            ],
            borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  const handleGenerateReport = async () => {
    if (!userId || !startDate || !endDate) {
      toast({
        title: "Invalid input",
        description: "Please select valid dates and ensure you are logged in.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    const start = startDate.toISOString().split("T")[0];
    const end = endDate.toISOString().split("T")[0];

    try {
      const response = await fetch(
        `http://localhost:8081/api/v1/transactions/report?userId=${userId}&startDate=${start}&endDate=${end}`
      );
      const blob = await response.blob();
      saveAs(blob, `report_${start}_to_${end}.pdf`);
      toast({
        title: "Report generated successfully",
        description: "Your report has been generated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      toast({
        title: "Error generating report",
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
      <h1>Overview</h1>
      <p>Welcome to the overview page of your wallet application.</p>
      <canvas id="transactionChart" width="400" height="200"></canvas>
      <DatePickers>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="yyyy-MM-dd"
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          dateFormat="yyyy-MM-dd"
        />
      </DatePickers>
      <GenerateButton onClick={handleGenerateReport}>
        Generate Report
      </GenerateButton>
    </Wrapper>
  );
};

export default Overview;

// styles
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #f0f4f8;
  color: #333;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #1a73e8;
  }

  p {
    font-size: 1.25rem;
    margin-bottom: 2rem;
  }

  canvas {
    margin-bottom: 2rem;
  }
`;

const DatePickers = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;

  .react-datepicker-wrapper {
    width: auto;
  }
`;

const GenerateButton = styled.button`
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

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;
