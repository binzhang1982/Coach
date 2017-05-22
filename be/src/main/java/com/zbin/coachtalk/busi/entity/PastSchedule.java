package com.zbin.coachtalk.busi.entity;

import java.util.Date;

public class PastSchedule {
    private String coachPhonenum;

    private Date workday;

    private Short middayId;

    private Short workFlag;

    private Date updateTime;

    public String getCoachPhonenum() {
        return coachPhonenum;
    }

    public void setCoachPhonenum(String coachPhonenum) {
        this.coachPhonenum = coachPhonenum == null ? null : coachPhonenum.trim();
    }

    public Date getWorkday() {
        return workday;
    }

    public void setWorkday(Date workday) {
        this.workday = workday;
    }

    public Short getMiddayId() {
        return middayId;
    }

    public void setMiddayId(Short middayId) {
        this.middayId = middayId;
    }

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