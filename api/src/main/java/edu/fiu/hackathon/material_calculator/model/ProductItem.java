package edu.fiu.hackathon.material_calculator.model;

import jakarta.persistence.*;

import static jakarta.persistence.CascadeType.MERGE;
import static jakarta.persistence.CascadeType.PERSIST;

@Entity
public class ProductItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String unitOfMeasure;
    private Double quantity;

    @OneToOne(cascade = {PERSIST, MERGE})
    @JoinColumn(name = "rawMaterialId", foreignKey = @ForeignKey(name = "RAW_MATERIAL_TO_PRODUCT_ITEM_FK"))
    private RawMaterial rawMaterial;

    public ProductItem() {
    }

    public ProductItem(String unitOfMeasure, Double quantity, RawMaterial rawMaterial) {
        this.unitOfMeasure = unitOfMeasure;
        this.quantity = quantity;
        this.rawMaterial = rawMaterial;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUnitOfMeasure() {
        return unitOfMeasure;
    }

    public void setUnitOfMeasure(String unitOfMeasure) {
        this.unitOfMeasure = unitOfMeasure;
    }

    public RawMaterial getRawMaterial() {
        return rawMaterial;
    }

    public void setRawMaterial(RawMaterial rawMaterial) {
        this.rawMaterial = rawMaterial;
    }

    public Double getQuantity() {
        return quantity;
    }

    public void setQuantity(Double quantity) {
        this.quantity = quantity;
    }

}
