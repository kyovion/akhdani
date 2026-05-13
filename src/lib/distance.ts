function toRadians(degree: number) {
  return (degree * Math.PI) / 180
}

export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const earthRadiusKm = 6371

  const latitudeDistance =
    toRadians(lat2 - lat1)

  const longitudeDistance =
    toRadians(lon2 - lon1)

  const a =
    Math.sin(latitudeDistance / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(longitudeDistance / 2) ** 2

  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    )

  const distance =
    earthRadiusKm * c

  return Math.round(distance * 100) / 100
}