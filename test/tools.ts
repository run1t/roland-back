import DbConnection from "../src/dbConnection";


export function mockModelWith(data) {
     return {
        findAll: () => {
            return {
                then: (call) => {
                    call(data);
                }
            }
        },
        create : () => {
            return{
                then: (call) =>{
                    call(data);
                }
            }
        },
        findOne : () => {
            return{
                then : (call) =>{
                    call(data);
                }
            }
        }
    };
}


export function assign(){

}