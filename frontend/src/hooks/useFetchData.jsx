import { useEffect, useState } from 'react';
import { token } from '../config';

const useFetchData = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const res = await fetch(url, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const result = await res.json();

                if (!res.ok) {
                    throw new Error(result.message + '☹️')
                }
                setData(result.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData()
    }, [url])

    return {
        data,
        loading,
        error
    };
};

export default useFetchData;

// import { useEffect, useState } from 'react';

// const useFetchData = (url) => {
//     const [data, setData] = useState(null);  // Use null as default value
//     const [loading, setLoading] = useState(true);  // Default to loading
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             setLoading(true);
//             setError(null);  // Clear previous errors before starting the fetch

//             try {
//                 const token = localStorage.getItem('token');  // Get token dynamically

//                 if (!token) {
//                     throw new Error('No token found. Please log in again.');
//                 }

//                 const res = await fetch(url, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });

//                 if (!res.ok) {
//                     const errorData = await res.json();  // Parse error response if any
//                     throw new Error(errorData.message || 'An error occurred');
//                 }

//                 const result = await res.json();
//                 setData(result.data);  // Update state only with valid data
//             } catch (err) {
//                 setError(err.message || 'An unknown error occurred');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [url]);

//     return {
//         data,
//         loading,
//         error
//     };
// };

// export default useFetchData;
