# Use a imagem oficial do Node.js como base
FROM node:latest

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie o package.json e o package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o código-fonte da aplicação para o diretório de trabalho
COPY . .

# Expor a porta que a aplicação irá usar
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "start"]