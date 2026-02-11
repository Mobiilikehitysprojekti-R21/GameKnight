import { useEffect, useState } from 'react';

type Friend = {
    id: string;
    nickname: string;
};

export const useFriendsViewModel = () => {
    const [friends, setFriends] = useState<Friend[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        // DUMMY 
        setTimeout(() => {
            setFriends([
                { id: "u1", nickname: "Masa" },
                { id: "u2", nickname: "Maria" },
                { id: "u3", nickname: "Tenho" },
                { id: "u4", nickname: "Ella" },
                { id: "u5", nickname: "Riina" },
                { id: "u6", nickname: "Sepi" },
            ]);
            setLoading(false);
        }, 300);
    }, []);

    return { friends, loading };
};
