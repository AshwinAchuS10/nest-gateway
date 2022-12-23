import { ApiProperty } from '@nestjs/swagger';
import { ICategory } from '../interface/category.interface';

export class CategoryResponse {
    @ApiProperty({ example: 'category_create_success' })
    message: string;
    data: {
        category: ICategory;
    };
    @ApiProperty({ example: null, nullable: true })
    errors?: { [key: string]: any };

    @ApiProperty({ example: null, nullable: true })
    errorMetadata?: { [key: string]: any };
}