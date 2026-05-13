import type { CollectionConfig, FieldHook } from 'payload'
import { slugify } from 'payload/shared'
import { Article } from '@/payload-types'
import { generateSlugHook } from './hooks/generate-slug.hook'
import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext'
import { generateContentSummaryHook } from './hooks/generate-content-summary.hook'
import { STATUS_OPTIONS } from './constants'

// fields
// - title
// - slug (auto generated from title)
// - content (rich text, WYSIWYG editor)
// - content_summary (auto-filled from content, for SEO article card)
// - read_time_in_mins (auto generated from content)
// - cover-image
// - author (relations)
// - status (draft, published)
// - published_at (only visible when status is published)

export const Articles: CollectionConfig = {
    slug: 'articles',
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            unique: true,
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            hooks: {
                beforeValidate: [generateSlugHook],
            },
        },
        {
            name: 'content',
            type: 'richText',
            required: true,
        },
        {
            name: 'contentSummary',
            type: 'textarea',
            required: true,
            hooks: {
                beforeValidate: [generateContentSummaryHook],
            },
        },
        {
            name: 'readTimeInMins',
            type: 'number',
            defaultValue: 0,
            hooks: {
                beforeChange: [
                    ({ siblingData }) => {
                        delete siblingData.readTimeInMins
                    },
                ],
                afterRead: [
                    ({ data }) => {
                        const text = convertLexicalToPlaintext({ data: data?.content })
                        const wordsPerMinute = 200
                        const words = text.trim().split(/\s+/).length

                        return Math.max(1, Math.ceil(words / wordsPerMinute))
                    },
                ],
            },
        },
        {
            name: 'coverImage',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'author',
            type: 'relationship',
            relationTo: 'article-authors',
            required: true,
        },
        {
            name: 'status',
            type: 'select',
            required: true,
            options: Object.values(STATUS_OPTIONS),
            defaultValue: STATUS_OPTIONS.DRAFT,
        },
        {
            name: 'publishedAt',
            type: 'date',
            required: true,
            admin: {
                condition: (data) => data?.status === 'Published',
                date: { pickerAppearance: 'dayAndTime' },
            },
        },
    ],
}
