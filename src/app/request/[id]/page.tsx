import { notFound } from 'next/navigation'
import db from '@/lib/prisma'
import Navbar from '@/components/navbar/navbar-admin'

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
        Request Detail
      </h1>

      <div className="space-y-4 border p-4 rounded">
        <div>
          <strong>User:</strong>{' '}
          {request.user.username}
        </div>

        <div>
          <strong>Purpose:</strong>{' '}
          {request.purpose}
        </div>

        <div>
          <strong>Origin:</strong>{' '}
          {request.originCity.name}
        </div>

        <div>
          <strong>Destination:</strong>{' '}
          {request.destinationCity.name}
        </div>

        <div>
          <strong>Departure:</strong>{' '}
          {request.departureDate.toLocaleDateString()}
        </div>

        <div>
          <strong>Return:</strong>{' '}
          {request.returnDate.toLocaleDateString()}
        </div>

        <div>
          <strong>Duration:</strong>{' '}
          {request.durationDays} days
        </div>

        <div>
          <strong>Distance:</strong>{' '}
          {request.totalDistanceKm} km
        </div>

        <div>
          <strong>Total cost:</strong>{' '}
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
              className="bg-green-600 text-white px-4 py-2 rounded"
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
              className="bg-red-600 text-white px-4 py-2 rounded"
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