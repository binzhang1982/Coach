package com.zbin.coachtalk.busi.service;

import java.util.List;

import com.zbin.coachtalk.busi.entity.CurrentSchedule;

public interface StudentOrderService {
	List<CurrentSchedule> getOrderList(String token);
}
