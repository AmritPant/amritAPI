class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  search() {
    const keyword = this.queryString.search
      ? { title: { $regex: this.queryString.search, $options: 1 } }
      : {};

    this.query = this.query.find(keyword);
    return this;
  }

  filter() {
    let queryObj = { ...this.queryString };

    const removeFeilds = ['sort', 'paginate', 'limit', 'page', 'feild'];
    removeFeilds.forEach(feild => delete queryObj[feild]);

    queryObj = JSON.stringify(queryObj);
    queryObj = JSON.parse(
      queryObj.replace(/\b(gt|gte|lt|lt)\b/g, match => `$${match}`)
    );
    this.query = this.query.find(queryObj);

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      this.query = this.query.sort(this.queryString.sort);
    } else {
      this.query = this.query.sort('-length');
    }
    return this;
  }

  paginate() {
    const { page, limit } = this.queryString;
    const skipValue = (+page - 1) * +limit;
    this.query = this.query.skip(skipValue).limit(+limit);
    return this;
  }

  limit() {
    if (this.queryString.feilds) {
      this.query = this.query.select(this.queryString.feilds);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }
}

module.exports = ApiFeatures;
