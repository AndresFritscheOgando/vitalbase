import { db } from "@/server/db"


export async function GET() {
    try {
        console.log("Fetching doctors...")
        const doctors = await db.doctor.findMany()
        console.log(doctors)
        return new Response(JSON.stringify(doctors), {
            status: 200,
            headers: { "Content-Type": "application/json" },
      })
    } catch (error: unknown) {
      // Narrow the error type
      if (error instanceof Error) {
        console.error(error.message) // safe now
      } else {
        console.error("Unexpected error", error)
      }
  
      return new Response(
        JSON.stringify({ error: "Internal Server Error" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      )
    }
  }

  export async function POST(request: Request) {
    try {
      console.log("Creating doctor...")
      const body = await request.json()
      const doctor = await db.doctor.create({ data: body })
      console.log(doctor)
      return new Response(JSON.stringify(doctor), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      })
    } catch (error: unknown) {
      // Narrow the error type
      if (error instanceof Error) {
        console.error(error.message) // safe now
      } else {
        console.error("Unexpected error", error)
      }
  
      return new Response(
        JSON.stringify({ error: "Internal Server Error" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      )
    }
  
}

export async function DELETE(request: Request) {
    try {
      console.log("Deleting doctor...")
      const body = await request.json()
      const doctor = await db.doctor.delete({ where: { id: body.id } })
      console.log(doctor)
      return new Response(JSON.stringify(doctor), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    } catch (error: unknown) {
      // Narrow the error type
      if (error instanceof Error) {
        console.error(error.message) // safe now
      } else {
        console.error("Unexpected error", error)
      }
  
      return new Response(
        JSON.stringify({ error: "Internal Server Error" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      )
    }
  
}

export async function PUT(request: Request) {
    try {
      console.log("Updating doctor...")
      const body = await request.json()
      const doctor = await db.doctor.update({ where: { id: body.id }, data: body })
      console.log(doctor)
      return new Response(JSON.stringify(doctor), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    } catch (error: unknown) {
      // Narrow the error type
      if (error instanceof Error) {
        console.error(error.message) // safe now
      } else {
        console.error("Unexpected error", error)
      }
  
      return new Response(
        JSON.stringify({ error: "Internal Server Error" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      )
    }
  
}

