module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const RateSchema = new Schema({
        team: { type: Schema.Types.ObjectId, ref: 'Team' },
        name: String,
        framework: Number,
        demo: Number,
        usability: Number,
        performance: Number,
        comment: String,
    }, { timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' } });
    RateSchema.pre('findOne', function () {
        this.populate('team', 'name');
    });
    RateSchema.pre('find', function () {
        this.populate('team', 'name');
    });
    return mongoose.model('Rate', RateSchema);
};
