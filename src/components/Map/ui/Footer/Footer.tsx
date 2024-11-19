import type { FC } from 'react'
import styles from './Footer.module.css'

interface FooterProps {
  distanceMeters: number
  duration: string
}

export const Footer: FC<FooterProps> = ({ distanceMeters, duration }) => (
  <div className={styles.footer}>
    <p>Расстояние: {distanceMeters} метров</p>
    <p>Время в пути: {duration.substring(0, duration.length - 1)} сек</p>
  </div>
)
