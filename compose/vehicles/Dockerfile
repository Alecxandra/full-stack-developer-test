FROM node:lts
ENV NODE_ENV development
WORKDIR /app

RUN apt-get update \
    && apt-get install -y software-properties-common dirmngr wget gnupg netcat \
    && wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | apt-key add - \
    && echo "deb http://repo.mongodb.org/apt/debian stretch/mongodb-org/4.2 main" | tee /etc/apt/sources.list.d/mongodb-org-4.2.list \
    && apt-get update \
    && apt-get install -y mongodb-org-shell=4.2.7 mongodb-org-tools=4.2.7

COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
COPY ./entrypoint.sh /entrypoint.sh
COPY ./start.sh /start.sh

RUN sed -i 's/\r//' /entrypoint.sh \
    && sed -i 's/\r//' /start.sh \
    && chmod +x /entrypoint.sh \
    && chmod +x /start.sh

# RUN chown -R node:node /app \
#     && chown -R node:node /entrypoint.sh \
#     && chown -R node:node /start.sh 

# USER node
RUN npm install
ENTRYPOINT [ "/entrypoint.sh" ]
