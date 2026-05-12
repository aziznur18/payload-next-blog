import { CollectionConfig } from 'payload'
import { ARTICLE_AUTHORS_ROLE_OPTIONS } from './constants'

export const ArticleAuthors: CollectionConfig = {
    slug: 'article-authors',
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
            unique: true,
        },
        {
            name: 'avatar',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'role',
            type: 'select',
            options: Object.values(ARTICLE_AUTHORS_ROLE_OPTIONS),
            defaultValue: ARTICLE_AUTHORS_ROLE_OPTIONS.STAFF_WRITER,
            required: true,
        },
    ],
}
