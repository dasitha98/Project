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
import { TaskService } from './task.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FirebaseRepository } from 'src/firebase/firebase.repository';

@Controller('task')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly firebaseRepository: FirebaseRepository,
  ) {}

  // @Post('upload')
  // @UseInterceptors(FileInterceptor('file'))
  // imageUpload(@UploadedFile() file: any): any {
  //   return this.firebaseRepository.imageUpload(file);
  // }

  @Post()
  create(@Body() body: any): any {
    return this.taskService.createTask(body);
  }

  @Get()
  getAll(): any {
    return this.taskService.getAllTask();
  }

  @Get('/:id')
  getTask(@Param('id') id: string): any {
    return this.taskService.getTask(id);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): any {
    return this.taskService.deleteTask(id);
  }

  @Put('/:id')
  updateTask(@Param('id') id: string, @Body() body: any): any {
    return this.taskService.updateTask(id, body);
  }
}
