/** Interface for a single image in a post */
export interface PostImage {
    /** Image index in the carousel */
    index: number
    /** Image URL */
    imageUrl: string
    /** Image width in pixels */
    width?: number
    /** Image height in pixels */
    height?: number
    /** image Title/name */
    title?: string
  }