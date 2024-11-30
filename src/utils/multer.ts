import { diskStorage } from 'multer';
import * as fs from 'node:fs/promises';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { BadRequestException } from '@nestjs/common';

export const multer: MulterOptions = {
  limits: {
    fileSize: 5 * 1024 * 1024
  },

  fileFilter: (_req, file, cb) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
      cb(null, true);
    } else {
      cb(new BadRequestException(`Unsupported file type ${ file.mimetype }`), false);
    }
  },

  storage: diskStorage({
    destination: async (_req, file, cb) => {
      await fs.mkdir(`./uploads/${ file.fieldname }`, { recursive: true });

      cb(null, `./uploads/${ file.fieldname }`);
    },
    filename: (_req, file, cb) => {
      const filename = `${ Date.now() }-${ file.originalname }`;
      cb(null, filename);
    }
  })
}
