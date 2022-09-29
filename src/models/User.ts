import {Table, Column, Model} from "sequelize-typescript"

@Table
class User extends Model{
    @Column
    user_name: string
    @Column
    name:string
    @Column
    last_name:string
    @Column
    password:string
    @Column
    country: string
    @Column
    city: string
}
export default User
