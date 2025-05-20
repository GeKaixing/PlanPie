import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export  async function POST(req: Request) {
  const supabase = await createClient();
  const { accessToken, password } = await req.json();

  if (!accessToken || !password) {
    return NextResponse.json(
      { message: "Missing token or password" },
      { status: 400 }
    );
  }

  // 使用 supabase.auth.api 更新密码
  const { error } = await supabase.auth.api.updateUser(accessToken, {
    password,
  });

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }

  NextResponse.json(
    { message: "Password updated successfully" },
    { status: 200 }
  );
}
