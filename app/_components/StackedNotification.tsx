import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import { Notification } from "./useNotification";

type Props = {
    notifications: Notification[];
    onClose: (id: number) => void;
};

export default function StackedNotifications({ notifications, onClose }: Props) {
    return (
        <>
            {notifications.map((notif, index) => (
                <Snackbar
                    key={notif.id}
                    open
                    autoHideDuration={3000}
                    onClose={() => onClose(notif.id)}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    TransitionComponent={Slide}
                    style={{
                        bottom: 20 + index * 70, // supaya bisa stack
                    }}
                >
                    <Alert
                        onClose={() => onClose(notif.id)}
                        severity={notif.severity}
                        variant="filled"
                        sx={{ width: "100%" }}
                    >
                        {notif.message}
                    </Alert>
                </Snackbar>
            ))}
        </>
    );
}
