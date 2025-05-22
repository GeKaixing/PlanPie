import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  if (!email) {
    return NextResponse.json(
      {
        message: "The mailbox cannot be empty",
      },
      {
        status: 400,
      }
    );
  }
  if (!password) {
    return NextResponse.json(
      {
        message: "The password cannot be empty",
      },
      {
        status: 400,
      }
    );
  }
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (user) {
    return NextResponse.json(
      {
        message: "The mailbox is already at",
      },
      {
        status: 400,
      }
    );
  }
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: "http://localhost:3000/auth/callback",
    },
  });

  if (error) {
    return NextResponse.json(
      {
        message: error.code,
      },
      {
        status: 400,
      }
    );
  }
  if (data) {
    if (data.user) {
      const res = await prisma.user.create({
        data: {
          name: email,
          password: password,
          id: data.user.id,
          email: data.user.email!,
        },
      });
      console.log(res)
    }

    return NextResponse.json(
      {
        data: data,
      },
      {
        status: 200,
      }
    );
  }
}
