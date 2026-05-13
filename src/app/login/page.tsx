import Navbar from '@/components/navbar/navbar-admin'

export default function LoginPage() {
  return (
    <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
        <form
            action="/api/auth/login"
            method="POST"
            className="space-y-4 border p-6 rounded-lg w-full max-w-sm"
        >
            <h1 className="text-2xl font-bold">
            Login
            </h1>

            <div>
            <label className="block mb-1">
                Username
            </label>

            <input
                type="text"
                name="username"
                className="w-full border rounded px-3 py-2"
                required
            />
            </div>

            <div>
            <label className="block mb-1">
                Password
            </label>

            <input
                type="password"
                name="password"
                className="w-full border rounded px-3 py-2"
                required
            />
            </div>

            <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded"
            >
            Login
            </button>
        </form>
        </div>
    </>
  )
}