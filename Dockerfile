# Use the Nginx image from Docker Hub
FROM nginx:alpine

# Copy the custom Nginx config file into Nginx
COPY default.conf /etc/nginx/conf.d/default.conf

# Copy the static website files into the Nginx server
COPY . /usr/share/nginx/html

# Expose port 8889
EXPOSE 80

# Start Nginx when the container has provisioned.
CMD ["nginx", "-g", "daemon off;"]
