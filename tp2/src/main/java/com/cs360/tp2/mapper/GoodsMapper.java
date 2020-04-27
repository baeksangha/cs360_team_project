package com.cs360.tp2.mapper;

import com.cs360.tp2.model.Goods;
import com.cs360.tp2.model.Sell;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface GoodsMapper {

    @Select("select * from sell")
    List<Sell> finaAll();

    @Select("SELECT * FROM GOODS WHERE GNAME=#{input}")
    List<Goods> findGoods(String input);
}
