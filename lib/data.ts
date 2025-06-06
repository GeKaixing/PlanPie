"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getTodos(Id:string) {
  return await prisma.todo.findMany({
    where: { userId: Id },
  });
}

export async function deleteTodo(id: string) {
  await prisma.todo.delete({
    where: { id },
  });
  revalidatePath("/");
  return;
}

export async function updateTodo(id: string, content: string) {
  await prisma.todo.update({
    where: {
      id: id,
    },
    data: {
      content: content,
    },
  });
}

export async function updateTodoAction( formData: FormData) {
  const content = formData.get("content") as string;
  const id = formData.get("id") as string;
  if (!content || !id) return;

  await prisma.todo.update({
    where: { id:id },
    data: { content },
  });

  revalidatePath("/");
  return { success: true };
}
