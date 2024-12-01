FROM node:16.16.0-alpine as node

WORKDIR /app

COPY package.json ./

COPY . .

RUN npm install

#RUN npm run build

FROM nginx:1-alpine

COPY ./conf/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=node /app/dist/ /usr/share/nginx/html

EXPOSE 443

CMD ["nginx","-g","daemon off;"]