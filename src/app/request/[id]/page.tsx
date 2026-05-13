import { notFound } from 'next/navigation'
import db from '@/lib/prisma'
import Navbar from '@/components/navbar/navbar-admin'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'

import {
  approveRequest,
  rejectRequest,
} from '../actions'

type Props = {
  params: Promise<{
    id: string
  }>
}

export default async function RequestDetailPage({
  params,
}: Props) {
  const { id } = await params

  const session = await getSession()
  if (!session) {
    redirect('/login')
  }
  if (session.role !== 'ADMIN' && session.role !== 'SDM' ) {
    redirect('/')
  }

  const request =
    await db.travelRequest.findUnique({
      where: {
        id,
      },

      include: {
        user: true,
        originCity: true,
        destinationCity: true,
      },
    })

  if (!request) {
    return notFound()
  }

  return (
    <>
    <Navbar />
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">
        Detail Perdin
      </h1>

      <div className="space-y-4 border p-4 rounded">
        <div>
          <strong>Nama:</strong>{' '}
          {request.user.username}
        </div>

        <div>
          <strong>Tujuan:</strong>{' '}
          {request.purpose}
        </div>

        <div>
          <strong>Kota Asal:</strong>{' '}
          {request.originCity.name}
        </div>

        <div>
          <strong>Kota Tujuan:</strong>{' '}
          {request.destinationCity.name}
        </div>

        <div>
          <strong>Tanggal Berangkat:</strong>{' '}
          {request.departureDate.toLocaleDateString()}
        </div>

        <div>
          <strong>Tanggal Pulang:</strong>{' '}
          {request.returnDate.toLocaleDateString()}
        </div>

        <div>
          <strong>Total Hari:</strong>{' '}
          {request.durationDays} hari
        </div>

        <div>
          <strong>Jarak Tempuh:</strong>{' '}
          {request.totalDistanceKm} km
        </div>

        <div>
          <strong>Total Uang Perdin:</strong>{' '}
          {request.isInternational ? (<label>USD</label>) : (<label>Rp</label>)} {request.totalCost}
        </div>

        <div>
          <strong>Status:</strong>{' '}
          {request.status}
        </div>
      </div>

      {request.status === 'PENDING' && (
        <div className="flex gap-4 mt-6">
          <form
            action={async () => {
              'use server'

              await approveRequest(request.id)
            }}
          >
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer"
            >
              Approve
            </button>
          </form>

          <form
            action={async () => {
              'use server'

              await rejectRequest(request.id)
            }}
          >
            <button
              type="submit"
              className="bg-red-600 text-white px-4 py-2 rounded cursor-pointer"
            >
              Reject
            </button>
          </form>
        </div>
      )}
    </div>
    </>
  )
}