'use client'

import { useFetchAppointments } from "@/lib/api/appointments";
import type { Appointment } from "@/lib/types/appointment";

export default function HomePage() {
  const { data: appointments, isLoading, error } = useFetchAppointments();

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white p-4">
        <div className="text-xl">Loading appointments...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white p-4">
        <div className="text-red-500 mb-4">Error loading appointments</div>
        <div className="text-sm text-gray-400">{error.message}</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Appointments</h1>
        
        {appointments && appointments.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {appointments.map((appointment: Appointment) => (
              <div 
                key={appointment.id} 
                className="bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-colors"
              >
                <h2 className="font-semibold text-lg mb-2">
                  {new Date(appointment.date).toLocaleDateString()}
                </h2>
                <p className="text-gray-300 mb-2">
                  <span className="font-medium">Reason:</span> {appointment.reason}
                </p>
                {appointment.patient && (
                  <p className="text-sm text-gray-400">
                    <span className="font-medium">Patient:</span> {appointment.patient.name}
                  </p>
                )}
                {appointment.doctor && (
                  <p className="text-sm text-gray-400">
                    <span className="font-medium">Doctor:</span> {appointment.doctor.name}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">No appointments found.</p>
          </div>
        )}
      </div>
    </main>
  );
}
