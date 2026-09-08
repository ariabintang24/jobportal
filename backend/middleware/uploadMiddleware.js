import multer from "multer";

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.replace(/\s+/g, "-");

    cb(null, `${Date.now()}-${fileName}`); //penamaan gambar berupa tanggal dan nama gambar
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "application/pdf",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, JPEG, PNG, and PDF files are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
