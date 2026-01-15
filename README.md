# Fiscal Wizard Frontend

MVP frontend for Spanish IRPF tax calculation system.

## Features

- ✅ Drag & drop CSV file upload
- ✅ Real-time validation (file type, size)
- ✅ Integration with Rust backend (localhost:8080)
- ✅ HTML report generation and display
- ✅ Download generated reports
- ✅ Responsive design with Tailwind CSS
- ✅ Loading states and error handling
- ✅ Fullscreen report viewing

## Technology Stack

- **React 18** + TypeScript
- **Vite** for development and building
- **Tailwind CSS** for styling
- **React Dropzone** for file upload
- **Type-safe** API integration

## Development

### Prerequisites

- Node.js 18+
- Backend running on `http://localhost:8080`

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Development URLs

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8080`
- API Documentation: `../docs/backend/api-documentation.md`

## Project Structure

```
src/
├── components/
│   ├── FileUpload.tsx      # Drag & drop file upload
│   ├── ReportViewer.tsx     # HTML report display
│   └── Loading.tsx         # Loading states
├── services/
│   └── api.ts             # Backend API client
├── utils/
│   └── validation.ts       # File validation utilities
├── types/
│   └── index.ts           # TypeScript type definitions
├── App.tsx                # Main application component
├── main.tsx               # Application bootstrap
└── index.css              # Tailwind styles
```

## Usage

1. Start the backend (`cd tax_wizzard && cargo run -- --mode web`)
2. Start the frontend (`cd frontend && npm run dev`)
3. Open `http://localhost:3000`
4. Drag and drop your Interactive Brokers CSV file
5. View and download your tax report

## Backend Integration

The frontend integrates with the Rust backend through two main API calls:

1. **Upload**: `POST /api/upload` - Processes CSV and returns report UUID
2. **Download**: `GET /api/reports/{id}/download` - Retrieves HTML report

Both endpoints include proper error handling and type safety.

## Future Enhancements

- [ ] Multiple broker support
- [ ] Tax report comparison (year-over-year)
- [ ] Advanced tax optimization suggestions
- [ ] User authentication and report history
- [ ] Export to PDF format
- [ ] Real-time tax calculation
- [ ] Tax bracket visualizations