import { useState, useCallback } from "react";

export type Notification = {
    id: number;
    message: string;
    severity?: "success" | "error" | "warning" | "info";
};

export function useNotification() {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const addNotification = useCallback(
        (message: string, severity: Notification["severity"] = "info") => {
            setNotifications((prev) => [
                ...prev,
                { id: Date.now(), message, severity },
            ]);
        },
        []
    );

    const removeNotification = useCallback((id: number) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, []);

    return { notifications, addNotification, removeNotification };
}
