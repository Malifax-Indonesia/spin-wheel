/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Metadata } from 'next';
import MainSpinPage from './_components/MainSpinPage';

export function generateMetadata(): Metadata {
  return {
    title: "Wheel of Names | Random name",
    // description: '',
  }
}

const DefaultPage = () => {
  return (
    <MainSpinPage />
  );
};

export default DefaultPage;