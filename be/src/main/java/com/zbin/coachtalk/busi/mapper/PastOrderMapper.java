package com.zbin.coachtalk.busi.mapper;

import com.zbin.coachtalk.busi.entity.PastOrder;
import com.zbin.coachtalk.busi.entity.PastOrderExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface PastOrderMapper {
    int countByExample(PastOrderExample example);

    int deleteByExample(PastOrderExample example);

    int insert(PastOrder record);

    int insertSelective(PastOrder record);

    List<PastOrder> selectByExample(PastOrderExample example);

    int updateByExampleSelective(@Param("record") PastOrder record, @Param("example") PastOrderExample example);

    int updateByExample(@Param("record") PastOrder record, @Param("example") PastOrderExample example);
}