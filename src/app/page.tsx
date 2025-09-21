
'use client'

import { useFetchAppointments } from "@/lib/api/appointments";


export default function HomePage() {
    const fetchRequest = useFetchAppointments();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <h1>Home Page</h1>
      <pre>{JSON.stringify(fetchRequest.data, null, 2)}</pre>
    </main>
  );
}
