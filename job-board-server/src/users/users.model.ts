import {Column, DataType, HasMany, Model, Table} from "sequelize-typescript";


interface UserCreationAttrs{
    name : string;
    email : string;
    password : string;
}
@Table({tableName: "users"})
export class User extends Model<User, UserCreationAttrs>{

    @Column({type: DataType.INTEGER, unique: true, autoIncrement:true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull : false, unique: false})
    name: string;

    @Column({type: DataType.STRING, allowNull : false, unique: true})
    email: string;

    @Column({type: DataType.STRING, allowNull : true})
    phoneNumber: string;


    @Column({type: DataType.STRING, allowNull : false})
    password: string;

    @Column({type: DataType.ARRAY(DataType.STRING), allowNull: true})
    profilePhotos: string[]

    @Column({type: DataType.TEXT, allowNull: true})
    description: string;

    @Column({type: DataType.STRING, allowNull: true})
    region : string;

    @Column({type: DataType.STRING, allowNull: true})
    city : string;

    @Column({type: DataType.STRING, allowNull: true})
    resume: string;



}