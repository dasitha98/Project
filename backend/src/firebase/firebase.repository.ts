import { Inject, Injectable } from '@nestjs/common';
import { app } from 'firebase-admin';

@Injectable()
export class FirebaseRepository {
  private readonly db: FirebaseFirestore.Firestore;
  private readonly usersCollection: FirebaseFirestore.CollectionReference;
  private readonly tasksCollection: FirebaseFirestore.CollectionReference;

  constructor(@Inject('FIREBASE_APP') private firebaseApp: app.App) {
    this.db = firebaseApp.firestore();
    this.usersCollection = this.db.collection('users');
    this.tasksCollection = this.db.collection('tasks');
  }

  // async imageUpload(file: any): Promise<any> {
  //   const doc = await this.firebaseApp.storage();
  //   const bucket = await doc.bucket();

  //   const fileName = `${Date.now()}_${file.originalName}`;
  //   const fileUpoad = bucket.file(fileName);

  //   const stream = fileUpoad.createWriteStream({
  //     metadata: { contentType: file.mimetype },
  //   });

  //   return new Promise((resolve, reject) => {
  //     stream.on('error', (error) => {
  //       reject(error);
  //     });

  //     stream.on('finish', () => {
  //       const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${fileName}?alt=media`;
  //       resolve(imageUrl);
  //     });

  //     stream.end(file.buffer);
  //   });
  // }

  async getTask(id: string): Promise<any> {
    const doc = await this.tasksCollection.doc(id).get();
    if (doc.exists) {
      return doc.data();
    } else {
      throw new Error('Document not found');
    }
  }

  async createTask(body: any): Promise<any> {
    return await this.tasksCollection.doc().create({
      name: body.name,
      description: body.description,
      status: body.status,
    });
  }

  async getAllTask(): Promise<any> {
    const querySnapshot = await this.tasksCollection.get();
    const users: any[] = [];

    querySnapshot.forEach((doc) => {
      users.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return users;
  }

  async deleteTask(id: string): Promise<any> {
    return await this.tasksCollection.doc(id).delete();
  }

  async updateTask(id: string, body: any): Promise<any> {
    return await this.tasksCollection.doc(id).update({
      name: body.name,
      description: body.description,
      status: body.status,
    });
  }

  //user
  async findUser(email: string): Promise<any> {
    const user = await this.usersCollection.where('email', '==', email).get();
    if (user.empty) {
      return 0;
    }

    const userDoc = user.docs[0];
    const userData = userDoc.data();
    const userId = userDoc.id;

    return {
      id: userId,
      ...userData,
    };
  }

  async signin(id: string): Promise<any> {
    const doc = await this.usersCollection.doc(id).get();
    if (doc.exists) {
      return doc.data();
    } else {
      throw new Error('Document not found');
    }
  }

  async createUser(body: any, hashedPassword: string): Promise<any> {
    return await this.usersCollection.doc().create({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: hashedPassword,
    });
  }

  async getAllUser(): Promise<any> {
    const querySnapshot = await this.usersCollection.get();
    const users: any[] = [];

    querySnapshot.forEach((doc) => {
      users.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return users;
  }

  async deleteUser(id: string): Promise<any> {
    return await this.usersCollection.doc(id).delete();
  }

  async updateUser(id: string, body: any): Promise<any> {
    return await this.usersCollection.doc(id).update({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: body.password,
    });
  }
}
