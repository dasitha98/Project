import { Inject, Injectable } from '@nestjs/common';
import { app } from 'firebase-admin';
import { FirebaseRepository } from 'src/firebase/firebase.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly firebaseRepository: FirebaseRepository) {}

  async createUser(body: any): Promise<any> {

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(body.password, salt);

    return this.firebaseRepository.createUser(body, hashedPassword);
  }

  async getAllUser(): Promise<any> {
    return this.firebaseRepository.getAllUser();
  }

  //signin
  async signin(body: any): Promise<any> {
    const user = await this.firebaseRepository.findUser(body.email);
    if (!user) {
      return { status: false, message: 'Invalid username orpassword' };
    }

    const compare = await bcrypt.compare(body.password, user?.password);
    if (!compare) {
      return { status: false, message: 'Invalid username orpassword' };
    }

    const { password, ...userWithoutPassword } = user;
    
    return userWithoutPassword;
  }

  async deleteUser(id: string): Promise<any> {
    return this.firebaseRepository.deleteUser(id);
  }

  async updateUser(id: string, body: any): Promise<any> {
    return this.firebaseRepository.updateUser(id, body);
  }
}
