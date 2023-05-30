import { NextResponse } from 'next/server'
import { Configuration, ChatCompletionRequestMessageRoleEnum, OpenAIApi } from 'openai'

const infoJobsToken = process.env.INFOJOBS_TOKEN ?? ''
const openaiToken = process.env.OPENAI_TOKEN ?? ''

const configuration = new Configuration({ apiKey: openaiToken })
const openai = new OpenAIApi(configuration)

const INITIAL_MESSAGES = [
  {
    role: ChatCompletionRequestMessageRoleEnum.System,
    content: 'Eres un asistente útil.'
  }
]

const DEFAULT_MESSAGE = `Crea un texto de máximo 300 caracteres con recomendaciones para resaltar en la carta de presentación de los aspirantes a este puesto laboral. Hazlo para ayudarme a mi que estoy buscando quedar en este trabajo. No crees una lista. No crees una carta de presentación. Responde con un texto de máximo 300 caracteres. No crees llamados a la acción. Arranca diciendo "Asegurate de" y luego escribe tu recomendación.
Por ejemplo: Asegurate de destacar tu experiencia en análisis y programación Java, demostrando tu habilidad en proyectos con metodología Scrum. Menciona tu interés en estar al día con las últimas tendencias tecnológicas. Destaca tu capacidad de trabajo en equipo y tu deseo de seguir mejorando. Asegúrate de resaltar tu capacidad para adaptarte a un entorno innovador y tu disposición para aprender y crecer profesionalmente.
Búsqueda Laboral:`

async function getOfferDescriptionById(id: string) {
  const res = await fetch(`https://api.infojobs.net/api/7/offer/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${infoJobsToken}`
    }
  })

  const { description } = await res.json()

  return description
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (id == null) return new Response('Missing id', { status: 400 })

  const description: string = await getOfferDescriptionById(id)

  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    temperature: 0,
    messages: [
      ...INITIAL_MESSAGES,
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: `${DEFAULT_MESSAGE} ${description}`
      }
    ]
  })

  const data = completion.data.choices[0].message?.content ?? ''

  try {
    return NextResponse.json(data)
  } catch {
    return new Response('No se ha podido transformar el JSON', { status: 500 })
  }
}
