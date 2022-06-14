package com.pro100user.computershopbackend.repository;

import com.pro100user.computershopbackend.entity.Laptop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface LaptopRepository extends JpaRepository<Laptop, Long> {

    @Query(value = "SELECT COUNT(*) FROM laptops", nativeQuery = true)
    long getCount();
}
