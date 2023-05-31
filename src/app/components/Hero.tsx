'use client'

import Link from 'next/link'
import { Krub, Archivo_Black } from 'next/font/google'

const mplus1p = Krub({
  subsets: ['latin'],
  weight: '300'
})

const archivoBlack = Archivo_Black({
  subsets: ['latin'],
  weight: '400'
})

export function Hero() {
  return (
    <div
      className='h-screen flex justify-center items-center flex-col mt-[-50px]'
      style={{
        backgroundImage:
          'linear-gradient(to bottom, #ffffff, #fefefe, #fcfdfc, #fbfbfb, #fafafa, #f9f9f9, #f7f8f8, #f6f7f6, #f5f6f6, #f4f5f5, #f3f3f3, #f2f2f2)'
      }}
    >
      <h1
        className={`${archivoBlack.className} text-slate-900 text-center max-w-4xl mx-auto text-5xl font-medium tracking-tight font-display sm:text-6xl`}
      >
        Obtén <span className='text-[#167db7]'>recomendaciones</span> para postular a empleos
      </h1>
      <p className={`${mplus1p.className} text-center max-w-xl mx-auto mt-6 text-lg tracking-tight text-slate-700`}>
        Descubre los elementos clave para potenciar tu carta de presentación y destacar en tu búsqueda laboral.
      </p>
      <div className='flex justify-center mt-10 gap-x-6'>
        <Link
          className={`${mplus1p.className} py-2 px-4 bg-[#167db7] hover:bg-[#0c5077] text-white rounded-full`}
          href='#empleos'
        >
          Ir a empleos
        </Link>
      </div>
    </div>
  )
}
