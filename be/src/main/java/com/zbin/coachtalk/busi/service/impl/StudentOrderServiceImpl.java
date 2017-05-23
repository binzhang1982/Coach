package com.zbin.coachtalk.busi.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zbin.coachtalk.busi.entity.CurrentOrderExample;
import com.zbin.coachtalk.busi.entity.CurrentSchedule;
import com.zbin.coachtalk.busi.entity.StudentInfo;
import com.zbin.coachtalk.busi.entity.StudentInfoExample;
import com.zbin.coachtalk.busi.mapper.CurrentOrderMapper;
import com.zbin.coachtalk.busi.mapper.CurrentScheduleMapper;
import com.zbin.coachtalk.busi.mapper.StudentInfoMapper;
import com.zbin.coachtalk.busi.service.StudentOrderService;
import com.zbin.coachtalk.common.exception.ApplicationException;
import com.zbin.coachtalk.common.utils.Utils;

@Service("studentOrderService")
public class StudentOrderServiceImpl extends BaseServiceImpl implements StudentOrderService {

    @SuppressWarnings("SpringJavaAutowiringInspection")
    @Autowired
    public StudentInfoMapper studentInfoMapper;
    
    @SuppressWarnings("SpringJavaAutowiringInspection")
    @Autowired
    public CurrentScheduleMapper currentScheduleMapper;
    
    @SuppressWarnings("SpringJavaAutowiringInspection")
    @Autowired
    public CurrentOrderMapper currentOrderMapper;
    
	@Override
	public List<CurrentSchedule> getOrderList(String token) {
		StudentInfoExample studentExam = new StudentInfoExample();
		studentExam.createCriteria().andTokenEqualTo(token);
		List<StudentInfo> students = studentInfoMapper.selectByExample(studentExam);
		
		StudentInfo student;
		if (Utils.listNotNull(students)) {
			student = students.get(0);
		} else {
			throw new ApplicationException("不是学员无法预约");
		}
		
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("CoachPhoneNum", student.getCoachPhonenum());
		params.put("StudentPhoneNum", student.getPhonenum());
		List<CurrentSchedule> schedules = currentScheduleMapper.getCoachScheduleListWithOrders(params);
		
		if (Utils.listNotNull(schedules)) {
			CurrentOrderExample orderExam;
			for (CurrentSchedule schedule : schedules) {
				orderExam = new CurrentOrderExample();
				orderExam.createCriteria().andCoachPhonenumEqualTo(schedule.getCoachPhonenum())
										.andWorkdayEqualTo(schedule.getWorkday())
										.andMiddayIdEqualTo(schedule.getMiddayId());
				Integer cnt = 5 - currentOrderMapper.countByExample(orderExam);
				if (cnt <= 0 ) {
					schedule.setCanOrder(false);
					schedule.setStatusName("已约满");
				} else {
					schedule.setCanOrder(true && schedule.getIsWorked());
					schedule.setStatusName("还剩" + String.valueOf(cnt) + "位");
				}
				if (Utils.listNotNull(schedule.getOrders())) {
					schedule.setHasOrdered(true);
				} else {
					schedule.setHasOrdered(false);
				}
			}
		} else {
			schedules = new ArrayList<CurrentSchedule>();
		}
		
		return schedules;
	}

}
