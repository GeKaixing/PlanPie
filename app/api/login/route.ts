import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  if (!email) {
    return NextResponse.json(
      {
        message: "The mailbox is empty.",
      },
      {
        status: 400,
      }
    );
  }
  if (!password) {
    return NextResponse.json(
      {
        message: "The password is empty.",
      },
      {
        status: 400,
      }
    );
  }
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
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
    return NextResponse.json(
      {
        data: data,
      },
      {
        status: 201,
      }
    );
  }
}
