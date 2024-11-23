export const getRelativeTime = (publishedAt: string): string => {
  const published = new Date(publishedAt);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - published.getTime()) / (1000 * 60 * 60));

  if (diffInHours < 1) {
    const diffInMinutes = Math.floor((now.getTime() - published.getTime()) / (1000 * 60));
    return `${diffInMinutes}m`;
  }
  
  if (diffInHours < 24) {
    return `${diffInHours}h`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d`;
}