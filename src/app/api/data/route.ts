import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "../../../../utils/mongoose";
import General from "../../../../utils/model/General";
import Pengumuman from "../../../../utils/model/Pengumuman";
import Diskusi from "../../../../utils/model/Diskusi";
import Agenda from "../../../../utils/model/Agenda";

const getModel = (data: string) => {
  const models: any = {
    general: General,
    pengumuman: Pengumuman,
    diskusi: Diskusi,
    agenda: Agenda,
  };

  return models[data];
};

const handleError = (message: string, status: number) => {
  return NextResponse.json({ error: message }, { status });
};

export async function GET(req: NextRequest) {
  try {
    await connectToDB();

    const { searchParams } = req.nextUrl;
    const data = searchParams.get("data");

    if (
      !data ||
      !["general", "pengumuman", "diskusi", "agenda"].includes(data)
    ) {
      return handleError(
        "Invalid or missing API Request, contact developer.",
        400
      );
    }

    const model = getModel(data);
    const result = await model!.find();
    return NextResponse.json({ data: result });
  } catch (error) {
    console.error(error);
    return handleError("Error fetching data", 500);
  }
}
