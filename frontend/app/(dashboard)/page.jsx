"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardRedirectPage() {
    const router = useRouter();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
            router.push("/login");
            return;
        }

        if (user.role === "admin") {
            router.push("/dashboard/admin");
        } else {
            router.push("/dashboard/user");
        }
    }, [router]);

    return null;
}
