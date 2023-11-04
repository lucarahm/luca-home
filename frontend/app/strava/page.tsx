import React from 'react';

interface User {
    id: number
    name: string
    username: string
    email: string
}

const StravaPage = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    const users: User[] = await res.json()

    return (
        <>
            <h1>Users</h1>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>EMail</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                </tr> )}
                </tbody>
            </table>
        </>
    );
};

export default StravaPage;