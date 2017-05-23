package com.zbin.coachtalk.busi.service;

import java.util.List;

import com.zbin.coachtalk.busi.entity.CurrentSchedule;

public interface CoachScheduleService {
	void createSchedule();
	
	List<CurrentSchedule> getScheduleList(String token);
	
	List<CurrentSchedule> updateSchedule(String token, CurrentSchedule schedule);
}
