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
import com.zbin.coachtalk.busi.service.MainService;

@CrossOrigin(maxAge = 3600)
@Controller
@RequestMapping("api/main")
public class MainController {
	
	@Autowired
	private MainService mainService;

    @RequestMapping(value = "login", method = {RequestMethod.POST})
    public @ResponseBody MsgDTO login(@RequestBody CoachInfo user) {
        MsgDTO msgDTO = new MsgDTO();
        try {
	        msgDTO.setStatus(MsgDTO.STATUS_OK);
        	msgDTO.setData(mainService.login(user));
	    } catch (Exception e) {
	    	msgDTO.setStatus(MsgDTO.STATUS_FAIL);
	    	msgDTO.setMessage(e.getMessage());
	    }
        return msgDTO;
    }
}
