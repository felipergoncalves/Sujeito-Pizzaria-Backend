import { Request, Response } from "express";
import { ListCategoryService } from "../../services/category/ListCategoryService";

class ListCategoryController{
    async handle(req: Request, res: Response){
        const listCategoryService = new ListCategoryService();
        //recebendo o array com as categories
        const category = await listCategoryService.execute();

        return res.json(category);
    }
}

export { ListCategoryController }