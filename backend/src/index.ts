import { App } from './app';

async function bootstrap() {
    const app = new App();
    await app.database();
    await app.listen();
}

bootstrap();
