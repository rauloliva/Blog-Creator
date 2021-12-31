import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req) {
  const action = req.headers.get("action-type");

  if (action !== "login" && action !== "update") {
    const access_token = req.headers.get("authorization");
    if (!access_token) {
      return new Response("access_token value is missing", {
        status: 401,
        statusText: "Unauthorized",
      });
    }

    try {
      const user = jwt.verify(access_token, process.env.JWT_ACCESS_TOKEN);
      return new Response(JSON.stringify({ user: user }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
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
