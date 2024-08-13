const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const mqtt = require('mqtt');

const host = 'maqiatto.com'
const porta = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

const connectUrl = `mqtt://${host}:${porta}`

const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: 'gustavo.oliveira07022000@gmail.com',
  password: 'Simone123',
  reconnectPeriod: 1000,
})
const topic = 'gustavo.oliveira07022000@gmail.com/T1'

const port = new SerialPort({ path: 'COM4', baudRate: 115200});
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))

let receivedData = []; // Variável para armazenar os dados recebidos


// Registre um ouvinte de evento para os dados recebidos
parser.on('data', (data) => {
  receivedData = data; // Concatene os dados recebidos na variável
  console.log(data);

  client.publish(topic, receivedData, (err) => {

  });
});

client.on('connect', () => {
  client.subscribe(topic, (err) => {
    if (!err) {
      console.log(`${topic}`);
    }
    
  });
});

client.on('message', (topic, message) => {
  // Quando uma mensagem for recebida, envie-a para o Arduino
  const msgString = message.toString();

  console.log(`${msgString}`);

  
  if(msgString == 'd'){
    port.write(msgString + '\n', (err) => { // Adiciona um newline ao final da mensagem
      if (err) {
        return console.log(err.message);
      }
      console.log();
    });
  }
  else if(msgString == 'c'){
    port.write(msgString + '\n', (err) => { // Adiciona um newline ao final da mensagem
      if (err) {
        return console.log(err.message);
      }
      console.log();
    });
  }
});


