const getJSON = async(url,callback) => await fetch(API_LOCATION + url)
.then(x => x.json())
.then(data => callback(data))


const postJSON = async (url, payload, callback) => {
 try {

    const res = await fetch(API_LOCATION + url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      console.error("POST failed:", res.status, res.statusText);
      return;
    }

    // Handle empty responses safely
    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    callback(data);

  } catch (err) {
    console.error("POST error:", err);
  }
};


export {getJSON,postJSON}
