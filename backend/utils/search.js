// class ApiFeatures {
//     constructor(query, queryStr) {
//         this.query = query;
//         this.queryStr = queryStr;
//     }

//     async search() {
//         if (this.queryStr.keyword) {
//             const keywordFilter = {
//                 ref: {
//                     $regex: this.queryStr.keyword,
//                     $options: 'i',
//                 },
//             };
//             this.query = await this.query.find(keywordFilter).lean();
//         }
//         return this.query;
//     }
// }

// module.exports = ApiFeatures;

class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    async search() {
        if (this.queryStr.keyword) {
            const keywordFilter = {
                name: {
                    $regex: this.queryStr.keyword,
                    $options: 'i',
                },
            };
            this.query = await this.query.find(keywordFilter).lean();
        }
        return this.query;
    }
}

module.exports = ApiFeatures;

