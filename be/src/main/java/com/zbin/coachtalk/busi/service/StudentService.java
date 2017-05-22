package com.zbin.coachtalk.busi.service;

import com.zbin.coachtalk.busi.entity.LoginStatus;
import com.zbin.coachtalk.busi.entity.StudentInfo;

public interface StudentService {
	LoginStatus insertStudent(StudentInfo student);
}
