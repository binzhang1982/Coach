package com.zbin.coachtalk.busi.service.impl;

import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.time.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zbin.coachtalk.busi.entity.CoachInfo;
import com.zbin.coachtalk.busi.entity.CoachInfoExample;
import com.zbin.coachtalk.busi.entity.CurrentSchedule;
import com.zbin.coachtalk.busi.entity.CurrentScheduleExample;
import com.zbin.coachtalk.busi.mapper.CoachInfoMapper;
import com.zbin.coachtalk.busi.mapper.CurrentScheduleMapper;
import com.zbin.coachtalk.busi.service.CoachScheduleService;
import com.zbin.coachtalk.common.utils.Utils;

@Service("coachScheduleService")
public class CoachScheduleServiceImpl implements CoachScheduleService {

    @SuppressWarnings("SpringJavaAutowiringInspection")
    @Autowired
    public CoachInfoMapper coachInfoMapper;
    
    @SuppressWarnings("SpringJavaAutowiringInspection")
    @Autowired
    public CurrentScheduleMapper currentScheduleMapper;
    
	@Override
	public void createSchedule() {
		CoachInfoExample coachExam = new CoachInfoExample();
		List<CoachInfo> coachs = coachInfoMapper.selectByExample(coachExam);

		Date today = new Date();
		CurrentScheduleExample scheExam;
		for (CoachInfo coach : coachs) {
			for (int diff = 0 ; diff < 7; diff ++) {
				for (int midday = 0; midday < 2; midday++) {
					Date workday = DateUtils.addDays(today, diff);
					Short mid = Short.parseShort(String.valueOf(midday));
					scheExam = new CurrentScheduleExample();
					scheExam.createCriteria().andCoachPhonenumEqualTo(coach.getPhonenum())
											.andWorkdayEqualTo(workday)
											.andMiddayIdEqualTo(mid);
					List<CurrentSchedule> curSchedules = currentScheduleMapper.selectByExample(scheExam);
					
					if (!Utils.listNotNull(curSchedules)) {
						CurrentSchedule curSchedule = new CurrentSchedule();
						curSchedule.setCoachPhonenum(coach.getPhonenum());
						curSchedule.setWorkday(workday);
						curSchedule.setMiddayId(mid);
						curSchedule.setUpdateTime(today);
						curSchedule.setWorkFlag(new Short("1"));
						currentScheduleMapper.insert(curSchedule);
					}
				}
			}
		}
	}

}
