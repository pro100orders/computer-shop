package com.pro100user.computershopbackend.dto;

import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder(toBuilder = true)
public class ProductUpdateDTO {

    protected Long id;

    protected String name;

    protected double price;

    protected int amount;

    protected String description;

    protected String additionally;
}
