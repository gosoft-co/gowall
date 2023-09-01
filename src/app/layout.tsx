import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import WebsiteNavigation from '@/app/_containers/website/WebsiteNavigation'
import { Amplify } from 'aws-amplify'
import awsExports from '@/aws-exports'

Amplify.configure({ ...awsExports, ssr: true })

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Go Wall App',
  description: 'Aplicación para publicar historias',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <WebsiteNavigation />
            <div className="ml-auto flex items-center space-x-4">
            </div>
          </div>
        </div>
        {children}
      </body>
    </html>
  )
}
