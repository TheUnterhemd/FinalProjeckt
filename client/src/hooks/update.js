/** updates database with specific update object at entered url
 - JSON.stringifies update object. default method is PUT*/
export async function update(url, update, authToken, method = "PUT") {
  try {
    const result = await fetch(url, {
      method: method,
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
    console.log("error.message", error.message);
    return { error: true, content: error.message };
  }
}
