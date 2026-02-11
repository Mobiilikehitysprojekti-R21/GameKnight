import { useState } from 'react';

type User = {
    id: string;
    name: string;
};

const ALL_USERS: User[] = [
    { id: "u1", name: "Masa" },
    { id: "u2", name: "Maria" },
    { id: "u3", name: "Tenho" },
    { id: "u4", name: "Ella" },
    { id: "u5", name: "Riina" },
    { id: "u6", name: "Sepi" },
];

export const useUserSearchViewModel = () => {
    const [results, setResults] = useState<User[]>([]);

    const search = (query: string) => {
        setResults(
            ALL_USERS.filter(u =>
                u.name.toLowerCase().includes(query.toLowerCase())
            )
        );
    };

    return { results, search };
};
