FROM node:latest

COPY . /src
RUN cd /src && npm i --saveDev && npm run build

VOLUME /output
WORKDIR /output

ENTRYPOINT ["node", "/src/dist/index.js"]
