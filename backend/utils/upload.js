import multer from 'multer';
import {GridFsStorage} from 'multer-gridfs-storage';


//middleware -- for uploading image before calling image
const storage = new GridFsStorage({
    url : `mongodb+srv://akshatshah:mDIvDzAYuiussbTF@blog-website.kvbz0.mongodb.net/?retryWrites=true&w=majority&appName=blog-website`,
    options : {useNewUrlParser : true},
    file: (req,file) => {
        const match = ["image/png","image/jpg","image/jpeg"];

        if(match.indexOf(file.mimeType) === -1){
            return`${Date.now()}-blog-${file.originalname}`;    
        }

        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }

});

export const upload = multer({ storage });