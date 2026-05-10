import { NextResponse } from 'next/server';
// Forced rebuild comment 2

export async function POST(req: Request) {
  try {
    const { city, days = 4 } = await req.json();

    if (!city) {
      return NextResponse.json({ error: "City is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({ error: "GEMINI_API_KEY is missing from environment variables." }, { status: 500 });
    }

    const prompt = `You are an expert travel planner. Generate a realistic ${days}-day itinerary and budget breakdown for a trip to ${city}, India.
    
    Respond STRICTLY with valid JSON in exactly this format, with no markdown formatting or extra text:
    {
      "tripName": "Mystic ${city} Escapade",
      "budget": {
        "total": <number>,
        "flights": <number>,
        "accommodation": <number>,
        "food": <number>,
        "activities": <number>,
        "dailyAverage": <number>,
        "currency": "USD",
        "savingsTip": "<string>"
      },
      "itinerary": [
        {
          "id": "day-1",
          "label": "Day 1",
          "city": "${city}",
          "activities": [
            {
              "time": "09:00 AM",
              "title": "<string>",
              "description": "<string>",
              "type": "<food|nature|history|travel|shopping>",
              "cost": "<number>"
            }
          ]
        }
      ]
    }`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            responseMimeType: "application/json",
          },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API Request Error:", errText);
      return NextResponse.json({ error: "Failed to generate AI content" }, { status: 500 });
    }

    const data = await response.json();
    const textResponse = data.candidates[0].content.parts[0].text;
    
    // Parse the JSON strictly
    const parsedData = JSON.parse(textResponse);
    
    return NextResponse.json(parsedData);
    
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
