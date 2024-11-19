export interface Route {
  distanceMeters: number
  duration: string
  polyline: {
    encodedPolyline: string
  }
}

export interface Destination {
  formattedAddress: string
  location: {
    latitude: number
    longitude: number
  }
  displayName: {
    text: string
    languageCode: string
  }
}
