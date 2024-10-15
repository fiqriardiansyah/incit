import React from "react";
import { useSearchParams } from "react-router-dom";
import Cookies from "js-cookie";

export default function SetCookie() {
    const [searchParams, setSearchParams] = useSearchParams();

    const tokenUrl = searchParams.get("token");

    React.useEffect(() => {
        if (tokenUrl) {
            Cookies.set("token", tokenUrl);
            searchParams.delete("token");
            setSearchParams(searchParams);
            window.location.href = "/dashboard";
        }
    }, [tokenUrl]);

    return null;
}