FROM node:14-alpine as build
RUN mkdir -p /usr/app
WORKDIR /usr/app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx
COPY --from=build /usr/app/build /usr/share/nginx/html
