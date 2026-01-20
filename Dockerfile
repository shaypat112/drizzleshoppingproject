# syntax=docker/dockerfile:1
FROM node:20-alpine AS base

# Install necessary system dependencies for Next.js standalone
# libc6-compat is often required for Next.js on alpine images
RUN apk add --no-cache libc6-compat

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock/pnpm-lock.yaml)
COPY package.json ./
# If you use yarn, copy yarn.lock instead
# COPY yarn.lock ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Run the application
FROM node:20-alpine AS runner

WORKDIR /app

# Copy the standalone output from the previous stage
COPY --from=base /app/.next/standalone ./
COPY --from=base /app/public ./public

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
