module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const HiringSchema = new Schema({
        status: {
            type: Number, // 状态
            default: 0  // 0 未设置 1 不面试 2 不面试先储备 3 待面试 4 已面试待定结论 5 已面试并储备 6 不录用 7 录用
        },
        area: String, // 招聘分部
        superior: String, // 直接上级
        job: String, // 应聘岗位
        type: String, // 编制类型
        name: String, // 姓名
        tel: String, // 联系电话
        email: String, // 邮箱地址
        sendDate: Date, // 发送简历时间
        receiveDate: Date, // 收到反馈时间
        feedbackTime: String, // 简历反馈时长
        interviewTime: String, // 面试时长(小时）
        evaluationTime: String, // 评估反馈时长（天）
        timeChangeCount: String, // 时间修改次数
        probationPeriod: String, // 试用期是否离职
        channel: String, // 渠道
        recommender: String, // 推荐人
        channelCost: String, // 渠道成本
        interviewers: String, // 面试人
        hrOpinion: String, // HR意见
        reasonClassification: String, // 不录用理由分类
        reasons: String, // 不录用具体理由
        refusingReasonClassification: String, // 拒绝offer理由分类
        refusingReasons: String, // 拒绝具体理由
        checkInTime: String, // 报到时间
        remark: String, // 备注
    }, { timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' } });
    return mongoose.model('Hiring', HiringSchema);
}