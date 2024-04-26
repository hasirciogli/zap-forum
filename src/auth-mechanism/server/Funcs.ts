import { cookies } from "next/headers";
import prisma from "../../../lib/prisma";
import { ISession } from "@/interfaces/ISession";
import { Hash } from "crypto";

export const GetSession = async () => {
  var sessionUuid: string = cookies().get("session-uuid")?.value ?? "-1";

  if (sessionUuid === "-1") {
    return null;
  }

  var session = await prisma.session.findUnique({
    where: {
      uuid: sessionUuid,
    },
    include: {
      account: {
        select: {
          id: true,
          uuid: true,
          name: true,
          email: true,
          role: true,
        },
      },
    },
  });

  if (session) {
    return session;
  }

  return null;
};

export const CreateSession = async (accountId: number) => {
  var session = await prisma.session.create({
    data: {
      token:
        Date.now().toString(36) +
        Math.random().toString(36).substring(2) +
        Date.now().toString(36),
      account: {
        connect: {
          id: accountId,
        },
      },
    },
  });

  if (session) {
    cookies().set("session-uuid", session.uuid, {
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    return session;
  }
  return null;
};
