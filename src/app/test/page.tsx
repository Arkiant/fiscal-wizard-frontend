import React from 'react';
import { MainLayout } from '@/components/layout';

export default function TestPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Test buttons */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Buttons</h2>
          <div className="space-x-4">
            <button className="btn-primary">Primary Button</button>
            <button className="btn-secondary">Secondary Button</button>
          </div>
        </div>

        {/* Test card */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Card</h2>
          <div className="card p-6 max-w-md">
            <h3 className="text-lg font-semibold mb-2">Test Card</h3>
            <p>This is a test card component.</p>
          </div>
        </div>

        {/* Test dropzone */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Dropzone</h2>
          <div className="dropzone p-8">
            <p>Drag and drop files here</p>
          </div>
        </div>

        {/* Test dragover */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Dropzone (Drag Over)</h2>
          <div className="dropzone dragover p-8">
            <p>Files are being dragged over</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}