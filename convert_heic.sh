#!/usr/bin/env bash
# Convert HEIC files to PNG using heif-convert
set -euo pipefail

if [[ -z "$1" || "$1" == "--help" ]]; then
    echo "Usage: "
    echo "   $0 <input.heic> [output.png]"
    echo "   $0 <input.heic> [output.webp]"
    exit 1
fi
if [ ! -f "$1" ]; then
    echo "File not found: $1"
    exit 1
fi
TEMPDIR=$(mktemp -d)
echo "Using temporary directory: $TEMPDIR"
echo "Converting $1 to $2"
trap 'rm -rf "$TEMPDIR"' EXIT
# First convert to PNG
heif-convert "$1" "$TEMPDIR/output.png"
if [ $? -ne 0 ]; then
    echo "Failed to convert $input_file to PNG"
    exit 1
fi
# Now convert to WebP
if [[ ! "$2" == *.webp ]]; then
    # we've already converted to PNG, so we can just copy it
    cp "$TEMPDIR/output.png" "$2"
    echo "Converted $1 to $2" # converted to PNG
    exit 0
fi
cwebp -q 100 "$TEMPDIR/output.png" -o "$2"
if [ $? -ne 0 ]; then
    echo "Failed to convert $input_file to WebP"
    exit 1
fi
# Clean up temporary files
if [[ -z "$NOCLEANTEMPDIR" ]]; then
    rm -rf "$TEMPDIR"
fi
echo "Converted $1 to $2!" # converted to WebP. ! to tell it's webp
