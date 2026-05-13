import Link from 'next/link'

export default function Navbar() {
  return (
    <>
        <nav className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
            <h1 className="text-xl font-bold">
            Travel App
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
                Cities
            </Link>
            </div>
        </div>
        </nav>
    </>
  )
}