const keyMap = {
    '状态': 'status',
    '姓名': 'name',
    '应聘岗位': 'job',
    '招聘分部': 'area',
    '直接上级': 'superior',
    '联系电话': 'tel',
    '邮箱地址': 'email',
    '发送简历时间': 'sendDate',
    '收到反馈时间': 'receiveDate',
    '简历反馈时长（天）': 'feedbackTime',
    '面试时长(小时）': 'interviewTime',
    '评估反馈时长（天）': 'evaluationTime',
    '渠道': 'channel',
    '推荐人': 'recommender',
    '渠道成本（元）': 'channelCost',
    '录用意见': 'opinion',
    '不面试理由': 'refusingInterviewReasons',
    '不录用理由分类': 'reasonClassification',
    '不录用具体理由': 'reasons',
    '拒绝offer理由分类': 'refusingReasonClassification',
    '拒绝具体理由': 'refusingReasons',
    '备注': 'remark',
    '面试修改次数': 'interviewChangeCount'
};

const statusMap = { "不面试": 1, "不面试先储备": 2, "待面试": 3, "已面试待定结论": 4, "已面试并储备": 5, "不录用": 6, "拒绝offer": 7, "接受offer": 8, "试用期离职": 9 };

exports.keyMap = keyMap;
exports.statusMap = statusMap;