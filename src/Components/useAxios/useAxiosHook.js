import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxiosHook = (config, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const makeApiCall = async (requestData) => {
    try {
      setLoading(true);
      const authToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjUsImVtYWlsIjoiYXNrYW51cmFnc2swOEBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiQU5VUkFHIiwibGFzdF9uYW1lIjoiU0lOR0gifQ.dSexaNQT4fVehnRa71Mq3yiKeztIsgvd5laXAExAjXA`
      const response = await axios({
        ...config,
        data: requestData,
        headers: {
          Authorization: `Bearer ${authToken}`,
          ...config.headers, // Include any other headers from the original config
        },
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
