interface ITask {
    id: string,
    text: string,
    status: 'compeleted' | 'incompleted',
    category: ICategory
}

interface ICategory {
    id: string,
    title: string,
}

type taskCreate = {
    categoryId: string,
    text: string
}