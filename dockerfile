# FROM node:20-alpine

# WORKDIR /y-app

# COPY package.json .

# RUN npm install

# COPY . .

# RUN npm run build

# EXPOSE 3000

# CMD ["npm", "start"]


# Stage 1: Build the React app
FROM node:20-alpine AS build

WORKDIR /y-app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve the React app using a lightweight server
FROM nginx:alpine

# Copy the built React app from the previous stage
COPY --from=build /y-app/build /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx when the container has started
CMD ["nginx", "-g", "daemon off;"]
