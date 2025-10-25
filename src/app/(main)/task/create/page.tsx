"use client"

import { getCategories } from "@/api/categories";
import { createTask } from "@/api/todos";
import Spinner from "@/components/Spinner";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from 'react-toastify';

interface IForm {
    text: string;
    categoryId: string,
}
const Page = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<IForm>();
    const [isCreated, setIsCreated] = useState<boolean>(false);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // func for creating a task
    const onSubmit: SubmitHandler<IForm> = async (data): Promise<void> => {
        if (!data.categoryId || data.text.trim().length == 0) {
            toast.error('Firstly full all the inputs!')
        } else {
            const state = await createTask({ text: data.text, categoryId: data.categoryId })
            setIsCreated(state);
        }
    }

    // useEffect for getting categories
    useEffect(() => {
        const fetchCategories = async () => {
            setIsLoading(true);
            const data = await getCategories();
            if (data) setCategories(data);
            setIsLoading(false);
        };

        fetchCategories();
    }, [])


    return (
        <div className="flex items-center justify-center">
            {
                isCreated ?
                    <div className="">
                        <div className="flex flex-col items-center gap-4">
                            <h1 className="section-title text-green-500!">Successfully created!</h1>
                            <div className="flex items-center gap-4">
                                <Link className="link flex items-center gap-2" href={'/tasks'}><span>Go to task list</span><ArrowRight size={16} /></Link>
                                <button onClick={() => {setIsCreated(false); reset();}} className="button-transparent" ><span>Create new task</span></button>
                        </div>
                    </div>
                    </div>
                    :
<form className="max-w-[600px] w-full p-4 _border rounded-xl flex flex-col items-center gap-2" onSubmit={handleSubmit(onSubmit)}>
    <h1 className="section-title mb-5 border-b pb-2">Create a task</h1>
    {isLoading ?
        <Spinner size={20} color="blue" />

        :
        <>
            <div className="flex flex-col gap-2 w-full">
                <label className="text-sm leading-[22px] font-medium" htmlFor="text">Content</label>
                <div className="relative input flex items-center gap-2 text-gray text-sm leading-[22px] ">
                    <input  {...register("text", {
                        validate: {
                            isNotEmpty: (value) => value.trim() !== "" || "Field is required",
                        }
                    })} className="w-full outline-none" placeholder="Enter your text" type="text" id="text" />
                </div>
                {errors.text && (
                    <span data-testid='error' className="text-red-500 font-medium ">
                        {errors.text.message}
                    </span>
                )}
            </div>
            {categories &&
                (
                    <div className="flex flex-col gap-2 mb-4 w-full">
                        <label className="text-sm font-medium" htmlFor="categoryId">
                            Category
                        </label>

                        <select
                            id="categoryId"
                            {...register("categoryId", {
                                required: "Please select a category",
                            })}
                            className="input border rounded p-2 text-gray-700"
                            defaultValue=""
                        >
                            <option value="" disabled>
                                Select category...
                            </option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.title}
                                </option>
                            ))}
                        </select>

                        {errors.categoryId && (
                            <span className="text-red-500 text-sm font-medium">
                                {errors.categoryId.message}
                            </span>
                        )}
                    </div>
                )
            }

            <button type="submit" className="button-transparent px-1 w-fit">Create</button>
        </>
    }


</form>

            }

        </div >
    )
}

export default Page