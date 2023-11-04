import { useCallback, useEffect, useState } from "react";

const useFetch = (url) => {
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchData = async () => {
        setLoading(true);
    
        try {
          const res = await fetch(url);
          const json = await res.json();
          console.log(json)
    
          setData(json);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
      }, []);

    const updateData = async (newItem) => {
        const res = await fetch(url);
        const json = await res.json();
        
        setData(json);
    }

    return { loading, error, data, updateData }
}

export default useFetch