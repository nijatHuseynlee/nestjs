import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
class PgProduct{
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public title: string;

    @Column({
        nullable: true,
    })
    public desc: string;

    @Column()
    public price: number;
}

export default PgProduct;