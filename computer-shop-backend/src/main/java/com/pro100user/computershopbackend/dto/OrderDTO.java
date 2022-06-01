package com.pro100user.computershopbackend.dto;

import com.pro100user.computershopbackend.entity.enums.Status;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
public class OrderDTO {

    private Long id;

    private UserDTO user;

    private List<ProductDTO> products;

    private double totalPrice;

    private Status status;

    private LocalDateTime createdAt;
}
