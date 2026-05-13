import Link from 'next/link'

export default function Navbar() {
  return (
    <>
        <nav className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
            <h1 className="text-xl font-bold">
            Perjalanan Dinas
            </h1>

            <div className="flex gap-4">
            <Link href="/">
                Home
            </Link>
            {` || `}
            <Link href="/admin/users">
                Admin Users
            </Link>
            {` || `}
            <Link href="/admin/cities">
                Kota
            </Link>
            {` || `}
            <Link href="/request/create">
                Request Perdin
            </Link>
            </div>
        </div>
        </nav>
    </>
  )
}