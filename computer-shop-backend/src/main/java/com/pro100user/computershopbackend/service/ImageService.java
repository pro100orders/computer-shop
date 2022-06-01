package com.pro100user.computershopbackend.service;

import org.springframework.web.multipart.MultipartFile;

public interface ImageService {

    String save(MultipartFile file, Long productId);

    boolean update(String filepath, MultipartFile file);

    boolean delete(String filepath);
}
