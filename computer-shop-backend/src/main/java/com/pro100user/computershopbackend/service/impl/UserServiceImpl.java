package com.pro100user.computershopbackend.service.impl;

import com.pro100user.computershopbackend.dto.*;
import com.pro100user.computershopbackend.entity.Basket;
import com.pro100user.computershopbackend.entity.Order;
import com.pro100user.computershopbackend.entity.Product;
import com.pro100user.computershopbackend.entity.User;
import com.pro100user.computershopbackend.entity.enums.Role;
import com.pro100user.computershopbackend.entity.enums.Status;
import com.pro100user.computershopbackend.mapper.OrderMapper;
import com.pro100user.computershopbackend.mapper.ProductMapper;
import com.pro100user.computershopbackend.mapper.UserMapper;
import com.pro100user.computershopbackend.repository.BasketRepository;
import com.pro100user.computershopbackend.repository.OrderRepository;
import com.pro100user.computershopbackend.repository.ProductRepository;
import com.pro100user.computershopbackend.repository.UserRepository;
import com.pro100user.computershopbackend.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    private final BasketRepository basketRepository;
    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;

    private final PasswordEncoder passwordEncoder;

    @Override
    public boolean create(UserCreateDTO dto) {
        if(findByEmail(dto.getEmail()) != null) {
            throw new IllegalArgumentException("Ця пошта вже зайнята");
        }
        if(findByPhone(dto.getPhone()) != null) {
            throw new IllegalArgumentException("Цей номер вже зайнятий");
        }
        User entity = userMapper.toEntity(dto);
        entity.setRoles(List.of(Role.ROLE_USER));
        entity.setPassword(passwordEncoder.encode(entity.getPassword()));
        entity.setEnabled(true);
        userRepository.save(entity);
        return true;
    }

    @Override
    @Transactional(readOnly = true)
    public UserDTO getById(Long userId) {
        return userMapper.toUserDTO(
                userRepository.findById(userId).orElseThrow()
        );
    }

    @Override
    public UserDTO update(UserUpdateDTO dto) {
        User entity = userMapper.toEntity(dto);
        User user = userRepository.findById(entity.getId()).orElseThrow();

        if(!user.getEmail().equals(entity.getEmail()) && findByEmail(dto.getEmail()) != null) {
            throw new IllegalArgumentException("Ця пошта вже зайнята");
        }
        if(!user.getPhone().equals(entity.getPhone()) && findByPhone(dto.getPhone()) != null) {
            throw new IllegalArgumentException("Цей номер вже зайнятий");
        }
        if(dto.getNewPassword() != null) {
            if(passwordEncoder.matches(user.getPassword(), entity.getPassword())){
                entity.setPassword(passwordEncoder.encode(dto.getNewPassword()));
            }
        }
        return userMapper.toUserDTO(
                userRepository.save(entity)
        );
    }

    @Override
    public boolean delete(Long userId) {
        User entity = userRepository.findById(userId).orElseThrow();
        entity.setEnabled(false);
        userRepository.save(entity);
        return true;
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserDTO> getAll() {
        return userMapper.toListUserDTO(
                userRepository.findAll()
        );
    }


    @Override
    @Transactional(readOnly = true)
    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    @Override
    @Transactional(readOnly = true)
    public User findByPhone(String phone) {
        return userRepository.findByPhone(phone).orElse(null);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductDTO> getBasket(Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return productMapper.toProductDTO(
                user.getBasket() == null ? new ArrayList<>() : user.getBasket().getProducts()
        );
    }

    @Override
    public ProductDTO toggleBasket(Long userId, Long productId) {
        Product product = productRepository.findById(productId).orElseThrow();
        User user = userRepository.findById(userId).orElseThrow();
        if(user.getBasket() == null) {
            Basket basket = new Basket();
            basket.setUser(user);
            basket.setProducts(List.of(product));
            basket.setTotalPrice(product.getPrice());
            basketRepository.save(basket);
        }
        else {
            Basket basket = user.getBasket();
            if(basket.getProducts().contains(product)) {
                basket.getProducts().remove(product);
                basket.setTotalPrice(basket.getTotalPrice() - product.getPrice());
            }
            else {
                basket.getProducts().add(product);
                basket.setTotalPrice(basket.getTotalPrice() + product.getPrice());
            }
            basketRepository.save(basket);
        }
        return productMapper.toProductDTO(product);
    }

    @Override
    public List<OrderDTO> getOrders(Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return orderMapper.toOrderDTO(
                user.getOrders()
        );
    }

    @Override
    public boolean toOrder(Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        if(user.getBasket() == null || user.getBasket().getProducts().isEmpty()) {
            return false;
        }
        Order order = Order.builder()
                .user(user)
                .products(user.getBasket().getProducts())
                .totalPrice(user.getBasket().getTotalPrice())
                .status(Status.Оформлено)
                .build();
        orderRepository.save(order);
        user.getBasket().setProducts(new ArrayList<>());
        user.getBasket().setTotalPrice(0);
        basketRepository.save(user.getBasket());
        return true;
    }
}
