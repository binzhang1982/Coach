package com.zbin.coachtalk.busi.service;

import java.util.List;

import com.zbin.coachtalk.busi.entity.LoginStatus;
import com.zbin.coachtalk.busi.entity.StudentInfo;

public interface StudentService {
	LoginStatus insertStudent(StudentInfo student);
	
	List<StudentInfo> getOwnStudentList(String token);
}
