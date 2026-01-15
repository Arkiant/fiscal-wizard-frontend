console.log('✅ validation.ts loaded');

export function validateFile(file: File): { valid: boolean; error?: string } {
  console.log('🔍 Validating file:', file.name, 'Size:', file.size);
  
  // 1. Extension check
  if (!file.name.toLowerCase().endsWith('.csv')) {
    console.error('❌ Invalid file extension');
    return { valid: false, error: 'File must be a CSV file (.csv extension required)' };
  }
  
  // 2. Size check (1MB limit from backend)
  const maxSize = 1024 * 1024; // 1MB
  if (file.size > maxSize) {
    console.error('❌ File too large:', file.size, 'Max:', maxSize);
    return { valid: false, error: `File size must be less than 1MB (current: ${(file.size / 1024 / 1024).toFixed(2)}MB)` };
  }
  
  // 3. Empty file check
  if (file.size === 0) {
    console.error('❌ Empty file');
    return { valid: false, error: 'File cannot be empty' };
  }
  
  console.log('✅ File validation passed');
  return { valid: true };
}