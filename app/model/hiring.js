module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const HiringSchema = new Schema({
        status: {
            type: Number, // 状态
            default: 0  // 0 未设置 1 不面试 2 不面试先储备 3 待面试 4 已面试待定结论 5 已面试并储备 6 不录用 7 拒绝offer 8 接受offer 9 试用期离职
        },
        area: String, // 招聘分部
        superior: String, // 直接上级
        job: String, // 应聘岗位
        name: String, // 姓名
        tel: String, // 联系电话
        email: String, // 邮箱地址
        sendDate: Date, // 发送简历时间
        receiveDate: Date, // 收到反馈时间
        feedbackTime: String, // 简历反馈时长
        interviewTime: String, // 面试时长(小时）
        evaluationTime: String, // 评估反馈时长（天）
        channel: String, // 渠道
        recommender: String, // 推荐人
        channelCost: {  // 渠道成本
            type: Number,
            default: 0
        },
        interviewChangeCount: {  // 面试修改次数
            type: Number,
            default: 0
        },
        opinion: String, // 录用意见
        refusingInterviewReasons: String, // 不面试理由
        reasonClassification: String, // 不录用理由分类
        reasons: String, // 不录用具体理由
        refusingReasonClassification: String, // 拒绝offer理由分类
        refusingReasons: String, // 拒绝具体理由
        remark: String, // 备注
    }, { timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' } });
    return mongoose.model('Hiring', HiringSchema);
}