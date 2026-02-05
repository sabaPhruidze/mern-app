FROM node:20-alpine

WORKDIR /app

COPY backend/package*.json ./backend/
RUN cd backend && npm ci

COPY backend ./backend

ENV NODE_ENV=production
EXPOSE 8000

CMD ["sh", "-c", "cd backend && node server.js"]
