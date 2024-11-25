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

export async function POST(req: NextRequest) {
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
    const body = await req.json();

    if (!body || Object.keys(body).length === 0) {
      return handleError("Missing data in request body.", 400);
    }

    const newData = new model!(body);
    await newData.save();

    return NextResponse.json(
      { message: "Data successfully added!" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return handleError("Error processing the request", 500);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await connectToDB();

    const { searchParams } = req.nextUrl;
    const data = searchParams.get("data");
    const id = searchParams.get("id");

    if (
      !data ||
      !["general", "pengumuman", "diskusi", "agenda"].includes(data)
    ) {
      return handleError(
        "Invalid or missing API Request, contact developer.",
        400
      );
    }

    if (!id) {
      return handleError("Missing 'id' parameter.", 400);
    }

    const model = getModel(data);
    const body = await req.json();

    if (!body || Object.keys(body).length === 0) {
      return handleError("Missing data in request body.", 400);
    }

    const updatedData = await model!.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedData) {
      return handleError(`Data with id ${id} not found.`, 404);
    }

    return NextResponse.json({
      message: "Data successfully updated!",
      data: updatedData,
    });
  } catch (error) {
    console.error(error);
    return handleError("Error processing the request", 500);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectToDB();

    const { searchParams } = req.nextUrl;
    const data = searchParams.get("data");
    const id = searchParams.get("id");

    if (
      !data ||
      !["general", "pengumuman", "diskusi", "agenda"].includes(data)
    ) {
      return handleError(
        "Invalid or missing API Request, contact developer.",
        400
      );
    }

    if (!id) {
      return handleError("Missing 'id' parameter.", 400);
    }

    const model = getModel(data);
    const deletedData = await model!.findByIdAndDelete(id);

    if (!deletedData) {
      return handleError(`Data with id ${id} not found.`, 404);
    }

    return NextResponse.json({
      message: `Data with id ${id} successfully deleted!`,
    });
  } catch (error) {
    console.error(error);
    return handleError("Error processing the request", 500);
  }
}
