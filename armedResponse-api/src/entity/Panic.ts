import { Column, Entity, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import { Client } from './Client';
import { Respondent } from './Respondent';

@Entity()
export class Panic {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(type => Client, client => client.id)
    client: Client;

    @ManyToOne(type => Respondent, respondent => respondent.id)
    respondent: Respondent;

    @Column()
    public streetAddress: string = '';

    @Column()
    public longitude: Number = 27.890016; 

    @Column()
    public latitude: Number = -26.236458;

    @Column()
    public timeLogged: Date = new Date();

    @Column()
    public active: Boolean = true;

    @Column()
    public confirmed: Boolean = false;

    @Column()
    public timeResolved: Date ;
}

export default Panic;
