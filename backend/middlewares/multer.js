import multer from "multer"

const storage=multer.diskStorage({

    destination:(req,file,cb)=>{   //cb callback

        cb(null,"./public")   //file store in public folder
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

export const upload=multer({storage})