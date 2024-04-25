import multer from "multer";
import path from "path"

const folderPath = 'public/images';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, folderPath)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
      const fileName = file.fieldname + '-' + uniqueSuffix 
      const imageUrl = `/images/${fileName}`;
      req.imageUrl = imageUrl
      cb(null, fileName)
    }
  })
  
const upload = multer({ storage: storage })

export default upload;