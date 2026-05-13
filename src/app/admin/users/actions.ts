'use server'

import bcrypt from 'bcrypt'

import db from '@/lib/prisma'

export async function createUser(formData: FormData) {
  const username = formData.get('username') as string
  const password = formData.get('password') as string
  const role = formData.get('role') as string

  if (!username || !password || !role) {
    throw new Error('Semua field wajib diisi')
  }

  const existingUser = await db.user.findUnique({
    where: {
      username,
    },
  })

  if (existingUser) {
    throw new Error('Username sudah digunakan')
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await db.user.create({
    data: {
      username,
      password: hashedPassword,
      role: role as any,
    },
  })
}

export async function updateUserRole(formData: FormData) {
  const userId = formData.get('userId') as string
  const role = formData.get('role') as string

  if (!userId || !role) {
    throw new Error('Data tidak valid')
  }

  await db.user.update({
    where: {
      id: userId,
    },
    data: {
      role: role as any,
    },
  })
}