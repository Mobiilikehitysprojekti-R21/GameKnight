import { useCallback, useEffect, useMemo, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import type { Friend } from "../../domain/entities/Friend";
import type { FriendRequest } from "../../domain/entities/FriendRequest";
import { FriendApiRepository } from "../../infrastructure/api/FriendApiRepository";
import { useAuth } from "../auth/useAuth";
import { sendLocalNotification } from "../../ui/services/notifications"; 

export function useFriendsViewModel() {

    const { getAccessToken } = useAuth();
    const friendRepository = new FriendApiRepository(() => getAccessToken());

    const [friends, setFriends] = useState<Friend[]>([]);
    const [loading, setLoading] = useState(true);

    const [incomingRequests, setIncomingRequests] = useState<FriendRequest[]>([]);
    const [busyRequestIds, setBusyRequestIds] = useState<Record<string, boolean>>({});

    // lomakekentät
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");

    // ilmoitukset
    const [error, setError] = useState<string | null>(null);
    const [info, setInfo] = useState<string | null>(null);
    const [nicknameError, setNicknameError] = useState("");
    const [nicknameInfo, setNicknameInfo] = useState("");
    const [emailError, setEmailError] = useState("");
    const [emailInfo, setEmailInfo] = useState("");

    // kaverilistan haku
    const refresh = useCallback(async () => {
        setLoading(true);
        setError(null);
        setInfo(null);
        try {
            const [list, reqList] = await Promise.all([
                friendRepository.getFriends(),
                friendRepository.getIncomingRequests()
            ]);

            setFriends(list);
            setIncomingRequests(reqList);
        } catch (e: any) {
            setError(e?.message ?? "Kavereiden haku epäonnistui");
        } finally {
            setLoading(false);
        }
    }, []);

    // Päivitä aina kun sivu tulee näkyviin 
    useFocusEffect(
        useCallback(() => {
            refresh();
        }, [refresh])
    );

    const sorted = useMemo(
        () => [...friends].sort((a, b) => a.nickname.localeCompare(b.nickname)),
        [friends]
    );

    // Lisää kaveri nicknamellä, kaveri-sivulla
    async function addFriend() {
        const user_id = 1; // NYT KOVAKOODATTU, PITÄISI SAADA TOKENISTA
        setNicknameError("");
        setNicknameInfo("");
        setError(null);
        setInfo(null);

        const value = nickname.trim();
        if (!value) {
            setNicknameError("Syötä käyttäjätunnus");
            return;
        }
        try {
            await friendRepository.addFriend(user_id, value);

            setNickname("");
            setNicknameInfo(`Kaveripyyntö lähetetty: ${value}`);

            await refresh();
        } catch (e: any) {
            setNicknameError(e?.message ?? "Lisäys epäonnistui");
        }
    }

    // Kutsu sähköpostilla
    async function inviteFriend() {
        setEmailError("");
        setEmailInfo("");
        setError(null);
        setInfo(null);

        const value = email.trim().toLowerCase();
        if (!value) {
            setEmailError("Syötä sähköposti");
            return;
        }
        if (!value.includes("@")) {
            setEmailError("Virheellinen sähköposti");
            return;
        }

        try {
            await friendRepository.inviteFriend(value);

            setEmail("");
            setEmailInfo(`Kutsu lähetetty: ${value}`);

            await refresh();
        } catch (e: any) {
            setEmailError(e?.message ?? "Kutsun lähetys epäonnistui");
        }
    }

    // Hyväksy kaveripyyntö
    async function acceptIncomingRequest(request_id: string) {
        setError(null);
        setInfo(null);
        setBusyRequestIds(prev => ({ ...prev, [request_id]: true }));

        // Optimistic ui: poista pyyntö listasta heti
        const req = incomingRequests.find(r => r.request_id === request_id);
        setIncomingRequests(prev => prev.filter(r => r.request_id !== request_id));

        try {
            await friendRepository.acceptRequest(request_id);
            await refresh();

            setInfo("Kaveripyyntö hyväksytty");

             await sendLocalNotification({
              type: 'friend_request',
              title: '✓ Kaveri lisätty',
              body: `${req?.from_nickname} on nyt kaverisi!`,
              data: { requestId: request_id, requesterNickname: req?.from_nickname }
            });

        } catch (e: any) {
            // rollback: palauta pyyntö jos epäonnistui
            if (req) setIncomingRequests(prev => [req, ...prev]);
            setError(e?.message ?? "Hyväksyminen epäonnistui");
        } finally {
            setBusyRequestIds(prev => {
                const copy = { ...prev };
                delete copy[request_id];
                return copy;
            });
        }
    }

    async function declineIncomingRequest(request_id: string) {
        setError(null);
        setInfo(null);
        setBusyRequestIds(prev => ({ ...prev, [request_id]: true }));

        // Optimistic ui
        const req = incomingRequests.find(r => r.request_id === request_id);
        setIncomingRequests(prev => prev.filter(r => r.request_id !== request_id));

        try {
            await friendRepository.declineRequest(request_id);
            await refresh();

            setInfo("Kaveripyyntö hylätty");
        } catch (e: any) {
            // rollback
            if (req) setIncomingRequests(prev => [req, ...prev]);
            setError(e?.message ?? "Hylkäys epäonnistui");
        } finally {
            setBusyRequestIds(prev => {
                const copy = { ...prev };
                delete copy[request_id];
                return copy;
            });
        }
    }

    return {
        friends: sorted,
        loading,
        nickname,
        setNickname,
        email,
        setEmail,
        addFriend,
        inviteFriend,
        error,
        info,
        nicknameError,
        nicknameInfo,
        emailError,
        emailInfo,
        incomingRequests,
        busyRequestIds,
        acceptIncomingRequest,
        declineIncomingRequest,
    };
}