import './globals.css'

export const metadata = {
  title: 'What Genre Is This?',
  description: 'Find out the genres of your favorite songs.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
