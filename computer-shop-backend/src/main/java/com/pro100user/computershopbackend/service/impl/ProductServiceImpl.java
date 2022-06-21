package com.pro100user.computershopbackend.service.impl;

import com.pro100user.computershopbackend.dto.ProductCreateDTO;
import com.pro100user.computershopbackend.dto.ProductDTO;
import com.pro100user.computershopbackend.dto.ProductUpdateDTO;
import com.pro100user.computershopbackend.entity.Product;
import com.pro100user.computershopbackend.mapper.ProductMapper;
import com.pro100user.computershopbackend.repository.ProductRepository;
import com.pro100user.computershopbackend.service.ImageService;
import com.pro100user.computershopbackend.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    private final ImageService imageService;

    @Override
    public ProductDTO create(ProductCreateDTO dto) {
        Product entity = productMapper.toEntity(dto);
        return productMapper.toProductDTO(
                productRepository.save(entity)
        );
    }

    @Override
    public ProductDTO getById(Long productId) {
        return productMapper.toProductDTO(
                productRepository.findById(productId).orElseThrow()
        );
    }

    @Override
    public ProductDTO update(ProductUpdateDTO dto) {
        Product entity = productMapper.toEntity(dto);
        return productMapper.toProductDTO(
                productRepository.save(entity)
        );
    }

    @Override
    public boolean delete(Long bookId) {
        productRepository.deleteById(bookId);
        return true;
    }

    @Override
    public List<ProductDTO> getAll() {
        return productMapper.toProductDTO(
                productRepository.findAll()
        );
    }

    @Override
    public ProductDTO setPhoto(MultipartFile file, Long productId) {
        Product entity = productRepository.findById(productId).orElseThrow();
        entity.setImage(imageService.save(file, productId));
        return productMapper.toProductDTO(
                productRepository.save(entity)
        );
    }


    @Override
    @Transactional(readOnly = true)
    public long getCount() {
        return productRepository.getCount();
    }

    @Override
    public List<ProductDTO> reporting(Long report) {
        List<Product> products = productRepository.findAll();
        if(report == 1) {
            products = products.stream().sorted(Comparator.comparingInt(o -> -o.getOrders().size())).toList();
        }
        else if(report == 2) {
            products = products.stream().sorted(Comparator.comparingInt(o -> o.getOrders().size())).toList();
        }
        else if(report == 3) {
            products = products.stream().sorted(Comparator.comparing(Product::getPrice).reversed()).toList();
        }
        else if(report == 4) {
            products = products.stream().sorted(Comparator.comparing(Product::getPrice)).toList();
        }
        else if(report == 5) {
            products = products.stream().sorted(Comparator.comparing(Product::getAmount)).toList();
        }
        return productMapper.toProductDTO(
                products
        );
    }
}
