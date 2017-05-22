package com.zbin.coachtalk.common.spring;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * 
 * Project Name: Venus <br/>
 * Package Name: com.venus.common.spring <br/>
 * ClassName: SpringUtil <br/>
 * Function: Spring 工具类，提供Spring配置文件的读取操作. <br/> 
 * Date: 2014-1-24 上午9:12:48 <br/> 
 * 
 * @version 
 * @author Walker mailto: zuwei.su@qq.com
 * @date 2014-1-24 上午9:12:48
 */
public class SpringUtil {
	public static ApplicationContext loadApplicationContext() {
		return loadApplicationContext("application*.xml");
	}
	
	public static ApplicationContext loadApplicationContext(String filePattern) {
		ApplicationContext ctx = new ClassPathXmlApplicationContext(new String[] { "classpath*:" + filePattern });
		return ctx;
	}
}
