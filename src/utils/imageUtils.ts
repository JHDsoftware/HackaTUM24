export const extractImageUrl = (imageLinks: string): string => {
  // Handle cases where imageLinks might be undefined or null
  if (!imageLinks) return '/placeholder.svg';

  try {
    // Match URLs starting with https and ending with image extensions
    const regex = /https:\/\/[^"\s]+\.(?:jpg|jpeg|png|gif|webp|JPG|JPEG|PNG|GIF|WEBP)/i;
    const match = imageLinks.match(regex);
    
    if (!match) {
      console.warn('No valid image URL found in:', imageLinks);
      return '/placeholder.svg';
    }
    
    return match[0];
  } catch (error) {
    console.error('Error extracting image URL:', error);
    return '/placeholder.svg';
  }
};