// pages/api/forgot-password.ts (Next.js API Route)

import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export  async function POST(req: Request) {
    
  const supabase = await createClient();
  const { email } = await req.json();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `http://localhost:3000/reset-password`, // 设置为你的前端 reset 页面
  });

  if (error) return NextResponse.json({ message: error.message }, { status: 400 });

  NextResponse.json({ message: "Reset link sent" }, { status: 200 });
}
