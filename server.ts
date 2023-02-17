import owospeak from "https://esm.sh/owospeak";

const server = Deno.listen({ port: 53621 });

for await (const conn of server) {
    serveHttp(conn);
}

async function serveHttp(conn: Deno.Conn) {
    const httpConn = Deno.serveHttp(conn);
    for await (const requestEvent of httpConn) {
        const message = decodeURIComponent(
            new URL(requestEvent.request.url).pathname.slice(1)
        );
        const body = owospeak.convert(message);
        console.log(`Converted '${message}' to '${body}'`);
        requestEvent.respondWith(
            new Response(body, {
                status: 200,
            })
        );
    }
}
