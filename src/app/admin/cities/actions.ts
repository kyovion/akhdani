'use server'

import { revalidatePath } from 'next/cache'

import db from '@/lib/prisma'

export async function createCity(formData: FormData) {
  const name = formData.get('name') as string
  const latitude = Number(formData.get('latitude'))
  const longitude = Number(formData.get('longitude'))
  const province = formData.get('province') as string
  const island = formData.get('island') as string
  const isInternational =
    formData.get('isInternational') === 'on'

  if (
    !name ||
    !province ||
    !island
  ) {
    throw new Error('Data kota tidak lengkap')
  }

  await db.city.create({
    data: {
      name,
      latitude,
      longitude,
      province,
      island,
      isInternational,
    },
  })

  revalidatePath('/admin/cities')
}

export async function deleteCity(formData: FormData) {
  const cityId = formData.get('cityId') as string

  if (!cityId) {
    throw new Error('Kota tidak ditemukan')
  }

  await db.city.delete({
    where: {
      id: cityId,
    },
  })

  revalidatePath('/admin/cities')
}

export async function updateCity(formData: FormData) {
  const cityId = formData.get('cityId') as string

  const name = formData.get('name') as string
  const latitude = Number(formData.get('latitude'))
  const longitude = Number(formData.get('longitude'))
  const province = formData.get('province') as string
  const island = formData.get('island') as string

  const isInternational =
    formData.get('isInternational') === 'on'

  if (!cityId) {
    throw new Error('Kota tidak ditemukan')
  }

  await db.city.update({
    where: {
      id: cityId,
    },
    data: {
      name,
      latitude,
      longitude,
      province,
      island,
      isInternational,
    },
  })

  revalidatePath('/admin/cities')
}