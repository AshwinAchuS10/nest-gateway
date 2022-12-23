import { ApiProperty } from "@nestjs/swagger";

export class CreateCategory {
    @ApiProperty({
        minLength: 2,
        example: 'Abc',
    })
    name: string;
}

export class GetCategoryParam {
    @ApiProperty()
    _id: string;
}