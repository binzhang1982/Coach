package com.zbin.coachtalk.busi.controller;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.zbin.coachtalk.busi.dto.MsgDTO;
import com.zbin.coachtalk.busi.service.ParamInfoService;

@CrossOrigin(maxAge = 3600)
@Controller
@RequestMapping("api/param")
public class ParamInfoController {
	
	@Autowired
	private ParamInfoService paramInfoService;
	
    /**
     * 学员注册或更新
     * @param id
     * @param maps
     * @return
     */
    @RequestMapping(value = "list", method = {RequestMethod.GET})
    public @ResponseBody MsgDTO saveDiningDeskMapById(@Param("groupkey") Integer groupkey) {
        MsgDTO msgDTO = new MsgDTO();
        try {
	        msgDTO.setStatus(MsgDTO.STATUS_OK);
	        msgDTO.setData(paramInfoService.getParamInfoList(groupkey));
	    } catch (Exception e) {
	    	msgDTO.setStatus(MsgDTO.STATUS_FAIL);
	    	msgDTO.setMessage(e.getMessage());
	    }
        return msgDTO;
    }
}
