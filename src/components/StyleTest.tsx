import React from 'react';

export default function StyleTest() {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Style Test</h1>

      {/* Test buttons */}
      <div className="space-y-2">
        <button className="btn-primary mr-4">Primary Button</button>
        <button className="btn-secondary">Secondary Button</button>
      </div>

      {/* Test card */}
      <div className="card p-6 max-w-md">
        <h2 className="text-lg font-semibold mb-2">Test Card</h2>
        <p>This is a test card with the card class.</p>
      </div>

      {/* Test dropzone */}
      <div className="dropzone p-8">
        <p>Dropzone test area</p>
      </div>

      {/* Test dragover state */}
      <div className="dropzone dragover p-8">
        <p>Dropzone dragover test</p>
      </div>
    </div>
  );
}