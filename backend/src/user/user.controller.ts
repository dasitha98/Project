import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FirebaseRepository } from 'src/firebase/firebase.repository';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly firebaseRepository: FirebaseRepository,
  ) {}

  // @Post('upload')
  // @UseInterceptors(FileInterceptor('file'))
  // imageUpload(@UploadedFile() file: any): any {
  //   return this.firebaseRepository.imageUpload(file);
  // }

  @Post('signup')
  signup(@Body() body: any): any {
    return this.userService.createUser(body);
  }

  @Post('/signin')
  signin(@Body() body: any): any {
    return this.userService.signin(body);
  }

  @Put('/:id')
  updateUser(@Param('id') id: string, @Body() body: any): any {
    return this.userService.updateUser(id, body);
  }

  @Get()
  getAll(): any {
    return this.userService.getAllUser();
  }
}
