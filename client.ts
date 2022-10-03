import { input } from 'https://deno.land/x/inquirer@v0.0.4/mod.ts';

const ws = new WebSocket('ws://localhost:8080/websocket');

ws.onopen = () => {
    console.log('Conectado al server');
    ws.send('Me acabo de conectar');
}

ws.onmessage = (m) => {
    console.log('MENSAJE DEL SERVER', m.data);
}

let res = '';
while (res !== 'exit') {
    res = await input({ message: '¿Qué quieres mandar al server?' });
    ws.send(res);
}