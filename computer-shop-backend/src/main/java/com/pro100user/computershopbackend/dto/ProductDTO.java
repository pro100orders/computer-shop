package com.pro100user.computershopbackend.dto;

import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder(toBuilder = true)
public class ProductDTO {

    protected Long id;

    protected String name;

    protected String image;

    protected double price;

    protected int amount;

    protected String description;

    protected String additionally;
}
