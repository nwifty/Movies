# Use Node image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose the port your dev server runs on
EXPOSE 8080

# Start the dev server
CMD ["npm", "run", "start"]
