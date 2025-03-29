package edu.fiu.hackathon.material_calculator.dto;

import edu.fiu.hackathon.material_calculator.model.RawMaterial;

public record UpdateRawMaterialRequestDTO(String name) {

    public RawMaterial toEntity(){
        return new RawMaterial(name);
    }
}
