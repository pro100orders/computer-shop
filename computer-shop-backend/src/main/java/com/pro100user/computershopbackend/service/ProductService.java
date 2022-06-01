package com.pro100user.computershopbackend.service;

import com.pro100user.computershopbackend.dto.ProductCreateDTO;
import com.pro100user.computershopbackend.dto.ProductDTO;
import com.pro100user.computershopbackend.dto.ProductUpdateDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductService {

    ProductDTO create(ProductCreateDTO dto);
    ProductDTO getById(Long productId);
    ProductDTO update(ProductUpdateDTO dto);
    boolean delete(Long productId);
    List<ProductDTO> getAll();

    ProductDTO setPhoto(MultipartFile file, Long productId);

    long getCount();
}
