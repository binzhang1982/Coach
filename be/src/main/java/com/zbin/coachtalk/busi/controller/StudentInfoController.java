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
import com.zbin.coachtalk.busi.entity.StudentInfo;
import com.zbin.coachtalk.busi.service.StudentService;

@CrossOrigin(maxAge = 3600)
@Controller
@RequestMapping("api/student")
public class StudentInfoController {

	@Autowired
	private StudentService studentService;

    @RequestMapping(value = "own_list", method = {RequestMethod.GET})
    public @ResponseBody MsgDTO getOwnStudentList(@Param("token") String token) {
        MsgDTO msgDTO = new MsgDTO();
        try {
	        msgDTO.setStatus(MsgDTO.STATUS_OK);
	        msgDTO.setData(studentService.getOwnStudentList(token));
	    } catch (Exception e) {
	    	msgDTO.setStatus(MsgDTO.STATUS_FAIL);
	    	msgDTO.setMessage(e.getMessage());
	    }
        return msgDTO;
    }
	
    /**
     * 学员注册或更新
     * @param id
     * @param maps
     * @return
     */
    @RequestMapping(value = "save_student", method = {RequestMethod.POST})
    public @ResponseBody MsgDTO saveStudent(@Param("token") String token, 
    		@RequestBody StudentInfo student) {
        MsgDTO msgDTO = new MsgDTO();
        try {
	        msgDTO.setStatus(MsgDTO.STATUS_OK);
	        if (token == null) {
	        	// new
	        	msgDTO.setData(studentService.insertStudent(student));
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
