FROM node:26.13.0-alpine

WORKDIR /app

# Herramientas globales fijas en el entorno
RUN npm install -g @angular/cli vercel

# Copiar manifiestos si ya existen (el asterisco evita fallos si aún no se crea el proyecto)
COPY package*.json ./

# Instalar dependencias solo si package.json ya existe
RUN if [ -f package.json ]; then npm install; fi

COPY . .

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0", "--poll", "2000"]
