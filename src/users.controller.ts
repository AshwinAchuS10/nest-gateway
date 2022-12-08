import {
  Body, Controller, HttpException, HttpStatus, Inject, Post
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';

import { IServiceUserCreateResponse } from './interfaces/user/service-user-create-response.interface';

import { CreateUserResponseDto } from './interfaces/user/dto/create-user-response.dto';
import { CreateUserDto } from './interfaces/user/dto/create-user.dto';

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
    const createUserResponse: IServiceUserCreateResponse = await firstValueFrom(
      this.userServiceClient.send('user_create', userRequest),
    );
    if (createUserResponse.status !== HttpStatus.CREATED) {
      throw new HttpException(
        {
          message: createUserResponse.message,
          data: createUserResponse.user,
          errors: createUserResponse.errors,
        },
        createUserResponse.status,
      );
    }

    // const createTokenResponse: IServiveTokenCreateResponse = await firstValueFrom();
    return {
      message: 'createUserResponse',
      data: {
        user: createUserResponse.user,
        token: 'createTokenResponse.token',
      },
      errors: null,
    };
  }

}
