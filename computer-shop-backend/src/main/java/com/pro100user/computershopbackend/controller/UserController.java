package com.pro100user.computershopbackend.controller;

import com.pro100user.computershopbackend.annotation.CurrentUser;
import com.pro100user.computershopbackend.dto.OrderDTO;
import com.pro100user.computershopbackend.dto.ProductDTO;
import com.pro100user.computershopbackend.dto.UserDTO;
import com.pro100user.computershopbackend.dto.UserUpdateDTO;
import com.pro100user.computershopbackend.security.UserSecurity;
import com.pro100user.computershopbackend.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("user")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class UserController {

    private final UserService userService;

    @GetMapping("profile")
    public UserDTO profile(
            @CurrentUser UserSecurity userSecurity
    ) {
        return userService.getById(userSecurity.getId());
    }

    @PutMapping("profile")
    public UserDTO updateProfile(
            @Valid @RequestBody UserUpdateDTO dto,
            @CurrentUser UserSecurity userSecurity
    ) {
        dto.setId(userSecurity.getId());
        return userService.update(dto);
    }

    @DeleteMapping("profile")
    public boolean deleteProfile(
            @CurrentUser UserSecurity userSecurity
    ) {
        return userService.delete(userSecurity.getId());
    }


    @GetMapping("/basket")
    public List<ProductDTO> basket(
            @CurrentUser UserSecurity userSecurity
    ) {
        return userService.getBasket(userSecurity.getId());
    }

    @PostMapping("/basket")
    public ProductDTO toggleBasket(
            @CurrentUser UserSecurity userSecurity,
            @RequestBody Long bookId
    ) {
        return userService.toggleBasket(userSecurity.getId(), bookId);
    }

    @GetMapping("/orders")
    public List<OrderDTO> getOrders(
            @CurrentUser UserSecurity userSecurity
    ) {
        return userService.getOrders(userSecurity.getId());
    }

    @PostMapping("/orders")
    public boolean toOrder(
            @CurrentUser UserSecurity userSecurity
    ) {
        return userService.toOrder(userSecurity.getId());
    }
}
