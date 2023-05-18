//THIRD PARTY MODULES
import { headers } from 'next/headers'

export const getUrlOnServer = (): Partial<URL> => {
  const headersList = headers()
  const xUrl = headersList.get('x-url')

  return xUrl ? new URL(xUrl) : {}
}
