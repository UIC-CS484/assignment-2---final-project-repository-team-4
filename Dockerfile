# FROM node:12
# WORKDIR /app/server
# COPY ./server/package.json .
# COPY ./server .
# RUN npm install

# WORKDIR /app/client
# COPY ./client/package.json .
# COPY ./client/public .
# COPY ./client .
# RUN npm install
# RUN npm run build

# WORKDIR /app/server

# EXPOSE 3001
# CMD ["node", "server.js"]