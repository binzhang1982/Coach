package com.zbin.coachtalk.busi.mapper;

import com.zbin.coachtalk.busi.entity.ParamInfo;
import com.zbin.coachtalk.busi.entity.ParamInfoExample;
import com.zbin.coachtalk.busi.entity.ParamInfoKey;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface ParamInfoMapper {
    int countByExample(ParamInfoExample example);

    int deleteByExample(ParamInfoExample example);

    int deleteByPrimaryKey(ParamInfoKey key);

    int insert(ParamInfo record);

    int insertSelective(ParamInfo record);

    List<ParamInfo> selectByExample(ParamInfoExample example);

    ParamInfo selectByPrimaryKey(ParamInfoKey key);

    int updateByExampleSelective(@Param("record") ParamInfo record, @Param("example") ParamInfoExample example);

    int updateByExample(@Param("record") ParamInfo record, @Param("example") ParamInfoExample example);

    int updateByPrimaryKeySelective(ParamInfo record);

    int updateByPrimaryKey(ParamInfo record);
}