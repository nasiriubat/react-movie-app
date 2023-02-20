import { useState, useEffect } from "react";

const useFetch = (url, title) => {
    const [data, setData] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        fetch(`${url}&s=${title}`)
            .then(res => {
                if (!res.ok) {
                    throw Error(`Couldn't fetch the data for ${title}`);
                }
                return res.json();
            })
            .then(data => {
                setData(data);
                setIsPending(false);
                setError(null);
            })
            .catch((err) => {
                setIsPending(false);
                setError(err.message);
            });
    }, [url,title]);

    return { data, isPending, error };
}

export default useFetch;