package com.pro100user.computershopbackend.mapper;

import com.pro100user.computershopbackend.dto.OrderCreateDTO;
import com.pro100user.computershopbackend.dto.OrderDTO;
import com.pro100user.computershopbackend.dto.OrderUpdateDTO;
import com.pro100user.computershopbackend.entity.Order;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;


@Mapper(uses = {UserMapper.class, ProductMapper.class})
public interface OrderMapper {

    /*@Mappings({
            @Mapping(source = "userId", target = "user.id"),
            @Mapping(source = "productId", target = "product.id")
    })*/
    Order toEntity(OrderCreateDTO dto);
    /*@Mappings({
            @Mapping(source = "userId", target = "user.id"),
            @Mapping(source = "productId", target = "product.id")
    })*/
    Order toEntity(OrderUpdateDTO dto);


    OrderDTO toOrderDTO(Order order);
    List<OrderDTO> toOrderDTO(List<Order> orders);
}
