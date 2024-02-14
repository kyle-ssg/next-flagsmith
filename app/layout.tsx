import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './styles/index.scss'
import Nav from '@/app/components/Nav'
import useDefaultUser from '@/app/hooks/useDefaultUser'
import { createFlagsmithInstance } from 'flagsmith/isomorphic'
import FeatureFlagProvider from '@/app/components/FeatureFlagProvider'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Flagsmith with Next.js',
  description: 'Generated by create next app',
}
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const defaultUser = useDefaultUser()
  const flagsmith = createFlagsmithInstance()
  await flagsmith.init({
    environmentID: '5zsj2BaedF6BcBHXLNGqUj',
    identity: defaultUser?.id,
  })
  const serverState = flagsmith.getState()
  console.log(serverState)
  return (
    <html lang='en'>
      <FeatureFlagProvider serverState={serverState}>
        <body className={inter.className}>
          <Nav defaultUser={defaultUser} />
          {children}
        </body>
      </FeatureFlagProvider>
    </html>
  )
}
