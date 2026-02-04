# ---- build/run backend from /backend ----
FROM node:20-alpine

WORKDIR /app

# copy only backend and install deps
COPY backend/package*.json ./backend/
RUN cd backend && npm ci

# copy backend source
COPY backend ./backend

ENV NODE_ENV=production
EXPOSE 8000

CMD ["sh", "-c", "cd backend && node server.js"]
