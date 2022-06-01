package com.pro100user.computershopbackend.controller;

import com.pro100user.computershopbackend.service.LaptopService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("laptops")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class LaptopController {

    //private final LaptopService laptopService;
}
