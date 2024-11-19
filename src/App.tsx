import { Map } from 'components/Map/Map.tsx'
import { ErrorPopup } from 'components/ErrorPopup/ErrorPopup.tsx'

export const App = () => (
  <>
    <h1>Поиск маршрута до ближайшего кафе</h1>
    <Map />
    <ErrorPopup />
  </>
)
