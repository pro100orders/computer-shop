package com.pro100user.computershopbackend.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.validation.constraints.Min;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class OrderCreateDTO {

    @JsonIgnore
    private Long userId;

    @Min(value = 0, message = "Product id cannot be less than 0")
    private Long productId;
}
