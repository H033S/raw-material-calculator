package edu.fiu.hackathon.material_calculator.controller;

import java.util.List;

import edu.fiu.hackathon.material_calculator.dto.UpdateRawMaterialRequestDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import edu.fiu.hackathon.material_calculator.service.RawMaterialService;
import edu.fiu.hackathon.material_calculator.model.RawMaterial;

@RestController
public class RawMaterialController {

    private final RawMaterialService rawMaterialService;

    public RawMaterialController(RawMaterialService rawMaterialService) {
        this.rawMaterialService = rawMaterialService;
    }

    @GetMapping("/raw-materials")
    ResponseEntity<List<RawMaterial>> getAllRawMaterials() {
        return ResponseEntity.ok(rawMaterialService.getAllRawMaterials());
    }

    @GetMapping("/raw-material/{id}")
    ResponseEntity<RawMaterial> getRawMaterialById(@PathVariable Long id) {
        return ResponseEntity.ok(rawMaterialService.getRawMaterialById(id));
    }

    @PutMapping("/raw-material/{id}")
    ResponseEntity<?> updateMaterial(@PathVariable Long id, @RequestBody UpdateRawMaterialRequestDTO updatedMaterial) {

        rawMaterialService.updateRawMaterial(id, updatedMaterial.toEntity());
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/raw-material/{id}")
    ResponseEntity<?> deleteMaterial(@PathVariable Long id) {

        rawMaterialService.deleteRawMaterial(id);
        return ResponseEntity.noContent().build();
    }

}
