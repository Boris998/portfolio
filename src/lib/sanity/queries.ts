import groq from 'groq';

// ── Projects ────────────────────────────────────────────────────────────────

export const getFeaturedProjects = groq`
  *[_type == "project" && featured == true]
  | order(order asc, endDate desc)[0...3] {
    ...,
    stack[]->
  }
`;

export const getAllProjects = groq`
  *[_type == "project"]
  | order(coalesce(endDate, now()) desc) {
    ...,
    stack[]->
  }
`;

export const getProjectBySlug = groq`
  {
    "project": *[_type == "project" && slug.current == $slug][0] {
      ...,
      stack[]->
    },
    "related": *[_type == "project" && slug.current != $slug]
      | order(endDate desc)[0...3] {
        title,
        slug,
        summary,
        heroImage,
        role,
        endDate
      }
  }
`;

// ── Settings ─────────────────────────────────────────────────────────────────

export const getSettings = groq`
  *[_type == "settings"][0]
`;

// ── Experiments ───────────────────────────────────────────────────────────────

export const getActiveExperiments = groq`
  *[_type == "experiment" && status == "running"]
  | order(startDate desc)
`;

export const getConcludedExperiments = groq`
  *[_type == "experiment" && status in ["concluded", "inconclusive"]]
  | order(endDate desc)
`;

// ── Posts ─────────────────────────────────────────────────────────────────────

export const getAllPosts = groq`
  *[_type == "post"]
  | order(publishedAt desc) {
    title,
    slug,
    excerpt,
    coverImage,
    publishedAt,
    readTime,
    tags
  }
`;

export const getPostBySlug = groq`
  *[_type == "post" && slug.current == $slug][0]
`;

// ── Testimonials ──────────────────────────────────────────────────────────────

export const getTestimonials = groq`
  *[_type == "testimonial" && ($featured == null || featured == $featured)]
  | order(_createdAt desc)
`;

// ── Tech Stacks ───────────────────────────────────────────────────────────────

export const getAllTechStacks = groq`
  *[_type == "techStack"]
  | order(category asc, proficiency desc) {
    _id,
    name,
    category,
    proficiency,
    yearsUsed,
    iconName
  }
`;
