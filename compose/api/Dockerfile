FROM node:lts-alpine
ENV NODE_ENV development
WORKDIR /app

COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
COPY ./entrypoint.sh /entrypoint.sh
COPY ./start.sh /start.sh

RUN sed -i 's/\r//' /entrypoint.sh \
    && sed -i 's/\r//' /start.sh \
    && chmod +x /entrypoint.sh \
    && chmod +x /start.sh

RUN chown -R node:node /app \
    && chown -R node:node /entrypoint.sh \
    && chown -R node:node /start.sh 

USER node
RUN npm install
ENTRYPOINT [ "/entrypoint.sh" ]
