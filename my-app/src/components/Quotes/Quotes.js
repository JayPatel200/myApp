import React from "react";
import { useState, useEffect } from "react";
import axios from "../../api/axios";

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  let todaysQuote;

  const fecthQuotes = async () => {
    try {
      const response = await axios.get("https://api.api-ninjas.com/v1/quotes?category=inspirational");
      setQuotes((response?.data));
    } catch (err) {
    }
  };

  useEffect(() => {
    // fecthQuotes();
    // console.log(quotes)
    // todaysQuote = quotes[(Math.floor(Math.random() * 1643) + 1)]
    // console.log(todaysQuote)
  }, []);

  return <div>Quotes</div>;
};

export default Quotes;
