import axios from 'axios'
import { useEffect, useState } from 'react'
import styles from './ErrorPopup.module.css'

export const ErrorPopup = () => {
  const [errorMessage, setErrorMessage] = useState<string>()

  useEffect(() => {
    const responseInterceptor = axios.interceptors.response.use(
      (response) => {
        setErrorMessage(undefined)
        return response
      },
      (error) => {
        if (error.response?.status) {
          switch (error.response.status) {
            case 401:
              setErrorMessage('Вы не авторизованы')
              break
            case 403:
              setErrorMessage('У вас недостаточно прав для этой операции')
              break
            case 404:
              setErrorMessage('Данные не найдены')
              break
            case 500:
              setErrorMessage('Сервер недоступен')
              break
            default:
              setErrorMessage('Произошла неизвестная ошибка')
          }
        }
        return error
      },
    )
    return () => {
      axios.interceptors.response.eject(responseInterceptor)
    }
  }, [])

  return errorMessage ? (
    <div className={styles.container}>
      <p className={styles.title}>Ошибка</p>
      <p>{errorMessage}</p>
    </div>
  ) : null
}
