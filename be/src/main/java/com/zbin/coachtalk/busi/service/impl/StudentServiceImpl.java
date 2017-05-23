package com.zbin.coachtalk.busi.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zbin.coachtalk.busi.entity.CoachInfo;
import com.zbin.coachtalk.busi.entity.CoachInfoExample;
import com.zbin.coachtalk.busi.entity.LoginStatus;
import com.zbin.coachtalk.busi.entity.StudentInfo;
import com.zbin.coachtalk.busi.entity.StudentInfoExample;
import com.zbin.coachtalk.busi.mapper.CoachInfoMapper;
import com.zbin.coachtalk.busi.mapper.StudentInfoMapper;
import com.zbin.coachtalk.busi.service.StudentService;
import com.zbin.coachtalk.common.exception.ApplicationException;
import com.zbin.coachtalk.common.utils.SecurityUtil;
import com.zbin.coachtalk.common.utils.Utils;

@Service("studentService")
public class StudentServiceImpl extends BaseServiceImpl implements StudentService {

    @SuppressWarnings("SpringJavaAutowiringInspection")
    @Autowired
    public StudentInfoMapper studentInfoMapper;
    
    @SuppressWarnings("SpringJavaAutowiringInspection")
    @Autowired
    public CoachInfoMapper coachInfoMapper;

	@Override
	public List<StudentInfo> getOwnStudentList(String token) {
		CoachInfoExample coachExam = new CoachInfoExample();
		coachExam.createCriteria().andTokenEqualTo(token);
		List<CoachInfo> coachs = coachInfoMapper.selectByExample(coachExam);

		CoachInfo coach;
		if (Utils.listNotNull(coachs)) {
			coach = coachs.get(0);
		} else {
			throw new ApplicationException("不是教练员无法排班");
		}
		
		StudentInfoExample studExam = new StudentInfoExample();
		studExam.createCriteria().andCoachPhonenumEqualTo(coach.getPhonenum());
		List<StudentInfo> students = studentInfoMapper.selectByExample(studExam);
		
		if (!Utils.listNotNull(students)) {
			students = new ArrayList<StudentInfo>();
		}
		
		return students;
	}
    
	@Override
	public LoginStatus insertStudent(StudentInfo student) {
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
		student.setAccessTime(new Date());
		student.setToken(super.getToken(student.getPhonenum(), 
				student.getPassword(), student.getAccessTime()));
		student.setIsapprovaled(new Short("1"));
		studentInfoMapper.insert(student);
		
		LoginStatus status = new LoginStatus();
		status.setIsStudent(true);
		status.setLoggedIn(true);
		status.setToken(student.getToken());
		return status;
	}
}
