'use server'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getTodos } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import DeleteButton from "./components/DeleteButton";
import UpDateButton from "./components/UpDateButton";
import SignupButton from "./components/SignupButton";
export async function addAction(formData: FormData) {
  'use server'
  const content = formData.get('content') as string;
  if (!content) return;
  await prisma.todo.create({
    data: {
      userId: 'bfddcb1b-5526-4db0-9ee4-74bb026f7c3b',
      title: 'elsa@prisma.io',
      content: content,
    },
  })
  revalidatePath('/')
}
export default async function Home() {
    const todos = await getTodos('bfddcb1b-5526-4db0-9ee4-74bb026f7c3b');
    console.log(todos)
    return (
      <div className="w-full h-full">
        <div className="absolute top-1/2 left-1/2 -translate-1/2 max-w-[600px] min-h-[200px] border p-4 border-gray-200 
      focus:border-gray-400  hover:border-gray-400 rounded-2xl flex flex-col gap-4
      ">
          <div className="flex gap-2 ml-auto">
            <SignupButton></SignupButton>
            <Button>signing</Button>
          </div>
          <form className=" flex gap-2 w-full " action={addAction}>
            <Input name="content" placeholder="add your todolist " className="w-full"></Input>
            <Button
              type="submit"
            >submit</Button>
          </form>
          <ul className="space-y-2">
            {todos.map(item => <li key={item.id} className="border  flex items-center justify-between border-gray-200 hover:border-gray-200  rounded-2xl p-4">
              <span className="font-bold ">{item.title}</span>
              {item.content || "null"}
              <div className="self-end space-x-2 flex">
                <DeleteButton id={item.id}></DeleteButton>
                <UpDateButton id={item.id} content={item.content}  ></UpDateButton>
              </div>
            </li>)
            }
          </ul>
        </div>
      </div>
    );
 
}
