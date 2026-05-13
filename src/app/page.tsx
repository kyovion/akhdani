import Navbar from '@/components/navbar/navbar-admin'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-100">
      <Navbar />

      <section className="mx-auto max-w-7xl p-8">
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <h1 className="mb-4 text-4xl font-bold">
            Aplikasi Perjalanan Dinas
          </h1>

          <p className="text-slate-600">
            Sistem pengajuan dan approval perjalanan dinas.
          </p>
        </div>
      </section>
    </main>
  )
}