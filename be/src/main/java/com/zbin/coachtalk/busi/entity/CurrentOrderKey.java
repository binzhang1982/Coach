package com.zbin.coachtalk.busi.entity;

import java.util.Date;

public class CurrentOrderKey {
    private String studentPhonenum;

    private String coachPhonenum;

    private Date workday;

    private Short middayId;

    public String getStudentPhonenum() {
        return studentPhonenum;
    }

    public void setStudentPhonenum(String studentPhonenum) {
        this.studentPhonenum = studentPhonenum == null ? null : studentPhonenum.trim();
    }

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
}