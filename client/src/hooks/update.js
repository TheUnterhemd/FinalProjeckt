/** updates database with specific update object at entered url (fUrl) - JSON.stringifies update object*/
export async function update(fUrl, update, authToken) {
  try {
    const result = await fetch(fUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(update),
    });

    if (!result.ok) {
      throw new Error(result.statusText);
    }
    const json = await result.json();
    return json;
  } catch (error) {
    console.log("update.js", error);
  }
}
