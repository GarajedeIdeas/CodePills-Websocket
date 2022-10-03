import { Application, Router } from 'https://deno.land/x/oak@v11.1.0/mod.ts';

const app = new Application();
const router = new Router();

router.get('/websocket', (ctx) => {
    if (!ctx.isUpgradable) {
        ctx.throw(501);
    }

    const ws = ctx.upgrade();

    ws.onopen = () => {
        console.log('Nuevo cliente conectado');
    }

    ws.onclose = () => {
        console.log('Se desconecta un cliente');
    }

    ws.onmessage = (m) => {
        console.log('MENSAJE DEL CLIENTE: ', m.data);
        ws.send(m.data as string);

        if (m.data === 'exit') {
            ws.close();
        }
    }
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 8080 });