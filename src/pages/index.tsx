import { Montserrat } from 'next/font/google'
import Head from 'next/head'
import MainLayout from "@/layouts/MainLayout"
import FirebaseNotify from '@/layouts/FirebaseNotify'

const montserrat = Montserrat({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Common Component Building</title>
        <meta name="description" content="Testing create new application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`${montserrat.className} relative min-h-screen`}>
        <MainLayout>
          {/* <PageContainer /> */}
          {/* <NotificationComponent /> */}
          <FirebaseNotify />
        </MainLayout>
      </div>
    </>
  )
}
