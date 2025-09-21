import { NextResponse } from 'next/server';
import { db } from '@/server/db';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const appointment = await db.appointment.findUnique({
      where: { id: params.id },
      include: {
        patient: true,
        doctor: true,
      },
    });

    if (!appointment) {
      return NextResponse.json(
        { error: 'Appointment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(appointment);
  } catch (error) {
    console.error('Error fetching appointment:', error);
    return NextResponse.json(
      { error: 'Failed to fetch appointment' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    
    const updatedAppointment = await db.appointment.update({
      where: { id: params.id },
      data: {
        date: data.date ? new Date(data.date) : undefined,
        reason: data.reason,
        patientId: data.patientId,
        doctorId: data.doctorId,
      },
    });

    return NextResponse.json(updatedAppointment);
  } catch (error) {
    console.error('Error updating appointment:', error);
    return NextResponse.json(
      { error: 'Failed to update appointment' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await db.appointment.delete({
      where: { id: params.id },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    return NextResponse.json(
      { error: 'Failed to delete appointment' },
      { status: 500 }
    );
  }
}
