package com.zbin.coachtalk.busi.service;

import java.util.List;

import com.zbin.coachtalk.busi.entity.CoachInfo;
import com.zbin.coachtalk.busi.entity.LoginStatus;

public interface CoachInfoService {
	LoginStatus insertCoach(CoachInfo coach);
	
	List<CoachInfo> getCoachList();
}
