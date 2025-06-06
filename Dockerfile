FROM node:20-alpine AS base

# Set working directory
WORKDIR /app

# Install dependencies only when needed
FROM base AS deps

# Install necessary packages for building and running the application
RUN apk add --no-cache libc6-compat

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies (using legacy-peer-deps for React 19 compatibility)
RUN npm ci --legacy-peer-deps

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Copy ENV for build
COPY .env.local .env

# Build the Next.js application
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

# Install curl for health check
RUN apk add --no-cache curl

# Create a non-root user and group with numeric UID/GID to prevent security issues and permission problems
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

# Copy the standalone build from the builder stage
COPY --from=builder /app/launch-stack/standalone ./
COPY --from=builder /app/launch-stack/static ./launch-stack/static
COPY --from=builder /app/public ./public

# Set permissions for the non-root user
RUN chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

# Expose the listening port
EXPOSE 3000

# Set environment variables
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Add health check using curl (more reliable in alpine)
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/ || exit 1

# Run the application
CMD ["node", "server.js"] 