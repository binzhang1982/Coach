package com.zbin.coachtalk.busi.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zbin.coachtalk.busi.entity.CoachInfo;
import com.zbin.coachtalk.busi.entity.LoginStatus;
import com.zbin.coachtalk.busi.mapper.CoachInfoMapper;
import com.zbin.coachtalk.busi.mapper.StudentInfoMapper;
import com.zbin.coachtalk.busi.service.CoachInfoService;
import com.zbin.coachtalk.common.exception.ApplicationException;
import com.zbin.coachtalk.common.utils.SecurityUtil;

@Service("coachService")
public class CoachInfoServiceImpl implements CoachInfoService {

    @SuppressWarnings("SpringJavaAutowiringInspection")
    @Autowired
    public StudentInfoMapper studentInfoMapper;
    
    @SuppressWarnings("SpringJavaAutowiringInspection")
    @Autowired
    public CoachInfoMapper coachInfoMapper;

	@Override
	public LoginStatus insertCoach(CoachInfo coach) {
		coach.setAccessTime(new Date());

		// 学员电话是否在学员表/教练表存在，存在报错
		if (studentInfoMapper.selectByPrimaryKey(coach.getPhonenum()) != null) {
			throw new ApplicationException("电话号码已经被注册了");
		}
		if (coachInfoMapper.selectByPrimaryKey(coach.getPhonenum()) != null) {
			throw new ApplicationException("电话号码已经被注册了");
		}
		
		// 插入数据
		coach.setIsadmin(new Short("0"));
		coach.setIsapprovaled(new Short("1"));
		coachInfoMapper.insert(coach);

		Map<String, Object> params = new HashMap<String, Object>();
		params.put("phonenum", coach.getPhonenum());
		params.put("password", coach.getPassword());
		params.put("access", coach.getAccessTime());
		
		LoginStatus status = new LoginStatus();
		status.setIsCoach(true);
		status.setLoggedIn(true);
		status.setToken(SecurityUtil.authentication(params));
		return status;
	}
}
