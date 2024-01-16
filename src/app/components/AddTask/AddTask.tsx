'use client';

import { FaPlus } from "react-icons/fa6";
import { FormEventHandler, useState } from "react";
import Modal from "../Modal/Modal";
import { addTodo } from "../../../../api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export default function AddTask() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTask, setNewTask] = useState<string>("");

  const handledNewTodo: FormEventHandler<HTMLFormElement> = async(e) => {
    e.preventDefault();
    await addTodo({
      id: uuidv4(),
      text: newTask
    });
    setNewTask("");
    setModalOpen(false);
    router.refresh();
  }
  return (
    <div>
      <button className="btn btn-primary w-full" onClick={()=> setModalOpen(true)}>Add new task <FaPlus className="ml-2" size={18} /></button>
      <Modal modalOpen={modalOpen} setModalOpen={(open: boolean) => { setModalOpen(open); return open; }} >
        <form onSubmit={handledNewTodo}>
          <h3 className="font-bold text-lg"> Add new task</h3>
          <input type="text" value={newTask} onChange={e=> setNewTask(e.target.value)} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
          <button className="btn btn-secondary" type="submit">Submit</button>
        </form>
      </Modal>
    </div>
  )
}
