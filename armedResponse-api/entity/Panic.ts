import { Column, Entity, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import Client from './Client';

@Entity()
export class Panic {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(type => Client, client => client.id)
    client: Client;

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
}

export default Panic;
