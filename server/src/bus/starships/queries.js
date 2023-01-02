export const queries = {
    starships:  (_, __, {dataSources}) => {
        const {results} =  dataSources.api.getStarships();
        return results;
    }
}
