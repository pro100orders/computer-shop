package com.pro100user.computershopbackend.mapper;

import com.pro100user.computershopbackend.dto.UserCreateDTO;
import com.pro100user.computershopbackend.dto.UserDTO;
import com.pro100user.computershopbackend.dto.UserUpdateDTO;
import com.pro100user.computershopbackend.entity.User;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {

    User toEntity(UserCreateDTO dto);
    User toEntity(UserUpdateDTO dto);

    UserDTO toUserDTO(User user);
    List<UserDTO> toListUserDTO(List<User> users);
}
