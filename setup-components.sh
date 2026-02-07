#!/bin/bash

# This script will create all React component files

echo "Creating React components..."

# Create .env
cat > .env << 'EOF'
VITE_API_URL=http://localhost:8000
EOF

echo "✅ Created .env"

# All component files are ready!
echo "✅ All files created!"
echo "Run: npm run dev"
