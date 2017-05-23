package com.zbin.coachtalk.busi.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zbin.coachtalk.busi.entity.ParamInfo;
import com.zbin.coachtalk.busi.entity.ParamInfoExample;
import com.zbin.coachtalk.busi.mapper.ParamInfoMapper;
import com.zbin.coachtalk.busi.service.ParamInfoService;
import com.zbin.coachtalk.common.utils.Utils;

@Service("paramService")
public class ParamInfoServiceImpl extends BaseServiceImpl implements ParamInfoService {

    @SuppressWarnings("SpringJavaAutowiringInspection")
    @Autowired
    private ParamInfoMapper paramInfoMapper;
    
	@Override
	public List<ParamInfo> getParamInfoList(Integer groupkey) {
		ParamInfoExample example = new ParamInfoExample();
		example.createCriteria().andGroupkeyEqualTo(groupkey);
		List<ParamInfo> params = paramInfoMapper.selectByExample(example);
		if (!Utils.listNotNull(params)) {
			params = new ArrayList<ParamInfo>();
		}
		return params;
	}

}
