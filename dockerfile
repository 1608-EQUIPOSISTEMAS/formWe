# Etapa de build
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# aseguramos que Vite use producción
ENV NODE_ENV=production
RUN npm run build

# Etapa de runtime: Nginx sirve /dist
FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
# Nginx por defecto ya expone 80
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
