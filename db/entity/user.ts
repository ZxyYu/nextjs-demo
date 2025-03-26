import { Entity, BaseEntity, Column, ObjectIdColumn } from 'typeorm';
import { ObjectID } from 'mongodb';
// 引入Entity 实体

@Entity({ name: 'users' })
export class User extends BaseEntity {
    // @PrimaryGeneratedColumn()
    // readonly id!: number;

    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    nickname!: string;

    @Column()
    job!: string;

    @Column()
    avatar!: string;

    @Column()
    introduce!: string;
};