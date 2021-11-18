from http.server import BaseHTTPRequestHandler, HTTPServer


class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()

        with open("demo.txt", "r+") as f:
            lines = f.readlines()
            message = lines[0]
            self.wfile.write(bytes(message, "utf8"))


with HTTPServer(("", 8000), Handler) as server:
    server.serve_forever()
