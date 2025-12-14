// Sanity schema for Story
export const storySchema = {
  name: 'story',
  title: 'Story',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required().min(5).max(200),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string',
      validation: (Rule: any) => Rule.required().min(2).max(100),
    },
    {
      name: 'narrator',
      title: 'Narrator (Foundry Smith)',
      type: 'reference',
      to: [{ type: 'narrator' }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
      ],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'content',
      title: 'Story Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
          },
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
          ],
        },
      ],
      validation: (Rule: any) => Rule.required().min(1),
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.required().min(50).max(300),
    },
    {
      name: 'metadata',
      title: 'Metadata',
      type: 'object',
      fields: [
        {
          name: 'duration',
          title: 'Duration (minutes)',
          type: 'number',
          validation: (Rule: any) => Rule.required().min(1).max(300),
        },
        {
          name: 'genre',
          title: 'Genres',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            list: [
              { title: 'Fantasy', value: 'fantasy' },
              { title: 'Mystery', value: 'mystery' },
              { title: 'Sci-Fi', value: 'sci-fi' },
              { title: 'Romance', value: 'romance' },
              { title: 'Adventure', value: 'adventure' },
              { title: 'Horror', value: 'horror' },
              { title: 'Drama', value: 'drama' },
              { title: 'Comedy', value: 'comedy' },
              { title: 'Thriller', value: 'thriller' },
              { title: 'Historical', value: 'historical' },
            ],
          },
          validation: (Rule: any) => Rule.required().min(1).max(3),
        },
        {
          name: 'difficulty',
          title: 'Difficulty Level',
          type: 'string',
          options: {
            list: [
              { title: 'Beginner', value: 'beginner' },
              { title: 'Intermediate', value: 'intermediate' },
              { title: 'Advanced', value: 'advanced' },
            ],
          },
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'tags',
          title: 'Tags',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            layout: 'tags',
          },
        },
        {
          name: 'isNew',
          title: 'Mark as New',
          type: 'boolean',
          initialValue: false,
        },
      ],
    },
    {
      name: 'audio',
      title: 'Audio Narration',
      type: 'object',
      fields: [
        {
          name: 'fullNarration',
          title: 'Full Narration Audio',
          type: 'file',
          options: {
            accept: 'audio/*',
          },
        },
        {
          name: 'chapterBreaks',
          title: 'Chapter Break Timestamps (seconds)',
          type: 'array',
          of: [{ type: 'number' }],
        },
      ],
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'featured',
      title: 'Featured Story',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Published', value: 'published' },
          { title: 'Archived', value: 'archived' },
        ],
      },
      initialValue: 'draft',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'author',
      media: 'coverImage',
      narrator: 'narrator.name',
    },
    prepare(selection: any) {
      const { title, subtitle, media, narrator } = selection;
      return {
        title,
        subtitle: `by ${subtitle} • narrated by ${narrator}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Published Date, Old',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }],
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
};