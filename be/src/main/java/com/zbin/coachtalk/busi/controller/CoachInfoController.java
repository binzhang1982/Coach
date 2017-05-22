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
import com.zbin.coachtalk.busi.service.CoachInfoService;

@CrossOrigin(maxAge = 3600)
@Controller
@RequestMapping("api/coach")
public class CoachInfoController {

	@Autowired
	private CoachInfoService coachInfoService;
	
    /**
     * 教练注册或更新
     * @param id
     * @param maps
     * @return
     */
    @RequestMapping(value = "save_coach", method = {RequestMethod.POST})
    public @ResponseBody MsgDTO saveDiningDeskMapById(@Param("token") String token, 
    		@RequestBody CoachInfo coach) {
        MsgDTO msgDTO = new MsgDTO();
        try {
	        msgDTO.setStatus(MsgDTO.STATUS_OK);
	        if (token == null) {
	        	// new
	        	msgDTO.setData(coachInfoService.insertCoach(coach));
	        } else {
	        	// update
	        	
	        }
	    } catch (Exception e) {
	    	msgDTO.setStatus(MsgDTO.STATUS_FAIL);
	    	msgDTO.setMessage(e.getMessage());
	    }
        return msgDTO;
    }
}
