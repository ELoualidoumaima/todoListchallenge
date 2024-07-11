import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Prisma, Task } from '@prisma/client';

@Injectable()
export default class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  async delete(id: number): Promise<Task> {
    return this.prisma.task.delete({
      where: {
        id,
      },
    });
  }

  async save(data: { id?: number; name?: string; completed?: boolean }): Promise<Task> {
    if (data.id) {
      // Update task
      const { id, completed, ...updateData } = data;
      return this.prisma.task.update({
        where: { id },
        data: {
          ...updateData,
          updatedAt: new Date(),
        },
      });
    } else {
      // Create task
      return this.prisma.task.create({
        data: {
          name: data.name,
          completed: data.completed || false,
        },
      });
    }
  }
}
