package com.pro100user.computershopbackend.repository;

import com.pro100user.computershopbackend.entity.Computer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ComputerRepository extends JpaRepository<Computer, Long> {

    @Query(value = "SELECT COUNT(*) FROM computers", nativeQuery = true)
    long getCount();
}
