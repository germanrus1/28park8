FROM node:16-alpine as frontend

# Устанавливает констансту APP_DIR

ENV APP_DIR /app/
WORKDIR ${APP_DIR}

COPY . ${APP_DIR}
RUN npm install
RUN npm run build
ENV HOST 0.0.0.0

EXPOSE 3000

CMD ["node", "/app/.output/server/index.mjs"]
