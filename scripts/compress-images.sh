#!/usr/bin/env bash
# Compress images for the repo before committing.
#
# Usage:
#   scripts/compress-images.sh <input-dir-or-file> [output-dir]
#
# Defaults:
#   output-dir = public/uploads
#
# Rules:
#   - Resize so the longest edge is <= MAX_WIDTH (default 1920px)
#   - Convert to WebP, quality QUALITY (default 80)
#   - Strip EXIF/metadata
#   - Skip files already under SKIP_KB (default 350 KB) and already .webp
#
# Requires: ImageMagick (`magick` binary).

set -euo pipefail

MAX_WIDTH="${MAX_WIDTH:-1920}"
QUALITY="${QUALITY:-80}"
SKIP_KB="${SKIP_KB:-350}"

INPUT="${1:-}"
OUT_DIR="${2:-public/uploads}"

if [[ -z "$INPUT" ]]; then
  echo "usage: $0 <input-dir-or-file> [output-dir]" >&2
  exit 2
fi

if ! command -v magick >/dev/null 2>&1; then
  echo "error: 'magick' (ImageMagick) not found in PATH" >&2
  exit 1
fi

mkdir -p "$OUT_DIR"

shopt -s nullglob nocaseglob

compress_one() {
  local src="$1"
  local base
  base="$(basename "$src")"
  local stem="${base%.*}"
  local lower_stem
  lower_stem="$(echo "$stem" | tr '[:upper:] ' '[:lower:]-' | tr -cd 'a-z0-9-_.')"
  local dst="$OUT_DIR/${lower_stem}.webp"

  local size_kb
  size_kb=$(( $(stat -c%s "$src") / 1024 ))

  if [[ "${src,,}" == *.webp && "$size_kb" -le "$SKIP_KB" ]]; then
    echo "skip  $src (${size_kb}KB, already webp under ${SKIP_KB}KB)"
    return
  fi

  magick "$src" \
    -auto-orient \
    -strip \
    -resize "${MAX_WIDTH}x${MAX_WIDTH}>" \
    -quality "$QUALITY" \
    "$dst"

  local out_kb
  out_kb=$(( $(stat -c%s "$dst") / 1024 ))
  echo "ok    $src  ${size_kb}KB -> $dst  ${out_kb}KB"
}

if [[ -f "$INPUT" ]]; then
  compress_one "$INPUT"
elif [[ -d "$INPUT" ]]; then
  found=0
  while IFS= read -r -d '' f; do
    found=1
    compress_one "$f"
  done < <(find "$INPUT" -maxdepth 1 -type f \( \
              -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' \
              -o -iname '*.webp' -o -iname '*.tif' -o -iname '*.tiff' \
              -o -iname '*.heic' -o -iname '*.heif' -o -iname '*.bmp' \
              -o -iname '*.avif' \) -print0)
  if [[ "$found" -eq 0 ]]; then
    echo "no images found in $INPUT" >&2
    exit 0
  fi
else
  echo "error: '$INPUT' not found" >&2
  exit 1
fi
