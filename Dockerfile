# Build stage
FROM krmp-d2hub-idock.9rum.cc/dev-test/repo_ab910038b834 AS build
WORKDIR /usr/src/app
COPY ./fundingboost/package*.json .

RUN npm add react-material-ui-carousel
RUN npm install sass

RUN npm i
COPY . .
WORKDIR /usr/src/app/fundingboost
RUN npm run build

# Run stage
FROM node:20
WORKDIR /usr/src/app/fundingboost
COPY --from=build /usr/src/app/fundingboost/build ./fundingboost
RUN npm install -g serve
EXPOSE 3000

CMD ["serve", "-s", "fundingboost"]