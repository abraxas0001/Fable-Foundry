// Sanity schema for Foundry Smith (Narrator)
export const narratorSchema = {
  name: 'narrator',
  title: 'Foundry Smith (Narrator)',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required().min(2).max(100),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'bio',
      title: 'Biography',
      type: 'text',
      rows: 4,
      validation: (Rule: any) => Rule.required().min(50).max(500),
    },
    {
      name: 'avatar',
      title: 'Avatar Images',
      type: 'object',
      fields: [
        {
          name: 'idle',
          title: 'Idle State',
          type: 'image',
          options: {
            hotspot: true,
          },
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'speaking',
          title: 'Speaking State',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'introduction',
          title: 'Introduction State',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    },
    {
      name: 'voiceProfile',
      title: 'Voice Profile',
      type: 'object',
      fields: [
        {
          name: 'audioSamples',
          title: 'Audio Samples',
          type: 'array',
          of: [
            {
              type: 'file',
              options: {
                accept: 'audio/*',
              },
            },
          ],
        },
        {
          name: 'characteristics',
          title: 'Voice Characteristics',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            layout: 'tags',
          },
        },
      ],
    },
    {
      name: 'specialties',
      title: 'Specialties',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      validation: (Rule: any) => Rule.min(1).max(10),
    },
    {
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        {
          name: 'twitter',
          title: 'Twitter',
          type: 'url',
        },
        {
          name: 'website',
          title: 'Website',
          type: 'url',
        },
        {
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
        },
      ],
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'bio',
      media: 'avatar.idle',
    },
  },
};