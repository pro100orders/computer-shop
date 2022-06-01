package com.pro100user.computershopbackend.mapper;

import com.pro100user.computershopbackend.dto.ProductCreateDTO;
import com.pro100user.computershopbackend.dto.ProductDTO;
import com.pro100user.computershopbackend.dto.ProductUpdateDTO;
import com.pro100user.computershopbackend.entity.Product;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public interface ProductMapper {

    Product toEntity(ProductCreateDTO dto);
    Product toEntity(ProductUpdateDTO dto);

    ProductDTO toProductDTO(Product products);
    List<ProductDTO> toProductDTO(List<Product> products);
}
