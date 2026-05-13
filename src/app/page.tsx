import Navbar from '@/components/navbar/navbar-admin'

export default async function HomePage() {
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

          <p className="text-slate-600"> --User-- | --Pwd-- </p>
          <p className="text-slate-600"> admin | admin </p>
          <p className="text-slate-600"> sdm | sdm </p>
          <p className="text-slate-600"> user1 | user1 </p>

        </div>
      </section>
     </main>
  )
}