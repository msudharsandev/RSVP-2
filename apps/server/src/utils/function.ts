export function sluggify(title: string): string {
  const MAX_LENGTH = 256;
  const TIMESTAMP_LENGTH = 1 + Date.now().toString(36).length;
  const MAX_SLUG_LENGTH = MAX_LENGTH - TIMESTAMP_LENGTH;

  const baseSlug = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, MAX_SLUG_LENGTH);

  const timestamp = Date.now().toString(36);

  return `${baseSlug}-${timestamp}`;
}

export function generateUsernameByEmail(email: string): string {
  const userName = email.split('@')[0];
  const sanitizedUsername = userName?.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() || '';
  const domain = email.split('@')[1];
  return `${sanitizedUsername}-${domain}`;
}

