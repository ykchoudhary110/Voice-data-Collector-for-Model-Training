"""
Lightweight Local Server for Edge Wake-Word Dataset Collection
Allows local testing and instant Wi-Fi network sharing across all 6 team members' mobile phones.
"""

import http.server
import socket
import socketserver
import os

PORT = 8000

class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

def get_local_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "127.0.0.1"

if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    local_ip = get_local_ip()
    
    print("=" * 60)
    print("🎙️  EdgeKWS Voice Dataset Collector Running!")
    print("=" * 60)
    print(f"👉 Local Computer:  http://localhost:{PORT}")
    print(f"📱 Team Phones/LAN: http://{local_ip}:{PORT}")
    print("=" * 60)
    print("Press Ctrl+C to stop.\n")
    
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")
