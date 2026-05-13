import Navbar from '@/components/navbar/navbar-admin'

import db from '@/lib/prisma'

import {
  createCity,
  deleteCity,
  updateCity,
} from './actions'

export default async function AdminCitiesPage() {
  const cities = await db.city.findMany({
    orderBy: {
      name: 'asc',
    },
  })

  return (
    <main className="min-h-screen bg-slate-100">
      <Navbar />

      <section className="mx-auto max-w-7xl p-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-2xl font-bold">
              Tambah Kota
            </h2>

            <form
              action={createCity}
              className="space-y-4"
            >
              <input
                type="text"
                name="name"
                placeholder="Nama Kota"
                className="w-full rounded-lg border p-3"
                required
              />

              <input
                type="number"
                step="any"
                name="latitude"
                placeholder="Latitude"
                className="w-full rounded-lg border p-3"
                required
              />

              <input
                type="number"
                step="any"
                name="longitude"
                placeholder="Longitude"
                className="w-full rounded-lg border p-3"
                required
              />

              <input
                type="text"
                name="province"
                placeholder="Provinsi"
                className="w-full rounded-lg border p-3"
                required
              />

              <input
                type="text"
                name="island"
                placeholder="Pulau"
                className="w-full rounded-lg border p-3"
                required
              />

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isInternational"
                />

                <span>Luar Negeri</span>
              </label>

              <button
                type="submit"
                className="rounded-lg bg-black px-4 py-3 text-white"
              >
                Simpan Kota
              </button>
            </form>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-2xl font-bold">
              List Kota
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b text-left">
                    <th className="p-3">Nama</th>
                    <th className="p-3">Provinsi</th>
                    <th className="p-3">Pulau</th>
                    <th className="p-3">Latitude</th>
                    <th className="p-3">Longitude</th>
                    <th className="p-3">Luar Negeri</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>

                {/* <tbody>
                  {cities.map((city) => (
                    <tr
                      key={city.id}
                      className="border-b"
                    >
                      <td className="p-3">
                        {city.name}
                      </td>

                      <td className="p-3">
                        {city.province}
                      </td>

                      <td className="p-3">
                        {city.island}
                      </td>

                      <td className="p-3">
                        {city.isInternational
                          ? 'Yes'
                          : 'No'}
                      </td>

                      <td className="p-3">
                        <form action={deleteCity}>
                          <input
                            type="hidden"
                            name="cityId"
                            value={city.id}
                          />

                          <button
                            type="submit"
                            className="rounded-lg bg-red-500 px-3 py-2 text-sm text-white"
                          >
                            Delete
                          </button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody> */}

                <tbody>
                    {cities.map((city) => (
                        <tr
                        key={city.id}
                        className="border-b"
                        >
                        <td colSpan={5} className="p-3">
                            <form
                            action={updateCity}
                            className="grid gap-3 lg:grid-cols-6"
                            >
                            <input
                                type="hidden"
                                name="cityId"
                                value={city.id}
                            />

                            <input
                                type="text"
                                name="name"
                                defaultValue={city.name}
                                className="rounded-lg border p-2"
                            />

                            <input
                                type="text"
                                name="province"
                                defaultValue={city.province}
                                className="rounded-lg border p-2"
                            />

                            <input
                                type="text"
                                name="island"
                                defaultValue={city.island}
                                className="rounded-lg border p-2"
                            />

                            <input
                                type="number"
                                step="any"
                                name="latitude"
                                defaultValue={city.latitude}
                                className="rounded-lg border p-2"
                            />

                            <input
                                type="number"
                                step="any"
                                name="longitude"
                                defaultValue={city.longitude}
                                className="rounded-lg border p-2"
                            />

                            <label className="flex items-center gap-2">
                                <input
                                type="checkbox"
                                name="isInternational"
                                defaultChecked={city.isInternational}
                                />

                                <span>Luar Negeri</span>
                            </label>

                            <div className="flex gap-2">
                                <button
                                type="submit"
                                className="rounded-lg bg-black px-3 py-2 text-sm text-white"
                                >
                                Update
                                </button>
                            </div>
                            </form>

                            <form
                            action={deleteCity}
                            className="mt-2"
                            >
                            <input
                                type="hidden"
                                name="cityId"
                                value={city.id}
                            />

                            <button
                                type="submit"
                                className="rounded-lg bg-red-500 px-3 py-2 text-sm text-white"
                            >
                                Delete
                            </button>
                            </form>
                        </td>
                        </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}