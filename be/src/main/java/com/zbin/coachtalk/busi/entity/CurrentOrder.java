package com.zbin.coachtalk.busi.entity;

import java.util.Date;

public class CurrentOrder extends CurrentOrderKey {
    private Short orderFlag;

    private Date updateTime;

    public Short getOrderFlag() {
        return orderFlag;
    }

    public void setOrderFlag(Short orderFlag) {
        this.orderFlag = orderFlag;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }
}