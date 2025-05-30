# Étape de construction
FROM node:22-alpine AS builder

WORKDIR /app

# Copie des fichiers de dépendances
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Installation des dépendances
RUN npm install -g pnpm
RUN pnpm install

# Copie du code source
COPY . .

# Construction de l'application
RUN pnpm run build

# Étape d'exécution
FROM node:22-alpine

WORKDIR /app

# Copie des fichiers nécessaires depuis le builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json .
COPY --from=builder /app/next.config.mjs .

# Installation des dépendances de production uniquement
RUN npm install -g pnpm
RUN pnpm install --production

# Exposition du port
EXPOSE 3000

# Commande de démarrage
CMD ["pnpm", "start"]
