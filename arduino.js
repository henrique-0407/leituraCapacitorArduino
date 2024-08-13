const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

const port = new SerialPort({ path: 'COM3', baudRate: 9600 });
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))


const mqtt = require('mqtt')

const host = 'maqiatto.com'
const porta = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

const connectUrl = `mqtt://${host}:${porta}`

const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: 'henriquev12n@gmail.com',
  password: 'henrique1230456',
  reconnectPeriod: 1000,
})
let receivedData = ''
const topic = 'henriquev12n@gmail.com/t1'
parser.on('data', (data) => {
  receivedData = data; // Atualize os dados recebidos
  console.log('Dados recebidos:', data);
  
  // Publica os dados recebidos no tópico MQTT
  client.publish(topic, receivedData, (err) => {
    if (err) {
      console.error('Erro ao publicar mensagem MQTT:', err);
    } else {
      console.log('Mensagem MQTT publicada com sucesso:', receivedData);
    }
  });
});


client.on('connect', () => {
  console.log('Connected')

  client.subscribe([topic], () => {
    console.log(`Subscribe to topic '${topic}'`)
    client.publish(topic, parser.on('data', console.log).toString(), { qos: 0, retain: false }, (error) => {
      if (error) {
        console.error(error)
      }
    })
  })
})

client.on('message', (topic, payload) => {
  console.log('Received Message:', topic, payload.toString())
})
