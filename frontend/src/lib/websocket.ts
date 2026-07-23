export class WebSocketClient {
  private ws: WebSocket | null = null;
  private url: string;
  private listeners: Record<string, ((data: any) => void)[]> = {};

  constructor(url: string = 'ws://localhost:8000/ws') {
    this.url = url;
  }

  connect() {
    if (this.ws && (this.ws.readyState === WebSocket.CONNECTING || this.ws.readyState === WebSocket.OPEN)) {
      return;
    }
    
    try {
      this.ws = new WebSocket(this.url);
      
      this.ws.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          const type = payload.type || 'message';
          if (this.listeners[type]) {
            this.listeners[type].forEach(cb => cb(payload.data || payload));
          }
        } catch (e) {
          console.error("WS Parse Error", e);
        }
      };

      this.ws.onclose = () => {
        setTimeout(() => this.connect(), 5000); // Reconnect loop
      };
    } catch (e) {
      console.error("WS Connection Error", e);
    }
  }

  on(event: string, callback: (data: any) => void) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(callback);
    return () => {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    };
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

export const wsClient = new WebSocketClient();
