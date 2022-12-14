import {
  Body, Controller, HttpException, HttpStatus, Inject, Post, UseFilters
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';

import { IServiceUserCreateResponse } from '../interfaces/user/service-user-create-response.interface';

import { CreateUserResponseDto } from '../interfaces/user/dto/create-user-response.dto';
import { CreateUserDto } from '../interfaces/user/dto/create-user.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
  ) { }

  @Post()
  @ApiCreatedResponse({
    type: CreateUserResponseDto,
  })
  public async createUser(
    @Body() userRequest: CreateUserDto,
  ): Promise<CreateUserResponseDto> {
    try {
      const userResponse: IServiceUserCreateResponse = await firstValueFrom(
        this.userServiceClient.send('user_create', userRequest),
      );
      if (userResponse.status !== HttpStatus.CREATED) {
        throw new HttpException(
          {
            message: userResponse.message,
            errors: userResponse.errors,
          },
          userResponse.status,
        );
      }
      return {
        message: userResponse.message,
        data: {
          user: userResponse.user,
          token: 'TOKEN',
        },
      };
    } catch (error) {
      console.log('error: ', error);
      throw new HttpException({ errors: error.response.errors ?? [], message: error.response.message }, error.status);
    }
  }
}
