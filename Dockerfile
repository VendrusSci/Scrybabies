FROM node:20.14.0-alpine as frontend_build
WORKDIR /app
COPY /frontend/package.json package.json
COPY /frontend/package-lock.json package-lock.json
RUN npm install --silent
COPY /frontend/ .
RUN npm run build

FROM nginx:alpine as final_image
COPY ./deployment/nginx.conf /etc/nginx/nginx.conf
## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*
COPY --from=frontend_build /app/build /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]