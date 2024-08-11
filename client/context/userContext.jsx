// import axios from 'axios';
// import { createContext, useEffect, useState } from 'react';

// export const UserContext = createContext({});

// export function UserContextProvider({ children }) {
//     const [user, setUser] = useState(null);

//     useEffect(() => {
//         axios.get('/dashboard')
//             .then(({ data }) => {
//                 console.log('User data:', data); // Log the user data
//                 setUser(data); // Ensure data has a name field
//             })
//             .catch((error) => {
//                 console.error('Error fetching user profile:', error);
//             });
//     }, []);

//     return (
//         <UserContext.Provider value={{ user, setUser }}>
//             {children}
//         </UserContext.Provider>
//     );
// }







// src/context/UserContext.jsx
import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Create an Axios instance with the base URL
const axiosInstance = axios.create({
    baseURL: 'https://e-learning-qk1g.onrender.com',
    withCredentials: true, // Include credentials (cookies) with requests
});

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.get('/api/auth/profile')
            .then(({ data }) => {
                console.log('User data:', data); // Log the user data
                setUser(data); // Ensure data has a name field
            })
            .catch((error) => {
                console.error('Error fetching user profile:', error);
                setUser(null);
            });
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await axiosInstance.post('/api/auth/login', { email, password });
            setUser(data);
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    const logout = async () => {
        try {
            await axiosInstance.post('/api/auth/logout');
            setUser(null);
            navigate('/login'); // Redirect to login page
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}
