import { BadRequestException, Injectable } from '@nestjs/common';
import { join } from 'path';
import { fileExistsSync } from 'tsconfig-paths/lib/filesystem';

@Injectable()
export class FileService {
  getStaticProductImage(imageName: string) {
    const path = join(__dirname, '../../static/product', imageName);
    if (!fileExistsSync(path))
      throw new BadRequestException(
        `No product found with image: ${imageName}`,
      );

    return path;
  }
}
