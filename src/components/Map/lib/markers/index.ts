import L from 'leaflet'
import markerIconBlue from './img/marker-icon-2x-blue.svg'
import markerIconGreen from './img/marker-icon-2x-green.svg'

export const defaultMarker = new L.Icon({
  iconUrl: markerIconBlue,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

export const greenMarker = new L.Icon({
  iconUrl: markerIconGreen,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})
