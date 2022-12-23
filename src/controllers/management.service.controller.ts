import { Body, Controller, Get, HttpException, HttpStatus, Inject, Post, UseFilters, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { IServiceCategoryResponse } from 'domain/category/interface/category.interface';
import { CreateCategory, GetCategoryParam } from 'domain/category/request/category.request';
import { CategoryResponse } from 'domain/category/response/category.response';


@Controller('management-services')
@ApiTags('management-services')
export class ManagementServiceController {
  constructor(
    @Inject('MANAGEMENT_SERVICE') private readonly managementServiceClient: ClientProxy,
  ) { }

  @Post('categories')
  @ApiCreatedResponse({
    type: CategoryResponse,
  })
  public async createCategory(
    @Body() categoryRequest: CreateCategory,
  ): Promise<CategoryResponse> {
    try {
      const categoryResponse: IServiceCategoryResponse = await firstValueFrom(
        this.managementServiceClient.send('category_create', categoryRequest),
      );
      if (categoryResponse.status !== HttpStatus.CREATED) {
        throw new HttpException(
          {
            message: categoryResponse.message,
            errors: categoryResponse.errors,
          },
          categoryResponse.status,
        );
      }
      return {
        message: categoryResponse.message,
        data: {
          category: categoryResponse.category,
        },
      };
    } catch (error: any) {
      console.log('error: ', error);
      throw new HttpException({ errors: error.response.errors ?? [], message: error.response.message }, error.status);
    }
  }

  @Get('categories/:_id')
  @ApiCreatedResponse({
    type: CategoryResponse,
  })
  public async getCategoryById(
    @Param() categoryRequest: GetCategoryParam,

  ): Promise<CategoryResponse> {
    try {
      console.log('categoryRequest: ', categoryRequest);
      const categoryResponse: IServiceCategoryResponse = await firstValueFrom(
        this.managementServiceClient.send('category_get_by_id', categoryRequest),
      );
      console.log('categoryResponse: ', categoryResponse);
      if (categoryResponse.status !== HttpStatus.OK) {
        throw new HttpException(
          {
            message: categoryResponse.message,
            errors: categoryResponse.errors,
          },
          categoryResponse.status,
        );
      }
      return {
        message: categoryResponse.message,
        data: {
          category: categoryResponse.category,
        },
      };
    } catch (error: any) {
      console.log('error: ', error);
      throw new HttpException({ errors: error.response.errors ?? [], message: error.response.message }, error.status);
    }
  }
}
