import { Entity, Column, PrimaryColumn } from "typeorm"
import {v4 as uuidv4} from 'uuid';

@Entity()
export class Branch {

    @PrimaryColumn()
    branch_id: string = uuidv4();

    @Column()
    latitude: string

    @Column()
    longitude: string

    @Column()
    name: string

    @Column()
    full_address: string

    @Column()
    phone: string

}
