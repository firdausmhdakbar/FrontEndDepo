# FROM node:alpine
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# EXPOSE 3000
# CMD [ "npm", "start" ]
# ENV TZ=Asia/Jakarta

FROM node:16-alpine

COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

USER node

EXPOSE 3000
CMD ["node", "app"]