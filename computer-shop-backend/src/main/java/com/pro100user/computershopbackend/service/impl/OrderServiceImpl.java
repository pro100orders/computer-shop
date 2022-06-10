package com.pro100user.computershopbackend.service.impl;

import com.pro100user.computershopbackend.dto.OrderCreateDTO;
import com.pro100user.computershopbackend.dto.OrderDTO;
import com.pro100user.computershopbackend.dto.OrderUpdateDTO;
import com.pro100user.computershopbackend.entity.Order;
import com.pro100user.computershopbackend.mapper.OrderMapper;
import com.pro100user.computershopbackend.repository.OrderRepository;
import com.pro100user.computershopbackend.service.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;

    @Override
    public OrderDTO create(OrderCreateDTO dto) {
        Order entity = orderMapper.toEntity(dto);
        return orderMapper.toOrderDTO(
                orderRepository.save(entity)
        );
    }

    @Override
    @Transactional(readOnly = true)
    public OrderDTO getById(Long orderId) {
        return orderMapper.toOrderDTO(
                orderRepository.findById(orderId).orElseThrow()
        );
    }

    @Override
    public OrderDTO update(OrderUpdateDTO dto) {
        Order entity = orderMapper.toEntity(dto);
        return orderMapper.toOrderDTO(
                orderRepository.save(entity)
        );
    }

    @Override
    public boolean delete(Long orderId) {
        orderRepository.deleteById(orderId);
        return true;
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderDTO> getAll() {
        return orderMapper.toOrderDTO(
                orderRepository.findAll()
        );
    }
}
