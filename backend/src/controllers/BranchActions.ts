import { Request, Response } from "express";
import { Branch } from "../entity/Branch";
import { AppDataSource } from "../data-source";

export async function branchGetAllAction(request: Request, response: Response) {

    const branchRepository = AppDataSource.getRepository(Branch);

    const branches = await branchRepository.find();

    response.status(200).json({branches: branches});
}

export async function branchGetByIdAction(request: Request, response: Response) {

    const branchRepository = AppDataSource.getRepository(Branch);

    const branch = await branchRepository.findOne({ where: { branch_id: request.params.id } });

    if (!branch) {
        response.status(404).json({message:"Branch is not found"});
        return;
    }
    response.status(200).json({branch: branch});
}

export async function branchSaveAction(request: Request, response: Response) {

    const branchRepository = AppDataSource.getRepository(Branch);
    const newbranch = branchRepository.create(request.body);

    await branchRepository.save(newbranch);
    
    response.status(201).json(newbranch);
}

export async function branchUpdateAction(request: Request, response: Response) {

    const branchRepository = AppDataSource.getRepository(Branch);

    const { branch_id, ...updatedValues } = request.body;

    await branchRepository.update(branch_id, updatedValues);

    response.status(201).json({message: "Branch is successfully updated"});
}

export async function branchDeleteAction(request: Request, response: Response) {

    const branchRepository = AppDataSource.getRepository(Branch);

    await branchRepository.delete(request.params.branch_id);
    

    response.status(204).json({message:"Branch is successfully deleted"});
}