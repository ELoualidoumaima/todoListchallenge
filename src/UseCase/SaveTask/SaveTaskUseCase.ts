import { BadRequestException, Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { UseCase } from '../../index';
import SaveTaskDto from './SaveTaskDto';
import TaskRepository from '../../Repositories/TaskRepository';

@Injectable()
export default class SaveTaskUseCase
  implements UseCase<Promise<Task>, SaveTaskDto>
{
  constructor(private readonly taskRepository: TaskRepository) {}

  async handle(dto: SaveTaskDto): Promise<Task> {
    try {
      if (!dto.name) {
        throw new BadRequestException('Task name is required');
      }

      const data = {
        id: dto.id,
        name: dto.name,
        completed: dto.completed || false,
      };

      return this.taskRepository.save(data);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
