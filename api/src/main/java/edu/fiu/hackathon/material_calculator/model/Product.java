package edu.fiu.hackathon.material_calculator.model;

import jakarta.persistence.*;
import org.springframework.util.ConcurrentReferenceHashMap;

import java.util.HashSet;
import java.util.Set;

import static jakarta.persistence.CascadeType.MERGE;
import static jakarta.persistence.CascadeType.PERSIST;

@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String name;

    @OneToMany(cascade = {PERSIST, MERGE})
    @JoinColumn(name = "productItemId", foreignKey = @ForeignKey(name = "PRODUCT_ITEM_TO_PRODUCT_FK"))
    private Set<ProductItem> productItems = new HashSet<>();

    public Product() {
    }

    public Product(String name, Set<ProductItem> productItems) {
        this.name = name;
        this.productItems = productItems;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<ProductItem> getProductItems() {
        return productItems;
    }

    public void setProductItems(Set<ProductItem> productItems) {
        this.productItems = productItems;
    }
}
