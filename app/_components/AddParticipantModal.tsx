import React, { useState } from "react";
import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,
    Stack,
} from "@mui/material";

interface AddParticipantModalProps {
    open: boolean;
    onClose: () => void;
}

export default function AddParticipantModal({
    open,
    onClose,
}: AddParticipantModalProps) {
    const [name, setName] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [token, setToken] = useState("");

    const handleSubmit = () => {
        if (!name || !token) return alert("Name and Token are required!");
        setName("");
        setCompanyName("");
        setToken("");
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: "absolute" as const,
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    borderRadius: 2,
                    p: 4,
                }}
            >
                <Typography variant="h6" mb={2}>
                    Add Participant
                </Typography>
                <Stack spacing={2}>
                    <TextField
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Company Name"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Token"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        fullWidth
                    />
                    <Stack direction="row" justifyContent="flex-end" spacing={2} mt={2}>
                        <Button onClick={onClose} variant="outlined">
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} variant="contained" color="primary">
                            Add
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </Modal>
    );
}
