// User.tsx

import React, { useState, useEffect } from 'react';

// Define la interfaz para el tipo de usuario
interface User {
    id: number;
    username: string;
    // otros campos que el usuario pueda tener
}

const User = () => {
    // Usa el tipo User[] para el estado de usuarios
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/users/`);
            const data: User[] = await response.json();
            setUsers(data);
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <h1>Users</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.username}</li>
                ))}
            </ul>
        </div>
    );
};

export default User;
