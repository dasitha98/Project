import { Inject, Injectable } from '@nestjs/common';
import { FirebaseRepository } from 'src/firebase/firebase.repository';

@Injectable()
export class TaskService {
  constructor(private readonly firebaseRepository: FirebaseRepository) {}

  async createTask(body: any): Promise<any> {
    return this.firebaseRepository.createTask(body);
  }

  async getAllTask(): Promise<any> {
    return this.firebaseRepository.getAllTask();
  }

  async getTask(id: string): Promise<any> {
    return this.firebaseRepository.getTask(id);
  }

  async deleteTask(id: string): Promise<any> {
    return this.firebaseRepository.deleteTask(id);
  }

  async updateTask(id: string, body: any): Promise<any> {
    return this.firebaseRepository.updateTask(id, body);
  }
}
