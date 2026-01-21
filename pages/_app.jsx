import '@/styles/globals.css';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { useState } from 'react';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isAuthPage =
    router.pathname === '/login' ||
    router.pathname === '/signup' ||
    router.pathname === '/forgot-password';

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  if (isAuthPage) {
    return (
      <>
        <Head>
          <title>Falcon - Faculty Analytics & Learning Console</title>
          <meta
            name="description"
            content="AI-powered analytics dashboard for competitive exam coaching institutes"
          />
        </Head>
        <Component {...pageProps} />
      </>
    );
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
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar + mobile overlay */}
        <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />

        <div className="flex-1 flex flex-col md:ml-64">
          <TopBar onToggleSidebar={handleToggleSidebar} />
          <main className="px-4 sm:px-6 md:px-8 pt-16 sm:pt-20 pb-8">
            <div className="max-w-7xl mx-auto w-full">
              <Component {...pageProps} />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
