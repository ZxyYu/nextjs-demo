import { Entity, BaseEntity, Column, ManyToOne, JoinColumn, ObjectIdColumn } from 'typeorm';
import { ObjectID } from 'mongodb';

import {User} from './user';

// 引入Entity 实体
@Entity({ name: 'user_auths' })
export class UserAuth extends BaseEntity {
    @ObjectIdColumn()
    _id: ObjectID;

    @Column() // 显式定义 user_id 字段
    user_id: ObjectID;

    @Column()
    identity_type!: string;

    @Column()
    identifier!: string;

    @Column()
    credential!: string;

    // 多对一关系，明确指定外键字段
    @ManyToOne(() => User, user => user.userAuths)
    @JoinColumn({
        name: 'user_id', // 外键字段名（对应 MongoDB 中的字段）
        referencedColumnName: '_id' // 指向 User 的 _id（ObjectID）
     })
    user!: User
};