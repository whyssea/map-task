import { useMemo, useState } from 'react'
import { MapContainer, Marker as LeafletMarker, Polyline, TileLayer, Tooltip } from 'react-leaflet'
import { Marker } from './ui/Marker.tsx'
import { Footer } from './ui/Footer/Footer.tsx'
import { Loader } from './ui/Loader/Loader.tsx'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import polyUtil from 'polyline-encoded'
import { findNearCafe } from 'api/findNearCafe.ts'
import { findDirection } from 'api/findDirection.ts'
import { greenMarker } from './lib/markers'
import type { LatLngLiteral } from 'leaflet'
import type { Destination, Route } from 'types'
import 'leaflet/dist/leaflet.css'
import styles from './Map.module.css'
import { DEFAULT_MAP_CENTER, DEFAULT_ZOOM } from './lib/config.ts'

export const Map = () => {
  const [origin, setOrigin] = useState<LatLngLiteral>()
  const [destination, setDestination] = useState<Destination>()
  const [route, setRoute] = useState<Route>()
  const [isLoading, setIsLoading] = useState(false)
  const polylinePositions = useMemo(
    () => (route ? polyUtil.decode(route.polyline.encodedPolyline) : undefined),
    [route],
  )

  const handleMarkerClick = async (coordinates: LatLngLiteral) => {
    setOrigin(coordinates)
    setIsLoading(true)
    await findNearCafe(coordinates)
      ?.then((res) => {
        setDestination(res)
        return res.location
      })
      .then((location) => findDirection(coordinates, location)?.then((res) => setRoute(res)))
      .finally(() => setIsLoading(false))
  }

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        style={{ width: '100%', height: '90%', borderRadius: 15 }}
        center={DEFAULT_MAP_CENTER}
        zoom={DEFAULT_ZOOM}
        attributionControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {isLoading ? <Loader /> : null}
        <Marker position={origin} onClick={handleMarkerClick} />
        {destination ? (
          <LeafletMarker
            icon={greenMarker}
            position={{ lat: destination.location?.latitude, lng: destination.location?.longitude }}
          >
            <Tooltip>{destination.displayName.text}</Tooltip>
          </LeafletMarker>
        ) : null}
        {polylinePositions ? <Polyline positions={polylinePositions} pathOptions={{ color: 'black' }} /> : null}
      </MapContainer>
      {route ? <Footer distanceMeters={route.distanceMeters} duration={route.duration} /> : null}
    </div>
  )
}
