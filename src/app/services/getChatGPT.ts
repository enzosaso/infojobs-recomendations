const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY ?? ''
const DEFAULT_MESSAGE = `Crea un texto de máximo 300 caracteres con recomendaciones para resaltar en la carta de presentación de los aspirantes a este puesto laboral. Hazlo para ayudarme a mi que estoy buscando quedar en este trabajo. No crees una lista. No crees una carta de presentación. Responde con un texto de máximo 300 caracteres. No crees llamados a la acción. Arranca diciendo "Asegurate de" y luego escribe tu recomendación.
Por ejemplo: Asegurate de destacar tu experiencia en análisis y programación Java, demostrando tu habilidad en proyectos con metodología Scrum. Menciona tu interés en estar al día con las últimas tendencias tecnológicas. Destaca tu capacidad de trabajo en equipo y tu deseo de seguir mejorando. Asegúrate de resaltar tu capacidad para adaptarte a un entorno innovador y tu disposición para aprender y crecer profesionalmente.
Búsqueda Laboral:`

async function getOfferDescriptionById(id: string) {
  const res = await fetch(`/api/check-description?id=${id}`, {
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return await res.json()
}

export const getChatGPT = async (id: string) => {
  const description: string = await getOfferDescriptionById(id)

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'system', content: 'Eres un asistente útil.' }].concat({
        role: 'user',
        content: `${DEFAULT_MESSAGE} ${description}`
      })
    })
  })

  const completion = await res.json()
  return completion.choices[0].message?.content ?? ''
}
