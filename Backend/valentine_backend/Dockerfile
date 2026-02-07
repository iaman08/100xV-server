# Use official Bun image
FROM oven/bun:1 AS base
WORKDIR /app

# Install dependencies
FROM base AS deps
COPY package.json bun.lock* ./
COPY prisma ./prisma/
COPY prisma.config.ts ./
RUN bun install --frozen-lockfile || bun install

# Generate Prisma client
RUN bunx prisma generate

# Production stage
FROM base AS runner
WORKDIR /app

# Copy node_modules with generated Prisma client
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/prisma ./prisma
COPY --from=deps /app/prisma.config.ts ./

# Copy source files
COPY . .

# Expose port
EXPOSE 10000

# Set environment
ENV NODE_ENV=production
ENV PORT=10000

# Start the server
CMD ["bun", "run", "index.ts"]
