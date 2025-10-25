"use client"

import { getCategories } from "@/api/categories";
import { deleteTask, getTasks, updateTaskStatus } from "@/api/todos";
import Spinner from "@/components/Spinner";
import { UndoToast } from "@/components/UndoToast";
import { Check, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

const Page = () => {
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [filteredTasks, setFilteredTasks] = useState<ITask[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // useEffect for getting tasks
    useEffect(() => {
        const fetchTasks = async () => {
            setIsLoading(true);
            const data = await getTasks();
            if (data) setTasks(data);
            setIsLoading(false);
        };

        fetchTasks();
    }, [])

    // getting independent state for filtering tasks
    useEffect(() => {
        if (!tasks) return;
        setFilteredTasks(tasks);
    }, [tasks]);

    // useEffect for getting categories
    useEffect(() => {
        const fetchCategories = async () => {
            const data = await getCategories();
            if (data) setCategories(data);
        };

        fetchCategories();
    }, [])

    // mark as completed
    const markAsCompleted = (task: ITask) => {
        let undoClicked = false;
        const toastId = toast(<UndoToast variant="complete" onUndo={() => {
            undoClicked = true;
            setFilteredTasks(prev => prev ? [...prev, task] : [task]);
        }} closeToast={() => toast.dismiss(toastId)} />, {
            autoClose: 5000,
            closeOnClick: false,
            draggable: false,
        });

        // after 5 sec calling api
        setTimeout(async () => {
            // if not clicked than call
            if (!undoClicked) {
                const updated = await updateTaskStatus(task.id);
                if (updated)
                    setFilteredTasks(prev => prev ? prev.filter(item => item.id != task.id) : []);
            }
        }, 5000);
    };

    // deleting task
    const deleteTaskItem = (task: ITask) => {
        let undoClicked = false;
        const toastId = toast(<UndoToast variant="delete" onUndo={() => {
            undoClicked = true;
            setFilteredTasks(prev => prev ? [...prev, task] : [task]);
        }} closeToast={() => toast.dismiss(toastId)} />, {
            autoClose: 5000,
            closeOnClick: false,
            draggable: false,
        });

        // after 5 sec calling api
        setTimeout(async () => {
            // if not clicked than call
            if (!undoClicked) {
                const deleted = await deleteTask(task.id);
                if (deleted)
                    setFilteredTasks(prev => prev ? prev.filter(item => item.id != task.id) : [])

            }
        }, 5000);
    };

    return (
        <div className=" flex items-center justify-center">
            <div className="flex flex-col gap-4 rounded-xl _border p-4 max-w-[800px] w-full  ">
                <div className="flex items-center gap-2 justify-between">
                    <h1 className="section-title">Task list</h1>
                    <select
                        onChange={(e) => {
                            const selected = e.target.value;
                            if (selected === "All") {
                                setFilteredTasks(tasks);
                            } else {
                                setFilteredTasks(tasks.filter(task => task.category.title === selected));
                            }
                        }}
                        className="input border rounded p-2 text-gray-700"
                        defaultValue='All'
                    >
                        <option value={'All'}>
                            All
                        </option>
                        {categories.map((cat) => (
                            <option value={cat.title} key={cat.id}>
                                {cat.title}
                            </option>
                        ))}
                    </select>
                </div>
                {!isLoading ?
                    <div className="flex flex-col gap-4">
                        {filteredTasks && filteredTasks.length > 0
                            ?
                            filteredTasks.map(task => (
                                <div key={task.id} className="flex items-start gap-2 justify-between p-2 _border rounded-md ">
                                    <div className="flex flex-col gap-2">
                                        <h2 className="text-lg leading-7 font-semibold">{task.text}</h2>
                                        <span className="p-1 rounded-[10px] bg-blue text-white font-medium text-sm leading-5 w-fit">{task.category.title}</span>
                                    </div>
                                    <div className="flex  gap-2">
                                        <button onClick={() => markAsCompleted(task)} className="button-transparent flex gap-2 items-center text-white! font-semibold bg-green-500!">Completed<Check size={16} /></button>
                                        <button onClick={() => deleteTaskItem(task)} className="button-transparent bg-red-500!"><Trash size={16} /></button>
                                    </div>
                                </div>
                            ))
                            :
                            <div className="text-lg text-center leading-7 font-semibold">No tasks yet!</div>
                        }
                    </div>
                    :
                    <Spinner size={20} color="blue" />
                }

            </div>

        </div>
    )
}

export default Page