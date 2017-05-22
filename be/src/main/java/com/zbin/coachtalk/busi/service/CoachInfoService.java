package com.zbin.coachtalk.busi.service;

import com.zbin.coachtalk.busi.entity.CoachInfo;
import com.zbin.coachtalk.busi.entity.LoginStatus;

public interface CoachInfoService {
	LoginStatus insertCoach(CoachInfo coach);
}
