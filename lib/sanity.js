import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: 'd3w9wqfm',
  dataset: 'production',
  apiVersion: '2021-03-25', // use current UTC date - see "specifying API version"!
  token:
    'sknSGjWnJN6faoDbPMQfYifWKixazyuxeuZP0ku6fNoIwZQSFFz8x3ibsqB7YwS8EvOxLDhfWWkxAs9wFd1GCy7vo6aLoEU8s1hl0EGtbTvJ6Ypyka4SJT9NnOeZywFreRKOJBJBhRG32A6AOvIXSbT7gRUNu5M8SnRGntFqFJ3AcCl8MXRQ', // or leave blank for unauthenticated usage
  useCdn: false, // `false` if you want to ensure fresh data
})