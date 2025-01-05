# Specify the base image
FROM node:alpine as build
# Set the working directory
WORKDIR /app
# Copy the package.json and package-lock.json files
COPY package*.json ./
# Install the dependencies
RUN npm install
# Copy the app files
COPY . .
# Build the app
RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80