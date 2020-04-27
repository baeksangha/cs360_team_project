package com.cs360.tp2.Controller;

import com.cs360.tp2.mapper.GoodsMapper;
import com.cs360.tp2.model.Goods;
import com.cs360.tp2.model.Input;
import com.cs360.tp2.model.Sell;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
public class WebController {

    Input input = new Input();

    @Autowired
    private GoodsMapper goodsMapper ;

    @PostMapping(value = "/input")
    public Input postInput(@RequestBody Input input) {
        this.input = input;
        return input;
    }

    @GetMapping(value = "/result/gname")
    public List<Goods> getGnameResult() {
        String input_str = input.getInput_str();
        List<Goods> ret = goodsMapper.findGoods(input_str);
        System.out.println(ret);
        return ret;
        //return goodsMapper.findGoods(input_str);
    }
}
