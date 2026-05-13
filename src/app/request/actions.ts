'use server'

import db from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { calculateDistanceKm } from '@/lib/distance'

export async function createTravelRequest(formData: FormData) {
  const cost = [0,200000,250000,300000,50];
  const userId = formData.get('userId') as string
  const purpose = formData.get('purpose') as string

  const originCityId = formData.get('originCityId') as string
  const destinationCityId = formData.get('destinationCityId') as string

  const departureDate = new Date(
    formData.get('departureDate') as string
  )

  const returnDate = new Date(
    formData.get('returnDate') as string
  )

  const durationDays =
    Math.ceil(
      (
        returnDate.getTime() -
        departureDate.getTime()
      ) / (1000 * 60 * 60 * 24)
    ) + 1

  const originCity = await db.city.findUnique({
    where: {
      id: originCityId,
    },
  })

  const destinationCity = await db.city.findUnique({
    where: {
      id: destinationCityId,
    },
  })

  if (!originCity || !destinationCity) {
    throw new Error('City not found')
  }

  const isOutOfProvince =
    originCity.province !== destinationCity.province

  const isOutOfIsland =
    originCity.island !== destinationCity.island

  const isInternational =
    destinationCity.isInternational

  const totalDistanceKm =Number(
  calculateDistanceKm(
    originCity.latitude,
    originCity.longitude,
    destinationCity.latitude,
    destinationCity.longitude
  ).toFixed(2))

  let totalCost = 0;

  if(destinationCity.isInternational)
  {
        totalCost = durationDays * cost[4];
  }
  else if(!destinationCity.isInternational && !isOutOfProvince && !isOutOfIsland && totalDistanceKm <= 60 )
  {
        totalCost = durationDays * cost[0];
  }
  else if(!destinationCity.isInternational && !isOutOfProvince && !isOutOfIsland && totalDistanceKm > 60 )
  {
        totalCost = durationDays * cost[1];
  }
  else if(!destinationCity.isInternational && isOutOfProvince && !isOutOfIsland && totalDistanceKm > 60 )
  {
        totalCost = durationDays * cost[2];
  }
  else if(!destinationCity.isInternational && isOutOfProvince && isOutOfIsland && totalDistanceKm > 60 )
  {
        totalCost = durationDays * cost[3];
  }

  if (originCityId === destinationCityId) {
    throw new Error(
        'Origin and destination cannot be the same'
    )
  }

  if (returnDate < departureDate) {
    throw new Error(
        'Return date cannot be earlier than departure date'
    )
  }

  await db.travelRequest.create({
    data: {
      userId,

      purpose,

      departureDate,
      returnDate,

      originCityId,
      destinationCityId,

      durationDays,

      isOutOfProvince,
      isOutOfIsland,
      isInternational,

      totalDistanceKm,
      totalCost,
    },
  })

  revalidatePath('/requests')
}