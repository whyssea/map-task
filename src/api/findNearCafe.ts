import axios from 'axios'
import { API_KEY } from 'utils/constants.ts'
import type { LatLngLiteral } from 'leaflet'

export const findNearCafe = (position?: LatLngLiteral) => {
  if (!position) return
  return axios
    .post(
      'https://places.googleapis.com/v1/places:searchNearby',
      {
        includedTypes: ['cafe'],
        maxResultCount: 1,
        locationRestriction: {
          circle: {
            center: {
              latitude: position.lat,
              longitude: position.lng,
            },
            radius: 500.0,
          },
        },
        languageCode: 'ru-RU',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': API_KEY,
          'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.location',
        },
      },
    )
    .then((res) => res.data.places[0])
}
