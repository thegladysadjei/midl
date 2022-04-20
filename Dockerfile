# build environment
FROM node:13.12.0-alpine as build
ARG API_KEY
ARG AUTH_DOMAIN
ARG PROJECT_ID
ARG STORAGE_BUCKET
ARG MSG_SENDER_ID
ARG APP_ID

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
RUN npm install react-scripts@3.4.1 -g --silent
COPY . ./

RUN REACT_APP_DB_API_KEY=${API_KEY} \
    REACT_APP_DB_AUTH_DOMAIN=${AUTH_DOMAIN} \
    REACT_APP_DB_PROJECT_ID=${PROJECT_ID} \
    REACT_APP_DB_STORAGE_BUCKET=${STORAGE_BUCKET} \
    REACT_APP_DB_MSG_SENDER_ID=${MSG_SENDER_ID} \
    REACT_APP_DB_APP_ID=${APP_ID} \
    npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
# new
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]