package com.pro100user.computershopbackend.controller;

import com.pro100user.computershopbackend.dto.LaptopCreateDTO;
import com.pro100user.computershopbackend.dto.LaptopDTO;
import com.pro100user.computershopbackend.dto.LaptopUpdateDTO;
import com.pro100user.computershopbackend.entity.enums.DriveType;
import com.pro100user.computershopbackend.entity.enums.RAMTypes;
import com.pro100user.computershopbackend.entity.enums.TypeVideoCard;
import com.pro100user.computershopbackend.entity.enums.VideoCardTypeMemory;
import com.pro100user.computershopbackend.service.LaptopService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("laptops")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class LaptopController {

    private final LaptopService laptopService;

    @GetMapping
    public List<LaptopDTO> computers() {
        return laptopService.getAll();
    }

    @GetMapping("{id}")
    public LaptopDTO details(
            @PathVariable("id") Long id
    ) {
        return laptopService.getById(id);
    }

    @PostMapping
    public LaptopDTO create(
            @RequestBody LaptopCreateDTO dto
    ) {
        return laptopService.create(dto);
    }

    @PutMapping
    public LaptopDTO update(
            @RequestBody LaptopUpdateDTO dto
    ) {
        return laptopService.update(dto);
    }

    @DeleteMapping("{id}")
    public boolean delete(
            @PathVariable("id") Long id
    ) {
        return laptopService.delete(id);
    }


    @PostMapping("image/{id}")
    public LaptopDTO setPhoto(
            @RequestParam("image") MultipartFile file,
            @PathVariable("id") Long productId
    ) {
        return laptopService.setPhoto(file, productId);
    }

    @GetMapping("count")
    public Map<String, Long> getCount() {
        return Map.of("count", laptopService.getCount());
    }


    @GetMapping("video-card-types")
    public List<String> videoCardTypes() {
        return Arrays.stream(TypeVideoCard.values())
                .map(TypeVideoCard::name)
                .toList();
    }

    @GetMapping("video-card-type-memories")
    public List<String> videoCardTypeMemoryie() {
        return Arrays.stream(VideoCardTypeMemory.values())
                .map(VideoCardTypeMemory::name)
                .toList();
    }

    @GetMapping("ram-types")
    public List<String> RAMTypes() {
        return Arrays.stream(RAMTypes.values())
                .map(RAMTypes::name)
                .toList();
    }

    @GetMapping("drive-types")
    public List<String> driveTypes() {
        return Arrays.stream(DriveType.values())
                .map(DriveType::name)
                .toList();
    }
}
