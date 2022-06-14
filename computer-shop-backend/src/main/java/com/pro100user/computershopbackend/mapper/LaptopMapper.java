package com.pro100user.computershopbackend.mapper;

import com.pro100user.computershopbackend.dto.LaptopCreateDTO;
import com.pro100user.computershopbackend.dto.LaptopDTO;
import com.pro100user.computershopbackend.dto.LaptopUpdateDTO;
import com.pro100user.computershopbackend.entity.Laptop;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(uses = {ProductMapper.class})
public interface LaptopMapper {

    Laptop toEntity(LaptopCreateDTO dto);
    Laptop toEntity(LaptopUpdateDTO dto);

    LaptopDTO toLaptopDTO(Laptop laptop);
    List<LaptopDTO> toLaptopDTO(List<Laptop> laptops);
}
