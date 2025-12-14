// Sanity GROQ queries for FableFoundry

// Story queries
export const STORIES_QUERY = `
  *[_type == "story" && status == "published"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    author,
    excerpt,
    coverImage {
      asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      },
      alt
    },
    narrator->{
      _id,
      name,
      slug,
      bio,
      avatar {
        idle {
          asset->{
            _id,
            url
          }
        }
      },
      specialties
    },
    metadata {
      duration,
      genre,
      difficulty,
      tags,
      isNew
    },
    publishedAt,
    featured
  }
`;

export const STORY_BY_SLUG_QUERY = `
  *[_type == "story" && slug.current == $slug && status == "published"][0] {
    _id,
    title,
    slug,
    author,
    excerpt,
    content,
    coverImage {
      asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      },
      alt
    },
    narrator->{
      _id,
      name,
      slug,
      bio,
      avatar {
        idle {
          asset->{
            _id,
            url
          }
        },
        speaking {
          asset->{
            _id,
            url
          }
        },
        introduction {
          asset->{
            _id,
            url
          }
        }
      },
      voiceProfile {
        audioSamples[] {
          asset->{
            _id,
            url
          }
        },
        characteristics
      },
      specialties,
      socialLinks
    },
    metadata {
      duration,
      genre,
      difficulty,
      tags,
      isNew
    },
    audio {
      fullNarration {
        asset->{
          _id,
          url
        }
      },
      chapterBreaks
    },
    publishedAt,
    featured
  }
`;

export const FEATURED_STORIES_QUERY = `
  *[_type == "story" && status == "published" && featured == true] | order(publishedAt desc) [0...6] {
    _id,
    title,
    slug,
    author,
    excerpt,
    coverImage {
      asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      },
      alt
    },
    narrator->{
      _id,
      name,
      slug,
      bio,
      avatar {
        idle {
          asset->{
            _id,
            url
          }
        }
      }
    },
    metadata {
      duration,
      genre,
      difficulty,
      tags,
      isNew
    },
    publishedAt
  }
`;

export const STORIES_BY_GENRE_QUERY = `
  *[_type == "story" && status == "published" && $genre in metadata.genre] | order(publishedAt desc) {
    _id,
    title,
    slug,
    author,
    excerpt,
    coverImage {
      asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      },
      alt
    },
    narrator->{
      _id,
      name,
      slug,
      bio,
      avatar {
        idle {
          asset->{
            _id,
            url
          }
        }
      }
    },
    metadata {
      duration,
      genre,
      difficulty,
      tags,
      isNew
    },
    publishedAt
  }
`;

// Narrator queries
export const NARRATORS_QUERY = `
  *[_type == "narrator" && isActive == true] | order(name asc) {
    _id,
    name,
    slug,
    bio,
    avatar {
      idle {
        asset->{
          _id,
          url
        }
      },
      speaking {
        asset->{
          _id,
          url
        }
      },
      introduction {
        asset->{
          _id,
          url
        }
      }
    },
    voiceProfile {
      audioSamples[] {
        asset->{
          _id,
          url
        }
      },
      characteristics
    },
    specialties,
    socialLinks
  }
`;

export const NARRATOR_BY_SLUG_QUERY = `
  *[_type == "narrator" && slug.current == $slug && isActive == true][0] {
    _id,
    name,
    slug,
    bio,
    avatar {
      idle {
        asset->{
          _id,
          url
        }
      },
      speaking {
        asset->{
          _id,
          url
        }
      },
      introduction {
        asset->{
          _id,
          url
        }
      }
    },
    voiceProfile {
      audioSamples[] {
        asset->{
          _id,
          url
        }
      },
      characteristics
    },
    specialties,
    socialLinks,
    "stories": *[_type == "story" && references(^._id) && status == "published"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      author,
      excerpt,
      coverImage {
        asset->{
          _id,
          url,
          metadata {
            dimensions {
              width,
              height
            }
          }
        },
        alt
      },
      metadata {
        duration,
        genre,
        difficulty,
        tags,
        isNew
      },
      publishedAt
    }
  }
`;

// Search queries
export const SEARCH_STORIES_QUERY = `
  *[_type == "story" && status == "published" && (
    title match $searchTerm + "*" ||
    author match $searchTerm + "*" ||
    narrator->name match $searchTerm + "*"
  )] | order(publishedAt desc) {
    _id,
    title,
    slug,
    author,
    excerpt,
    coverImage {
      asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      },
      alt
    },
    narrator->{
      _id,
      name,
      slug,
      bio,
      avatar {
        idle {
          asset->{
            _id,
            url
          }
        }
      }
    },
    metadata {
      duration,
      genre,
      difficulty,
      tags,
      isNew
    },
    publishedAt
  }
`;

// Utility queries
export const ALL_GENRES_QUERY = `
  array::unique(*[_type == "story" && status == "published"].metadata.genre[])
`;

export const ALL_NARRATORS_SIMPLE_QUERY = `
  *[_type == "narrator" && isActive == true] | order(name asc) {
    _id,
    name,
    slug
  }
`;

export const STORY_SLUGS_QUERY = `
  *[_type == "story" && status == "published"].slug.current
`;

export const NARRATOR_SLUGS_QUERY = `
  *[_type == "narrator" && isActive == true].slug.current
`;