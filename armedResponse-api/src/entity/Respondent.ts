import { Column, Entity, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { Panic } from './Panic';

@Entity()
export class Respondent {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string = '';

    @Column()
    public email: string = '';

    @Column()
    public cellPhone: string = '';

    @Column()
    public location: string = '';

    @Column()
    public dateRegistered: Date = new Date();

    @OneToMany(type => Panic, panic => panic.id)
    panics: Panic[];
}

export default Respondent;
