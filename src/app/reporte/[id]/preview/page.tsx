import React from 'react';
import { notFound } from 'next/navigation';
import { MainLayout } from '@/components/layout';
import ReportPreviewClient from './ReportPreviewClient';

interface ReportPreviewPageProps {
  params: Promise<{ id: string }>;
}

export default async function ReportPreviewPage({ params }: ReportPreviewPageProps) {
  const { id: reportId } = await params;

  if (!reportId) {
    notFound();
  }

  return (
    <MainLayout>
      <ReportPreviewClient reportId={reportId} />
    </MainLayout>
  );
}