import '@/styles/globals.css'
import Sidebar from '@/components/layout/Sidebar'
import TopBar from '@/components/layout/TopBar'
import Head from 'next/head'
import ErrorBoundary from '@/components/ErrorBoundary'

import { useState } from 'react'

export default function App({ Component, pageProps }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev)
  }

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false)
  }

  return (
    <>
      <Head>
        <title>Falcon - Faculty Analytics & Learning Console</title>
        <meta
          name="description"
          content="AI-powered analytics dashboard for competitive exam coaching institutes"
        />
      </Head>
      <ErrorBoundary>
        <div className="flex min-h-screen bg-gray-50">
          {/* Sidebar + mobile overlay */}
          <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />

          <div className="flex-1 flex flex-col md:ml-64">
            <TopBar onToggleSidebar={handleToggleSidebar} />
            <main className="px-4 sm:px-6 md:px-8 pt-16 sm:pt-20 pb-8">
              <div className="w-full">
                <Component {...pageProps} />
              </div>
            </main>

          </div>
        </div>
        
        {/* Prototype Watermark */}
        <div className="fixed bottom-6 left-6 md:left-72 z-[9999] pointer-events-none">
          <div className="bg-white/95 backdrop-blur-md border border-red-200 text-red-600 px-4 py-2.5 rounded-full shadow-xl shadow-red-100/50 text-xs font-bold flex items-center gap-2.5 transition-all relative pointer-events-auto hover:scale-105">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
            </span>
            <span className="tracking-wide uppercase text-[10px] sm:text-xs">This is a prototype - Contact admin for actual feature</span>
          </div>
        </div>
      </ErrorBoundary>
    </>
  )
}
