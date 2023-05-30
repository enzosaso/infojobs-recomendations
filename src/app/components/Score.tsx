import { Callout } from '@tremor/react'
import { TrendingUpIcon } from '@heroicons/react/solid'

export function Score(props: { message: string }) {
  const { message } = props

  if (message == null) return null

  return (
    <Callout className='mt-6' title='Recomendación' icon={TrendingUpIcon} color='emerald'>
      {message}
    </Callout>
  )
}
