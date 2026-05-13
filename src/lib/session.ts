import { cookies } from 'next/headers'
import { verifyJwt } from './jwt'

export async function getSession() {
  const cookieStore = await cookies()

  const token = cookieStore.get('token')?.value

  if (!token) {
    return null
  }

  const payload = verifyJwt(token)

  if (!payload) {
    return null
  }

  return payload
}