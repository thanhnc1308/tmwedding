#!/bin/bash
# Regenerates the PHOTOS array in PhotoGallery.tsx from all images in the gallery folder.
# Images are sorted by filename. Usage: ./scripts/update-gallery-dimensions.sh

set -euo pipefail

GALLERY_DIR="public/images/gallery"
TARGET_FILE="src/features/invitation/components/PhotoGallery.tsx"

if [ ! -d "$GALLERY_DIR" ]; then
  echo "Error: $GALLERY_DIR not found. Run from project root." >&2
  exit 1
fi

if [ ! -f "$TARGET_FILE" ]; then
  echo "Error: $TARGET_FILE not found." >&2
  exit 1
fi

# Collect images sorted by name
images=()
while IFS= read -r img; do
  images+=("$img")
done < <(find "$GALLERY_DIR" -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' -o -iname '*.webp' -o -iname '*.gif' \) | sort)

if [ ${#images[@]} -eq 0 ]; then
  echo "No images found in $GALLERY_DIR" >&2
  exit 1
fi

# Build the new PHOTOS array into a temp file
tmpfile=$(mktemp)
echo "const PHOTOS: WeddingPhoto[] = [" > "$tmpfile"

id=1
for img in "${images[@]}"; do
  filename=$(basename "$img")
  name="${filename%.*}"
  alt=$(echo "$name" | tr '-' ' ')
  w=$(sips -g pixelWidth "$img" 2>/dev/null | awk '/pixelWidth/{print $2}')
  h=$(sips -g pixelHeight "$img" 2>/dev/null | awk '/pixelHeight/{print $2}')

  if [ -z "$w" ] || [ -z "$h" ]; then
    echo "Warning: Could not read dimensions for $filename, skipping."
    continue
  fi

  cat >> "$tmpfile" <<ENTRY
  {
    id: '$id',
    src: '/images/gallery/$filename',
    alt: '$alt',
    width: $w,
    height: $h,
  },
ENTRY

  echo "$id. $filename: ${w}x${h}"
  id=$((id + 1))
done

echo "];" >> "$tmpfile"

# Replace the PHOTOS array block in the target file
# Extract line numbers for the block
start=$(grep -n 'const PHOTOS: WeddingPhoto\[\] = \[' "$TARGET_FILE" | head -1 | cut -d: -f1)
# Find the matching closing "];" after start
end=$(tail -n +"$start" "$TARGET_FILE" | grep -n '^\];' | head -1 | cut -d: -f1)
end=$((start + end - 1))

if [ -z "$start" ] || [ -z "$end" ]; then
  echo "Error: Could not locate PHOTOS array in $TARGET_FILE" >&2
  rm "$tmpfile"
  exit 1
fi

# Build new file: before block + new block + after block
{
  head -n $((start - 1)) "$TARGET_FILE"
  cat "$tmpfile"
  tail -n +$((end + 1)) "$TARGET_FILE"
} > "${TARGET_FILE}.tmp"

mv "${TARGET_FILE}.tmp" "$TARGET_FILE"
rm "$tmpfile"

echo "Generated $((id - 1)) image(s) in $TARGET_FILE"
