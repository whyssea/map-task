import { Marker as LeafletMarker, useMapEvents } from 'react-leaflet'
import { defaultMarker } from '../lib/markers'
import type { LatLngLiteral } from 'leaflet'
import type { FC } from 'react'

interface MarkerProps {
  position?: LatLngLiteral
  onClick: (coordinates: LatLngLiteral) => void
}

export const Marker: FC<MarkerProps> = ({ position, onClick }) => {
  const map = useMapEvents({
    click: (event) => {
      map.setView(event.latlng, map.getZoom())
      onClick(event.latlng)
    },
  })
  return position ? <LeafletMarker icon={defaultMarker} position={position} /> : null
}
