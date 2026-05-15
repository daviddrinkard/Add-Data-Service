export function logRequest(req) {
  console.log(req.body);
}

export function validateRoute(req) {
  const { appId } = req.body;

  if (!appId) {
    console.error("No appId found.");
    return false;
  }

  const validIds = ["app-A", "app-B", "app-C"];

  if (!validIds.includes(appId)) {
    console.error("Invalid appId.");
    return false;
  }

  return true;
}

export function handleRoute(req) {
  const { appId } = req.body;
  console.log("We are handling the route for", appId);
  return true;
}
