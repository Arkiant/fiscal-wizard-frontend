import { NextRequest, NextResponse } from 'next/server'

const API_BASE_URL = 'https://fiscal-wizard-api.onrender.com/api'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: reportId } = await params
    const lang = request.nextUrl.searchParams.get('lang') || 'es'

    if (!reportId) {
      return NextResponse.json(
        { error: 'Report ID is required' },
        { status: 400 }
      )
    }

    // Proxy to backend
    const response = await fetch(
      `${API_BASE_URL}/reports/${reportId}/download?lang=${lang}`,
      {
        headers: {
          'Accept': 'text/html',
        },
      }
    )

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to download report', details: `Backend returned ${response.status}` },
        { status: response.status }
      )
    }

    // Get the HTML content
    const htmlContent = await response.text()

    // Return HTML with proper content type
    return new NextResponse(htmlContent, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    })

  } catch (error) {
    console.error('Download API route error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: 'Failed to download report' },
      { status: 500 }
    )
  }
}