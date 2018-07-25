import app from './app';

const server = app.listen(app.get("port"), () => {
    console.log(`App running on port ${app.get("port")}`);
});

console.log("  Press CTRL-C to stop\n");

export default server;

