import { NextResponse } from 'next/server';
import { db } from '@/server/db';

export async function GET() {
  try {
    const appointments = await db.appointment.findMany({
      include: {
        patient: true,
        doctor: true,
      },
    });
    return NextResponse.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch appointments' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const appointment = await db.appointment.create({
      data: {
        date: data.date ? new Date(data.date) : new Date(),
        reason: data.reason || '',
        patientId: data.patientId,
        doctorId: data.doctorId,
      },
    });
    return NextResponse.json(appointment);
  } catch (error) {
    console.error('Error creating appointment:', error);
    return NextResponse.json(
      { error: 'Failed to create appointment' },
      { status: 500 }
    );
  }
}
