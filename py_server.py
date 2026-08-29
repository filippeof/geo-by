import http.server
import socketserver
import os
import mimetypes
import webbrowser
mimetypes.add_type('text/css', '.css')
# Change current working directory to where this script lives
os.chdir(os.path.dirname(os.path.abspath(__file__)))
print(f"Serving files from {os.getcwd()}")
PORT = 8000
Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Server running at http://localhost:{PORT}/index.html")
    webbrowser.open(f"http://localhost:{PORT}/index.html")
    httpd.serve_forever()
