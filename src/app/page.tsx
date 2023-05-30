import { Hero } from './components/Hero'
import { ListOfOffers } from './components/ListOfOffers'
import { getInfoJobsOffers } from './services/getOffers'

export default async function Home() {
  const listOfOffers = await getInfoJobsOffers()

  return (
    <>
      <Hero />
      <main className='mt-5 mx-auto max-w-7xl pb-16 px-4 sm:px-6 lg:px-8'>
        <ListOfOffers offers={listOfOffers} />
      </main>
    </>
  )
}
