import { App } from './app';
import { connect as database } from "./database";

async function main() {
    await database();
    const app = new App();
    await app.listen();
}
main();
