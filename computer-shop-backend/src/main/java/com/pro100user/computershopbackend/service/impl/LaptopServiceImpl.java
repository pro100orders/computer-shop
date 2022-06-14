package com.pro100user.computershopbackend.service.impl;

import com.pro100user.computershopbackend.dto.LaptopCreateDTO;
import com.pro100user.computershopbackend.dto.LaptopDTO;
import com.pro100user.computershopbackend.dto.LaptopUpdateDTO;
import com.pro100user.computershopbackend.entity.Laptop;
import com.pro100user.computershopbackend.mapper.LaptopMapper;
import com.pro100user.computershopbackend.repository.BasketRepository;
import com.pro100user.computershopbackend.repository.LaptopRepository;
import com.pro100user.computershopbackend.repository.OrderRepository;
import com.pro100user.computershopbackend.service.ImageService;
import com.pro100user.computershopbackend.service.LaptopService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class LaptopServiceImpl implements LaptopService {

    private final LaptopRepository laptopRepository;
    private final LaptopMapper laptopMapper;

    private final ImageService imageService;

    @Override
    public LaptopDTO create(LaptopCreateDTO dto) {
        Laptop entity = laptopMapper.toEntity(dto);
        return laptopMapper.toLaptopDTO(
                laptopRepository.save(entity)
        );
    }

    @Override
    public LaptopDTO getById(Long computerId) {
        return laptopMapper.toLaptopDTO(
                laptopRepository.findById(computerId).orElseThrow()
        );
    }

    @Override
    public LaptopDTO update(LaptopUpdateDTO dto) {
        Laptop entity = laptopMapper.toEntity(dto);
        return laptopMapper.toLaptopDTO(
                laptopRepository.save(entity)
        );
    }

    @Override
    public boolean delete(Long computerId) {
        Laptop computer = laptopRepository.findById(computerId).orElseThrow();
        if(!computer.getBaskets().isEmpty() || !computer.getOrders().isEmpty()) {
            throw new IllegalArgumentException("Видалення не доступне, так як цей об'єкт використовується!");
        }
        laptopRepository.deleteById(computerId);
        return true;
    }

    @Override
    public List<LaptopDTO> getAll() {
        return laptopMapper.toLaptopDTO(
                laptopRepository.findAll()
        );
    }

    @Override
    public LaptopDTO setPhoto(MultipartFile file, Long computerId) {
        Laptop entity = laptopRepository.findById(computerId).orElseThrow();
        entity.setImage(imageService.save(file, computerId));
        return laptopMapper.toLaptopDTO(
                laptopRepository.save(entity)
        );
    }


    @Override
    @Transactional(readOnly = true)
    public long getCount() {
        return laptopRepository.getCount();
    }
}
