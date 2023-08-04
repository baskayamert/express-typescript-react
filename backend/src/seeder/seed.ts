import { AppDataSource } from "../data-source";
import { Branch } from "../entity/Branch";
import { User } from "../entity/User";
import { branchDataSeed, userDataSeed } from "./seedData";

export async function seed() {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const userEntities = userDataSeed.map(data => userRepository.create(data));
        await userRepository.save(userEntities);

        const branchRepository = AppDataSource.getRepository(Branch);
        const branchEntities = branchDataSeed.map(data => branchRepository.create(data));
        await branchRepository.save(branchEntities);

        console.log('Seeding complete!');
    } catch (error) {
        console.error('Seeding error:', error);
    }
    
}
