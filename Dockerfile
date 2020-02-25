FROM node:latest

WORKDIR /workspaces

COPY . /workspaces

RUN yarn install --frozen-lockfile --no-cache

RUN yarn build


EXPOSE 4777

#RUN yarn server:prod

CMD [ "yarn", "start:prod" ]

