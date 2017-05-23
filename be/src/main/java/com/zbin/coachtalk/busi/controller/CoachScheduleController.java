package com.zbin.coachtalk.busi.controller;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.zbin.coachtalk.busi.dto.MsgDTO;
import com.zbin.coachtalk.busi.entity.CoachInfo;
import com.zbin.coachtalk.busi.entity.CurrentSchedule;
import com.zbin.coachtalk.busi.service.CoachScheduleService;

@CrossOrigin(maxAge = 3600)
@Controller
@RequestMapping("api/schedule")
public class CoachScheduleController {

	@Autowired
	private CoachScheduleService coachScheduleService;
	
    @RequestMapping(value = "list", method = {RequestMethod.GET})
    public @ResponseBody MsgDTO getScheduleList(@Param("token") String token) {
        MsgDTO msgDTO = new MsgDTO();
        try {
	        msgDTO.setStatus(MsgDTO.STATUS_OK);
	        msgDTO.setData(coachScheduleService.getScheduleList(token));
	    } catch (Exception e) {
	    	msgDTO.setStatus(MsgDTO.STATUS_FAIL);
	    	msgDTO.setMessage(e.getMessage());
	    }
        return msgDTO;
    }
    
    @RequestMapping(value = "update", method = {RequestMethod.POST})
    public @ResponseBody MsgDTO updateSchedule(@Param("token") String token, 
    		@RequestBody CurrentSchedule schedule) {
        MsgDTO msgDTO = new MsgDTO();
        try {
	        msgDTO.setStatus(MsgDTO.STATUS_OK);
	        msgDTO.setData(coachScheduleService.updateSchedule(token, schedule));
	    } catch (Exception e) {
	    	msgDTO.setStatus(MsgDTO.STATUS_FAIL);
	    	msgDTO.setMessage(e.getMessage());
	    }
        return msgDTO;
    }
}
