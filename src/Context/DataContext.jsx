/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [draftData, setDraftData] = useState([]);
  const [loadingDrafts, setLoadingDrafts] = useState(true);

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("sessionToken") !== null;
  });

  const login = () => {
    setIsLoggedIn(true); // Update login state
  };

  const logout = () => {
    setIsLoggedIn(false); // Update logout state
    localStorage.removeItem("sessionToken");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/news");
        const result = await response.json();
        setData(result.news);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchDraftNews = async () => {
      setLoadingDrafts(true);
      try {
        const response = await fetch("http://localhost:3000/draft-news");
        const data = await response.json();
        setDraftData(data.news);
      } catch (error) {
        console.error("Error fetching draft news:", error);
      } finally {
        setLoadingDrafts(false);
      }
    };
    fetchDraftNews();
  }, []);

  // Function to delete news item
  const deleteNews = async (id) => {
    try {
      await fetch(`http://localhost:3000/news/${id}`, {
        method: "DELETE",
      });
      setData(data.filter((item) => item.id !== id)); // Remove item from state
    } catch (error) {
      console.error("Error deleting news:", error);
    }
  };

  // Function to update news item
  const updateNews = async (id, updatedData) => {
    try {
      await fetch(`http://localhost:3000/news/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      setData(
        data.map((item) =>
          item.id === id ? { ...item, ...updatedData } : item
        )
      ); // Update item in state
    } catch (error) {
      console.error("Error updating news:", error);
    }
  };

  return (
    <DataContext.Provider
      value={{
        data,
        loading,
        error,
        deleteNews,
        updateNews,
        draftData,
        loadingDrafts,
        isLoggedIn,
        login,
        logout,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
