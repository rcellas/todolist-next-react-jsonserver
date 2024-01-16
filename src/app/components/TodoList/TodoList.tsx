import React from "react";
import { ITask } from "@/types/tasks";
import Task from "../Task/Task";

interface TodoListProps {
  tasks: ITask[];
}

export default function TodoList({ tasks }: TodoListProps): JSX.Element {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
