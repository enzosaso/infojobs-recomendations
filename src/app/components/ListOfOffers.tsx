'use client'

import { Grid, Card, Text, Title, Flex, Button, Badge, ProgressBar } from '@tremor/react'
import { LightBulbIcon, ArrowNarrowRightIcon } from '@heroicons/react/solid'

import { Offer } from '../types'
import { useState } from 'react'
import { Score } from './Score'
import { getChatGPT } from '../services/getChatGPT'

export function ListOfOffers(props: { offers: Offer[] }) {
  const { offers } = props

  const [loading, setLoading] = useState<{ [key: string]: boolean }>({})
  const [scores, setScores] = useState<{
    [key: string]: string
  }>({})

  const calculateExpPercentage = (exp: string) => {
    const number = parseInt(exp.split(' ')[2])
    return number * 10
  }

  const handleClick = async (id: string) => {
    setLoading(prevLoading => ({
      ...prevLoading,
      [id]: true
    }))

    try {
      const res = await getChatGPT(id)

      setScores(prevScores => ({
        ...prevScores,
        [id]: res
      }))
    } finally {
      setLoading(prevLoading => ({
        ...prevLoading,
        [id]: false
      }))
    }
  }

  return (
    <div id='empleos' className='mt-5'>
      <Flex justifyContent='start' className='mb-3 space-x-2'>
        <Title>Ofertas de trabajo de InfoJobs</Title>
        <Badge className='bg-[#c0d8e8] text-white'>{offers.length}</Badge>
      </Flex>
      <Grid numCols={1} numColsSm={2} numColsLg={3} className='gap-4'>
        {offers.map(item => (
          <Card key={item.id} className='max-w-md h-fit'>
            <Badge className='mb-2 bg-[#167db7] text-white'>{item.province}</Badge>
            <Title>{item.title}</Title>
            <Text>{item.salaryDescription}</Text>
            <ProgressBar percentageValue={calculateExpPercentage(item.experienceMin)} color='zinc' className='mt-6' />
            <Text className='mt-2'>Experiencia: {item.experienceMin}</Text>
            <Score message={scores[item.id]} />
            <Flex className='mt-6 pt-4 border-t'>
              <Button
                size='xs'
                className='text-[#ff6340] hover:text-[#ff6340]'
                variant='light'
                icon={LightBulbIcon}
                iconPosition='right'
                loading={loading[item.id]}
                loadingText='Analizando...'
                onClick={async event => {
                  event.stopPropagation()
                  await handleClick(item.id)
                }}
              >
                Obtener recomendación
              </Button>
              <Button
                size='xs'
                className='text-[#167db7] hover:text-[#167db7]'
                variant='light'
                icon={ArrowNarrowRightIcon}
                onClick={() => {
                  window.open(item.link, '_blank')
                }}
              >
                Ver oferta
              </Button>
            </Flex>
          </Card>
        ))}
      </Grid>
    </div>
  )
  // <Card className='mt-5'>
  //   <Flex justifyContent='start' className='space-x-2'>
  //     <Title>Ofertas de trabajo de InfoJobs</Title>
  //     <Badge color='gray'>{offers.length}</Badge>
  //   </Flex>

  //   <Text className='mt-2'>Las últimas ofertas de trabajo</Text>

  //   <Table className='mt-6'>
  //     <TableHead>
  //       <TableRow>
  //         <TableHeaderCell>Puesto</TableHeaderCell>
  //         <TableHeaderCell>Provincia</TableHeaderCell>
  //         <TableHeaderCell>Experiencia</TableHeaderCell>
  //         <TableHeaderCell className='text-center'>Acción</TableHeaderCell>
  //       </TableRow>
  //     </TableHead>

  //     <TableBody>
  //       {offers.map(item => (
  //         <Fragment key={item.id}>
  //           <TableRow
  //             className='transition-colors cursor-pointer hover:bg-sky-300'
  //             onClick={() => {
  //               window.open(item.link, '_blank')
  //             }}
  //           >
  //             <TableCell>{item.title}</TableCell>
  //             <TableCell>{item.province}</TableCell>
  //             <TableCell>{item.experienceMin}</TableCell>
  //             <TableCell className='text-center'>
  //               <Button
  //                 disabled={Boolean(scores[item.id])}
  //                 loading={loading[item.id]}
  //                 loadingText='Revisando...'
  //                 onClick={async event => {
  //                   event.stopPropagation()
  //                   await handleClick(item.id)
  //                 }}
  //                 size='xs'
  //                 variant='secondary'
  //                 color='gray'
  //               >
  //                 Obtener recomendación
  //               </Button>
  //             </TableCell>
  //           </TableRow>
  //           <Score message={scores[item.id]} />
  //         </Fragment>
  //       ))}
  //     </TableBody>
  //   </Table>
  // </Card>
}
