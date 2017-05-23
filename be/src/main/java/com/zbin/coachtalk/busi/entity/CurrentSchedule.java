package com.zbin.coachtalk.busi.entity;

import java.util.Date;

public class CurrentSchedule extends CurrentScheduleKey {
    private Short workFlag;

    private Date updateTime;
    
    private String middayName;
    
    private Boolean isWorked;
    
    private Boolean isEditable;

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

	public String getMiddayName() {
		return middayName;
	}

	public void setMiddayName(String middayName) {
		this.middayName = middayName;
	}

	public Boolean getIsWorked() {
		return isWorked;
	}

	public void setIsWorked(Boolean isWorked) {
		this.isWorked = isWorked;
	}

	public Boolean getIsEditable() {
		return isEditable;
	}

	public void setIsEditable(Boolean isEditable) {
		this.isEditable = isEditable;
	}
}