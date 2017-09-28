import DbConnection from "../src/DBConnection";


export function mockModelWith(data) {
     return {
        findAll: () => {
            return {
                then: (call) => {
                    call(data);
                }
            }
        }
    };
}


