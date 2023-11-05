import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxiosHook = (config, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const makeApiCall = async (requestData) => {
    try {
      setLoading(true);
      const response = await axios({
        ...config,
        data: requestData,
      });
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      // Handle error if needed
    }
  };

  useEffect(() => {
    if (!options.manual) {
      makeApiCall(options.data);
    }

    // Cleanup function if needed
    return () => {
      // Any cleanup logic
    };
  }, []); // Empty dependency array ensures the effect runs only once

  return [{ data, loading }, makeApiCall];
};

export default useAxiosHook;
