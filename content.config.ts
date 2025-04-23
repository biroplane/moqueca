import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    pages: defineCollection({
      type: 'page',
      source: '**.md',
      schema: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        image: z.string().optional(),
        excerpt: z.object({}).optional(),
      }),
    }),
    events: defineCollection({
      type: 'page',
      source: 'events/**.md',
      schema: z.object({
        date: z.date(),
        location: z.string(),
        address: z.string(),
      }),
    }),
  },
})
