import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { googleId, name, email } = await req.json();
    // Aquí puedes procesar los datos, por ejemplo, guardarlos en una base de datos
    console.log("Datos recibidos:", { googleId, name, email });

    // Respuesta simulada
    return NextResponse.json(
      { message: "Datos recibidos correctamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    return NextResponse.json(
      { error: "Error al procesar los datos" },
      { status: 500 }
    );
  }
}
