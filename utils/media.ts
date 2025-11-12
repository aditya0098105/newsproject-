const STREAMING_PROTOCOL_REGEX = /^(https?:\/\/|file:\/\/\/|content:\/\/)/i;
const WINDOWS_FILE_PATH_REGEX = /^[A-Za-z]:\\\\/;
const VIDEO_EXTENSION_REGEX = /\.(mp4|m4v|mov|webm|mkv|m3u8|mpd)(\?.*)?$/i;

export function resolveVideoSource(url?: string | null) {
  if (typeof url !== 'string') {
    return undefined;
  }

  const trimmed = url.trim();

  if (!trimmed) {
    return undefined;
  }

  if (STREAMING_PROTOCOL_REGEX.test(trimmed)) {
    return { uri: trimmed } as const;
  }

  if (WINDOWS_FILE_PATH_REGEX.test(trimmed)) {
    const normalised = trimmed.replace(/\\\\/g, '/');
    return { uri: `file:///${normalised}` } as const;
  }

  if (trimmed.startsWith('/')) {
    return { uri: `file://${trimmed}` } as const;
  }

  return { uri: trimmed } as const;
}

export function isStreamingUrl(url?: string | null) {
  if (typeof url !== 'string') {
    return false;
  }

  return /^https?:\/\//i.test(url.trim());
}

export function isLikelyVideoUrl(url?: string | null) {
  if (typeof url !== 'string') {
    return false;
  }

  const trimmed = url.trim();

  if (!trimmed) {
    return false;
  }

  if (VIDEO_EXTENSION_REGEX.test(trimmed)) {
    return true;
  }

  // Expo's <Video> cannot handle generic web article or embed URLs (e.g., YouTube watch pages)
  // so we exclude them to avoid rendering a blank player.
  if (/youtube\.com\/watch|youtu\.be\//i.test(trimmed)) {
    return false;
  }

  return false;
}
