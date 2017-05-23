package com.zbin.coachtalk.busi.mapper;

import com.zbin.coachtalk.busi.entity.CurrentSchedule;
import com.zbin.coachtalk.busi.entity.CurrentScheduleExample;
import com.zbin.coachtalk.busi.entity.CurrentScheduleKey;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

public interface CurrentScheduleMapper {
    int countByExample(CurrentScheduleExample example);

    int deleteByExample(CurrentScheduleExample example);

    int deleteByPrimaryKey(CurrentScheduleKey key);

    int insert(CurrentSchedule record);

    int insertSelective(CurrentSchedule record);

    List<CurrentSchedule> selectByExample(CurrentScheduleExample example);

    CurrentSchedule selectByPrimaryKey(CurrentScheduleKey key);

    int updateByExampleSelective(@Param("record") CurrentSchedule record, @Param("example") CurrentScheduleExample example);

    int updateByExample(@Param("record") CurrentSchedule record, @Param("example") CurrentScheduleExample example);

    int updateByPrimaryKeySelective(CurrentSchedule record);

    int updateByPrimaryKey(CurrentSchedule record);
    
    List<CurrentSchedule> getCoachScheduleList(Map<String, Object> params);
}