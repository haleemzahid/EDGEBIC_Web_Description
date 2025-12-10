/**
 * Payload CMS API utility functions
 */

const PAYLOAD_API_URL =
  process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000';

export interface PayloadPost {
  id: string | number;
  title: string;
  slug: string;
  description?: string;
  content?: any;
  hero?: {
    type?: string;
    richText?: any;
    media?: any;
    links?: any[];
  };
  layout?: any[];
  category?: string;
  categories?: any[];
  author?: {
    name: string;
    avatar?: {
      url?: string;
    };
  };
  authors?: any[];
  populatedAuthors?: any[];
  heroImage?: {
    url?: string;
    alt?: string;
  } | null;
  featuredImage?: {
    url?: string;
    alt?: string;
  };
  publishedAt?: string;
  meta?: {
    title?: string;
    description?: string;
    image?: any;
  };
  createdAt?: string;
  updatedAt?: string;
  _status?: string;
}

export interface PayloadPostsResponse {
  docs: PayloadPost[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

/**
 * Fetch all pages from Payload CMS
 */
export async function fetchAllPages(): Promise<PayloadPost[]> {
  try {
    const response = await fetch(
      `${PAYLOAD_API_URL}/api/pages?limit=1000&depth=1`,
      {
        next: { revalidate: 60 }
      }
    );

    if (!response.ok) {
      console.error('Failed to fetch pages:', response.statusText);
      return [];
    }

    const data: PayloadPostsResponse = await response.json();
    console.log(`Fetched ${data.docs.length} pages from Payload CMS`);
    return data.docs || [];
  } catch (error) {
    console.error('Error fetching pages from Payload CMS:', error);
    return [];
  }
}

/**
 * Fetch all posts from Payload CMS (Posts collection)
 */
export async function fetchAllPostsOnly(): Promise<PayloadPost[]> {
  try {
    const response = await fetch(
      `${PAYLOAD_API_URL}/api/posts?limit=1000&depth=1`,
      {
        next: { revalidate: 60 }
      }
    );

    if (!response.ok) {
      console.error('Failed to fetch posts:', response.statusText);
      return [];
    }

    const data: PayloadPostsResponse = await response.json();
    console.log(`Fetched ${data.docs.length} posts from Payload CMS`);
    return data.docs || [];
  } catch (error) {
    console.error('Error fetching posts from Payload CMS:', error);
    return [];
  }
}

/**
 * Fetch all blog content from ALL collections (Pages + Posts)
 */
export async function fetchAllPosts(): Promise<PayloadPost[]> {
  try {
    // Fetch from both Pages and Posts collections in parallel
    const [pages, posts] = await Promise.all([
      fetchAllPages(),
      fetchAllPostsOnly()
    ]);

    // Combine all content
    const allContent = [...pages, ...posts];

    console.log(
      `Total blog content fetched: ${allContent.length} (${pages.length} pages + ${posts.length} posts)`
    );

    return allContent;
  } catch (error) {
    console.error('Error fetching all blog content from Payload CMS:', error);
    return [];
  }
}

/**
 * Fetch a single post by ID from Payload CMS
 */
export async function fetchPostById(id: string): Promise<PayloadPost | null> {
  try {
    const response = await fetch(`${PAYLOAD_API_URL}/api/posts/${id}`, {
      next: { revalidate: 60 }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch post ${id}: ${response.statusText}`);
    }

    const data: PayloadPost = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching post ${id} from Payload CMS:`, error);
    return null;
  }
}

/**
 * Fetch a single post by slug from Payload CMS
 */
export async function fetchPostBySlug(
  slug: string
): Promise<PayloadPost | null> {
  try {
    const response = await fetch(
      `${PAYLOAD_API_URL}/api/posts?where[slug][equals]=${slug}&limit=1`,
      {
        next: { revalidate: 60 }
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch post with slug ${slug}: ${response.statusText}`
      );
    }

    const data: PayloadPostsResponse = await response.json();
    return data.docs[0] || null;
  } catch (error) {
    console.error(
      `Error fetching post with slug ${slug} from Payload CMS:`,
      error
    );
    return null;
  }
}

/**
 * Extract plain text from Lexical rich text content
 */
function extractTextFromContent(content: any): string {
  if (!content) return '';

  // Handle different content structures
  let contentToProcess = content;

  // If it's a Pages collection item with hero.richText
  if (content.hero?.richText) {
    contentToProcess = content.hero.richText;
  }

  // If content is directly a richText object
  if (!contentToProcess?.root?.children) return '';

  let text = '';
  const traverse = (node: any) => {
    if (node.text) {
      text += node.text + ' ';
    }
    if (node.children) {
      node.children.forEach(traverse);
    }
  };

  traverse(contentToProcess.root);
  return text.trim();
}

/**
 * Transform Payload post to blog post format for UI
 */
export function transformPayloadPostToPost(post: PayloadPost) {
  // Determine content source (Posts use 'content', Pages use 'hero.richText')
  const contentSource = post.content || post.hero?.richText || post;

  // Extract description from content if not available
  const contentText = extractTextFromContent(contentSource);
  const description =
    post.description ||
    post.meta?.description ||
    contentText.substring(0, 150) ||
    '';

  // Get category from categories array or use default
  const category =
    post.category ||
    (post.categories && post.categories.length > 0
      ? post.categories[0]
      : null) ||
    'General';

  // Get author from authors array or use default
  const firstAuthor = post.populatedAuthors?.[0] || post.authors?.[0];
  const authorName = post.author?.name || firstAuthor?.name || 'EDGEBIC Team';
  const authorAvatar = post.author?.avatar?.url || firstAuthor?.avatar?.url;

  // Get featured image from various possible sources
  // hero.media contains url like /api/media/file/image.webp
  const featuredImageUrl =
    post.featuredImage?.url ||
    post.heroImage?.url ||
    post.hero?.media?.url ||
    post.meta?.image?.url;

  // Construct full URL for featured image if it's a relative path
  const featuredImage = featuredImageUrl
    ? featuredImageUrl.startsWith('http')
      ? featuredImageUrl
      : `${PAYLOAD_API_URL}${featuredImageUrl}`
    : undefined;

  return {
    id: post.id,
    slug: `/blog/${post.slug}`,
    title: post.title || 'Untitled',
    description,
    published: post.publishedAt || post.createdAt || new Date().toISOString(),
    category,
    author: {
      name: authorName,
      avatar: authorAvatar
    },
    content: contentSource,
    featuredImage,
    layout: post.layout || [],
    hero: post.hero || null
  };
}
