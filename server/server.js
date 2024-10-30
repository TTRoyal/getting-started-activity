export default {
  async fetch(request, env) {
    // Only handle POST requests to the `/api/token` endpoint
    if (request.method === "POST" && new URL(request.url).pathname === "/api/token") {
      try {
        // Parse the JSON body from the request
        const { code } = await request.json();

        // Exchange the code for an access token
        const response = await fetch("https://discord.com/api/oauth2/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            client_id: env.VITE_DISCORD_CLIENT_ID, // Environment variable for client_id
            client_secret: env.DISCORD_CLIENT_SECRET, // Environment variable for client_secret
            grant_type: "authorization_code",
            code: code,
          }),
        });

        // Parse the response and extract the access_token
        const data = await response.json();
        const access_token = data.access_token;

        // Return the access_token in the response
        return new Response(JSON.stringify({ access_token }), {
          headers: { "Content-Type": "application/json" },
          status: 200,
        });
      } catch (error) {
        return new Response("Failed to retrieve access token", { status: 500 });
      }
    }

    // If the route or method is not matched, return a 404
    return new Response("Not Found", { status: 404 });
  },
};
