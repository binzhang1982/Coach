package com.zbin.coachtalk.busi.service;

import java.util.List;

import com.zbin.coachtalk.busi.entity.ParamInfo;

public interface ParamInfoService {
	List<ParamInfo> getParamInfoList(Integer groupkey);
}
