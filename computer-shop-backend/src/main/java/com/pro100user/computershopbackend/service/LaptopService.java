package com.pro100user.computershopbackend.service;

import com.pro100user.computershopbackend.dto.LaptopCreateDTO;
import com.pro100user.computershopbackend.dto.LaptopDTO;
import com.pro100user.computershopbackend.dto.LaptopUpdateDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface LaptopService {

    LaptopDTO create(LaptopCreateDTO dto);
    LaptopDTO getById(Long computerId);
    LaptopDTO update(LaptopUpdateDTO dto);
    boolean delete(Long computerId);
    List<LaptopDTO> getAll();

    LaptopDTO setPhoto(MultipartFile file, Long computerId);

    long getCount();
}
