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

# Step 2: Set up Nginx to serve the app
FROM nginx:alpine

# Copy the React app build files to the Nginx web root
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port Nginx will serve on
EXPOSE 80

# Command to start Nginx
CMD ["nginx", "-g", "daemon off;"]