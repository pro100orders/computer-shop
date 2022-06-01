package com.pro100user.computershopbackend.service;

import com.pro100user.computershopbackend.dto.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ComputerService {

    ComputerDTO create(ComputerCreateDTO dto);
    ComputerDTO getById(Long computerId);
    ComputerDTO update(ComputerUpdateDTO dto);
    boolean delete(Long computerId);
    List<ComputerDTO> getAll();

    ComputerDTO setPhoto(MultipartFile file, Long computerId);

    long getCount();
}
