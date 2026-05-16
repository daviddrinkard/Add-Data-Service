// utils/retry.js
export async function retry(fn, options = {}) {
  const {
    retries = 5,
    delay = 500, // ms
    backoff = 2, // exponential backoff multiplier
  } = options;

  let attempt = 0;
  let currentDelay = delay;

  while (attempt < retries) {
    try {
      return await fn();
    } catch (err) {
      attempt++;
      console.error(`Attempt ${attempt} failed:`, err.message);

      if (attempt >= retries) {
        console.error("All retries failed");
        throw err;
      }

      await new Promise((res) => setTimeout(res, currentDelay));
      currentDelay *= backoff;
    }
  }
}
