import { NextResponse } from "next/server";

const API_BASE_URL = "https://fiscal-wizard-api.onrender.com/api";

export async function GET() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);

    if (!response.ok) {
      return NextResponse.json(
        { status: "unhealthy", message: "Backend not responding" },
        { status: 503 }
      );
    }

    const healthData = await response.json();
    return NextResponse.json({ status: "healthy", ...healthData });
  } catch (error) {
    console.error("Health check error:", error);
    return NextResponse.json(
      { status: "unhealthy", message: "Failed to check backend health" },
      { status: 503 }
    );
  }
}
