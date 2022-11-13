import db from "../model";



export default async () =>{
    db.sequelize.sync({force: false}).then(() => {
        console.log("데이터 베이스 연결 성공");
    }).catch((error) => {
        console.error(error);
    })
};