<!DOCTYPE html>
<html>
<head>
  <h1>Projeto Node.js com MongoDB usando Docker Compose</h1>
</head>
<body>

<p>Este projeto demonstra como configurar e executar uma aplicação Node.js com MongoDB utilizando Docker Compose.</p>

<h2>Pré-requisitos</h2>

<p>Antes de começar, certifique-se de ter o Docker e o Docker Compose instalados em sua máquina. Você pode baixar o Docker <a href="https://www.docker.com/get-started">aqui</a> e o Docker Compose <a href="https://docs.docker.com/compose/install/">aqui</a>.</p>

<h2>Como usar</h2>

<ol>
  <li><strong>Clone o repositório:</strong></li>
  <pre><code>git clone &lt;url-do-seu-repositório&gt;
cd &lt;nome-do-seu-projeto&gt;
  </code></pre>

  <li><strong>Inicie os contêineres usando Docker Compose:</strong></li>
  <p>Execute o seguinte comando para iniciar os contêineres do Node.js e MongoDB em segundo plano (detached mode):</p>
  <pre><code>docker-compose up -d
  </code></pre>

  <p>Isso irá construir a imagem do Node.js conforme especificado no Dockerfile e iniciar os contêineres do Node.js e MongoDB, ambos conectados à rede <code>custom-nodejs-network</code>.</p>

  <li><strong>Acesse a aplicação:</strong></li>
  <p>Abra seu navegador e vá para <a href="http://localhost:3000">http://localhost:3000</a> para acessar a aplicação Node.js.</p>

  <li><strong>Parar e remover os contêineres:</strong></li>
  <p>Para parar e remover os contêineres, execute:</p>
  <pre><code>docker-compose down
  </code></pre>

  <p>Isso irá parar e remover os contêineres criados pelo Docker Compose.</p>
</ol>

</body>
</html>
