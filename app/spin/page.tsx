/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import MainSpinPage from '../_components/MainSpinPage';
import { Metadata } from 'next';

export function generateMetadata(): Metadata {
    return {
        title: "Wheel of Names | Random name",
        // description: '',
    }
}

const SpinPage = () => {
    return (
        <MainSpinPage />
    );
};

export default SpinPage;