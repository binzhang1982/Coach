package com.zbin.coachtalk.busi.service;

import com.zbin.coachtalk.busi.entity.CoachInfo;
import com.zbin.coachtalk.busi.entity.LoginStatus;

public interface MainService {
	LoginStatus login(CoachInfo user);
}
