/**
 * Author: Anvar Kilybayev
 * Login: xkilyb00
 * Date: 17.12.2023
 * 
 */

import { useEffect, useState } from "react"

const useFetch = (url) => {
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
    
            try {
                const res = await fetch(url);
                const json = await res.json();
            
                setData(json);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        }

        fetchData()
    }, []);

    const updateData = async (newItem) => {
        setData(newItem);
    }

    return { loading, error, data, updateData }
}

export default useFetch