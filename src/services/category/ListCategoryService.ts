import prismaClient from "../../prisma";

class ListCategoryService{
    async execute(){
        //Buscando as categorias - findMany é buscar todos
        const category = await prismaClient.category.findMany({
            select:{
                id: true,
                name: true
            }
        })
        return category;
    }
}

export {ListCategoryService}