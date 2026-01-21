import '@/styles/globals.css';
import Sidebar from '@/components/Sidebar';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Falcon - Faculty Analytics & Learning Console</title>
        <meta name="description" content="AI-powered analytics dashboard for competitive exam coaching institutes" />
      </Head>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 ml-64 p-8">
          <div className="max-w-7xl mx-auto">
            <Component {...pageProps} />
          </div>
        </main>
      </div>
    </>
  );
}
