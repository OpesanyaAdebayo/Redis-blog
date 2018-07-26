import app from './app';

const server = app.listen(4000, () => {
    console.log(`App running on port ${app.get("port")}`);
});

console.log("  Press CTRL-C to stop\n");

export default server;

