import { Logo } from './components/Logo'
import './globals.css'
import { Inter, Krub } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const mplus1p = Krub({
  subsets: ['latin'],
  weight: '300'
})

export const metadata = {
  title: 'InfoJobs - Recomendations',
  description: 'Una pequeña herramienta que te proporciona recomendaciones para mejorar tus postulaciones en InfoJobs'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='es'>
      <body className={inter.className}>
        <header className='py-5 px-10 sticky top-0 z-40 flex justify-start align-middle gap-4 bg-white'>
          <Logo />
          <h1 className={`${mplus1p.className} flex flex-col items-center justify-center text-2xl font-light`}>
            Recomendations
          </h1>
        </header>

        {children}
      </body>
    </html>
  )
}
