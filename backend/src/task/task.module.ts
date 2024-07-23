import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { FirebaseRepository } from 'src/firebase/firebase.repository';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { app } from 'firebase-admin';

@Module({
  imports: [FirebaseModule],
  controllers: [TaskController],
  providers: [TaskService, FirebaseRepository],
})
export class TaskModule {}
