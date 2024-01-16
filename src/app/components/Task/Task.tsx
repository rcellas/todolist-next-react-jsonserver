"use client";

import { ITask } from "@/types/tasks";
import { FiDelete, FiEdit } from "react-icons/fi";
import Modal from "../Modal/Modal";
import { useState } from "react";
import { editTodo,deleteTodo } from "../../../../api";
import { useRouter } from "next/navigation";

interface TaskProps {
  task: ITask;
}

export default function Task({ task }: TaskProps): JSX.Element {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);

  const handleSubmitEditTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await editTodo({
      id: task.id,
      text: taskToEdit,
    });
    setOpenModalEdit(false);
    router.refresh();
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTodo(id);
    setOpenModalDeleted(false);
    router.refresh();
  };

  return (
    <tr key={task.id}>
      <td>{task.text}</td>
      <td className="flex gap-5">
        <span
          onClick={() => setOpenModalEdit(true)}
          style={{ cursor: "pointer" }}
        >
          <FiEdit color="blue" size={25} />
        </span>
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmitEditTodo}>
            <h3 className="font-bold text-lg">Edit Task</h3>

            <div className="modal-action">
              <input
                type="text"
                value={taskToEdit}
                onChange={(e) => setTaskToEdit(e.target.value)}
                placeholder="Type here"
                className="input input-bordered w-full"
              />

              <button type="submit" className="btn">
                Submit
              </button>
            </div>
          </form>
        </Modal>
        <span
          onClick={() => setOpenModalDeleted(true)}
          style={{ cursor: "pointer" }}
        >
            <FiDelete color="red" size={25} />
        </span>
        <Modal
          modalOpen={openModalDeleted}
          setModalOpen={setOpenModalDeleted}>
            <h3 className="text-lg">Are you sure, you want to delete this task?</h3>
            <div className="modal-action">
                <button  onClick={()=>handleDeleteTask(task.id)}>Yes</button>
            </div>
        </Modal> 
      </td>
    </tr>
  );
}
