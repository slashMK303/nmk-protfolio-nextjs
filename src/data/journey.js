import { experiences } from "./experience";
import { achievements } from "./achievements";

// Konfigurasi urutan linimasa gabungan (pengalaman & prestasi)
// Hanya masukkan kartu data riil di sini. Tajuk/Headers ("Work Experience" & "Achievements")
// akan dibuat secara otomatis dan mengambang secara dinamis di sela-sela perpindahan kategori.
export const journeyItems = [
    {
        id: "journey-01",
        type: "experience",
        side: "left",
        data: experiences[0]
    },
    {
        id: "journey-02",
        type: "experience",
        side: "right",
        data: experiences[1]
    },
    {
        id: "journey-03",
        type: "experience",
        side: "left",
        data: experiences[2]
    },
    {
        id: "journey-04",
        type: "achievement",
        side: "right",
        data: achievements[0]
    }
];
