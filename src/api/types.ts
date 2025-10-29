export interface Todo {
  id: number;
  title: string;
  done: boolean;
  // Có thể có thêm createdAt, updatedAt nếu BE cung cấp
}

export interface AddTodoPayload {
  title: string;
}

export interface UpdateTodoPayload {
  title?: string;
  done?: boolean;
}