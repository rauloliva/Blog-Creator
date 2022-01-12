import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { MiddlewareLogger } from "../middlewareLogger";
const logger = new MiddlewareLogger();

export function middleware(req) {
  const action = req.headers.get("action-type");
  logger.info(`Action: ${action} requesting to ${req.url} endpoints`);

  if (action !== "login" && action !== "update" && action !== "signup") {
    const access_token = req.headers.get("authorization");
    if (!access_token) {
      logger.error(`Missing access token, returning 401`);
      return new Response("access_token value is missing", {
        status: 401,
        statusText: "Unauthorized",
      });
    }

    try {
      const user = jwt.verify(access_token, process.env.JWT_ACCESS_TOKEN);
      logger.info(`User: ${user.user_email} is authenticated`);
      return new Response(JSON.stringify({ user: user }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      logger.error(
        `User is not authenticated, access token not valid, returning 401`
      );
      return new Response(
        { message: "Not Authorized" },
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  }

  return NextResponse.next();
}
