# BASE PROFILE
FROM node:22.14.0-alpine AS base
RUN mkdir -p /opt/server
WORKDIR /opt/server
RUN chown -R node:node /opt/server
COPY package*.json ./

# BUILD TARGET
FROM base AS build
RUN npm install
COPY . ./
RUN npm run transpile

# DEVELOPMENT SETUP
FROM base AS development-setup
ENV NODE_ENV development
RUN npm install
COPY . .
USER node
EXPOSE 3001 9229

# DEVELOPMENT PROFILE TARGET
FROM development-setup AS development
CMD ["npm", "run", "dev"]

# DEBUGGING PROFILE TARGET
FROM development-setup AS debug
CMD ["npm", "run", "docker:dev"]

# PRODUCTION PROFILE TARGET
FROM base AS production
ENV NODE_ENV production
COPY package*.json ./
COPY public ./public
RUN npm ci --only=production && npm cache clean --force

# Copy build output
COPY --from=build /opt/server/dist /opt/server/dist

USER node
EXPOSE 3001
CMD ["node", "dist/server.js"]
