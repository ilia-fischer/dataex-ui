#
# Build Task (Node)
#
FROM node:alpine as nodebuild

WORKDIR /app

COPY package.json .
RUN npm set progress=false
RUN npm install

COPY . .

RUN $(npm bin)/ng build --prod --build-optimizer


#
# NGINX Task
#
FROM nginx:1.13.9-alpine

RUN rm -rf /usr/share/nginx/html/*
COPY nginx-default.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html
COPY --from=nodebuild /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
