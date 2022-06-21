package com.pro100user.computershopbackend.controller;

import com.pro100user.computershopbackend.dto.OrderDTO;
import com.pro100user.computershopbackend.dto.OrderUpdateDTO;
import com.pro100user.computershopbackend.dto.ProductDTO;
import com.pro100user.computershopbackend.entity.enums.Status;
import com.pro100user.computershopbackend.mapper.ProductMapper;
import com.pro100user.computershopbackend.service.OrderService;
import com.pro100user.computershopbackend.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.lang.reflect.Array;
import java.sql.Statement;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("admin")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class AdminController {

    private final OrderService orderService;
    private final ProductService productService;

    @GetMapping("/orders")
    public List<OrderDTO> orders() {
        return orderService.getAll().stream()
                .sorted(Comparator.comparing(OrderDTO::getCreatedAt).reversed())
                .toList();
    }

    @PutMapping("/orders")
    public OrderDTO orders(
            @Valid @RequestBody OrderUpdateDTO dto
    ) {
        return orderService.update(dto);
    }

    @DeleteMapping("/orders/{id}")
    public boolean deleteOrder(
            @PathVariable("id") Long id
    ) {
        return orderService.delete(id);
    }

    @GetMapping("/order-statuses")
    public List<String> statuses() {
        return Arrays.stream(Status.values())
                .map(Enum::name)
                .toList();
    }

    @GetMapping("/reporting/{report}")
    public List<ProductDTO> reporting(@PathVariable("report") Long report) {
        return productService.reporting(report);
    }
}
