package com.pro100user.computershopbackend.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.pro100user.computershopbackend.entity.enums.Status;
import lombok.*;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class OrderUpdateDTO {

    @Min(value = 0, message = "Order id cannot be less than 0")
    private Long id;

    @JsonIgnore
    private Long userId;

    @Min(value = 0, message = "Product id cannot be less than 0")
    private Long productId;

    @NotNull
    private Status status;
}
