#!/usr/bin/env bash
# Fail if any image in tracked image dirs is not WebP or exceeds size limit.
#
# Usage:
#   scripts/check-images.sh                # scan default dirs
#   scripts/check-images.sh path/to/file ...  # scan explicit files
#
# Env:
#   IMAGE_MAX_KB   max KB per image (default 400)
#   IMAGE_DIRS     space-separated dirs to scan (default below)

set -euo pipefail

MAX_KB="${IMAGE_MAX_KB:-500}"
DEFAULT_DIRS="${IMAGE_DIRS:-public/uploads public/images src/assets src/content}"

shopt -s nocaseglob

fail=0
total=0

check_file() {
  local f="$1"
  [[ -f "$f" ]] || return 0
  case "${f,,}" in
    *.jpg|*.jpeg|*.png|*.webp|*.gif|*.tif|*.tiff|*.heic|*.heif|*.bmp|*.avif) ;;
    *) return 0 ;;
  esac

  total=$((total + 1))
  local ext_lc="${f##*.}"
  ext_lc="${ext_lc,,}"
  local size_kb
  size_kb=$(( $(stat -c%s "$f") / 1024 ))

  if [[ "$ext_lc" != "webp" ]]; then
    echo "FAIL  $f  not webp (.$ext_lc) — run: npm run compress -- \"$(dirname "$f")\""
    fail=1
    return 0
  fi
  if (( size_kb > MAX_KB )); then
    echo "FAIL  $f  ${size_kb}KB > ${MAX_KB}KB — run: npm run compress -- \"$f\""
    fail=1
    return 0
  fi
}

if [[ $# -gt 0 ]]; then
  for f in "$@"; do
    check_file "$f"
  done
else
  for d in $DEFAULT_DIRS; do
    [[ -d "$d" ]] || continue
    while IFS= read -r -d '' f; do
      check_file "$f"
    done < <(find "$d" -type f \( \
                -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' \
                -o -iname '*.gif' -o -iname '*.tif' -o -iname '*.tiff' \
                -o -iname '*.heic' -o -iname '*.heif' -o -iname '*.bmp' \
                -o -iname '*.avif' -o -iname '*.webp' \) -print0)
  done
fi

if (( fail == 1 )); then
  echo ""
  echo "Image check failed. Limit: ${MAX_KB}KB. Only WebP allowed."
  exit 1
fi

echo "Image check OK  (${total} files, limit ${MAX_KB}KB, webp only)"
