# Development Stage
FROM node:alpine As development

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./

# Install pnpm globally
RUN npm install -g pnpm

# Install all dependencies, including 'devDependencies'
RUN pnpm install

# Install NestJS CLI globally
RUN npm install -g @nestjs/cli

# Copying source files
COPY . .

# Building app
RUN pnpm run build

# Production Stage
FROM node:alpine as production 

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./

# Install pnpm globally
RUN npm install -g pnpm

# Install only production dependencies
RUN pnpm install --prod

# Copy build artifacts from the development stage
COPY --from=development /usr/src/app/dist ./dist

# Running the app
CMD ["node", "dist/apps/payments/main"]
