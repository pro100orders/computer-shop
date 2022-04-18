package com.pro100user.computershopbackend.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Getter
@Setter
@Entity
@Table(name = "monitor")
public class Monitor extends Product {

    @Column(name = "diagonal", nullable = false)
    protected String diagonal;
}
