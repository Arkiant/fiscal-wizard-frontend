import { NextRequest, NextResponse } from 'next/server'

const API_BASE_URL = 'https://fiscal-wizard-api.onrender.com/api'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const broker = formData.get('broker') as string
    const language = formData.get('language') as string

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided', details: 'A CSV file is required' },
        { status: 400 }
      )
    }

    // Validate file size (1MB limit)
    if (file.size > 1024 * 1024) {
      return NextResponse.json(
        { error: 'File too large', details: 'Maximum file size is 1MB' },
        { status: 400 }
      )
    }

    // Validate file type
    if (!file.name.toLowerCase().endsWith('.csv')) {
      return NextResponse.json(
        { error: 'Invalid file type', details: 'Only CSV files are accepted' },
        { status: 400 }
      )
    }

    // Create form data for backend
    const backendFormData = new FormData()
    backendFormData.append('file', file)
    backendFormData.append('broker', broker || 'interactive-brokers')
    backendFormData.append('language', language || 'es')

    // Proxy to backend
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      body: backendFormData,
    })

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json(errorData, { status: response.status })
    }

    const result = await response.json()
    return NextResponse.json(result)

  } catch (error) {
    console.error('Upload API route error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: 'Failed to process upload' },
      { status: 500 }
    )
  }
}