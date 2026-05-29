const backendUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_BACKEND_URL;

if (!backendUrl) {
  console.warn("VITE_API_URL / VITE_BACKEND_URL no configuradas. El chat no funcionará hasta que se configuren.");
}

const BASE_URL = backendUrl ? `${backendUrl}/api/chat` : null;

export const chatService = {
  async sendMessage(message, model) {
    if (!BASE_URL) {
      return { answer: "Backend no configurado. Define VITE_API_URL o VITE_BACKEND_URL en .env", toolCalls: [], dashboardData: null };
    }
    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: message })
      });

      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }

      const data = await response.json();
      return {
        answer: data.response,
        toolCalls: [],
        dashboardData: null
      };
    } catch (error) {
      console.error("Error connecting to backend:", error);
      throw error;
    }
  }
};
