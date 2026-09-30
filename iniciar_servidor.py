import http.server
import socketserver
import webbrowser
import socket

PORT = 8080

def get_local_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "127.0.0.1"

local_ip = get_local_ip()

Handler = http.server.SimpleHTTPRequestHandler
# Configura MIME types adequados
Handler.extensions_map.update({
    ".js": "application/javascript",
    ".json": "application/json",
    ".css": "text/css",
    ".svg": "image/svg+xml"
})

print("=" * 60)
print("  APLICATIVO EAP PMMG - SERVIDOR LOCAL INICIADO")
print("=" * 60)
print(f"-> No seu Computador acesse:  http://localhost:{PORT}")
print(f"-> No seu Celular (mesmo Wi-Fi): http://{local_ip}:{PORT}")
print("-" * 60)
print("Pressione Ctrl+C para encerrar o servidor quando quiser.")
print("=" * 60)

# Abre automaticamente o navegador no computador
try:
    webbrowser.open(f"http://localhost:{PORT}")
except Exception:
    pass

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServidor encerrado.")
