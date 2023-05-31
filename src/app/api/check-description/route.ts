import { NextResponse } from 'next/server'

const infoJobsToken = process.env.INFOJOBS_TOKEN ?? ''

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (id == null) return new Response('Missing id', { status: 400 })

  const res = await fetch(`https://api.infojobs.net/api/7/offer/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${infoJobsToken}`
    }
  })
  const { description } = await res.json()

  try {
    return NextResponse.json(description)
  } catch {
    return new Response('No se ha podido transformar el JSON', { status: 500 })
  }
}
