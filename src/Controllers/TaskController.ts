import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import DeleteTask from '../UseCase/DeleteTask/DeleteTask';
import GetAllTasksUseCase from '../UseCase/GetAllTasks/GetAllTasksUseCase';
import UseCaseFactory from '../UseCase/UseCaseFactory';
import SaveTaskUseCase from '../UseCase/SaveTask/SaveTaskUseCase';
import SaveTaskDto from '../UseCase/SaveTask/SaveTaskDto';

@Controller('tasks')
export default class TaskController {
  constructor(private readonly useCaseFactory: UseCaseFactory) {}

  @Get()
  async getAll() {
    return (await this.useCaseFactory.create(GetAllTasksUseCase)).handle();
  }

  @Post()
  async create(@Body() dto: SaveTaskDto) {
    return (await this.useCaseFactory.create(SaveTaskUseCase)).handle(dto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: SaveTaskDto) {
    dto.id = Number(id);
    return (await this.useCaseFactory.create(SaveTaskUseCase)).handle(dto);
  }


  @Delete(':id')
  async delete(@Param('id') id: string) {
    return (await this.useCaseFactory.create(DeleteTask)).handle(Number(id));
  }
}
