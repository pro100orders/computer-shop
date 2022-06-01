package com.pro100user.computershopbackend.controller;

import com.pro100user.computershopbackend.dto.*;
import com.pro100user.computershopbackend.entity.enums.DriveType;
import com.pro100user.computershopbackend.entity.enums.RAMTypes;
import com.pro100user.computershopbackend.entity.enums.TypeVideoCard;
import com.pro100user.computershopbackend.entity.enums.VideoCardTypeMemory;
import com.pro100user.computershopbackend.service.ComputerService;
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
@RequestMapping("computers")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class ComputerController {

    private final ComputerService computerService;

    @GetMapping
    public List<ComputerDTO> computers() {
        return computerService.getAll();
    }

    @GetMapping("{id}")
    public ComputerDTO details(
            @PathVariable("id") Long id
    ) {
        return computerService.getById(id);
    }

    @PostMapping
    public ComputerDTO create(
            @RequestBody ComputerCreateDTO dto
    ) {
        return computerService.create(dto);
    }

    @PutMapping
    public ComputerDTO update(
            @RequestBody ComputerUpdateDTO dto
    ) {
        return computerService.update(dto);
    }

    @DeleteMapping("{id}")
    public boolean delete(
            @PathVariable("id") Long id
    ) {
        return computerService.delete(id);
    }


    @PostMapping("image/{id}")
    public ComputerDTO setPhoto(
            @RequestParam("image") MultipartFile file,
            @PathVariable("id") Long productId
    ) {
        return computerService.setPhoto(file, productId);
    }

    @GetMapping("count")
    public Map<String, Long> getCount() {
        return Map.of("count", computerService.getCount());
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
