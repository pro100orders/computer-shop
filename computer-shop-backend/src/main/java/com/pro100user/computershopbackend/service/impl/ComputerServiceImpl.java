package com.pro100user.computershopbackend.service.impl;

import com.pro100user.computershopbackend.dto.ComputerCreateDTO;
import com.pro100user.computershopbackend.dto.ComputerDTO;
import com.pro100user.computershopbackend.dto.ComputerUpdateDTO;
import com.pro100user.computershopbackend.dto.ProductDTO;
import com.pro100user.computershopbackend.entity.Computer;
import com.pro100user.computershopbackend.entity.Product;
import com.pro100user.computershopbackend.mapper.ComputerMapper;
import com.pro100user.computershopbackend.repository.ComputerRepository;
import com.pro100user.computershopbackend.service.ComputerService;
import com.pro100user.computershopbackend.service.ImageService;
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
public class ComputerServiceImpl implements ComputerService {

    private final ComputerRepository computerRepository;
    private final ComputerMapper computerMapper;

    private final ImageService imageService;

    @Override
    public ComputerDTO create(ComputerCreateDTO dto) {
        Computer entity = computerMapper.toEntity(dto);
        return computerMapper.toComputerDTO(
                computerRepository.save(entity)
        );
    }

    @Override
    public ComputerDTO getById(Long computerId) {
        return computerMapper.toComputerDTO(
                computerRepository.findById(computerId).orElseThrow()
        );
    }

    @Override
    public ComputerDTO update(ComputerUpdateDTO dto) {
        Computer entity = computerMapper.toEntity(dto);
        return computerMapper.toComputerDTO(
                computerRepository.save(entity)
        );
    }

    @Override
    public boolean delete(Long computerId) {
        computerRepository.deleteById(computerId);
        return true;
    }

    @Override
    public List<ComputerDTO> getAll() {
        return computerMapper.toComputerDTO(
                computerRepository.findAll()
        );
    }

    @Override
    public ComputerDTO setPhoto(MultipartFile file, Long computerId) {
        Computer entity = computerRepository.findById(computerId).orElseThrow();
        entity.setImage(imageService.save(file, computerId));
        return computerMapper.toComputerDTO(
                computerRepository.save(entity)
        );
    }


    @Override
    @Transactional(readOnly = true)
    public long getCount() {
        return computerRepository.getCount();
    }
}
