export type SessionPlayer = {
    session_id: number;
    user_id?: number | null;
    name?: string | null;
    guest_name?: string | null;
    score?: number;
    is_winner?: boolean;
};
