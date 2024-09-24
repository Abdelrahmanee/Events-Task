


export class ApiFeatures {
    constructor(mongooseQuery, searchQuery) {
        this.mongooseQuery = mongooseQuery;
        this.searchQuery = searchQuery;
    }
    pagination() {
        let pageNumber = this.searchQuery.page * 1 || 1
        console.log(pageNumber);
        
        if (this.searchQuery < 0) pageNumber = 1
        const limit = 10
        const skip = (pageNumber - 1) * limit
        this.pageNumber = pageNumber
        this.limit = limit
        this.mongooseQuery.skip(skip).limit(limit)
        return this
    }
    search() {
        if (this.searchQuery.search) { 
             this.mongooseQuery.find({
                $or :[
                   {title : {$regex : this.searchQuery.search , $options : 'i'}},
                   {organizerName : {$regex : this.searchQuery.search , $options : 'i'}},
                ]
            })
        }
        return this
    }
    fields() {
        if (this.searchQuery.fields) {
            let selectedFields = this.searchQuery.fields.split(',').join(' ')
           this.mongooseQuery.select(selectedFields)
        }

        return this
    }
    sort() {
        if (this.searchQuery.sort) {
            let sortBy = this.searchQuery.sort.split(',').join(' ')
            this.mongooseQuery.sort('-'+sortBy)
        }

        return this
    }
    filter() {
        let filterObj = structuredClone(this.searchQuery)
        filterObj = JSON.stringify(filterObj)
        filterObj = filterObj.replace(/(gt|gte|lt|lte)/g, value => `$${value}`)
        filterObj = JSON.parse(filterObj)
        let excludedObj = ['page', 'sort', 'fields', 'search'];
        excludedObj.forEach(val => {
            delete filterObj[val]
        })
        this.mongooseQuery.find(filterObj)

        return this

    }

}