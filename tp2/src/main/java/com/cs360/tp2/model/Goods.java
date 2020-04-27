package com.cs360.tp2.model;

import lombok.Data;

@Data
public class Goods {
    private int gid;
    private String gname;
    private String manufacturer;
    private int division_number;
    private double goods_avg_cost;
}
