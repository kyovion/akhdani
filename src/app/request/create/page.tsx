import db from '@/lib/prisma'
import { createTravelRequest } from '../actions'
import Navbar from '@/components/navbar/navbar-admin'

export default async function CreateRequestPage() {
  const cities = await db.city.findMany({
    orderBy: {
      name: 'asc',
    },
  })

  return (
    <>
    <Navbar />
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">
        Buat Perjalanan Dinas
      </h1>

      <form
        action={createTravelRequest}
        className="space-y-4"
      >
        <div>
          <label className="block mb-1">
            User ID
          </label>

          <input
            type="text"
            name="userId"
            className="border p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block mb-1">
            Purpose
          </label>

          <textarea
            name="purpose"
            className="border p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block mb-1">
            Origin City
          </label>

          <select
            name="originCityId"
            className="border p-2 w-full"
            required
          >
            <option value="">
              Select City
            </option>

            {cities.map((city) => (
              <option
                key={city.id}
                value={city.id}
              >
                {city.name} - {city.province}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">
            Destination City
          </label>

          <select
            name="destinationCityId"
            className="border p-2 w-full"
            required
          >
            <option value="">
              Select City
            </option>

            {cities.map((city) => (
              <option
                key={city.id}
                value={city.id}
              >
                {city.name} - {city.province}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">
            Departure Date
          </label>

          <input
            type="date"
            name="departureDate"
            className="border p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block mb-1">
            Return Date
          </label>

          <input
            type="date"
            name="returnDate"
            className="border p-2 w-full"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded"
        >
          Submit Request
        </button>
      </form>
    </div>
  </>
  )
}