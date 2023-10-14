const query = {
	filter: {},
	search: {},
	sort: {},
	setFilter: function (filter) {
		this.filter = filter.map((option) => ({
			breed_country: { $regex: option, $options: 'i' },
		}));
		this.filter = { $or: this.filter };
	},
	setSearch: function (breed_name) {
		this.search = {
			$or: [
				{ breed_name: { $regex: breed_name, $options: 'i' } },
				{ breed_country: { $regex: breed_name, $options: 'i' } },
				{ breed_info: { $regex: breed_name, $options: 'i' } },
			],
		};
	},
	setSort: function (field, order) {
		this.sort = { [field]: order };
	},
	getQuery: function () {
		console.log(this.filter.$or);
		if (this.filter.$or?.length == 0 && this.search.$or?.length == 0) {
			return [{}, this.sort];
		} else if (this.filter.$or?.length == 0) {
			return [this.search, this.sort];
		} else if (this.search.$or?.length == 0) {
			return [this.filter, this.sort];
		} else {
			return [{ $and: [this.filter, this.search] }, this.sort];
		}
	},
};

export default query;
