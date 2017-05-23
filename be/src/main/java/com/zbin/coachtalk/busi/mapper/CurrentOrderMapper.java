package com.zbin.coachtalk.busi.mapper;

import com.zbin.coachtalk.busi.entity.CurrentOrder;
import com.zbin.coachtalk.busi.entity.CurrentOrderExample;
import com.zbin.coachtalk.busi.entity.CurrentOrderKey;

import java.util.List;

import org.apache.ibatis.annotations.Param;

public interface CurrentOrderMapper {
    int countByExample(CurrentOrderExample example);

    int deleteByExample(CurrentOrderExample example);

    int deleteByPrimaryKey(CurrentOrderKey key);

    int insert(CurrentOrder record);

    int insertSelective(CurrentOrder record);

    List<CurrentOrder> selectByExample(CurrentOrderExample example);

    CurrentOrder selectByPrimaryKey(CurrentOrderKey key);

    int updateByExampleSelective(@Param("record") CurrentOrder record, @Param("example") CurrentOrderExample example);

    int updateByExample(@Param("record") CurrentOrder record, @Param("example") CurrentOrderExample example);

    int updateByPrimaryKeySelective(CurrentOrder record);

    int updateByPrimaryKey(CurrentOrder record);
}