FROM node:14-alpine
LABEL Fabian Siatama <fsiatama@gmail.com>

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

COPY . /usr/src/app
RUN npm install
RUN npm run compile

# Remove dev dependencies
RUN npm prune --production

# RUN --mount=type=secret,id=auto-devops-build-secrets . /run/secrets/auto-devops-build-secrets && $COMMAND

#ENV PORT 3000
#EXPOSE $PORT

CMD npm start