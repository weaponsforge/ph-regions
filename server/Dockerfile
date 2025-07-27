# BASE PROFILE
FROM node:22.14.0-alpine AS base
RUN mkdir -p /opt/server
WORKDIR /opt/server
RUN chown -R node:node /opt/server
COPY package*.json ./

# BUILD TARGET
FROM base AS build
ENV NODE_ENV production
RUN npm ci --only=production && npm cache clean --force
COPY . ./
RUN npm run transpile

# DEVELOPMENT PROFILE TARGET
FROM base AS development
ENV NODE_ENV development
RUN npm install
COPY . .
USER node
EXPOSE 3001 9229
CMD ["npm", "run", "dev"]
# CMD ["npm", "run", "docker:dev"]

# PRODUCTION PROFILE TARGET
FROM base AS production
ENV NODE_ENV production
COPY --from=build /opt/app/dist /opt/app/dist
COPY package*.json ./
USER node
EXPOSE 3001
CMD ["node", "dist/index.js"]
