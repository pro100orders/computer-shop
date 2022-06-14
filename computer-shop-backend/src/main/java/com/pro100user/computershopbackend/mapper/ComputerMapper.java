package com.pro100user.computershopbackend.mapper;

import com.pro100user.computershopbackend.dto.ComputerCreateDTO;
import com.pro100user.computershopbackend.dto.ComputerDTO;
import com.pro100user.computershopbackend.dto.ComputerUpdateDTO;
import com.pro100user.computershopbackend.entity.Computer;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(uses = {ProductMapper.class})
public interface ComputerMapper {

    Computer toEntity(ComputerCreateDTO dto);
    Computer toEntity(ComputerUpdateDTO dto);

    ComputerDTO toComputerDTO(Computer computer);
    List<ComputerDTO> toComputerDTO(List<Computer> computers);
}
