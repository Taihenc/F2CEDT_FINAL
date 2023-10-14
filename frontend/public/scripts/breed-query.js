const query = {
	filter: {},
	search: {},
	sort: {},
	options: { skip: 0, limit: 5 },
	setFilter: function (filter) {
		this.options.skip = 0;
		this.filter = filter.map((option) => ({
			breed_country: { $regex: option, $options: 'i' },
		}));
		this.filter = { $or: this.filter };
	},
	setSearch: function (breed_name) {
		this.options.skip = 0;
		this.search = {
			$or: [
				{ breed_name: { $regex: breed_name, $options: 'i' } },
				{ breed_country: { $regex: breed_name, $options: 'i' } },
				{ breed_info: { $regex: breed_name, $options: 'i' } },
			],
		};
	},
	setSort: function (field, order) {
		this.options.skip = 0;
		this.sort = { [field]: order };
	},
	getQuery: function (options = null) {
		if (options == 'All') return [{}, {}, { skip: 0, limit: 0 }];
		if (this.filter.$or?.length == 0 && this.search.$or?.length == 0) {
			return [{}, this.sort, this.options];
		} else if (this.filter.$or?.length == 0) {
			return [this.search, this.sort, this.options];
		} else if (this.search.$or?.length == 0) {
			return [this.filter, this.sort, this.options];
		} else {
			return [
				{ $and: [this.filter, this.search] },
				this.sort,
				this.options,
			];
		}
	},
	loadmore: function (number) {
		this.options.skip += number;
	},
};

export default query;
