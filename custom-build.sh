cd "$(dirname "$0")"

# Include the node_modules/.bin directory in the PATH
export PATH="$PATH:$(pwd)/node_modules/.bin"

# Run your render-build script
npm run render-build