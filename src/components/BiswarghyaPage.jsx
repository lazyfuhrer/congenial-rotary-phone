import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function BiswarghyaPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:2001/api/web3/getData');
        setData(response.data.value);
        setError(null);
      } catch (err) {
        setError('Failed to fetch data from the contract');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Contract Data</h1>
      <p>Value from contract: {data}</p>
    </div>
  );
}