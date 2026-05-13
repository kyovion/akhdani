import db from '@/lib/prisma'

import Navbar from '@/components/navbar/navbar-admin'

import {
  createUser,
  deleteUser,
  updateUserRole,
} from './actions'

export default async function AdminUsersPage() {
  const users = await db.user.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <main className="min-h-screen bg-slate-100">
      <Navbar />

      <section className="mx-auto max-w-7xl p-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-2xl font-bold">
              Tambah User
            </h2>

            <form
              action={createUser}
              className="space-y-4"
            >
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Username
                </label>

                <input
                  type="text"
                  name="username"
                  className="w-full rounded-lg border p-3"
                  required
                />
              </div>
			  
			  <div>
                <label className="mb-2 block text-sm font-medium">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  className="w-full rounded-lg border p-3"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Role
                </label>

                <select
                  name="role"
                  className="w-full rounded-lg border p-3"
                  required
                >
                  <option value="EMPLOYEE">
                    Employee
                  </option>

                  <option value="SDM">
                    SDM
                  </option>

                  p<option value="ADMIN">
                    Admin
                  </option>
                </select>
              </div>

              <button
                type="submit"
                className="rounded-lg bg-black px-4 py-3 text-white"
              >
                Simpan User
              </button>
            </form>
          </div>
		  
		  <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-2xl font-bold">
              List User
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b text-left">
                    <th className="p-3">Username</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Created</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b"
                    >
                      <td className="p-3">
                        {user.username}
                      </td>

                      <td className="p-3">
                        {user.role}
                      </td>

                      <td className="p-3">
                        {user.createdAt.toLocaleDateString()}
                      </td>

                      <td className="p-3">
                        <form
                          action={updateUserRole}
                          className="flex items-center gap-2"
                        >
                          <input
                            type="hidden"
                            name="userId"
                            value={user.id}
                          />

                          <select
                            name="role"
                            defaultValue={user.role}
                            className="rounded-lg border p-2"
                          >
                            <option value="EMPLOYEE">
                              Employee
                            </option>

                            <option value="SDM">
                              SDM
                            </option>
							
                            <option value="ADMIN">
                              Admin
                            </option>
                          </select>

                          <button
                            type="submit"
                            className="rounded-lg bg-black px-3 py-2 text-sm text-white"
                          >
                            Update
                          </button>
                        </form>

                      </td>
                      <td className="p-3">
                        <form action={deleteUser}>
                            <input
                                type="hidden"
                                name="userId"
                                value={user.id}
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