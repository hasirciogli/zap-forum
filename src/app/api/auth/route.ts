import { CreateSession, GetSession } from "@/auth-mechanism/server/Funcs";
import { ISession } from "@/interfaces/ISession";
import { CheckCredentials } from "@/models/AccountModel";
import { NextResponse } from "next/server";

export const GET = async (req: NextResponse, { params }: any) => {
  var session = await GetSession();
  if (session) {
    return NextResponse.json({
      status: true,
      session: session,
    });
  }
  return NextResponse.json({
    status: false,
    message: "Session not found.",
  });
};

export const POST = async (req: NextResponse, { params }: any) => {
  const { email, password } = (await req.json()) as {
    email: string;
    password: string;
  };

  var account = await CheckCredentials(email, password);

  if (account) {
    var nSession = await CreateSession(account.id);

    return NextResponse.json({
      status: true,
      session: nSession,
    });
  }

  return NextResponse.json({
    status: false,
    email, password,
    message: "Invalid credentials.",
  });
};
