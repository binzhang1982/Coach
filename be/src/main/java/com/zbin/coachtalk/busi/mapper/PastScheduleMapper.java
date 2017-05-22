package com.zbin.coachtalk.busi.mapper;

import com.zbin.coachtalk.busi.entity.PastSchedule;
import com.zbin.coachtalk.busi.entity.PastScheduleExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface PastScheduleMapper {
    int countByExample(PastScheduleExample example);

    int deleteByExample(PastScheduleExample example);

    int insert(PastSchedule record);

    int insertSelective(PastSchedule record);

    List<PastSchedule> selectByExample(PastScheduleExample example);

    int updateByExampleSelective(@Param("record") PastSchedule record, @Param("example") PastScheduleExample example);

    int updateByExample(@Param("record") PastSchedule record, @Param("example") PastScheduleExample example);
}