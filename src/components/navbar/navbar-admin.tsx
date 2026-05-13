import Link from 'next/link'
import { getSession } from '@/lib/session'

export default async function Navbar() {
  const session = await getSession()
  return (
    <>
        <nav className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
            <h1 className="text-xl font-bold">
            Perjalanan Dinas
            </h1>

            <div className="flex gap-4">
            <Link href="/" className="bg-red-500 text-white cursor-pointer rounded">
                Home
            </Link>

            {session && session.role == 'ADMIN' &&(
            <Link href="/admin/users" className="bg-red-500 text-white cursor-pointer rounded">
                Users
            </Link>
            )}

            {session && session.role == 'ADMIN' &&(
            <Link href="/admin/cities" className="bg-red-500 text-white cursor-pointer rounded">
                Kota
            </Link>
            )}

            {session &&(
            <Link href="/request/create" className="bg-red-500 text-white cursor-pointer rounded">
                Request Perdin
            </Link>
            )}

            {session && (session.role == 'ADMIN' || session.role == 'SDM') &&(
            <Link href="/request" className="bg-red-500 text-white cursor-pointer rounded">
                List Request Perdin
            </Link>
            )}

            {session &&(
            <div className="bg-red-500 text-white rounded">
                Login sebagai: {session?.username}
            </div>
            )}
            
            {!session &&(
            <Link href="/login" className="bg-red-500 text-white cursor-pointer rounded">
                Login
            </Link>)
            }
            {session &&(
            <form action="/api/auth/logout" method="POST">
                <button className="bg-red-500 text-white cursor-pointer rounded">
                    Logout
                </button>
            </form>
            )}
            </div>
        </div>
        </nav>
    </>
  )
}