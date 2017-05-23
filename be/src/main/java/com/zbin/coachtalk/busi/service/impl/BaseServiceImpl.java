package com.zbin.coachtalk.busi.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import com.zbin.coachtalk.common.utils.SecurityUtil;

public class BaseServiceImpl {

	protected String getToken(String phonenum, String password, Date accessTime) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("phonenum", phonenum);
		params.put("password", password);
		params.put("access", accessTime);
		return SecurityUtil.authentication(params);
	}
}
