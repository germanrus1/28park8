FROM node:16-alpine as frontend

# Устанавливает констансту APP_DIR

ENV APP_DIR /app/
WORKDIR ${APP_DIR}

COPY . ${APP_DIR}
RUN npm install && npm cache clean --force

ENV HOST 0.0.0.0

EXPOSE 80
CMD ["npm", "run", "build"]
CMD ["node", "/app/.output/server/index.mjs"]
