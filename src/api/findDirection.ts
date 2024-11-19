import axios from 'axios'
import { API_KEY } from 'utils/constants.ts'
import type { LatLngLiteral } from 'leaflet'

export const findDirection = (origin?: LatLngLiteral, destination?: LatLngLiteral) => {
  if (!origin || !destination) return
  return axios
    .post(
      'https://routes.googleapis.com/directions/v2:computeRoutes',
      {
        origin: {
          location: {
            latLng: {
              latitude: origin.lat,
              longitude: origin.lng,
            },
          },
        },
        destination: {
          location: {
            latLng: {
              ...destination,
            },
          },
        },
        travelMode: 'WALK',
        languageCode: 'ru-RU',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': API_KEY,
          'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline',
        },
      },
    )
    .then((res) => res.data.routes[0])
}
