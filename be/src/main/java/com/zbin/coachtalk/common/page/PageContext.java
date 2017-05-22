package com.zbin.coachtalk.common.page;

import java.util.HashMap;
import java.util.Map;

/**
 * 
 * 分页信息类
 * 
 * @author suzu
 * 
 */
public class PageContext {

	// 页码，从1开始
	private int page = 1;

	// 每页记录数
	private int pageSize = 10;

	// 第一条记录序号，从0开始，计算产生
	private int offset = 0;

	// 最后一条记录序号，从0开始，计算产生
//	private int lastRecord = 0;
	
	// 分页参数
	private Map<String, Object> params = new HashMap<String, Object>();
	
	// 排序条件
	private String sortClause = null;

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		if (page < 1)
			this.page = 1;
		else
			this.page = page;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		if (pageSize < 1)
			this.pageSize = 10;
		else
			this.pageSize = pageSize;
	}

	public int getOffset(){
		return offset;
	}
	
	public void setOffset(int offset) {
		this.offset = offset;
		if(this.offset < 0)
			this.offset = 0;
	}
	
//
//	public int getLastRecord() {
//		return page * pageSize - 1;
//	}

	public Map<String, Object> getParams() {
		return params;
	}

	public void setParams(Map<String, Object> params) {
		this.params = params;
	}

	public String getSortClause() {
		return sortClause;
	}

	public void setSortClause(String sortClause) {
		this.sortClause = sortClause;
	}


}
