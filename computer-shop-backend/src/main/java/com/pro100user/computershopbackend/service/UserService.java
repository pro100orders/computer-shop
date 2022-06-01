package com.pro100user.computershopbackend.service;

import com.pro100user.computershopbackend.dto.*;
import com.pro100user.computershopbackend.entity.Product;
import com.pro100user.computershopbackend.entity.User;

import java.util.List;

public interface UserService {

    boolean create(UserCreateDTO dto);
    UserDTO getById(Long userId);
    UserDTO update(UserUpdateDTO dto);
    boolean delete(Long userId);
    List<UserDTO> getAll();

    User findByEmail(String email);
    User findByPhone(String phone);

    List<ProductDTO> getBasket(Long userId);
    ProductDTO toggleBasket(Long userId, Long productId);
    List<OrderDTO> getOrders(Long userId);
    boolean toOrder(Long userId);
}
