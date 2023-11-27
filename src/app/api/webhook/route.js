import { createServer } from 'https';
import { parse } from 'url';
import next from 'next';
import fs from 'fs';
import express from 'express';
import logger from 'morgan';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  // cert: fs.readFileSync(""), // Certificado fullchain do dominio
  // key: fs.readFileSync("/"), // Chave privada do domínio
  // ca: fs.readFileSync(""),   // Certificado público da Efí
  // minVersion: "TLSv1.2",
  // requestCert: true,
  // rejectUnauthorized: true, //Caso precise que os demais endpoints não rejeitem requisições sem mTLS, você pode alterar para false
};

app.prepare().then(() => {
  // const server = express();

  // server.use(logger('dev'));  // Comente essa linha caso não queira que seja exibido o log do servidor no seu console
  // server.use(express.json());
  // server.use(express.urlencoded({ extended: false }));

  // // Endpoint para configuração do webhook, você precisa cadastrar https://SEUDOMINIO.com/webhook
  // server.post("/webhook", (request, response) => {
  //   // Verifica se a requisição que chegou nesse endpoint foi autorizada
  //   if (request.socket.authorized) { 
  //     response.status(200).end();
  //   } else {
  //     response.status(401).end();
  //   }
  // });

  // // Endpoind para recepção do webhook tratando o /pix
  // server.post("/webhook/pix", (request, response) => {
  //   if (request.socket.authorized){
  //     //Seu código tratando a callback
  //     /* EXEMPLO:
  //     var body = request.body;
  //     filePath = __dirname + "/data.json";
  //     fs.appendFile(filePath, JSON.stringify(body) + "\n", function (err) {
  //         if (err) {
  //             console.log(err);
  //         } else {
  //             response.status(200).end();
  //         }
  //     })*/
  //     response.status(200).end();
  //   }else{
  //     response.status(401).end();
  //   }
  });

  server.all('*', (req, res) => {
    // return handle(req, res, parse(req.url, true));
  });

  createServer(httpsOptions, server).listen(443, err => {
  //   if (err) throw err;
  //   console.log('> Ready on https://localhost:443');
  // });
});
