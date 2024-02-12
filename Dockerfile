FROM node:20 as build
LABEL image_name="my_name"  
WORKDIR /opt/app/
ADD *.json ./
RUN npm install
ADD . .
RUN npm run build - -
COPY .env app

FROM node:20
LABEL image_name="my_name"
WORKDIR /opt/app
ADD package.json ./
RUN npm install --only=prod
COPY --from=build /opt/app/dist  ./dist
COPY --from=build /opt/app/.env  ./

CMD [ "node", "./dist/main.js" ]    