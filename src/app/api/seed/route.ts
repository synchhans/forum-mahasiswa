import { NextResponse } from "next/server";
import General from "../../../../utils/model/General";
import { connectToDB } from "../../../../utils/mongoose";
import Pengumuman from "../../../../utils/model/Pengumuman";
import Diskusi from "../../../../utils/model/Diskusi";
import Agenda from "../../../../utils/model/Agenda";

export async function GET() {
  try {
    const dbConnection = await connectToDB();

    let seedMessage = [];

    const generalExists = await General.findOne();
    if (!generalExists) {
      await General.create({
        logo: "https://i.ibb.co.com/12cHHGf/logo-stmik.jpg",
        universitas: "Nama Kampus",
        link_universitas:
          "https://pemutu.kemdikbud.go.id/affiliations/detail/043027",
        link_aplikasi:
          "https://github.com/synchhans/forum-mahasiswa/blob/main/README.md#aplikasi",
        nama_forum: "Forum Mahasiswa",
        konten_forum:
          "Selamat datang di portal mahasiswa! Temukan informasi, acara, dan ruang diskusi bersama teman-teman kampus.",
        konten_tentang:
          "Forum Mahasiswa adalah platform yang dibuat untuk memberikan ruang bagi mahasiswa untuk berdiskusi, berbagi informasi, serta mengikuti berbagai kegiatan kampus. Kami berharap Forum Mahasiswa menjadi tempat yang inklusif dan bermanfaat bagi seluruh civitas akademika.",
        email: "codeworshipper@gmail.com",
        wa: "081234567890",
      });
      console.log("General data added.");
      seedMessage.push("General data added.");
    } else {
      console.log("General data already exists.");
      seedMessage.push("General data already exists.");
    }

    const pengumumanCount = await Pengumuman.countDocuments();
    if (pengumumanCount === 0) {
      await Pengumuman.insertMany([
        {
          title: "Libur Akhir Tahun",
          description:
            "Kampus akan libur mulai tanggal 25 Desember 2024 hingga 1 Januari 2025. Selamat menikmati liburan!",
          image:
            "https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,q_auto:best,w_640/v1606897096/ezrrsk2aayag68sesnqe.jpg",
          link: "/pengumuman/libur-akhir-tahun",
        },
        {
          title: "Tutorial Web Kursus 2024",
          description: "Tutorial lainnya ^_^ cek di youtube!",
          image: "https://i.ibb.co.com/nnTJDfB/web-kursus.jpg",
          link: "/pengumuman/web-kursus",
        },
        {
          title: "Tutorial Otentikasi dengan Clerk",
          description: "Tutorial lainnya ^_^ cek di youtube!",
          image: "https://i.ibb.co.com/fYvZTVF/clerk-otentikasi.png",
          link: "/pengumuman/clerk-otentikasi",
        },
      ]);
      console.log("Pengumuman data added.");
      seedMessage.push("Pengumuman data added.");
    } else {
      console.log("Pengumuman data already exists.");
      seedMessage.push("Pengumuman data already exists.");
    }

    const diskusiCount = await Diskusi.countDocuments();
    if (diskusiCount === 0) {
      await Diskusi.insertMany([
        {
          title: "Diskusi 1",
          description: "Deskripsi diskusi 1",
          link: "/diskusi/diskusi-1",
        },
        {
          title: "Diskusi 2",
          description: "Deskripsi diskusi 2",
          link: "/diskusi/diskusi-2",
        },
        {
          title: "Proyek Pengembangan Web",
          description:
            "Kolaborasi dan berbagi tips untuk membangun aplikasi web modern.",
          link: "/diskusi/proyek-pengembangan-web",
        },
      ]);
      console.log("Diskusi data added.");
      seedMessage.push("Diskusi data added.");
    } else {
      console.log("Diskusi data already exists.");
      seedMessage.push("Diskusi data already exists.");
    }

    const agendaCount = await Agenda.countDocuments();
    if (agendaCount === 0) {
      await Agenda.insertMany([
        {
          title: "Seminar Teknologi Terbaru",
          date: "30-12-2024",
          description:
            "Kompetisi coding selama 24 jam untuk seluruh mahasiswa.",
          image:
            "https://itb.ac.id/files/dokumentasi/1687417528-IMG-20230617-WA0010.jpg",
        },
      ]);
      console.log("Agenda data added.");
      seedMessage.push("Agenda data added.");
    } else {
      console.log("Agenda data already exists.");
      seedMessage.push("Agenda data already exists.");
    }

    return NextResponse.json({
      message:
        seedMessage.length > 0
          ? "Seed data processed successfully."
          : "No data was added, everything already exists.",
      details: seedMessage,
    });
  } catch (error) {
    console.error("Error seeding data:", error);
    return NextResponse.json(
      { error: "Error seeding data", details: error },
      { status: 500 }
    );
  }
}
