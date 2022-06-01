package com.pro100user.computershopbackend.service;

import com.pro100user.computershopbackend.dto.*;

import java.util.List;

public interface OrderService {

    OrderDTO create(OrderCreateDTO dto);
    OrderDTO getById(Long orderId);
    OrderDTO update(OrderUpdateDTO dto);
    boolean delete(Long orderId);
    List<OrderDTO> getAll();
}
