import { Column, Entity, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import Panic from './Panic';

@Entity()
export class Client {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string = '';

    @Column()
    public cellPhone: string = '';

    @Column()
    public dateRegistered: Date = new Date();

    @OneToMany(type => Panic, panic => panic.client)
    panics: Panic[];
}

export default Client;
