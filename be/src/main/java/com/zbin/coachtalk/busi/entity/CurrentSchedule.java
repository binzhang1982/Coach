package com.zbin.coachtalk.busi.entity;

import java.util.Date;
import java.util.List;

public class CurrentSchedule extends CurrentScheduleKey {
    private Short workFlag;

    private Date updateTime;
    
    private String middayName;
    
    private Boolean isWorked;
    
    private Boolean isEditable;
    
    private List<CurrentOrder> orders;
    
    private Boolean canOrder;
    
    private Boolean hasOrdered;
    
    private String statusName;

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

	public List<CurrentOrder> getOrders() {
		return orders;
	}

	public void setOrders(List<CurrentOrder> orders) {
		this.orders = orders;
	}

	public Boolean getCanOrder() {
		return canOrder;
	}

	public void setCanOrder(Boolean canOrder) {
		this.canOrder = canOrder;
	}

	public Boolean getHasOrdered() {
		return hasOrdered;
	}

	public void setHasOrdered(Boolean hasOrdered) {
		this.hasOrdered = hasOrdered;
	}

	public String getStatusName() {
		return statusName;
	}

	public void setStatusName(String statusName) {
		this.statusName = statusName;
	}
}