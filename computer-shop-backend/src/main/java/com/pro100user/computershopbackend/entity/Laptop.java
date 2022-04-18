package com.pro100user.computershopbackend.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Getter
@Setter
@Entity
@Table(name = "laptops")
public class Laptop extends Product {

    @Column(name = "processor", nullable = false)
    protected String processor;
}
