package com.zbin.coachtalk.busi.entity;

public class LoginStatus {
	private Boolean isCoach = false;
	private Boolean isStudent = false;
	private Boolean isAdmin = false;
	private Boolean loggedIn = false;
	private String token;
	public Boolean getIsCoach() {
		return isCoach;
	}
	public void setIsCoach(Boolean isCoach) {
		this.isCoach = isCoach;
	}
	public Boolean getIsStudent() {
		return isStudent;
	}
	public void setIsStudent(Boolean isStudent) {
		this.isStudent = isStudent;
	}
	public Boolean getIsAdmin() {
		return isAdmin;
	}
	public void setIsAdmin(Boolean isAdmin) {
		this.isAdmin = isAdmin;
	}
	public Boolean getLoggedIn() {
		return loggedIn;
	}
	public void setLoggedIn(Boolean loggedIn) {
		this.loggedIn = loggedIn;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	
}
