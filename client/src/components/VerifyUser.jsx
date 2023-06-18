import { useEffect } from "react";
import { useAuthToken } from "../AuthTokenContext";
import { useNavigate } from "react-router-dom";

export default function VerifyUser() {
    const navigate = useNavigate();
    const { accessToken } = useAuthToken();

    useEffect(() => {
        async function verifyUser() {
            const data = await fetch(`${process.env.REACT_APP_API_URL}/verify-user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const user = await data.json();

            if (user.auth0Id) {
                navigate("/");
            }
        }

        if (accessToken) {
            verifyUser();
        }
    }, [accessToken]);

    return <div className="loading">Loading...</div>;
    }