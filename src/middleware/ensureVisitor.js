import { randomUUID } from "crypto";

export function ensureVisitorId(req, res, next) {
  const cookieName = "visitorId";
  let id = req.cookies?.[cookieName];
  if (!id) {
    id = randomUUID();
    res.cookie(cookieName, id, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year
    });
  }
  req.visitorId = id;
  next();
}
