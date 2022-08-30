export const isPosting = (endpoint, body, dispatch) => {
  fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then(async (res) => {
    let results = await res.json();
    const { status, message } = results;
    dispatch({ type: "alert", alertStatus: status, alert: message });
  });
};
