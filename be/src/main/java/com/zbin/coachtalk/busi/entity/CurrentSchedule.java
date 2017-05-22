package com.zbin.coachtalk.busi.entity;

import java.util.Date;

public class CurrentSchedule extends CurrentScheduleKey {
    private Short workFlag;

    private Date updateTime;

    public Short getWorkFlag() {
        return workFlag;
    }

    public void setWorkFlag(Short workFlag) {
        this.workFlag = workFlag;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }
}