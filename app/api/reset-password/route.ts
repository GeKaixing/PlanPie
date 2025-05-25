import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase =await createClient(); // 不需要 await
  const { accessToken, password } = await req.json();

  if (!accessToken || !password) {
    return NextResponse.json(
      { message: "Missing token or password" },
      { status: 400 }
    );
  }

  // 使用最新版 Supabase 客户端的方式设置 access token
  const {  error: sessionError } = await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: "", // 如果你没有 refresh_token，可以传空字符串
  });

  if (sessionError) {
    return NextResponse.json(
      { message: sessionError.message },
      { status: 401 }
    );
  }

  // 更新密码
  const { error: updateError } = await supabase.auth.updateUser({
    password,
  });

  if (updateError) {
    return NextResponse.json({ message: updateError.message }, { status: 400 });
  }

  return NextResponse.json(
    { message: "Password updated successfully" },
    { status: 200 }
  );
}
