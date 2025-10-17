"use client";

import React, { useState } from "react";
import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,
    Stack,
    CircularProgress,
} from "@mui/material";
import axios from "axios";
// import Swal from "sweetalert2";

interface AddParticipantBulkModalProps {
    open: boolean;
    onClose: () => void;
}

export default function AddParticipantBulkModal({
    open,
    onClose,
}: AddParticipantBulkModalProps) {
    const [names, setNames] = useState("");
    const [loading, setLoading] = useState(false);

    const generateToken = (name: string) => {
        const clean = name.trim().replace(/\s+/g, "_").toLowerCase();
        const rand = Math.random().toString(36).substring(2, 8);
        return `${clean}_${rand}`;
    };

    const handleSubmit = async () => {
        const list = names
            .split("\n")
            .map((n) => n.trim())
            .filter((n) => n.length > 0);

        if (list.length === 0) {
            //   Swal.fire({
            //     icon: "warning",
            //     title: "Tidak ada nama",
            //     text: "Masukkan minimal satu nama peserta.",
            //   });
            return;
        }

        setLoading(true);
        try {
            // Ambil token yang sudah ada
            const res = await axios.get("/api/participants");
            const existing = res.data || [];
            const existingTokens = new Set(existing.map((p: any) => p.token?.trim()));

            // Buat peserta baru
            const participants = list.map((name) => ({
                name,
                companyName: "",
                token: generateToken(name),
            }));

            // Filter token duplikat
            const uniqueParticipants = participants.filter(
                (p) => !existingTokens.has(p.token)
            );

            if (uniqueParticipants.length === 0) {
                // Swal.fire({
                //   icon: "info",
                //   title: "Tidak ada peserta baru",
                //   text: "Semua peserta sudah ada di database.",
                // });
                setLoading(false);
                return;
            }

            await axios.post("/api/participants", {
                participants: uniqueParticipants,
            });

            //   Swal.fire({
            //     icon: "success",
            //     title: "Berhasil!",
            //     text: `${uniqueParticipants.length} peserta berhasil ditambahkan.`,
            //     timer: 2000,
            //     showConfirmButton: false,
            //   });

            setNames("");
            onClose();
        } catch (error: any) {
            //   Swal.fire({
            //     icon: "error",
            //     title: "Gagal menambahkan peserta",
            //     text: error.message || "Terjadi kesalahan saat menambahkan peserta.",
            //   });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: "absolute" as const,
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 500,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    borderRadius: 2,
                    p: 4,
                }}
            >
                <Typography variant="h6" mb={2}>
                    Add Participants (Bulk)
                </Typography>

                <Stack spacing={2}>
                    <TextField
                        label="Daftar Nama Peserta"
                        multiline
                        minRows={6}
                        placeholder="Masukkan nama peserta, pisahkan dengan baris baru"
                        value={names}
                        onChange={(e) => setNames(e.target.value)}
                        fullWidth
                    />

                    <Stack direction="row" justifyContent="flex-end" spacing={2}>
                        <Button onClick={onClose} variant="outlined" disabled={loading}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            variant="contained"
                            color="primary"
                            disabled={loading}
                            startIcon={
                                loading ? <CircularProgress size={20} color="inherit" /> : null
                            }
                        >
                            {loading ? "Menambahkan..." : "Tambah Peserta"}
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </Modal>
    );
}
