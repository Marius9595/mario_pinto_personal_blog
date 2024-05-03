
export type MetaSEO = {
  title: string
  description: string
  image: {
    url: string
    alt: string
  }
  keywords: string[]
  robots?: string
  url: string
}