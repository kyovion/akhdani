'use server'

import bcrypt from 'bcryptjs'
import db from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

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

  revalidatePath('/admin/users')
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

  revalidatePath('/admin/users')
}

export async function deleteUser(formData: FormData) {
  const userId = formData.get('userId') as string

  if (!userId) {
    throw new Error('User tidak ditemukan')
  }

  await db.user.delete({
    where: {
      id: userId,
    },
  })

  revalidatePath('/admin/users')
}