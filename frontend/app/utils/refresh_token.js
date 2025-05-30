const refreshAccessToken = async () => {
  const refresh = localStorage.getItem("refresh");
  if (!refresh) {
    return;
  }

  try {
    const res = await fetch("http://localhost:8000/api/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("access", data.access);
      console.log("Access token refreshed");
    } else {
      console.error("Failed to refresh token:", data.detail);
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
  }
};

const ACCESS_TOKEN_TTL = 5 * 60 * 1000; // 5 minutes

export async function getAccesToken() {
  const now = Date.now();
  const lastRefresh = localStorage.getItem("lastRefresh");
  if (lastRefresh && now - parseInt(lastRefresh, 10) < ACCESS_TOKEN_TTL) {
    return localStorage.getItem("access");
  }

  await refreshAccessToken();
  localStorage.setItem("lastRefresh", now.toString());
  return localStorage.getItem("access");
}
