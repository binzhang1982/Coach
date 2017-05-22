package com.zbin.coachtalk.busi.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zbin.coachtalk.busi.entity.LoginStatus;
import com.zbin.coachtalk.busi.entity.StudentInfo;
import com.zbin.coachtalk.busi.mapper.CoachInfoMapper;
import com.zbin.coachtalk.busi.mapper.StudentInfoMapper;
import com.zbin.coachtalk.busi.service.StudentService;
import com.zbin.coachtalk.common.exception.ApplicationException;
import com.zbin.coachtalk.common.utils.SecurityUtil;

@Service("studentService")
public class StudentServiceImpl implements StudentService {

    @SuppressWarnings("SpringJavaAutowiringInspection")
    @Autowired
    public StudentInfoMapper studentInfoMapper;
    
    @SuppressWarnings("SpringJavaAutowiringInspection")
    @Autowired
    public CoachInfoMapper coachInfoMapper;
    
	@Override
	public LoginStatus insertStudent(StudentInfo student) {
		student.setAccessTime(new Date());
		
		// 学员电话是否在学员表/教练表存在，存在报错
		if (studentInfoMapper.selectByPrimaryKey(student.getPhonenum()) != null) {
			throw new ApplicationException("电话号码已经被注册了");
		}
		if (coachInfoMapper.selectByPrimaryKey(student.getPhonenum()) != null) {
			throw new ApplicationException("电话号码已经被注册了");
		}
		// 教练电话号码是否存在，不存在报错
		if (coachInfoMapper.selectByPrimaryKey(student.getCoachPhonenum()) == null) {
			throw new ApplicationException("教练的电话号码不存在");
		}
		
		// TODO 学员所学等级与教练的等级是否符合
		
		// 插入数据
		studentInfoMapper.insert(student);
		
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("phonenum", student.getPhonenum());
		params.put("password", student.getPassword());
		params.put("access", student.getAccessTime());
		
		LoginStatus status = new LoginStatus();
		status.setIsAdmin(false);
		status.setIsCoach(false);
		status.setIsStudent(true);
		status.setLoggedIn(true);
		status.setToken(SecurityUtil.authentication(params));
		return status;
	}
}
