const {SerialPort} = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

const port = new SerialPort({ path: 'COM3', baudRate: 9600});
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

parser.on('data', (data) => {
    receivedData += data; // Concatene os dados recebidos na variável
    console.log('Dados recebidos:', data);
  });