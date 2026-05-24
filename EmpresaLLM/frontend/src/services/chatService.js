const backendUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_BACKEND_URL;

if (!backendUrl) {
  throw new Error("Falta configurar VITE_API_URL o VITE_BACKEND_URL");
}

const BASE_URL = `${backendUrl}/api/chat`;

export const chatService = {
  async sendMessage(message, model) {
    try {
      // The backend accepts { "message": "string" } right now.
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: message }) // we'll ignore the model since backend doesn't support changing it via request yet
      });

      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }

      const data = await response.json();
      return {
        answer: data.response,
        toolCalls: [], // Backend doesn't currently return this in the DTO
        dashboardData: null // Backend doesn't currently return this
      };
    } catch (error) {
      console.error("Error connecting to backend:", error);
      throw error;
    }
  }
};
