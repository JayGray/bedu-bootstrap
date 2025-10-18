import { useState, useEffect } from 'react';
import '@unocss/reset/tailwind.css';

interface User {
    id: number;
    name: string;
    email: string;
}

export function App() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/users')
            .then((res) => res.json())
            .then((data) => {
                setUsers(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
                setLoading(false);
            });
    }, []);

    const handleCreateUser = async () => {
        const name = prompt('Enter name:');
        const email = prompt('Enter email:');

        if (!name || !email) return;

        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email })
            });

            const newUser = await response.json();
            setUsers([...users, newUser]);
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">
                        Bedu Bootstrap
                    </h1>

                    <p className="text-gray-600 mb-4">
                        Full-stack template with{' '}
                        <span className="font-semibold">Bun</span>,{' '}
                        <span className="font-semibold">ElysiaJS</span>,{' '}
                        <span className="font-semibold">React</span>, and{' '}
                        <span className="font-semibold">DrizzleORM</span>.
                    </p>

                    <div className="border-t pt-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-700">
                                Users
                            </h2>
                            <button
                                onClick={handleCreateUser}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
                            >
                                Add User
                            </button>
                        </div>

                        {loading ? (
                            <p className="text-gray-500">Loading...</p>
                        ) : users.length === 0 ? (
                            <p className="text-gray-500">
                                No users yet. Click "Add User" to create one!
                            </p>
                        ) : (
                            <ul className="space-y-2">
                                {users.map((user) => (
                                    <li
                                        key={user.id}
                                        className="p-3 bg-gray-50 rounded border border-gray-200"
                                    >
                                        <p className="font-medium text-gray-800">
                                            {user.name}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {user.email}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
