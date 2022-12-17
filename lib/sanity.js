import sanityClient from '@sanity/client'


export const client = sanityClient({
  // Update with environment variable
  projectId: 'd3w9wqfm',
  dataset: 'production',
  apiVersion: '2021-03-25', // use current UTC date - see "specifying API version"!
  token: process.env.SANITY_TOKEN, // or leave blank for unauthenticated usage
  useCdn: false, // `false` if you want to ensure fresh data
})