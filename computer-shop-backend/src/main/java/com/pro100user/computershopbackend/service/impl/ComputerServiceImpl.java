package com.pro100user.computershopbackend.service.impl;

import com.pro100user.computershopbackend.dto.ComputerCreateDTO;
import com.pro100user.computershopbackend.dto.ComputerDTO;
import com.pro100user.computershopbackend.dto.ComputerUpdateDTO;
import com.pro100user.computershopbackend.dto.ProductDTO;
import com.pro100user.computershopbackend.entity.Basket;
import com.pro100user.computershopbackend.entity.Computer;
import com.pro100user.computershopbackend.entity.Order;
import com.pro100user.computershopbackend.entity.Product;
import com.pro100user.computershopbackend.mapper.ComputerMapper;
import com.pro100user.computershopbackend.repository.BasketRepository;
import com.pro100user.computershopbackend.repository.ComputerRepository;
import com.pro100user.computershopbackend.repository.OrderRepository;
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

    private final BasketRepository basketRepository;
    private final OrderRepository orderRepository;

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
        Computer computer = computerRepository.findById(computerId).orElseThrow();
        for(Basket basket : computer.getBaskets()) {
            basket.getProducts().remove(computer);
            basket.setTotalPrice(basket.getTotalPrice() - computer.getPrice());
            basketRepository.save(basket);
        }
        for(Order order : computer.getOrders()) {
            order.getProducts().remove(computer);
            order.setTotalPrice(order.getTotalPrice() - computer.getPrice());
            orderRepository.save(order);
        }
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
