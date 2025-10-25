"use client"

import { useRouter } from "next/navigation";
// main page
export default function Home() {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center min-h-[150px]">
      <div className="items-center flex-col flex gap-4">
        <h1 className="page-title">Tasks app</h1>
        <p className="text-gray leading-8 text-xl">Welcome back!</p>
        <div className="flex items-center gap-2">
          <button onClick={() => router.push('task/create')} className="button-transparent">Create your new task</button>
          <button onClick={() => router.push('/tasks')} className="button-transparent">Go to task list</button>
        </div>
      </div>
    </div>
  );
}
