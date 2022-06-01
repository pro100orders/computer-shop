package com.pro100user.computershopbackend.entity;

import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "products")
@SuperBuilder(toBuilder = true)
@Inheritance(strategy = InheritanceType.JOINED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Product implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false, nullable = false)//id
    protected Long id;

    @Column(name = "name", nullable = false)//назва
    protected String name;

    @Column(name = "image")
    protected String image;

    @Column(name = "price", nullable = false)//ціна
    protected double price;

    @Column(name = "amount", nullable = false)//кількість
    protected int amount;

    @Column(name = "description")//Опис
    protected String description;

    @Column(name = "additionally")//Додатково
    protected String additionally;


    @ManyToMany(mappedBy = "products", fetch = FetchType.LAZY, targetEntity = Basket.class)
    protected List<Basket> baskets = new ArrayList<>();

    @ManyToMany(mappedBy = "products", fetch = FetchType.LAZY, targetEntity = Order.class)
    protected List<Order> orders = new ArrayList<>();

    @ManyToMany(mappedBy = "wishList", fetch = FetchType.LAZY, targetEntity = User.class)
    protected List<User> users = new ArrayList<>();
}

