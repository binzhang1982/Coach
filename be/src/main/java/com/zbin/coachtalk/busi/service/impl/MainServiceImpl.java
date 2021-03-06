package com.zbin.coachtalk.busi.service.impl;

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
import com.zbin.coachtalk.busi.service.MainService;
import com.zbin.coachtalk.common.exception.ApplicationException;
import com.zbin.coachtalk.common.utils.SecurityUtil;
import com.zbin.coachtalk.common.utils.Utils;

@Service("mainService")
public class MainServiceImpl extends BaseServiceImpl implements MainService {

    @SuppressWarnings("SpringJavaAutowiringInspection")
    @Autowired
    public StudentInfoMapper studentInfoMapper;
    
    @SuppressWarnings("SpringJavaAutowiringInspection")
    @Autowired
    public CoachInfoMapper coachInfoMapper;

	@Override
	public LoginStatus login(CoachInfo user) {
		LoginStatus status = new LoginStatus();
		StudentInfoExample studExam = new StudentInfoExample();
		studExam.createCriteria().andPhonenumEqualTo(user.getPhonenum())
								.andPasswordEqualTo(user.getPassword());
		List<StudentInfo> studs = studentInfoMapper.selectByExample(studExam);
		if (Utils.listNotNull(studs)) {
			StudentInfo stud = studs.get(0);
			// 更新AccessTime
			stud.setAccessTime(new Date());
			stud.setToken(super.getToken(stud.getPhonenum(), 
					stud.getPassword(), stud.getAccessTime()));
			studentInfoMapper.updateByPrimaryKey(stud);
			
			status.setIsStudent(true);
			status.setLoggedIn(true);
			status.setToken(stud.getToken());
		} else {
			CoachInfoExample coachExam = new CoachInfoExample();
			coachExam.createCriteria().andPhonenumEqualTo(user.getPhonenum())
									.andPasswordEqualTo(user.getPassword());
			List<CoachInfo> coachs = coachInfoMapper.selectByExample(coachExam);
			if (Utils.listNotNull(coachs)) {
				CoachInfo coach = coachs.get(0);
				// 更新AccessTime
				coach.setAccessTime(new Date());
				coach.setToken(super.getToken(coach.getPhonenum(), 
						coach.getPassword(), coach.getAccessTime()));
				coachInfoMapper.updateByPrimaryKey(coach);
				
				if (coach.getIsadmin().equals(new Short("1"))) {
					status.setIsAdmin(true);
				}
				status.setIsCoach(true);
				status.setLoggedIn(true);
				status.setToken(coach.getToken());
			} else {
				throw new ApplicationException("未注册用户无法登陆!");
			}
		}

		return status;
	}

}
