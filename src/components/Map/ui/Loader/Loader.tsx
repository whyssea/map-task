import { FadeLoader } from 'react-spinners'
import styles from './Loader.module.css'

export const Loader = () => (
  <div className={styles.spinner}>
    <FadeLoader />
  </div>
)
