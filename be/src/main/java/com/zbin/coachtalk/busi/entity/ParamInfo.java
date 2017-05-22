package com.zbin.coachtalk.busi.entity;

public class ParamInfo extends ParamInfoKey {
    private String value;

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value == null ? null : value.trim();
    }
}