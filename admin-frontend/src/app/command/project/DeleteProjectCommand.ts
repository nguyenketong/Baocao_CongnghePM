import axios from 'axios';

export class DeleteProjectCommand {
  constructor(private projectId: string, private onSuccess: () => void) {}

  async execute() {
    try {
      await axios.delete(`http://localhost:3000/projects/${this.projectId}`);
      this.onSuccess();
    } catch (error) {
      console.error('Lỗi khi xóa dự án:', error);
    }
  }
}
