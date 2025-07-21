
import { ProjectData } from '@/app/models/project';
import { CreateProjectCommand } from './createprojectCommand';
import { DeleteProjectCommand } from './projectItemCommand';

type CommandType = 'create' | 'delete';

// Định nghĩa kiểu dữ liệu cho từng command
type CreatePayload = { data: ProjectData; file: File | null };
type DeletePayload = { id: string };

export class ProjectCommandFactory {
  static createCommand(
    type: CommandType,
    payload: CreatePayload | DeletePayload,
    onSuccess?: () => void
  ) {
    switch (type) {
      case 'create': {
        const { data, file } = payload as CreatePayload;
        return new CreateProjectCommand(data, file, onSuccess || (() => {}));
      }
      case 'delete': {
        const { id } = payload as DeletePayload;
        return new DeleteProjectCommand(id, onSuccess || (() => {}));
      }
      default:
        throw new Error(`Command type ${type} is not supported`);
    }
  }
}
