import Link from 'next/link'
import db from '@/lib/prisma'
import Navbar from '@/components/navbar/navbar-admin'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'

export default async function RequestsPage() {
  const requests =
    await db.travelRequest.findMany({
      include: {
        user: true,
        originCity: true,
        destinationCity: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
  
  const session = await getSession()
    if (!session) {
      redirect('/login')
    }

    if (session.role !== 'ADMIN' && session.role !== 'SDM' ) {
      redirect('/')
    }
  

  return (
    <>
    <Navbar />
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Travel Requests
      </h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">
              User
            </th>

            <th className="border p-2">
              Kota
            </th>

            <th className="border p-2">
              Tanggal
            </th>

            <th className="border p-2">
              Keterangan
            </th>

            <th className="border p-2">
              Status
            </th>

            <th className="border p-2">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td className="border p-2">
                {request.user.username}
              </td>

              <td className="border p-2">
                {request.originCity.name} &rarr; {request.destinationCity.name}
              </td>

              <td className="border p-2">
                {new Date(request.departureDate).toLocaleDateString('id-ID')} - {new Date(request.returnDate).toLocaleDateString('id-ID')}  ( {request.durationDays} hari)
              </td>

              <td className="border p-2">
                {request.purpose}
              </td>

              <td className="border p-2">
                {request.status}
              </td>

              <td className="border p-2">
                <Link
                  href={`/request/${request.id}`}
                  className="bg-black text-white px-3 py-1 rounded"
                >
                  Detail
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  )
}